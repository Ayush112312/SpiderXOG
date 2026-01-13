
import React, { useState, useEffect, useRef } from 'react';
import { User, ChatMessage } from '../types';

interface ChatProps {
  user: User;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
}

const Chat: React.FC<ChatProps> = ({ user, messages, onSendMessage }) => {
  const [text, setText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSendMessage(text);
    setText('');
  };

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-140px)] flex flex-col bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl overflow-hidden border border-gray-100 dark:border-slate-800 transition-colors duration-300">
      <div className="p-6 border-b border-gray-50 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-pastel-gradient dark:bg-indigo-900 flex items-center justify-center text-white shadow-md">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
          <div>
            <h2 className="text-xl font-outfit font-bold text-gray-800 dark:text-white">Public Lounge</h2>
            <p className="text-xs text-green-500 font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              Live Conversation
            </p>
          </div>
        </div>
        <div className="hidden sm:flex items-center -space-x-2">
           {[1,2,3].map(i => (
             <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800 bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-[10px] text-gray-400 dark:text-slate-400 font-bold">
               U{i}
             </div>
           ))}
           <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800 bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-[10px] text-indigo-500 dark:text-indigo-400 font-bold">
             +12
           </div>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth bg-gray-50/30 dark:bg-slate-950/20"
      >
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 dark:text-slate-600 opacity-50 space-y-4">
             <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
             <p className="font-bold">Be the first to say hello!</p>
          </div>
        ) : (
          messages.map((msg, idx) => {
            const isMe = msg.userId === user.id;
            const showHeader = idx === 0 || messages[idx-1].userId !== msg.userId;

            return (
              <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                {showHeader && (
                  <div className="flex items-center gap-2 mb-1 px-1">
                    <span className="text-xs font-bold text-gray-700 dark:text-slate-300">{msg.ign}</span>
                    <span className="text-[10px] text-gray-400 dark:text-slate-500">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                )}
                <div 
                  className={`max-w-[80%] px-5 py-3 rounded-[1.5rem] shadow-sm text-sm ${
                    isMe 
                      ? 'bg-indigo-600 text-white rounded-tr-none' 
                      : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-200 rounded-tl-none border border-gray-100 dark:border-slate-700'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="p-6 bg-white dark:bg-slate-900 border-t border-gray-50 dark:border-slate-800">
        <form onSubmit={handleSubmit} className="relative flex items-center gap-3">
          <input
            type="text"
            className="flex-1 bg-gray-50 dark:bg-slate-800 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 outline-none transition-all text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
            placeholder="Type your message here..."
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <button 
            type="submit"
            className="p-4 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-100 dark:shadow-indigo-900/20 hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polyline points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
