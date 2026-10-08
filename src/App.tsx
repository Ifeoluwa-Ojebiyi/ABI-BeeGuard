import React, { useState } from 'react';
import { initialHives } from './data/mockHives';
import { HiveTelemetry } from './types/beeguard';
import { TopNavigation } from './components/TopNavigation';
import { HeroSection } from './components/HeroSection';
import { PrototypeConsole } from './components/PrototypeConsole';
import { TerritorialGridMap } from './components/TerritorialGridMap';
import { HardwareSchematicViewer } from './components/HardwareSchematicViewer';
import { PriorArtBenchmarking } from './components/PriorArtBenchmarking';
import { YouthEnterpriseModel } from './components/YouthEnterpriseModel';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('prototype');
  const [hives, setHives] = useState<HiveTelemetry[]>(initialHives);
  const [selectedHive, setSelectedHive] = useState<HiveTelemetry>(initialHives[3]); // Hive-004 (pre-swarm)
  const [isSimulatingQuick, setIsSimulatingQuick] = useState<boolean>(false);

  // Handle hive telemetry updates from the simulator
  const handleUpdateHive = (updated: HiveTelemetry) => {
    setSelectedHive(updated);
    setHives((prev) => prev.map((h) => (h.id === updated.id ? updated : h)));
  };

  // Quick simulate button in navbar
  const handleQuickSimulate = async () => {
    setIsSimulatingQuick(true);
    setActiveTab('prototype');
    // Scroll smoothly to simulator
    window.scrollTo({ top: 400, behavior: 'smooth' });
    setTimeout(() => {
      setIsSimulatingQuick(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-400/20 selection:text-amber-200">
      
      {/* 3-Zone Top Bar */}
      <TopNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onQuickSimulate={handleQuickSimulate}
        isSimulating={isSimulatingQuick}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onExplorePrototype={() => {
            setActiveTab('prototype');
            window.scrollTo({ top: 450, behavior: 'smooth' });
          }}
          onExploreNetwork={() => {
            setActiveTab('network');
            window.scrollTo({ top: 450, behavior: 'smooth' });
          }}
        />

        {/* Section Navigation Tabs & Workspace */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          
          {/* Section Selector Bar */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900/80 rounded-xl border border-slate-800 mb-8 overflow-x-auto">
            {[
              { id: 'prototype', label: '01. Live Hardware & AI Prototype' },
              { id: 'network', label: '02. 100-Hive Territorial Bio-Grid' },
              { id: 'hardware', label: '03. Hardware Schematics & $40.90 BOM' },
              { id: 'patent', label: '04. Patent Claims & Prior-Art Audit' },
              { id: 'enterprise', label: '05. Rural Youth Enterprise Model' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Live Hardware Prototype Console */}
          {activeTab === 'prototype' && (
            <PrototypeConsole
              currentHive={selectedHive}
              onUpdateHive={handleUpdateHive}
            />
          )}

          {/* Tab 2: 100-Hive Territorial Bio-Grid */}
          {activeTab === 'network' && (
            <TerritorialGridMap
              hives={hives}
              selectedHive={selectedHive}
              onSelectHive={(hive) => {
                setSelectedHive(hive);
              }}
              onSwitchToPrototype={() => {
                setActiveTab('prototype');
                window.scrollTo({ top: 450, behavior: 'smooth' });
              }}
            />
          )}

          {/* Tab 3: Hardware Schematics & BOM */}
          {activeTab === 'hardware' && <HardwareSchematicViewer />}

          {/* Tab 4: Patent & Prior-Art Audit */}
          {activeTab === 'patent' && <PriorArtBenchmarking />}

          {/* Tab 5: Rural Youth Enterprise Model */}
          {activeTab === 'enterprise' && <YouthEnterpriseModel />}

        </div>
      </main>

      {/* Institutional Footer */}
      <Footer onSelectTab={setActiveTab} />
    </div>
  );
}
