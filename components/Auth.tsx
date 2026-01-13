
import React, { useState } from 'react';
import { User, Role } from '../types';

interface AuthProps {
  onLogin: (user: User) => void;
  isDarkMode?: boolean;
  toggleDarkMode?: () => void;
}

interface StoredAccount {
  username: string;
  ign: string;
  passwordHash: string;
  role: Role;
  isOnline: boolean;
}

const Auth: React.FC<AuthProps> = ({ onLogin, isDarkMode, toggleDarkMode }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [ign, setIgn] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const ADMIN_USERNAME = 'adminacces.com';
  const ADMIN_PASS = 'admin1233';

  const getUsersDB = (): StoredAccount[] => {
    const db = localStorage.getItem('sx_users_db');
    let accounts: StoredAccount[] = db ? JSON.parse(db) : [];
    
    if (!accounts.some(acc => acc.username === ADMIN_USERNAME)) {
      accounts.push({
        username: ADMIN_USERNAME,
        ign: 'Administrator',
        passwordHash: ADMIN_PASS,
        role: 'ADMIN',
        isOnline: false
      });
      localStorage.setItem('sx_users_db', JSON.stringify(accounts));
    }
    return accounts;
  };

  const updateAccountOnlineStatus = (username: string, status: boolean) => {
    const db = getUsersDB();
    const updated = db.map(acc => 
      acc.username === username ? { ...acc, isOnline: status } : acc
    );
    localStorage.setItem('sx_users_db', JSON.stringify(updated));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const normalizedUsername = username.trim().toLowerCase();
    const db = getUsersDB();

    if (isLogin) {
      const account = db.find(u => u.username.toLowerCase() === normalizedUsername);
      
      if (!account) {
        setError('Invalid credentials or account not found.');
        return;
      }

      if (account.passwordHash !== password) {
        setError('Invalid credentials or account not found.');
        return;
      }

      updateAccountOnlineStatus(account.username, true);

      const user: User = {
        id: Math.random().toString(36).substr(2, 9),
        username: account.username,
        ign: account.ign,
        role: account.role,
        joinedAt: new Date().toISOString(),
      };

      onLogin(user);
    } else {
      if (!username || !password || !ign) {
        setError('Please fill in all fields.');
        return;
      }

      const exists = db.some(u => u.username.toLowerCase() === normalizedUsername);
      if (exists) {
        setError('This username or email is already registered.');
        return;
      }

      const newAccount: StoredAccount = {
        username: normalizedUsername,
        ign: ign.trim(),
        passwordHash: password,
        role: 'USER',
        isOnline: false
      };

      const updatedDB = [...db, newAccount];
      localStorage.setItem('sx_users_db', JSON.stringify(updatedDB));

      setSuccess('Registration successful! Please sign in.');
      setIsLogin(true);
      setUsername('');
      setPassword('');
      setIgn('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pastel-gradient dark:bg-slate-950 p-4 transition-colors duration-500">
      {toggleDarkMode && (
        <button
          onClick={toggleDarkMode}
          className="absolute top-6 right-6 p-3 rounded-2xl bg-white/20 dark:bg-slate-800/40 backdrop-blur-md text-white border border-white/30 transition-all hover:scale-110 active:scale-95"
        >
          {isDarkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          )}
        </button>
      )}

      <div className="w-full max-w-md bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl overflow-hidden p-10 border border-white/50 dark:border-slate-800 transition-colors">
        <div className="text-center mb-10">
          <div className="inline-block p-4 bg-indigo-50 dark:bg-indigo-950/50 rounded-3xl mb-4 text-indigo-600 dark:text-indigo-400 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0012 3m0 18a10.003 10.003 0 01-5.712-1.838l.056-.087M12 11V3m0 8c2.132 0 4.113.714 5.713 1.914l-.056.087M12 3c1.723 0 3.333.434 4.747 1.206l-.054.09A10.003 10.003 0 0112 21" />
            </svg>
          </div>
          <h1 className="text-4xl font-outfit font-black text-slate-800 dark:text-white tracking-tighter transition-colors">SpiderX OG</h1>
          <p className="text-slate-400 dark:text-slate-500 mt-2 font-medium">Community Gateway</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1 transition-colors">Username or Email</label>
            <input
              type="text"
              className="w-full px-6 py-4 rounded-2xl border-2 border-transparent focus:border-indigo-200 focus:bg-white dark:focus:bg-slate-800 transition-all bg-[#F8FAFC] dark:bg-slate-800 text-[#1E293B] dark:text-slate-100 placeholder-[#94A3B8] dark:placeholder-slate-500 outline-none shadow-sm"
              placeholder="Enter your username or email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {!isLogin && (
            <div className="space-y-2 page-transition">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1 transition-colors">In-Game Name</label>
              <input
                type="text"
                className="w-full px-6 py-4 rounded-2xl border-2 border-transparent focus:border-indigo-200 focus:bg-white dark:focus:bg-slate-800 transition-all bg-[#F8FAFC] dark:bg-slate-800 text-[#1E293B] dark:text-slate-100 placeholder-[#94A3B8] dark:placeholder-slate-500 outline-none shadow-sm"
                placeholder="Enter your in-game name"
                value={ign}
                onChange={(e) => setIgn(e.target.value)}
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1 transition-colors">Password</label>
            <input
              type="password"
              className="w-full px-6 py-4 rounded-2xl border-2 border-transparent focus:border-indigo-200 focus:bg-white dark:focus:bg-slate-800 transition-all bg-[#F8FAFC] dark:bg-slate-800 text-[#1E293B] dark:text-slate-100 placeholder-[#94A3B8] dark:placeholder-slate-500 outline-none shadow-sm"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-100 dark:border-red-900/50 flex items-center gap-3 text-red-600 dark:text-red-400 text-sm font-semibold animate-shake">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {error}
            </div>
          )}

          {success && (
            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-900/50 flex items-center gap-3 text-emerald-600 dark:text-emerald-400 text-sm font-semibold">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              {success}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-lg shadow-xl shadow-indigo-100 dark:shadow-indigo-900/20 transition-all active:scale-[0.98]"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setSuccess('');
            }}
            className="text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 font-bold text-sm transition-colors"
          >
            {isLogin ? (
              <>Don't have an account? <span className="text-indigo-600 dark:text-indigo-400 underline underline-offset-4">Sign Up</span></>
            ) : (
              <>Already have an account? <span className="text-indigo-600 dark:text-indigo-400 underline underline-offset-4">Sign In</span></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
