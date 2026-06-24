import React, { useState, useEffect } from 'react';
import { Send, Paperclip, AlertTriangle, Info, ShieldAlert } from 'lucide-react';
import { postNotification } from '../api/notice';
import toast from 'react-hot-toast';

const CreateNoticeForm = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [priority, setPriority] = useState('High');

  // Dark-First Theme Initializer
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') || localStorage.getItem('darkMode') || localStorage.getItem('theme-mode');
      
      // Explicitly check if the user turned ON light mode previously
      if (savedTheme === 'light' || savedTheme === 'false') return false;
      if (savedTheme === 'dark' || savedTheme === 'true') return true;

      // Check if the DOM explicitly says light, otherwise default to true (Dark)
      const hasLightClass = document.documentElement.classList.contains('light') || document.body.classList.contains('light');
      if (hasLightClass) return false;
      
      return true; // 👈 Defaults to Dark Mode if no settings are found
    }
    return true; 
  });

  // Toggle Watcher to stay in lockstep with the navbar switch
  useEffect(() => {
    const syncTheme = () => {
      // If the root doesn't contain "light", we assume it's dark based on your default
      const hasLightClass = 
        document.documentElement.classList.contains('light') || 
        document.body.classList.contains('light');
      
      const currentDark = 
        document.documentElement.classList.contains('dark') || 
        document.body.classList.contains('dark') || 
        !hasLightClass; // If no light class, it's dark
        
      setIsDark(currentDark);
    };

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  const handleSubmit =async (e) => {
    e.preventDefault();
    try{
      const payload={
        title,
        body,
        priority
      }
      const data=await postNotification(payload);
      toast.success("message sent")
    }
    catch(error){
      toast.error("Can't Send Message");

    }
    
  };

  return (
    <div className="w-full bg-transparent p-4 transition-colors duration-200">
      
      {/* Main Card Panel Frame */}
      <div className={`w-full max-w-4xl mx-auto border rounded-2xl p-8 shadow-sm transition-colors duration-200 ${
        isDark ? 'bg-[#1a1a1a] border-gray-800 text-white' : 'bg-white border-gray-200 text-gray-900'
      }`}>
        
        {/* Component Header Block */}
        <div className="mb-6">
          <h1 className={`text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Compose Placement Notice
          </h1>
          <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Broadcast important career opportunities, deadlines, or schedule changes.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Top Control Block: Subject Field & Priority Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Notice Title Input */}
            <div className="md:col-span-2 space-y-2">
              <label className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                Notice Title / Subject (Optional)
              </label>
              <input 
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Deloitte Recruitment Drive 2026" 
                className={`w-full text-sm rounded-xl p-3 border outline-none transition-all ${
                  isDark 
                    ? 'bg-[#0f0f0f] border-gray-800 text-gray-200 placeholder:text-gray-700 focus:ring-2 focus:ring-indigo-500/50' 
                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500/30'
                }`}
              />
            </div>

            {/* Precision Urgency Level Selector */}
            <div className="space-y-2">
              <label className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                Set Urgency Level
              </label>
              <div className={`grid grid-cols-3 gap-1 p-1 border rounded-xl h-[46px] items-center ${
                isDark ? 'bg-[#0f0f0f] border-gray-800' : 'bg-gray-100 border-gray-300'
              }`}>
                
                {/* Low Button */}
                <button
                  type="button"
                  onClick={() => setPriority('Low')}
                  className={`text-xs font-medium py-2 rounded-lg transition-all ${
                    priority === 'Low' 
                      ? (isDark ? 'bg-[#1a2e1e] text-green-400 border border-green-900/30 font-semibold shadow-sm' : 'bg-white text-green-600 font-semibold shadow-sm')
                      : (isDark ? 'text-gray-600 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600')
                  }`}
                >
                  Low
                </button>

                {/* Medium Button */}
                <button
                  type="button"
                  onClick={() => setPriority('Medium')}
                  className={`text-xs font-medium py-2 rounded-lg transition-all ${
                    priority === 'Medium' 
                      ? (isDark ? 'bg-[#2e261c] text-yellow-400 border border-yellow-900/30 font-semibold shadow-sm' : 'bg-white text-yellow-600 font-semibold shadow-sm')
                      : (isDark ? 'text-gray-600 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600')
                  }`}
                >
                  Med
                </button>

                {/* High Button */}
                <button
                  type="button"
                  onClick={() => setPriority('High')}
                  className={`text-xs font-medium py-2 rounded-lg transition-all ${
                    priority === 'High' 
                      ? (isDark ? 'bg-[#241212] text-red-400 border border-red-900/40 font-semibold shadow-sm' : 'bg-red-50 text-red-600 border border-red-200 font-semibold shadow-sm')
                      : (isDark ? 'text-gray-600 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600')
                  }`}
                >
                  High
                </button>

              </div>
            </div>

          </div>

          {/* Announcement Main Body Input */}
          <div className="space-y-2">
            <label className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              Announcement Details
            </label>
            <textarea 
              rows="8"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Type your official announcement here... Use shifts/enters for clean formatting." 
              className={`w-full text-sm rounded-xl p-4 border outline-none resize-none leading-relaxed transition-all ${
                isDark 
                  ? 'bg-[#0f0f0f] border-gray-800 text-gray-200 placeholder:text-gray-700 focus:ring-2 focus:ring-indigo-500/50' 
                  : 'bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500/30'
              }`}
              required
            />
          </div>

          {/* Contextual Status Strip */}
          <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs transition-all duration-200 ${
            priority === 'High' 
              ? (isDark ? 'bg-[#241212]/40 border-red-900/30 text-red-400' : 'bg-red-50 border-red-200 text-red-700') :
            priority === 'Medium' 
              ? (isDark ? 'bg-[#242012]/40 border-yellow-900/30 text-yellow-400' : 'bg-yellow-50 border-yellow-200 text-yellow-700') :
            (isDark ? 'bg-gray-900/20 border-gray-800 text-gray-400' : 'bg-gray-50 border-gray-200 text-gray-600')
          }`}>
            {priority === 'High' && <ShieldAlert size={15} className="flex-shrink-0 animate-pulse" />}
            {priority === 'Medium' && <AlertTriangle size={15} className="flex-shrink-0" />}
            {priority === 'Low' && <Info size={15} className="flex-shrink-0" />}
            <span>
              {priority === 'High' && "Critical Broadcast: This announcement will be heavily highlighted in the student feed."}
              {priority === 'Medium' && "Standard Broadcast: This will occupy normal operational chronological ordering."}
              {priority === 'Low' && "Informational/Resource Notice: General low-urgency category update."}
            </span>
          </div>

          {/* Action Row */}
          <div className={`pt-4 border-t flex flex-col sm:flex-row justify-between items-center gap-4 ${isDark ? 'border-gray-800/60' : 'border-gray-100'}`}>
            <button type="button" className="flex items-center gap-2 text-xs text-gray-400 hover:text-gray-500 transition-colors group">
              <Paperclip size={14} className="group-hover:rotate-45 transition-transform" /> 
              <span>Add Attachment Link (Optional)</span>
            </button>
            
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button 
                type="button" 
                className={`px-4 py-2.5 text-xs font-medium border rounded-xl transition-all ${
                  isDark ? 'border-gray-700 text-gray-300 hover:bg-gray-800/40' : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Save Draft
              </button>
              <button type="submit" className="px-5 py-2.5 text-xs font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl flex items-center gap-2 shadow-sm transition-all active:scale-95">
                <Send size={13} /> 
                <span>Publish Notice</span>
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateNoticeForm;