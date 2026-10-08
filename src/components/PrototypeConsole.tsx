import React, { useState, useEffect, useRef } from 'react';
import { HiveTelemetry, AIDiagnosisResult } from '../types/beeguard';
import { beeSynth, generateSpectrumData } from '../utils/audioSynth';

interface PrototypeConsoleProps {
  currentHive: HiveTelemetry;
  onUpdateHive: (updated: HiveTelemetry) => void;
}

export const PrototypeConsole: React.FC<PrototypeConsoleProps> = ({
  currentHive,
  onUpdateHive,
}) => {
  const [activePreset, setActivePreset] = useState<string>('swarming');
  const [isLoadingDiagnosis, setIsLoadingDiagnosis] = useState<boolean>(false);
  const [diagnosis, setDiagnosis] = useState<AIDiagnosisResult | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [pipelineStep, setPipelineStep] = useState<number>(3); // 1 to 6
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Trigger diagnosis whenever telemetry changes significantly or preset changes
  const runAIDiagnosis = async (customHive?: HiveTelemetry, presetName?: string) => {
    setIsLoadingDiagnosis(true);
    try {
      const response = await fetch('/api/gemini/diagnose-hive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hiveData: customHive || currentHive,
          anomalyPreset: presetName || activePreset,
        }),
      });
      const data = await response.json();
      if (data.analysis) {
        setDiagnosis(data.analysis);
      }
    } catch (err) {
      console.error('Failed to run AI diagnosis:', err);
    } finally {
      setIsLoadingDiagnosis(false);
    }
  };

  // Run on mount
  useEffect(() => {
    runAIDiagnosis();
    return () => {
      beeSynth.stop();
    };
  }, []);

  // Update canvas spectrum animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      const spectrum = generateSpectrumData(currentHive.acousticPeakHz, 64);
      const barWidth = width / spectrum.length;

      // Draw background frequency grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let f = 100; f <= 1000; f += 100) {
        const x = (f / 1000) * width;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Draw spectrum bars
      for (let i = 0; i < spectrum.length; i++) {
        const val = spectrum[i];
        const barHeight = val * (height - 30);
        const x = i * barWidth;
        const y = height - barHeight - 20;

        const freq = (i / spectrum.length) * 1000;

        // Color coding depending on frequency band
        let barColor = '#38bdf8'; // Sky blue baseline
        if (freq >= 450 && freq <= 550) {
          barColor = '#f59e0b'; // Amber swarm zone
        } else if (freq <= 190) {
          barColor = '#f43f5e'; // Rose distress
        }

        ctx.fillStyle = barColor;
        ctx.fillRect(x + 1, y, barWidth - 2, barHeight);
      }

      // Draw peak marker line
      const peakX = (currentHive.acousticPeakHz / 1000) * width;
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(peakX, 10);
      ctx.lineTo(peakX, height - 20);
      ctx.stroke();
      ctx.setLineDash([]);

      // Label peak text
      ctx.fillStyle = '#fbbf24';
      ctx.font = '10px JetBrains Mono, monospace';
      ctx.fillText(`Dominant Peak: ${currentHive.acousticPeakHz} Hz`, Math.max(10, Math.min(width - 150, peakX + 6)), 24);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [currentHive.acousticPeakHz]);

  // Handle Preset Scenarios
  const applyPreset = (presetKey: string) => {
    setActivePreset(presetKey);
    let updated: HiveTelemetry = { ...currentHive };

    if (presetKey === 'swarming') {
      updated = {
        ...updated,
        acousticPeakHz: 495,
        temperature: 36.4,
        humidity: 64,
        weightDelta24h: -0.1,
        foragingActivity: 75,
        status: 'HIGH',
        activeCondition: 'SWARMING',
      };
      if (isAudioPlaying) beeSynth.playPreset('SWARM');
    } else if (presetKey === 'honey') {
      updated = {
        ...updated,
        acousticPeakHz: 228,
        temperature: 34.9,
        humidity: 51,
        weightKg: 62.0,
        weightDelta24h: 2.8,
        foragingActivity: 58,
        status: 'NOMINAL',
        activeCondition: 'HONEY_READINESS',
      };
      if (isAudioPlaying) beeSynth.playPreset('NORMAL');
    } else if (presetKey === 'queen_stress') {
      updated = {
        ...updated,
        acousticPeakHz: 168,
        temperature: 33.2,
        humidity: 69,
        foragingActivity: 12,
        status: 'MODERATE',
        activeCondition: 'COLONY_STRESS',
      };
      if (isAudioPlaying) beeSynth.playPreset('QUEENLESS');
    } else if (presetKey === 'pesticide') {
      updated = {
        ...updated,
        acousticPeakHz: 190,
        vocIndex: 192,
        vibrationLevel: 1.6,
        foragingActivity: 4,
        status: 'CRITICAL',
        activeCondition: 'CHEMICAL_EXPOSURE',
      };
      if (isAudioPlaying) beeSynth.playPreset('ALERT');
    } else if (presetKey === 'fire') {
      updated = {
        ...updated,
        smokePpm: 175,
        vocIndex: 125,
        temperature: 36.1,
        acousticPeakHz: 215,
        status: 'CRITICAL',
        activeCondition: 'FIRE_RISK',
      };
      if (isAudioPlaying) beeSynth.playPreset('ALERT');
    } else if (presetKey === 'theft') {
      updated = {
        ...updated,
        vibrationLevel: 3.9,
        acousticPeakHz: 320,
        status: 'HIGH',
        activeCondition: 'THEFT_TAMPERING',
      };
      if (isAudioPlaying) beeSynth.playPreset('ALERT');
    } else {
      // Normal foraging baseline
      updated = {
        ...updated,
        acousticPeakHz: 225,
        temperature: 35.1,
        humidity: 58,
        weightDelta24h: 0.4,
        vocIndex: 25,
        smokePpm: 10,
        vibrationLevel: 0.08,
        foragingActivity: 45,
        status: 'NOMINAL',
        activeCondition: 'HEALTHY_FORAGING',
      };
      if (isAudioPlaying) beeSynth.playPreset('NORMAL');
    }

    onUpdateHive(updated);
    runAIDiagnosis(updated, presetKey);
  };

  const toggleSound = () => {
    if (isAudioPlaying) {
      beeSynth.stop();
      setIsAudioPlaying(false);
    } else {
      const pType =
        activePreset === 'swarming' ? 'SWARM' :
        activePreset === 'queen_stress' ? 'QUEENLESS' :
        activePreset === 'pesticide' || activePreset === 'fire' ? 'ALERT' :
        'NORMAL';
      beeSynth.playPreset(pType, 0.2);
      setIsAudioPlaying(true);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Step 1: The End-to-End Hardware-to-Cloud Pipeline Card */}
      <div className="border border-slate-800 bg-slate-900/70 p-6 rounded-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Hardware-to-Cloud Biological Sensing Pipeline
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              PHYSICAL HIVE → SENSORS ARRAY → ESP32-S3 EDGE FFT → LORAWAN MESH → AI ENGINE → MOBILE ALERT
            </p>
          </div>
          <div className="text-xs font-mono text-slate-400">
            Node Uplink: <span className="text-emerald-400 font-bold tabular-nums">14 dBm / SF7</span>
          </div>
        </div>

        {/* Visual Multi-Stage Flow Diagram */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-5">
          {[
            {
              step: 1,
              title: 'Colony Biology',
              detail: 'Brood thermal state, 60k bees wing kinetic vibrations',
              activeColor: 'border-amber-500/80 bg-amber-500/10 text-amber-300',
            },
            {
              step: 2,
              title: 'Sensor Matrix',
              detail: 'INMP441 I2S Mic, BME688 AI VOC, HX711 4-point scale',
              activeColor: 'border-emerald-500/80 bg-emerald-500/10 text-emerald-300',
            },
            {
              step: 3,
              title: 'ESP32-S3 Edge Node',
              detail: '512-pt fixed-point FFT, 15μA deep sleep, MPPT solar',
              activeColor: 'border-sky-500/80 bg-sky-500/10 text-sky-300',
            },
            {
              step: 4,
              title: 'LoRaWAN 868MHz',
              detail: '15km long-range transmission through forest canopy',
              activeColor: 'border-purple-500/80 bg-purple-500/10 text-purple-300',
            },
            {
              step: 5,
              title: 'Gemini AI Engine',
              detail: 'Multi-parameter bio-acoustic & environmental diagnosis',
              activeColor: 'border-amber-500/80 bg-amber-500/10 text-amber-300',
            },
            {
              step: 6,
              title: 'Farmer Mobile Alert',
              detail: 'Actionable SMS/USSD alert to beekeeper feature phone',
              activeColor: 'border-rose-500/80 bg-rose-500/10 text-rose-300',
            },
          ].map((item) => (
            <button
              key={item.step}
              onClick={() => setPipelineStep(item.step)}
              className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                pipelineStep === item.step
                  ? `${item.activeColor} shadow-md`
                  : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:border-slate-700'
              }`}
            >
              <span className="block text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Stage 0{item.step}
              </span>
              <span className="block text-xs font-semibold text-white mt-1">
                {item.title}
              </span>
              <span className="block text-[11px] text-slate-400 mt-1 leading-snug">
                {item.detail}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: One-Click Biological Stress Injector Presets */}
      <div className="border border-slate-800 bg-slate-900/70 p-6 rounded-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Simulate Environmental & Biological Stress Scenarios
            </h3>
            <p className="text-xs text-slate-400">
              Select an edge condition to test how the physical sensors, FFT acoustics, and AI inference respond:
            </p>
          </div>
          <div className="text-xs font-mono text-amber-400">
            Current Node: <span className="font-bold text-white">{currentHive.id} ({currentHive.name})</span>
          </div>
        </div>

        {/* Preset Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {[
            { id: 'swarming', label: '🐝 Swarming Imminent', desc: '495 Hz harmonic surge · 36.4°C brood fever' },
            { id: 'honey', label: '🍯 Honey Flow Peak', desc: '+2.8 kg weight delta · 51% humidity capping' },
            { id: 'queen_stress', label: '👑 Queen Loss Stress', desc: '168 Hz mournful roar · 33.2°C chilled brood' },
            { id: 'pesticide', label: '☠️ Agrochemical Drift', desc: 'VOC index 192 · Tremors & drop in foragers' },
            { id: 'fire', label: '🔥 Wildfire Smoke Risk', desc: '175 ppm smoke particulate · Solar irradiance dip' },
            { id: 'theft', label: '🚨 Night Hive Tampering', desc: '3.9G accelerometer shock · Hive tilted' },
            { id: 'normal', label: '🌿 Nominal Foraging', desc: '225 Hz worker buzz · 35.1°C brood core' },
          ].map((preset) => (
            <button
              key={preset.id}
              onClick={() => applyPreset(preset.id)}
              className={`p-3 text-left rounded-lg border transition-all cursor-pointer ${
                activePreset === preset.id
                  ? 'border-amber-400 bg-amber-400/10 text-white shadow-sm'
                  : 'border-slate-800 bg-slate-900/40 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40'
              }`}
            >
              <span className="block text-xs font-semibold">{preset.label}</span>
              <span className="block text-[11px] text-slate-400 mt-1 leading-tight">{preset.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Step 3: Dual Column Console: Live Telemetry Controls + Acoustic FFT Spectrogram */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Fine-Grained Sensor Calibration Sliders (lg:col-span-6) */}
        <div className="lg:col-span-6 border border-slate-800 bg-slate-900/70 p-6 rounded-xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-white tracking-tight">
              Node Sensor Telemetry Calibration
            </h3>
            <span className="text-xs font-mono text-slate-400">
              ESP32-S3 ADC & I2S
            </span>
          </div>

          <div className="space-y-4">
            {/* Brood Temperature */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-slate-300">Brood Core Temperature</span>
                <span className="text-amber-400 font-bold tabular-nums">{currentHive.temperature.toFixed(1)} °C</span>
              </div>
              <input
                type="range"
                min="30"
                max="40"
                step="0.1"
                value={currentHive.temperature}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  onUpdateHive({ ...currentHive, temperature: val });
                }}
                className="w-full accent-amber-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-0.5">
                <span>30.0°C (Chilled)</span>
                <span>Optimal Brood (34.5 - 35.5°C)</span>
                <span>40.0°C (Overheating)</span>
              </div>
            </div>

            {/* Acoustic Frequency */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-slate-300">Acoustic Dominant Peak (INMP441 FFT)</span>
                <span className="text-amber-400 font-bold tabular-nums">{currentHive.acousticPeakHz} Hz</span>
              </div>
              <input
                type="range"
                min="120"
                max="650"
                step="5"
                value={currentHive.acousticPeakHz}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  onUpdateHive({ ...currentHive, acousticPeakHz: val });
                }}
                className="w-full accent-amber-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-0.5">
                <span>150Hz (Queenless)</span>
                <span>225Hz (Worker Drone)</span>
                <span>490Hz (Swarm Piping)</span>
              </div>
            </div>

            {/* Relative Humidity */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-slate-300">Internal Relative Humidity</span>
                <span className="text-sky-400 font-bold tabular-nums">{currentHive.humidity} %</span>
              </div>
              <input
                type="range"
                min="35"
                max="90"
                step="1"
                value={currentHive.humidity}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  onUpdateHive({ ...currentHive, humidity: val });
                }}
                className="w-full accent-sky-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-0.5">
                <span>45% (Capping range)</span>
                <span>55-65% (Optimal)</span>
                <span>85% (Condensation risk)</span>
              </div>
            </div>

            {/* Colony Weight & Delta */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-slate-300">Weight</span>
                  <span className="text-emerald-400 font-bold tabular-nums">{currentHive.weightKg} kg</span>
                </div>
                <input
                  type="range"
                  min="25"
                  max="80"
                  step="0.5"
                  value={currentHive.weightKg}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    onUpdateHive({ ...currentHive, weightKg: val });
                  }}
                  className="w-full accent-emerald-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-slate-300">24h Delta</span>
                  <span className="text-emerald-400 font-bold tabular-nums">
                    {currentHive.weightDelta24h > 0 ? '+' : ''}{currentHive.weightDelta24h} kg
                  </span>
                </div>
                <input
                  type="range"
                  min="-3"
                  max="4"
                  step="0.1"
                  value={currentHive.weightDelta24h}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    onUpdateHive({ ...currentHive, weightDelta24h: val });
                  }}
                  className="w-full accent-emerald-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
              </div>
            </div>

            {/* Environmental Gas (VOC & Smoke) */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-slate-300">VOC / Pesticide Index</span>
                  <span className="text-rose-400 font-bold tabular-nums">{currentHive.vocIndex}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="300"
                  step="5"
                  value={currentHive.vocIndex}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    onUpdateHive({ ...currentHive, vocIndex: val });
                  }}
                  className="w-full accent-rose-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
                <span className="text-[10px] font-mono text-slate-400 block mt-0.5">&gt;150 indicates toxic drift</span>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-slate-300">Smoke Density (MQ-2)</span>
                  <span className="text-orange-400 font-bold tabular-nums">{currentHive.smokePpm} ppm</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="250"
                  step="5"
                  value={currentHive.smokePpm}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    onUpdateHive({ ...currentHive, smokePpm: val });
                  }}
                  className="w-full accent-orange-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
                <span className="text-[10px] font-mono text-slate-400 block mt-0.5">&gt;100 indicates wildfire risk</span>
              </div>
            </div>

            {/* Manual Run Inference Button */}
            <div className="pt-2">
              <button
                onClick={() => runAIDiagnosis()}
                disabled={isLoadingDiagnosis}
                className="w-full py-2.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
              >
                {isLoadingDiagnosis ? 'Computing Biological Diagnostics...' : 'Re-Evaluate AI Diagnosis with Current Sliders'}
              </button>
            </div>

          </div>
        </div>

        {/* Right Column: Audio FFT Spectrogram + Sound Synth (lg:col-span-6) */}
        <div className="lg:col-span-6 border border-slate-800 bg-slate-900/70 p-6 rounded-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Live Acoustic Spectrogram (100 Hz – 1000 Hz)
              </h3>
              <p className="text-xs text-slate-400">
                On-node 24-bit MEMS audio Fast Fourier Transform (FFT) analysis
              </p>
            </div>

            {/* Audio Synth Button */}
            <button
              onClick={toggleSound}
              className={`px-3 py-1.5 text-xs font-mono font-medium rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                isAudioPlaying
                  ? 'border-rose-500 bg-rose-500/20 text-rose-300 animate-pulse'
                  : 'border-slate-700 bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <span>{isAudioPlaying ? '⏹ Mute Synth' : '🔊 Listen to Colony'}</span>
            </button>
          </div>

          {/* Canvas Spectrum Display */}
          <div className="relative bg-slate-950 rounded-lg p-2 border border-slate-800 overflow-hidden">
            <canvas
              ref={canvasRef}
              width={520}
              height={180}
              className="w-full h-44 block"
            />
            {/* Frequency Axis Marker Overlay */}
            <div className="flex justify-between text-[10px] font-mono text-slate-400 px-2 pt-1 border-t border-slate-900">
              <span>100 Hz</span>
              <span>250 Hz</span>
              <span>450 Hz</span>
              <span>700 Hz</span>
              <span>1000 Hz</span>
            </div>
          </div>

          {/* Acoustic Diagnostic Band Guide */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px] font-mono">
            <div className="border border-slate-800 bg-slate-900/50 p-2 rounded">
              <span className="text-rose-400 font-bold block">150–190 Hz</span>
              <span className="text-slate-400">Queenless Roar</span>
            </div>
            <div className="border border-slate-800 bg-slate-900/50 p-2 rounded">
              <span className="text-sky-400 font-bold block">200–260 Hz</span>
              <span className="text-slate-400">Nominal Worker Buzz</span>
            </div>
            <div className="border border-slate-800 bg-slate-900/50 p-2 rounded">
              <span className="text-amber-400 font-bold block">350–420 Hz</span>
              <span className="text-slate-400">Virgin Queen Piping</span>
            </div>
            <div className="border border-slate-800 bg-slate-900/50 p-2 rounded">
              <span className="text-amber-300 font-bold block">450–550 Hz</span>
              <span className="text-slate-400">Pre-Swarm Excitation</span>
            </div>
          </div>

          {/* Energy & Power Telemetry Strip */}
          <div className="border border-slate-800 bg-slate-950/80 p-3.5 rounded-lg">
            <div className="flex items-center justify-between text-xs font-mono text-slate-300 pb-2 border-b border-slate-850">
              <span className="text-amber-400 font-semibold">Autonomous Energy Harvester</span>
              <span className="text-emerald-400">Battery: {currentHive.batteryPercent}% (LiFePO4)</span>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-2 text-xs font-mono">
              <div>
                <span className="text-slate-400 block text-[10px]">SOLAR HARVEST</span>
                <span className="text-slate-200 font-bold tabular-nums">{currentHive.solarVoltage} V / 2W</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">DEEP SLEEP DURATION</span>
                <span className="text-sky-400 font-bold tabular-nums">15 mins @ 15μA</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">AUTONOMY RUNWAY</span>
                <span className="text-emerald-400 font-bold tabular-nums">165+ Days (No Sun)</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Step 4: AI Diagnostic Inference & Simulated Mobile Alert Phone Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Detailed Biological Diagnosis Card (lg:col-span-7) */}
        <div className="lg:col-span-7 border border-slate-800 bg-slate-900/80 p-6 rounded-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider block">
                GEMINI AI BIO-ACOUSTIC INFERENCE
              </span>
              <h3 className="text-lg font-bold text-white tracking-tight mt-0.5">
                {diagnosis?.conditionTitle || 'Analyzing Colony Health...'}
              </h3>
            </div>

            {diagnosis && (
              <div className="text-right">
                <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded ${
                  diagnosis.riskLevel === 'CRITICAL' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' :
                  diagnosis.riskLevel === 'HIGH' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' :
                  diagnosis.riskLevel === 'MODERATE' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40' :
                  'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                }`}>
                  {diagnosis.riskLevel} RISK
                </span>
                <span className="block text-[11px] font-mono text-slate-400 mt-1">
                  Confidence: {diagnosis.confidenceScore}%
                </span>
              </div>
            )}
          </div>

          {diagnosis ? (
            <div className="space-y-4 text-sm text-slate-300">
              
              {/* Departure window callout */}
              <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-lg flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">Action Window for Beekeeper:</span>
                <span className="text-sm font-mono font-bold text-amber-400">
                  {diagnosis.departureOrActionWindow}
                </span>
              </div>

              {/* Acoustic & Environmental Breakdown */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase text-slate-400">Acoustic & Vibration Analysis:</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-sans bg-slate-950/40 p-3 rounded border border-slate-850">
                  {diagnosis.acousticDiagnosis}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase text-slate-400">Environmental Transduction Context:</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-sans bg-slate-950/40 p-3 rounded border border-slate-850">
                  {diagnosis.environmentalContext}
                </p>
              </div>

              {/* Action Protocol Steps */}
              <div className="space-y-2 pt-1">
                <h4 className="text-xs font-mono uppercase text-amber-400 font-semibold">Recommended Beekeeper Action Protocol:</h4>
                <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-200">
                  {diagnosis.beekeeperProtocol.map((step, idx) => (
                    <li key={idx} className="leading-relaxed pl-1">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

            </div>
          ) : (
            <div className="py-8 text-center text-slate-400 text-xs font-mono">
              Running bio-telemetry inference engine...
            </div>
          )}
        </div>

        {/* Right: Simulated Beekeeper Handset (lg:col-span-5) */}
        <div className="lg:col-span-5 border border-slate-800 bg-slate-900/80 p-6 rounded-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-white tracking-tight">
              Farmer Mobile Alert Simulator
            </h3>
            <span className="text-xs font-mono text-slate-400">
              SMS / USSD / Telegram
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Even in remote rural areas with basic 2G feature phones, ABI-BEEGUARD routes instant high-priority text alerts:
          </p>

          {/* Smartphone / Feature Phone Simulated Body */}
          <div className="bg-slate-950 border-2 border-slate-700 rounded-2xl p-4 shadow-xl max-w-sm mx-auto">
            {/* Phone Top Notch */}
            <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 pb-3 border-b border-slate-850">
              <span>MTN / Airtel / Safaricom</span>
              <span>10:42 AM</span>
              <span>LTE 84%</span>
            </div>

            {/* Inbound SMS Message Bubble */}
            <div className="my-4 space-y-2">
              <span className="text-[10px] font-mono text-amber-400 block">
                FROM: ABI-BEEGUARD SENSOR NET
              </span>
              <div className="bg-slate-800 border border-slate-700 p-3.5 rounded-xl rounded-tl-none text-xs font-mono text-amber-200 leading-relaxed shadow-sm">
                {diagnosis?.smsAlertPayload || `🚨 ABI-BEEGUARD [${currentHive.name}]: SWARM ALERT! 492Hz hum surge. Estimated departure in <3hrs. Split colony immediately.`}
              </div>
              <span className="text-[9px] font-mono text-slate-400 block text-right">
                Delivered via LoRaWAN Gateway · 0.4s latency
              </span>
            </div>

            {/* Quick Action Interactive Buttons on Phone */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-850">
              <button
                onClick={() => alert(`Action Dispatched: Alert acknowledged by beekeeper for ${currentHive.id}. Team notified.`)}
                className="py-2 text-[11px] font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors cursor-pointer"
              >
                Acknowledge Alert
              </button>
              <button
                onClick={() => alert(`Inspection logged: Drone/Split inspection crew dispatched to sector ${currentHive.sector}.`)}
                className="py-2 text-[11px] font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer border border-slate-700"
              >
                Dispatch Apiarist
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
