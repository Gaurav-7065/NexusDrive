import React from "react";
import Job from "../assets/Job.png";
export const LandingPage = () => {
    return (
        // 1. CLEAN GLOBAL WRAPPER: No padding or flex grid layouts here!
        <div data-theme="corporate" className="min-h-screen bg-[#f8fafc] text-slate-900 antialiased">

            {/* 2. NAVBAR: Stretches beautifully edge-to-edge with its own horizontal padding (px-12) */}
            <nav className="w-full bg-white/80 backdrop-blur-md px-12 py-5 flex flex-row justify-between items-center sticky top-0 z-50 border-b border-slate-100 shadow-sm">

                {/* LEFT CONTAINER: Brand Logo */}
                <div className="flex-1 flex justify-start">
                    <a href="/" className="text-2xl font-extrabold tracking-tight text-slate-900 select-none">
                        Nexus<span className="text-blue-700">Drive</span>
                    </a>
                </div>

                {/* CENTER CONTAINER: Navigation Links */}


                {/* RIGHT CONTAINER: Action Buttons */}
                <div className="flex-1 flex justify-end items-center gap-6">
                    <a href="#login" className="font-medium text-sm text-slate-600 hover:text-blue-700 transition-colors">

                    </a>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-4 py-2 rounded-lg transition-all active:scale-95 shadow-sm">
                        Get Started
                    </button>
                </div>
            </nav>

            {/* 3. HERO SECTION CONTAINER: This is where your spacing layout belongs */}
            {/* max-w-7xl ensures it doesn't get awkwardly wide on giant monitors */}
            <main className="max-w-7xl mx-auto px-6 md:px-12 py-16  md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* Left Side: Text and Buttons */}
                {/* Left Side: Text and Buttons */}
                <div className="flex flex-col gap-6 items-start ">

                    {/* 1. TOP BADGE PILL (From image_305763.png) */}
                    <div className="inline-flex items-center gap-1.5 bg-slate-200 border border-slate-200/60 px-3 py-1 rounded-full text-xs font-semibold text-slate-700 self-start">
                        <span>⚡</span> Connecting students with opportunities
                    </div>

                    {/* 2. HEADLINE & PARAGRAPH (Updated to match image text & alignment) */}
                    <h1 className="text-5xl font-extrabold tracking-tight leading-tight py-4">

                        Build your <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            CAREER
                        </span> with us!

                    </h1>

                    <p className="text-base text-slate-500 font-medium leading-relaxed max-w-lg">
                        NexusDrive brings students, coordinators, and top companies together on one simple platform. Find jobs, manage placements, and grow faster.
                    </p>

                    {/* 3. CTA BUTTONS */}
                    <div className="flex flex-row gap-4 mt-5">
                        <button className="btn btn-primary btn-md px-6 text-white font-bold rounded-xl shadow-md shadow-blue-100">
                            Register as Student →
                        </button>
                        <button className="btn btn-ghost text-slate-700 hover:bg-slate-100 font-bold px-6 rounded-xl">
                            Register as Coordinator →
                        </button>
                    </div>



                </div>
                <div className="w-full rounded-8xl flex justify-end ">
                    <img src={Job} className="rounded-3xl h-110 hover:scale-105 transition-transform duration-500  self-end  shadow-md" />
                </div>

                {/*Companies Section*/}


            </main>
            {/* ==================== CLEAN INFINITE MARQUEE LOGO STRIP ==================== */}
            <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-12 mt-4 text-center">

                {/* Clean Title */}
                <h2 className="text-4xl font-extrabold text-slate-800 mb-16 tracking-tight">
                    <span className="text-blue-600">Trusted</span> by Industry Veterans
                </h2>

                {/* THE CAROUSEL CONTAINER WITH BLURRED/FADED EDGES */}
                <div className="relative w-full overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-24 before:bg-gradient-to-r before:from-[#f8fafc] before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-24 after:bg-gradient-to-l after:from-[#f8fafc] after:to-transparent ">
                    {/* Inner Flex Track */}
                    <div className="flex w-max gap-16 items-center animate-marquee opacity-60 grayscale hover:grayscale-0 transition-all duration-300">

                        {/* --- SET 1: ORIGINAL LOGOS --- */}
                        <span className="text-xl font-black text-slate-700 tracking-tight select-none px-4">PEPSICO</span>
                        <span className="text-xl font-black text-slate-700 tracking-tight select-none px-4">Reliance</span>
                        <span className="text-xl font-black text-slate-700 tracking-tight select-none px-4">SAMSUNG</span>
                        <span className="text-xl font-black text-slate-700 tracking-tight select-none px-4">snapdeal</span>
                        <span className="text-xl font-black text-slate-700 tracking-tight select-none px-4">TATA</span>
                        <span className="text-xl font-black text-slate-700 tracking-tight select-none px-4">HP</span>
                        <span className="text-xl font-black text-slate-700 tracking-tight select-none px-4">ABInBev</span>

                        {/* --- SET 2: DUPLICATE LOGOS --- */}
                        <span className="text-xl font-black text-slate-700 tracking-tight select-none px-4">PEPSICO</span>
                        <span className="text-xl font-black text-slate-700 tracking-tight select-none px-4">Reliance</span>
                        <span className="text-xl font-black text-slate-700 tracking-tight select-none px-4">SAMSUNG</span>
                        <span className="text-xl font-black text-slate-700 tracking-tight select-none px-4">snapdeal</span>
                        <span className="text-xl font-black text-slate-700 tracking-tight select-none px-4">TATA</span>
                        <span className="text-xl font-black text-slate-700 tracking-tight select-none px-4">HP</span>
                        <span className="text-xl font-black text-slate-700 tracking-tight select-none px-4">ABInBev</span>

                    </div>
                </div>

            </div>
            {/* ==================== CORE PATHWAYS FEATURES SECTION ==================== */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 text-center">

                {/* Section Headers */}
                <div className="flex flex-col items-center max-w-2xl mx-auto mb-16 gap-3">
                    <div className="badge badge-primary to-secondary font-bold text-xs px-6 py-4 text-white uppercase tracking-wider mb-4">
                        Our Features
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">
                        Tailored ecosystems for every stakeholder
                    </h2>
                    <p className="text-sm font-medium text-slate-500 leading-relaxed">
                        Whether you are matching talent, coordinating drives, or looking for your next tech role, we have built a centralized hub just for you.
                    </p>
                </div>

                {/* 3-Column Card Grid Container */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* CARD 1: FOR STUDENTS */}
                    <div className="card bg-base-100 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left">
                        <div className="card-body p-8 flex flex-col justify-between gap-6">
                            <div className="flex flex-col gap-4">
                                {/* Visual Icon Badge */}
                                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-xl shadow-sm">
                                    🎓
                                </div>
                                <h3 className="card-title text-xl font-extrabold text-slate-800">For Students</h3>
                                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                                    Build your real-time verified resume profile, track your ongoing eligibility status for incoming drives, and apply instantly to premium packages.
                                </p>
                            </div>
                            <div className="card-actions justify-end mt-4">
                                <button className="btn btn-ghost btn-sm text-blue-600 font-bold hover:bg-blue-50 rounded-lg group">
                                    Explore Portal <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* CARD 2: FOR COORDINATORS */}
                    <div className="card bg-base-100 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left">
                        <div className="card-body p-8 flex flex-col justify-between gap-6">
                            <div className="flex flex-col gap-4">
                                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 font-bold flex items-center justify-center text-xl shadow-sm">
                                    💼
                                </div>
                                <h3 className="card-title text-xl font-extrabold text-slate-800">For Coordinators</h3>
                                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                                    Automate student data validation checks, manage calendar slot conflicts across top companies, and monitor overall batch placement conversion statistics.
                                </p>
                            </div>
                            <div className="card-actions justify-end mt-4">
                                <button className="btn btn-ghost btn-sm text-emerald-600 font-bold hover:bg-emerald-50 rounded-lg group">
                                    Open Console <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* CARD 3: FOR RECRUITERS */}
                    <div className="card bg-base-100 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left">
                        <div className="card-body p-8 flex flex-col justify-between gap-6">
                            <div className="flex flex-col gap-4">
                                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 font-bold flex items-center justify-center text-xl shadow-sm">
                                    🚀
                                </div>
                                <h3 className="card-title text-xl font-extrabold text-slate-800">For Corporate Partners</h3>
                                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                                    Filter top engineering candidates based on precise skill tags, schedule seamless assessment phases, and deploy job offers directly into the hub.
                                </p>
                            </div>
                            <div className="card-actions justify-end mt-4">
                                <button className="btn btn-ghost btn-sm text-purple-600 font-bold hover:bg-purple-50 rounded-lg group">
                                    Partner With Us <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            {/* ==================== PREMIUM SYSTEM FOOTER ==================== */}
            <footer className="w-full bg-white border-t border-slate-100 text-slate-600 mt-20">

                {/* Upper Section: Brand and Navigation Grid */}

                {/* Lower Section: Copyright and Border Bar */}
                <div className="w-full border-t border-slate-100/80 bg-slate-50/50 py-6">
                    <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                        <p className="text-xs font-bold text-slate-400 tracking-wide">
                            © {new Date().getFullYear()} NexusDrive. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6 text-xs font-bold text-slate-400">
                            <span className="hover:text-slate-600 cursor-pointer transition-colors">T&C</span>
                            <span className="hover:text-slate-600 cursor-pointer transition-colors">Security</span>
                            <span className="hover:text-slate-600 cursor-pointer transition-colors">Contact Support</span>
                        </div>
                    </div>
                </div>

            </footer>
        </div>
    );
};

export default LandingPage;