/**
 * Lightweight browser Web Audio synthesizer for ceremonial and chat feedback.
 * Safe, zero external dependencies, fails silently if audio is blocked or restricted in iframe.
 */
class ChatSoundEngine {
  private ctx: AudioContext | null = null;
  private muted: boolean = false;
  private listeners: Set<(muted: boolean) => void> = new Set();

  constructor() {
    // Check localStorage if available
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        this.muted = window.localStorage.getItem('vadhuvidhi_muted') === 'true';
      }
    } catch {
      // Ignore
    }
  }

  isMuted(): boolean {
    return this.muted;
  }

  setMuted(val: boolean) {
    this.muted = val;
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('vadhuvidhi_muted', String(val));
      }
    } catch {
      // Ignore
    }
    if (val) {
      this.silence();
    }
    this.listeners.forEach((listener) => listener(val));
  }

  toggleMute(): boolean {
    const next = !this.muted;
    this.setMuted(next);
    return next;
  }

  subscribe(listener: (muted: boolean) => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private getContext(): AudioContext | null {
    if (this.muted) return null;
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  playPop() {
    if (this.muted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(580, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(840, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // Ignore audio restrictions
    }
  }

  playJathakam() {
    if (this.muted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.09);
        gain.gain.setValueAtTime(0.07, ctx.currentTime + i * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.09 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.09);
        osc.stop(ctx.currentTime + i * 0.09 + 0.25);
      });
    } catch {
      // Ignore
    }
  }

  playCelebration() {
    if (this.muted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      // Festive triad fanfares
      [440, 554.37, 659.25, 880].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.07);
        gain.gain.setValueAtTime(0.05, ctx.currentTime + i * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.07 + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.07);
        osc.stop(ctx.currentTime + i * 0.07 + 0.2);
      });
    } catch {
      // Ignore
    }
  }

  playFreeze() {
    if (this.muted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(260, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + 0.4);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch {
      // Ignore
    }
  }

  silence() {
    try {
      if (this.ctx && this.ctx.state !== 'closed') {
        this.ctx.suspend().catch(() => {});
      }
    } catch {
      // Ignore
    }
  }
}

export const chatSound = new ChatSoundEngine();
