import React, { useState } from 'react';
import { Headphones, Mail, Phone, Clock, Send, Calendar } from 'lucide-react';

function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', topic: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    // Changed hardcoded bg-[#f8fafc] to bg-base-200
    <div className="min-h-screen bg-base-500 antialiased font-sans transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

          {/* ══ LEFT PANEL (Information Cards) ══ */}
          {/* Changed bg-white to bg-base-100 & border-slate-100 to border-base-300 */}
          <div className="bg-base-100 rounded-3xl border border-base-300 shadow-sm p-8 flex flex-col gap-7 transition-colors duration-200">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-violet-50 dark:bg-violet-950/40 border border-violet-100 dark:border-violet-900/50 text-violet-600 dark:text-violet-400 text-xs font-bold px-3 py-1.5 rounded-full self-start select-none">
              <Headphones size={13} /> Support & Contact
            </div>

            {/* Headline */}
            <div>
              {/* Changed text-slate-900 to text-base-content */}
              <h1 className="text-3xl font-black text-base-content tracking-tight leading-tight">
                We're here to help you<br />move faster
              </h1>
              {/* Changed text-slate-400 to text-base-content/60 */}
              <p className="text-sm font-medium text-base-content/60 mt-3 leading-relaxed">
                Reach the NexusDrive team for technical support, account help, or general inquiries. We'll route your message to the right specialist.
              </p>
            </div>

            {/* Email support box */}
            {/* Changed bg-slate-50 to bg-base-200 & border-slate-100 to border-base-300 */}
            <div className="bg-base-200/60 border border-base-300 rounded-2xl p-5 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-violet-50 dark:bg-violet-950/50 flex items-center justify-center shrink-0">
                  <Mail size={14} className="text-violet-600 dark:text-violet-400" />
                </div>
                <div>
                  {/* Changed text-slate-700 to text-base-content */}
                  <p className="text-xs font-bold text-base-content">Email support</p>
                  <p className="text-[11px] font-medium text-base-content/50 mt-0.5">Send us a message and we'll reply within one business day.</p>
                </div>
              </div>
              <div className="border-t border-base-300 pt-3">
                <p className="text-[10px] font-bold text-base-content/40 uppercase tracking-widest mb-1">Support email</p>
                <p className="text-sm font-bold text-base-content">support@nexusdrive.com</p>
              </div>
            </div>

            {/* Call us box */}
            <div className="bg-base-200/60 border border-base-300 rounded-2xl p-5 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-violet-50 dark:bg-violet-950/50 flex items-center justify-center shrink-0">
                  <Phone size={14} className="text-violet-600 dark:text-violet-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-base-content">Call us</p>
                  <p className="text-[11px] font-medium text-base-content/50 mt-0.5">Speak directly with our team during business hours.</p>
                </div>
              </div>
              <div className="border-t border-base-300 pt-3 grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] font-bold text-base-content/40 uppercase tracking-widest mb-1">Support line</p>
                  <p className="text-sm font-bold text-base-content">+1 (555) 014-2024</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-base-content/40 uppercase tracking-widest mb-1">Hours</p>
                  <p className="text-sm font-bold text-base-content">Mon–Fri, 9am–6pm</p>
                </div>
              </div>
            </div>

            {/* Stats boxes */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-base-200/60 border border-base-300 rounded-2xl p-4">
                <p className="text-2xl font-black text-violet-600 dark:text-violet-400">24/7</p>
                <p className="text-xs font-medium text-base-content/50 mt-0.5">Help center access</p>
              </div>
              <div className="bg-base-200/60 border border-base-300 rounded-2xl p-4">
                <p className="text-2xl font-black text-violet-600 dark:text-violet-400">98%</p>
                <p className="text-xs font-medium text-base-content/50 mt-0.5">Issue resolution rate</p>
              </div>
            </div>

          </div>

          {/* ══ RIGHT PANEL (The Form Container) ══ */}
          {/* Maintained premium background gradient layout structure */}
          <div className="rounded-3xl overflow-hidden shadow-sm bg-gradient-to-br from-violet-600 via-indigo-700 to-slate-900">

            {/* Top bar */}
            <div className="flex items-center justify-between px-8 pt-7 pb-0">
              <div className="inline-flex items-center gap-2 bg-white/15 text-white text-[11px] font-bold px-3 py-1.5 rounded-full select-none">
                <Headphones size={12} /> Support Center
              </div>
              <div className="inline-flex items-center gap-2 bg-white/15 text-white text-[11px] font-bold px-3 py-1.5 rounded-full select-none">
                <Mail size={12} /> contact@nexusdrive.com
              </div>
            </div>

            {/* Headline */}
            <div className="px-8 pt-8 pb-6">
              <h2 className="text-3xl font-black text-white leading-tight tracking-tight">
                Contact the right team,<br />right away
              </h2>
              <p className="text-sm font-medium text-white/70 mt-3 leading-relaxed max-w-sm">
                Whether you need account assistance, partnership details, or technical support, our team is ready to respond with clear next steps.
              </p>
            </div>

            {/* Form card */}
            <div className="mx-6 mb-7 bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-8 gap-3 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                    <Send size={20} className="text-white" />
                  </div>
                  <p className="text-white font-black text-base">Message sent!</p>
                  <p className="text-white/70 text-xs font-medium">We'll get back to you within one business day.</p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', topic: '', message: '' }); }}
                    className="mt-2 text-xs font-bold text-white/60 hover:text-white underline cursor-pointer transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-white font-bold text-sm mb-0.5">Send us a message</p>
                  <p className="text-white/60 text-[11px] font-medium mb-5">Use the form below and we'll reply by email.</p>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">

                    {/* Name Input */}
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Full name</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className="w-full bg-white/10 border border-white/15 focus:border-white/40 text-white placeholder-white/40 text-xs font-medium rounded-xl px-3.5 py-2.5 outline-none transition-colors"
                      />
                    </div>

                    {/* Email Input */}
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Email address</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@email.com"
                        required
                        className="w-full bg-white/10 border border-white/15 focus:border-white/40 text-white placeholder-white/40 text-xs font-medium rounded-xl px-3.5 py-2.5 outline-none transition-colors"
                      />
                    </div>

                    {/* Topic Input */}
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Topic</label>
                      <input
                        type="text"
                        name="topic"
                        value={form.topic}
                        onChange={handleChange}
                        placeholder="Support, billing, partnership etc."
                        required
                        className="w-full bg-white/10 border border-white/15 focus:border-white/40 text-white placeholder-white/40 text-xs font-medium rounded-xl px-3.5 py-2.5 outline-none transition-colors"
                      />
                    </div>

                    {/* Message Textarea */}
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Message</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us how we can help you..."
                        required
                        rows={4}
                        className="w-full bg-white/10 border border-white/15 focus:border-white/40 text-white placeholder-white/40 text-xs font-medium rounded-xl px-3.5 py-2.5 outline-none transition-colors resize-none"
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2.5 mt-1">
                      <button
                        type="submit"
                        className="flex items-center gap-2 bg-white text-violet-700 font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-violet-50 transition-colors shadow-sm cursor-pointer border-none"
                      >
                        <Send size={13} /> Send message
                      </button>
                      <button
                        type="button"
                        className="flex items-center gap-2 bg-white/15 hover:bg-white/20 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors cursor-pointer border border-white/10"
                      >
                        <Calendar size={13} /> Schedule a call
                      </button>
                    </div>

                  </form>
                </>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;