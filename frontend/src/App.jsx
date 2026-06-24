import React, { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext"; 
import { ProtectRoute } from "./components/ProtectedRoute";
import { Toaster } from 'react-hot-toast';
import { NotifyProvider } from "./context/NotificationContext";
import Navbar from "./components/NavBar";

// 🌀 Reusable custom loading spinner matching your exact styles
const PageLoader = () => (
  <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-violet-600 border-t-transparent rounded-full animate-spin" />
  </div>
);

// 💤 Lazy loaded pages (split into independent bundles)
const LandingPage = lazy(() => import('./pages/LandingPage'));
const ContactPage = lazy(() => import("./pages/Contact"));

// Handling Named Exports for Authentication Screens
const SignUp = lazy(() => import("./pages/Signup").then(module => ({ default: module.SignUp })));
const Login = lazy(() => import("./pages/Login").then(module => ({ default: module.Login })));

// Student Pages
const JobsPage = lazy(() => import("./pages/JobsPage"));
const JobDetailPage = lazy(() => import("./pages/JobDetailPage"));
const MyApplicationPage = lazy(() => import("./pages/MyApplicationPage"));
const GetMessagePage = lazy(() => import("./pages/GetMessage"));

// Coordinator / Admin Pages
const AdminPostJob = lazy(() => import("./pages/AdminPostJob"));
const AdminJobs = lazy(() => import("./pages/AdminJobs"));
const GetApplicants = lazy(() => import("./pages/getApplicants"));
const MessagePage = lazy(() => import("./pages/MessagePage"));

export default function App() {
  const { user, loading } = useAuth();

  // ⌛ Prevent layout flickers while parsing authentication tokens on reload
  if (loading) {
    return <PageLoader />;
  }

  const isCoordinator = user?.role === 'coordinator';

  return (
    <>
      <NotifyProvider>
        {/* 🌟 Navigation bar persists cleanly across layout re-renders */}
        {user && <Navbar />}

        {/* 📦 Suspense boundaries capture rendering transitions gracefully */}
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* 🏠 1. MAIN ROOT LINK ROUTE */}
            <Route 
              path="/" 
              element={
                !user ? (
                  <LandingPage />
                ) : isCoordinator ? (
                  <Navigate to="/admin/jobs" replace />
                ) : (
                  <Navigate to="/jobs" replace />
                )
              } 
            />

            {/* 🔐 2. AUTHENTICATION OPEN ROUTES */}
            <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/" replace />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" replace />} />

            {/* 🛡️ 3. PRIVATE SECURED ENTRIES */}
            <Route element={<ProtectRoute />}>
              {/* Student Tracks */}
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/jobs/:id" element={<JobDetailPage />} />
              <Route path="/my-Applications" element={<MyApplicationPage />} />
              
              {/* Coordinator Tracks */}
              <Route path="/admin/post-job" element={<AdminPostJob />} />
              <Route path="/admin/jobs" element={<AdminJobs />} />
              <Route path="/admin/application-status/:jobId" element={<GetApplicants />} />
              <Route path="/admin/sent-message" element={<MessagePage />} />
              
              {/* Support & Communications */}
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/messages" element={<GetMessagePage />} />
            </Route>

            {/* 🗺️ 4. CATCH-ALL FALLBACK */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </NotifyProvider>

      <Toaster />
    </>
  );
}