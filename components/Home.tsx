import React from 'react';
import { AppScreen, User } from '../types';

interface HomeProps {
  onNavigate: (screen: AppScreen) => void;
  user: User;
}

const Home: React.FC<HomeProps> = ({ onNavigate, user }) => {
  const isCourier = user.role === 'COURIER';

  return (
    <div className="bg-[#f8f9fb] min-h-screen pb-32 font-display text-slate-800">
      {/* Header */}
      <header className="px-4 pt-4 pb-2 flex justify-between items-center bg-white/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="relative">
          <button onClick={() => onNavigate(AppScreen.PROFILE)} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200 shadow-sm">
            <img src={isCourier ? "https://i.pravatar.cc/100?img=11" : "https://i.pravatar.cc/100?img=5"} alt="Profile" className="w-full h-full object-cover" />
          </button>
          <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-amber-500 rounded-full border-2 border-white"></div>
        </div>
        <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-slate-100 shadow-sm text-slate-600">
          <span className="material-symbols-outlined text-2xl">notifications</span>
        </button>
      </header>

      <main>
        {/* Virtual Card Section */}
        <div className="px-4 py-4 overflow-x-auto no-scrollbar flex gap-4 snap-x snap-mandatory">
          <div className="relative min-w-[90%] h-48 rounded-3xl overflow-hidden flex shadow-xl snap-center shrink-0">
            {/* Left Panel: Gold/Independence Arch */}
            <div className="w-[40%] bg-gradient-to-br from-[#eeb030] via-[#dfa020] to-[#c18a10] p-4 flex flex-col justify-between text-white relative">
              <div className="z-10 flex flex-col gap-1">
                <div className="flex items-center gap-1 opacity-90">
                  <div className="w-4 h-4 bg-red-600 rounded-sm"></div>
                  <div className="w-4 h-4 bg-green-600 rounded-sm"></div>
                  <span className="text-[10px] font-bold uppercase tracking-tighter">Roldzif Pay</span>
                </div>
                <div className="mt-2 opacity-40">
                   <span className="material-symbols-outlined text-5xl">account_balance</span>
                </div>
              </div>
              <div className="z-10">
                <p className="text-[10px] uppercase font-bold tracking-widest opacity-80">GHS</p>
                <p className="text-2xl font-black tracking-tighter">
                  {isCourier ? '420.50' : '2,450.00'}
                </p>
                <p className="text-[8px] font-bold uppercase mt-1 opacity-70">Card Balance</p>
              </div>
              {/* Independence Arch Outline (Simulated) */}
              <div className="absolute bottom-0 right-0 opacity-10 pointer-events-none">
                <span className="material-symbols-outlined text-[100px] -mr-8 -mb-4">temple_buddhist</span>
              </div>
            </div>

            {/* Right Panel: Symbols */}
            <div className="w-[60%] bg-white p-4 flex flex-col justify-between border-y border-r border-slate-100 rounded-r-3xl relative">
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none grid grid-cols-3 gap-4 p-4 overflow-hidden">
                {[...Array(9)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-4xl">fingerprint</span>
                ))}
              </div>
              
              <div className="flex justify-between items-start z-10">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Virtual Card</p>
                <span className="text-[10px] font-bold text-primary">Details</span>
              </div>
              
              <div className="z-10">
                <p className="text-slate-400 text-[10px] font-bold mb-1">Card Number</p>
                <p className="text-slate-800 font-bold tracking-[0.2em] text-lg">1764 6367</p>
              </div>
            </div>
          </div>
        </div>

        {/* Partners Reel */}
        <div className="px-4 py-2 overflow-x-auto no-scrollbar flex items-center gap-6 border-b border-slate-100">
           <PartnerItem label="ABSA" />
           <PartnerItem label="Shoprite" hasDot />
           <PartnerItem label="GPRTU" logo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6A23UfU9G_pX1O_FzW-PqVjP6H_P6L8fG5g&s" />
           <PartnerItem label="Road Safety" />
           <PartnerItem label="Korle Bu" />
        </div>

        {/* Service Options Grid */}
        <div className="px-4 pt-6">
          <h2 className="text-xl font-extrabold tracking-tight mb-4 px-1">Logistics Options</h2>
          
          <div className="space-y-4">
            {/* Main Featured Card */}
            <ServiceCard 
              color="bg-[#00a87e]" 
              title="Emergency STAT / EV" 
              desc="Rapid organ and tissue transport via electric fleet"
              image="https://www.pngplay.com/wp-content/uploads/9/Medicine-Bike-Transparent-Free-PNG.png"
              isFullWidth
              onClick={() => onNavigate(isCourier ? AppScreen.JOB_FEED : AppScreen.ORDER_PLACEMENT)}
            />

            <div className="grid grid-cols-2 gap-3">
               <ServiceCard 
                color="bg-[#fde7e2]" 
                title="Blood Bank" 
                desc="Platelets and plasma logistics"
                image="https://cdn-icons-png.flaticon.com/512/11542/11542939.png"
                onClick={() => onNavigate(isCourier ? AppScreen.JOB_FEED : AppScreen.ORDER_PLACEMENT)}
              />
               <ServiceCard 
                color="bg-[#e7f5ed]" 
                title="Cold Chain" 
                desc="Vaccine and biological monitoring"
                image="https://cdn-icons-png.flaticon.com/512/4204/4204482.png"
                onClick={() => onNavigate(isCourier ? AppScreen.JOB_FEED : AppScreen.ORDER_PLACEMENT)}
              />
               <ServiceCard 
                color="bg-[#eef2f6]" 
                title="Lab Tests" 
                desc="Secure sample chain of custody"
                image="https://cdn-icons-png.flaticon.com/512/3063/3063176.png"
                onClick={() => onNavigate(isCourier ? AppScreen.JOB_FEED : AppScreen.ORDER_PLACEMENT)}
              />
               <ServiceCard 
                color="bg-[#fff4e1]" 
                title="Pharma / Ride" 
                desc="General medical supply delivery"
                image="https://cdn-icons-png.flaticon.com/512/4320/4320330.png"
                onClick={() => onNavigate(isCourier ? AppScreen.JOB_FEED : AppScreen.ORDER_PLACEMENT)}
              />
               <ServiceCard 
                color="bg-[#e9f2ff]" 
                title="Surplus Gear" 
                desc="Hospital equipment surplus auctions"
                image="https://cdn-icons-png.flaticon.com/512/1041/1041846.png"
                onClick={() => onNavigate(isCourier ? AppScreen.JOB_FEED : AppScreen.ORDER_PLACEMENT)}
              />
               <ServiceCard 
                color="bg-[#feeaf1]" 
                title="Staff Shuttle" 
                desc="Medical personnel transport"
                image="https://cdn-icons-png.flaticon.com/512/2830/2830305.png"
                onClick={() => onNavigate(isCourier ? AppScreen.JOB_FEED : AppScreen.ORDER_PLACEMENT)}
              />
            </div>

            {/* Insurance Card */}
            <div className="bg-[#fff9ed] rounded-3xl p-6 flex justify-between items-center border border-amber-100 shadow-sm">
               <div>
                  <h3 className="text-lg font-black flex items-center gap-2">
                    Insurance <span className="material-symbols-outlined text-sm">trending_flat</span>
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-1">Explore medical coverage packages</p>
               </div>
               <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center shadow-lg shadow-amber-400/20">
                  <span className="material-symbols-outlined text-white text-4xl">sunny</span>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const PartnerItem: React.FC<{ label: string; logo?: string; hasDot?: boolean }> = ({ label, logo, hasDot }) => (
  <div className="flex items-center gap-2 shrink-0">
    {hasDot && <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>}
    {logo ? (
      <img src={logo} alt={label} className="h-6 w-auto grayscale" />
    ) : (
      <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">{label}</span>
    )}
    <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
  </div>
);

interface ServiceCardProps {
  color: string;
  title: string;
  desc: string;
  image: string;
  isFullWidth?: boolean;
  onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ color, title, desc, image, isFullWidth, onClick }) => (
  <button 
    onClick={onClick}
    className={`${color} ${isFullWidth ? 'p-6 h-40' : 'p-4 h-48'} rounded-3xl relative overflow-hidden flex flex-col justify-start text-left shadow-sm hover:scale-[0.98] transition-all group`}
  >
    <div className="z-10 w-[70%]">
      <h3 className={`font-black tracking-tight flex items-center gap-2 ${isFullWidth ? 'text-xl text-white' : 'text-sm text-slate-800'}`}>
        {title} <span className="material-symbols-outlined text-sm">trending_flat</span>
      </h3>
      <p className={`mt-2 font-medium leading-tight ${isFullWidth ? 'text-xs text-white/90' : 'text-[10px] text-slate-500'}`}>
        {desc}
      </p>
    </div>
    <div className={`absolute bottom-0 right-0 ${isFullWidth ? 'w-48 -mr-6 -mb-4' : 'w-32 -mr-4 -mb-2'} transition-transform group-hover:scale-105`}>
      <img src={image} alt={title} className="w-full h-auto drop-shadow-2xl" />
    </div>
  </button>
);

export default Home;