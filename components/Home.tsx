import React from 'react';
import { AppScreen, User } from '../types';

interface HomeProps {
  onNavigate: (screen: AppScreen) => void;
  user: User;
  onCategorySelect?: (category: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate, user, onCategorySelect }) => {
  const isCourier = user.role === 'COURIER';
  const isDoctor = user.role === 'DOCTOR' || user.role === 'PHARMACIST' || user.role === 'HR';

  const handleCardClick = (category: string) => {
    if (isCourier && onCategorySelect) {
      onCategorySelect(category);
    } else {
      onNavigate(isCourier ? AppScreen.MISSIONS : AppScreen.ORDER_PLACEMENT);
    }
  };

  return (
    <div className="bg-white min-h-screen pb-32 font-display text-slate-900">
      {/* Header */}
      <header className="px-5 pt-4 pb-2 flex justify-between items-center bg-white sticky top-0 z-50">
        <div className="relative">
          <button onClick={() => onNavigate(AppScreen.PROFILE)} className="w-11 h-11 rounded-full bg-slate-50 flex items-center justify-center overflow-hidden border border-slate-100 shadow-sm">
            <img src={isCourier ? "https://i.pravatar.cc/100?img=11" : "https://i.pravatar.cc/100?img=5"} alt="Profile" className="w-full h-full object-cover" />
          </button>
          <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-white"></div>
        </div>
        <button className="w-11 h-11 rounded-full bg-white flex items-center justify-center border border-slate-100 shadow-sm text-slate-700 hover:bg-slate-50 transition-colors">
          <span className="material-symbols-outlined text-[26px]">notifications</span>
        </button>
      </header>

      <main>
        {/* Virtual Card or Dashboard Summary */}
        <div className="px-5 py-6 overflow-x-auto no-scrollbar flex gap-4 snap-x snap-mandatory">
          {isDoctor ? (
            /* DOCTOR / STAFF DASHBOARD CARD */
            <div className="relative w-full h-52 rounded-[2rem] overflow-hidden flex shadow-card snap-center shrink-0 ring-1 ring-black/5 bg-slate-900 text-white">
               {/* Background Effects */}
               <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
               <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -ml-10 -mb-10"></div>

               <div className="relative z-10 p-6 flex flex-col justify-between w-full h-full">
                  <div className="flex justify-between items-start">
                     <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Current Shift</p>
                        <h2 className="text-2xl font-bold">Good Morning, Dr.</h2>
                     </div>
                     <div className="bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-[10px] font-bold uppercase">On Duty</span>
                     </div>
                  </div>

                  <div className="flex gap-4">
                     <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
                        <p className="text-3xl font-black">3</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Active Orders</p>
                     </div>
                     <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
                        <p className="text-3xl font-black text-amber-400">1</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Pending Lab</p>
                     </div>
                  </div>

                  <button 
                    onClick={() => onNavigate(AppScreen.ORDER_PLACEMENT)}
                    className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
                  >
                    <span className="material-symbols-outlined text-[18px]">add_circle</span>
                    New Transport Request
                  </button>
               </div>
            </div>
          ) : (
            /* COURIER / ADMIN FINANCIAL CARD */
            <div className="relative w-full h-52 rounded-[2rem] overflow-hidden flex shadow-card snap-center shrink-0 ring-1 ring-black/5">
              {/* Left Panel: Gold Gradient */}
              <div className="w-[38%] bg-gradient-to-b from-[#FFD54F] to-[#FFB300] p-5 flex flex-col justify-between text-white relative overflow-hidden">
                 {/* Decorative Circle */}
                 <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-white/20 blur-2xl"></div>
                 
                 <div className="z-10 flex flex-col gap-1.5">
                    {/* Brand Logo Abstract */}
                    <div className="flex items-center gap-1 opacity-100">
                      <div className="w-3 h-3 bg-red-600 rounded-[2px] rotate-45"></div>
                      <div className="w-3 h-3 bg-green-600 rounded-[2px] rotate-45 -ml-1.5"></div>
                      <span className="text-[11px] font-black text-slate-900 ml-1.5 tracking-tight">roldzif</span>
                    </div>
                    
                    {/* Star Icon */}
                    <div className="mt-4 text-white/90">
                       <span className="material-symbols-filled text-4xl drop-shadow-sm">star</span>
                    </div>
                 </div>

                 <div className="z-10 mt-auto">
                   <p className="text-[10px] uppercase font-bold text-slate-900/60 tracking-wider mb-0.5">Balance</p>
                   <p className="text-[11px] font-black text-slate-900">GHS</p>
                   <p className="text-2xl font-black tracking-tighter text-slate-900 leading-none">
                     {isCourier ? '420.50' : '2,400.00'}
                   </p>
                 </div>
              </div>

              {/* Right Panel: White Pattern */}
              <div className="w-[62%] bg-white p-5 flex flex-col justify-between relative">
                {/* Pattern Background */}
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                
                <div className="flex justify-end items-start z-10">
                  <p className="text-[10px] text-slate-400 font-medium w-24 leading-tight text-right">Virtual Card Details</p>
                </div>
                
                {/* Quick Top-up Integration (Visible for Admin/Courier) */}
                <div className="flex flex-col items-end gap-3 z-10">
                  <button 
                    onClick={() => onNavigate(AppScreen.WALLET)}
                    className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 pl-1.5 pr-2.5 py-1.5 rounded-full hover:bg-slate-100 transition-colors"
                  >
                    <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-[8px] font-black text-slate-900">M</div>
                    <span className="text-[10px] font-bold text-slate-700">Quick Load</span>
                  </button>

                  <div className="flex flex-col items-end">
                      <p className="text-slate-900 font-bold tracking-[0.15em] text-lg">1764 6367</p>
                      <p className="text-[9px] text-slate-400 font-bold mt-1">Card Number</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Transport Categories Reel (Dynamic States) */}
        <div className="pl-5 pr-5 py-2 mb-4 overflow-x-auto no-scrollbar flex items-center gap-6">
           {[
             { label: 'Drone', icon: 'helicopter', disabled: true, note: 'Windy' }, 
             { label: 'Trotro X', icon: 'airport_shuttle', special: true }, // Trotro Express
             { label: 'Truck', icon: 'local_shipping' },
             { label: 'Bike', icon: 'two_wheeler' },
             { label: 'Ambulance', icon: 'ambulance' },
             { label: 'Plane', icon: 'flight' },
           ].map((item, idx) => (
             <div key={idx} className={`flex flex-col items-center gap-1.5 shrink-0 group ${item.disabled ? 'opacity-50 grayscale' : 'cursor-pointer'}`}>
               <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center shadow-sm transition-all active:scale-95 relative ${item.special ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-slate-50 border-slate-100 text-slate-500 group-hover:bg-white group-hover:border-primary/30 group-hover:text-primary'}`}>
                 <span className="material-symbols-outlined text-[28px]">{item.icon}</span>
                 {item.disabled && (
                   <div className="absolute -bottom-2 bg-slate-800 text-white text-[8px] px-1.5 py-0.5 rounded-md font-bold whitespace-nowrap z-10">
                     Next: 14:00
                   </div>
                 )}
               </div>
               <span className={`text-[10px] font-bold uppercase tracking-wider transition-colors ${item.special ? 'text-primary' : 'text-slate-400 group-hover:text-slate-900'}`}>{item.label}</span>
             </div>
           ))}
        </div>

        {/* Logistics Options Grid */}
        <div className="px-5">
          <h2 className="text-lg font-bold text-slate-800 mb-5">Logistics Options</h2>
          
          <div className="space-y-4">
            {/* 1. Full Width Featured: Emergency STAT (Matches BRT/EV) */}
            <div 
              onClick={() => handleCardClick('STAT')}
              className="bg-brand-green h-40 rounded-[2rem] p-6 relative overflow-hidden shadow-card group cursor-pointer active:scale-[0.98] transition-transform"
            >
               {/* Available Job Count Badge - Bottom Left */}
               <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 shadow-sm z-20">
                  <span className="text-[10px] font-black text-white uppercase tracking-wider">3 Active</span>
               </div>

               <div className="relative z-10 w-2/3">
                 <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                   STAT / Emergency <span className="material-symbols-outlined text-base">arrow_forward</span>
                 </h3>
                 <p className="text-xs text-white/90 font-medium mt-2 leading-relaxed">
                   Emergency organ & tissue transport via electric fleet
                 </p>
               </div>
               <img 
                 src="https://www.pngplay.com/wp-content/uploads/9/Medicine-Bike-Transparent-Free-PNG.png" 
                 alt="Bike"
                 className="absolute bottom-2 right-[-20px] w-48 drop-shadow-2xl transition-transform group-hover:scale-105"
               />
            </div>

            {/* 2. The Oxygen Line (Smart Refill) - New Feature */}
            <div 
                onClick={() => handleCardClick('OXYGEN')}
                className="bg-gradient-to-br from-sky-50 to-blue-50 p-5 h-32 rounded-[2rem] border border-blue-100 relative overflow-hidden cursor-pointer active:scale-[0.98] transition-transform flex items-center justify-between"
            >
                {/* Job Count - Top Right (Exception) */}
                <div className="absolute top-4 right-4 bg-blue-500 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-sm z-20">
                   1 Request
                </div>

                <div className="relative z-10 mt-2">
                   <div className="flex items-center gap-2 mb-1">
                      <span className="material-symbols-outlined text-blue-500">air</span>
                      <span className="text-xs font-black uppercase text-blue-500 tracking-widest">Smart Refill</span>
                   </div>
                   <h3 className="text-slate-900 font-bold text-lg leading-tight">The Oxygen Line</h3>
                   <p className="text-[10px] text-slate-500 mt-1 w-40">Auto-book refill when tank levels hit 10%.</p>
                </div>
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-blue-500 shadow-md border border-blue-50 shrink-0">
                   <span className="material-symbols-outlined text-3xl">propane_tank</span>
                </div>
            </div>

            {/* 3. Grid Row: Peach & Mint */}
            <div className="grid grid-cols-2 gap-4">
               <ServiceCard 
                 bg="bg-brand-peach"
                 title="Blood Bank"
                 desc="Track & book plasma"
                 icon="bloodtype"
                 image="https://cdn-icons-png.flaticon.com/512/4006/4006197.png" 
                 count={4}
                 countLabel="Units"
                 onClick={() => handleCardClick('BLOOD')}
               />
               <ServiceCard 
                 bg="bg-brand-mint"
                 title="Cold Chain"
                 desc="Vaccine monitoring"
                 icon="ac_unit"
                 image="https://cdn-icons-png.flaticon.com/512/2830/2830305.png" 
                 count={2}
                 countLabel="Jobs"
                 onClick={() => handleCardClick('COLD_CHAIN')}
               />
            </div>

            {/* 4. Grid Row: Grey & Yellow */}
            <div className="grid grid-cols-2 gap-4">
               <div onClick={() => handleCardClick('LAB')} className="bg-brand-grey p-5 h-44 rounded-[2rem] relative overflow-hidden cursor-pointer active:scale-[0.98] transition-transform">
                  <div className="absolute bottom-4 left-4 bg-white/60 backdrop-blur-sm px-2 py-0.5 rounded-md text-[9px] font-bold text-slate-600 border border-slate-200 z-20">
                    7 Batches
                  </div>
                  <h3 className="text-slate-900 font-bold text-base leading-tight flex items-center gap-1">
                    Lab Logistics <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </h3>
                  <p className="text-[10px] text-slate-500 mt-2 w-2/3 leading-tight">Secure sample chain of custody</p>
                  <img src="https://cdn-icons-png.flaticon.com/512/3209/3209072.png" className="absolute bottom-4 right-[-10px] w-24 drop-shadow-xl" alt="Lab" />
               </div>

               <div onClick={() => handleCardClick('AMBULANCE')} className="bg-brand-yellow p-5 h-44 rounded-[2rem] relative overflow-hidden cursor-pointer active:scale-[0.98] transition-transform">
                  <div className="absolute bottom-4 left-4 bg-white/60 backdrop-blur-sm px-2 py-0.5 rounded-md text-[9px] font-bold text-amber-600 border border-amber-100 z-20">
                    2 Calls
                  </div>
                  <h3 className="text-slate-900 font-bold text-base leading-tight flex items-center gap-1">
                    Ambulance <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </h3>
                  <p className="text-[10px] text-slate-500 mt-2 w-2/3 leading-tight">Emergency & Corps Transfer</p>
                  <img src="https://cdn-icons-png.flaticon.com/512/2893/2893149.png" className="absolute bottom-2 right-0 w-28 drop-shadow-xl" alt="Ambulance" />
               </div>
            </div>

            {/* 5. Last Item: Insurance */}
            <div onClick={() => handleCardClick('INSURANCE')} className="bg-brand-orange p-5 h-32 rounded-[2rem] relative overflow-hidden flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform mb-4">
               <div className="relative z-10">
                 <h3 className="text-slate-900 font-bold text-base leading-tight flex items-center gap-1">
                   Insurance <span className="material-symbols-outlined text-sm">arrow_forward</span>
                 </h3>
                 <p className="text-[10px] text-slate-500 mt-1">Explore medical logistics coverage</p>
               </div>
               <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center text-white shadow-lg shrink-0">
                  <span className="material-symbols-outlined text-4xl">verified_user</span>
               </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

interface ServiceCardProps {
  bg: string;
  title: string;
  desc: string;
  image: string;
  icon?: string;
  count?: number;
  countLabel?: string;
  onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ bg, title, desc, image, icon, count, countLabel, onClick }) => (
  <button 
    onClick={onClick}
    className={`${bg} p-5 h-44 rounded-[2rem] relative overflow-hidden flex flex-col justify-start text-left shadow-card active:scale-[0.98] transition-transform`}
  >
    {count !== undefined && (
      <div className="absolute bottom-4 left-4 bg-white/50 backdrop-blur-sm px-2 py-0.5 rounded-md text-[9px] font-bold text-slate-800 border border-white/20 shadow-sm z-20">
         {count} {countLabel || 'Jobs'}
      </div>
    )}
    <div className="z-10 relative">
      <h3 className="text-slate-900 font-bold text-base leading-tight flex items-center gap-1">
        {title} <span className="material-symbols-outlined text-sm">arrow_forward</span>
      </h3>
      <p className="mt-2 text-[10px] text-slate-600 font-medium leading-tight w-2/3">
        {desc}
      </p>
    </div>
    <img src={image} alt={title} className="absolute bottom-2 right-[-10px] w-32 h-auto drop-shadow-xl object-contain" />
  </button>
);

export default Home;