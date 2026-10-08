import React, { useState } from 'react';
import { HARDWARE_BOM, TOTAL_BOM_COST, POWER_BUDGET_METRICS } from '../data/hardwareBOM';

export const HardwareSchematicViewer: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const filteredBOM = HARDWARE_BOM.filter((item) => {
    if (selectedCategory === 'ALL') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="space-y-8">
      
      {/* Top Banner with Physical Prototype Asset */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
              <span>PHYSICAL PROTOTYPE BLUEPRINT</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>SUB-$42 BILL OF MATERIALS</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>15μA DEEP SLEEP</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Low-Cost Edge Hardware & Renewable Energy Architecture
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed font-sans max-w-xl">
              Competitive advantage stems from physical engineering rigor, not marketing jargon.
              ABI-BEEGUARD eliminates costly cellular modems and power-hungry Wi-Fi chips, combining an ESP32-S3 edge processor with on-chip I2S FFT audio processing, long-range LoRaWAN telemetry, and micro-solar MPPT harvesting to hit a sub-$42 total production cost.
            </p>

            {/* Hardware Cost Highlight */}
            <div className="flex items-baseline gap-4 pt-2">
              <div>
                <span className="block text-xs uppercase font-mono text-slate-400">Total Unit BOM Cost</span>
                <span className="text-3xl font-mono font-bold text-amber-400 tabular-nums">
                  ${TOTAL_BOM_COST.toFixed(2)} USD
                </span>
              </div>
              <div className="text-xs font-mono text-slate-400 pl-4 border-l border-slate-800">
                <span className="text-emerald-400 font-bold block">100% Open-Spec BOM</span>
                <span>Enables rural youth cooperative assembly</span>
              </div>
            </div>
          </div>

          {/* Right Prototype Photograph */}
          <div className="lg:col-span-5 h-64 lg:h-full min-h-[300px] relative overflow-hidden border-t lg:border-t-0 lg:border-l border-slate-800">
            <img
              src="/src/assets/images/beeguard_hardware_prototype_1791473474406.jpg"
              alt="ABI-BEEGUARD hardware prototype PCB assembly on workbench"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-950/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-3 right-3 text-[11px] font-mono bg-slate-900/90 text-amber-300 px-2.5 py-1 rounded border border-slate-800 backdrop-blur-md">
              Hardware Lab Prototype Node V2.1
            </div>
          </div>

        </div>
      </div>

      {/* Power Budget & Energy Harvesting Calculation Box */}
      <div className="border border-slate-800 bg-slate-900/70 p-6 rounded-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Micro Energy Harvesting & Infinite Autonomy Model
            </h3>
            <p className="text-xs text-slate-400">
              Mathematical proof of self-sustaining operation under dense tree canopy
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-semibold">
            Net Surplus: +13.1x Daily Margin
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
          <div className="border border-slate-800 bg-slate-950 p-3.5 rounded-lg">
            <span className="text-slate-400 block text-[10px] uppercase">Quiescent Deep Sleep</span>
            <span className="text-2xl font-bold text-sky-400 tabular-nums">
              {POWER_BUDGET_METRICS.deepSleepCurrentMicroAmps} μA
            </span>
            <span className="text-[11px] text-slate-400 block mt-1">RTC timer wake every 15 min</span>
          </div>

          <div className="border border-slate-800 bg-slate-950 p-3.5 rounded-lg">
            <span className="text-slate-400 block text-[10px] uppercase">Daily Consumption</span>
            <span className="text-2xl font-bold text-amber-400 tabular-nums">
              {POWER_BUDGET_METRICS.dailyEnergyConsumptionMilliWattHours} mWh
            </span>
            <span className="text-[11px] text-slate-400 block mt-1">Total sampling + LoRa TX</span>
          </div>

          <div className="border border-slate-800 bg-slate-950 p-3.5 rounded-lg">
            <span className="text-slate-400 block text-[10px] uppercase">Canopy Solar Harvest</span>
            <span className="text-2xl font-bold text-emerald-400 tabular-nums">
              {POWER_BUDGET_METRICS.solarDailyHarvestUnderCanopyMilliWattHours} mWh
            </span>
            <span className="text-[11px] text-slate-400 block mt-1">2W ETFE panel @ 4 hrs diffuse</span>
          </div>

          <div className="border border-slate-800 bg-slate-950 p-3.5 rounded-lg">
            <span className="text-slate-400 block text-[10px] uppercase">Zero-Sunlight Runway</span>
            <span className="text-2xl font-bold text-purple-400 tabular-nums">
              {POWER_BUDGET_METRICS.autonomousDaysWithoutSunlight} Days
            </span>
            <span className="text-[11px] text-slate-400 block mt-1">1500mAh LiFePO4 battery reserve</span>
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed font-sans">
          <strong>Why LiFePO4 over Standard Li-Ion:</strong> Lithium Iron Phosphate (LiFePO4) has an intrinsic thermal decomposition threshold over 270°C (immune to thermal runaway even in tropical direct sunlight), delivers 2,500–3,000 charge cycles (compared to 300–500 cycles for traditional 18650 Li-ion cells), and withstands temperatures from -20°C to +65°C without degradation.
        </div>
      </div>

      {/* Bill of Materials (BOM) Table */}
      <div className="border border-slate-800 bg-slate-900/70 p-6 rounded-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-3">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Complete Sub-$42 Bill of Materials (BOM)
            </h3>
            <p className="text-xs text-slate-400">
              Verified component pricing at 500-unit pilot batch quantity
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono">
            {['ALL', 'COMPUTE', 'RF', 'SENSORS', 'POWER', 'ENCLOSURE'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Component</th>
                <th className="py-2.5 px-3">Part Number</th>
                <th className="py-2.5 px-3">Key Specification</th>
                <th className="py-2.5 px-3">Supplier</th>
                <th className="py-2.5 px-3 text-right">Cost (USD)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850 text-slate-300">
              {filteredBOM.map((item) => (
                <tr key={item.id} className="hover:bg-slate-850/50 transition-colors">
                  <td className="py-2.5 px-3 font-semibold text-white">
                    {item.component}
                  </td>
                  <td className="py-2.5 px-3 text-amber-300">
                    {item.partNumber}
                  </td>
                  <td className="py-2.5 px-3 text-slate-400 font-sans text-[11px] max-w-xs">
                    {item.function}
                  </td>
                  <td className="py-2.5 px-3 text-slate-400">
                    {item.supplier}
                  </td>
                  <td className="py-2.5 px-3 text-right font-bold text-amber-400 tabular-nums">
                    ${item.unitCostUSD.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="border-t-2 border-slate-800 bg-slate-950 text-slate-100 font-bold">
              <tr>
                <td colSpan={4} className="py-3 px-3 uppercase text-right">
                  Total Unit Cost (FOB Shenzhen / Local Assembly):
                </td>
                <td className="py-3 px-3 text-right text-base text-amber-400 tabular-nums">
                  ${TOTAL_BOM_COST.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Firmware State Machine & Pinout Map */}
      <div className="border border-slate-800 bg-slate-900/70 p-6 rounded-xl space-y-4">
        <h3 className="text-base font-bold text-white tracking-tight">
          ESP32-S3 Firmware Execution State Machine
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-3.5 rounded-lg border border-slate-800 bg-slate-950">
            <span className="text-amber-400 font-bold block mb-1">State 01: RTC Timer Wake</span>
            <p className="text-slate-400 font-sans leading-relaxed text-[11px]">
              RTC timer elapses (15 min) or LIS3DHTR motion interrupt fires. Main 240MHz Xtensa cores power up from deep sleep (15μA → 22mA).
            </p>
          </div>
          <div className="p-3.5 rounded-lg border border-slate-800 bg-slate-950">
            <span className="text-sky-400 font-bold block mb-1">State 02: I2S Acoustic FFT</span>
            <p className="text-slate-400 font-sans leading-relaxed text-[11px]">
              INMP441 samples 2,048 audio frames at 8kHz. On-chip CMSIS DSP calculates 512-point fixed-point FFT, isolating 100-1000Hz biological harmonics.
            </p>
          </div>
          <div className="p-3.5 rounded-lg border border-slate-800 bg-slate-950">
            <span className="text-purple-400 font-bold block mb-1">State 03: LoRa Packet TX</span>
            <p className="text-slate-400 font-sans leading-relaxed text-[11px]">
              Sensor payload compressed to 18-byte packed binary struct. SX1262 transmits at +14dBm on 868.1MHz (120ms airtime).
            </p>
          </div>
          <div className="p-3.5 rounded-lg border border-slate-800 bg-slate-950">
            <span className="text-emerald-400 font-bold block mb-1">State 04: Return to Sleep</span>
            <p className="text-slate-400 font-sans leading-relaxed text-[11px]">
              Peripheral power rails gated via high-side P-channel MOSFET. Core returns to 15μA deep sleep. Solar MPPT charges battery continuously.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
