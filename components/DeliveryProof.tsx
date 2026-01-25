import React, { useState, useEffect } from 'react';
import { AppScreen } from '../types';

interface DeliveryProofProps {
  onNavigate: (screen: AppScreen) => void;
}

const DeliveryProof: React.FC<DeliveryProofProps> = ({ onNavigate }) => {
  const [scanState, setScanState] = useState<'IDLE' | 'SCANNING' | 'VERIFIED'>('IDLE');

  useEffect(() => {
    let timer: number;
    if (scanState === 'SCANNING') {
      timer = window.setTimeout(() => {
        setScanState('VERIFIED');
      }, 3000); // Simulate 3s scan
    }
    return () => clearTimeout(timer);
  }, [scanState]);

  return (
    <div className="font-display bg-slate-50 text-slate-900 min-h-screen pb-32">
      {/* Header */}
      <header className="px-5 py-4 flex items-center justify-between border-b border-slate-200 bg-white sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate(AppScreen.JOB_FEED)} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
            <span className="material-symbols-outlined text-slate-600">arrow_back_ios_new</span>
          </button>
          <div>
            <h1 className="text-lg font-bold leading-tight">Delivery #MD-9042</h1>
            <p className="text-xs text-slate-500 font-medium">St. Jude Medical • Hematology</p>
          </div>
        </div>
        <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border border-primary/20">
          In Progress
        </div>
      </header>

      <main className="px-5 py-6 space-y-8">
        {/* Checklist Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Safety Checklist</h2>
            <span className="text-xs text-success font-semibold flex items-center gap-1 bg-success/5 px-2 py-1 rounded-md">
              <span className="material-symbols-outlined text-sm">verified_user</span> Secure Protocol
            </span>
          </div>
          <div className="space-y-3">
            {[
              { icon: 'lock', label: 'Biohazard bag sealed?', color: 'text-success bg-success/10', checked: true },
              { icon: 'ac_unit', label: 'Cooler box powered?', color: 'text-primary bg-primary/10', checked: true },
              { icon: 'label', label: 'Patient ID verified?', color: 'text-amber-500 bg-amber-500/10', checked: false },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div className="flex gap-3 items-center">
                  <div className={`w-10 h-10 rounded-lg ${item.color} flex items-center justify-center`}>
                    <span className="material-symbols-outlined">{item.icon}</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-700">{item.label}</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked={item.checked} className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success"></div>
                </label>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive QR Scanner Section */}
        <section>
          <div className="flex justify-between items-end mb-4">
             <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Identity Verification</h2>
             {scanState === 'VERIFIED' && (
                <button onClick={() => setScanState('IDLE')} className="text-xs font-bold text-primary">Re-scan</button>
             )}
          </div>
          
          <div className="relative bg-slate-900 rounded-2xl aspect-square flex items-center justify-center overflow-hidden border-4 border-white shadow-xl group ring-1 ring-slate-200">
            {/* Background Image (Always visible but dimmed) */}
            <div className="absolute inset-0 opacity-40 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAb5-TwxvhQTGX-wTe7Clox5_Fwek95SnO5UUmkRQCr0qJ62I73bzjwNJ8TgbOSo8XBzf7r6BwX6WtRtduFWS4z7Bjbw3sbeyqT_bhpVjlC4h8_ijQdXK51mm68FU9_KOSrLDXiQyh66HDp4w2oIFy5TlBwOApxjNMtdBhmM09MrQ_Yh7FE-DWCjIbpXSiAJf-xwY60i8Z9p_s8nvOCzCyS15DeYTJzeM89HlGPJUw28hcWj_vQ5e1xODUQoEbpSO4wDQCDs5ynifg')" }}></div>
            
            {/* STATE: IDLE */}
            {scanState === 'IDLE' && (
               <div className="relative z-10 flex flex-col items-center">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-4">
                     <span className="material-symbols-outlined text-white text-3xl">qr_code_scanner</span>
                  </div>
                  <button 
                    onClick={() => setScanState('SCANNING')}
                    className="bg-white text-slate-900 px-6 py-3 rounded-full font-bold text-sm shadow-lg hover:scale-105 transition-transform"
                  >
                    Scan Recipient ID
                  </button>
               </div>
            )}

            {/* STATE: SCANNING */}
            {scanState === 'SCANNING' && (
               <>
                  <div className="relative w-48 h-48 border-2 border-primary rounded-xl flex items-center justify-center">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-lg"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-lg"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-lg"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-lg"></div>
                    <div className="w-full h-0.5 bg-primary absolute top-0 shadow-[0_0_15px_rgba(0,95,184,0.8)] animate-[scan_2s_ease-in-out_infinite]"></div>
                  </div>
                  <div className="absolute bottom-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs font-medium border border-white/20 flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    Detecting QR Code...
                  </div>
               </>
            )}

            {/* STATE: VERIFIED */}
            {scanState === 'VERIFIED' && (
               <div className="absolute inset-0 bg-success/90 backdrop-blur-sm flex flex-col items-center justify-center text-white animate-in fade-in duration-300">
                  <div className="w-20 h-20 bg-white text-success rounded-full flex items-center justify-center mb-4 shadow-xl">
                     <span className="material-symbols-outlined text-5xl material-symbols-filled">check_circle</span>
                  </div>
                  <h3 className="text-2xl font-bold">Verified</h3>
                  <p className="text-white/90 font-medium text-sm mt-1">Dr. Sarah Chen</p>
                  <p className="text-white/70 text-xs mt-0.5">ID: H-402-GEN</p>
               </div>
            )}
          </div>
        </section>

        {/* Signature Pad */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Receiver Signature</h2>
            <button className="text-xs font-semibold text-primary">Clear Pad</button>
          </div>
          <div className="bg-white rounded-xl border-2 border-dashed border-slate-300 h-40 flex flex-col items-center justify-center relative overflow-hidden group hover:border-slate-400 transition-colors">
            <svg className="absolute inset-0 w-full h-full text-slate-900 pointer-events-none p-4" viewBox="0 0 400 150">
              <path d="M 50 100 Q 100 20 150 80 T 250 60 T 350 90" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="3"></path>
            </svg>
            <div className="flex flex-col items-center opacity-10">
              <span className="material-symbols-outlined text-4xl">edit</span>
              <p className="text-xs mt-1">Sign Here</p>
            </div>
            <div className="absolute bottom-3 left-0 w-full px-4 flex items-center gap-2">
              <div className="h-[1px] flex-1 bg-slate-100"></div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-tighter">Sign Above Line</span>
              <div className="h-[1px] flex-1 bg-slate-100"></div>
            </div>
          </div>
          <div className="mt-3">
            <input className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-slate-900 shadow-sm placeholder:text-slate-400" placeholder="Print Name (e.g. Dr. Sarah Chen)" type="text" />
          </div>
        </section>

        {/* Geotagged Photo */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Visual Evidence</h2>
          <button className="w-full bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center gap-2 hover:bg-slate-100 hover:border-slate-400 transition-all group">
            <div className="w-12 h-12 rounded-full bg-white text-slate-600 border border-slate-200 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined">photo_camera</span>
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-slate-700">Take Geotagged Drop-off Photo</p>
              <p className="text-[10px] text-slate-400 mt-1 flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-[10px]">location_on</span>
                Location logged: 5.6037° N, 0.1870° W
              </p>
            </div>
          </button>
        </section>
      </main>

      {/* Fixed Bottom Action */}
      <footer className="fixed bottom-14 left-0 right-0 p-5 bg-white/90 backdrop-blur-xl border-t border-slate-100 z-50 max-w-md mx-auto">
        <button 
          onClick={() => onNavigate(AppScreen.JOB_FEED)} 
          disabled={scanState !== 'VERIFIED'}
          className={`w-full py-4 rounded-xl font-bold text-lg shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-all ${scanState === 'VERIFIED' ? 'bg-success text-white shadow-success/20' : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'}`}
        >
          <span className="material-symbols-outlined">check_circle</span>
          Complete Delivery
        </button>
      </footer>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}} />
    </div>
  );
};

export default DeliveryProof;