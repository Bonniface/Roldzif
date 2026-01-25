import React, { useState } from 'react';
import { AppScreen, User } from '../types';

interface WalletProps {
  onNavigate: (screen: AppScreen) => void;
  user: User;
}

const Wallet: React.FC<WalletProps> = ({ onNavigate, user }) => {
  const isCourier = user.role === 'COURIER';
  
  // Courier Wallet State
  const [showBalance, setShowBalance] = useState(true);
  const [copied, setCopied] = useState(false);
  const [autoSweep, setAutoSweep] = useState(true);

  const handleCopyBalance = () => {
    navigator.clipboard.writeText("420.50");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isCourier) {
    // --- COURIER (BIKER) WALLET UI (LIGHT THEME) ---
    return (
      <div className="bg-slate-50 min-h-screen text-slate-900 font-display pb-24 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-4 flex justify-between items-center shadow-sm">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">Rider Earnings</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">ID: 8821 • ONLINE</p>
          </div>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-colors text-slate-600">
            <span className="material-symbols-outlined">analytics</span>
          </button>
        </header>

        <main className="flex-1 px-5 pt-6">
          {/* Daily Goal Progress */}
          <div className="mb-6 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-end mb-2">
              <span className="text-xs font-bold uppercase text-slate-400">Daily Goal</span>
              <span className="text-xs font-bold text-primary">85%</span>
            </div>
            <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-primary shadow-[0_0_10px_rgba(59,130,246,0.3)] rounded-full" style={{ width: '85%' }}></div>
            </div>
            <p className="text-[10px] text-slate-500 mt-2 text-right font-medium">GHS 120.00 / GHS 150.00</p>
          </div>

          {/* Earnings Card */}
          <div className="w-full bg-slate-900 rounded-[2rem] p-6 text-white shadow-xl shadow-slate-900/20 border border-slate-800 relative overflow-hidden mb-6 group">
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                 <div className="flex items-center gap-2">
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Available Balance</p>
                    <button 
                      onClick={() => setShowBalance(!showBalance)} 
                      className="text-slate-500 hover:text-white transition-colors outline-none focus:text-white"
                    >
                      <span className="material-symbols-outlined text-base">
                        {showBalance ? 'visibility' : 'visibility_off'}
                      </span>
                    </button>
                 </div>
                 <span className="bg-white/10 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-white/10">Instant Pay</span>
              </div>
              
              <div className="flex items-center gap-3 mb-8 h-10">
                <h2 className="text-4xl font-black tracking-tight">
                  {showBalance ? (
                    <>GHS 420<span className="text-2xl opacity-60">.50</span></>
                  ) : (
                    <span className="tracking-widest text-3xl">••••••</span>
                  )}
                </h2>
              </div>
              
              <button className="w-full bg-white text-slate-900 hover:bg-slate-100 font-bold py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-[0.98]">
                <span className="material-symbols-outlined text-primary">payments</span>
                Cash Out Now
              </button>
            </div>
            
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
          </div>

          {/* Auto-Sweep Feature (Retention Tool) */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-4 border border-yellow-100 mb-8 flex items-center justify-between shadow-sm">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-slate-900 shadow-sm">
                  <span className="font-black text-xs">MoMo</span>
               </div>
               <div>
                  <h4 className="font-bold text-sm text-slate-900">Auto-Sweep</h4>
                  <p className="text-[10px] text-slate-500 font-medium w-40 leading-tight">Automatically send earnings to your MoMo wallet at 5 PM daily.</p>
               </div>
             </div>
             <label className="relative inline-flex items-center cursor-pointer">
               <input type="checkbox" checked={autoSweep} onChange={() => setAutoSweep(!autoSweep)} className="sr-only peer" />
               <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
             </label>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-start gap-1">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-1">
                 <span className="material-symbols-outlined text-lg">local_shipping</span>
              </div>
              <p className="text-2xl font-black text-slate-900">12</p>
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Today's Trips</span>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-start gap-1">
              <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center mb-1">
                 <span className="material-symbols-outlined text-lg">schedule</span>
              </div>
              <p className="text-2xl font-black text-slate-900">6.5<span className="text-sm font-medium text-slate-400 ml-0.5">h</span></p>
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Online Hours</span>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // --- HOSPITAL (PHARMACY) WALLET UI (LIGHT THEME) ---
  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 font-display pb-24 flex flex-col">
       {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-3 flex justify-between items-center shadow-sm">
        <div>
            <h1 className="text-lg font-bold text-slate-900">Corporate Wallet</h1>
            <p className="text-xs text-slate-500 font-medium">St. Jude Medical Center</p>
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-600">
          <span className="material-symbols-outlined">receipt_long</span>
        </button>
      </header>

      <main className="flex-1 px-5 pt-6">
        {/* Corporate Card */}
        <div className="w-full bg-gradient-to-r from-primary to-blue-600 rounded-[2rem] p-6 text-white shadow-xl shadow-primary/20 relative overflow-hidden mb-8">
           <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -mr-10 -mt-20"></div>
           
           <div className="relative z-10 flex flex-col h-full justify-between min-h-[140px]">
             <div>
               <div className="flex justify-between items-start">
                  <span className="flex items-center gap-1.5 bg-black/20 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10">
                    <span className="material-symbols-outlined text-sm">domain</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider">Business Account</span>
                  </span>
                  <span className="material-symbols-outlined opacity-50">contactless</span>
               </div>
             </div>

             <div>
                <p className="text-blue-100 text-xs font-bold uppercase tracking-widest mb-1">Prepaid Credits</p>
                <h2 className="text-3xl font-black tracking-tight">GHS 2,450.50</h2>
             </div>
           </div>
        </div>

        {/* Action Grid (Quick Load MoMo) */}
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">Quick Top-Up</p>
        <div className="grid grid-cols-3 gap-3 mb-8">
           <button className="flex flex-col items-center justify-center gap-2 bg-white p-3 rounded-xl border border-slate-200 shadow-sm hover:border-yellow-400 transition-colors group active:scale-95">
              <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center font-black text-slate-900 text-xs shadow-sm">
                MTN
              </div>
              <span className="text-xs font-bold text-slate-600">MoMo</span>
           </button>
           <button className="flex flex-col items-center justify-center gap-2 bg-white p-3 rounded-xl border border-slate-200 shadow-sm hover:border-red-500 transition-colors group active:scale-95">
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center font-black text-white text-xs shadow-sm">
                T
              </div>
              <span className="text-xs font-bold text-slate-600">Telecel</span>
           </button>
           <button className="flex flex-col items-center justify-center gap-2 bg-white p-3 rounded-xl border border-slate-200 shadow-sm hover:border-blue-400 transition-colors group active:scale-95">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-black text-white text-xs shadow-sm">
                AT
              </div>
              <span className="text-xs font-bold text-slate-600">AT Money</span>
           </button>
        </div>

        {/* Recent Transactions */}
        <div className="flex items-center justify-between mb-4 px-1">
           <h3 className="text-slate-900 text-lg font-bold">Recent Orders</h3>
           <button className="text-primary text-sm font-bold">View All</button>
        </div>
        
        <div className="space-y-3">
           <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 transition-colors">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                    <span className="material-symbols-outlined">local_shipping</span>
                 </div>
                 <div>
                    <p className="text-sm font-bold text-slate-900">Order #MD-9042</p>
                    <p className="text-xs text-slate-500 font-medium">Today • Hematology Dept</p>
                 </div>
              </div>
              <p className="text-sm font-bold text-slate-900">- GHS 45.00</p>
           </div>
        </div>
      </main>
    </div>
  );
};

export default Wallet;
