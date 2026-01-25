import React, { useState } from 'react';
import { AppScreen } from '../types';

interface OrderPlacementProps {
  onNavigate: (screen: AppScreen) => void;
}

const OrderPlacement: React.FC<OrderPlacementProps> = ({ onNavigate }) => {
  const [showPayment, setShowPayment] = useState(false);
  const [category, setCategory] = useState<string>('Blood Sample');

  return (
    <div className="flex flex-col h-full min-h-screen bg-background-light dark:bg-background-dark pb-24">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center p-4 justify-between">
          <div className="text-primary flex size-10 shrink-0 items-center justify-center cursor-pointer">
            <span className="material-symbols-outlined">arrow_back_ios</span>
          </div>
          <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">New Pickup Order</h2>
          <div className="flex w-10 items-center justify-end">
            <button className="text-primary text-sm font-semibold">Cancel</button>
          </div>
        </div>
      </div>

      <main className="flex-1 pb-4">
        {/* Section: Pickup Location */}
        <div className="px-4 pt-6">
          <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] mb-4">Pickup Location</h3>
          <div className="flex flex-col gap-4">
            {/* Specialized Digital Address Input */}
            <div className="flex flex-col flex-1">
              <p className="text-slate-600 dark:text-slate-400 text-sm font-medium pb-2">GhanaPostGPS Code</p>
              <div className="flex w-full items-stretch rounded-xl shadow-sm">
                <div className="flex items-center justify-center bg-white dark:bg-slate-800 border border-r-0 border-slate-300 dark:border-slate-700 pl-4 rounded-l-xl text-primary">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <input 
                  className="flex w-full min-w-0 flex-1 bg-white dark:bg-slate-800 border-x-0 border-none focus:outline-0 focus:ring-0 h-14 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-base font-semibold px-3 uppercase text-slate-900 dark:text-white" 
                  placeholder="GA-183-9120" 
                  defaultValue="AK-482-1022" 
                />
                <button className="bg-primary hover:bg-primary/90 text-white px-4 rounded-r-xl font-bold text-sm transition-colors">
                  VERIFY
                </button>
              </div>
              <p className="text-xs text-primary mt-2 flex items-center gap-1 font-medium">
                <span className="material-symbols-outlined text-xs">check_circle</span> Verified: Komfo Anokye Teaching Hospital
              </p>
            </div>
            
            {/* Room / Ward Info */}
            <div className="flex gap-3">
              <label className="flex flex-col flex-1">
                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium pb-2">Room / Ward</p>
                <input className="w-full rounded-xl bg-white dark:bg-slate-800 border-none h-14 px-4 text-base focus:ring-1 focus:ring-primary outline-none transition-all text-slate-900 dark:text-white" placeholder="e.g. Ward 4B" />
              </label>
              <label className="flex flex-col flex-[0.7]">
                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium pb-2">Urgency</p>
                <select className="w-full rounded-xl bg-white dark:bg-slate-800 border-none h-14 px-4 text-base focus:ring-1 focus:ring-primary outline-none appearance-none text-slate-900 dark:text-white">
                  <option>Standard</option>
                  <option selected>STAT (Urgent)</option>
                </select>
              </label>
            </div>
          </div>
        </div>

        {/* Section: Item Category */}
        <div className="px-4 mt-8">
          <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] mb-4">Item Category</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: 'Blood Sample', icon: 'water_drop', color: 'text-red-500', sub: 'Temp Controlled' },
              { name: 'Vaccine', icon: 'ac_unit', color: 'text-cyan-500', sub: 'Cold Chain' },
              { name: 'Organ', icon: 'favorite', color: 'text-primary', sub: 'Priority 1' },
              { name: 'Pharma', icon: 'pill', color: 'text-emerald-500', sub: 'General Meds' },
            ].map((item) => (
              <div 
                key={item.name}
                onClick={() => setCategory(item.name)}
                className={`flex flex-col gap-3 rounded-xl border p-4 items-start cursor-pointer transition-all ${category === item.name ? 'border-primary bg-primary/10 ring-2 ring-primary/20' : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-primary'}`}
              >
                <div className={`${item.color} bg-white dark:bg-slate-900 p-2 rounded-lg shadow-sm`}>
                  <span className="material-symbols-outlined material-symbols-filled">{item.icon}</span>
                </div>
                <div>
                  <h2 className="text-slate-900 dark:text-white text-base font-bold leading-tight">{item.name}</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Instructions */}
        <div className="px-4 mt-8">
          <p className="text-slate-600 dark:text-slate-400 text-sm font-medium pb-2">Handling Instructions</p>
          <textarea className="w-full rounded-xl bg-white dark:bg-slate-800 border-none p-4 text-base min-h-[100px] focus:ring-1 focus:ring-primary outline-none text-slate-900 dark:text-white" placeholder="Add special instructions for the courier..."></textarea>
        </div>
      </main>

      {/* Main Action Button */}
      <div className="p-4 bg-background-light dark:bg-background-dark">
         <button onClick={() => setShowPayment(true)} className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-transform active:scale-[0.98]">
            Next Step
         </button>
      </div>

      {/* Payment Bottom Sheet Overlay */}
      {showPayment && (
        <>
          <div className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowPayment(false)}></div>
          <div className="fixed bottom-0 left-0 right-0 z-[70] bg-white dark:bg-[#121b26] rounded-t-3xl shadow-2xl max-w-md mx-auto transform transition-transform duration-300 border-t border-white/10 animate-in slide-in-from-bottom duration-300">
            {/* Handle Bar */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
            </div>
            <div className="px-6 pb-24">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h4 className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Total Amount</h4>
                  <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">GHS 45.00</p>
                </div>
                <div className="bg-primary/10 px-3 py-1 rounded-full">
                  <p className="text-primary text-[10px] font-bold uppercase tracking-tighter">Instant Delivery</p>
                </div>
              </div>

              {/* Flutterwave Payment Options */}
              <div className="mb-6">
                <p className="text-slate-600 dark:text-slate-400 text-xs font-semibold mb-3">Pay with Mobile Money (via Flutterwave)</p>
                <div className="grid grid-cols-3 gap-3">
                  {/* MTN MoMo */}
                  <button className="flex flex-col items-center justify-center p-3 rounded-xl border-2 border-primary bg-primary/5 transition-all">
                    <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center mb-2 overflow-hidden shadow-sm">
                      <div className="font-black text-[10px] text-blue-900">MTN</div>
                    </div>
                    <p className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase">MoMo</p>
                  </button>
                  {/* Telecel */}
                  <button className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:border-red-500 transition-all">
                    <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center mb-2 overflow-hidden shadow-sm">
                      <span className="text-white font-bold text-xs">T</span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase">Telecel</p>
                  </button>
                  {/* AT Money */}
                  <button className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:border-blue-400 transition-all">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mb-2 overflow-hidden shadow-sm">
                      <span className="text-white font-bold text-xs uppercase">at</span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase">AT Money</p>
                  </button>
                </div>
              </div>

              {/* Mobile Money Number Input */}
              <div className="mb-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <span className="text-slate-400 text-sm font-bold">+233</span>
                  </div>
                  <input className="block w-full pl-16 pr-4 py-4 rounded-xl bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary text-base font-semibold text-slate-900 dark:text-white" placeholder="024 XXX XXXX" type="tel" defaultValue="024 123 4567" />
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-2 text-center">
                  Payment secured by <span className="text-primary font-bold">Flutterwave</span>
                </p>
              </div>

              {/* Main CTA */}
              <button 
                onClick={() => { setShowPayment(false); onNavigate(AppScreen.ORDER_TRACKING); }}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
              >
                <span className="material-symbols-outlined">lock</span>
                Pay & Place Order
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderPlacement;
