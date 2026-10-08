import React, { useState } from 'react';

export const YouthEnterpriseModel: React.FC = () => {
  const [hiveCount, setHiveCount] = useState<number>(100);
  const [honeyPriceKg, setHoneyPriceKg] = useState<number>(6.5); // USD/kg raw organic honey

  // Economic calculations
  const baselineYieldPerHiveKg = 18;
  const beeguardYieldPerHiveKg = 28; // +55% through timely supering & no swarm loss
  const yieldIncreaseKg = (beeguardYieldPerHiveKg - baselineYieldPerHiveKg) * hiveCount;
  const additionalHoneyRevenue = yieldIncreaseKg * honeyPriceKg;

  // Swarm loss prevention value ($75 replacement cost per colony saved, ~20% swarm rate prevented)
  const coloniesSavedPerSeason = Math.round(hiveCount * 0.22);
  const swarmLossSavingsUSD = coloniesSavedPerSeason * 75;

  // Environmental data credit monetization ($12/hive/year)
  const dataCreditRevenueUSD = hiveCount * 12;

  // Total annual surplus
  const totalAnnualSurplus = additionalHoneyRevenue + swarmLossSavingsUSD + dataCreditRevenueUSD;
  const totalHardwareInvestment = hiveCount * 40.9;
  const paybackMonths = Math.max(1.8, +( (totalHardwareInvestment / totalAnnualSurplus) * 12 ).toFixed(1));
  const youthTechniciansSupported = Math.max(1, Math.round(hiveCount / 50));

  return (
    <div className="space-y-8">
      
      {/* Top Banner with Real Youth Asset */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
              <span>RURAL ENTERPRISE & YOUTH EMPOWERMENT</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>GREEN JOBS</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>DECENTRALIZED AGRI-TECH</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Decentralized Youth Cooperatives & Rural Enterprise Model
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed font-sans max-w-xl">
              Technology fails rural communities when it arrives as an imported black box with expensive recurring SaaS fees.
              ABI-BEEGUARD turns the sensing network into a sustainable rural economy: training local youth to fabricate, calibrate, and service sub-$42 hardware kits while managing territorial bio-monitoring for smallholder farmers.
            </p>

            {/* Micro Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono">
              <div className="border border-slate-800 bg-slate-950/60 p-3 rounded-lg">
                <span className="text-slate-400 block text-[10px] uppercase">Honey Yield Uplift</span>
                <span className="text-xl font-bold text-emerald-400 tabular-nums">+55.5%</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Zero unmanaged swarms</span>
              </div>
              <div className="border border-slate-800 bg-slate-950/60 p-3 rounded-lg">
                <span className="text-slate-400 block text-[10px] uppercase">Hardware Payback</span>
                <span className="text-xl font-bold text-amber-400 tabular-nums">&lt; 4 Months</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Rapid capital recovery</span>
              </div>
              <div className="border border-slate-800 bg-slate-950/60 p-3 rounded-lg">
                <span className="text-slate-400 block text-[10px] uppercase">Technician Wage</span>
                <span className="text-xl font-bold text-sky-400 tabular-nums">$320+/mo</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Dignified rural tech work</span>
              </div>
            </div>
          </div>

          {/* Right Image Asset */}
          <div className="lg:col-span-5 h-64 lg:h-full min-h-[300px] relative overflow-hidden border-t lg:border-t-0 lg:border-l border-slate-800">
            <img
              src="/src/assets/images/beeguard_rural_youth_1791473500868.jpg"
              alt="Rural African and international youth agronomists testing solar beehive sensor"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-950/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-3 right-3 text-[11px] font-mono bg-slate-900/90 text-amber-300 px-2.5 py-1 rounded border border-slate-800 backdrop-blur-md">
              Community Apiary Training Hub
            </div>
          </div>

        </div>
      </div>

      {/* 4-Step Youth Cooperative Training Pipeline */}
      <div className="border border-slate-800 bg-slate-900/70 p-6 rounded-xl space-y-4">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">
            The 4-Stage Rural Youth Technician Curriculum
          </h3>
          <p className="text-xs text-slate-400">
            Transitioning subsistence youth into certified apicultural IoT hardware specialists
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
          <div className="border border-slate-800 bg-slate-950 p-4 rounded-xl space-y-2">
            <span className="text-[10px] text-amber-400 uppercase font-bold block">
              Module 01: Micro-Assembly
            </span>
            <h4 className="text-sm font-bold text-white">PCB Assembly & Soldering</h4>
            <p className="text-slate-300 font-sans text-xs leading-relaxed">
              Youth learn basic electronics soldering, testing ESP32-S3 boards, attaching IP67 Gore vents, and connecting LiFePO4 cells safely.
            </p>
          </div>

          <div className="border border-slate-800 bg-slate-950 p-4 rounded-xl space-y-2">
            <span className="text-[10px] text-sky-400 uppercase font-bold block">
              Module 02: Calibration
            </span>
            <h4 className="text-sm font-bold text-white">Sensor Lab Calibration</h4>
            <p className="text-slate-300 font-sans text-xs leading-relaxed">
              Precision 4-point tare of HX711 load cells, testing INMP441 audio microphones with tuning forks, and BME688 baseline air burns.
            </p>
          </div>

          <div className="border border-slate-800 bg-slate-950 p-4 rounded-xl space-y-2">
            <span className="text-[10px] text-emerald-400 uppercase font-bold block">
              Module 03: Field Deployment
            </span>
            <h4 className="text-sm font-bold text-white">Apiary Mesh Installation</h4>
            <p className="text-slate-300 font-sans text-xs leading-relaxed">
              Mounting solar shingles on hive roofs, testing 868MHz LoRa signal strength with handheld field testers, and registering hives via USSD.
            </p>
          </div>

          <div className="border border-slate-800 bg-slate-950 p-4 rounded-xl space-y-2">
            <span className="text-[10px] text-purple-400 uppercase font-bold block">
              Module 04: Intervention
            </span>
            <h4 className="text-sm font-bold text-white">Rapid Swarm & Split Service</h4>
            <p className="text-slate-300 font-sans text-xs leading-relaxed">
              When AI predicts pre-swarm conditions (3-5 hr window), dispatched youth split the colony into fresh nucs, creating extra sellable bee stock.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Cooperative ROI & Enterprise Calculator */}
      <div className="border border-slate-800 bg-slate-900/70 p-6 rounded-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Interactive Cooperative Economic Model Calculator
            </h3>
            <p className="text-xs text-slate-400">
              Adjust parameters to project economic return and green jobs created across a rural district
            </p>
          </div>
          <span className="text-xs font-mono text-amber-400">
            Payback Runway: {paybackMonths} Months
          </span>
        </div>

        {/* Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-slate-300">Managed Hives in Cooperative</span>
              <span className="text-amber-400 font-bold tabular-nums">{hiveCount} Hives</span>
            </div>
            <input
              type="range"
              min="20"
              max="500"
              step="10"
              value={hiveCount}
              onChange={(e) => setHiveCount(parseInt(e.target.value, 10))}
              className="w-full accent-amber-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
              <span>20 Hives (Small Apiary)</span>
              <span>100 Hives (Grid)</span>
              <span>500 Hives (District)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-slate-300">Local Honey Market Price (USD / kg)</span>
              <span className="text-emerald-400 font-bold tabular-nums">${honeyPriceKg.toFixed(2)} / kg</span>
            </div>
            <input
              type="range"
              min="3.0"
              max="15.0"
              step="0.5"
              value={honeyPriceKg}
              onChange={(e) => setHoneyPriceKg(parseFloat(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
              <span>$3.00 (Bulk Wholesale)</span>
              <span>$6.50 (Average Regional)</span>
              <span>$15.00 (Certified Organic Export)</span>
            </div>
          </div>
        </div>

        {/* Calculated Financial Outputs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 text-xs font-mono">
          <div className="border border-slate-800 bg-slate-950 p-3.5 rounded-lg">
            <span className="text-slate-400 block text-[10px] uppercase">Additional Honey Yield</span>
            <span className="text-xl font-bold text-emerald-400 tabular-nums">
              +{yieldIncreaseKg.toLocaleString()} kg
            </span>
            <span className="text-[11px] text-slate-400 block mt-1">
              +${additionalHoneyRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })} USD revenue
            </span>
          </div>

          <div className="border border-slate-800 bg-slate-950 p-3.5 rounded-lg">
            <span className="text-slate-400 block text-[10px] uppercase">Swarm Losses Prevented</span>
            <span className="text-xl font-bold text-amber-400 tabular-nums">
              {coloniesSavedPerSeason} Colonies
            </span>
            <span className="text-[11px] text-slate-400 block mt-1">
              +${swarmLossSavingsUSD.toLocaleString()} capital protected
            </span>
          </div>

          <div className="border border-slate-800 bg-slate-950 p-3.5 rounded-lg">
            <span className="text-slate-400 block text-[10px] uppercase">Bio-Data Credits</span>
            <span className="text-xl font-bold text-sky-400 tabular-nums">
              ${dataCreditRevenueUSD.toLocaleString()} USD
            </span>
            <span className="text-[11px] text-slate-400 block mt-1">
              Sold to organic certification bodies
            </span>
          </div>

          <div className="border border-slate-800 bg-slate-950 p-3.5 rounded-lg">
            <span className="text-slate-400 block text-[10px] uppercase">Total Annual Surplus</span>
            <span className="text-xl font-bold text-white tabular-nums">
              ${totalAnnualSurplus.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </span>
            <span className="text-[11px] text-emerald-400 block mt-1">
              Supports {youthTechniciansSupported} Youth Techs
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};
