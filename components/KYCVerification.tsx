import React, { useState } from 'react';
import { AppScreen } from '../types';

interface KYCVerificationProps {
  onNavigate: (screen: AppScreen) => void;
}

type DocumentStatus = 'PENDING' | 'UPLOADED' | 'VERIFIED';

interface KYCFile {
  id: string;
  name: string;
  type: 'IMAGE' | 'PDF';
  date: string;
}

interface KYCDocument {
  id: string;
  title: string;
  description: string;
  icon: string;
  status: DocumentStatus;
  files: KYCFile[];
}

const KYCVerification: React.FC<KYCVerificationProps> = ({ onNavigate }) => {
  const [view, setView] = useState<'LIST' | 'DETAILS' | 'CAPTURE'>('LIST');
  const [activeDocId, setActiveDocId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Initial State with required documents
  const [documents, setDocuments] = useState<KYCDocument[]>([
    { 
      id: 'gh_card', 
      title: 'Ghana Card (ID)', 
      description: 'Front and Back of National ID', 
      icon: 'badge', 
      status: 'VERIFIED',
      files: [
        { id: 'f1', name: 'gh_card_front.jpg', type: 'IMAGE', date: '2025-03-10 09:30' },
        { id: 'f2', name: 'gh_card_back.jpg', type: 'IMAGE', date: '2025-03-10 09:31' }
      ]
    },
    { 
      id: 'license', 
      title: 'Professional License', 
      description: 'Medical/Courier Council Certificate', 
      icon: 'workspace_premium', 
      status: 'PENDING',
      files: []
    },
    { 
      id: 'biz_reg', 
      title: 'Business Registration', 
      description: 'Registrar General Certificate (Form 3 & A)', 
      icon: 'domain', 
      status: 'PENDING',
      files: []
    },
    { 
      id: 'insurance', 
      title: 'Insurance Policy', 
      description: 'Goods-in-transit / Liability Cover', 
      icon: 'security', 
      status: 'PENDING',
      files: []
    },
  ]);

  const activeDoc = documents.find(d => d.id === activeDocId);
  const completedCount = documents.filter(d => d.status === 'VERIFIED' || (d.status === 'UPLOADED' && d.files.length > 0)).length;
  const progress = Math.round((completedCount / documents.length) * 100);

  const handleDocSelect = (id: string) => {
    setActiveDocId(id);
    setView('DETAILS');
  };

  const handleBack = () => {
    if (view === 'CAPTURE') setView('DETAILS');
    else if (view === 'DETAILS') {
       setActiveDocId(null);
       setView('LIST');
    } else {
       onNavigate(AppScreen.PROFILE);
    }
  };

  const handleAddFile = () => {
    setView('CAPTURE');
  };

  const simulateFileUpload = (type: 'IMAGE' | 'PDF') => {
    setIsProcessing(true);
    setTimeout(() => {
        const newFile: KYCFile = {
            id: Math.random().toString(36).substr(2, 9),
            name: type === 'IMAGE' ? `scan_${Date.now()}.jpg` : `doc_${Date.now()}.pdf`,
            type: type,
            date: new Date().toLocaleString()
        };

        setDocuments(prev => prev.map(doc => {
            if (doc.id === activeDocId) {
                const updatedFiles = [...doc.files, newFile];
                // Automatically set to UPLOADED if files exist and it was PENDING
                const newStatus = doc.status === 'PENDING' ? 'UPLOADED' : doc.status;
                return { ...doc, files: updatedFiles, status: newStatus };
            }
            return doc;
        }));

        setIsProcessing(false);
        setView('DETAILS');
    }, 1500);
  };

  const handleDeleteFile = (fileId: string) => {
      setDocuments(prev => prev.map(doc => {
          if (doc.id === activeDocId) {
              const updatedFiles = doc.files.filter(f => f.id !== fileId);
              // Revert to PENDING if no files left and wasn't VERIFIED
              const newStatus = (updatedFiles.length === 0 && doc.status !== 'VERIFIED') ? 'PENDING' : doc.status;
              return { ...doc, files: updatedFiles, status: newStatus };
          }
          return doc;
      }));
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

  // --- RENDER: LIST VIEW ---
  if (view === 'LIST') {
      return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white pb-20">
            {/* Header */}
            <div className="flex items-center p-4 pb-2 justify-between sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
                <div onClick={handleBack} className="text-primary flex size-12 shrink-0 items-center cursor-pointer">
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
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Upload certificates for Ghana regulations.</p>
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
                        className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 active:scale-[0.99] ${
                            doc.status === 'PENDING' 
                            ? 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm hover:border-primary/50' 
                            : 'bg-slate-50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-800'
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
                            {doc.files.length > 0 && (
                                <p className="text-[10px] text-primary font-bold mt-1 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[12px]">attachment</span>
                                    {doc.files.length} file{doc.files.length !== 1 ? 's' : ''} attached
                                </p>
                            )}
                        </div>

                        <div className={`flex items-center gap-2 px-2 py-1 rounded-lg border text-[10px] font-bold uppercase tracking-wider ${getStatusColor(doc.status)}`}>
                            <span>{doc.status}</span>
                            {doc.status !== 'PENDING' && <span className="material-symbols-outlined text-[14px]">{getStatusIcon(doc.status)}</span>}
                        </div>
                    </button>
                ))}
            </div>
        </div>
      );
  }

  // --- RENDER: DETAILS VIEW ---
  if (view === 'DETAILS' && activeDoc) {
      return (
        <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white">
            {/* Header */}
            <div className="flex items-center p-4 pb-2 justify-between sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
                <div onClick={handleBack} className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white flex size-12 shrink-0 items-center justify-center cursor-pointer rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                </div>
                <h2 className="text-lg font-bold leading-tight text-center">{activeDoc.title}</h2>
                <div className="size-12"></div>
            </div>

            <div className="flex-1 p-5 overflow-y-auto">
                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 mb-6">
                    <div className="flex items-start gap-4">
                         <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-2xl">{activeDoc.icon}</span>
                        </div>
                        <div>
                            <p className="text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                                {activeDoc.description}
                            </p>
                            <p className="text-xs text-slate-400 mt-2">
                                Please ensure all details are legible. Supports PDF, JPG, PNG.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                     <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">Uploaded Files</h3>
                     <span className="text-xs font-bold bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">{activeDoc.files.length}</span>
                </div>

                {activeDoc.files.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl bg-slate-50/50 dark:bg-slate-900/20">
                        <div className="size-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-3">
                            <span className="material-symbols-outlined text-3xl text-slate-300">folder_open</span>
                        </div>
                        <p className="text-sm font-semibold text-slate-500">No documents uploaded yet</p>
                        <p className="text-xs text-slate-400 mt-1">Tap the button below to add files</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {activeDoc.files.map((file) => (
                            <div key={file.id} className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm animate-in slide-in-from-bottom-2 fade-in duration-300">
                                <div className={`size-10 rounded-lg flex items-center justify-center shrink-0 ${file.type === 'PDF' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                                    <span className="material-symbols-outlined text-xl">{file.type === 'PDF' ? 'picture_as_pdf' : 'image'}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-slate-800 dark:text-white truncate">{file.name}</p>
                                    <p className="text-[10px] text-slate-400">{file.date}</p>
                                </div>
                                {activeDoc.status !== 'VERIFIED' && (
                                    <button 
                                        onClick={() => handleDeleteFile(file.id)}
                                        className="size-8 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-lg">delete</span>
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Bottom Actions */}
            <div className="p-5 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark z-10">
                {activeDoc.status === 'VERIFIED' ? (
                     <div className="w-full py-4 bg-success/10 text-success rounded-xl font-bold flex items-center justify-center gap-2 border border-success/20">
                         <span className="material-symbols-outlined">verified</span>
                         Document Verified
                     </div>
                ) : (
                    <div className="flex gap-3">
                        <button 
                            onClick={handleAddFile}
                            className="flex-1 py-4 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                            <span className="material-symbols-outlined">add_a_photo</span>
                            Add Document
                        </button>
                        {activeDoc.files.length > 0 && (
                             <button 
                                onClick={handleBack}
                                className="px-6 py-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl font-bold hover:bg-slate-200 transition-all active:scale-95 flex items-center justify-center gap-2"
                            >
                                <span className="material-symbols-outlined">check</span>
                                Done
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
      );
  }

  // --- RENDER: CAPTURE/UPLOAD VIEW ---
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-black font-display text-white">
      {/* Top Overlay */}
      <div className="flex items-center p-4 justify-between absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent pb-12">
        <button onClick={() => setView('DETAILS')} className="flex size-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md cursor-pointer hover:bg-white/20 transition-colors">
          <span className="material-symbols-outlined text-white">close</span>
        </button>
        <div className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
            <p className="text-xs font-bold uppercase tracking-widest text-white/90">Add to: {activeDoc?.title}</p>
        </div>
        <div className="size-10"></div>
      </div>

      {/* Camera Preview Area */}
      <div className="flex-1 relative flex flex-col items-center justify-center bg-slate-900">
        <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1622675363311-ac97f3a9e383?q=80&w=2787&auto=format&fit=crop')" }}></div>
        
        {/* Viewfinder */}
        <div className="relative z-10 w-[85%] aspect-[3/4] max-w-sm rounded-2xl border-2 border-white/30 shadow-[0_0_0_9999px_rgba(0,0,0,0.7)] flex flex-col items-center justify-center">
            {/* Corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-xl -mt-0.5 -ml-0.5"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-xl -mt-0.5 -mr-0.5"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-xl -mb-0.5 -ml-0.5"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-xl -mb-0.5 -mr-0.5"></div>

            {isProcessing ? (
                <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
                    <div className="size-16 rounded-full border-4 border-white/20 border-t-primary animate-spin mb-4"></div>
                    <p className="text-lg font-bold">Processing...</p>
                </div>
            ) : (
                <div className="flex flex-col items-center opacity-60">
                    <span className="material-symbols-outlined text-6xl text-white mb-2">{activeDoc?.icon}</span>
                    <p className="text-sm font-medium text-center px-8">Align document within frame</p>
                </div>
            )}
        </div>
        
        <div className="absolute bottom-36 left-0 right-0 text-center z-20 px-6">
            <p className="text-xs font-medium text-white/70 bg-black/40 inline-block px-3 py-1.5 rounded-lg backdrop-blur-sm">
                Make sure text is readable and well-lit
            </p>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-xl border-t border-white/10 p-8 z-50">
        <div className="flex items-center justify-around max-w-md mx-auto">
            <button 
                onClick={() => simulateFileUpload('PDF')}
                disabled={isProcessing}
                className="flex flex-col items-center gap-2 opacity-80 hover:opacity-100 transition-opacity disabled:opacity-30"
            >
                <div className="size-12 rounded-full bg-white/10 flex items-center justify-center border border-white/5">
                    <span className="material-symbols-outlined text-2xl">upload_file</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider">PDF</span>
            </button>

            <button 
                onClick={() => simulateFileUpload('IMAGE')}
                disabled={isProcessing}
                className="size-20 rounded-full border-4 border-white flex items-center justify-center relative group active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
            >
                <div className="size-16 rounded-full bg-white group-hover:scale-90 transition-transform"></div>
            </button>

            <button disabled className="flex flex-col items-center gap-2 opacity-50">
                <div className="size-12 rounded-full bg-white/10 flex items-center justify-center border border-white/5">
                    <span className="material-symbols-outlined text-2xl">flash_on</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider">Flash</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default KYCVerification;