import React, { useState, useEffect } from 'react';
import { Calendar, Paperclip, AlertTriangle, Info, ShieldAlert, Search, Bell, ExternalLink, CheckCheck } from 'lucide-react';

const GetMessagePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('All');

  // Dark-First Theme Initializer
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') || localStorage.getItem('darkMode') || localStorage.getItem('theme-mode');
      if (savedTheme === 'light' || savedTheme === 'false') return false;
      if (savedTheme === 'dark' || savedTheme === 'true') return true;
      const hasLightClass = document.documentElement.classList.contains('light') || document.body.classList.contains('light');
      return !hasLightClass;
    }
    return true; 
  });

  // Mock Database Array (Recent messages first)
  const [messages] = useState([
    {
      _id: "1",
      title: "Deloitte Recruitment Drive 2026 - PPT & Registration Link",
      body: "The registration window for the Deloitte upcoming campus hiring closes tomorrow night at 11:59 PM. Ensure your resume profiles are updated on the portal and match all clearance CGPA eligibility metrics.",
      priority: "High",
      createdAt: "2026-06-21T11:30:00.000Z",
      attachment: "deloitte_eligibility_matrix.pdf"
    },
    {
      _id: "2",
      title: "Amazon Interview Shortlists - SDE Internships",
      body: "The final list of students shortlisted for the round-2 technical interviews with Amazon has been updated by the panel coordinators. Interviews will commence tracking dynamically starting Monday morning.",
      priority: "Medium",
      createdAt: "2026-06-20T15:45:00.000Z",
      attachment: "amazon_sde_shortlist.xlsx"
    },
    {
      _id: "3",
      title: "Rescheduled Resume Review Workshop",
      body: "The interactive profile building workshop initially slated for this evening has been shifted to Friday afternoon. Same meeting link applies.",
      priority: "Low",
      createdAt: "2026-06-18T09:15:00.000Z",
      attachment: null
    }
  ]);

  // 1. Notification State: Track IDs of read messages from localStorage
  const [readMessageIds, setReadMessageIds] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nexus_read_messages');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Calculate the unread count dynamically
  const unreadCount = messages.filter(msg => !readMessageIds.includes(msg._id)).length;

  // Action: Mark all current messages as read
  const handleMarkAllAsRead = () => {
    const allIds = messages.map(msg => msg._id);
    setReadMessageIds(allIds);
    localStorage.setItem('nexus_read_messages', JSON.stringify(allIds));
  };

  // Action: Mark an individual message as read when clicked
  const handleMessageClick = (id) => {
    if (!readMessageIds.includes(id)) {
      const updatedIds = [...readMessageIds, id];
      setReadMessageIds(updatedIds);
      localStorage.setItem('nexus_read_messages', JSON.stringify(updatedIds));
    }
  };

  // Sync Theme Watcher
  useEffect(() => {
    const syncTheme = () => {
      const hasLightClass = document.documentElement.classList.contains('light') || document.body.classList.contains('light');
      setIsDark(!hasLightClass);
    };
    syncTheme();
    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Filter Logic
  const filteredMessages = messages
    .filter(msg => {
      const matchesSearch = msg.title.toLowerCase().includes(searchTerm.toLowerCase()) || msg.body.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterPriority === 'All' || msg.priority === filterPriority;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className={`w-full min-h-screen p-4 md:p-8 transition-colors duration-200 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
      <div className="w-full max-w-5xl mx-auto space-y-6">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            
            {/* 2. LinkedIn Style Bell Icon Badge Overlay */}
            <div className="relative p-2.5 rounded-xl bg-gray-100 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800">
              <Bell className="text-indigo-500" size={24} />
              {unreadCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold h-5 min-w-5 px-1 rounded-full flex items-center justify-center ring-4 ring-white dark:ring-[#0f0f0f] animate-pulse">
                  {unreadCount}
                </span>
              )}
            </div>

            <div>
              <h1 className={`text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Placement Notice Board
              </h1>
              <p className={`text-sm mt-0.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                You have {unreadCount} unread official announcement updates.
              </p>
            </div>
          </div>

          {/* Mark as Read Global Trigger Button */}
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-indigo-600/10 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900/30 rounded-lg hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-all"
            >
              <CheckCheck size={14} />
              <span>Clear All Notifications</span>
            </button>
          )}
        </div>

        {/* Search & Filter Toolbar */}
        <div className={`p-4 border rounded-xl flex flex-col md:flex-row items-center gap-4 ${
          isDark ? 'bg-[#1a1a1a] border-gray-800' : 'bg-white border-gray-200 shadow-sm'
        }`}>
          <div className="relative w-full md:flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text"
              placeholder="Search notices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 text-sm rounded-lg border outline-none transition-all ${
                isDark ? 'bg-[#0f0f0f] border-gray-800 text-gray-200 placeholder:text-gray-600 focus:ring-2 focus:ring-indigo-500/50' : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-2 focus:ring-indigo-500/30'
              }`}
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className={`flex p-1 border rounded-lg ${isDark ? 'bg-[#0f0f0f] border-gray-800' : 'bg-gray-100 border-gray-300'}`}>
              {['All', 'High', 'Medium', 'Low'].map((prio) => (
                <button
                  key={prio}
                  type="button"
                  onClick={() => setFilterPriority(prio)}
                  className={`text-xs px-3 py-1.5 rounded-md font-medium transition-all ${
                    filterPriority === prio ? (isDark ? 'bg-[#1a1a1a] text-white border border-gray-800 shadow' : 'bg-white text-gray-900 shadow-sm') : 'text-gray-400'
                  }`}
                >
                  {prio}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Notices Stack Feed */}
        <div className="space-y-4">
          {filteredMessages.map((msg) => {
            const isUnread = !readMessageIds.includes(msg._id);
            
            return (
              <div 
                key={msg._id}
                onClick={() => handleMessageClick(msg._id)}
                className={`border rounded-2xl p-6 transition-all duration-200 cursor-pointer relative group ${
                  isDark ? 'bg-[#1a1a1a]' : 'bg-white'
                } ${
                  isUnread 
                    ? 'border-indigo-500 dark:border-indigo-500/60 shadow-md ring-1 ring-indigo-500/20' 
                    : (isDark ? 'border-gray-800 hover:border-gray-700' : 'border-gray-200 hover:border-gray-300')
                }`}
              >
                
                {/* 3. Subtle Ribbon/Dot marker on unread items */}
                {isUnread && (
                  <div className="absolute top-6 left-0 w-1 h-8 bg-indigo-500 rounded-r-full" />
                )}

                {/* Meta Row */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3.5">
                  <div className="flex items-center gap-2">
                    
                    {/* Urgency Level Badges */}
                    {msg.priority === 'High' && (
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border flex items-center gap-1.5 ${
                        isDark ? 'bg-[#241212] border-red-900/40 text-red-400' : 'bg-red-50 border-red-200 text-red-700'
                      }`}>
                        <ShieldAlert size={12} className="animate-pulse" /> High Urgency
                      </span>
                    )}
                    {msg.priority === 'Medium' && (
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border flex items-center gap-1.5 ${
                        isDark ? 'bg-[#242012] border-yellow-900/30 text-yellow-400' : 'bg-yellow-50 border-yellow-200 text-yellow-700'
                      }`}>
                        <AlertTriangle size={12} /> Medium Priority
                      </span>
                    )}
                    {msg.priority === 'Low' && (
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border flex items-center gap-1.5 ${
                        isDark ? 'bg-[#1a2e1e] border-green-900/30 text-green-400' : 'bg-green-50 border-green-200 text-green-700'
                      }`}>
                        <Info size={12} /> General
                      </span>
                    )}

                    {/* Blue dot indicator for individual unread message */}
                    {isUnread && (
                      <span className="h-2 w-2 rounded-full bg-indigo-500 animate-ping inline-block ml-1" />
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Calendar size={13} />
                    <span>{formatDate(msg.createdAt)}</span>
                  </div>
                </div>

                {/* Main Content Layout */}
                <div className="space-y-2">
                  <h2 className={`text-lg font-bold tracking-tight flex items-center gap-2 ${
                    isUnread ? (isDark ? 'text-white' : 'text-gray-900') : 'text-gray-400 dark:text-gray-500'
                  }`}>
                    {msg.title}
                  </h2>
                  <p className={`text-sm leading-relaxed whitespace-pre-wrap ${
                    isUnread ? (isDark ? 'text-gray-300' : 'text-gray-600') : 'text-gray-400/80 dark:text-gray-500/70'
                  }`}>
                    {msg.body}
                  </p>
                </div>

                {msg.attachment && (
                  <div className={`mt-4 pt-3.5 border-t flex items-center justify-between ${isDark ? 'border-gray-800/60' : 'border-gray-100'}`}>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Paperclip size={13} />
                      <span className="truncate max-w-xs">{msg.attachment}</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-500 hover:text-indigo-400">
                      View File <ExternalLink size={12} />
                    </span>
                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default GetMessagePage;