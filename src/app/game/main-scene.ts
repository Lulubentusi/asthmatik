import Phaser from 'phaser';
import { ITEMS, ITEMS_BY_TYPE, GameItem, ItemType } from './items';
import { GOAL } from './config';
import { GameAudio } from './audio';

export interface WinInfo {
  score: number;
  timeMs: number;
  bestCombo: number;
  styleScore: number;
  goodTaps: number;
  badTaps: number;
}

export interface SceneData {
  goal: number;
  onScore: (score: number) => void;
  onCombo: (combo: number) => void;
  onWin: (info: WinInfo) => void;
  audio: GameAudio;
}

const GREEN = 0x3ad07a;
const ORANGE = 0xffb020;
const RED = 0xff5d5d;

/** Boucle « objets qui tombent » — Phase 2 (juice, combos, vagues, URGENCE). */
export class MainScene extends Phaser.Scene {
  private sd!: SceneData;
  private audio!: GameAudio;
  private goal = GOAL;

  private score = 0;
  private combo = 0;
  private bestCombo = 0;
  private styleScore = 0;
  private goodTaps = 0;
  private badTaps = 0;
  private startedAt = 0;
  private finished = false;

  private lastWave = 0;
  private boss = false;
  private spawnTimer?: Phaser.Time.TimerEvent;

  constructor() {
    super('main');
  }

  init(data: SceneData): void {
    this.sd = data;
    this.audio = data.audio;
    this.goal = data.goal;
    this.score = 0;
    this.combo = 0;
    this.bestCombo = 0;
    this.styleScore = 0;
    this.goodTaps = 0;
    this.badTaps = 0;
    this.lastWave = 0;
    this.boss = false;
    this.finished = false;
  }

  preload(): void {
    for (const it of ITEMS) {
      this.load.svg(it.slug, `icons/${it.slug}.svg`, { width: 104, height: 104 });
    }
  }

  create(): void {
    // petite texture ronde pour les particules
    const g = this.add.graphics();
    g.fillStyle(0xffffff, 1).fillCircle(5, 5, 5);
    g.generateTexture('spark', 10, 10);
    g.destroy();

    this.startedAt = this.time.now;
    this.scheduleSpawn();
  }

  // ---- spawn & difficulté ----
  private scheduleSpawn(): void {
    const base = this.boss ? 320 : 950;
    const delay = Math.max(this.boss ? 240 : 380, base - this.score * 16);
    this.spawnTimer = this.time.addEvent({
      delay,
      callback: () => {
        this.spawnOne();
        if (!this.finished) this.scheduleSpawn();
      },
    });
  }

  private pickItem(): GameItem {
    const r = Math.random();
    let type: ItemType;
    if (r < 0.42) type = 'avoid';
    else if (r < 0.49) type = 'gravity'; // ~7% : les signes de gravité restent rares
    else type = 'good';
    return Phaser.Utils.Array.GetRandom(ITEMS_BY_TYPE[type]);
  }

  private spawnOne(): void {
    if (this.finished) return;
    const item = this.pickItem();
    const x = Phaser.Math.Between(58, this.scale.width - 58);
    const sprite = this.add.image(x, -60, item.slug).setInteractive({ useHandCursor: true });

    const duration = Math.max(2200, 4300 - this.score * 55);
    const tween = this.tweens.add({
      targets: sprite,
      y: this.scale.height + 70,
      duration,
      ease: 'Sine.easeIn',
      onComplete: () => {
        this.combo = 0; // raté : casse le combo (pas le score)
        this.sd.onCombo(0);
        sprite.destroy();
      },
    });

    sprite.once('pointerdown', () => {
      tween.stop();
      this.onTap(item.type, sprite);
    });
  }

  // ---- interaction ----
  private onTap(type: ItemType, sprite: Phaser.GameObjects.Image): void {
    if (this.finished) {
      sprite.destroy();
      return;
    }
    const x = sprite.x;
    const y = sprite.y;

    if (type === 'good' || type === 'gravity') {
      this.score += 1;
      this.combo += 1;
      this.goodTaps += 1;
      this.bestCombo = Math.max(this.bestCombo, this.combo);
      this.tweens.add({ targets: sprite, scale: 1.4, alpha: 0, duration: 150, onComplete: () => sprite.destroy() });

      if (type === 'gravity') {
        this.styleScore += 3;
        this.pop(x, y, '+1', '#ffcf5a');
        this.burst(x, y, ORANGE, 16);
        this.triggerUrgence();
      } else {
        this.styleScore += 1;
        this.pop(x, y, '+1', '#7dff9e');
        this.burst(x, y, GREEN, 12);
        this.audio.good();
        this.buzz(22);
      }

      this.sd.onCombo(this.combo);
      if (this.combo >= 2 && this.combo % 5 === 0) this.onComboMilestone();

      this.checkWaves();
      this.sd.onScore(this.score);
      if (this.score >= this.goal) this.finish();
    } else {
      this.score = Math.max(0, this.score - 1);
      this.combo = 0;
      this.badTaps += 1;
      this.pop(x, y, '-1', '#ff8a8a');
      this.burst(x, y, RED, 8);
      this.audio.bad();
      this.buzz([30, 40, 30]);
      this.cameras.main.shake(120, 0.006);
      sprite.destroy();
      this.sd.onCombo(0);
      this.sd.onScore(this.score);
    }
  }

