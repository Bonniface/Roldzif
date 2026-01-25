import React from 'react';
import { AppScreen, User } from '../types';

interface WalletProps {
  onNavigate: (screen: AppScreen) => void;
  user: User;
}

const Wallet: React.FC<WalletProps> = ({ onNavigate, user }) => {
  const isCourier = user.role === 'COURIER';

  if (isCourier) {
    // --- COURIER (BIKER) WALLET UI ---
    return (
      <div className="bg-slate-900 min-h-screen text-white font-display pb-24 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-white/10 px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Rider Earnings</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">ID: 8821 • ONLINE</p>
          </div>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 transition-colors text-white">
            <span className="material-symbols-outlined">analytics</span>
          </button>
        </header>

        <main className="flex-1 px-5 pt-6">
          {/* Daily Goal Progress */}
          <div className="mb-6">
            <div className="flex justify-between items-end mb-2">
              <span className="text-xs font-bold uppercase text-slate-400">Daily Goal</span>
              <span className="text-xs font-bold text-primary">85%</span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-primary shadow-[0_0_10px_rgba(59,130,246,0.5)]" style={{ width: '85%' }}></div>
            </div>
            <p className="text-[10px] text-slate-500 mt-2 text-right">GHS 120.00 / GHS 150.00</p>
          </div>

          {/* Earnings Card */}
          <div className="w-full bg-gradient-to-br from-slate-800 to-black rounded-2xl p-6 text-white shadow-2xl shadow-black/50 border border-slate-700 relative overflow-hidden mb-8">
            <div className="relative z-10">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Available Balance</p>
              <h2 className="text-4xl font-black tracking-tight mb-6">GHS 420<span className="text-2xl opacity-60">.50</span></h2>
              
              <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-transform active:scale-[0.98]">
                <span className="material-symbols-outlined">payments</span>
                Cash Out Now
              </button>
            </div>
            
            {/* Visual Flair */}
            <div className="absolute -right-6 -bottom-10 opacity-10 rotate-12">
               <span className="material-symbols-outlined text-[150px]">two_wheeler</span>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5">
              <span className="text-slate-400 text-[10px] font-bold uppercase">Today's Trips</span>
              <p className="text-2xl font-black mt-1">12</p>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5">
              <span className="text-slate-400 text-[10px] font-bold uppercase">Online Hours</span>
              <p className="text-2xl font-black mt-1">6.5<span className="text-sm font-medium text-slate-500">h</span></p>
            </div>
          </div>

          {/* Transaction History */}
          <h3 className="text-white text-lg font-bold mb-4">Activity</h3>
          <div className="space-y-3">
             <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/30 border border-white/5">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
                      <span className="material-symbols-outlined">arrow_downward</span>
                   </div>
                   <div>
                      <p className="text-sm font-bold text-white">Delivery Payout</p>
                      <p className="text-xs text-slate-500">10:42 AM • Korle Bu Teaching Hospital</p>
                   </div>
                </div>
                <p className="text-sm font-bold text-emerald-500">+ GHS 45.00</p>
             </div>
             
             <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/30 border border-white/5">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                      <span className="material-symbols-outlined">volunteer_activism</span>
                   </div>
                   <div>
                      <p className="text-sm font-bold text-white">Tip Received</p>
                      <p className="text-xs text-slate-500">Yesterday • Dr. Ansah</p>
                   </div>
                </div>
                <p className="text-sm font-bold text-emerald-500">+ GHS 15.00</p>
             </div>
          </div>
        </main>
      </div>
    );
  }

  // --- HOSPITAL (PHARMACY) WALLET UI ---
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen text-slate-900 dark:text-white font-display pb-24 flex flex-col">
       {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex justify-between items-center">
        <div>
            <h1 className="text-lg font-bold">Corporate Wallet</h1>
            <p className="text-xs text-slate-500 font-medium">St. Jude Medical Center</p>
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300">
          <span className="material-symbols-outlined">receipt_long</span>
        </button>
      </header>

      <main className="flex-1 px-5 pt-6">
        {/* Corporate Card */}
        <div className="w-full bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-6 text-white shadow-xl shadow-primary/20 relative overflow-hidden mb-8">
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

        {/* Action Grid */}
        <div className="grid grid-cols-2 gap-3 mb-8">
           <button className="flex flex-col items-center justify-center gap-2 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-primary transition-colors group">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined">add_card</span>
              </div>
              <span className="text-sm font-bold">Load Funds</span>
           </button>
           <button className="flex flex-col items-center justify-center gap-2 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-primary transition-colors group">
              <div className="w-12 h-12 rounded-full bg-purple-500/10 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <span className="material-symbols-outlined">description</span>
              </div>
              <span className="text-sm font-bold">Invoices</span>
           </button>
        </div>

        {/* Recent Transactions */}
        <div className="flex items-center justify-between mb-4">
           <h3 className="text-slate-900 dark:text-white text-lg font-bold">Recent Orders</h3>
           <button className="text-primary text-sm font-bold">View All</button>
        </div>
        
        <div className="space-y-3">
           <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500">
                    <span className="material-symbols-outlined">local_shipping</span>
                 </div>
                 <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">Order #MD-9042</p>
                    <p className="text-xs text-slate-500">Today • Hematology Dept</p>
                 </div>
              </div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">- GHS 45.00</p>
           </div>

           <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500">
                    <span className="material-symbols-outlined">local_shipping</span>
                 </div>
                 <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">Order #MD-8821</p>
                    <p className="text-xs text-slate-500">Yesterday • Oncology</p>
                 </div>
              </div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">- GHS 12.50</p>
           </div>
           
           <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center">
                    <span className="material-symbols-outlined">account_balance</span>
                 </div>
                 <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">Bank Top-Up</p>
                    <p className="text-xs text-slate-500">Mar 12 • Accounts Payable</p>
                 </div>
              </div>
              <p className="text-sm font-bold text-green-600">+ GHS 5,000.00</p>
           </div>
        </div>
      </main>
    </div>
  );
};

export default Wallet;