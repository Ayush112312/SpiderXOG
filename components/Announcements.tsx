
import React, { useState } from 'react';
import { Announcement, User } from '../types';

interface AnnouncementsProps {
  user: User;
  announcements: Announcement[];
  setAnnouncements: React.Dispatch<React.SetStateAction<Announcement[]>>;
}

const Announcements: React.FC<AnnouncementsProps> = ({ user, announcements, setAnnouncements }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const isAdmin = user.role === 'ADMIN';

  const handleVote = (id: string, type: 'up' | 'down') => {
    setAnnouncements(prev => prev.map(ann => {
      if (ann.id !== id) return ann;

      const currentVote = ann.votedBy[user.id];
      const newVotedBy = { ...ann.votedBy };
      let newLikes = ann.likes;
      let newDislikes = ann.dislikes;

      // Logic to toggle or change vote
      if (currentVote === type) {
        // Remove vote
        delete newVotedBy[user.id];
        if (type === 'up') newLikes = Math.max(0, newLikes - 1);
        else newDislikes = Math.max(0, newDislikes - 1);
      } else {
        // Change vote or add new vote
        if (currentVote === 'up') newLikes = Math.max(0, newLikes - 1);
        if (currentVote === 'down') newDislikes = Math.max(0, newDislikes - 1);
        
        newVotedBy[user.id] = type;
        if (type === 'up') newLikes++;
        else newDislikes++;
      }

      return { ...ann, likes: newLikes, dislikes: newDislikes, votedBy: newVotedBy };
    }));
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;

    const newAnn: Announcement = {
      id: Date.now().toString(),
      title: newTitle,
      content: newContent,
      author: user.ign,
      date: new Date().toISOString(),
      likes: 0,
      dislikes: 0,
      votedBy: {}
    };

    setAnnouncements(prev => [newAnn, ...prev]);
    setIsAdding(false);
    setNewTitle('');
    setNewContent('');
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this announcement?')) {
      setAnnouncements(prev => prev.filter(a => a.id !== id));
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 transition-colors duration-300">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-outfit font-bold text-gray-900 dark:text-white">Announcements</h2>
          <p className="text-gray-500 dark:text-slate-400">Official updates from the SpiderX team.</p>
        </div>
        {isAdmin && (
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-medium shadow-lg hover:bg-indigo-700 transition-all flex items-center gap-2"
          >
            {isAdding ? 'Cancel' : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Post New
              </>
            )}
          </button>
        )}
      </div>

      {isAdding && isAdmin && (
        <form onSubmit={handleCreate} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-indigo-100 dark:border-indigo-900/50 shadow-xl mb-8 page-transition">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Post Title"
              className="w-full text-xl font-bold bg-transparent border-b border-gray-100 dark:border-slate-800 focus:border-indigo-300 outline-none pb-2 transition-all text-slate-900 dark:text-white placeholder-slate-400"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="What's the news today?"
              className="w-full h-32 bg-gray-50 dark:bg-slate-800 rounded-2xl p-4 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 outline-none transition-all resize-none text-slate-800 dark:text-slate-200 placeholder-slate-400"
              value={newContent}
              onChange={e => setNewContent(e.target.value)}
              required
            />
            <div className="flex justify-end">
              <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 shadow-md">
                Publish Announcement
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="space-y-6">
        {announcements.length === 0 ? (
          <div className="text-center py-20 text-gray-400 dark:text-slate-600">No announcements yet.</div>
        ) : (
          announcements.map(ann => (
            <div key={ann.id} className="group relative bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[2rem] border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-500 font-bold">
                    {ann.author.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-outfit font-bold text-xl text-gray-800 dark:text-white">{ann.title}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-full uppercase tracking-wider">Official</span>
                      <span className="text-xs text-gray-400 dark:text-slate-500">{new Date(ann.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                {isAdmin && (
                  <button onClick={() => handleDelete(ann.id)} className="p-2 text-gray-300 hover:text-red-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                  </button>
                )}
              </div>
              
              <div className="text-gray-600 dark:text-slate-300 leading-relaxed mb-8 whitespace-pre-wrap">
                {ann.content}
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-gray-50 dark:border-slate-800">
                <button 
                  onClick={() => handleVote(ann.id, 'up')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    ann.votedBy[user.id] === 'up' 
                      ? 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                      : 'text-gray-400 dark:text-slate-500 hover:bg-gray-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
                  <span className="font-bold">{ann.likes}</span>
                </button>
                <button 
                  onClick={() => handleVote(ann.id, 'down')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    ann.votedBy[user.id] === 'down' 
                      ? 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400' 
                      : 'text-gray-400 dark:text-slate-500 hover:bg-gray-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3"/></svg>
                  <span className="font-bold">{ann.dislikes}</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Announcements;
