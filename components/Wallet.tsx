import React, { useState } from 'react';
import { AppScreen, User } from '../types';

interface WalletProps {
  onNavigate: (screen: AppScreen) => void;
  user: User;
}

const Wallet: React.FC<WalletProps> = ({ onNavigate, user }) => {
  const isCourier = user.role === 'COURIER';
  const isAdmin = user.role === 'HOSPITAL_ADMIN';
  
  // Courier Wallet State
  const [showBalance, setShowBalance] = useState(true);
  const [autoSweep, setAutoSweep] = useState(true);

  // Hospital Wallet State
  const [topUpAmount, setTopUpAmount] = useState('');

  const handleCashOut = () => {
    alert("Processing cash out of GHS 420.50 to linked Mobile Money wallet (024...8821).");
  };

  const handleTopUp = (provider: string) => {
    const amount = topUpAmount || '100';
    alert(`Initiating top-up request of GHS ${amount} via ${provider}. Check your phone for the prompt.`);
    setTopUpAmount('');
  };

  // --- COURIER (BIKER) WALLET UI ---
  if (isCourier) {
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
              
              <button 
                onClick={handleCashOut}
                className="w-full bg-white text-slate-900 hover:bg-slate-100 font-bold py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-primary">payments</span>
                Cash Out Now
              </button>
            </div>
            
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
          </div>

          {/* Auto-Sweep Feature */}
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-8">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                  <span className="material-symbols-outlined">autorenew</span>
               </div>
               <div>
                  <h3 className="text-sm font-bold text-slate-900">Auto-Sweep</h3>
                  <p className="text-[10px] text-slate-500 font-medium">Transfer earnings daily at 11 PM</p>
               </div>
             </div>
             <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={autoSweep} onChange={() => setAutoSweep(!autoSweep)} className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
             </label>
          </div>

          {/* Recent History */}
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 px-1">Recent Activity</h3>
          <div className="space-y-3">
             {[
               { type: 'DELIVERY', title: 'Kidney Transport (STAT)', time: '10:42 AM', amount: '+ 58.50', status: 'Completed' },
               { type: 'TIP', title: 'Tip from Dr. Sarah', time: 'Yesterday', amount: '+ 10.00', status: 'Received' },
               { type: 'PAYOUT', title: 'Auto-Sweep to MoMo', time: 'Yesterday', amount: '- 145.20', status: 'Processed', isNegative: true },
             ].map((tx, idx) => (
                <div key={idx} className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                   <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.isNegative ? 'bg-slate-100 text-slate-500' : 'bg-green-50 text-green-600'}`}>
                         <span className="material-symbols-outlined text-lg">{tx.isNegative ? 'arrow_outward' : 'add'}</span>
                      </div>
                      <div>
                         <h4 className="text-sm font-bold text-slate-900">{tx.title}</h4>
                         <p className="text-[10px] text-slate-400 font-medium">{tx.time} • {tx.status}</p>
                      </div>
                   </div>
                   <span className={`font-black text-sm ${tx.isNegative ? 'text-slate-900' : 'text-green-600'}`}>
                      {tx.amount}
                   </span>
                </div>
             ))}
          </div>
        </main>
      </div>
    );
  }

  // --- HOSPITAL / CLIENT WALLET UI ---
  return (
      <div className="bg-slate-50 dark:bg-slate-900 min-h-screen text-slate-900 dark:text-white font-display pb-24 flex flex-col">
         {/* Header */}
         <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-4 flex justify-between items-center shadow-sm">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Wallet & Billing</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Korle Bu Teaching Hospital</p>
          </div>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-colors text-slate-600 dark:text-slate-400">
            <span className="material-symbols-outlined">receipt_long</span>
          </button>
        </header>

        <main className="flex-1 px-5 pt-6">
           {/* Card Balance */}
           <div className="w-full bg-gradient-to-br from-blue-600 to-blue-800 rounded-[2rem] p-6 text-white shadow-xl shadow-blue-900/20 border border-blue-500/20 relative overflow-hidden mb-8">
               <div className="relative z-10 flex flex-col h-full justify-between min-h-[140px]">
                  <div className="flex justify-between items-start">
                     <span className="text-blue-200 text-xs font-bold uppercase tracking-widest">{isAdmin ? 'Prepaid Balance' : 'Department Budget'}</span>
                     <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" className="h-6" alt="Mastercard" />
                  </div>
                  <div>
                     <h2 className="text-4xl font-black tracking-tight mb-1">GHS 2,400.00</h2>
                     <p className="text-blue-200 text-xs font-medium">Expires 12/28</p>
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                     <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
                     <span className="text-[10px] font-bold uppercase tracking-wider text-blue-100">Account Active</span>
                  </div>
               </div>
               {/* Decorative Circles */}
               <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
               <div className="absolute bottom-[-20px] left-[-20px] w-24 h-24 bg-blue-400/20 rounded-full blur-xl"></div>
           </div>

           {/* Quick Top Up Actions (ADMIN ONLY) */}
           {isAdmin ? (
             <>
               <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 px-1">Quick Top-Up</h3>
               <div className="grid grid-cols-3 gap-3 mb-6">
                  {[100, 200, 500].map((amt) => (
                     <button 
                       key={amt}
                       onClick={() => setTopUpAmount(amt.toString())}
                       className={`py-3 rounded-xl border-2 font-bold text-sm transition-all active:scale-95 ${topUpAmount === amt.toString() ? 'border-primary bg-primary text-white shadow-lg shadow-primary/30' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-primary/50'}`}
                     >
                        GHS {amt}
                     </button>
                  ))}
               </div>
               
               <div className="flex gap-3 mb-8">
                  <button 
                    onClick={() => handleTopUp('MTN MoMo')} 
                    disabled={!topUpAmount}
                    className="flex-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-4 rounded-xl font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
                  >
                     Top Up Now
                  </button>
                  <button className="w-14 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                     <span className="material-symbols-outlined">add</span>
                  </button>
               </div>
             </>
           ) : (
             <div className="mb-8 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/50 rounded-xl flex items-start gap-3">
               <span className="material-symbols-outlined text-amber-500">lock</span>
               <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Restricted Access</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Wallet management and top-ups are restricted to Hospital Administrators. Please contact your admin for budget increases.</p>
               </div>
             </div>
           )}

           {/* Invoices List */}
           <div className="flex items-center justify-between mb-4 px-1">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Recent Invoices</h3>
              <button className="text-xs font-bold text-primary">View All</button>
           </div>
           
           <div className="space-y-3">
              {[
                 { id: '#INV-2091', date: 'Today', desc: 'Organ Transport (STAT)', amount: '120.00', status: 'Pending' },
                 { id: '#INV-2088', date: 'Mar 10', desc: 'Blood Plasma (4u)', amount: '45.00', status: 'Paid' },
                 { id: '#INV-2042', date: 'Mar 08', desc: 'Lab Samples Batch', amount: '85.50', status: 'Paid' },
              ].map((inv, idx) => (
                 <div key={idx} className="flex items-center justify-between bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-lg bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-300">
                          <span className="material-symbols-outlined text-lg">description</span>
                       </div>
                       <div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">{inv.desc}</h4>
                          <p className="text-[10px] text-slate-400 font-medium">{inv.id} • {inv.date}</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <span className="block font-black text-sm text-slate-900 dark:text-white">GHS {inv.amount}</span>
                       <span className={`text-[9px] font-bold uppercase tracking-wider ${inv.status === 'Paid' ? 'text-green-500' : 'text-amber-500'}`}>{inv.status}</span>
                    </div>
                 </div>
              ))}
           </div>

        </main>
      </div>
  );
};

export default Wallet;