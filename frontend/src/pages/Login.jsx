import React, { useContext, useState } from 'react';
import { GraduationCap, User, Users, Mail, Lock, ArrowRight, Zap, Tablet } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth';
import toast from 'react-hot-toast';

export const Login = () => {
    const [role, setRole] = useState('student');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const registerSuccess = location.state?.registerSuccess;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const payload = { email, password };
            const response = await loginUser(payload);
            const { user, token } = response;
            
            login(user, token);
            setError('');
            
            toast.success("Login Successful", {
                id: 'auth-toast',
                duration: 2000
            });

            if (user.role === 'coordinator') {
                navigate('/admin/jobs');
            } else {
                navigate('/jobs');
            }
        } catch (err) {
            const fallbackMessage = err.response?.data?.message || 'Invalid email or password credentials.';
            setError(fallbackMessage);
            
            toast.error(fallbackMessage, {
                id: 'auth-toast',
                duration: 2000
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-base-200 text-base-content antialiased font-sans transition-colors duration-200">

            {/* LEFT SIDE: AUTHENTICATION CONTAINER (50% Width) */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-8">
                <div className="bg-base-100 rounded-3xl border border-base-300 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-6 md:p-8 w-full max-w-md transition-all duration-300">
                    
                    {/* Header: Subtitle Pill */}
                    <div className="badge bg-violet-50 dark:bg-violet-950/40 border-none px-3 py-3 gap-1.5 mb-3 select-none">
                        <User size={13} className="text-violet-600 dark:text-violet-400" />
                        <span className="text-xs font-bold text-violet-600 dark:text-violet-400 tracking-wide">Welcome Back To NexusDrive</span>
                    </div>

                    {/* Header: Titles */}
                    <h3 className="text-3xl font-black tracking-tight text-base-content">Login</h3>
                    <p className="text-xs font-semibold text-base-content/60 mt-1">
                        {/* 🌟 FIXED: Changed 'href' to 'to' here to preserve the theme state */}
                        New to NexusDrive? <Link to='/signup' className="text-violet-600 dark:text-violet-400 hover:underline cursor-pointer">Signup</Link>
                    </p>

                    {/* Dynamic Role Switcher Controls */}
                    <div className="flex mt-5 gap-2.5 p-1 bg-base-200 rounded-xl border border-base-300">
                        <button
                            type="button"
                            onClick={() => setRole('student')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold tracking-wide rounded-lg transition-all cursor-pointer ${
                                role === 'student' ? 'bg-base-100 text-violet-600 dark:text-violet-400 shadow-sm border border-base-300/10' : 'text-base-content/40 hover:text-base-content'
                            }`}
                        >
                            <GraduationCap size={15} />
                            Student
                        </button>

                        <button
                            type="button"
                            onClick={() => setRole('coordinator')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold tracking-wide rounded-lg transition-all cursor-pointer ${
                                role === 'coordinator' ? 'bg-base-100 text-violet-600 dark:text-violet-400 shadow-sm border border-base-300/10' : 'text-base-content/40 hover:text-base-content'
                            }`}
                        >
                            <Users size={15} />
                            Coordinator
                        </button>
                    </div>

                    {/* System Banners Area */}
                    <div className={`transition-all duration-300 ease-out ${(registerSuccess || error) ? 'mt-4 opacity-100' : 'mt-0 opacity-0'}`}>
                        {registerSuccess && (
                            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50 rounded-xl text-xs font-bold">
                                🎉 Registration successful! Log in with your new credentials.
                            </div>
                        )}

                        {error && (
                            <div className="p-3 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/50 rounded-xl text-xs font-semibold break-words">
                                ⚠️ {error}
                            </div>
                        )}
                    </div>

                    {/* Input Forms Body */}
                    <form className="mt-5 flex flex-col gap-3.5" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold text-base-content/50 uppercase tracking-wider">Email Address</label>
                            <div className="flex items-center border border-base-300 focus-within:border-violet-500 rounded-xl px-3 py-2 bg-base-200 transition-colors">
                                <Mail size={16} className="text-base-content/40" />
                                <input type="email" placeholder="name@university.edu" className="ml-2.5 text-xs font-medium w-full bg-transparent outline-none text-base-content" required onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-bold text-base-content/50 uppercase tracking-wider">Password</label>
                                <span className="text-[10px] font-bold text-violet-600 dark:text-violet-400 hover:underline cursor-pointer tracking-wide uppercase">Forgot?</span>
                            </div>
                            <div className="flex items-center border border-base-300 focus-within:border-violet-500 rounded-xl px-3 py-2 bg-base-200 transition-colors">
                                <Lock size={16} className="text-base-content/40" />
                                <input type="password" placeholder="Enter your password" className="ml-2.5 text-xs font-medium w-full bg-transparent outline-none text-base-content" required onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </div>

                        <div className="flex items-center gap-2 mt-0.5 select-none">
                            <input type="checkbox" id="remember" className="checkbox checkbox-xs border-base-300 checked:bg-violet-600 checked:border-violet-600 rounded" />
                            <label htmlFor="remember" className="text-[11px] font-semibold text-base-content/50 cursor-pointer">Keep me logged in</label>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading} 
                            className="w-full h-10 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl text-xs tracking-wide shadow-md mt-2 cursor-pointer flex items-center justify-center gap-2 transition-colors border-none"
                        >
                            {loading ? (
                                <span className='loading loading-spinner loading-xs shrink-0'></span>
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight size={14} className="shrink-0" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {/* RIGHT SIDE: PREMIUM GRADIENT MARKETING PANEL */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-violet-600 via-indigo-700 to-slate-900 dark:from-slate-900 dark:via-indigo-950 dark:to-black relative overflow-hidden items-center justify-center transition-all duration-200">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl -ml-20 -mb-20" />

                <div className="max-w-lg px-12 z-10">
                    <div>
                        <h3 className="font-black text-4xl tracking-tight text-white mb-3 leading-tight">
                            Welcome back to<br /> NexusDrive
                        </h3>
                        <p className="text-violet-100/80 text-sm font-medium tracking-wide">
                            Connect with top tier corporate partners and accelerate your career trajectory.
                        </p>
                    </div>

                    <div className="mt-16 space-y-5">
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 shadow-xl w-full max-w-sm px-6 py-4 rounded-2xl text-slate-50 flex items-center gap-4 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-0.5">
                            <div className="rounded-xl bg-violet-500/20 border border-violet-400/20 p-2.5 shrink-0">
                                <Zap size={16} className="text-violet-200" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white text-sm tracking-wide">Find Openings Faster</h4>
                                <p className="text-xs text-violet-200/70 mt-0.5">Discover verified roles optimized for your profile milestones.</p>
                            </div>
                        </div>

                        <div className="bg-white/5 backdrop-blur-md border border-white/10 shadow-xl w-full max-w-sm px-6 py-4 rounded-2xl text-slate-50 flex items-center gap-4 lg:ml-12 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-0.5">
                            <div className="rounded-xl bg-indigo-500/20 border border-indigo-400/20 p-2.5 shrink-0">
                                <Tablet size={16} className="text-indigo-200" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white text-sm tracking-wide">Premium Company Networks</h4>
                                <p className="text-xs text-indigo-200/70 mt-0.5">Access exclusive placement drives directly from recruiters.</p>
                            </div>
                        </div>

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