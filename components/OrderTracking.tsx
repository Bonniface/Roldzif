import React, { useState, useEffect, useRef } from 'react';
import { AppScreen } from '../types';

interface OrderTrackingProps {
  onNavigate: (screen: AppScreen) => void;
}

const OrderTracking: React.FC<OrderTrackingProps> = ({ onNavigate }) => {
  // Map Interaction State
  const [position, setPosition] = useState({ x: -80, y: -60 });
  const [scale, setScale] = useState(1.3);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  // Courier Animation State (0 to 100%)
  const [progress, setProgress] = useState(0);
  // Signal Animation State (0 to 100%)
  const [signalProgress, setSignalProgress] = useState(0);

  // Sheet State
  const [sheetHeight, setSheetHeight] = useState(window.innerHeight * 0.55);
  const isSheetDragging = useRef(false);
  const sheetDragStartY = useRef(0);
  const sheetStartHeight = useRef(0);
  
  const requestRef = useRef<number>(0);

  // Animation Loop
  const animate = () => {
    setProgress((prev) => {
      if (prev >= 100) return 0;
      return prev + 0.08;
    });
    
    setSignalProgress((prev) => {
      if (prev >= 100) return 0;
      return prev + 1.5;
    });

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  // Sheet Drag Logic
  const handleSheetDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    isSheetDragging.current = true;
    sheetDragStartY.current = 'touches' in e ? e.touches[0].clientY : e.clientY;
    sheetStartHeight.current = sheetHeight;
  };

  useEffect(() => {
    const handleDragMove = (e: MouseEvent | TouchEvent) => {
      if (!isSheetDragging.current) return;
      const clientY = 'touches' in e ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY;
      const delta = sheetDragStartY.current - clientY;
      // Clamp between 150px (min) and 90% of screen (max)
      const newHeight = Math.min(Math.max(sheetStartHeight.current + delta, 150), window.innerHeight * 0.9);
      setSheetHeight(newHeight);
    };

    const handleDragEnd = () => {
      isSheetDragging.current = false;
    };

    window.addEventListener('mousemove', handleDragMove);
    window.addEventListener('mouseup', handleDragEnd);
    window.addEventListener('touchmove', handleDragMove);
    window.addEventListener('touchend', handleDragEnd);

    return () => {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchmove', handleDragMove);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, []);

  // Map Coordinates
  const startCoords = { x: 30, y: 35 }; // Hospital
  const endCoords = { x: 70, y: 65 };   // Drop-off

  const courierX = startCoords.x + (endCoords.x - startCoords.x) * (progress / 100);
  const courierY = startCoords.y + (endCoords.y - startCoords.y) * (progress / 100);

  const signalRatio = signalProgress / 100;
  const signalX = endCoords.x + (courierX - endCoords.x) * signalRatio;
  const signalY = endCoords.y + (courierY - endCoords.y) * signalRatio;

  const angleRad = Math.atan2(endCoords.y - startCoords.y, endCoords.x - startCoords.x);
  const angleDeg = angleRad * (180 / Math.PI);

  const etaMinutes = Math.ceil(12 * (1 - progress / 100));

  // Map Event Handlers
  const handleStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    setDragStart({ x: clientX - position.x, y: clientY - position.y });
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    const newX = clientX - dragStart.x;
    const newY = clientY - dragStart.y;
    setPosition({ x: newX, y: newY });
  };

  const handleEnd = () => setIsDragging(false);

  const onMouseDown = (e: React.MouseEvent) => handleStart(e.clientX, e.clientY);
  const onMouseMove = (e: React.MouseEvent) => handleMove(e.clientX, e.clientY);
  const onMouseUp = () => handleEnd();

  const onTouchStart = (e: React.TouchEvent) => handleStart(e.touches[0].clientX, e.touches[0].clientY);
  const onTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX, e.touches[0].clientY);
  const onTouchEnd = () => handleEnd();

  const handleWheel = (e: React.WheelEvent) => {
    const newScale = Math.max(0.8, Math.min(4, scale - e.deltaY * 0.001));
    setScale(newScale);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white h-screen flex flex-col overflow-hidden relative">
      {/* Top Navigation Bar */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <span onClick={() => onNavigate(AppScreen.ORDER_PLACEMENT)} className="material-symbols-outlined cursor-pointer">arrow_back_ios</span>
          <div>
            <h1 className="text-sm font-bold leading-tight">Order #ML-8842</h1>
            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Priority: Urgent Medical</p>
          </div>
        </div>
        <button 
            onClick={() => alert('Order Details:\nType: Kidney Transport\nDest: Korle Bu\nProtocol: STAT')}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800"
        >
          <span className="material-symbols-outlined text-xl">info</span>
        </button>
      </header>

      {/* Main Map Container */}
      <main className="absolute inset-0 z-0">
        <section 
          className="w-full h-full overflow-hidden bg-slate-200 cursor-grab active:cursor-grabbing touch-none"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onWheel={handleWheel}
        >
          <div 
            className="absolute top-0 left-0 w-[150%] h-[150%] origin-center transition-transform duration-75 ease-out will-change-transform"
            style={{ 
              backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB1uQumMrttYYL5uWiDYIjPVzZAE8zRvrbyMur3kUm1neU3r9F3jnkYCAknXWT5Eg74_uIdj-yd_34GX8JsHsN_JiPGIjS_4KyYZ30xndrvnkPzVXLAzvOA8qiAo509w9cWSuBcrjJCyhuiQaBF_Vf_gbLCpX9H0ii4zD2SqGx7ZqmNi4JSUBz9PfMTaTsVzACKtp3RXgQnUwiQT0IboJnd8jm3TRkMKt_ORdtp1YDAR2l3hHSxvYxrWO21B8FCzsAaCTcJzDVPOnQ")',
              backgroundSize: 'cover',
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            }}
          >
            {/* SVG Path Route */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              <line 
                x1={`${startCoords.x}%`} y1={`${startCoords.y}%`} 
                x2={`${endCoords.x}%`} y2={`${endCoords.y}%`} 
                stroke="#3b82f6" strokeWidth="2.5" strokeDasharray="8,6" strokeLinecap="round"
                className="opacity-60 drop-shadow-md"
              />
               <line 
                x1={`${startCoords.x}%`} y1={`${startCoords.y}%`} 
                x2={`${courierX}%`} y2={`${courierY}%`} 
                stroke="#3b82f6" strokeWidth="3" strokeLinecap="round"
                className="opacity-90 drop-shadow-md"
              />
            </svg>

            {/* Start Marker */}
            <div className="absolute transform -translate-x-1/2 -translate-y-full z-10" style={{ left: `${startCoords.x}%`, top: `${startCoords.y}%` }}>
              <div className="text-slate-600 drop-shadow-md bg-white/80 rounded-full p-0.5">
                <span className="material-symbols-outlined text-3xl">local_hospital</span>
              </div>
            </div>

            {/* Destination Marker */}
            <div className="absolute transform -translate-x-1/2 -translate-y-full z-10" style={{ left: `${endCoords.x}%`, top: `${endCoords.y}%` }}>
              <div className="flex flex-col items-center group">
                <div className="absolute top-4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-stat-red/20 rounded-full animate-ping"></div>
                <div className="text-stat-red drop-shadow-xl z-10 transform transition-transform group-hover:-translate-y-1">
                  <span className="material-symbols-outlined text-4xl material-symbols-filled">location_on</span>
                </div>
                <div className="bg-white/95 px-2 py-1 rounded-md shadow-lg text-[10px] font-bold text-slate-900 -mt-2 border border-slate-100 whitespace-nowrap z-20">
                  Ward 4B
                </div>
              </div>
            </div>

            {/* Signal Pulse */}
            <div 
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
              style={{ left: `${signalX}%`, top: `${signalY}%`, opacity: 1 - (signalProgress / 100) }}
            >
              <div className="w-3 h-3 bg-stat-red rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
              <div className="absolute inset-0 bg-stat-red rounded-full animate-ping opacity-50"></div>
            </div>

            {/* Courier Marker */}
            <div 
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 will-change-transform"
              style={{ left: `${courierX}%`, top: `${courierY}%` }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/40 rounded-full animate-ping"></div>
                <div className="absolute -inset-4 bg-primary/20 rounded-full animate-ping" style={{ animationDuration: '2s' }}></div>
                
                <div 
                  className="w-11 h-11 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl border-[3px] border-white relative z-10 ring-1 ring-black/10 transition-transform duration-300"
                  style={{ transform: `rotate(${angleDeg}deg)`, animation: 'pulse-shadow 2s infinite' }}
                >
                  <span className="material-symbols-outlined text-lg">two_wheeler</span>
                </div>
                
                {/* HUD ETA Display - Only visible if sheet is low enough */}
                {sheetHeight < window.innerHeight * 0.7 && (
                    <div className="absolute top-14 left-1/2 -translate-x-1/2 flex flex-col items-center z-30 transition-opacity duration-300">
                    <div className="h-4 w-0.5 bg-slate-900/50 dark:bg-white/30 backdrop-blur-sm -mt-2"></div>
                    <div className="bg-slate-900/90 dark:bg-black/80 backdrop-blur-md text-white rounded-xl shadow-2xl p-2.5 flex items-center gap-3 border border-slate-700/50 min-w-[120px]">
                        <div className="relative size-9 shrink-0">
                        <svg className="size-full -rotate-90 transform" viewBox="0 0 36 36">
                            <path className="text-slate-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" opacity="0.5" />
                            <path className="text-primary drop-shadow-[0_0_4px_rgba(59,130,246,0.8)] transition-all duration-100 ease-linear" 
                                strokeDasharray={`${progress}, 100`}
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                                fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[16px] text-white">timer</span>
                        </div>
                        </div>
                        
                        <div className="flex flex-col pr-1">
                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">Estimated</span>
                            <div className="flex items-baseline gap-1">
                            <span className="text-lg font-bold leading-none font-display tracking-tight text-white">{etaMinutes}</span>
                            <span className="text-[10px] font-medium text-slate-400">min</span>
                            </div>
                        </div>
                    </div>
                    </div>
                )}
              </div>
            </div>
          </div>

          {/* Map Controls */}
          <div className="absolute top-20 left-4 right-4 flex justify-between items-start pointer-events-none">
            <div className="bg-white/90 dark:bg-background-dark/90 backdrop-blur px-3 py-2 rounded-lg shadow-lg flex items-center gap-2 border border-slate-200 dark:border-slate-700 pointer-events-auto">
              <div className="size-2 rounded-full bg-primary animate-pulse"></div>
              <span className="text-xs font-bold text-slate-900 dark:text-white">Live Tracking Active</span>
            </div>
            <div className="bg-white/90 dark:bg-slate-800 text-slate-700 dark:text-white p-2 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 pointer-events-auto cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700" onClick={() => { setPosition({x:-80, y:-60}); setScale(1.3); }}>
              <span className="material-symbols-outlined text-lg">my_location</span>
            </div>
          </div>
        </section>
      </main>

      {/* Draggable Integrity Shield Bottom Sheet */}
      <section 
        className="absolute bottom-0 left-0 right-0 z-40 bg-background-light dark:bg-background-dark rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.15)] flex flex-col transition-[height] duration-75 ease-out"
        style={{ height: `${sheetHeight}px` }}
      >
          {/* Drag Handle */}
          <div 
            className="flex h-8 w-full items-center justify-center pt-2 cursor-grab active:cursor-grabbing touch-none shrink-0"
            onMouseDown={handleSheetDragStart}
            onTouchStart={handleSheetDragStart}
          >
            <div className="h-1.5 w-12 rounded-full bg-slate-300 dark:bg-slate-600"></div>
          </div>

          {/* Sheet Content (Scrollable) */}
          <div className="flex-1 overflow-y-auto px-4 pt-2 pb-6 no-scrollbar">
            <div className="flex flex-col items-center">
                {/* Headline */}
                <div className="flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-success material-symbols-filled">verified_user</span>
                <h2 className="text-lg font-bold tracking-tight">Integrity Shield Active</h2>
                </div>

                {/* Circular Integrity Gauge */}
                <div className="relative w-48 h-48 mb-8 shrink-0">
                <div className="absolute inset-0 z-10 pointer-events-none">
                    <div className="absolute top-[14%] right-[22%]">
                        <span className="text-[9px] font-bold text-slate-500 bg-white/60 dark:bg-black/40 backdrop-blur-[2px] px-1.5 py-0.5 rounded-md shadow-sm border border-slate-200/50">2°C</span>
                    </div>
                    <div className="absolute bottom-[28%] right-[8%]">
                        <span className="text-[9px] font-bold text-slate-500 bg-white/60 dark:bg-black/40 backdrop-blur-[2px] px-1.5 py-0.5 rounded-md shadow-sm border border-slate-200/50">8°C</span>
                    </div>
                    <div className="absolute top-[38%] right-[-12%] flex items-center">
                        <div className="w-6 h-[1px] bg-success"></div>
                        <span className="text-[9px] font-bold text-success uppercase ml-1 tracking-wider bg-success/5 px-1 rounded">Optimal</span>
                    </div>
                </div>

                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle className="text-slate-200 dark:text-slate-800" cx="50" cy="50" fill="transparent" r="45" stroke="currentColor" strokeWidth="6"></circle>
                    <circle className="text-success/20" cx="50" cy="50" fill="transparent" r="45" stroke="currentColor" strokeDasharray="70 282" strokeDashoffset="-20" strokeWidth="12"></circle>
                    <line x1="50" y1="5" x2="50" y2="15" stroke="currentColor" strokeWidth="2" className="text-success" transform="rotate(25 50 50)" />
                    <line x1="50" y1="5" x2="50" y2="15" stroke="currentColor" strokeWidth="2" className="text-success" transform="rotate(115 50 50)" />
                    <circle cx="50" cy="10" r="2" fill="currentColor" className="text-success" transform="rotate(70 50 50)" />
                    <circle className="text-success transition-all duration-1000 ease-out" cx="50" cy="50" fill="transparent" r="45" stroke="currentColor" strokeDasharray="200 282" strokeWidth="6" strokeLinecap="round"></circle>
                    <circle className="text-white drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" cx="50" cy="50" fill="white" r="4" stroke="transparent" transform="rotate(220 50 50) translate(45 0)"></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-4xl font-black tracking-tighter">5°C</span>
                    <span className="text-[10px] font-bold uppercase text-success bg-success/10 px-2 py-0.5 rounded-full mt-1">Optimal</span>
                </div>
                </div>

                {/* Time Logs */}
                <div className="grid grid-cols-2 gap-4 w-full mb-6">
                <div className="bg-slate-100 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-sm text-primary">schedule</span>
                        <p className="text-[10px] font-bold uppercase text-slate-500">Estimated Arrival</p>
                    </div>
                    <p className="text-xl font-black text-slate-900 dark:text-white">10:45 <span className="text-xs font-bold text-slate-400">AM</span></p>
                    <p className="text-[10px] text-primary font-bold mt-1">On Time</p>
                </div>

                <div className="bg-slate-100 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-sm text-slate-400">check_circle</span>
                        <p className="text-[10px] font-bold uppercase text-slate-500">Actual Arrival</p>
                    </div>
                    <p className="text-xl font-black text-slate-400">--:--</p>
                    <p className="text-[10px] text-slate-400 font-bold mt-1">Pending Delivery</p>
                </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 w-full mb-6">
                <div className="bg-slate-100 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2 mb-1">
                    <span className="material-symbols-outlined text-sm text-slate-400">thermostat</span>
                    <p className="text-[10px] font-bold uppercase text-slate-500">Safe Range</p>
                    </div>
                    <p className="text-lg font-bold">2°C – 8°C</p>
                </div>
                <div className="bg-slate-100 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2 mb-1">
                    <span className="material-symbols-outlined text-sm text-slate-400">humidity_low</span>
                    <p className="text-[10px] font-bold uppercase text-slate-500">Humidity</p>
                    </div>
                    <p className="text-lg font-bold">42%</p>
                </div>
                </div>

                {/* Progress Bar: Thermal Stability */}
                <div className="w-full bg-slate-100 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700 mb-8">
                <div className="flex justify-between items-center mb-2">
                    <p className="text-xs font-semibold">Thermal Integrity</p>
                    <p className="text-xs font-bold text-success">98%</p>
                </div>
                <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-success rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" style={{ width: '98%' }}></div>
                </div>
                <p className="text-[10px] text-slate-500 mt-2">Last ping: 45 seconds ago</p>
                </div>

                {/* Courier Info Section */}
                <div className="w-full mt-2 mb-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3 ml-1">Assigned Courier</h3>
                <div className="w-full flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                    <div className="size-12 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden ring-2 ring-white dark:ring-slate-800 shadow-sm">
                        <img className="w-full h-full object-cover" src="https://i.pravatar.cc/150?img=11" alt="Courier" />
                    </div>
                    <div>
                        <div className="flex items-center gap-1">
                        <p className="text-base font-bold leading-tight text-slate-900 dark:text-white">Marcus Thompson</p>
                        <span className="material-symbols-outlined text-primary text-sm material-symbols-filled">verified</span>
                        </div>
                        <div className="flex items-center gap-1 mt-0.5">
                        <span className="material-symbols-outlined text-amber-500 text-[10px] material-symbols-filled">star</span>
                        <p className="text-xs text-slate-500 font-medium">4.9 • Certified Medical Courier</p>
                        </div>
                    </div>
                    </div>
                    <div className="flex gap-2">
                    <button 
                        onClick={() => window.location.href = 'tel:1234567890'}
                        className="size-10 flex items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30 hover:bg-primary/90 transition-transform active:scale-95"
                    >
                        <span className="material-symbols-outlined text-xl material-symbols-filled">call</span>
                    </button>
                    <button 
                        onClick={() => alert('In-app chat opening...')}
                        className="size-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-white border border-slate-200 dark:border-slate-700 shadow-sm hover:bg-slate-200 transition-transform active:scale-95"
                    >
                        <span className="material-symbols-outlined text-xl material-symbols-filled">chat</span>
                    </button>
                    </div>
                </div>
                </div>

                {/* Action Button inside Sheet */}
                <button 
                    onClick={() => onNavigate(AppScreen.CUSTODY)}
                    className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-transform active:scale-[0.98]"
                >
                    <span className="material-symbols-outlined text-xl">history</span>
                    View Logistics Log
                </button>

            </div>
          </div>
      </section>

      {/* Styles for pulsing shadow */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse-shadow {
          0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
          100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
        }
      `}} />
    </div>
  );
};

export default OrderTracking;