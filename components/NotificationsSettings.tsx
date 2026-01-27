import React, { useState } from 'react';
import { AppScreen } from '../types';

interface Props {
  onNavigate: (screen: AppScreen) => void;
}

const NotificationsSettings: React.FC<Props> = ({ onNavigate }) => {
  const [settings, setSettings] = useState({
    pushOrders: true,
    pushChat: true,
    pushPromos: false,
    emailInvoice: true,
    emailNewsletter: false,
    smsAlerts: true,
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display flex flex-col">
       <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 p-4 flex items-center gap-4">
        <button onClick={() => onNavigate(AppScreen.PROFILE)} className="size-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold text-slate-900 dark:text-white flex-1">Notifications</h1>
      </header>

      <main className="flex-1 p-5 space-y-8">
         <Section title="Push Notifications">
            <ToggleItem 
                label="New Orders & Updates" 
                desc="Get alerted instantly for job offers" 
                checked={settings.pushOrders} 
                onChange={() => toggle('pushOrders')} 
            />
            <ToggleItem 
                label="Chat Messages" 
                desc="Messages from hospitals or support" 
                checked={settings.pushChat} 
                onChange={() => toggle('pushChat')} 
            />
            <ToggleItem 
                label="Promotions & Tips" 
                desc="Daily goal tips and bonus offers" 
                checked={settings.pushPromos} 
                onChange={() => toggle('pushPromos')} 
            />
         </Section>

         <Section title="Email">
            <ToggleItem 
                label="Invoices & Receipts" 
                desc="Weekly earnings and payout summaries" 
                checked={settings.emailInvoice} 
                onChange={() => toggle('emailInvoice')} 
            />
            <ToggleItem 
                label="Newsletter" 
                desc="Product updates and community news" 
                checked={settings.emailNewsletter} 
                onChange={() => toggle('emailNewsletter')} 
            />
         </Section>

         <Section title="SMS">
            <ToggleItem 
                label="Critical Alerts" 
                desc="Emergency STAT order overrides" 
                checked={settings.smsAlerts} 
                onChange={() => toggle('smsAlerts')} 
            />
         </Section>
      </main>
    </div>
  );
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">{title}</h3>
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            {children}
        </div>
    </div>
);

const ToggleItem: React.FC<{ label: string; desc: string; checked: boolean; onChange: () => void }> = ({ label, desc, checked, onChange }) => (
    <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-700 last:border-0">
        <div>
            <p className="text-sm font-bold text-slate-900 dark:text-white">{label}</p>
            <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={checked} onChange={onChange} className="sr-only peer" />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
        </label>
    </div>
);

export default NotificationsSettings;
