// Web Audio API ambient daylight electronic sound generator
class AmbientAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.gainNode = null;
    this.oscillators = [];
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    this.ctx = new AudioContext();

    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(0, this.ctx.currentTime);

    // Warm daylight low-pass filter
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(420, this.ctx.currentTime);
    this.filter.Q.setValueAtTime(1.2, this.ctx.currentTime);

    this.gainNode.connect(this.filter);
    this.filter.connect(this.ctx.destination);
  }

  start() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) return;
    this.isPlaying = true;

    // Harmonic daylight chord frequencies (Eb major 9 / Ab add9 ambient pad)
    const freqs = [155.56, 196.00, 233.08, 311.13, 466.16];

    this.oscillators = freqs.map((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq + (Math.random() * 0.4 - 0.2), this.ctx.currentTime);

      // Subtle slow detune vibrato
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.15 + idx * 0.05, this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(0.8, this.ctx.currentTime);
      lfo.connect(osc.frequency);
      lfo.start();

      oscGain.gain.setValueAtTime(0.04 / (idx + 1), this.ctx.currentTime);
      osc.connect(oscGain);
      oscGain.connect(this.gainNode);
      osc.start();

      return { osc, lfo };
    });

    // Fade in gently over 3.5s
    this.gainNode.gain.setTargetAtTime(0.28, this.ctx.currentTime, 1.8);
  }

  stop() {
    if (!this.isPlaying || !this.ctx) return;
    this.gainNode.gain.setTargetAtTime(0.0001, this.ctx.currentTime, 0.8);
    setTimeout(() => {
      this.oscillators.forEach(({ osc, lfo }) => {
        try {
          osc.stop();
          lfo.stop();
          osc.disconnect();
          lfo.disconnect();
        } catch (e) {}
      });
      this.oscillators = [];
      this.isPlaying = false;
    }, 1200);
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }
}

export const ambientSound = new AmbientAudioEngine();
