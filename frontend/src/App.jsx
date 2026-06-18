import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext"; // 🌟 Import your auth hook

import { SignUp } from "./pages/Signup";
import { Login } from "./pages/Login";
import { ProtectRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from 'react-hot-toast';

import JobsPage from "./pages/JobsPage";
import JobDetailPage from "./pages/JobDetailPage";
import AdminPostJob from "./pages/AdminPostJob";
import MyApplicationPage from "./pages/MyApplicationPage";
import AdminJobs from "./pages/AdminJobs";
import Navbar from "./components/NavBar";
import LandingPage from './pages/LandingPage';
import ContactPage from "./pages/Contact";

export default function App() {
  // 🌟 Grab your user and context loading state
  const { user, loading } = useAuth();

  // ⌛ Prevent layout flickers or random login drops while checking localStorage on refresh
  if (loading) {
    return (
      <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-violet-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const isCoordinator = user?.role === 'coordinator';

  return (
    <>
      {/* 🌟 Only display the navigation top-bar if a valid user is logged in */}
      {user && <Navbar />}

      <Routes>
        {/* 🏠 1. MAIN ROOT LINK ROUTE
            - If guest: Render the full LandingPage marketing suite.
            - If logged in: Seamlessly bypass the landing screen and navigate them straight into their dashboards!
        */}
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

        {/* 🔐 2. AUTHENTICATION OPEN ROUTES
            If they are logged in, prevent them from accessing /login or /signup by bouncing them back to root
        */}
        <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/" replace />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" replace />} />

        {/* 🛡️ 3. PRIVATE SECURED ENTRIES (Managed by your ProtectRoute) */}
        <Route element={<ProtectRoute />}>
          {/* Student Tracks */}
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/jobs/:id" element={<JobDetailPage />} />
          <Route path="/my-Applications" element={<MyApplicationPage />} />
          
          {/* Coordinator Tracks */}
          <Route path="/admin/post-job" element={<AdminPostJob />} />
          <Route path="/admin/jobs" element={<AdminJobs />} />
          {/* support and contact */}
          <Route path="/contact" element={<ContactPage/>}/>
        </Route>

        {/* 🗺️ 4. CATCH-ALL FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Toaster />
    </>
  );
}