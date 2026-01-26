import React from 'react';
import { AppScreen } from '../types';

interface JobFeedProps {
  onNavigate: (screen: AppScreen) => void;
  category?: string | null;
}

const JobFeed: React.FC<JobFeedProps> = ({ onNavigate, category }) => {
  
  // Dynamic Configuration based on Category
  const getCategoryConfig = (cat: string | null | undefined) => {
    switch (cat) {
      case 'STAT':
        return {
          title: 'STAT / Emergency',
          subtitle: 'Critical Response • Live',
          accent: 'text-stat-red',
          bgAccent: 'bg-red-50',
          borderAccent: 'border-red-100',
          icon: 'e911_emergency',
          mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1uQumMrttYYL5uWiDYIjPVzZAE8zRvrbyMur3kUm1neU3r9F3jnkYCAknXWT5Eg74_uIdj-yd_34GX8JsHsN_JiPGIjS_4KyYZ30xndrvnkPzVXLAzvOA8qiAo509w9cWSuBcrjJCyhuiQaBF_Vf_gbLCpX9H0ii4zD2SqGx7ZqmNi4JSUBz9PfMTaTsVzACKtp3RXgQnUwiQT0IboJnd8jm3TRkMKt_ORdtp1YDAR2l3hHSxvYxrWO21B8FCzsAaCTcJzDVPOnQ'
        };
      case 'OXYGEN':
        return {
          title: 'The Oxygen Line',
          subtitle: 'Refill Requests • Priority',
          accent: 'text-blue-500',
          bgAccent: 'bg-blue-50',
          borderAccent: 'border-blue-100',
          icon: 'propane_tank',
           mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1uQumMrttYYL5uWiDYIjPVzZAE8zRvrbyMur3kUm1neU3r9F3jnkYCAknXWT5Eg74_uIdj-yd_34GX8JsHsN_JiPGIjS_4KyYZ30xndrvnkPzVXLAzvOA8qiAo509w9cWSuBcrjJCyhuiQaBF_Vf_gbLCpX9H0ii4zD2SqGx7ZqmNi4JSUBz9PfMTaTsVzACKtp3RXgQnUwiQT0IboJnd8jm3TRkMKt_ORdtp1YDAR2l3hHSxvYxrWO21B8FCzsAaCTcJzDVPOnQ'
        };
      case 'BLOOD':
        return {
          title: 'Blood Bank',
          subtitle: 'Plasma & Red Cells',
          accent: 'text-rose-600',
          bgAccent: 'bg-rose-50',
          borderAccent: 'border-rose-100',
          icon: 'bloodtype',
           mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1uQumMrttYYL5uWiDYIjPVzZAE8zRvrbyMur3kUm1neU3r9F3jnkYCAknXWT5Eg74_uIdj-yd_34GX8JsHsN_JiPGIjS_4KyYZ30xndrvnkPzVXLAzvOA8qiAo509w9cWSuBcrjJCyhuiQaBF_Vf_gbLCpX9H0ii4zD2SqGx7ZqmNi4JSUBz9PfMTaTsVzACKtp3RXgQnUwiQT0IboJnd8jm3TRkMKt_ORdtp1YDAR2l3hHSxvYxrWO21B8FCzsAaCTcJzDVPOnQ'
        };
      case 'COLD_CHAIN':
        return {
          title: 'Cold Chain',
          subtitle: 'Vaccines & Insulin',
          accent: 'text-cyan-600',
          bgAccent: 'bg-cyan-50',
          borderAccent: 'border-cyan-100',
          icon: 'ac_unit',
           mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1uQumMrttYYL5uWiDYIjPVzZAE8zRvrbyMur3kUm1neU3r9F3jnkYCAknXWT5Eg74_uIdj-yd_34GX8JsHsN_JiPGIjS_4KyYZ30xndrvnkPzVXLAzvOA8qiAo509w9cWSuBcrjJCyhuiQaBF_Vf_gbLCpX9H0ii4zD2SqGx7ZqmNi4JSUBz9PfMTaTsVzACKtp3RXgQnUwiQT0IboJnd8jm3TRkMKt_ORdtp1YDAR2l3hHSxvYxrWO21B8FCzsAaCTcJzDVPOnQ'
        };
      case 'LAB':
        return {
          title: 'Lab Logistics',
          subtitle: 'Specimen Transport',
          accent: 'text-indigo-600',
          bgAccent: 'bg-indigo-50',
          borderAccent: 'border-indigo-100',
          icon: 'science',
           mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1uQumMrttYYL5uWiDYIjPVzZAE8zRvrbyMur3kUm1neU3r9F3jnkYCAknXWT5Eg74_uIdj-yd_34GX8JsHsN_JiPGIjS_4KyYZ30xndrvnkPzVXLAzvOA8qiAo509w9cWSuBcrjJCyhuiQaBF_Vf_gbLCpX9H0ii4zD2SqGx7ZqmNi4JSUBz9PfMTaTsVzACKtp3RXgQnUwiQT0IboJnd8jm3TRkMKt_ORdtp1YDAR2l3hHSxvYxrWO21B8FCzsAaCTcJzDVPOnQ'
        };
      default:
        return {
          title: 'Mission Feed',
          subtitle: 'Online • GHS 142.50 Today',
          accent: 'text-primary',
          bgAccent: 'bg-slate-50',
          borderAccent: 'border-slate-100',
          icon: 'list_alt',
           mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1uQumMrttYYL5uWiDYIjPVzZAE8zRvrbyMur3kUm1neU3r9F3jnkYCAknXWT5Eg74_uIdj-yd_34GX8JsHsN_JiPGIjS_4KyYZ30xndrvnkPzVXLAzvOA8qiAo509w9cWSuBcrjJCyhuiQaBF_Vf_gbLCpX9H0ii4zD2SqGx7ZqmNi4JSUBz9PfMTaTsVzACKtp3RXgQnUwiQT0IboJnd8jm3TRkMKt_ORdtp1YDAR2l3hHSxvYxrWO21B8FCzsAaCTcJzDVPOnQ'
        };
    }
  };

  const config = getCategoryConfig(category);

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-slate-50 text-slate-900 font-display">
      {/* Top App Bar (Header) */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center bg-white/90 backdrop-blur-md p-4 pb-3 justify-between border-b border-slate-200/60 shadow-sm transition-all duration-300">
        <div className="flex items-center gap-3">
           <button onClick={() => onNavigate(AppScreen.HOME)} className="flex items-center justify-center size-10 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors">
              <span className="material-symbols-outlined">arrow_back</span>
           </button>
           <div className="flex flex-col">
              <h2 className={`text-lg font-bold leading-tight tracking-tight ${category ? config.accent : 'text-slate-900'}`}>{config.title}</h2>
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{config.subtitle}</span>
              </div>
           </div>
        </div>
        <div className="flex w-12 items-center justify-end">
          <div className={`flex size-10 items-center justify-center rounded-full ${config.bgAccent} ${config.accent}`}>
            <span className="material-symbols-outlined text-[24px]">{config.icon}</span>
          </div>
        </div>
      </div>

      {/* Filter Chips (Floating) - Context Aware */}
      {!category && (
        <div className="absolute top-20 left-0 right-0 z-20 flex gap-2 p-4 overflow-x-auto no-scrollbar">
          <div className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-slate-900 px-4 shadow-lg shadow-slate-900/20">
            <span className="material-symbols-outlined text-sm text-white">bolt</span>
            <p className="text-white text-xs font-bold leading-normal uppercase">STAT Only</p>
          </div>
          <div className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white px-4 border border-slate-200 shadow-sm">
            <span className="material-symbols-outlined text-sm text-slate-500">ac_unit</span>
            <p className="text-slate-700 text-xs font-bold leading-normal uppercase">Cold Chain</p>
          </div>
          <div className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white px-4 border border-slate-200 shadow-sm">
            <span className="material-symbols-outlined text-sm text-slate-500">vital_signs</span>
            <p className="text-slate-700 text-xs font-bold leading-normal uppercase">Organ Tx</p>
          </div>
        </div>
      )}

      {/* Map Section */}
      <div className="relative flex-1 w-full bg-slate-200">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${config.mapImage}")` }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-slate-50/90 pointer-events-none"></div>

        {/* Location Indicator (Center on Ghana) */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-10">
           <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md border border-slate-200 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-stat-red text-sm material-symbols-filled">location_on</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-800">Greater Accra, GH</span>
           </div>
        </div>

        {/* Map Controls */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
          <div className="flex flex-col gap-px overflow-hidden rounded-xl border border-slate-200 shadow-xl bg-white">
            <button className="flex size-12 items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors border-b border-slate-100">
              <span className="material-symbols-outlined">add</span>
            </button>
            <button className="flex size-12 items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors">
              <span className="material-symbols-outlined">remove</span>
            </button>
          </div>
          <button className="flex size-12 items-center justify-center rounded-xl bg-slate-900 text-white shadow-xl shadow-slate-900/20">
            <span className="material-symbols-outlined">my_location</span>
          </button>
        </div>

        {/* Search Bar Overlay */}
        {!category && (
            <div className="absolute top-36 left-4 right-4 z-10">
            <div className="flex w-full items-stretch rounded-xl h-12 bg-white/90 backdrop-blur-md border border-slate-200 shadow-xl">
                <div className="text-slate-400 flex items-center justify-center pl-4">
                <span className="material-symbols-outlined text-[20px]">search</span>
                </div>
                <input className="flex w-full border-none bg-transparent focus:ring-0 text-slate-900 placeholder:text-slate-400 text-sm font-medium p-3" placeholder="Search Accra..." />
            </div>
            </div>
        )}

        {/* Dynamic Markers based on Category */}
        <div className="absolute top-[40%] left-[30%] -translate-x-1/2 -translate-y-1/2 z-10 animate-bounce">
            <div className={`p-2 rounded-full shadow-lg border-2 border-white ${config.bgAccent}`}>
                <span className={`material-symbols-outlined text-2xl ${config.accent}`}>{config.icon}</span>
            </div>
            <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-2 bg-slate-900`}></div>
        </div>

         {category === 'OXYGEN' && (
            <div className="absolute top-[60%] left-[70%] -translate-x-1/2 -translate-y-1/2 z-10 animate-bounce" style={{ animationDelay: '0.5s' }}>
                <div className={`p-2 rounded-full shadow-lg border-2 border-white bg-blue-50`}>
                    <span className={`material-symbols-outlined text-2xl text-blue-500`}>propane_tank</span>
                </div>
            </div>
         )}
      </div>

      {/* Bottom Sheet (Job Feed) */}
      <div className="absolute bottom-0 left-0 right-0 z-30 flex flex-col bg-slate-50 border-t border-slate-200 rounded-t-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        {/* Bottom Sheet Handle */}
        <button className="flex h-8 w-full items-center justify-center pt-2">
          <div className="h-1.5 w-12 rounded-full bg-slate-300"></div>
        </button>
        <div className="px-6 pb-2">
          <h3 className="text-slate-900 text-lg font-bold leading-tight tracking-tight">{category ? `${config.title} Requests` : 'Nearby Assignments'}</h3>
        </div>

        {/* Job Feed Cards Scrollable Area */}
        <div className="max-h-[380px] overflow-y-auto px-4 pb-24 space-y-3 no-scrollbar">
          
          {/* Featured Job Card (Context Sensitive) */}
          {(category === 'STAT' || !category) && (
            <div className="flex flex-col rounded-2xl bg-white border border-red-100 p-5 space-y-4 shadow-sm relative overflow-hidden group animate-in slide-in-from-bottom duration-500">
                <div className="absolute top-0 right-0 w-20 h-20 bg-red-50 rounded-bl-[3rem] -mr-4 -mt-4 z-0"></div>
                
                <div className="flex justify-between items-start relative z-10">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                    <span className="bg-red-100 text-red-600 text-[10px] font-black px-2 py-0.5 rounded-sm uppercase tracking-tighter">STAT</span>
                    <h4 className="text-slate-900 font-bold text-base leading-none">Emergency Platelets</h4>
                    </div>
                    <p className="text-slate-500 text-xs font-medium mt-1">UCSF Medical Center → Zuckerberg Gen.</p>
                </div>
                <div className="text-right">
                    <p className="text-red-600 text-xl font-black leading-none">GHS 58.50</p>
                    <p className="text-slate-400 text-[9px] font-bold uppercase mt-1">Hazardous</p>
                </div>
                </div>
                
                <div className="flex items-center justify-between text-xs py-3 border-y border-slate-100">
                <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-slate-400 text-[18px]">route</span>
                    <span className="text-slate-600 font-bold">1.2 km away</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-red-500 text-[18px]">timer</span>
                    <span className="text-red-600 font-bold uppercase">12m Limit</span>
                </div>
                </div>
                
                <button 
                onClick={() => onNavigate(AppScreen.CUSTODY)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white h-12 rounded-xl font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20 active:scale-[0.98] transition-all"
                >
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                Accept Mission
                </button>
            </div>
          )}

          {/* Oxygen Specific Card */}
          {(category === 'OXYGEN' || !category) && (
            <div className="flex flex-col rounded-2xl bg-white border border-blue-100 p-5 space-y-3 shadow-sm animate-in slide-in-from-bottom duration-500 delay-100">
                <div className="flex justify-between items-start">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-tighter">REFILL</span>
                    <h4 className="text-slate-900 font-bold text-base leading-none">Oxygen Tank Exchange</h4>
                    </div>
                    <p className="text-slate-500 text-xs mt-1">Ridge Hospital • Ward 3</p>
                </div>
                <div className="text-right">
                    <p className="text-slate-900 text-xl font-bold leading-none">GHS 85.00</p>
                </div>
                </div>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                <div className="flex items-center gap-1.5 text-slate-500">
                    <span className="material-symbols-outlined text-[18px]">near_me</span>
                    <span className="font-semibold">2.4 km</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500">
                    <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                    <span className="font-semibold">Truck Required</span>
                </div>
                </div>
                <button className="w-full bg-white border border-slate-200 text-slate-900 h-10 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-slate-50">
                    View Details
                </button>
            </div>
          )}

           {/* Blood Bank Specific Card */}
           {(category === 'BLOOD' || !category) && (
            <div className="flex flex-col rounded-2xl bg-white border border-rose-100 p-5 space-y-3 shadow-sm animate-in slide-in-from-bottom duration-500 delay-100">
                <div className="flex justify-between items-start">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                    <span className="bg-rose-100 text-rose-600 text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-tighter">URGENT</span>
                    <h4 className="text-slate-900 font-bold text-base leading-none">O+ Plasma Units (x4)</h4>
                    </div>
                    <p className="text-slate-500 text-xs mt-1">Korle Bu Blood Bank → 37 Military</p>
                </div>
                <div className="text-right">
                    <p className="text-slate-900 text-xl font-bold leading-none">GHS 40.00</p>
                </div>
                </div>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                <div className="flex items-center gap-1.5 text-slate-500">
                    <span className="material-symbols-outlined text-[18px]">near_me</span>
                    <span className="font-semibold">5.1 km</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500">
                    <span className="material-symbols-outlined text-[18px]">ac_unit</span>
                    <span className="font-semibold">Cooler Box</span>
                </div>
                </div>
                 <button className="w-full bg-white border border-slate-200 text-slate-900 h-10 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-slate-50">
                    View Details
                </button>
            </div>
          )}

           {/* Generic/Other Card */}
           {(!category || category === 'LAB' || category === 'COLD_CHAIN') && (
             <div className="flex flex-col rounded-2xl bg-white border border-slate-200 p-5 space-y-3 shadow-sm animate-in slide-in-from-bottom duration-500 delay-200">
                <div className="flex justify-between items-start">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                    <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-tighter">Routine</span>
                    <h4 className="text-slate-900 font-bold text-base leading-none">Lab Samples (Cold Chain)</h4>
                    </div>
                    <p className="text-slate-500 text-xs mt-1">Kaiser Permanente → Quest Diagnostics</p>
                </div>
                <div className="text-right">
                    <p className="text-slate-900 text-xl font-bold leading-none">GHS 24.00</p>
                </div>
                </div>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                <div className="flex items-center gap-1.5 text-slate-500">
                    <span className="material-symbols-outlined text-[18px]">near_me</span>
                    <span className="font-semibold">3.8 km</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500">
                    <span className="material-symbols-outlined text-[18px]">schedule</span>
                    <span className="font-semibold">Within 45m</span>
                </div>
                </div>
                 <button className="w-full bg-white border border-slate-200 text-slate-900 h-10 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-slate-50">
                    View Details
                </button>
            </div>
           )}

        </div>
      </div>
    </div>
  );
};

export default JobFeed;