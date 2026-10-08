import React from 'react';

interface TopNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onQuickSimulate: () => void;
  isSimulating: boolean;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({
  activeTab,
  setActiveTab,
  onQuickSimulate,
  isSimulating,
}) => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      {/* Zone 1: Brand Wordmark (Single text element) */}
      <button
        onClick={() => setActiveTab('prototype')}
        className="text-lg font-bold tracking-tight text-white hover:text-amber-400 transition-colors flex items-center gap-2 cursor-pointer"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block animate-pulse"></span>
        <span>ABI-BEEGUARD</span>
      </button>

      {/* Zone 2: 4-6 Clean text navigation links */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
        <button
          onClick={() => setActiveTab('prototype')}
          className={`hover:text-amber-300 transition-colors cursor-pointer ${
            activeTab === 'prototype' ? 'text-amber-400 font-semibold' : 'text-slate-400'
          }`}
        >
          Live Prototype
        </button>
        <button
          onClick={() => setActiveTab('network')}
          className={`hover:text-amber-300 transition-colors cursor-pointer ${
            activeTab === 'network' ? 'text-amber-400 font-semibold' : 'text-slate-400'
          }`}
        >
          100-Hive Network
        </button>
        <button
          onClick={() => setActiveTab('hardware')}
          className={`hover:text-amber-300 transition-colors cursor-pointer ${
            activeTab === 'hardware' ? 'text-amber-400 font-semibold' : 'text-slate-400'
          }`}
        >
          Hardware & BOM
        </button>
        <button
          onClick={() => setActiveTab('patent')}
          className={`hover:text-amber-300 transition-colors cursor-pointer ${
            activeTab === 'patent' ? 'text-amber-400 font-semibold' : 'text-slate-400'
          }`}
        >
          Patent & Prior Art
        </button>
        <button
          onClick={() => setActiveTab('enterprise')}
          className={`hover:text-amber-300 transition-colors cursor-pointer ${
            activeTab === 'enterprise' ? 'text-amber-400 font-semibold' : 'text-slate-400'
          }`}
        >
          Rural Enterprise
        </button>
      </nav>

      {/* Zone 3: 1-2 Primary actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={onQuickSimulate}
          disabled={isSimulating}
          className="px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-lg transition-all shadow-sm cursor-pointer whitespace-nowrap disabled:opacity-50"
        >
          {isSimulating ? 'Analyzing Telemetry...' : 'Run Bio-Diagnostic'}
        </button>
      </div>
    </header>
  );
};
