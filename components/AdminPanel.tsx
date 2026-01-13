
import React, { useState, useEffect, useMemo } from 'react';
import { Announcement, ChatMessage, Role } from '../types';

interface AdminPanelProps {
  announcements: Announcement[];
  setAnnouncements: React.Dispatch<React.SetStateAction<Announcement[]>>;
  chatMessages: ChatMessage[];
}

interface StoredAccount {
  username: string;
  ign: string;
  passwordHash: string;
  role: Role;
  isOnline: boolean;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ announcements, setAnnouncements, chatMessages }) => {
  const [users, setUsers] = useState<StoredAccount[]>([]);

  // Load real users from the database
  useEffect(() => {
    const loadUsers = () => {
      const db = localStorage.getItem('sx_users_db');
      if (db) {
        setUsers(JSON.parse(db));
      }
    };
    loadUsers();
    
    // Check for updates periodically
    const interval = setInterval(loadUsers, 2000);
    return () => clearInterval(interval);
  }, []);

  const stats = useMemo(() => ({
    totalMembers: users.length,
    liveMessages: chatMessages.length,
    activeAnnouncements: announcements.length,
    onlineCount: users.filter(u => u.isOnline).length
  }), [users, chatMessages, announcements]);

  return (
    <div className="max-w-6xl mx-auto py-8 page-transition transition-colors duration-300">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-outfit font-black text-slate-800 dark:text-white tracking-tighter transition-colors">Admin Dashboard</h2>
          <p className="text-slate-400 dark:text-slate-500 font-medium transition-colors">Real-time community infrastructure & statistics.</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 px-4 py-2 rounded-2xl transition-colors">
          <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
          <span className="text-emerald-700 dark:text-emerald-400 font-bold text-xs uppercase tracking-widest">{stats.onlineCount} Online Now</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
          <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-2">Total Members</p>
          <p className="text-4xl font-outfit font-black text-slate-800 dark:text-white">{stats.totalMembers}</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
          <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-2">Live Messages</p>
          <p className="text-4xl font-outfit font-black text-slate-800 dark:text-white">{stats.liveMessages}</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
          <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-2">Official Posts</p>
          <p className="text-4xl font-outfit font-black text-slate-800 dark:text-white">{stats.activeAnnouncements}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Real User Directory */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col h-[600px] transition-colors">
          <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between bg-slate-50/30 dark:bg-slate-800/20">
            <h3 className="text-lg font-outfit font-black text-slate-800 dark:text-white tracking-tight">Member Directory</h3>
            <span className="text-[10px] font-black bg-indigo-600 text-white px-3 py-1.5 rounded-full uppercase">Live Feed</span>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-3">
            {users.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 dark:text-slate-600 opacity-50 space-y-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                <p className="font-bold">No registered members yet.</p>
              </div>
            ) : (
              users.map((u, i) => (
                <div key={i} className="flex items-center justify-between p-5 rounded-3xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-700 group">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-white shadow-lg relative ${u.role === 'ADMIN' ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700'}`}>
                      {u.ign.charAt(0).toUpperCase()}
                      {u.isOnline && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-slate-800 dark:text-slate-200">{u.ign}</span>
                        {u.role === 'ADMIN' && (
                          <span className="text-[9px] font-black bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-md uppercase transition-colors">Admin</span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono tracking-tight">{u.username}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-[10px] font-black uppercase tracking-widest ${u.isOnline ? 'text-emerald-500' : 'text-slate-300 dark:text-slate-600'}`}>
                      {u.isOnline ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Real Live Activity Log */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col h-[600px] transition-colors">
          <div className="p-8 border-b border-slate-50 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/20 transition-colors">
            <h3 className="text-lg font-outfit font-black text-slate-800 dark:text-white tracking-tight">Recent Activity Log</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-8 space-y-6">
            {chatMessages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 dark:text-slate-600 opacity-50 space-y-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                <p className="font-bold">No community activity logs.</p>
              </div>
            ) : (
              [...chatMessages].reverse().slice(0, 30).map(m => (
                <div key={m.id} className="text-xs border-l-4 border-indigo-100 dark:border-indigo-900 pl-4 py-2 transition-all hover:border-indigo-500 dark:hover:border-indigo-600 group">
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="font-black text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{m.ign}</span>
                    <span className="text-[9px] text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800/50 px-2 py-0.5 rounded font-mono transition-colors">{new Date(m.timestamp).toLocaleTimeString()}</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{m.text}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
