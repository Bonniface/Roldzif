import React from 'react';
import { AppScreen } from '../types';

interface Props {
  onNavigate: (screen: AppScreen) => void;
}

const HelpSupport: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display flex flex-col">
       <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 p-4 flex items-center gap-4">
        <button onClick={() => onNavigate(AppScreen.PROFILE)} className="size-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold text-slate-900 dark:text-white flex-1">Help & Support</h1>
      </header>

      <main className="flex-1 p-5">
         <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">How can we help?</h2>
         <p className="text-slate-500 text-sm mb-6">Find answers or contact our support team.</p>

         {/* Search */}
         <div className="relative mb-8">
             <span className="absolute left-4 top-3.5 material-symbols-outlined text-slate-400">search</span>
             <input 
                type="text" 
                placeholder="Search for issues..." 
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary outline-none"
             />
         </div>

         {/* Quick Actions */}
         <div className="grid grid-cols-2 gap-4 mb-8">
             <button className="bg-primary/10 hover:bg-primary/20 p-4 rounded-xl flex flex-col items-center justify-center gap-2 border border-primary/20 transition-colors">
                 <span className="material-symbols-outlined text-2xl text-primary">chat</span>
                 <span className="text-sm font-bold text-primary">Live Chat</span>
             </button>
             <button className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 p-4 rounded-xl flex flex-col items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 transition-colors">
                 <span className="material-symbols-outlined text-2xl text-slate-700 dark:text-slate-300">call</span>
                 <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Call Support</span>
             </button>
         </div>

         {/* FAQs */}
         <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Frequently Asked Questions</h3>
         <div className="space-y-3">
             <FAQItem question="How do I change my vehicle details?" />
             <FAQItem question="When are payouts processed?" />
             <FAQItem question="What happens if I reject a STAT order?" />
             <FAQItem question="How to report a damaged package?" />
         </div>
      </main>
    </div>
  );
};

const FAQItem: React.FC<{ question: string }> = ({ question }) => (
    <button className="w-full flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm text-left">
        <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{question}</span>
        <span className="material-symbols-outlined text-slate-400">add</span>
    </button>
);

export default HelpSupport;
