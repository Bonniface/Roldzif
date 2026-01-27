import React, { useState } from 'react';
import { AppScreen } from '../types';

interface Props {
  onNavigate: (screen: AppScreen) => void;
}

const DeliveryHistory: React.FC<Props> = ({ onNavigate }) => {
  const [filter, setFilter] = useState<'ALL' | 'COMPLETED' | 'CANCELED'>('ALL');

  const jobs = [
    { id: '1', title: 'Kidney Transport (STAT)', date: 'Today, 10:45 AM', price: '58.50', status: 'COMPLETED', from: 'Ridge Hospital', to: 'Korle Bu' },
    { id: '2', title: 'Blood Plasma (4u)', date: 'Yesterday, 2:30 PM', price: '45.00', status: 'COMPLETED', from: '37 Military', to: 'Ridge' },
    { id: '3', title: 'Lab Samples', date: 'Mar 12, 11:00 AM', price: '24.00', status: 'CANCELED', from: 'Kaiser', to: 'Quest Diagnostics' },
    { id: '4', title: 'Vaccine Cooler', date: 'Mar 10, 09:15 AM', price: '32.00', status: 'COMPLETED', from: 'Central Stores', to: 'Polyclinic' },
  ];

  const filteredJobs = filter === 'ALL' ? jobs : jobs.filter(j => j.status === filter);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-background-dark font-display flex flex-col">
       <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 p-4 flex items-center gap-4">
        <button onClick={() => onNavigate(AppScreen.PROFILE)} className="size-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold text-slate-900 dark:text-white flex-1">Delivery History</h1>
        <button className="size-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
          <span className="material-symbols-outlined">filter_list</span>
        </button>
      </header>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4 p-4">
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Total Earnings</p>
              <p className="text-xl font-black text-slate-900 dark:text-white mt-1">GHS 1,240</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Jobs Done</p>
              <p className="text-xl font-black text-slate-900 dark:text-white mt-1">42</p>
          </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex px-4 gap-2 mb-4 overflow-x-auto no-scrollbar">
          {['ALL', 'COMPLETED', 'CANCELED'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide whitespace-nowrap transition-colors ${filter === f ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-white dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700'}`}
              >
                  {f}
              </button>
          ))}
      </div>

      {/* List */}
      <div className="flex-1 px-4 space-y-3 pb-8">
          {filteredJobs.map((job) => (
              <div key={job.id} className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                      <div>
                          <h3 className="font-bold text-slate-900 dark:text-white text-sm">{job.title}</h3>
                          <p className="text-xs text-slate-500">{job.date}</p>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${job.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {job.status}
                      </span>
                  </div>
                  
                  <div className="flex items-center gap-2 my-3">
                      <div className="flex flex-col items-center gap-0.5">
                          <div className="size-2 rounded-full bg-slate-300"></div>
                          <div className="w-0.5 h-6 bg-slate-200"></div>
                          <div className="size-2 rounded-full bg-primary"></div>
                      </div>
                      <div className="flex flex-col gap-2 text-xs font-medium text-slate-600 dark:text-slate-300">
                          <p>{job.from}</p>
                          <p>{job.to}</p>
                      </div>
                  </div>

                  <div className="flex justify-between items-center border-t border-slate-100 dark:border-slate-700 pt-3 mt-1">
                      <p className="font-black text-slate-900 dark:text-white">GHS {job.price}</p>
                      <button className="text-xs font-bold text-primary flex items-center gap-1">
                          Details <span className="material-symbols-outlined text-sm">chevron_right</span>
                      </button>
                  </div>
              </div>
          ))}
      </div>
    </div>
  );
};

export default DeliveryHistory;
