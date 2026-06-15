import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Briefcase, FolderHeart, Mail, LayoutDashboard, PlusCircle, UserCircle } from 'lucide-react';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Hide Navbar completely on Login and Register screens if no user context exists
  if (!user) return null;

  const isCoordinator = user?.role === 'coordinator';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Helper utility function to style active vs inactive links dynamically
  const getLinkStyle = (path) => {
    const isActive = location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
    return `px-3 py-2 rounded-xl text-xs font-bold transition-all uppercase tracking-wide flex items-center gap-1.5 ${
      isActive 
        ? 'bg-violet-50 text-violet-600 shadow-[0_4px_12px_rgba(124,58,237,0.05)]' 
        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
    }`;
  };

  return (
    <nav className="w-full bg-white border-b border-slate-100 sticky top-0 z-50 antialiased font-sans shadow-[0_2px_15px_rgba(0,0,0,0.01)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Left Block: Brand Identity */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(isCoordinator ? '/admin/jobs' : '/jobs')}>
            <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center text-white font-black text-sm">
              P
            </div>
            <span className="font-black text-slate-900 tracking-tight text-sm uppercase hidden sm:block">
              Placement Portal
            </span>
          </div>

          {/* Middle Block: Role-Based Nav Links */}
          <div className="flex items-center gap-1 sm:gap-2">
            {isCoordinator ? (
              /* 🛡️ COORDINATOR DIRECTORY NAVIGATION */
              <>
                <Link to="/admin/jobs" className={getLinkStyle('/admin/jobs')}>
                  <LayoutDashboard size={14} /> Posted Jobs
                </Link>
                <Link to="/admin/post-job" className={getLinkStyle('/admin/post-job')}>
                  <PlusCircle size={14} /> Post New Job
                </Link>
              </>
            ) : (
              /* 🎓 STUDENT DIRECTORY NAVIGATION */
              <>
                <Link to="/jobs" className={getLinkStyle('/jobs')}>
                  <Briefcase size={14} /> Explore Openings
                </Link>
                <Link to="/my-applications" className={getLinkStyle('/my-applications')}>
                  <FolderHeart size={14} /> My Applications
                </Link>
                <Link to="/contact" className={getLinkStyle('/contact')}>
                  <Mail size={14} /> Support & Contact
                </Link>
              </>
            )}
          </div>

          {/* Right Block: User Metadata Profile & Session Actions */}
          <div className="flex items-center gap-4 border-l border-slate-100 pl-4">
            <div className="flex items-center gap-2.5">
              <UserCircle size={28} className="text-slate-300 hidden sm:block" />
              <div className="flex flex-col items-end hidden md:flex">
                <span className="text-xs font-black text-slate-800 leading-none">{user?.name || 'User'}</span>
                <span className="text-[9px] font-extrabold text-violet-500 uppercase tracking-widest mt-1 bg-violet-50/50 px-1.5 py-0.5 rounded-md">
                  {user?.role === 'coordinator' ? 'Coordinator' : 'Student'}
                </span>
              </div>
            </div>

            <button 
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
              title="Logout Account"
            >
              <LogOut size={16} />
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;