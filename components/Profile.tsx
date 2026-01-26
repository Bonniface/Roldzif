import React, { useState } from 'react';
import { AppScreen, User } from '../types';

interface ProfileProps {
  onNavigate: (screen: AppScreen) => void;
  user: User;
  onSwitchUser: () => void;
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ onNavigate, user, onSwitchUser, onLogout }) => {
  const isCourier = user.role === 'COURIER';
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  const avatarUrl = isCourier 
    ? "https://i.pravatar.cc/300?img=11" // Marcus
    : "https://i.pravatar.cc/300?img=5"; // Sarah

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen text-slate-900 dark:text-white font-display pb-24 flex flex-col relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-[60] animate-in fade-in slide-in-from-top-4">
           <div className="bg-slate-900 text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl flex items-center gap-2">
              <span className="material-symbols-outlined text-base">info</span>
              {toastMessage}
           </div>
        </div>
      )}

      {/* Header with Settings */}
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex justify-between items-center">
        <h1 className="text-lg font-bold">My Profile</h1>
        <button 
          onClick={() => showToast('Settings coming soon')}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
        >
          <span className="material-symbols-outlined">settings</span>
        </button>
      </header>

      <main className="flex-1 px-5 pt-8">
        {/* User Identity Section */}
        <div className="flex flex-col items-center mb-8 relative">
          <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-primary/10 to-transparent -z-10 blur-3xl opacity-50"></div>
          
          <div className="relative group cursor-pointer" onClick={() => showToast('Edit photo feature coming soon')}>
            <div className={`w-28 h-28 rounded-full p-1 bg-gradient-to-tr ${isCourier ? 'from-primary to-blue-400' : 'from-emerald-500 to-teal-400'}`}>
              <img 
                src={avatarUrl}
                alt="Profile" 
                className="w-full h-full rounded-full object-cover border-4 border-background-light dark:border-background-dark"
              />
            </div>
            {/* Primary Status Badge */}
            <div className="absolute bottom-1 right-1 bg-success text-white p-1.5 rounded-full border-4 border-background-light dark:border-background-dark flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-sm font-bold">check</span>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mt-4 tracking-tight">{user.name}</h2>
          
          {/* Tiered Badges Display */}
          <div className="flex items-center gap-2 mt-2 flex-wrap justify-center">
             {/* Blue: KYC Verified */}
             {user.isVerified && (
               <div className="px-2 py-0.5 rounded-full flex items-center gap-1 border bg-blue-50 border-blue-200 text-blue-600">
                  <span className="material-symbols-outlined text-[14px] material-symbols-filled">verified</span>
                  <span className="text-[10px] font-bold uppercase tracking-wide">Verified</span>
               </div>
             )}
             
             {/* Green: FDA / Biohazard Certified (Courier) */}
             {user.badges?.includes('FDA_CERTIFIED') && (
               <div className="px-2 py-0.5 rounded-full flex items-center gap-1 border bg-emerald-50 border-emerald-200 text-emerald-600">
                  <span className="material-symbols-outlined text-[14px] material-symbols-filled">medical_services</span>
                  <span className="text-[10px] font-bold uppercase tracking-wide">FDA Certified</span>
               </div>
             )}

             {/* Gold: Trusted Partner (Hospital) */}
             {user.badges?.includes('TRUSTED_PARTNER') && (
               <div className="px-2 py-0.5 rounded-full flex items-center gap-1 border bg-amber-50 border-amber-200 text-amber-600">
                  <span className="material-symbols-outlined text-[14px] material-symbols-filled">stars</span>
                  <span className="text-[10px] font-bold uppercase tracking-wide">Gold Partner</span>
               </div>
             )}

             <span className="text-slate-400 text-xs font-semibold ml-1">ID: #{isCourier ? '8821' : 'H-402'}</span>
          </div>
        </div>

        {/* Dynamic Performance Stats */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {isCourier ? (
            <>
              <StatCard value="1,248" label="Deliveries" />
              <StatCard value="4.9" label="Rating" icon="star" iconColor="text-amber-400" />
              <StatCard value="98%" label="On-Time" valueColor="text-success" />
            </>
          ) : (
            <>
              <StatCard value="3" label="Active Orders" valueColor="text-primary" />
              <StatCard value="GHS 4.2k" label="Monthly Spend" />
              <StatCard value="4" label="Departments" />
            </>
          )}
        </div>

        {/* Menu Section */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-1">Account</h3>
          <div className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
             {isCourier ? (
               <>
                 <MenuItem icon="person" label="Personal Information" onClick={() => showToast('Personal Info coming soon')} />
                 <div className="h-px bg-slate-100 dark:bg-slate-700 mx-4"></div>
                 <MenuItem icon="history" label="Delivery History" onClick={() => onNavigate(AppScreen.MISSIONS)} />
                 <div className="h-px bg-slate-100 dark:bg-slate-700 mx-4"></div>
                 <MenuItem icon="account_balance_wallet" label="Earnings & Payouts" badge="GHS 420.00" onClick={() => onNavigate(AppScreen.WALLET)} />
                 <div className="h-px bg-slate-100 dark:bg-slate-700 mx-4"></div>
                 <MenuItem 
                   icon="verified_user" 
                   label="Certifications & KYC" 
                   onClick={() => onNavigate(AppScreen.KYC_VERIFICATION)}
                   badge="Action Required"
                   badgeColor="text-warning bg-warning/10 border-warning/20"
                 />
               </>
             ) : (
               <>
                 <MenuItem icon="domain" label="Organization Details" onClick={() => showToast('Org Details coming soon')} />
                 <div className="h-px bg-slate-100 dark:bg-slate-700 mx-4"></div>
                 <MenuItem icon="history" label="Order History" onClick={() => onNavigate(AppScreen.ORDER_TRACKING)} />
                 <div className="h-px bg-slate-100 dark:bg-slate-700 mx-4"></div>
                 <MenuItem icon="receipt_long" label="Billing & Invoices" badge="Due: GHS 1.2k" onClick={() => onNavigate(AppScreen.WALLET)} />
                 <div className="h-px bg-slate-100 dark:bg-slate-700 mx-4"></div>
                 <MenuItem icon="policy" label="Compliance Docs" onClick={() => onNavigate(AppScreen.KYC_VERIFICATION)} />
               </>
             )}
          </div>

          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-1 mt-6">Preferences</h3>
          <div className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
             <MenuItem icon="notifications" label="Notifications" onClick={() => showToast('Notification settings coming soon')} />
             <div className="h-px bg-slate-100 dark:bg-slate-700 mx-4"></div>
             <MenuItem icon="security" label="Security & Privacy" onClick={() => showToast('Security settings coming soon')} />
             <div className="h-px bg-slate-100 dark:bg-slate-700 mx-4"></div>
             <MenuItem icon="help" label="Help & Support" onClick={() => showToast('Support coming soon')} />
          </div>

           {/* Switch User Button */}
           <button 
             onClick={onSwitchUser}
             className="w-full mt-6 py-4 flex items-center justify-center gap-2 text-slate-700 dark:text-white font-bold bg-slate-200 dark:bg-slate-700 rounded-xl hover:bg-slate-300 dark:hover:bg-slate-600 transition-all active:scale-[0.98]"
           >
             <span className="material-symbols-outlined">switch_account</span>
             Switch to {isCourier ? 'Hospital View' : 'Courier View'}
           </button>

           <button 
             onClick={onLogout}
             className="w-full mt-3 py-4 flex items-center justify-center gap-2 text-stat-red font-bold bg-stat-red/10 rounded-xl hover:bg-stat-red/20 transition-all active:scale-[0.98]"
           >
             <span className="material-symbols-outlined">logout</span>
             Sign Out
           </button>
           
           <div className="text-center pt-6 pb-2">
             <p className="text-[10px] text-slate-400 font-medium">Roldzif v2.4.0</p>
           </div>
        </div>
      </main>
    </div>
  );
};

