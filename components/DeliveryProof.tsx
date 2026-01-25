import React from 'react';
import { AppScreen } from '../types';

interface DeliveryProofProps {
  onNavigate: (screen: AppScreen) => void;
}

const DeliveryProof: React.FC<DeliveryProofProps> = ({ onNavigate }) => {
  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen pb-32">
      {/* Header */}
      <header className="px-5 py-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-background-light dark:bg-background-dark sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate(AppScreen.JOB_FEED)} className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
            <span className="material-symbols-outlined">arrow_back_ios_new</span>
          </button>
          <div>
            <h1 className="text-lg font-bold">Delivery #MD-9042</h1>
            <p className="text-xs text-slate-500 font-medium">St. Jude Medical Center • Hematology</p>
          </div>
        </div>
        <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase">
          In Progress
        </div>
      </header>

      <main className="px-5 py-6 space-y-8">
        {/* Checklist Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500">Safety Checklist</h2>
            <span className="text-xs text-success font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">verified_user</span> Secure Protocol
            </span>
          </div>
          <div className="space-y-3">
            {[
              { icon: 'lock', label: 'Biohazard bag sealed?', color: 'text-success bg-success/10', checked: true },
              { icon: 'ac_unit', label: 'Cooler box powered?', color: 'text-primary bg-primary/10', checked: true },
              { icon: 'label', label: 'Patient ID verified?', color: 'text-amber-500 bg-amber-500/10', checked: false },
            ].map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex gap-3 items-center">
                  <div className={`w-10 h-10 rounded-lg ${item.color} flex items-center justify-center`}>
                    <span className="material-symbols-outlined">{item.icon}</span>
                  </div>
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked={item.checked} className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-300 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success"></div>
                </label>
              </div>
            ))}
          </div>
        </section>

        {/* QR Scanner Section */}
        <section>
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">Identity Verification</h2>
          <div className="relative bg-slate-900 rounded-2xl aspect-square flex items-center justify-center overflow-hidden border-4 border-slate-200 dark:border-slate-800 shadow-xl group">
            <div className="absolute inset-0 opacity-40 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAb5-TwxvhQTGX-wTe7Clox5_Fwek95SnO5UUmkRQCr0qJ62I73bzjwNJ8TgbOSo8XBzf7r6BwX6WtRtduFWS4z7Bjbw3sbeyqT_bhpVjlC4h8_ijQdXK51mm68FU9_KOSrLDXiQyh66HDp4w2oIFy5TlBwOApxjNMtdBhmM09MrQ_Yh7FE-DWCjIbpXSiAJf-xwY60i8Z9p_s8nvOCzCyS15DeYTJzeM89HlGPJUw28hcWj_vQ5e1xODUQoEbpSO4wDQCDs5ynifg')" }}></div>
            <div className="relative w-48 h-48 border-2 border-primary rounded-xl flex items-center justify-center">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-lg"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-lg"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-lg"></div>
              <div className="w-full h-0.5 bg-primary absolute top-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(0,95,184,0.8)] animate-pulse"></div>
              <span className="material-symbols-outlined text-white/50 text-5xl">qr_code_scanner</span>
            </div>
            <div className="absolute bottom-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs font-medium border border-white/20">
              Align QR code within the frame
            </div>
          </div>
        </section>

        {/* Signature Pad */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500">Receiver Signature</h2>
            <button className="text-xs font-semibold text-primary">Clear Pad</button>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 h-40 flex flex-col items-center justify-center relative overflow-hidden">
            <svg className="absolute inset-0 w-full h-full text-slate-900 dark:text-white pointer-events-none p-4" viewBox="0 0 400 150">
              <path d="M 50 100 Q 100 20 150 80 T 250 60 T 350 90" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="3"></path>
            </svg>
            <div className="flex flex-col items-center opacity-10">
              <span className="material-symbols-outlined text-4xl">edit</span>
              <p className="text-xs mt-1">Doctor's signature here</p>
            </div>
            <div className="absolute bottom-3 left-0 w-full px-4 flex items-center gap-2">
              <div className="h-[1px] flex-1 bg-slate-200 dark:bg-slate-800"></div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-tighter">Sign Above Line</span>
              <div className="h-[1px] flex-1 bg-slate-200 dark:bg-slate-800"></div>
            </div>
          </div>
          <div className="mt-3">
            <input className="w-full bg-white dark:bg-slate-800 border-none rounded-lg py-3 px-4 text-sm focus:ring-1 focus:ring-primary transition-all text-slate-900 dark:text-white" placeholder="Print Name (e.g. Dr. Sarah Chen)" type="text" />
          </div>
        </section>

        {/* Geotagged Photo */}
        <section>
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">Visual Evidence</h2>
          <button className="w-full bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-6 flex flex-col items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined">photo_camera</span>
            </div>
            <div className="text-center">
              <p className="text-sm font-bold">Take Geotagged Drop-off Photo</p>
              <p className="text-[10px] text-slate-500 mt-1 flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-[10px]">location_on</span>
                Location logged: 5.6037° N, 0.1870° W
              </p>
            </div>
          </button>
        </section>
      </main>

      {/* Fixed Bottom Action */}
      <footer className="fixed bottom-14 left-0 right-0 p-5 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 z-50 max-w-md mx-auto">
        <button onClick={() => onNavigate(AppScreen.JOB_FEED)} className="w-full bg-success text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-success/20 flex items-center justify-center gap-2 active:scale-95 transition-transform">
          <span className="material-symbols-outlined">check_circle</span>
          Complete Delivery
        </button>
      </footer>
    </div>
  );
};

export default DeliveryProof;
