import React from 'react';

interface FooterProps {
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-10 px-6 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Wordmark & Mission Statement */}
        <div className="space-y-1.5 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-white font-bold text-sm tracking-tight">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span>ABI-BEEGUARD</span>
          </div>
          <p className="text-slate-400 max-w-md font-sans">
            The low-cost, solar-powered AI biological sensing network turning beehives into intelligent environmental monitoring stations.
          </p>
          <div className="flex items-center justify-center md:justify-start gap-2 text-[11px] font-mono text-slate-400 pt-1">
            <span>Aligned with ITU AI for Good & 2026 Emerging Physical AI Framework</span>
          </div>
        </div>

        {/* Center & Right Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 font-medium text-slate-400">
          <button
            onClick={() => onSelectTab('prototype')}
            className="hover:text-amber-300 transition-colors cursor-pointer"
          >
            Live Prototype
          </button>
          <button
            onClick={() => onSelectTab('network')}
            className="hover:text-amber-300 transition-colors cursor-pointer"
          >
            100-Hive Network
          </button>
          <button
            onClick={() => onSelectTab('hardware')}
            className="hover:text-amber-300 transition-colors cursor-pointer"
          >
            Hardware & BOM
          </button>
          <button
            onClick={() => onSelectTab('patent')}
            className="hover:text-amber-300 transition-colors cursor-pointer"
          >
            Patent & Prior Art
          </button>
          <button
            onClick={() => onSelectTab('enterprise')}
            className="hover:text-amber-300 transition-colors cursor-pointer"
          >
            Youth Enterprise
          </button>
        </div>

        {/* Copyright */}
        <div className="text-center md:text-right font-mono text-[11px] text-slate-400">
          <span>Open Hardware & Agro-Ecological AI Initiative</span>
        </div>

      </div>
    </footer>
  );
};
