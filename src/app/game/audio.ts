/**
 * Sons synthétisés via Web Audio API — aucun fichier à héberger.
 * Doit être "débloqué" (unlock) depuis un geste utilisateur (clic JOUER).
 */
export class GameAudio {
  private ctx?: AudioContext;
  muted = false;

  unlock(): void {
    if (!this.ctx) {
      const AC: typeof AudioContext | undefined =
        window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AC) this.ctx = new AC();
    }
    if (this.ctx?.state === 'suspended') void this.ctx.resume();
  }

  toggleMute(): boolean {
    this.muted = !this.muted;
    return this.muted;
  }

  private blip(freq: number, dur: number, type: OscillatorType = 'sine', gain = 0.14, when = 0): void {
    if (!this.ctx || this.muted) return;
    const t0 = this.ctx.currentTime + when;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(gain, t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g).connect(this.ctx.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.03);
  }

  good(): void {
    this.blip(660, 0.12, 'triangle', 0.12);
    this.blip(990, 0.1, 'sine', 0.08, 0.04);
  }

  bad(): void {
    this.blip(190, 0.2, 'sawtooth', 0.12);
  }

  combo(n: number): void {
    this.blip(520 + Math.min(n, 12) * 45, 0.11, 'square', 0.1);
  }

  urgence(): void {
    this.blip(880, 0.12, 'square', 0.15);
    this.blip(700, 0.14, 'square', 0.13, 0.15);
    this.blip(880, 0.12, 'square', 0.15, 0.32);
  }

  win(): void {
    [523, 659, 784, 1046].forEach((f, i) => this.blip(f, 0.18, 'triangle', 0.12, i * 0.13));
  }
}
