import React from 'react';
import { AppScreen } from '../types';

interface KYCVerificationProps {
  onNavigate: (screen: AppScreen) => void;
}

const KYCVerification: React.FC<KYCVerificationProps> = ({ onNavigate }) => {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-display text-white selection:bg-primary/30 pb-20">
      {/* TopAppBar */}
      <div className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-50">
        <div onClick={() => onNavigate(AppScreen.PROFILE)} className="text-primary flex size-12 shrink-0 items-center cursor-pointer">
          <span className="material-symbols-outlined text-[28px]">arrow_back_ios_new</span>
        </div>
        <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Identity Verification</h2>
        <div className="flex w-12 items-center justify-end">
          <button className="flex size-10 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-white">
            <span className="material-symbols-outlined text-[20px]">help</span>
          </button>
        </div>
      </div>

      {/* ProgressBar */}
      <div className="flex flex-col gap-3 px-6 py-2">
        <div className="flex justify-between items-end">
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wider">Step 2 of 4</p>
          <p className="text-primary text-sm font-bold leading-normal">50% Complete</p>
        </div>
        <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: '50%' }}></div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col items-center">
        <h3 className="text-slate-900 dark:text-white tracking-tight text-2xl font-bold leading-tight px-6 text-center pt-8">Scan Ghana Card</h3>
        <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-relaxed pb-6 pt-2 px-8 text-center max-w-md">
          Align the <span className="text-primary font-semibold">front</span> of your Ghana Card within the frame. Ensure lighting is even.
        </p>

        {/* Camera Viewfinder Section */}
        <div className="relative w-full px-4 flex flex-col items-center">
          {/* Status Badge */}
          <div className="absolute top-4 z-20 flex items-center gap-2 bg-primary/90 text-white px-4 py-1.5 rounded-full shadow-lg backdrop-blur-md border border-white/20">
            <span className="flex h-2 w-2 rounded-full bg-white animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-widest">Searching...</span>
          </div>

          {/* Camera Container */}
          <div className="relative aspect-[1.586/1] w-full max-w-[360px] rounded-2xl overflow-hidden bg-black shadow-2xl border border-slate-700/50">
            <div className="absolute inset-0 bg-cover bg-center opacity-70" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAI_Za8PuE21kORDvCHMnLWiL1xqTBuSkuTds9eXN_7BOAfP573RL3vxWIEewdHA_FMkVJlYcyFJ_FIYWPYfs5nnouYgzfeMbOlXWpVr35DZTC8rCRszZYi2WbSVI7OV6Ht77-JXO-zrC9BBU5bwC7vunaPYtclott2rCKl5q2F9SMOaP9wZMZqoS_so_hs4gpD7-eUbxGtZOv1gjzXS37pG4mq2nwJhII5_a7F2FxVwSv972JWb5cWNFhXzhW6SP20SIBQ_WYBRSk')" }}></div>
            <div className="absolute inset-0 bg-black/40"></div>
            
            {/* Scan Frame */}
            <div className="absolute inset-6 border border-white/20 rounded-xl">
              <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-primary rounded-tl-xl"></div>
              <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-primary rounded-tr-xl"></div>
              <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-primary rounded-bl-xl"></div>
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-primary rounded-br-xl"></div>
              
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <span className="material-symbols-outlined text-[100px]">badge</span>
              </div>
              {/* Scan Line Animation */}
              <div className="absolute top-0 left-0 w-full h-0.5 bg-primary shadow-[0_0_15px_#005fb8] animate-[scan_2s_ease-in-out_infinite]"></div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700">
            <span className="material-symbols-outlined text-[20px]">light_mode</span>
            <span className="text-sm">Improve lighting for faster detection</span>
          </div>
        </div>
      </div>

      {/* CameraControl & Footer */}
      <div className="mt-auto bg-white dark:bg-background-dark/80 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 p-6 pb-10">
        <div className="flex items-center justify-between gap-6 max-w-sm mx-auto mb-6">
          <button className="flex flex-col items-center gap-1 group">
            <div className="flex shrink-0 items-center justify-center rounded-full size-12 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-white group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors">
              <span className="material-symbols-outlined text-[24px]">image</span>
            </div>
            <span className="text-[10px] font-bold uppercase text-slate-500 tracking-tighter">Gallery</span>
          </button>
          
          <button 
            onClick={() => onNavigate(AppScreen.PROFILE)} 
            className="flex shrink-0 items-center justify-center rounded-full size-20 bg-primary shadow-xl shadow-primary/30 ring-4 ring-primary/20 hover:scale-105 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-white text-[40px] material-symbols-filled">photo_camera</span>
          </button>
          
          <button className="flex flex-col items-center gap-1 group">
            <div className="flex shrink-0 items-center justify-center rounded-full size-12 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-white group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors">
              <span className="material-symbols-outlined text-[24px]">flash_auto</span>
            </div>
            <span className="text-[10px] font-bold uppercase text-slate-500 tracking-tighter">Flash</span>
          </button>
        </div>
        <p className="text-[11px] text-center text-slate-400 px-10 leading-relaxed">
          <span className="material-symbols-outlined text-[12px] align-middle mr-1">lock</span>
          Your data is encrypted and used only for verification purposes by Ghana Card authority.
        </p>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}} />
    </div>
  );
};

export default KYCVerification;
