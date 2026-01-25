import React, { useState } from 'react';
import { AppScreen, User } from './types';
import Home from './components/Home';
import OrderPlacement from './components/OrderPlacement';
import JobFeed from './components/JobFeed';
import DeliveryProof from './components/DeliveryProof';
import KYCVerification from './components/KYCVerification';
import OrderTracking from './components/OrderTracking';
import Profile from './components/Profile';
import Wallet from './components/Wallet';

// --- Courier Layout (Biker) ---
const CourierLayout: React.FC<{ user: User; onSwitchUser: () => void }> = ({ user, onSwitchUser }) => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.HOME);

  const renderScreen = () => {
    switch (currentScreen) {
      case AppScreen.HOME:
        return <Home onNavigate={setCurrentScreen} user={user} />;
      case AppScreen.JOB_FEED:
        return <JobFeed onNavigate={setCurrentScreen} />;
      case AppScreen.DELIVERY_PROOF:
        return <DeliveryProof onNavigate={setCurrentScreen} />;
      case AppScreen.WALLET:
        return <Wallet onNavigate={setCurrentScreen} user={user} />;
      case AppScreen.PROFILE:
        return <Profile onNavigate={setCurrentScreen} user={user} onSwitchUser={onSwitchUser} />;
      case AppScreen.KYC_VERIFICATION:
        return <KYCVerification onNavigate={setCurrentScreen} />;
      default:
        return <Home onNavigate={setCurrentScreen} user={user} />;
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#f8f9fb] overflow-hidden mx-auto max-w-md shadow-2xl flex flex-col">
      <div className="flex-1 overflow-auto no-scrollbar">
        {renderScreen()}
      </div>

      {/* Courier Bottom Navigation: Home, Feed, POD, Wallet, Profile */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] bg-white/90 backdrop-blur-xl border-t border-slate-100 pb-safe">
        <div className="flex justify-between items-center px-1 py-2">
          <NavButton 
            active={currentScreen === AppScreen.HOME} 
            onClick={() => setCurrentScreen(AppScreen.HOME)} 
            icon="home" 
            label="Home"
          />
          <NavButton 
            active={currentScreen === AppScreen.JOB_FEED} 
            onClick={() => setCurrentScreen(AppScreen.JOB_FEED)} 
            icon="list_alt" 
            label="Feed" 
          />
          <NavButton 
            active={currentScreen === AppScreen.DELIVERY_PROOF} 
            onClick={() => setCurrentScreen(AppScreen.DELIVERY_PROOF)} 
            icon="fact_check" 
            label="POD" 
          />
          <NavButton 
            active={currentScreen === AppScreen.WALLET} 
            onClick={() => setCurrentScreen(AppScreen.WALLET)} 
            icon="account_balance_wallet" 
            label="Wallet" 
          />
          <NavButton 
            active={currentScreen === AppScreen.PROFILE} 
            onClick={() => setCurrentScreen(AppScreen.PROFILE)} 
            icon="person" 
            label="Profile" 
          />
        </div>
      </div>
    </div>
  );
};

// --- Hospital Layout (Pharmacy) ---
const HospitalLayout: React.FC<{ user: User; onSwitchUser: () => void }> = ({ user, onSwitchUser }) => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.HOME);

  const renderScreen = () => {
    switch (currentScreen) {
      case AppScreen.HOME:
        return <Home onNavigate={setCurrentScreen} user={user} />;
      case AppScreen.ORDER_PLACEMENT:
        return <OrderPlacement onNavigate={setCurrentScreen} />;
      case AppScreen.ORDER_TRACKING:
        return <OrderTracking onNavigate={setCurrentScreen} />;
      case AppScreen.WALLET:
        return <Wallet onNavigate={setCurrentScreen} user={user} />;
      case AppScreen.PROFILE:
        return <Profile onNavigate={setCurrentScreen} user={user} onSwitchUser={onSwitchUser} />;
      default:
        return <Home onNavigate={setCurrentScreen} user={user} />;
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#f8f9fb] overflow-hidden mx-auto max-w-md shadow-2xl flex flex-col">
      <div className="flex-1 overflow-auto no-scrollbar">
        {renderScreen()}
      </div>

      {/* Hospital Bottom Navigation: Home, Track, Wallet, Profile */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] bg-white/90 backdrop-blur-xl border-t border-slate-100 pb-safe">
        <div className="flex justify-around items-center px-4 py-2">
          <NavButton 
            active={currentScreen === AppScreen.HOME} 
            onClick={() => setCurrentScreen(AppScreen.HOME)} 
            icon="home" 
            label="Home" 
          />
          <NavButton 
            active={currentScreen === AppScreen.ORDER_TRACKING} 
            onClick={() => setCurrentScreen(AppScreen.ORDER_TRACKING)} 
            icon="radar" 
            label="Track" 
          />
          <NavButton 
            active={currentScreen === AppScreen.WALLET} 
            onClick={() => setCurrentScreen(AppScreen.WALLET)} 
            icon="account_balance_wallet" 
            label="Wallet" 
          />
          <NavButton 
            active={currentScreen === AppScreen.PROFILE} 
            onClick={() => setCurrentScreen(AppScreen.PROFILE)} 
            icon="person" 
            label="Profile" 
          />
        </div>
      </div>
    </div>
  );
};

// --- Main App Entry ---
const App: React.FC = () => {
  // Mock User State
  const [user, setUser] = useState<User>({
    name: 'Marcus Thompson',
    role: 'COURIER',
    isVerified: true
  });

  const handleSwitchUser = () => {
    if (user.role === 'COURIER') {
      setUser({
        name: 'Dr. Sarah Chen',
        role: 'HOSPITAL',
        isVerified: true
      });
    } else {
      setUser({
        name: 'Marcus Thompson',
        role: 'COURIER',
        isVerified: true
      });
    }
  };

  return user.role === 'COURIER' ? (
    <CourierLayout user={user} onSwitchUser={handleSwitchUser} />
  ) : (
    <HospitalLayout user={user} onSwitchUser={handleSwitchUser} />
  );
};

const NavButton: React.FC<{ active: boolean; onClick: () => void; icon: string; label: string }> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick} 
    className={`flex-1 flex flex-col items-center justify-center gap-1 p-2 rounded-xl transition-all duration-300 ${
      active 
        ? 'text-primary' 
        : 'text-slate-400 hover:text-slate-600'
    }`}
  >
    <div className={`relative p-1 rounded-full transition-all ${active ? 'bg-primary/10 -translate-y-1' : ''}`}>
        <span className={`material-symbols-outlined text-[24px] ${active ? 'material-symbols-filled' : ''}`}>{icon}</span>
    </div>
    <span className={`text-[10px] font-bold uppercase tracking-wider transition-opacity ${active ? 'opacity-100' : 'opacity-70'}`}>{label}</span>
  </button>
);

export default App;