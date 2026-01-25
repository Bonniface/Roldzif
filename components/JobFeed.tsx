import React from 'react';
import { AppScreen } from '../types';

interface JobFeedProps {
  onNavigate: (screen: AppScreen) => void;
}

const JobFeed: React.FC<JobFeedProps> = ({ onNavigate }) => {
  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-background-dark text-white font-display">
      {/* Top App Bar (Header) */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center bg-background-dark/80 backdrop-blur-md p-4 pb-2 justify-between border-b border-white/5">
        <div className="text-white flex size-12 shrink-0 items-center justify-start">
          <span className="material-symbols-outlined text-[28px]">account_circle</span>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-white text-lg font-bold leading-tight tracking-tight">Job Feed</h2>
          <div className="flex items-center gap-1">
            <div className="size-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[10px] text-white/60 uppercase tracking-widest font-semibold">Online • GHS 142.50 Today</span>
          </div>
        </div>
        <div className="flex w-12 items-center justify-end">
          <button className="relative flex size-10 items-center justify-center rounded-full bg-white/5 text-white">
            <span className="material-symbols-outlined text-[24px]">notifications</span>
            <span className="absolute top-2 right-2 size-2 bg-primary rounded-full"></span>
          </button>
        </div>
      </div>

      {/* Filter Chips (Floating) */}
      <div className="absolute top-20 left-0 right-0 z-20 flex gap-2 p-4 overflow-x-auto no-scrollbar">
        <div className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary px-4 shadow-lg border border-primary/50">
          <span className="material-symbols-outlined text-sm">bolt</span>
          <p className="text-white text-xs font-bold leading-normal uppercase">STAT Only</p>
        </div>
        <div className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-background-dark/80 backdrop-blur-md px-4 border border-white/10">
          <span className="material-symbols-outlined text-sm">ac_unit</span>
          <p className="text-white text-xs font-semibold leading-normal uppercase">Cold Chain</p>
        </div>
        <div className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-background-dark/80 backdrop-blur-md px-4 border border-white/10">
          <span className="material-symbols-outlined text-sm">vital_signs</span>
          <p className="text-white text-xs font-semibold leading-normal uppercase">Organ Transport</p>
        </div>
      </div>

      {/* Map Section */}
      <div className="relative flex-1 w-full bg-background-dark">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB1uQumMrttYYL5uWiDYIjPVzZAE8zRvrbyMur3kUm1neU3r9F3jnkYCAknXWT5Eg74_uIdj-yd_34GX8JsHsN_JiPGIjS_4KyYZ30xndrvnkPzVXLAzvOA8qiAo509w9cWSuBcrjJCyhuiQaBF_Vf_gbLCpX9H0ii4zD2SqGx7ZqmNi4JSUBz9PfMTaTsVzACKtp3RXgQnUwiQT0IboJnd8jm3TRkMKt_ORdtp1YDAR2l3hHSxvYxrWO21B8FCzsAaCTcJzDVPOnQ")' }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark/80 via-transparent to-background-dark pointer-events-none"></div>

        {/* Map Controls */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
          <div className="flex flex-col gap-px overflow-hidden rounded-xl border border-white/10 shadow-2xl">
            <button className="flex size-12 items-center justify-center bg-background-dark/90 text-white hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined">add</span>
            </button>
            <button className="flex size-12 items-center justify-center bg-background-dark/90 text-white hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined">remove</span>
            </button>
          </div>
          <button className="flex size-12 items-center justify-center rounded-xl bg-primary text-white shadow-lg border border-primary/20">
            <span className="material-symbols-outlined">my_location</span>
          </button>
        </div>

        {/* Search Bar Overlay */}
        <div className="absolute top-36 left-4 right-4 z-10">
          <div className="flex w-full items-stretch rounded-xl h-12 bg-background-dark/90 backdrop-blur-md border border-white/10 shadow-xl">
            <div className="text-white/60 flex items-center justify-center pl-4">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </div>
            <input className="flex w-full border-none bg-transparent focus:ring-0 text-white placeholder:text-white/40 text-sm font-medium p-3" placeholder="Search medical zones..." />
          </div>
        </div>
      </div>

      {/* Bottom Sheet (Job Feed) */}
      <div className="absolute bottom-0 left-0 right-0 z-30 flex flex-col bg-background-dark border-t border-white/10 rounded-t-3xl shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        {/* Bottom Sheet Handle */}
        <button className="flex h-6 w-full items-center justify-center group pt-4 pb-2">
          <div className="h-1.5 w-12 rounded-full bg-white/20 group-hover:bg-white/40 transition-colors"></div>
        </button>
        <div className="px-6 pb-2">
          <h3 className="text-white text-lg font-bold leading-tight tracking-tight">Nearby Assignments</h3>
        </div>

        {/* Job Feed Cards Scrollable Area */}
        <div className="max-h-[380px] overflow-y-auto px-4 pb-24 space-y-3 no-scrollbar">
          
          {/* STAT Job Card (Active/Selected) */}
          <div className="flex flex-col rounded-xl bg-white/5 border-2 border-stat-red/40 p-4 space-y-4 stat-glow">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="bg-stat-red text-white text-[10px] font-black px-2 py-0.5 rounded-sm uppercase tracking-tighter">STAT</span>
                  <h4 className="text-white font-bold text-base leading-none">Emergency Blood Platelets</h4>
                </div>
                <p className="text-white/60 text-xs">UCSF Medical Center → Zuckerberg General</p>
              </div>
              <div className="text-right">
                <p className="text-stat-red text-xl font-black leading-none">GHS 58.50</p>
                <p className="text-white/40 text-[10px] font-bold uppercase mt-1">Hazardous</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs py-2 border-y border-white/5">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[18px]">route</span>
                <span className="text-white/90 font-medium">1.2 km away</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-stat-red text-[18px]">timer</span>
                <span className="text-stat-red font-bold uppercase">Urgent: 12m Limit</span>
              </div>
            </div>
            <button 
              onClick={() => onNavigate(AppScreen.DELIVERY_PROOF)}
              className="w-full bg-primary hover:bg-primary/90 text-white h-12 rounded-lg font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
            >
              <span className="material-symbols-outlined text-[20px]">check_circle</span>
              Accept Mission
            </button>
          </div>

          {/* Regular Job Card */}
          <div className="flex flex-col rounded-xl bg-white/5 border border-white/10 p-4 space-y-3">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="bg-white/10 text-white/60 text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-tighter">Standard</span>
                  <h4 className="text-white/90 font-bold text-base leading-none">Lab Samples (Cold Chain)</h4>
                </div>
                <p className="text-white/40 text-xs">Kaiser Permanente → Quest Diagnostics</p>
              </div>
              <div className="text-right">
                <p className="text-white text-xl font-bold leading-none">GHS 24.00</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs pt-2 border-t border-white/5">
              <div className="flex items-center gap-1.5 text-white/60">
                <span className="material-symbols-outlined text-[18px]">near_me</span>
                <span>3.8 km</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/60">
                <span className="material-symbols-outlined text-[18px]">schedule</span>
                <span>Within 45m</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobFeed;
