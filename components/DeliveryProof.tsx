import React, { useState, useEffect } from 'react';
import { AppScreen } from '../types';

interface DeliveryProofProps {
  onNavigate: (screen: AppScreen) => void;
}

const DeliveryProof: React.FC<DeliveryProofProps> = ({ onNavigate }) => {
  const [scanState, setScanState] = useState<'IDLE' | 'SCANNING' | 'VERIFIED'>('IDLE');
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(5);

  useEffect(() => {
    let timer: number;
    if (scanState === 'SCANNING') {
      timer = window.setTimeout(() => {
        setScanState('VERIFIED');
      }, 3000); // Simulate 3s scan
    }
    return () => clearTimeout(timer);
  }, [scanState]);

  const handleCompleteDelivery = () => {
    setShowRating(true);
  };

  const handleSubmitFeedback = () => {
    // Navigate back to feed after rating
    onNavigate(AppScreen.JOB_FEED);
  };

  return (
    <div className="font-display bg-slate-50 text-slate-900 min-h-screen pb-32 relative">
      {/* Header */}
      <header className="px-5 py-4 flex items-center justify-between border-b border-slate-200 bg-white sticky top-0 z-40 shadow-sm">
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

        {/* Identity Verification (QR Scanner) Section */}
        <section>
          <div className="flex justify-between items-end mb-4">
             <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Identity Verification</h2>
             {scanState === 'VERIFIED' && (
                <button onClick={() => setScanState('IDLE')} className="text-xs font-bold text-primary hover:text-primary/80 transition-colors">Re-scan ID</button>
             )}
          </div>
          
          <div className="relative bg-slate-900 rounded-2xl aspect-[4/3] flex items-center justify-center overflow-hidden border-4 border-white shadow-xl group ring-1 ring-slate-200">
            {/* Background Camera Feed Simulation */}
            <div 
              className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ${scanState === 'IDLE' ? 'opacity-40 blur-sm scale-105' : 'opacity-100 blur-0 scale-100'}`} 
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            
            {/* STATE: IDLE - Instructions */}
            {scanState === 'IDLE' && (
               <div className="relative z-10 flex flex-col items-center p-6 text-center animate-in fade-in zoom-in duration-300">
                  <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-3 border border-white/20 shadow-lg">
                     <span className="material-symbols-outlined text-white text-3xl">qr_code_scanner</span>
                  </div>
                  <h3 className="text-white font-bold text-lg leading-tight">Scan Receiver ID</h3>
                  <p className="text-slate-300 text-xs font-medium mb-6 max-w-[200px]">Ask the recipient to present their staff ID badge for verification.</p>
                  <button 
                    onClick={() => setScanState('SCANNING')}
                    className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/30 active:scale-95 transition-all flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[20px]">photo_camera</span>
                    Activate Camera
                  </button>
               </div>
            )}

            {/* STATE: SCANNING - Viewfinder */}
            {scanState === 'SCANNING' && (
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="relative w-48 h-48 border border-white/30 rounded-2xl flex items-center justify-center shadow-[0_0_0_9999px_rgba(0,0,0,0.5)] z-10">
                    {/* Corner Brackets */}
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-primary rounded-tl-xl shadow-sm"></div>
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-primary rounded-tr-xl shadow-sm"></div>
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-primary rounded-bl-xl shadow-sm"></div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-primary rounded-br-xl shadow-sm"></div>
                    
                    {/* Laser Scan Animation */}
                    <div className="w-[90%] h-0.5 bg-red-500 absolute top-0 shadow-[0_0_15px_rgba(239,68,68,0.8)] animate-[scan_2s_ease-in-out_infinite] rounded-full"></div>
                  </div>
                  
                  <div className="absolute bottom-6 z-20 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    <span className="text-white text-xs font-bold tracking-wide">Align code within frame...</span>
                  </div>
               </div>
            )}

            {/* STATE: VERIFIED - Success Overlay */}
            {scanState === 'VERIFIED' && (
               <div className="absolute inset-0 z-20 bg-emerald-600/90 backdrop-blur-md flex flex-col items-center justify-center text-white animate-in fade-in duration-300">
                  <div className="w-20 h-20 bg-white text-emerald-600 rounded-full flex items-center justify-center mb-4 shadow-xl ring-4 ring-emerald-500/50 animate-in zoom-in duration-300 delay-100">
                     <span className="material-symbols-outlined text-5xl material-symbols-filled">check_circle</span>
                  </div>
                  <div className="text-center space-y-1 animate-in slide-in-from-bottom-4 duration-500 delay-200">
                    <h3 className="text-2xl font-black tracking-tight">Identity Verified</h3>
                    <p className="text-emerald-100 font-medium text-sm">Dr. Sarah Chen</p>
                    <div className="inline-flex items-center gap-1 bg-black/20 px-2 py-1 rounded-md mt-1">
                      <span className="material-symbols-outlined text-[12px]">badge</span>
                      <p className="text-white/90 text-xs font-mono">ID: H-402-GEN</p>
                    </div>
                  </div>
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
          onClick={handleCompleteDelivery} 
          disabled={scanState !== 'VERIFIED'}
          className={`w-full py-4 rounded-xl font-bold text-lg shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-all ${scanState === 'VERIFIED' ? 'bg-success text-white shadow-success/20' : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'}`}
        >
          <span className="material-symbols-outlined">check_circle</span>
          Complete Delivery
        </button>
      </footer>
      
      {/* Rating & Feedback Modal */}
      {showRating && (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl transform scale-100 animate-in zoom-in-95 duration-200">
             {/* Success Header */}
             <div className="flex flex-col items-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3 ring-4 ring-green-50">
                   <span className="material-symbols-outlined text-4xl text-green-600 material-symbols-filled">check</span>
                </div>
                <h3 className="text-xl font-black text-slate-900">Delivery Success!</h3>
                <p className="text-sm text-slate-500 font-medium">Recorded at 10:42 AM</p>
             </div>
             
             <div className="bg-slate-50 rounded-2xl p-4 mb-6 border border-slate-100">
               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center mb-3">Rate Service</p>
               
               {/* Star Rating */}
               <div className="flex justify-center gap-3 mb-4">
                 {[1, 2, 3, 4, 5].map((star) => (
                   <button 
                     key={star} 
                     onClick={() => setRating(star)}
                     className="focus:outline-none transition-transform active:scale-110 hover:scale-110"
                   >
                     <span className={`material-symbols-outlined text-4xl ${star <= rating ? 'material-symbols-filled text-amber-400 drop-shadow-sm' : 'text-slate-200'}`}>star</span>
                   </button>
                 ))}
               </div>
               
               {/* Quick Tags */}
               <div className="flex flex-wrap justify-center gap-2">
                 {['Punctual', 'Polite', 'Safe Handling', 'Efficient'].map((tag) => (
                   <button key={tag} className="px-3 py-1 bg-white rounded-full text-[10px] font-bold text-slate-600 border border-slate-200 shadow-sm hover:border-primary hover:text-primary transition-colors">
                     {tag}
                   </button>
                 ))}
               </div>
             </div>

             {/* Feedback Input */}
             <div className="mb-6">
               <textarea 
                 className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none text-slate-900 placeholder:text-slate-400"
                 rows={2}
                 placeholder="Any additional feedback?"
               ></textarea>
             </div>

             <button 
               onClick={handleSubmitFeedback}
               className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl shadow-lg shadow-slate-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
             >
               Submit & Finish
               <span className="material-symbols-outlined">arrow_forward</span>
             </button>
          </div>
        </div>
      )}

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