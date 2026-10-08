// Web Audio API Synthesizer for biological bee frequencies

class BeeAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private subOsc: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private lfo: OscillatorNode | null = null;
  private lfoGain: GainNode | null = null;
  private isPlaying = false;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playPreset(type: 'NORMAL' | 'SWARM' | 'QUEENLESS' | 'ALERT', volume: number = 0.25) {
    this.stop();
    this.initContext();
    if (!this.ctx) return;

    const baseFreq =
      type === 'SWARM' ? 490 :
      type === 'QUEENLESS' ? 165 :
      type === 'ALERT' ? 380 :
      225;

    // Master gain
    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(volume, this.ctx.currentTime);
    this.gainNode.connect(this.ctx.destination);

    // Primary oscillator (sawtooth for wing buzz harmonics)
    this.osc1 = this.ctx.createOscillator();
    this.osc1.type = 'sawtooth';
    this.osc1.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);

    // Secondary oscillator (slightly detuned triangle for swarm density)
    this.osc2 = this.ctx.createOscillator();
    this.osc2.type = 'triangle';
    this.osc2.frequency.setValueAtTime(baseFreq * 1.015, this.ctx.currentTime);

    // Sub oscillator
    this.subOsc = this.ctx.createOscillator();
    this.subOsc.type = 'sine';
    this.subOsc.frequency.setValueAtTime(baseFreq * 0.5, this.ctx.currentTime);

    // LFO for natural wingbeat flutter
    this.lfo = this.ctx.createOscillator();
    this.lfo.frequency.setValueAtTime(type === 'SWARM' ? 14 : 6, this.ctx.currentTime);
    this.lfoGain = this.ctx.createGain();
    this.lfoGain.gain.setValueAtTime(type === 'SWARM' ? 25 : 8, this.ctx.currentTime);

    this.lfo.connect(this.lfoGain);
    this.lfoGain.connect(this.osc1.frequency);
    this.lfoGain.connect(this.osc2.frequency);

    // Connect oscillators
    this.osc1.connect(this.gainNode);
    this.osc2.connect(this.gainNode);
    this.subOsc.connect(this.gainNode);

    // Queen piping intermittent whistle for SWARM preset
    if (type === 'SWARM') {
      const pipingOsc = this.ctx.createOscillator();
      pipingOsc.type = 'sine';
      pipingOsc.frequency.setValueAtTime(420, this.ctx.currentTime);

      const pipingGain = this.ctx.createGain();
      pipingGain.gain.setValueAtTime(0, this.ctx.currentTime);
      // Pulsing queen piping beep
      const now = this.ctx.currentTime;
      for (let t = 0; t < 60; t += 2) {
        pipingGain.gain.setValueAtTime(0, now + t);
        pipingGain.gain.linearRampToValueAtTime(0.18, now + t + 0.1);
        pipingGain.gain.linearRampToValueAtTime(0, now + t + 0.5);
      }
      pipingOsc.connect(pipingGain);
      pipingGain.connect(this.gainNode);
      pipingOsc.start();
    }

    this.osc1.start();
    this.osc2.start();
    this.subOsc.start();
    this.lfo.start();
    this.isPlaying = true;
  }

  public stop() {
    try {
      if (this.osc1) { this.osc1.stop(); this.osc1.disconnect(); }
      if (this.osc2) { this.osc2.stop(); this.osc2.disconnect(); }
      if (this.subOsc) { this.subOsc.stop(); this.subOsc.disconnect(); }
      if (this.lfo) { this.lfo.stop(); this.lfo.disconnect(); }
      if (this.gainNode) { this.gainNode.disconnect(); }
    } catch (e) {
      // Ignore cleanup error if already stopped
    }
    this.isPlaying = false;
  }

  public getStatus() {
    return this.isPlaying;
  }
}

export const beeSynth = new BeeAudioSynthesizer();

// Generate FFT spectrum curve for canvas visualization based on dominant frequency
export function generateSpectrumData(peakHz: number, samples: number = 64): number[] {
  const spectrum: number[] = [];
  const maxFreq = 1000;

  for (let i = 0; i < samples; i++) {
    const freq = (i / samples) * maxFreq;
    // Primary peak bell curve
    const distance1 = Math.abs(freq - peakHz);
    const val1 = Math.exp(-Math.pow(distance1 / 45, 2)) * 0.95;

    // Harmonic peak (2x)
    const distance2 = Math.abs(freq - (peakHz * 2));
    const val2 = Math.exp(-Math.pow(distance2 / 55, 2)) * 0.45;

    // Sub-harmonic
    const distance3 = Math.abs(freq - (peakHz * 0.5));
    const val3 = Math.exp(-Math.pow(distance3 / 40, 2)) * 0.3;

    // Ambient noise floor
    const noise = (Math.random() * 0.08) + 0.04;

    const combined = Math.min(1.0, val1 + val2 + val3 + noise);
    spectrum.push(+combined.toFixed(3));
  }

  return spectrum;
}
