import React, { useState } from 'react';
import { AppScreen } from '../types';
import { GoogleGenAI } from "@google/genai";

interface OrderPlacementProps {
  onNavigate: (screen: AppScreen) => void;
}

const OrderPlacement: React.FC<OrderPlacementProps> = ({ onNavigate }) => {
  const [showPayment, setShowPayment] = useState(false);
  const [deliveryMode, setDeliveryMode] = useState<string>('Motorbike');
  const [scheduleType, setScheduleType] = useState<'NOW' | 'LATER'>('NOW');
  const [instructions, setInstructions] = useState('');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  // Custom Calendar State
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<number>(new Date().getDate());
  const [selectedTime, setSelectedTime] = useState<string>('10:00');

  const handleEnhanceInstructions = async () => {
    if (!instructions.trim()) return;

    setIsEnhancing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Rewrite the following delivery handling instructions to be clear, professional, concise, and easy for a medical courier to understand. Keep the tone urgent but polite. Do not add conversational filler like "Here is the rewritten text". Just output the improved instructions. Input text: "${instructions}"`,
      });

      if (response.text) {
        setInstructions(response.text.trim());
      }
    } catch (error) {
      console.error("AI Enhancement failed", error);
      alert("Could not enhance text. Please check your connection.");
    } finally {
      setIsEnhancing(false);
    }
  };

  // Calendar Helpers
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  const timeSlots = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", 
    "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
  ];

  const changeMonth = (offset: number) => {
    const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + offset));
    setCurrentDate(new Date(newDate));
  };

  return (
    <div className="flex flex-col h-full min-h-screen bg-background-light dark:bg-background-dark pb-24">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center p-4 justify-between">
          <div onClick={() => onNavigate(AppScreen.HOME)} className="text-primary flex size-10 shrink-0 items-center justify-center cursor-pointer">
            <span className="material-symbols-outlined">arrow_back_ios</span>
          </div>
          <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">New Pickup Order</h2>
          <div className="flex w-10 items-center justify-end">
            <button 
                onClick={() => onNavigate(AppScreen.HOME)} 
                className="text-primary text-sm font-semibold"
            >
                Cancel
            </button>
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

        {/* Section: Destination Location */}
        <div className="px-4 mt-8">
          <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] mb-4">Destination</h3>
          <div className="flex flex-col gap-4">
            {/* Destination Address */}
            <div className="flex flex-col flex-1">
              <p className="text-slate-600 dark:text-slate-400 text-sm font-medium pb-2">Drop-off GPS Code</p>
              <div className="flex w-full items-stretch rounded-xl shadow-sm">
                <div className="flex items-center justify-center bg-white dark:bg-slate-800 border border-r-0 border-slate-300 dark:border-slate-700 pl-4 rounded-l-xl text-stat-red">
                  <span className="material-symbols-outlined">flag</span>
                </div>
                <input 
                  className="flex w-full min-w-0 flex-1 bg-white dark:bg-slate-800 border-x-0 border-none focus:outline-0 focus:ring-0 h-14 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-base font-semibold px-3 uppercase text-slate-900 dark:text-white" 
                  placeholder="GA-000-0000" 
                  defaultValue="KB-221-8841" 
                />
                <button 
                    onClick={() => alert("Simulating map view lookup...")}
                    className="bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-600 dark:text-white px-4 rounded-r-xl font-bold text-sm transition-colors border border-l-0 border-slate-300 dark:border-slate-600"
                >
                  MAP
                </button>
              </div>
               <p className="text-xs text-slate-500 mt-2 flex items-center gap-1 font-medium">
                <span className="material-symbols-outlined text-xs">business</span> Korle Bu Teaching Hospital
              </p>
            </div>

            <div className="flex gap-3">
                <label className="flex flex-col flex-1">
                    <p className="text-slate-600 dark:text-slate-400 text-sm font-medium pb-2">Drop-off Ward / Unit</p>
                    <input className="w-full rounded-xl bg-white dark:bg-slate-800 border-none h-14 px-4 text-base focus:ring-1 focus:ring-primary outline-none transition-all text-slate-900 dark:text-white" placeholder="e.g. Cardiology" />
                </label>
            </div>
          </div>
        </div>

        {/* Section: Pickup Time */}
        <div className="px-4 mt-8">
            <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] mb-4">Pickup Time</h3>
            <div className="grid grid-cols-2 gap-3 mb-3">
                <button 
                  onClick={() => setScheduleType('NOW')}
                  className={`flex flex-col items-center justify-center gap-1 border-2 rounded-xl h-20 shadow-sm active:scale-95 transition-all ${scheduleType === 'NOW' ? 'bg-primary/10 border-primary' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'}`}
                >
                     <span className={`material-symbols-outlined text-2xl ${scheduleType === 'NOW' ? 'text-primary' : 'text-slate-500'}`}>electric_bolt</span>
                     <span className={`${scheduleType === 'NOW' ? 'text-primary' : 'text-slate-600 dark:text-slate-300'} font-bold text-sm uppercase`}>Immediate</span>
                </button>
                <button 
                  onClick={() => setScheduleType('LATER')}
                  className={`flex flex-col items-center justify-center gap-1 border-2 rounded-xl h-20 shadow-sm active:scale-95 transition-all ${scheduleType === 'LATER' ? 'bg-primary/10 border-primary' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'}`}
                >
                     <span className={`material-symbols-outlined text-2xl ${scheduleType === 'LATER' ? 'text-primary' : 'text-slate-500'}`}>calendar_clock</span>
                     <span className={`${scheduleType === 'LATER' ? 'text-primary' : 'text-slate-600 dark:text-slate-300'} font-bold text-sm uppercase`}>Schedule</span>
                </button>
            </div>
            
            {scheduleType === 'LATER' && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 shadow-sm">
                  {/* Calendar Header */}
                  <div className="flex items-center justify-between mb-4">
                    <button onClick={() => changeMonth(-1)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full text-slate-500">
                      <span className="material-symbols-outlined">chevron_left</span>
                    </button>
                    <h4 className="font-bold text-slate-900 dark:text-white">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h4>
                    <button onClick={() => changeMonth(1)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full text-slate-500">
                      <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                  </div>

                  {/* Days Header */}
                  <div className="grid grid-cols-7 mb-2">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                      <div key={i} className="text-center text-xs font-bold text-slate-400">{day}</div>
                    ))}
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1 mb-6">
                    {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                      <div key={`empty-${i}`} className="aspect-square"></div>
                    ))}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const day = i + 1;
                      const isSelected = selectedDate === day;
                      const isToday = new Date().getDate() === day && new Date().getMonth() === currentDate.getMonth();
                      
                      return (
                        <button
                          key={day}
                          onClick={() => setSelectedDate(day)}
                          className={`aspect-square rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                            isSelected 
                              ? 'bg-primary text-white shadow-md shadow-primary/30' 
                              : isToday 
                                ? 'text-primary bg-primary/10 font-bold'
                                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                          }`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>

                  {/* Time Slots */}
                  <div className="border-t border-slate-100 dark:border-slate-700 pt-4">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Available Slots</p>
                    <div className="flex flex-wrap gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all ${
                            selectedTime === time
                              ? 'bg-primary text-white border-primary shadow-sm'
                              : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-primary/50'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
              </div>
            )}
        </div>

        {/* Section: Delivery Mode */}
        <div className="px-4 mt-8">
          <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] mb-4">Delivery Mode</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: 'Drone', icon: 'helicopter', color: 'bg-sky-500', text: 'text-sky-500', border: 'border-sky-500', bgLight: 'bg-sky-50', sub: 'Emergency / Light' },
              { name: 'Motorbike', icon: 'two_wheeler', color: 'bg-blue-600', text: 'text-blue-600', border: 'border-blue-600', bgLight: 'bg-blue-50', sub: 'Standard / Fast' },
              { name: 'Car', icon: 'directions_car', color: 'bg-indigo-500', text: 'text-indigo-500', border: 'border-indigo-500', bgLight: 'bg-indigo-50', sub: 'Secure / Medium' },
              { name: 'Truck', icon: 'local_shipping', color: 'bg-emerald-500', text: 'text-emerald-500', border: 'border-emerald-500', bgLight: 'bg-emerald-50', sub: 'Bulk / Heavy' },
            ].map((item) => {
              const isSelected = deliveryMode === item.name;
              return (
                <div 
                  key={item.name}
                  onClick={() => setDeliveryMode(item.name)}
                  className={`relative overflow-hidden flex flex-col gap-3 rounded-xl border p-4 items-start cursor-pointer transition-all duration-300 ${isSelected ? `${item.border} ${item.bgLight} ring-1 ring-offset-0 ring-[currentColor] shadow-lg scale-[1.02]` : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-400'}`}
                  style={isSelected ? { borderColor: 'var(--tw-ring-color)' } : {}}
                >
                  {/* Active Indicator Background Blob */}
                  {isSelected && <div className={`absolute top-0 right-0 w-16 h-16 ${item.color} opacity-10 rounded-bl-full -mr-4 -mt-4`}></div>}
                  
                  <div className={`z-10 p-2.5 rounded-xl transition-all duration-300 ${isSelected ? `${item.color} text-white shadow-md scale-110` : 'bg-slate-100 dark:bg-slate-900 text-slate-500'}`}>
                    <span className={`material-symbols-outlined text-2xl ${isSelected ? 'material-symbols-filled' : ''}`}>
                      {item.icon}
                    </span>
                  </div>
                  <div className="z-10">
                    <h2 className={`text-base font-bold leading-tight transition-colors ${isSelected ? item.text : 'text-slate-900 dark:text-white'}`}>{item.name}</h2>
                    <p className={`text-xs mt-1 font-medium transition-colors ${isSelected ? item.text : 'text-slate-500 dark:text-slate-400'} opacity-80`}>{item.sub}</p>
                  </div>
                  
                  {/* Selection Checkmark */}
                  {isSelected && (
                    <div className={`absolute top-3 right-3 ${item.text} animate-in zoom-in duration-300`}>
                      <span className="material-symbols-outlined text-xl material-symbols-filled">check_circle</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Instructions with Gemini AI */}
        <div className="px-4 mt-8">
          <div className="flex justify-between items-center pb-2">
            <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Handling Instructions</p>
            {instructions.length > 5 && (
              <button 
                onClick={handleEnhanceInstructions}
                disabled={isEnhancing}
                className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-md hover:shadow-lg active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isEnhancing ? (
                  <span className="material-symbols-outlined animate-spin text-sm">sync</span>
                ) : (
                  <span className="material-symbols-outlined text-sm">auto_awesome</span>
                )}
                {isEnhancing ? 'Enhancing...' : 'AI Enhance'}
              </button>
            )}
          </div>
          <div className="relative">
            <textarea 
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full rounded-xl bg-white dark:bg-slate-800 border-none p-4 text-base min-h-[120px] focus:ring-1 focus:ring-primary outline-none text-slate-900 dark:text-white transition-all resize-y" 
              placeholder="Add special instructions for the courier (e.g. 'Fragile, do not shake', 'Keep upright')..."
            ></textarea>
            {isEnhancing && (
               <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/50 backdrop-blur-[1px] rounded-xl flex items-center justify-center">
                  <div className="flex flex-col items-center">
                    <span className="material-symbols-outlined text-primary animate-bounce">auto_awesome</span>
                    <span className="text-xs font-bold text-primary bg-white dark:bg-slate-900 px-2 py-1 rounded-full shadow-sm mt-2">Refining with Gemini...</span>
                  </div>
               </div>
            )}
          </div>
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
                  <button 
                    onClick={() => setSelectedProvider('MTN')}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${selectedProvider === 'MTN' ? 'border-primary bg-primary/10 ring-1 ring-primary' : 'border-primary/10 bg-primary/5 hover:border-primary/50'}`}
                  >
                    <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center mb-2 overflow-hidden shadow-sm">
                      <div className="font-black text-[10px] text-blue-900">MTN</div>
                    </div>
                    <p className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase">MoMo</p>
                  </button>
                  {/* Telecel */}
                  <button 
                    onClick={() => setSelectedProvider('TELECEL')}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${selectedProvider === 'TELECEL' ? 'border-red-500 bg-red-50 ring-1 ring-red-500' : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:border-red-500'}`}
                  >
                    <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center mb-2 overflow-hidden shadow-sm">
                      <span className="text-white font-bold text-xs">T</span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase">Telecel</p>
                  </button>
                  {/* AT Money */}
                  <button 
                    onClick={() => setSelectedProvider('AT')}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${selectedProvider === 'AT' ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:border-blue-400'}`}
                  >
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