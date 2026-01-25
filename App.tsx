import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { AppScreen, User } from './types';
import Home from './components/Home';
import OrderPlacement from './components/OrderPlacement';
import JobFeed from './components/JobFeed';
import DeliveryProof from './components/DeliveryProof';
import KYCVerification from './components/KYCVerification';
import OrderTracking from './components/OrderTracking';
import Profile from './components/Profile';
import Wallet from './components/Wallet';
import Onboarding from './components/Onboarding';
import Auth from './components/Auth';

// --- Courier Layout (Biker) ---
// Keeps existing state-based navigation for now
const CourierLayout: React.FC<{ user: User; onSwitchUser: () => void; onLogout: () => void }> = ({ user, onSwitchUser, onLogout }) => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.HOME);
  const [showNotification, setShowNotification] = useState(false);

  // Simulate Push Notification Logic
  useEffect(() => {
    let timer: number;
    // Only trigger notification if on Job Feed to simulate "real-time" updates while browsing
    if (currentScreen === AppScreen.JOB_FEED) {
      // Wait 3.5 seconds before showing a new job alert
      timer = window.setTimeout(() => {
        setShowNotification(true);
      }, 3500);
    } else {
      setShowNotification(false);
    }

    return () => clearTimeout(timer);
  }, [currentScreen]);

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
    <div className="relative w-full min-h-screen bg-[#f8f9fb] overflow-hidden mx-auto max-w-md shadow-2xl flex flex-col animate-in fade-in duration-500">
      <div className="flex-1 overflow-auto no-scrollbar relative">
        {renderScreen()}
        
        {/* Simulated Push Notification Popup */}
        {showNotification && (
          <div className="absolute top-20 left-4 right-4 z-[60] animate-in slide-in-from-top-4 fade-in duration-500">
            <div className="bg-slate-900/95 backdrop-blur-md text-white p-4 rounded-2xl shadow-2xl border border-slate-700 flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                   <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-stat-red opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-stat-red"></span>
                    </span>
                   <span className="text-xs font-bold uppercase tracking-widest text-stat-red">Urgent Dispatch</span>
                </div>
                <button onClick={() => setShowNotification(false)} className="text-slate-400 hover:text-white">
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
                  <span className="material-symbols-outlined text-2xl text-blue-400">medical_services</span>
                </div>
                <div>
                  <h4 className="font-bold text-base leading-tight">Organ Transplant Kit</h4>
                  <p className="text-xs text-slate-400 mt-1">Ridge Hospital <span className="text-slate-600 mx-1">→</span> Korle Bu</p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-1 pt-3 border-t border-white/10">
                <p className="text-xl font-black text-white">GHS 120.00</p>
                <button 
                  onClick={() => {
                    setShowNotification(false);
                    // In a real app, this would scroll to the new item or open details
                  }}
                  className="bg-white text-slate-900 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide hover:bg-slate-200 transition-colors"
                >
                  View Order
                </button>
              </div>
            </div>
          </div>
        )}
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

// --- Hospital App Content (Inner Component to use Router Hooks) ---
const HospitalAppContent: React.FC<{ user: User; onSwitchUser: () => void; onLogout: () => void }> = ({ user, onSwitchUser, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Adapter function to map AppScreen enum to Routes
  const handleNavigate = (screen: AppScreen) => {
    switch (screen) {
      case AppScreen.HOME:
        navigate('/home');
        break;
      case AppScreen.ORDER_PLACEMENT:
        navigate('/order');
        break;
      case AppScreen.ORDER_TRACKING:
        navigate('/track');
        break;
      case AppScreen.WALLET:
        navigate('/wallet');
        break;
      case AppScreen.PROFILE:
        navigate('/profile');
        break;
      case AppScreen.KYC_VERIFICATION:
        navigate('/kyc');
        break;
      default:
        navigate('/home');
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#f8f9fb] overflow-hidden mx-auto max-w-md shadow-2xl flex flex-col animate-in fade-in duration-500">
      <div className="flex-1 overflow-auto no-scrollbar">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home onNavigate={handleNavigate} user={user} />} />
          <Route path="/order" element={<OrderPlacement onNavigate={handleNavigate} />} />
          <Route path="/track" element={<OrderTracking onNavigate={handleNavigate} />} />
          <Route path="/wallet" element={<Wallet onNavigate={handleNavigate} user={user} />} />
          <Route path="/profile" element={<Profile onNavigate={handleNavigate} user={user} onSwitchUser={onSwitchUser} />} />
          <Route path="/kyc" element={<KYCVerification onNavigate={handleNavigate} />} />
        </Routes>
      </div>

      {/* Hospital Bottom Navigation using Router Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] bg-white/90 backdrop-blur-xl border-t border-slate-100 pb-safe">
        <div className="flex justify-around items-center px-4 py-2">
          <NavButton 
            active={location.pathname === '/home'} 
            onClick={() => navigate('/home')} 
            icon="home" 
            label="Home" 
          />
          <NavButton 
            active={location.pathname === '/track'} 
            onClick={() => navigate('/track')} 
            icon="radar" 
            label="Track" 
          />
          <NavButton 
            active={location.pathname === '/wallet'} 
            onClick={() => navigate('/wallet')} 
            icon="account_balance_wallet" 
            label="Wallet" 
          />
          <NavButton 
            active={location.pathname === '/profile'} 
            onClick={() => navigate('/profile')} 
            icon="person" 
            label="Profile" 
          />
        </div>
      </div>
    </div>
  );
};

// --- Hospital Layout Wrapper ---
const HospitalLayout: React.FC<{ user: User; onSwitchUser: () => void; onLogout: () => void }> = ({ user, onSwitchUser, onLogout }) => {
  return (
    <HashRouter>
      <HospitalAppContent user={user} onSwitchUser={onSwitchUser} onLogout={onLogout} />
    </HashRouter>
  );
};

// --- Main App Entry ---
const App: React.FC = () => {
  // App Flow State
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const handleSwitchUser = () => {
    if (!user) return;
    if (user.role === 'COURIER') {
      setUser({
        ...user,
        name: 'Dr. Sarah Chen',
        role: 'DOCTOR', // Updated role type
        isVerified: true
      });
    } else {
      setUser({
        ...user,
        name: 'Marcus Thompson',
        role: 'COURIER',
        isVerified: true,
        vehicle: 'MOTORBIKE'
      });
    }
  };

  const handleLogout = () => {
    setUser(null);
    setHasOnboarded(true); // Keep them after onboarding, but logged out
  };

  // 1. Onboarding Check
  if (!hasOnboarded) {
    return (
      <div className="relative w-full min-h-screen bg-white overflow-hidden mx-auto max-w-md shadow-2xl">
        <Onboarding onComplete={() => setHasOnboarded(true)} />
      </div>
    );
  }

  // 2. Authentication Check
  if (!user) {
    return (
      <div className="relative w-full min-h-screen bg-white overflow-hidden mx-auto max-w-md shadow-2xl">
        <Auth onLogin={(u) => setUser(u)} />
      </div>
    );
  }

  // 3. Main App Layout (Role Based)
  return user.role === 'COURIER' ? (
    <CourierLayout user={user} onSwitchUser={handleSwitchUser} onLogout={handleLogout} />
  ) : (
    <HospitalLayout user={user} onSwitchUser={handleSwitchUser} onLogout={handleLogout} />
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
