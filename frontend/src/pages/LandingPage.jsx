import React, { useEffect, useState } from "react";
import { Zap, ArrowRight, GraduationCap, Briefcase, Building2, Users, TrendingUp, Award, ChevronRight, Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const STATS = [
  { icon: Users, value: "12,000+", label: "Students Placed", color: "text-violet-600" },
  { icon: Building2, value: "850+", label: "Partner Companies", color: "text-emerald-500" },
  { icon: Award, value: "₹32 LPA", label: "Highest Package", color: "text-orange-500" },
  { icon: TrendingUp, value: "98%", label: "Offer Acceptance", color: "text-blue-500" },
];

const FEATURES = [
  {
    icon: GraduationCap,
    title: "For Students",
    iconBg: "bg-violet-50 dark:bg-violet-950/30",
    iconColor: "text-violet-600 dark:text-violet-400",
    ctaColor: "text-violet-600 dark:text-violet-400",
    desc: "Build a verified resume profile, track eligibility for live drives, and apply to top packages in one tap.",
    cta: "Explore Student Portal",
  },
  {
    icon: Briefcase,
    title: "For Coordinators",
    iconBg: "bg-emerald-50 dark:bg-emerald-950/30",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    ctaColor: "text-emerald-600 dark:text-emerald-400",
    desc: "Automate data validation, manage multi-company calendars, and monitor batch conversion metrics in real time.",
    cta: "Open Console",
  },
  {
    icon: Building2,
    title: "For Corporate Partners",
    iconBg: "bg-orange-50 dark:bg-orange-950/30",
    iconColor: "text-orange-500 dark:text-orange-400",
    ctaColor: "text-orange-500 dark:text-orange-400",
    desc: "Filter top candidates by skill tags, schedule seamless assessments, and deploy offers directly through the hub.",
    cta: "Partner With Us",
  },
];

const COMPANIES = ["PEPSICO", "Reliance", "SAMSUNG", "snapdeal", "TATA", "HP", "ABInBev", "Infosys", "Wipro", "HCL"];

export default function LandingPage() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Sync state cleanly with your global navbar token configuration
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('nexus-theme') || 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute('data-theme', theme);
    localStorage.setItem('nexus-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="min-h-screen bg-base-200 text-base-content antialiased transition-colors duration-200">

      {/* ══ NAVBAR ══ */}
      <nav className={`sticky top-0 z-50 w-full bg-base-100/90 backdrop-blur-md border-b border-base-300 transition-shadow duration-300 ${scrolled ? "shadow-md" : ""}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
              <span className="text-white font-black text-base leading-none">ND</span>
            </div>
            <span className="text-xl font-extrabold tracking-tight text-base-content">
              Nexus<span className="text-violet-600">Drive</span>
            </span>
          </a>

          {/* right side of nav menu toolbar */}
          <div className="flex justify-between items-center gap-2">
            
            {/* Smooth Switch Control Toggle */}
            <label className="btn btn-ghost btn-circle swap swap-rotate text-base-content hover:bg-base-300 transition-colors duration-200 cursor-pointer">
              <input 
                type="checkbox" 
                onChange={toggleTheme} 
                checked={theme === 'dark'} 
              />
              <Sun size={18} className="swap-on text-base-content fill-none" />
              <Moon size={18} className="swap-off text-base-content fill-none" />
            </label>

            <button
              onClick={() => navigate('/signup')}
              className="group px-4 py-2 md:px-6 md:py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm hover:shadow-xl transition-all duration-200 flex items-center gap-2 cursor-pointer border-none outline-none"
            >
              Get Started
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

        </div>
      </nav>

      {/* ══ HERO SECTION ══ */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center overflow-x-hidden">

        <div className="flex flex-col gap-6 items-start justify-center h-full">
          <div className="inline-flex items-center gap-2 bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-900 text-violet-700 dark:text-violet-400 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
            <Zap size={12} /> Connecting students with opportunities
          </div>

          <h1 className="text-5xl md:text-6xl font-black leading-[1.15] tracking-tight text-left text-base-content">
            Build your{" "}
            <span className="bg-linear-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
              CAREER
            </span>
            <br />with us!
          </h1>

          <p className="text-base text-base-content/60 font-medium leading-relaxed max-w-xl text-left">
            NexusDrive brings students, coordinators, and top companies together on one simple platform. Find jobs, manage placements, and grow faster.
          </p>

          <div className="flex flex-wrap gap-4 mt-2 w-full sm:w-auto">
            <button className="btn bg-violet-600 hover:bg-violet-700 text-white border-none font-bold shadow-md px-6 dynamic-btn" onClick={() => navigate('/signup')}>
              Register as Student →
            </button>
            <button className="btn btn-ghost text-base-content hover:bg-base-300 font-bold px-6 border border-base-300 dynamic-btn" onClick={() => navigate('/signup')}>
              Register as Coordinator →
            </button>
          </div>
        </div>

        {/* Right Layout Block: Live Metrics Card Dashboard element */}
        <div className="relative flex justify-center md:justify-end items-center w-full h-full">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-72 h-72 rounded-full bg-violet-300/20 blur-3xl" />
          </div>

          <div className="relative z-10 w-full max-w-sm bg-base-100 rounded-2xl border border-base-300 shadow-2xl p-6">
            <div className="flex items-start justify-between mb-5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-base-content/40 mb-1">Active Drive</p>
                <p className="text-lg font-extrabold text-base-content">Google SWE 2025</p>
              </div>
              <span className="badge badge-success text-white text-[10px] font-bold border-none px-2.5">OPEN</span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-5">
              {[["💰 CTC", "₹22 LPA"], ["📍 Location", "Bengaluru"], ["🎯 Role", "SDE-1"], ["📅 Deadline", "Jun 30"]].map(([k, v]) => (
                <div key={k} className="bg-base-200 rounded-xl px-3 py-2.5 border border-base-300">
                  <p className="text-[10px] font-semibold text-base-content/40">{k}</p>
                  <p className="text-sm font-bold text-base-content mt-0.5">{v}</p>
                </div>
              ))}
            </div>

            <button className="btn btn-sm w-full bg-violet-600 hover:bg-violet-700 text-white border-none font-bold">
              Apply Now <ArrowRight size={14} className="ml-1" />
            </button>

            <div className="mt-4">
              <div className="flex justify-between mb-1.5">
                <span className="text-[11px] text-base-content/40 font-semibold">Applications</span>
                <span className="text-[11px] font-bold text-violet-600">347 / 500</span>
              </div>
              <progress className="progress progress-primary w-full h-1.5" value="69" max="100" />
            </div>
          </div>

          {/* Floating Toast Notification component block */}
          <div className="absolute -bottom-4 -right-3 z-20 bg-base-100 rounded-xl border border-base-300 shadow-xl px-3.5 py-2.5 flex items-center gap-2.5">
            <span className="text-xl">🎉</span>
            <div>
              <p className="text-xs font-bold text-base-content leading-tight">Gaurav got placed!</p>
              <p className="text-[10px] text-base-content/40 font-medium">Microsoft · ₹28 LPA</p>
            </div>
          </div>
        </div>
      </main>

      {/* ══ COMPANYS BRAND MARQUEE FEED ══ */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-12 mt-4 text-center overflow-hidden">
        <h2 className="text-3xl md:text-4xl font-black text-base-content mb-12 tracking-tight">
          <span className="text-violet-600">Trusted</span> by Industry Veterans
        </h2>

        <div className="relative w-full overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-24 before:bg-gradient-to-r before:from-base-200 before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-24 after:bg-gradient-to-l after:from-base-200 after:to-transparent">
          <div className="flex w-max gap-16 items-center opacity-40 dark:opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 marquee-content" style={{ animation: "marquee 24s linear infinite" }}>
            {[...COMPANIES, ...COMPANIES].map((c, i) => (
              <span key={i} className="text-xl font-black text-base-content tracking-tight select-none px-4 whitespace-nowrap">{c}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ══ DATA PLACEMENT STATS ROW ══ */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map(({ icon: Icon, value, label, color }) => (
            <div key={label} className="bg-base-100 border border-base-300 rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center">
              <Icon size={20} className={`${color} mb-2`} />
              <p className={`text-2xl md:text-3xl font-black tracking-tight ${color}`}>{value}</p>
              <p className="text-xs text-base-content/50 font-medium mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ══ PLATFORM FEATURES MATRIX ══ */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="text-center mb-12">
          <span className="inline-block bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-400 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider mb-4">Our Features</span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-base-content">
            Tailored ecosystems for every stakeholder
          </h2>
          <p className="text-sm font-medium text-base-content/50 leading-relaxed mt-3 max-w-lg mx-auto">
            Whether you are matching talent, coordinating drives, or looking for your next role — we have a centralized hub built just for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map(({ icon: Icon, title, iconBg, iconColor, ctaColor, desc, cta }) => (
            <div
              key={title}
              className="bg-base-100 border border-base-300 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer flex flex-col justify-between items-start"
            >
              <div className="w-full flex flex-col items-start">
                <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center shadow-sm mb-5`}>
                  <Icon size={24} className={iconColor} />
                </div>
                <h3 className="text-lg font-extrabold text-base-content mb-2 w-full text-left">{title}</h3>
                <p className="text-sm text-base-content/60 leading-relaxed font-medium mb-6 w-full text-left">{desc}</p>
              </div>

              <div className="mt-auto w-full pt-2">
                <button className={`flex items-center gap-1 text-sm font-bold ${ctaColor} whitespace-nowrap hover:gap-2 transition-all`}>
                  {cta} <ChevronRight size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ FOOTER SECTION ══ */}
      <footer className="w-full bg-base-100 border-t border-base-300">
        <div className="bg-base-200 py-6">
          <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs font-bold text-base-content/40 tracking-wide text-center sm:text-left">
              © {new Date().getFullYear()} NexusDrive. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-xs font-bold text-base-content/40">
              <span className="hover:text-base-content cursor-pointer transition-colors">T&C</span>
              <span className="hover:text-base-content cursor-pointer transition-colors">Security</span>
              <span className="hover:text-base-content cursor-pointer transition-colors">Contact Support</span>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (max-width: 640px) {
          .dynamic-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}