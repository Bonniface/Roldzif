import React from 'react';
import { AppScreen, User } from '../types';

interface HomeProps {
  onNavigate: (screen: AppScreen) => void;
  user: User;
}

const Home: React.FC<HomeProps> = ({ onNavigate, user }) => {
  const isCourier = user.role === 'COURIER';

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
        {/* Virtual Card Section */}
        <div className="px-5 py-6 overflow-x-auto no-scrollbar flex gap-4 snap-x snap-mandatory">
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
                   {isCourier ? '420.50' : '0.00'}
                 </p>
                 <p className="text-[9px] font-bold text-slate-900/50 mt-1">Card Balance</p>
               </div>
               
               {/* Arch Graphic Outline */}
               <div className="absolute bottom-0 right-0 opacity-20 pointer-events-none text-slate-900">
                 <span className="material-symbols-outlined text-[120px] -mr-10 -mb-6 leading-none">temple_hindu</span>
               </div>
            </div>

            {/* Right Panel: White Pattern */}
            <div className="w-[62%] bg-white p-5 flex flex-col justify-between relative">
              {/* Pattern Background */}
              <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
              
              <div className="flex justify-end items-start z-10">
                <p className="text-[10px] text-slate-400 font-medium w-24 leading-tight text-right">Virtual Card Details</p>
              </div>
              
              <div className="z-10 flex flex-col items-end">
                <div className="w-full h-12 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Adinkra_Symbols.svg/1200px-Adinkra_Symbols.svg.png')] bg-contain bg-no-repeat bg-right opacity-10 mb-2"></div>
                <p className="text-slate-900 font-bold tracking-[0.15em] text-lg">1764 6367</p>
                <p className="text-[9px] text-slate-400 font-bold mt-1">Card Number</p>
              </div>
            </div>
          </div>
        </div>

        {/* Transport Categories Reel */}
        <div className="pl-5 pr-5 py-2 mb-4 overflow-x-auto no-scrollbar flex items-center gap-6">
           {[
             { label: 'Drone', icon: 'mode_fan' }, // Propeller look
             { label: 'Truck', icon: 'local_shipping' },
             { label: 'Train', icon: 'train' },
             { label: 'Plane', icon: 'flight' },
             { label: 'Car', icon: 'directions_car' },
             { label: 'Ship', icon: 'directions_boat' },
           ].map((item, idx) => (
             <div key={idx} className="flex flex-col items-center gap-1.5 shrink-0 group cursor-pointer">
               <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 shadow-sm group-hover:bg-white group-hover:border-primary/30 group-hover:text-primary group-hover:shadow-md transition-all active:scale-95">
                 <span className="material-symbols-outlined text-[28px]">{item.icon}</span>
               </div>
               <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-slate-900 transition-colors">{item.label}</span>
             </div>
           ))}
        </div>

        {/* Logistics Options Grid */}
        <div className="px-5">
          <h2 className="text-lg font-bold text-slate-800 mb-5">Logistics Options</h2>
          
          <div className="space-y-4">
            {/* 1. Full Width Featured: Emergency STAT (Matches BRT/EV) */}
            <div 
              onClick={() => onNavigate(isCourier ? AppScreen.JOB_FEED : AppScreen.ORDER_PLACEMENT)}
              className="bg-brand-green h-40 rounded-[2rem] p-6 relative overflow-hidden shadow-card group cursor-pointer active:scale-[0.98] transition-transform"
            >
               <div className="relative z-10 w-2/3">
                 <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                   STAT / EV <span className="material-symbols-outlined text-base">arrow_forward</span>
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

            {/* 2. Grid Row 1: Peach & Mint (Matches Train & Travel) */}
            <div className="grid grid-cols-2 gap-4">
               {/* Blood Bank (Peach) */}
               <ServiceCard 
                 bg="bg-brand-peach"
                 title="Blood Bank"
                 desc="Track & book plasma"
                 icon="bloodtype"
                 image="https://cdn-icons-png.flaticon.com/512/4006/4006197.png" // Train-like perspective
                 onClick={() => onNavigate(AppScreen.ORDER_PLACEMENT)}
               />
               {/* Cold Chain (Mint) */}
               <ServiceCard 
                 bg="bg-brand-mint"
                 title="Cold Chain"
                 desc="Vaccine monitoring"
                 icon="ac_unit"
                 image="https://cdn-icons-png.flaticon.com/512/2830/2830305.png" // Bus-like
                 onClick={() => onNavigate(AppScreen.ORDER_PLACEMENT)}
               />
            </div>

            {/* 3. Grid Row 2: Grey & Yellow (Matches Shuttle & Taxi) */}
            <div className="grid grid-cols-2 gap-4">
               {/* Lab Logistics (Grey) */}
               <div onClick={() => onNavigate(AppScreen.ORDER_PLACEMENT)} className="bg-brand-grey p-5 h-44 rounded-[2rem] relative overflow-hidden cursor-pointer active:scale-[0.98] transition-transform">
                  <h3 className="text-slate-900 font-bold text-base leading-tight flex items-center gap-1">
                    Lab Logistics <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </h3>
                  <p className="text-[10px] text-slate-500 mt-2 w-2/3 leading-tight">Secure sample chain of custody</p>
                  <img src="https://cdn-icons-png.flaticon.com/512/3209/3209072.png" className="absolute bottom-4 right-[-10px] w-24 drop-shadow-xl" alt="Lab" />
               </div>

               {/* Pharma Direct (Yellow) */}
               <div onClick={() => onNavigate(AppScreen.ORDER_PLACEMENT)} className="bg-brand-yellow p-5 h-44 rounded-[2rem] relative overflow-hidden cursor-pointer active:scale-[0.98] transition-transform">
                  <h3 className="text-slate-900 font-bold text-base leading-tight flex items-center gap-1">
                    Pharma / Ride <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </h3>
                  <p className="text-[10px] text-slate-500 mt-2 w-2/3 leading-tight">Choose your delivery speed</p>
                  <img src="https://cdn-icons-png.flaticon.com/512/3063/3063822.png" className="absolute bottom-2 right-0 w-28 drop-shadow-xl" alt="Car" />
               </div>
            </div>

            {/* 4. Grid Row 3: Light Green & Pink (Matches Parcels & Sports) */}
            <div className="grid grid-cols-2 gap-4">
               {/* Supplies (Light Green) */}
               <ServiceCard 
                 bg="bg-brand-lightgreen"
                 title="Supplies"
                 desc="Track your parcels"
                 icon="inventory_2"
                 image="https://cdn-icons-png.flaticon.com/512/679/679720.png" // Box
                 onClick={() => onNavigate(AppScreen.ORDER_PLACEMENT)}
               />
               {/* Organ Transport (Pink) */}
               <ServiceCard 
                 bg="bg-brand-pink"
                 title="Organ Tx"
                 desc="Find & pay for events"
                 icon="favorite"
                 image="https://cdn-icons-png.flaticon.com/512/3004/3004458.png" // People/Event
                 onClick={() => onNavigate(AppScreen.ORDER_PLACEMENT)}
               />
            </div>

             {/* 5. Last Item: Insurance (Orange) - Full Width */}
            <div onClick={() => onNavigate(AppScreen.ORDER_PLACEMENT)} className="bg-brand-orange p-5 h-32 rounded-[2rem] relative overflow-hidden flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform mb-4">
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
  onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ bg, title, desc, image, icon, onClick }) => (
  <button 
    onClick={onClick}
    className={`${bg} p-5 h-44 rounded-[2rem] relative overflow-hidden flex flex-col justify-start text-left shadow-card active:scale-[0.98] transition-transform`}
  >
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