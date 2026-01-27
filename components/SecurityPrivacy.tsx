import React from 'react';
import { AppScreen } from '../types';

interface Props {
  onNavigate: (screen: AppScreen) => void;
}

const SecurityPrivacy: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display flex flex-col">
       <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 p-4 flex items-center gap-4">
        <button onClick={() => onNavigate(AppScreen.PROFILE)} className="size-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold text-slate-900 dark:text-white flex-1">Security & Privacy</h1>
      </header>

      <main className="flex-1 p-5 space-y-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl flex items-start gap-3 border border-blue-100 dark:border-blue-800">
             <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">shield</span>
             <div>
                 <h3 className="text-sm font-bold text-blue-800 dark:text-blue-300">Account Protected</h3>
                 <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Your account uses 2-Factor Authentication via SMS.</p>
             </div>
        </div>

        <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Login & Recovery</h3>
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <ActionItem icon="lock" label="Change Password" />
                <div className="h-px bg-slate-100 dark:bg-slate-700 mx-4"></div>
                <ActionItem icon="phonelink_lock" label="2-Factor Authentication" value="Enabled" />
                <div className="h-px bg-slate-100 dark:bg-slate-700 mx-4"></div>
                <ActionItem icon="fingerprint" label="FaceID / TouchID" toggle />
            </div>
        </div>

        <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Data Management</h3>
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <ActionItem icon="download" label="Download My Data" />
                <div className="h-px bg-slate-100 dark:bg-slate-700 mx-4"></div>
                <button className="w-full flex items-center justify-between p-4 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left group">
                    <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full bg-red-50 dark:bg-red-900/30 flex items-center justify-center text-red-500">
                            <span className="material-symbols-outlined text-lg">delete</span>
                        </div>
                        <span className="font-semibold text-sm text-red-600">Delete Account</span>
                    </div>
                </button>
            </div>
        </div>
      </main>
    </div>
  );
};

const ActionItem: React.FC<{ icon: string; label: string; value?: string; toggle?: boolean }> = ({ icon, label, value, toggle }) => (
    <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-left">
        <div className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-300">
                <span className="material-symbols-outlined text-lg">{icon}</span>
            </div>
            <span className="font-semibold text-sm text-slate-700 dark:text-slate-200">{label}</span>
        </div>
        <div className="flex items-center gap-2">
            {value && <span className="text-xs font-medium text-slate-400">{value}</span>}
            {toggle ? (
                <div className="w-11 h-6 bg-primary rounded-full relative">
                    <div className="absolute top-[2px] right-[2px] h-5 w-5 bg-white rounded-full"></div>
                </div>
            ) : (
                <span className="material-symbols-outlined text-slate-400">chevron_right</span>
            )}
        </div>
    </button>
);

export default SecurityPrivacy;