const StatCard: React.FC<{ value: string; label: string; icon?: string; iconColor?: string; valueColor?: string }> = ({ value, label, icon, iconColor, valueColor }) => (
  <div className="bg-white dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center gap-1 shadow-sm">
    <div className="flex items-center gap-1">
        <span className={`text-2xl font-black ${valueColor || 'text-slate-900 dark:text-white'}`}>{value}</span>
        {icon && <span className={`material-symbols-outlined ${iconColor} text-sm material-symbols-filled`}>{icon}</span>}
    </div>
    <span className="text-[10px] uppercase font-bold text-slate-500 text-center tracking-wider">{label}</span>
  </div>
);

interface MenuItemProps {
  icon: string;
  label: string;
  badge?: string;
  badgeColor?: string;
  onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, badge, badgeColor, onClick }) => (
  <button 
    onClick={onClick}
    className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-left group"
  >
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-300 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
        <span className="material-symbols-outlined text-lg">{icon}</span>
      </div>
      <span className="font-semibold text-sm text-slate-700 dark:text-slate-200">{label}</span>
    </div>
    <div className="flex items-center gap-2">
      {badge && (
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeColor || 'bg-success/10 text-success border-success/20'}`}>
          {badge}
        </span>
      )}
      <span className="material-symbols-outlined text-slate-400 text-lg">chevron_right</span>
    </div>
  </button>
);

export default Profile;