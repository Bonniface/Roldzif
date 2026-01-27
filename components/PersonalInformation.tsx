import React, { useState } from 'react';
import { AppScreen, User } from '../types';

interface Props {
  onNavigate: (screen: AppScreen) => void;
  user: User;
}

const PersonalInformation: React.FC<Props> = ({ onNavigate, user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    phone: user.phone || '024 123 4567',
    email: 'user@example.com',
    address: '123 Independence Ave, Accra',
  });

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, you would save to backend here
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 p-4 flex items-center justify-between">
        <button onClick={() => onNavigate(AppScreen.PROFILE)} className="size-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">Personal Information</h1>
        <button 
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${isEditing ? 'bg-primary text-white shadow-md' : 'text-primary hover:bg-primary/10'}`}
        >
            {isEditing ? 'Save' : 'Edit'}
        </button>
      </header>

      <main className="flex-1 p-5 space-y-6">
        {/* Avatar Section */}
        <div className="flex flex-col items-center">
            <div className="relative group">
                <div className="size-24 rounded-full overflow-hidden border-4 border-slate-100 dark:border-slate-800 shadow-sm">
                    <img src={user.role === 'COURIER' ? "https://i.pravatar.cc/300?img=11" : "https://i.pravatar.cc/300?img=5"} alt="Profile" className="w-full h-full object-cover" />
                </div>
                {isEditing && (
                    <button className="absolute bottom-0 right-0 bg-slate-900 text-white p-1.5 rounded-full border-2 border-white dark:border-slate-900 shadow-md">
                        <span className="material-symbols-outlined text-sm">camera_alt</span>
                    </button>
                )}
            </div>
            <p className="mt-3 text-sm text-slate-500 font-medium">Profile photo visible to {user.role === 'COURIER' ? 'clients' : 'couriers'}</p>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
            <InputField 
                label="Full Name" 
                value={formData.name} 
                onChange={(v) => setFormData({...formData, name: v})} 
                disabled={!isEditing} 
                icon="person"
            />
            <InputField 
                label="Phone Number" 
                value={formData.phone} 
                onChange={(v) => setFormData({...formData, phone: v})} 
                disabled={!isEditing} 
                icon="call"
            />
            <InputField 
                label="Email Address" 
                value={formData.email} 
                onChange={(v) => setFormData({...formData, email: v})} 
                disabled={!isEditing} 
                icon="mail"
            />
            <InputField 
                label="Residential Address" 
                value={formData.address} 
                onChange={(v) => setFormData({...formData, address: v})} 
                disabled={!isEditing} 
                icon="home"
                multiline
            />
        </div>

        {/* Read-Only Role Info */}
        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">System Roles</h3>
            <div className="flex items-center gap-3 mb-3">
                <div className="size-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-300">
                    <span className="material-symbols-outlined">badge</span>
                </div>
                <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{user.role.replace('_', ' ')}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                        {user.isVerified && <span className="text-[9px] font-bold bg-blue-100 text-blue-700 px-1.5 rounded">KYC Verified</span>}
                        {user.badges?.includes('FDA_CERTIFIED') && <span className="text-[9px] font-bold bg-emerald-100 text-emerald-700 px-1.5 rounded">FDA Certified</span>}
                        {user.badges?.includes('TRUSTED_PARTNER') && <span className="text-[9px] font-bold bg-amber-100 text-amber-700 px-1.5 rounded">Gold Partner</span>}
                    </div>
                </div>
            </div>
            {user.vehicle && (
                <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-300">
                        <span className="material-symbols-outlined">directions_car</span>
                    </div>
                    <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{user.vehicle}</p>
                        <p className="text-xs text-slate-500">Registered Vehicle</p>
                    </div>
                </div>
            )}
        </div>
      </main>
    </div>
  );
};

const InputField: React.FC<{ 
    label: string; 
    value: string; 
    onChange: (val: string) => void; 
    disabled: boolean; 
    icon: string;
    multiline?: boolean;
}> = ({ label, value, onChange, disabled, icon, multiline }) => (
    <div className={`border rounded-xl px-4 py-2 transition-colors ${disabled ? 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/30' : 'border-primary bg-white dark:bg-slate-800 ring-1 ring-primary/20'}`}>
        <div className="flex gap-3">
            <div className="pt-2 text-slate-400">
                <span className="material-symbols-outlined text-[20px]">{icon}</span>
            </div>
            <div className="flex-1">
                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-0.5">{label}</label>
                {multiline ? (
                    <textarea 
                        className="w-full bg-transparent border-none p-0 text-sm font-semibold text-slate-900 dark:text-white focus:ring-0 resize-none" 
                        rows={2}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        disabled={disabled}
                    />
                ) : (
                    <input 
                        type="text" 
                        className="w-full bg-transparent border-none p-0 text-sm font-semibold text-slate-900 dark:text-white focus:ring-0 h-6" 
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        disabled={disabled}
                    />
                )}
            </div>
        </div>
    </div>
);

export default PersonalInformation;