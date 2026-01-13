
import React from 'react';

const Monitoring: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 page-transition transition-colors duration-300">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl font-pixel text-slate-900 dark:text-white uppercase tracking-wider">⛏ SpiderX Server Monitoring</h2>
          <div className="flex items-center gap-3 mt-2">
            <span className="flex items-center gap-2 px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-lg text-xs font-bold border border-amber-200 dark:border-amber-800">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              🟡 BUILDING
            </span>
            <p className="text-gray-500 dark:text-slate-400 text-sm font-medium">Real-time network node status.</p>
          </div>
        </div>
        <div className="bg-slate-900 dark:bg-black p-4 rounded-xl border-t-4 border-slate-700 flex items-center gap-4">
           <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 font-black uppercase">Global Status</span>
              <span className="text-red-500 font-pixel text-xl tracking-tight">⛔ OFFLINE</span>
           </div>
           <div className="h-8 w-px bg-slate-800"></div>
           <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 font-black uppercase">Load</span>
              <span className="text-slate-400 font-pixel text-xl tracking-tight">0.00%</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {['Survival', 'Creative', 'Lobby'].map(server => (
          <div key={server} className="bg-[#c6c6c6] dark:bg-slate-800 p-1 rounded-sm border-2 border-slate-400 dark:border-slate-700 shadow-[inset_-4px_-4px_0px_0px_#555555,inset_4px_4px_0px_0px_#ffffff20]">
            <div className="bg-[#373737] p-4 flex flex-col items-center gap-2">
              <h4 className="font-pixel text-xl text-white uppercase">{server} Node</h4>
              <div className="w-full bg-black/50 rounded p-2 text-center">
                 <span className="font-pixel text-red-500">OFFLINE</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative group overflow-hidden bg-[#c6c6c6] dark:bg-slate-900 p-8 md:p-12 rounded-sm border-4 border-[#373737] shadow-[inset_-6px_-6px_0px_0px_#1d1d1d,inset_6px_6px_0px_0px_#ffffff60] dark:shadow-none">
        <div className="max-w-xl mx-auto relative z-10">
          <div className="mb-8 text-center">
             <div className="inline-block px-8 py-4 bg-black/20 dark:bg-black/40 rounded-xl mb-6">
                <h3 className="text-3xl md:text-5xl font-pixel text-indigo-900 dark:text-indigo-400 tracking-wider">
                  Currently Under Development
                </h3>
             </div>
             <p className="text-slate-800 dark:text-slate-300 font-medium text-lg mb-8 leading-relaxed">
               Our builders are working hard on the SpiderX monitoring system. <br className="hidden md:block" />
               Soon you’ll be able to see:
             </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             {[
               { icon: '⚡', text: 'TPS (Ticks Per Second)' },
               { icon: '📡', text: 'Player Ping' },
               { icon: '👥', text: 'Online Players' },
               { icon: '⏱', text: 'Server Uptime' },
               { icon: '🌍', text: 'World Performance' }
             ].map((item, idx) => (
               <div key={idx} className="flex items-center gap-3 p-4 bg-white/40 dark:bg-black/40 rounded-xl border border-white/50 dark:border-white/5 transition-all hover:scale-[1.02]">
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-pixel text-xl text-indigo-950 dark:text-indigo-200 tracking-wide">• {item.text}</span>
               </div>
             ))}
          </div>

          <div className="mt-12 pt-8 border-t border-black/10 flex justify-center">
             <div className="flex gap-4">
               <div className="w-3 h-3 bg-indigo-500 animate-bounce" style={{animationDelay: '0s'}}></div>
               <div className="w-3 h-3 bg-indigo-600 animate-bounce" style={{animationDelay: '0.1s'}}></div>
               <div className="w-3 h-3 bg-indigo-700 animate-bounce" style={{animationDelay: '0.2s'}}></div>
               <div className="w-3 h-3 bg-indigo-800 animate-bounce" style={{animationDelay: '0.3s'}}></div>
             </div>
          </div>
        </div>

        {/* Decorative Pixel Elements */}
        <div className="absolute top-4 left-4 w-4 h-4 bg-indigo-500/20 rounded-sm"></div>
        <div className="absolute bottom-4 right-4 w-8 h-8 bg-indigo-500/10 rounded-sm"></div>
        <div className="absolute top-1/2 left-8 w-2 h-2 bg-indigo-500/30 rounded-sm"></div>
      </div>
    </div>
  );
};

export default Monitoring;