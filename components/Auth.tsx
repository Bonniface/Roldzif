import React, { useState, useEffect } from 'react';
import { User, UserRole, VehicleType } from '../types';

interface AuthProps {
  onLogin: (user: User) => void;
}

type AuthStep = 'LANDING' | 'PHONE_INPUT' | 'OTP_VERIFY' | 'ROLE_SELECT' | 'VEHICLE_SELECT';

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [step, setStep] = useState<AuthStep>('LANDING');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isLoginMode, setIsLoginMode] = useState(true); // true = Login, false = Signup
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // --- Handlers ---

  const handleSendOtp = () => {
    if (phoneNumber.length < 9) return;
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep('OTP_VERIFY');
    }, 1500);
  };

  const handleVerifyOtp = () => {
    // Check if OTP is "1234" (Mock)
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 4) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (isLoginMode) {
        // Mock Login: Assign a default existing user based on random chance or hardcode
        onLogin({
          name: 'Marcus Thompson',
          role: 'COURIER', // Default to Courier for existing user login demo
          isVerified: true,
          phone: phoneNumber,
          vehicle: 'MOTORBIKE'
        });
      } else {
        // Signup Flow
        setStep('ROLE_SELECT');
      }
    }, 1500);
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'COURIER') {
      setTimeout(() => setStep('VEHICLE_SELECT'), 300);
    } else {
      // Complete Signup for Hospital Staff
      finishSignup(role, undefined);
    }
  };

  const handleVehicleSelect = (vehicle: VehicleType) => {
    setSelectedVehicle(vehicle);
    finishSignup('COURIER', vehicle);
  };

  const finishSignup = (role: UserRole, vehicle?: VehicleType) => {
    setIsLoading(true);
    setTimeout(() => {
      onLogin({
        name: 'New User',
        role: role,
        isVerified: false, // New users might need KYC
        phone: phoneNumber,
        vehicle: vehicle
      });
    }, 1500);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto focus next
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  // --- Renders ---

  if (step === 'LANDING') {
    return (
      <div className="min-h-screen bg-slate-50 relative flex flex-col font-display overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>

        <div className="flex-1 flex flex-col justify-end p-6 pb-12 z-10">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/30">
              <span className="material-symbols-outlined text-2xl">medical_services</span>
            </div>
            <span className="text-2xl font-black text-slate-900 tracking-tight">roldzif</span>
          </div>
          
          <h1 className="text-4xl font-black text-slate-900 mb-4 leading-none">
            Medical Logistics <br />
            <span className="text-primary">Reimagined.</span>
          </h1>
          <p className="text-slate-500 font-medium mb-12 max-w-xs leading-relaxed">
            The secure, cold-chain compliant network for Ghana's healthcare ecosystem.
          </p>

          <div className="flex flex-col gap-4">
            <button 
              onClick={() => { setIsLoginMode(true); setStep('PHONE_INPUT'); }}
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-slate-900/20 active:scale-[0.98] transition-all"
            >
              Log In
            </button>
            <button 
              onClick={() => { setIsLoginMode(false); setStep('PHONE_INPUT'); }}
              className="w-full bg-white text-slate-900 py-4 rounded-xl font-bold text-lg border border-slate-200 shadow-sm active:scale-[0.98] transition-all"
            >
              Create Account
            </button>
          </div>
          
          <p className="text-center text-xs text-slate-400 mt-8 font-medium">
            By continuing, you agree to our <span className="text-slate-600 underline">Terms</span> & <span className="text-slate-600 underline">Privacy Policy</span>
          </p>
        </div>
      </div>
    );
  }

  if (step === 'PHONE_INPUT') {
    return (
      <div className="min-h-screen bg-white font-display p-6 flex flex-col">
        <button onClick={() => setStep('LANDING')} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center mb-8 hover:bg-slate-100">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>

        <h2 className="text-2xl font-bold text-slate-900 mb-2">{isLoginMode ? 'Welcome Back!' : 'Get Started'}</h2>
        <p className="text-slate-500 mb-8">Enter your mobile number to continue.</p>

        <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-1 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all mb-6">
          <div className="flex items-center gap-2 border-r border-slate-200 pr-3 py-3">
             <img src="https://flagcdn.com/w40/gh.png" alt="Ghana" className="w-6 rounded-sm" />
             <span className="font-bold text-slate-700">+233</span>
          </div>
          <input 
            type="tel" 
            className="flex-1 bg-transparent border-none focus:ring-0 text-lg font-bold text-slate-900 placeholder:text-slate-300 py-3 pl-3"
            placeholder="XX XXX XXXX"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <button 
          onClick={handleSendOtp}
          disabled={phoneNumber.length < 9 || isLoading}
          className="w-full bg-primary disabled:bg-slate-200 disabled:text-slate-400 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          {isLoading ? <span className="material-symbols-outlined animate-spin">sync</span> : 'Send Verification Code'}
        </button>
      </div>
    );
  }

  if (step === 'OTP_VERIFY') {
    return (
      <div className="min-h-screen bg-white font-display p-6 flex flex-col">
        <button onClick={() => setStep('PHONE_INPUT')} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center mb-8 hover:bg-slate-100">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>

        <h2 className="text-2xl font-bold text-slate-900 mb-2">Verify Phone</h2>
        <p className="text-slate-500 mb-8">We sent a code to <span className="font-bold text-slate-900">+233 {phoneNumber}</span></p>

        <div className="flex justify-between gap-4 mb-8">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              id={`otp-${idx}`}
              type="number"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(idx, e.target.value)}
              className="w-full h-16 rounded-2xl border-2 border-slate-200 text-center text-3xl font-black text-slate-900 focus:border-primary focus:ring-0 focus:outline-none transition-all"
            />
          ))}
        </div>

        <button 
          onClick={handleVerifyOtp}
          disabled={otp.join('').length !== 4 || isLoading}
          className="w-full bg-primary disabled:bg-slate-200 disabled:text-slate-400 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          {isLoading ? <span className="material-symbols-outlined animate-spin">sync</span> : 'Verify & Continue'}
        </button>
        
        <p className="text-center mt-6 text-sm font-bold text-slate-400">Didn't receive code? <span className="text-primary cursor-pointer">Resend</span></p>
      </div>
    );
  }

  if (step === 'ROLE_SELECT') {
    return (
      <div className="min-h-screen bg-slate-50 font-display p-6 flex flex-col">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Who are you?</h2>
        <p className="text-slate-500 mb-6">Select your primary role to customize your experience.</p>

        <div className="flex-1 space-y-3 overflow-y-auto pb-4">
          <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Medical Facility</div>
          
          <RoleCard 
            icon="admin_panel_settings" 
            title="Hospital Admin" 
            subtitle="Manage facility logistics" 
            onClick={() => handleRoleSelect('HOSPITAL_ADMIN')} 
          />
          <RoleCard 
            icon="stethoscope" 
            title="Doctor / Clinician" 
            subtitle="Request patient transfers" 
            onClick={() => handleRoleSelect('DOCTOR')} 
          />
          <RoleCard 
            icon="badge" 
            title="HR Manager" 
            subtitle="Manage staff access" 
            onClick={() => handleRoleSelect('HR')} 
          />
           <RoleCard 
            icon="pill" 
            title="Pharmacist" 
            subtitle="Manage drug inventory" 
            onClick={() => handleRoleSelect('PHARMACIST')} 
          />

          <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-6 mb-2">Logistics Partner</div>
          
          <RoleCard 
            icon="local_shipping" 
            title="Courier / Driver" 
            subtitle="Deliver packages & patients" 
            active={true}
            onClick={() => handleRoleSelect('COURIER')} 
          />
        </div>
      </div>
    );
  }

  if (step === 'VEHICLE_SELECT') {
    return (
      <div className="min-h-screen bg-slate-50 font-display p-6 flex flex-col">
        <button onClick={() => setStep('ROLE_SELECT')} className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center mb-6 hover:bg-slate-300">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>

        <h2 className="text-2xl font-bold text-slate-900 mb-2">Vehicle Mode</h2>
        <p className="text-slate-500 mb-6">How will you be delivering?</p>

        {isLoading ? (
           <div className="flex-1 flex flex-col items-center justify-center">
             <div className="size-16 border-4 border-slate-200 border-t-primary rounded-full animate-spin mb-4"></div>
             <p className="text-slate-500 font-bold">Setting up your profile...</p>
           </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <VehicleCard icon="two_wheeler" label="Motorbike" onClick={() => handleVehicleSelect('MOTORBIKE')} />
            <VehicleCard icon="directions_car" label="Car / Sedan" onClick={() => handleVehicleSelect('CAR')} />
            <VehicleCard icon="airport_shuttle" label="Van" onClick={() => handleVehicleSelect('VAN')} />
            <VehicleCard icon="ambulance" label="Ambulance" onClick={() => handleVehicleSelect('AMBULANCE')} isSpecial />
            <VehicleCard icon="local_shipping" label="Truck" onClick={() => handleVehicleSelect('TRUCK')} />
            <VehicleCard icon="helicopter" label="Drone" onClick={() => handleVehicleSelect('DRONE')} />
          </div>
        )}
      </div>
    );
  }

  return null;
};

