import React, { useState } from 'react';
import { AppScreen } from '../types';

interface KYCVerificationProps {
  onNavigate: (screen: AppScreen) => void;
}

type DocumentStatus = 'PENDING' | 'UPLOADED' | 'VERIFIED';

interface KYCDocument {
  id: string;
  title: string;
  description: string;
  icon: string;
  status: DocumentStatus;
}

const KYCVerification: React.FC<KYCVerificationProps> = ({ onNavigate }) => {
  const [view, setView] = useState<'LIST' | 'CAPTURE'>('LIST');
  const [activeDocId, setActiveDocId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Initial State with required documents
  const [documents, setDocuments] = useState<KYCDocument[]>([
    { id: 'gh_card', title: 'Ghana Card (ID)', description: 'National Identity Card (Front)', icon: 'badge', status: 'VERIFIED' },
    { id: 'license', title: 'Professional License', description: 'Medical/Courier Council Certificate', icon: 'workspace_premium', status: 'PENDING' },
    { id: 'biz_reg', title: 'Business Registration', description: 'Registrar General Certificate', icon: 'domain', status: 'PENDING' },
    { id: 'insurance', title: 'Insurance Policy', description: 'Goods-in-transit / Liability Cover', icon: 'security', status: 'PENDING' },
  ]);

  const activeDoc = documents.find(d => d.id === activeDocId);
  const completedCount = documents.filter(d => d.status !== 'PENDING').length;
  const progress = Math.round((completedCount / documents.length) * 100);

  const handleDocSelect = (id: string) => {
    setActiveDocId(id);
    setView('CAPTURE');
  };

  const handleCaptureComplete = () => {
    setIsProcessing(true);
    // Simulate processing/upload delay
    setTimeout(() => {
        setDocuments(prev => prev.map(doc => 
            doc.id === activeDocId ? { ...doc, status: 'UPLOADED' } : doc
        ));
        setIsProcessing(false);
        setView('LIST');
        setActiveDocId(null);
    }, 1500);
  };

  const getStatusColor = (status: DocumentStatus) => {
    switch(status) {
        case 'VERIFIED': return 'text-success bg-success/10 border-success/20';
        case 'UPLOADED': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
        default: return 'text-slate-400 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700';
    }
  };

  const getStatusIcon = (status: DocumentStatus) => {
    switch(status) {
        case 'VERIFIED': return 'check_circle';
        case 'UPLOADED': return 'hourglass_top';
        default: return 'arrow_forward_ios';
    }
  };

  // --- RENDER: DOCUMENT LIST VIEW ---
  if (view === 'LIST') {
      return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white pb-20">
            {/* Header */}
            <div className="flex items-center p-4 pb-2 justify-between sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
                <div onClick={() => onNavigate(AppScreen.PROFILE)} className="text-primary flex size-12 shrink-0 items-center cursor-pointer">
                    <span className="material-symbols-outlined text-[28px]">arrow_back_ios_new</span>
                </div>
                <h2 className="text-lg font-bold leading-tight flex-1 text-center">Compliance & KYC</h2>
                <div className="flex w-12 items-center justify-end">
                    <button className="flex size-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                        <span className="material-symbols-outlined text-[20px]">info</span>
                    </button>
                </div>
            </div>

            {/* Progress Section */}
            <div className="px-6 py-6 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
                <div className="flex justify-between items-end mb-3">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Required Documents</h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Upload all certifications to activate account.</p>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-black text-primary">{progress}%</p>
                    </div>
                </div>
                <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full rounded-full bg-primary transition-all duration-700 ease-out" style={{ width: `${progress}%` }}></div>
                </div>
            </div>

            {/* Document List */}
            <div className="p-4 space-y-3">
                {documents.map((doc) => (
                    <button 
                        key={doc.id}
                        onClick={() => handleDocSelect(doc.id)}
                        disabled={doc.status === 'VERIFIED'}
                        className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 active:scale-[0.99] ${
                            doc.status === 'PENDING' 
                            ? 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:border-primary/50' 
                            : 'bg-slate-50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-800 opacity-80'
                        }`}
                    >
                        <div className={`size-12 rounded-xl flex items-center justify-center shrink-0 ${
                            doc.status === 'VERIFIED' ? 'bg-success text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300'
                        }`}>
                            <span className="material-symbols-outlined">{doc.icon}</span>
                        </div>
                        
                        <div className="flex-1 text-left">
                            <h3 className="font-bold text-base leading-tight">{doc.title}</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">{doc.description}</p>
                        </div>

                        <div className={`flex items-center gap-2 px-2 py-1 rounded-lg border text-[10px] font-bold uppercase tracking-wider ${getStatusColor(doc.status)}`}>
                            <span>{doc.status}</span>
                            {doc.status !== 'PENDING' && <span className="material-symbols-outlined text-[14px]">{getStatusIcon(doc.status)}</span>}
                        </div>
                    </button>
                ))}
            </div>

            {/* Bottom Help Text */}
            <div className="mt-auto p-6 text-center">
                <p className="text-xs text-slate-400">
                    Need help with your documents?<br/>
                    Contact <span className="text-primary font-bold cursor-pointer">Support</span> or view our <span className="text-primary font-bold cursor-pointer">Guidelines</span>.
                </p>
            </div>
        </div>
      );
  }

  // --- RENDER: CAPTURE VIEW ---
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-black font-display text-white pb-20">
      {/* Top Overlay */}
      <div className="flex items-center p-4 justify-between absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent pb-10">
        <div onClick={() => setView('LIST')} className="flex size-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md cursor-pointer hover:bg-white/20 transition-colors">
          <span className="material-symbols-outlined text-white">close</span>
        </div>
        <div className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
            <p className="text-xs font-bold uppercase tracking-widest">{activeDoc?.title}</p>
        </div>
        <div className="size-10"></div> {/* Spacer */}
      </div>

      {/* Camera Preview Area */}
      <div className="flex-1 relative flex flex-col items-center justify-center overflow-hidden bg-slate-900">
        {/* Simulated Camera Feed Background */}
        <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1622675363311-ac97f3a9e383?q=80&w=2787&auto=format&fit=crop')" }}></div>
        
        {/* Focus Frame */}
        <div className="relative z-10 w-[85%] aspect-[3/4] max-w-sm rounded-2xl border-2 border-white/30 shadow-[0_0_0_9999px_rgba(0,0,0,0.7)] flex flex-col items-center justify-center">
            {/* Corner Markers */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-xl -mt-0.5 -ml-0.5"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-xl -mt-0.5 -mr-0.5"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-xl -mb-0.5 -ml-0.5"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-xl -mb-0.5 -mr-0.5"></div>

            {/* Processing State Overlay */}
            {isProcessing ? (
                <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
                    <div className="size-16 rounded-full border-4 border-white/20 border-t-primary animate-spin mb-4"></div>
                    <p className="text-lg font-bold">Processing...</p>
                </div>
            ) : (
                <div className="flex flex-col items-center opacity-60">
                    <span className="material-symbols-outlined text-6xl text-white mb-2">{activeDoc?.icon}</span>
                    <p className="text-sm font-medium text-center px-8">Align {activeDoc?.title} within frame</p>
                </div>
            )}
        </div>
        
        {/* Guidelines */}
        <div className="absolute bottom-32 left-0 right-0 text-center z-20 px-6">
            <p className="text-sm font-medium text-white/80 bg-black/40 inline-block px-3 py-1 rounded-lg backdrop-blur-sm">
                Ensure text is clear and readable
            </p>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-xl border-t border-white/10 p-6 z-50">
        <div className="flex items-center justify-between max-w-md mx-auto">
            <button className="flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity">
                <div className="size-12 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="material-symbols-outlined">upload_file</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider">Upload PDF</span>
            </button>

            <button 
                onClick={handleCaptureComplete}
                disabled={isProcessing}
                className="size-20 rounded-full border-4 border-white flex items-center justify-center relative group active:scale-95 transition-all"
            >
                <div className="size-16 rounded-full bg-white group-hover:scale-90 transition-transform"></div>
            </button>

            <button className="flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity">
                <div className="size-12 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="material-symbols-outlined">flash_on</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider">Flash</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default KYCVerification;