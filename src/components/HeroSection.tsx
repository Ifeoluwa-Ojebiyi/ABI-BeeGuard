import React from 'react';

interface HeroSectionProps {
  onExplorePrototype: () => void;
  onExploreNetwork: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExplorePrototype,
  onExploreNetwork,
}) => {
  return (
    <section className="relative overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Prose & Strategic Thesis */}
        <div className="lg:col-span-7 space-y-6">
          {/* Metadata line (strictly zero-pill) */}
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400/90 tracking-wide">
            <span>BIO-ACOUSTIC TELEMETRY</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>SOLAR HARVESTING</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>SUB-GHZ LORAWAN MESH</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>ITU 2026 ROADMAP</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            The Solar-Powered AI Biological Sensing Network
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans max-w-2xl">
            Turning standard beehives into intelligent environmental monitoring stations.
            By fusing continuous in-hive acoustics, microclimate VOC tracking, 4-point colony weight, and solar energy harvesting, ABI-BEEGUARD protects colonies from swarms and chemical exposure while converting 100 hives into a macroscopic farm and forest safety radar.
          </p>

          {/* Key Quantitative Proof Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            <div className="border border-slate-800 bg-slate-900/60 p-3.5 rounded-lg">
              <span className="block text-xs uppercase font-mono text-slate-400">Total BOM Cost</span>
              <span className="text-2xl font-mono font-bold text-amber-400 tabular-nums">$40.90</span>
              <span className="block text-[11px] text-slate-400 mt-0.5">Sub-$42 target reached</span>
            </div>
            <div className="border border-slate-800 bg-slate-900/60 p-3.5 rounded-lg">
              <span className="block text-xs uppercase font-mono text-slate-400">Swarm Lead Time</span>
              <span className="text-2xl font-mono font-bold text-emerald-400 tabular-nums">3–5 hrs</span>
              <span className="block text-[11px] text-slate-400 mt-0.5">490Hz acoustic FFT</span>
            </div>
            <div className="border border-slate-800 bg-slate-900/60 p-3.5 rounded-lg">
              <span className="block text-xs uppercase font-mono text-slate-400">Radio Mesh</span>
              <span className="text-2xl font-mono font-bold text-sky-400 tabular-nums">15 km</span>
              <span className="block text-[11px] text-slate-400 mt-0.5">LoRaWAN 868/915 MHz</span>
            </div>
            <div className="border border-slate-800 bg-slate-900/60 p-3.5 rounded-lg">
              <span className="block text-xs uppercase font-mono text-slate-400">Energy Autonomy</span>
              <span className="text-2xl font-mono font-bold text-amber-400 tabular-nums">Perpetual</span>
              <span className="block text-[11px] text-slate-400 mt-0.5">2W Solar + LiFePO4</span>
            </div>
          </div>

          {/* Interactive Entry Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onExplorePrototype}
              className="px-5 py-2.5 text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-lg transition-colors cursor-pointer shadow-md"
            >
              Test Hardware Prototype Simulator
            </button>
            <button
              onClick={onExploreNetwork}
              className="px-5 py-2.5 text-sm font-medium text-slate-200 border border-slate-700 hover:bg-slate-800 active:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              View 100-Hive Territorial Grid
            </button>
          </div>
        </div>

        {/* Right High-Fidelity Asset Visual Card */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 group">
            <img
              src="/src/assets/images/beeguard_hive_node_1791473463709.jpg"
              alt="ABI-BEEGUARD solar-powered intelligent beehive node in agroforestry orchard"
              referrerPolicy="no-referrer"
              className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-102 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent"></div>
            
            {/* Live Telemetry Overlay Pill-Free Card */}
            <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 border border-slate-700/80 p-3.5 rounded-lg backdrop-blur-md">
              <div className="flex items-center justify-between text-xs font-mono text-slate-300 pb-2 border-b border-slate-800">
                <span className="text-amber-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  NODE-04: LIVE TEST BENCH
                </span>
                <span>LoRa Uplink: 14s ago</span>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-2 text-xs font-mono">
                <div>
                  <span className="text-slate-400 block text-[10px]">BROOD TEMP</span>
                  <span className="text-slate-100 font-semibold tabular-nums">35.2 °C</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">FFT HARMONIC</span>
                  <span className="text-amber-300 font-semibold tabular-nums">225 Hz</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">SOLAR HARVEST</span>
                  <span className="text-emerald-400 font-semibold tabular-nums">+4.12 V</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