  private onComboMilestone(): void {
    this.audio.combo(this.combo);
    this.buzz([15, 30, 15]);
    this.hitStop(90);
    this.pop(this.scale.width / 2, 210, `COMBO ×${this.combo}`, '#ffd447');
  }

  // ---- vagues / boss ----
  private checkWaves(): void {
    if (!this.boss && this.score >= this.goal - 5) {
      this.boss = true;
      this.banner('DERNIÈRE VAGUE 🔥', '#ff6b6b');
      for (let i = 1; i <= 4; i++) this.time.delayedCall(i * 170, () => this.spawnOne());
      return;
    }
    const wave = Math.floor(this.score / 10);
    if (wave > this.lastWave && this.score < this.goal - 5) {
      this.lastWave = wave;
      this.banner(`VAGUE ${wave + 1}`, '#9fe3ff');
    }
  }

  // ---- URGENCE ----
  private triggerUrgence(): void {
    this.audio.urgence();
    this.buzz([40, 40, 90]);
    this.hitStop(110);

    const flash = this.add.rectangle(
      this.scale.width / 2,
      this.scale.height / 2,
      this.scale.width,
      this.scale.height,
      0xe23b3b,
      0.24,
    );
    this.tweens.add({ targets: flash, alpha: 0, duration: 340, onComplete: () => flash.destroy() });
    this.cameras.main.shake(180, 0.005);

    const b = this.add
      .text(this.scale.width / 2, this.scale.height / 2, '🚨 URGENCE\nspray + appelle le 15', {
        fontFamily: 'Arial',
        fontSize: '26px',
        fontStyle: 'bold',
        color: '#ffffff',
        align: 'center',
        backgroundColor: '#c62828',
        padding: { x: 16, y: 12 },
      })
      .setOrigin(0.5)
      .setAlpha(0);
    this.tweens.add({ targets: b, alpha: 1, duration: 120 });
    this.tweens.add({ targets: b, alpha: 0, delay: 850, duration: 400, onComplete: () => b.destroy() });
  }

  // ---- helpers visuels / haptique ----
  private burst(x: number, y: number, color: number, qty: number): void {
    const p = this.add.particles(x, y, 'spark', {
      speed: { min: 60, max: 240 },
      angle: { min: 0, max: 360 },
      lifespan: 460,
      scale: { start: 0.9, end: 0 },
      tint: color,
      emitting: false,
    });
    p.explode(qty, x, y);
    this.time.delayedCall(620, () => p.destroy());
  }

  private pop(x: number, y: number, txt: string, color: string): void {
    const t = this.add
      .text(x, y, txt, { fontFamily: 'Arial', fontSize: '32px', fontStyle: 'bold', color })
      .setOrigin(0.5);
    this.tweens.add({ targets: t, y: y - 54, alpha: 0, duration: 640, onComplete: () => t.destroy() });
  }

  private banner(text: string, color = '#ffd447'): void {
    const b = this.add
      .text(this.scale.width / 2, 150, text, { fontFamily: 'Arial', fontSize: '30px', fontStyle: 'bold', color })
      .setOrigin(0.5)
      .setAlpha(0);
    this.tweens.add({ targets: b, alpha: 1, scale: { from: 0.6, to: 1 }, duration: 220 });
    this.tweens.add({ targets: b, alpha: 0, delay: 900, duration: 420, onComplete: () => b.destroy() });
  }

  /** Freeze-frame : ralentit brièvement les tweens (mouvement) pour un effet d'impact. */
  private hitStop(ms = 100): void {
    this.tweens.timeScale = 0.02;
    window.setTimeout(() => {
      if (this.tweens) this.tweens.timeScale = 1;
    }, ms);
  }

  private buzz(pattern: number | number[]): void {
    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
      try {
        navigator.vibrate(pattern);
      } catch {
        /* ignore */
      }
    }
  }

  private finish(): void {
    this.finished = true;
    this.spawnTimer?.remove();
    this.audio.win();
    this.sd.onWin({
      score: this.score,
      timeMs: this.time.now - this.startedAt,
      bestCombo: this.bestCombo,
      styleScore: this.styleScore,
      goodTaps: this.goodTaps,
      badTaps: this.badTaps,
    });
  }
}
