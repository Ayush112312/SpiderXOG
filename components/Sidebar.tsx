
import React from 'react';
import { View, Role } from '../types';

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
  userRole: Role;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, userRole }) => {
  const items = [
    { id: 'monitoring', label: 'Monitoring', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
    )},
    { id: 'announcements', label: 'Announcements', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
    )},
    { id: 'chat', label: 'Live Chat', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
    )},
  ];

  if (userRole === 'ADMIN') {
    items.push({ id: 'admin', label: 'Admin Hub', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    )});
  }

  return (
    <aside className="w-20 md:w-64 border-r border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 h-full hidden sm:flex flex-col py-6 transition-colors duration-300">
      <div className="space-y-2 px-3">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id as View)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              currentView === item.id 
                ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-semibold' 
                : 'text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800'
            }`}
          >
            <span className={currentView === item.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400 dark:text-slate-600'}>
              {item.icon}
            </span>
            <span className="hidden md:block text-sm">{item.label}</span>
          </button>
        ))}
      </div>
      
      <div className="mt-auto px-6 pb-4">
        <div className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-800/50 border border-dashed border-gray-200 dark:border-slate-700 hidden md:block">
          <p className="text-[10px] text-gray-400 dark:text-slate-500 font-bold uppercase tracking-wider mb-2">Community Stats</p>
          <div className="flex justify-between items-center text-xs text-gray-600 dark:text-slate-400">
            <span>Online Users</span>
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
