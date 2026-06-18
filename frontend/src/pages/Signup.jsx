import React, { useState } from 'react';
import { GraduationCap, User, Users, Mail, Lock, Award, Hash, Calendar, ArrowRight, Zap, Tablet } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../api/auth';
import toast from 'react-hot-toast';

export const SignUp = () => {
    const [role, setRole] = useState('student');
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rollNo, setRollNo] = useState('');
    const [currentYear, setCurrentYear] = useState('1');
    const [cgpa, setCgpa] = useState('');

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const payload = {
            username,
            email,
            password,
            role
        };
        

        if (role === 'student') {
            payload.rollNo = rollNo;
            payload.currentYear = parseInt(currentYear);
            payload.cgpa = parseFloat(cgpa);
        }

        try {
            await registerUser(payload);
            setError('');
            toast.success("SignUp Successful", {
                id: 'auth-toast',
                duration: 2000
            });
            navigate('/login', { state: { registerSuccess: true } });
        } catch (err) {
            const fallbackMessage = err.response?.data?.message || 'Registration failed. Please try again.';
            setError(fallbackMessage);
            toast.error(fallbackMessage,{
                id:'auth-toast',
                duration:2000
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        // Changed bg-slate-50 -> bg-base-200 and text color to dynamic base-content
        <div className="min-h-screen flex bg-base-200 text-base-content antialiased font-sans transition-colors duration-200">

            {/* LEFT SIDE: AUTHENTICATION CONTAINER (50% Width) */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-8">
                {/* Changed bg-white -> bg-base-100, border-slate-100 -> border-base-300 */}
                <div className="bg-base-100 rounded-3xl border border-base-300 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-6 md:p-8 w-full max-w-md transition-all duration-300">

                    {/* Header: Subtitle Pill */}
                    {/* Added dark modifier variant for a deep translucent purple background */}
                    <div className="badge bg-violet-50 dark:bg-violet-950/40 border-none px-3 py-3 gap-1.5 mb-3 select-none">
                        <User size={13} className="text-violet-600 dark:text-violet-400" />
                        <span className="text-xs font-bold text-violet-600 dark:text-violet-400 tracking-wide uppercase">Create your account</span>
                    </div>

                    {/* Header: Titles */}
                    {/* Changed text-slate-900 -> text-base-content */}
                    <h3 className="text-3xl font-black tracking-tight text-base-content">Sign Up</h3>
                    {/* Changed text-slate-400 -> text-base-content/60 */}
                    <p className="text-xs font-semibold text-base-content/60 mt-1">
                        Already have an account? <Link to='/login' className="text-violet-600 dark:text-violet-400 hover:underline cursor-pointer">Login</Link>
                    </p>

                    {/* Dynamic Role Switcher Controls */}
                    {/* Changed bg-slate-100/80 -> bg-base-200 */}
                    <div className="flex mt-5 gap-2.5 p-1 bg-base-200 rounded-xl border border-base-300">
                        <button
                            type="button"
                            onClick={() => setRole('student')}
                            // Swapped hardcoded text and white bg values for dynamic theme values
                            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold tracking-wide rounded-lg transition-all cursor-pointer
                                ${role === 'student' ? 'bg-base-100 text-violet-600 dark:text-violet-400 shadow-sm border border-base-300/10' : 'text-base-content/40 hover:text-base-content'}`}
                        >
                            <GraduationCap size={15} />
                            Student
                        </button>

                        <button
                            type="button"
                            onClick={() => setRole('coordinator')}
                            // Swapped hardcoded text and white bg values for dynamic theme values
                            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold tracking-wide rounded-lg transition-all cursor-pointer
                                ${role === 'coordinator' ? 'bg-base-100 text-violet-600 dark:text-violet-400 shadow-sm border border-base-300/10' : 'text-base-content/40 hover:text-base-content'}`}
                        >
                            <Users size={15} />
                            Coordinator
                        </button>
                    </div>

                    {/* System Banners */}
                    {/* Updated warning alert container for dark styling */}
                    {error && (
                        <div className="mt-4 p-3 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/50 rounded-xl text-xs font-semibold">
                            ⚠️ {error}
                        </div>
                    )}

                    {/* Input Forms Body */}
                    <form className="mt-5 flex flex-col gap-3.5" onSubmit={handleSubmit}>

                        {/* Field 1: Username */}
                        <div className="flex flex-col gap-1">
                            {/* Changed text-slate-400 -> text-base-content/50 */}
                            <label className="text-xs font-bold text-base-content/50 uppercase tracking-wider">Username</label>
                            {/* Replaced light slate background & borders with theme colors */}
                            <div className="flex items-center border border-base-300 focus-within:border-violet-500 rounded-xl px-3 py-2 bg-base-200 transition-colors">
                                <User size={16} className="text-base-content/40" />
                                <input type="text" placeholder="Enter full name" className="ml-2.5 text-xs font-medium w-full bg-transparent outline-none text-base-content" required
                                    onChange={(e) => setUsername(e.target.value)} />
                            </div>
                        </div>

                        {/* Field 2: Email */}
                        <div className="flex flex-col gap-1">
                            {/* Changed text-slate-400 -> text-base-content/50 */}
                            <label className="text-xs font-bold text-base-content/50 uppercase tracking-wider">Email Address</label>
                            <div className="flex items-center border border-base-300 focus-within:border-violet-500 rounded-xl px-3 py-2 bg-base-200 transition-colors">
                                <Mail size={16} className="text-base-content/40" />
                                <input type="email" placeholder="name@university.edu" className="ml-2.5 text-xs font-medium w-full bg-transparent outline-none text-base-content"
                                    onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                        </div>

                        {/* Field 3: Password */}
                        <div className="flex flex-col gap-1">
                            {/* Changed text-slate-400 -> text-base-content/50 */}
                            <label className="text-xs font-bold text-base-content/50 uppercase tracking-wider">Password</label>
                            <div className="flex items-center border border-base-300 focus-within:border-violet-500 rounded-xl px-3 py-2 bg-base-200 transition-colors">
                                <Lock size={16} className="text-base-content/40" />
                                <input type="password" placeholder="Create a password" className="ml-2.5 text-xs font-medium w-full bg-transparent outline-none text-base-content"
                                    onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                        </div>

                        {/* ACADEMIC ROW GRID: Conditionally displays ONLY if role is 'student' */}
                        {role === 'student' && (
                            <div className="grid grid-cols-2 gap-3 mt-0.5 animate-fadeIn">

                                {/* Field 4: CGPA */}
                                <div className="flex flex-col gap-1">
                                    {/* Changed text-slate-400 -> text-base-content/50 */}
                                    <label className="text-xs font-bold text-base-content/50 uppercase tracking-wider">Current CGPA</label>
                                    <div className="flex items-center border border-base-300 focus-within:border-violet-500 rounded-xl px-3 py-2 bg-base-200 transition-colors">
                                        <Award size={16} className="text-base-content/40" />
                                        <input type="number" step="0.01" min="0" max="10" placeholder="0.00" className="ml-2.5 text-xs font-medium w-full bg-transparent outline-none text-base-content"
                                            onChange={(e) => setCgpa(e.target.value)} required />
                                    </div>
                                </div>

                                {/* Field 5: Roll Number */}
                                <div className="flex flex-col gap-1">
                                    {/* Changed text-slate-400 -> text-base-content/50 */}
                                    <label className="text-xs font-bold text-base-content/50 uppercase tracking-wider">Roll No</label>
                                    <div className="flex items-center border border-base-300 focus-within:border-violet-500 rounded-xl px-3 py-2 bg-base-200 transition-colors">
                                        <Hash size={16} className="text-base-content/40" />
                                        <input type="text" placeholder="e.g. 21CS01" className="ml-2.5 text-xs font-medium w-full bg-transparent outline-none text-base-content"
                                            onChange={(e) => setRollNo(e.target.value)} required />
                                    </div>
                                </div>

                                {/* Field 6: Academic Year */}
                                <div className="flex flex-col gap-1 col-span-2">
                                    {/* Changed text-slate-400 -> text-base-content/50 */}
                                    <label className="text-xs font-bold text-base-content/50 uppercase tracking-wider">Current Year</label>
                                    <div className="flex items-center border border-base-300 focus-within:border-violet-500 rounded-xl px-3 bg-base-200 transition-colors h-9">
                                        <Calendar size={16} className="text-base-content/40 shrink-0" />
                                        {/* Changed select box hardcoded text colors to base content equivalents */}
                                        <select className="ml-2 w-full bg-transparent outline-none text-xs font-bold text-base-content/70 dark:text-base-content/90 cursor-pointer h-full" onChange={(e) => setCurrentYear(e.target.value)}>
                                            <option value="1" className="bg-base-100 text-base-content">1st Year </option>
                                            <option value="2" className="bg-base-100 text-base-content">2nd Year</option>
                                            <option value="3" className="bg-base-100 text-base-content">3rd Year </option>
                                            <option value="4" className="bg-base-100 text-base-content">4th Year</option>
                                        </select>
                                    </div>
                                </div>

                            </div>
                        )}

                        {/* Submit Button */}
                        <button type="submit" className="btn bg-violet-600 hover:bg-violet-700 text-white border-none w-full rounded-xl text-xs font-bold tracking-wide shadow-md mt-2 cursor-pointer flex items-center justify-center gap-2 h-10 min-h-10" disabled={loading}>
                            {loading ? <span className='loading loading-spinner loading-xs'></span> :
                                <>
                                    Create Account
                                    <ArrowRight size={14} />
                                </>
                            }
                        </button>

                    </form>
                </div>
            </div>

            {/* 🌟 RIGHT SIDE: PREMIUM INDIGO-VIOLET GRADIENT PANEL */}
            {/* Added an aggressive dark: scheme drop to switch to richer midnight tones when active */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-violet-700 to-slate-900 dark:from-slate-900 dark:via-indigo-950 dark:to-black relative overflow-hidden items-center justify-center transition-all duration-200">
                
                {/* Decorative Subtle Background Orbs */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl -ml-20 -mb-20" />

                <div className="max-w-lg px-12 z-10">
                    <div>
                        <h3 className="font-black text-4xl tracking-tight text-white mb-3 leading-tight">
                            Join NexusDrive<br /> Today
                        </h3>
                        <p className="text-violet-100/80 text-sm font-medium tracking-wide">
                            Connect with top tier corporate partners and accelerate your career trajectory.
                        </p>
                    </div>

                    <div className="mt-16 space-y-5">
                        {/* Card 1 */}
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 shadow-xl w-full max-w-sm px-6 py-4 rounded-2xl text-slate-50 flex items-center gap-4 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-0.5">
                            <div className="rounded-xl bg-violet-500/20 border border-violet-400/20 p-2.5 shrink-0">
                                <Zap size={16} className="text-violet-200" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white text-sm tracking-wide">Find Openings Faster</h4>
                                <p className="text-xs text-violet-200/70 mt-0.5">Discover roles optimized for your profile milestones.</p>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 shadow-xl w-full max-w-sm px-6 py-4 rounded-2xl text-slate-50 flex items-center gap-4 lg:ml-12 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-0.5">
                            <div className="rounded-xl bg-indigo-500/20 border border-indigo-400/20 p-2.5 shrink-0">
                                <Tablet size={16} className="text-indigo-200" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white text-sm tracking-wide">Premium Company Networks</h4>
                                <p className="text-xs text-indigo-200/70 mt-0.5">Access exclusive placement drives directly from recruiters.</p>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 shadow-xl w-full max-w-sm px-6 py-4 rounded-2xl text-slate-50 flex items-center gap-4 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-0.5">
                            <div className="rounded-xl bg-emerald-500/20 border border-emerald-400/20 p-2.5 shrink-0">
                                <GraduationCap size={16} className="text-emerald-200" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white text-sm tracking-wide">Structured Mentorship</h4>
                                <p className="text-xs text-emerald-200/70 mt-0.5">End-to-end guidance from resume review to final onboarding checks.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};