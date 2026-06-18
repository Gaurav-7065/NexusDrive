import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Briefcase, FolderHeart, Mail, LayoutDashboard, PlusCircle, UserCircle, Menu, X, Sun, Moon } from 'lucide-react';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('nexus-theme') || 'light';
  });
  
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute('data-theme', theme);
    localStorage.setItem('nexus-theme', theme);
  }, [theme]);

  // Handle background scroll locking
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  if (!user) return null;

  const isCoordinator = user?.role === 'coordinator';

  const handleLogout = () => {
    setIsOpen(false);
    logout();
    navigate('/login');
  };

  const renderNavLinks = (isMobileView = false) => {
    const linkStyleBase = isMobileView
      ? "w-full px-4 py-3 text-sm font-bold uppercase tracking-wide flex items-center gap-3 rounded-xl transition-all"
      : "px-3 py-2 text-xs font-bold uppercase tracking-wide flex items-center gap-1.5 rounded-xl transition-all";

    const getDynamicClasses = (path) => {
      const isActive = location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
      if (isActive) {
        return `${linkStyleBase} bg-primary/10 text-primary font-black`;
      }
      return `${linkStyleBase} text-base-content/70 hover:text-base-content hover:bg-base-200`;
    };

    if (isCoordinator) {
      return (
        <>
          <Link to="/admin/jobs" onClick={() => setIsOpen(false)} className={getDynamicClasses('/admin/jobs')}>
            <LayoutDashboard size={isMobileView ? 16 : 14} /> Posted Jobs
          </Link>
          <Link to="/admin/post-job" onClick={() => setIsOpen(false)} className={getDynamicClasses('/admin/post-job')}>
            <PlusCircle size={isMobileView ? 16 : 14} /> Post New Job
          </Link>
        </>
      );
    }

    return (
      <>
        <Link to="/jobs" onClick={() => setIsOpen(false)} className={getDynamicClasses('/jobs')}>
          <Briefcase size={isMobileView ? 16 : 14} /> Explore Openings
        </Link>
        <Link to="/my-applications" onClick={() => setIsOpen(false)} className={getDynamicClasses('/my-applications')}>
          <FolderHeart size={isMobileView ? 16 : 14} /> My Applications
        </Link>
        <Link to="/contact" onClick={() => setIsOpen(false)} className={getDynamicClasses('/contact')}>
          <Mail size={isMobileView ? 16 : 14} /> Support & Contact
        </Link>
      </>
    );
  };

  return (
    <>
      <nav className="w-full bg-base-100 border-b border-base-200 sticky top-0 z-50 antialiased font-sans transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">

            {/* 🏷️ LEFT BLOCK: Brand Identity */}
            <div 
              className="flex items-center gap-2 cursor-pointer select-none" 
              onClick={() => navigate(isCoordinator ? '/admin/jobs' : '/jobs')}
            >
              <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center text-white font-black text-sm shadow-sm">
                ND
              </div>
              <span className="text-xl font-extrabold tracking-tight text-base-content">
                Nexus<span className="text-violet-600">Drive</span>
              </span>
            </div>

            {/* 💻 DESKTOP NAVIGATION LINKS */}
            <div className="hidden lg:flex items-center gap-2">
              {renderNavLinks(false)}
            </div>

            {/* 🛠️ RIGHT BLOCK: Toolbar Actions & Menu Trigger */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* 💻 100xDevs Style Theme Toggler Switch (Desktop) */}
              <label className="btn btn-ghost btn-circle swap swap-rotate text-base-content hover:bg-base-200 transition-colors duration-200 cursor-pointer">
                <input 
                  type="checkbox" 
                  onChange={toggleTheme} 
                  checked={theme === 'dark'} 
                />
                {/* swap-on renders when checked (dark theme), displaying the Sun to return to light */}
                <Sun size={18} className="swap-on text-base-content fill-none" />
                {/* swap-off renders when unchecked (light theme), displaying the Moon to move to dark */}
                <Moon size={18} className="swap-off text-base-content fill-none" />
              </label>

              {/* Desktop Profile Badges */}
              <div className="hidden sm:flex items-center gap-2 border-l border-base-200 pl-3 mr-1">
                <UserCircle size={26} className="text-base-content/30" />
                <div className="flex flex-col items-start leading-none">
                  <span className="text-xs font-black text-base-content">{user?.name || 'User'}</span>
                  <span className="text-[9px] font-extrabold text-violet-500 uppercase tracking-widest mt-0.5">
                    {user?.role}
                  </span>
                </div>
              </div>

              {/* Desktop Logout Button */}
              <button
                onClick={handleLogout}
                className="hidden sm:flex p-2 text-base-content/40 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all cursor-pointer"
                title="Logout Account"
              >
                <LogOut size={16} />
              </button>

              {/* 📱 MOBILE HAMBURGER TOGGLE BUTTON */}
              <button 
                onClick={() => setIsOpen(true)}
                className="btn border-none bg-base-content text-base-100 hover:opacity-90 btn-square shadow-md rounded-xl flex lg:hidden items-center justify-center cursor-pointer transition-all"
              >
                <Menu size={20} strokeWidth={2.5} />
              </button>

            </div>
          </div>
        </div>
      </nav>

      {/* ══ 🎴 FULL PAGE MOBILE OVERLAY SYSTEM ══ */}
      <div className={`fixed inset-0 w-screen h-screen bg-base-100 z-[999] lg:hidden flex flex-col p-6 transition-all duration-300 ease-out ${
        isOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'
      }`}>
        
        {/* Top Floating Control Bar */}
        <div className="flex items-center justify-between w-full h-16 border-b border-base-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center text-white font-black text-sm">ND</div>
            <span className="text-xl font-extrabold tracking-tight text-base-content">NexusDrive</span>
          </div>
          
          <div className="flex items-center gap-2">
            {/* 📱 Mobile Mirror Tone Switcher Control */}
            <label className="btn btn-ghost btn-circle swap swap-rotate text-base-content hover:bg-base-200 cursor-pointer">
              <input 
                type="checkbox" 
                onChange={toggleTheme} 
                checked={theme === 'dark'} 
              />
              <Sun size={18} className="swap-on text-base-content fill-none" />
              <Moon size={18} className="swap-off text-base-content fill-none" />
            </label>

            <button 
              onClick={() => setIsOpen(false)}
              className="btn btn-ghost btn-circle text-base-content hover:bg-base-200 flex items-center justify-center cursor-pointer"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* 🔒 LOGOUT & USER PROFILE AREA */}
        <div className="mt-6 p-4 bg-base-200/60 border border-base-200 rounded-2xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <UserCircle size={32} className="text-base-content/30" />
            <div className="flex flex-col">
              <p className="text-xs font-black text-base-content truncate max-w-[140px]">{user?.name || 'User'}</p>
              <p className="text-[10px] font-extrabold text-violet-500 uppercase tracking-wider mt-0.5">{user?.role}</p>
            </div>
          </div>
          
          {/* Mobile Logout Session Trigger */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold text-xs rounded-xl transition-all border-none cursor-pointer"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>

        {/* Clean, Scaled-Down Navigation Feed */}
        <div className="flex-1 flex flex-col justify-start gap-2 mt-8">
          <p className="text-[10px] font-bold text-base-content/40 uppercase tracking-widest px-2 mb-1">Navigation Menu</p>
          {renderNavLinks(true)}
        </div>

      </div>
    </>
  );
}

export default Navbar;