// --- Sub-components for Auth ---

const RoleCard: React.FC<{ icon: string; title: string; subtitle: string; active?: boolean; onClick: () => void }> = ({ icon, title, subtitle, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all active:scale-[0.98] ${active ? 'bg-primary/5 border-primary shadow-md' : 'bg-white border-slate-200 shadow-sm hover:border-slate-300'}`}
  >
    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${active ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500'}`}>
      <span className="material-symbols-outlined text-2xl">{icon}</span>
    </div>
    <div>
      <h3 className="text-base font-bold text-slate-900">{title}</h3>
      <p className="text-xs text-slate-500">{subtitle}</p>
    </div>
    <div className="ml-auto">
      <span className="material-symbols-outlined text-slate-300">chevron_right</span>
    </div>
  </button>
);

const VehicleCard: React.FC<{ icon: string; label: string; isSpecial?: boolean; onClick: () => void }> = ({ icon, label, isSpecial, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border transition-all active:scale-95 ${isSpecial ? 'bg-red-50 border-red-100' : 'bg-white border-slate-200 shadow-sm hover:border-primary'}`}
  >
    <div className={`w-14 h-14 rounded-full flex items-center justify-center ${isSpecial ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' : 'bg-slate-100 text-slate-600'}`}>
      <span className="material-symbols-outlined text-3xl">{icon}</span>
    </div>
    <span className={`text-sm font-bold ${isSpecial ? 'text-red-600' : 'text-slate-700'}`}>{label}</span>
  </button>
);

export default Auth;
