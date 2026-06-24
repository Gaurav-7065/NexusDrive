import React, { useState, useEffect } from 'react';
import { Calendar, Paperclip, AlertTriangle, Info, ShieldAlert, Search, Bell, ExternalLink } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

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

  // Theme Sync Watcher
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

  // 👈 Destruct loading from your global Notification context cloud
  const { messages, loading, markAsRead, readMessageId } = useNotification();

  // Client side sorting fallback + filtering layout rule logic
  const filteredMessages = (messages || [])
    .filter(msg => {
      const matchesSearch = msg.title?.toLowerCase().includes(searchTerm.toLowerCase()) || msg.body?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterPriority === 'All' || msg.priority === filterPriority;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Date Formatting Helper
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className={`w-full min-h-screen p-4 md:p-8 transition-colors duration-200 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
      <div className="w-full max-w-5xl mx-auto space-y-6">

        {/* Header Block */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className={`text-2xl font-bold tracking-tight flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <Bell className="text-indigo-500" size={24} />
              Placement Notice Board
            </h1>
            <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Stay updated with active operational announcements and corporate updates.
            </p>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className={`p-4 border rounded-xl flex flex-col md:flex-row items-center gap-4 ${isDark ? 'bg-[#1a1a1a] border-gray-800' : 'bg-white border-gray-200 shadow-sm'
          }`}>
          <div className="relative w-full md:flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search notices, keywords, or companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 text-sm rounded-lg border outline-none transition-all ${isDark
                ? 'bg-[#0f0f0f] border-gray-800 text-gray-200 placeholder:text-gray-600 focus:ring-2 focus:ring-indigo-500/50'
                : 'bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500/30'
                }`}
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
            <span className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              Priority:
            </span>
            <div className={`flex p-1 border rounded-lg ${isDark ? 'bg-[#0f0f0f] border-gray-800' : 'bg-gray-100 border-gray-300'}`}>
              {['All', 'High', 'Medium', 'Low'].map((prio) => (
                <button
                  key={prio}
                  type="button"
                  onClick={() => setFilterPriority(prio)}
                  className={`text-xs px-3 py-1.5 rounded-md font-medium transition-all ${filterPriority === prio
                    ? (isDark ? 'bg-[#1a1a1a] text-white border border-gray-800 shadow' : 'bg-white text-gray-900 shadow-sm')
                    : 'text-gray-400 hover:text-gray-500'
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
          {/* ⚡ Condition A: Server Request Is Loading */}
          {loading ? (
            [1, 2, 3].map((n) => (
              <div
                key={n}
                className={`border rounded-2xl p-6 space-y-4 animate-pulse ${isDark ? 'bg-[#1a1a1a] border-gray-800/60' : 'bg-white border-gray-100'
                  }`}
              >
                <div className="flex justify-between items-center">
                  <div className={`h-6 w-28 rounded-lg ${isDark ? 'bg-[#0f0f0f]' : 'bg-gray-200'}`} />
                  <div className={`h-4 w-20 rounded-lg ${isDark ? 'bg-[#0f0f0f]' : 'bg-gray-200'}`} />
                </div>
                <div className={`h-5 w-2/3 rounded-lg ${isDark ? 'bg-[#0f0f0f]' : 'bg-gray-200'}`} />
                <div className="space-y-2">
                  <div className={`h-3 w-full rounded-lg ${isDark ? 'bg-[#0f0f0f]' : 'bg-gray-200'}`} />
                  <div className={`h-3 w-4/5 rounded-lg ${isDark ? 'bg-[#0f0f0f]' : 'bg-gray-200'}`} />
                </div>
              </div>
            ))
          ) : filteredMessages.length === 0 ? (
            /* Condition B: Request finished, but absolutely NO notices match criteria */
            <div className={`p-12 border border-dashed rounded-2xl text-center ${isDark ? 'border-gray-800' : 'border-gray-300'}`}>
              <p className="text-sm text-gray-400">No matching tracking notices found on the dashboard wire.</p>
            </div>
          ) : (
            /* Condition C: Data safely parsed and mapped */

            filteredMessages.map((msg) => {

              const isUnread = !readMessageId.includes(msg._id);

            return (  <div
                key={msg._id}

                onClick={() => markAsRead(msg._id)}

                className={`border rounded-2xl p-6 transition-all duration-200 relative group cursor-pointer ${isDark
                  ? isUnread
                    ? 'bg-[#1e1e30] border-indigo-500/50 shadow-md shadow-indigo-500/5 ' // 🟣 Dark Theme Unread
                    : 'bg-[#1a1a1a] border-gray-800 '                                      // 🔘 Dark Theme Read
                  : isUnread
                    ? 'bg-indigo-50/40 border-indigo-400 shadow-sm '                    // ⚪ Light Theme Unread
                    : 'bg-white border-gray-200 '                                          // 🔘 Light Theme Read
                  }`}
              >

                


                {/* Meta Row: Priority and Date Info */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3.5">
                  <div className="flex items-center gap-1.5">
                    {msg.priority === 'High' && (
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border flex items-center gap-1.5 ${isDark ? 'bg-[#241212] border-red-900/40 text-red-400' : 'bg-red-50 border-red-200 text-red-700'
                        }`}>
                        <ShieldAlert size={13} className="animate-pulse" /> High Urgency
                      </span>
                    )}
                    {msg.priority === 'Medium' && (
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border flex items-center gap-1.5 ${isDark ? 'bg-[#242012] border-yellow-900/30 text-yellow-400' : 'bg-yellow-50 border-yellow-200 text-yellow-700'
                        }`}>
                        <AlertTriangle size={13} /> Medium Priority
                      </span>
                    )}
                    {msg.priority === 'Low' && (
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border flex items-center gap-1.5 ${isDark ? 'bg-[#1a2e1e] border-green-900/30 text-green-400' : 'bg-green-50 border-green-200 text-green-700'
                        }`}>
                        <Info size={13} /> General
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
                    <Calendar size={13} />
                    <span>{formatDate(msg.createdAt)}</span>
                  </div>
                </div>

                {/* Content block layout structures */}
                <div className="space-y-2">
                  <h2 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {msg.title}
                  </h2>
                  <p className={`text-sm leading-relaxed whitespace-pre-wrap ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {msg.body}
                  </p>
                </div>

                {/* Attachment Row */}
                {msg.attachment && (
                  <div className={`mt-4 pt-3.5 border-t flex items-center justify-between ${isDark ? 'border-gray-800/60' : 'border-gray-100'}`}>
                    <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                      <Paperclip size={13} />
                      <span className="truncate max-w-xs sm:max-w-md">{msg.attachment}</span>
                    </div>
                    <a
                      href={`#download-${msg._id}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-500 hover:text-indigo-400 transition-colors"
                    >
                      <span>View File</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                )}
              </div>)
            })
          )}
        </div>

      </div>
    </div>
  );
};

export default GetMessagePage;