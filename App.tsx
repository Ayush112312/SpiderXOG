
import React, { useState, useEffect } from 'react';
import { User, View, Announcement, ChatMessage } from './types';
import Auth from './components/Auth';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Monitoring from './components/Monitoring';
import Announcements from './components/Announcements';
import Chat from './components/Chat';
import AdminPanel from './components/AdminPanel';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<View>('monitoring');
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('sx_theme');
    return savedTheme === 'dark';
  });

  // Apply dark mode class to html element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('sx_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('sx_theme', 'light');
    }
  }, [isDarkMode]);

  // Persistence for user session
  useEffect(() => {
    const savedUser = localStorage.getItem('sx_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  // Announcements state - Initialized with ZERO reactions as requested
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const saved = localStorage.getItem('sx_announcements');
    return saved ? JSON.parse(saved) : [
      {
        id: '1',
        title: 'Welcome to SpiderX OG',
        content: 'We are thrilled to launch our new community hub. This is a fresh start for our OG members!',
        author: 'System',
        date: new Date().toISOString(),
        likes: 0,
        dislikes: 0,
        votedBy: {}
      }
    ];
  });

  // Chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('sx_chat');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('sx_announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('sx_chat', JSON.stringify(chatMessages));
  }, [chatMessages]);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('sx_user', JSON.stringify(newUser));
  };

  const handleLogout = () => {
    if (user) {
      const db = localStorage.getItem('sx_users_db');
      if (db) {
        const accounts = JSON.parse(db);
        const updated = accounts.map((acc: any) => 
          acc.username === user.username ? { ...acc, isOnline: false } : acc
        );
        localStorage.setItem('sx_users_db', JSON.stringify(updated));
      }
    }
    setUser(null);
    localStorage.removeItem('sx_user');
  };

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-pastel-gradient dark:bg-slate-950 transition-colors duration-500">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-[2rem] mb-4 shadow-2xl flex items-center justify-center border border-white/50 dark:border-slate-700">
             <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-indigo-900 dark:text-indigo-300 font-black tracking-widest text-xs uppercase">SpiderX OG</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Auth onLogin={handleLogin} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFF] dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <Navbar user={user} onLogout={handleLogout} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          currentView={currentView} 
          onViewChange={setCurrentView} 
          userRole={user.role} 
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-12 page-transition">
          {currentView === 'monitoring' && <Monitoring />}
          {currentView === 'announcements' && (
            <Announcements 
              user={user} 
              announcements={announcements} 
              setAnnouncements={setAnnouncements} 
            />
          )}
          {currentView === 'chat' && (
            <Chat 
              user={user} 
              messages={chatMessages} 
              onSendMessage={(text) => {
                const msg: ChatMessage = {
                  id: Date.now().toString(),
                  userId: user.id,
                  username: user.username,
                  ign: user.ign,
                  text,
                  timestamp: new Date().toISOString()
                };
                setChatMessages(prev => [...prev, msg]);
              }} 
            />
          )}
          {currentView === 'admin' && user.role === 'ADMIN' && (
            <AdminPanel 
              announcements={announcements} 
              setAnnouncements={setAnnouncements} 
              chatMessages={chatMessages}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
