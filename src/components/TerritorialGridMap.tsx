import React, { useState } from 'react';
import { HiveTelemetry, RiskLevel, SectorId } from '../types/beeguard';

interface TerritorialGridMapProps {
  hives: HiveTelemetry[];
  selectedHive: HiveTelemetry;
  onSelectHive: (hive: HiveTelemetry) => void;
  onSwitchToPrototype: () => void;
}

export const TerritorialGridMap: React.FC<TerritorialGridMapProps> = ({
  hives,
  selectedHive,
  onSelectHive,
  onSwitchToPrototype,
}) => {
  const [filterRisk, setFilterRisk] = useState<string>('ALL');
  const [heatmapMode, setHeatmapMode] = useState<'STATUS' | 'PESTICIDE' | 'SMOKE' | 'NECTAR'>('STATUS');
  const [selectedSector, setSelectedSector] = useState<string>('ALL');

  // Filtered hive list
  const filteredHives = hives.filter((h) => {
    if (filterRisk !== 'ALL' && h.status !== filterRisk) return false;
    if (selectedSector !== 'ALL' && h.sector !== selectedSector) return false;
    return true;
  });

  // Calculate sector and network summaries
  const criticalCount = hives.filter((h) => h.status === 'CRITICAL').length;
  const highRiskCount = hives.filter((h) => h.status === 'HIGH').length;
  const nominalCount = hives.filter((h) => h.status === 'NOMINAL').length;
  const avgTemp = (hives.reduce((acc, h) => acc + h.temperature, 0) / hives.length).toFixed(1);
  const totalWeight = hives.reduce((acc, h) => acc + h.weightKg, 0).toFixed(0);

  return (
    <div className="space-y-8">
      
      {/* Top Banner & ITU 2026 Spatial Intelligence Context */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
              <span>ITU 2026 GLOBAL DIGITAL COMPACT</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>100-NODE ECOLOGICAL BIO-MESH</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>1,250 HECTARES RADAR</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              100 Intelligent Hives as an Ecological Bio-Sensing Grid
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
              Honeybees forage across a 3 km radius, sampling millions of floral blooms daily and bringing botanical volatiles, airborne particulates, and micro-moisture directly into the hive.
              By synchronizing 100 autonomous solar nodes across agricultural margins and forest boundaries, the entire farm transforms into a real-time living bio-indicator network.
            </p>

            {/* Network Aggregate KPIs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-mono">
              <div className="border border-slate-800 bg-slate-950/60 p-3 rounded-lg">
                <span className="text-slate-400 block text-[10px] uppercase">Active Bio-Nodes</span>
                <span className="text-xl font-bold text-emerald-400 tabular-nums">100 / 100</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">100% LoRa packet rate</span>
              </div>
              <div className="border border-slate-800 bg-slate-950/60 p-3 rounded-lg">
                <span className="text-slate-400 block text-[10px] uppercase">Territory Covered</span>
                <span className="text-xl font-bold text-amber-400 tabular-nums">1,250 ha</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">3.2 km foraging zone</span>
              </div>
              <div className="border border-slate-800 bg-slate-950/60 p-3 rounded-lg">
                <span className="text-slate-400 block text-[10px] uppercase">Total Biomass</span>
                <span className="text-xl font-bold text-sky-400 tabular-nums">{totalWeight} kg</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">~6.0M pollinating bees</span>
              </div>
              <div className="border border-slate-800 bg-slate-950/60 p-3 rounded-lg">
                <span className="text-slate-400 block text-[10px] uppercase">Mean Brood Temp</span>
                <span className="text-xl font-bold text-slate-100 tabular-nums">{avgTemp} °C</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Within 34.8–35.4°C band</span>
              </div>
            </div>
          </div>

          {/* Right Image Asset */}
          <div className="lg:col-span-5 h-64 lg:h-full min-h-[280px] relative overflow-hidden border-t lg:border-t-0 lg:border-l border-slate-800">
            <img
              src="/src/assets/images/beeguard_grid_network_1791473486341.jpg"
              alt="100 hive territorial agroforestry biological network"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-950/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-3 right-3 text-[11px] font-mono bg-slate-900/90 text-amber-300 px-2.5 py-1 rounded border border-slate-800 backdrop-blur-md">
              Sector Overview · Sunrise Orthophoto
            </div>
          </div>

        </div>
      </div>

      {/* Control Bar: Heatmap Layer Selector & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-slate-800 bg-slate-900/60 rounded-xl">
        
        {/* Heatmap Layer Selector Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-950 rounded-lg border border-slate-800">
          <span className="text-xs font-mono text-slate-400 px-2">Layer:</span>
          {[
            { id: 'STATUS', label: 'Colony Health Status' },
            { id: 'PESTICIDE', label: 'Pesticide & VOC Plume' },
            { id: 'SMOKE', label: 'Wildfire Smoke Front' },
            { id: 'NECTAR', label: 'Nectar Flow Surge' },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setHeatmapMode(mode.id as any)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
                heatmapMode === mode.id
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>

        {/* Sector and Risk Filter */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 px-3 py-1.5 rounded-lg focus:outline-none focus:border-amber-400 cursor-pointer"
          >
            <option value="ALL">All 4 Ecological Sectors</option>
            <option value="SECTOR_A">Zone A: Orchard Margin (1–25)</option>
            <option value="SECTOR_B">Zone B: Forest Frontier (26–50)</option>
            <option value="SECTOR_C">Zone C: Riparian Corridor (51–75)</option>
            <option value="SECTOR_D">Zone D: Youth Apiary (76–100)</option>
          </select>

          <select
            value={filterRisk}
            onChange={(e) => setFilterRisk(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 px-3 py-1.5 rounded-lg focus:outline-none focus:border-amber-400 cursor-pointer"
          >
            <option value="ALL">All Risk Levels ({hives.length})</option>
            <option value="CRITICAL">Critical Alerts ({criticalCount})</option>
            <option value="HIGH">High Pre-Swarm ({highRiskCount})</option>
            <option value="NOMINAL">Nominal ({nominalCount})</option>
          </select>
        </div>

      </div>

      {/* Main 100-Hive Spatial Grid Map & Selected Hive Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Interactive 100-Hive Territorial Grid (lg:col-span-8) */}
        <div className="lg:col-span-8 border border-slate-800 bg-slate-900/70 p-6 rounded-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Territorial Spatial Grid Matrix (100 Autonomous Nodes)
              </h3>
              <p className="text-xs text-slate-400">
                Click any node to inspect real-time sensor telemetry and trigger bio-acoustic AI evaluation
              </p>
            </div>
            
            {/* Color Legend (strictly unboxed / clean) */}
            <div className="hidden sm:flex items-center gap-3 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> Nominal
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> Swarm Pre-Warning
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Toxic Drift / Fire
              </span>
            </div>
          </div>

          {/* 10 x 10 Spatial Matrix Grid Container */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
            
            {/* Sector Divider Labels */}
            <div className="grid grid-cols-4 gap-2 text-center text-[11px] font-mono text-slate-400 pb-3 border-b border-slate-900">
              <span className="text-amber-300">Zone A: Orchard</span>
              <span className="text-emerald-300">Zone B: Forest</span>
              <span className="text-sky-300">Zone C: Riparian</span>
              <span className="text-purple-300">Zone D: Youth Apiary</span>
            </div>

            {/* 100 Node Interactive Badges */}
            <div className="grid grid-cols-10 gap-2 pt-4">
              {filteredHives.map((h) => {
                const isSelected = h.id === selectedHive.id;
                
                // Color computation based on heatmap mode
                let nodeColor = 'bg-emerald-500 hover:bg-emerald-400';
                if (heatmapMode === 'STATUS') {
                  if (h.status === 'CRITICAL') nodeColor = 'bg-rose-500 hover:bg-rose-400 ring-2 ring-rose-400/50 animate-pulse';
                  else if (h.status === 'HIGH') nodeColor = 'bg-amber-400 hover:bg-amber-300 ring-2 ring-amber-400/40';
                  else if (h.status === 'MODERATE') nodeColor = 'bg-yellow-400 hover:bg-yellow-300';
                } else if (heatmapMode === 'PESTICIDE') {
                  if (h.vocIndex > 140) nodeColor = 'bg-rose-600 ring-2 ring-rose-400 animate-pulse';
                  else if (h.vocIndex > 60) nodeColor = 'bg-amber-500';
                  else nodeColor = 'bg-emerald-600/70';
                } else if (heatmapMode === 'SMOKE') {
                  if (h.smokePpm > 100) nodeColor = 'bg-orange-500 ring-2 ring-orange-400 animate-pulse';
                  else if (h.smokePpm > 30) nodeColor = 'bg-yellow-500';
                  else nodeColor = 'bg-slate-700';
                } else if (heatmapMode === 'NECTAR') {
                  if (h.weightDelta24h > 2.0) nodeColor = 'bg-amber-300 ring-2 ring-amber-200 animate-pulse';
                  else if (h.weightDelta24h > 1.0) nodeColor = 'bg-amber-500';
                  else nodeColor = 'bg-emerald-700/60';
                }

                return (
                  <button
                    key={h.id}
                    onClick={() => onSelectHive(h)}
                    title={`${h.id}: ${h.name} (${h.activeCondition})`}
                    className={`h-9 rounded-lg flex flex-col items-center justify-center text-[10px] font-mono transition-all cursor-pointer relative group ${
                      isSelected
                        ? 'ring-2 ring-white scale-110 z-10 shadow-lg'
                        : 'opacity-90 hover:opacity-100 hover:scale-105'
                    }`}
                  >
                    <div className={`w-full h-full rounded-lg flex items-center justify-center font-bold text-slate-950 ${nodeColor}`}>
                      {h.id.replace('HIVE-', '')}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Micro Caption */}
            <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 pt-4 mt-2 border-t border-slate-900">
              <span>Showing {filteredHives.length} nodes · LoRa SF7 / 125kHz</span>
              <span>Updated in real time via LoRaWAN Gateway Gateway-01</span>
            </div>

          </div>

          {/* Environmental Hazard Analysis Banner */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 space-y-2">
            <span className="text-xs font-mono uppercase text-amber-400 font-bold block">
              Automated Macro-Grid Pattern Recognition
            </span>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Notice how <strong className="text-rose-400">Node-012</strong> in Zone A detects a sharp localized agrochemical spray drift (VOC 186), while <strong className="text-amber-400">Node-004</strong> captures pre-swarm piping at 492 Hz before bees take flight.
              In Zone B, <strong className="text-orange-400">Node-038</strong> triggers early wildfire smoke detection (168 ppm) hours before satellite optical passes can penetrate morning cloud cover.
            </p>
          </div>

        </div>

        {/* Right: Live Selected Node Telemetry Inspector (lg:col-span-4) */}
        <div className="lg:col-span-4 border border-slate-800 bg-slate-900/80 p-6 rounded-xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">
                SELECTED BIO-NODE
              </span>
              <h3 className="text-lg font-bold text-white tracking-tight mt-0.5">
                {selectedHive.id} ({selectedHive.name})
              </h3>
            </div>
            <span className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded ${
              selectedHive.status === 'CRITICAL' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' :
              selectedHive.status === 'HIGH' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' :
              'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
            }`}>
              {selectedHive.status}
            </span>
          </div>

          <div className="text-xs font-mono text-slate-400 space-y-1">
            <p>Sector: <span className="text-slate-200">{selectedHive.sectorName}</span></p>
            <p>GPS Coordinates: <span className="text-slate-200">{selectedHive.lat}° N, {selectedHive.lng}° E</span></p>
            <p>Active Condition: <span className="text-amber-300 font-semibold">{selectedHive.activeCondition}</span></p>
          </div>

          {/* Comprehensive Telemetry Gauge Grid */}
          <div className="space-y-3 pt-1">
            
            <div className="border border-slate-800 bg-slate-950 p-3 rounded-lg flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Brood Temperature</span>
                <span className="text-sm font-mono font-bold text-white tabular-nums">{selectedHive.temperature}°C</span>
              </div>
              <span className="text-xs font-mono text-emerald-400">
                {selectedHive.temperature >= 34.5 && selectedHive.temperature <= 35.8 ? 'Optimal Brood' : 'Temperature Drift'}
              </span>
            </div>

            <div className="border border-slate-800 bg-slate-950 p-3 rounded-lg flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Acoustic Dominant Peak</span>
                <span className="text-sm font-mono font-bold text-amber-400 tabular-nums">{selectedHive.acousticPeakHz} Hz</span>
              </div>
              <span className="text-xs font-mono text-slate-300">
                {selectedHive.acousticPeakHz > 450 ? 'Pre-Swarm Piping' : 'Worker Fanning'}
              </span>
            </div>

            <div className="border border-slate-800 bg-slate-950 p-3 rounded-lg flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Colony Mass (HX711)</span>
                <span className="text-sm font-mono font-bold text-sky-400 tabular-nums">{selectedHive.weightKg} kg</span>
              </div>
              <span className="text-xs font-mono text-emerald-400 tabular-nums">
                {selectedHive.weightDelta24h > 0 ? '+' : ''}{selectedHive.weightDelta24h} kg / 24h
              </span>
            </div>

            <div className="border border-slate-800 bg-slate-950 p-3 rounded-lg flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase block">VOC / Chemical Index</span>
                <span className="text-sm font-mono font-bold text-rose-400 tabular-nums">{selectedHive.vocIndex}</span>
              </div>
              <span className="text-xs font-mono text-slate-300">
                {selectedHive.vocIndex > 140 ? 'Toxic Exposure Alert' : 'Pristine Air'}
              </span>
            </div>

            <div className="border border-slate-800 bg-slate-950 p-3 rounded-lg flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Solar & Battery</span>
                <span className="text-sm font-mono font-bold text-emerald-400 tabular-nums">{selectedHive.batteryPercent}% (LiFePO4)</span>
              </div>
              <span className="text-xs font-mono text-slate-300">
                {selectedHive.solarVoltage} V Harvest
              </span>
            </div>

          </div>

          {/* Quick Action to Test this Hive in Prototype Simulator */}
          <div className="pt-2">
            <button
              onClick={onSwitchToPrototype}
              className="w-full py-2.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-lg transition-colors cursor-pointer text-center block shadow-sm"
            >
              Open in Live Hardware Simulator & Test Audio
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
