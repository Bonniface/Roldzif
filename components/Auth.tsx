import React, { useState, useEffect } from 'react';
import { User, UserRole, VehicleType } from '../types';
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';
import { auth } from '../firebase';

// Declare window interface for recaptcha
declare global {
  interface Window {
    recaptchaVerifier: any;
  }
}

interface AuthProps {
  onLogin: (user: User) => void;
}

type AuthStep = 'LANDING' | 'LOGIN_CREDENTIALS' | 'PHONE_INPUT' | 'OTP_VERIFY' | 'CREATE_PIN' | 'ROLE_SELECT' | 'VEHICLE_SELECT';

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [step, setStep] = useState<AuthStep>('LANDING');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pin, setPin] = useState(''); // First Factor
  const [otp, setOtp] = useState(['', '', '', '', '', '']); // Second Factor
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Firebase State
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

  // Initialize Recaptcha when entering Input steps
  useEffect(() => {
    if (step === 'PHONE_INPUT' || step === 'LOGIN_CREDENTIALS') {
      // Clear existing verifier if any
      if (window.recaptchaVerifier) {
        try { 
          window.recaptchaVerifier.clear(); 
        } catch(e) {
          console.log('Error clearing recaptcha:', e);
        }
        window.recaptchaVerifier = null;
      }

      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        try {
          if (!auth) {
              console.error("Auth instance not ready");
              return;
          }
          window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            'size': 'invisible',
            'callback': () => {
              console.log("Recaptcha verified");
            },
            'expired-callback': () => {
               setError('reCAPTCHA expired. Please try again.');
               setIsLoading(false);
            }
          });
        } catch (err) {
          console.error("Recaptcha Init Error", err);
          // Only show error if we are actively on an auth step
          if (step === 'PHONE_INPUT' || step === 'LOGIN_CREDENTIALS') {
             setError('Failed to initialize security check. Please refresh.');
          }
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [step]);


  // --- Handlers ---

  const handleSendOtp = async () => {
    // Basic Validation
    if (phoneNumber.length < 9) {
      setError("Please enter a valid phone number");
      return;
    }

    // If logging in, validate PIN (Factor 1) before sending OTP (Factor 2)
    if (isLoginMode && pin.length < 4) {
      setError("Please enter your 4-digit Security PIN.");
      return;
    }

    setError(null);
    setIsLoading(true);

    const formattedNumber = `+233${phoneNumber.trim()}`; // Hardcoded Ghana code for this demo

    try {
      if (!window.recaptchaVerifier) {
          window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', { 'size': 'invisible' });
      }
      
      const appVerifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, formattedNumber, appVerifier);
      setConfirmationResult(result);
      setIsLoading(false);
      setStep('OTP_VERIFY');
    } catch (err: any) {
      console.error("SMS Error:", err);
      setIsLoading(false);
      
      if (err.code === 'auth/invalid-api-key') {
         setError("Configuration Error: Invalid Firebase API Key.");
      } else if (err.code === 'auth/quota-exceeded') {
         setError("SMS Quota Exceeded.");
      } else if (err.code === 'auth/invalid-phone-number') {
         setError("Invalid Phone Number format.");
      } else {
         setError(err.message || "Failed to send SMS. Check console.");
      }

      // Reset recaptcha on error
      if (window.recaptchaVerifier) {
        try { 
          window.recaptchaVerifier.clear(); 
          window.recaptchaVerifier = null; 
        } catch(e) {
          console.log('Error clearing recaptcha:', e);
        }
      }
    }
  };

  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 6) {
        setError("Please enter the 6-digit code.");
        return;
    }
    setError(null);
    setIsLoading(true);

    try {
      if (!confirmationResult) throw new Error("No verification session found.");
      
      const result = await confirmationResult.confirm(enteredOtp);
      console.log("Firebase Auth Success:", result.user);

      setIsLoading(false);
      
      if (isLoginMode) {
        // Login Successful (2FA Complete)
        onLogin({
          name: 'Marcus Thompson', 
          role: 'COURIER', 
          isVerified: true,
          phone: phoneNumber,
          vehicle: 'MOTORBIKE',
          badges: ['KYC', 'FDA_CERTIFIED']
        });
      } else {
        // Signup: OTP Verified, now Create PIN
        setStep('CREATE_PIN');
      }

    } catch (err: any) {
      setIsLoading(false);
      console.error("OTP Error:", err);
      if (err.code === 'auth/invalid-verification-code') {
        setError("Invalid code. Please check and try again.");
      } else {
        setError("Verification failed. Please try again.");
      }
    }
  };

  const handlePinCreation = () => {
    if (pin.length < 4) {
      setError("Please set a 4-digit PIN.");
      return;
    }
    // In a real app, save PIN to backend here
    setStep('ROLE_SELECT');
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'COURIER') {
      setTimeout(() => setStep('VEHICLE_SELECT'), 300);
    } else {
      finishSignup(role, undefined);
    }
  };

  const handleVehicleSelect = (vehicle: VehicleType) => {
    setSelectedVehicle(vehicle);
    finishSignup('COURIER', vehicle);
  };

  const finishSignup = (role: UserRole, vehicle?: VehicleType) => {
    setIsLoading(true);
    // In a real app, post to backend here
    setTimeout(() => {
      onLogin({
        name: 'New User',
        role: role,
        isVerified: false,
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
    if (value && index < 5) {
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
              onClick={() => { setIsLoginMode(true); setStep('LOGIN_CREDENTIALS'); }}
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-slate-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-xl">lock</span>
              Secure Log In
            </button>
            <button 
              onClick={() => { setIsLoginMode(false); setStep('PHONE_INPUT'); }}
              className="w-full bg-white text-slate-900 py-4 rounded-xl font-bold text-lg border border-slate-200 shadow-sm active:scale-[0.98] transition-all"
            >
              Create Account
            </button>
          </div>
          
          <p className="text-center text-xs text-slate-400 mt-8 font-medium">
            Protected by <span className="text-slate-600 font-bold">2-Factor Authentication</span>
          </p>
        </div>
      </div>
    );
  }

  // LOGIN FLOW: Step 1 (Credentials)
  if (step === 'LOGIN_CREDENTIALS') {
    return (
      <div className="min-h-screen bg-white font-display p-6 flex flex-col">
        <button onClick={() => setStep('LANDING')} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center mb-6 hover:bg-slate-100">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>

        <h2 className="text-2xl font-bold text-slate-900 mb-2">Welcome Back</h2>
        <p className="text-slate-500 mb-8">Enter credentials to trigger 2FA.</p>

        {/* Recaptcha Container */}
        <div id="recaptcha-container"></div>

        <div className="space-y-4 mb-6">
            <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Mobile Number</label>
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-1 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all">
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
            </div>

            <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Security PIN</label>
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all">
                    <span className="material-symbols-outlined text-slate-400 mr-2">lock</span>
                    <input 
                        type="password" 
                        maxLength={6}
                        className="flex-1 bg-transparent border-none focus:ring-0 text-lg font-bold text-slate-900 placeholder:text-slate-300 p-0"
                        placeholder="••••"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                    />
                </div>
                <div className="flex justify-end mt-2">
                    <button className="text-xs font-bold text-primary">Forgot PIN?</button>
                </div>
            </div>
        </div>
        
        {error && (
            <div className="mb-6 p-3 bg-red-50 text-red-500 text-sm font-bold rounded-lg flex items-center gap-2 animate-in slide-in-from-top-2">
                <span className="material-symbols-outlined text-lg">error</span>
                {error}
            </div>
        )}

        <button 
          onClick={handleSendOtp}
          disabled={phoneNumber.length < 9 || pin.length < 4 || isLoading}
          className="w-full bg-primary disabled:bg-slate-200 disabled:text-slate-400 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          {isLoading ? <span className="material-symbols-outlined animate-spin">sync</span> : 'Verify & Send SMS'}
        </button>
      </div>
    );
  }

  // SIGNUP FLOW: Step 1 (Phone Only)
  if (step === 'PHONE_INPUT') {
    return (
      <div className="min-h-screen bg-white font-display p-6 flex flex-col">
        <button onClick={() => setStep('LANDING')} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center mb-8 hover:bg-slate-100">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>

        <h2 className="text-2xl font-bold text-slate-900 mb-2">Get Started</h2>
        <p className="text-slate-500 mb-8">Enter your mobile number to create an account.</p>

        <div id="recaptcha-container"></div>

        <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-1 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all mb-4">
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
        
        {error && (
            <div className="mb-6 p-3 bg-red-50 text-red-500 text-sm font-bold rounded-lg flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">error</span>
                {error}
            </div>
        )}

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

  // SHARED: Step 2 (OTP Verification)
  if (step === 'OTP_VERIFY') {
    return (
      <div className="min-h-screen bg-white font-display p-6 flex flex-col">
        <button onClick={() => setStep(isLoginMode ? 'LOGIN_CREDENTIALS' : 'PHONE_INPUT')} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center mb-8 hover:bg-slate-100">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>

        <div className="mb-2 flex items-center gap-2">
            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide">
                {isLoginMode ? '2nd Factor' : 'Verification'}
            </span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
            {isLoginMode ? 'Two-Factor Auth' : 'Verify Phone'}
        </h2>
        <p className="text-slate-500 mb-8">
            Enter the 6-digit code sent to <span className="font-bold text-slate-900">+233 {phoneNumber}</span>
        </p>

        <div className="flex justify-between gap-2 mb-6">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              id={`otp-${idx}`}
              type="number"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(idx, e.target.value)}
              className="w-full h-14 rounded-xl border-2 border-slate-200 text-center text-2xl font-black text-slate-900 focus:border-primary focus:ring-0 focus:outline-none transition-all"
            />
          ))}
        </div>

        {error && (
            <div className="mb-6 p-3 bg-red-50 text-red-500 text-sm font-bold rounded-lg flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">error</span>
                {error}
            </div>
        )}

        <button 
          onClick={handleVerifyOtp}
          disabled={otp.join('').length !== 6 || isLoading}
          className="w-full bg-primary disabled:bg-slate-200 disabled:text-slate-400 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          {isLoading ? <span className="material-symbols-outlined animate-spin">sync</span> : 'Verify & Continue'}
        </button>
        
        <p className="text-center mt-6 text-sm font-bold text-slate-400">Didn't receive code? <span className="text-primary cursor-pointer" onClick={() => { setStep('PHONE_INPUT'); }}>Resend</span></p>
      </div>
    );
  }

  // SIGNUP FLOW: Step 3 (Create PIN)
  if (step === 'CREATE_PIN') {
      return (
        <div className="min-h-screen bg-white font-display p-6 flex flex-col">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Create Security PIN</h2>
            <p className="text-slate-500 mb-8">Set a 4-digit PIN for 2-Factor Authentication on future logins.</p>

            <div className="flex justify-center mb-8">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-primary border-4 border-blue-100">
                    <span className="material-symbols-outlined text-4xl">lock_open</span>
                </div>
            </div>

            <div className="mb-6">
                <label className="block text-xs font-bold uppercase text-slate-400 mb-2">New PIN</label>
                <input 
                    type="tel" 
                    maxLength={4}
                    className="w-full h-16 rounded-xl border-2 border-slate-200 text-center text-3xl font-black text-slate-900 focus:border-primary focus:ring-0 focus:outline-none tracking-[1em]"
                    value={pin}
                    placeholder="••••"
                    onChange={(e) => setPin(e.target.value)}
                />
            </div>

            {error && (
                <div className="mb-6 p-3 bg-red-50 text-red-500 text-sm font-bold rounded-lg flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">error</span>
                    {error}
                </div>
            )}

            <button 
                onClick={handlePinCreation}
                disabled={pin.length < 4}
                className="w-full bg-slate-900 disabled:bg-slate-200 disabled:text-slate-400 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-slate-900/20 active:scale-[0.98] transition-all"
            >
                Set PIN & Continue
            </button>
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