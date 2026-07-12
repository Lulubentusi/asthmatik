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
  private whyText?: Phaser.GameObjects.Text;

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
    this.showLoading();
    for (const it of ITEMS) {
      this.load.image(it.slug, `cards/${it.slug}.webp`); // variante garçon
      this.load.image(`${it.slug}-f`, `cards/${it.slug}-f.webp`); // variante fille
    }
  }

  /** Barre de progression pendant le chargement des cartes — évite l'écran noir sur connexion lente. */
  private showLoading(): void {
    const cx = this.scale.width / 2;
    const cy = this.scale.height / 2;
    const barW = 250;
    const barH = 16;
    const radius = barH / 2;

    const label = this.add
      .text(cx, cy - 36, 'Chargement…', { fontFamily: 'Arial', fontSize: '20px', fontStyle: 'bold', color: '#1d3557' })
      .setOrigin(0.5);
    const track = this.add.graphics();
    track.fillStyle(0xffffff, 0.75);
    track.fillRoundedRect(cx - barW / 2, cy - barH / 2, barW, barH, radius);
    const fill = this.add.graphics();

    const onProgress = (p: number) => {
      fill.clear();
      fill.fillStyle(GREEN, 1);
      // largeur mini = hauteur : en dessous, le rectangle arrondi dégénère
      fill.fillRoundedRect(cx - barW / 2, cy - barH / 2, Math.max(barH, barW * p), barH, radius);
    };
    this.load.on('progress', onProgress);
    this.load.once('complete', () => {
      this.load.off('progress', onProgress);
      label.destroy();
      track.destroy();
      fill.destroy();
    });
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
    // cadence un peu plus espacée : les cartes restent plus longtemps à l'écran
    const base = this.boss ? 380 : 1100;
    const delay = Math.max(this.boss ? 300 : 450, base - this.score * 16);
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
    const x = Phaser.Math.Between(84, this.scale.width - 84);
    const card = this.makeCard(item, x, -120);

    // plancher haut : laisser le temps de lire l'étiquette
    const duration = Math.max(3000, 4800 - this.score * 50);
    const tween = this.tweens.add({
      targets: card,
      y: this.scale.height + 130,
      duration,
      ease: 'Sine.easeIn',
      onComplete: () => {
        this.combo = 0; // raté : casse le combo (pas le score)
        this.sd.onCombo(0);
        card.destroy();
      },
    });

    card.once('pointerdown', () => {
      tween.stop();
      this.onTap(item, card);
    });
  }

  /** Carte cliquable : icône sur cadre autocollant blanc + étiquette en pastille, groupées dans un container. */
  private makeCard(item: GameItem, x: number, y: number): Phaser.GameObjects.Container {
    // variante garçon ou fille au hasard — même carte, même comportement de jeu
    const skin = Math.random() < 0.5 ? item.slug : `${item.slug}-f`;

    // cadre façon autocollant : ombre portée douce + bordure blanche épaisse
    const plate = this.add.graphics();
    plate.fillStyle(0x1d3557, 0.18);
    plate.fillRoundedRect(-70, -64, 140, 140, 22);
    plate.fillStyle(0xffffff, 1);
    plate.fillRoundedRect(-70, -70, 140, 140, 22);

    const icon = this.add.image(0, 0, skin).setDisplaySize(128, 128);

    const label = this.add
      .text(0, 70, item.label, {
        fontFamily: 'Arial',
        fontSize: '16px',
        fontStyle: 'bold',
        color: '#22304d',
        align: 'center',
        wordWrap: { width: 150 },
      })
      .setOrigin(0.5, 0);

    const bg = this.add.graphics();
    bg.fillStyle(0x1d3557, 0.15);
    bg.fillRoundedRect(-label.width / 2 - 8, 68, label.width + 16, label.height + 10, 10);
    bg.fillStyle(0xffffff, 0.95);
    bg.fillRoundedRect(-label.width / 2 - 8, 65, label.width + 16, label.height + 10, 10);

    const card = this.add.container(x, y, [plate, icon, bg, label]);
    const w = Math.max(144, label.width + 16);
    const top = -72;
    const bottom = 78 + label.height;
    card.setInteractive({
      hitArea: new Phaser.Geom.Rectangle(-w / 2, top, w, bottom - top),
      hitAreaCallback: Phaser.Geom.Rectangle.Contains,
      useHandCursor: true,
    });
    return card;
  }

  // ---- interaction ----
  private onTap(item: GameItem, card: Phaser.GameObjects.Container): void {
    if (this.finished) {
      card.destroy();
      return;
    }
    const x = card.x;
    const y = card.y;
    const type = item.type;

    if (type === 'good' || type === 'gravity') {
      this.score += 1;
      this.combo += 1;
      this.goodTaps += 1;
      this.bestCombo = Math.max(this.bestCombo, this.combo);
      this.tweens.add({ targets: card, scale: 1.4, alpha: 0, duration: 150, onComplete: () => card.destroy() });

      if (type === 'gravity') {
        this.styleScore += 3;
        this.pop(x, y, '+1', '#ff9410');
        this.burst(x, y, ORANGE, 16);
        this.triggerUrgence();
      } else {
        this.styleScore += 1;
        this.pop(x, y, '+1', '#1f9d55');
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
      this.pop(x, y, '-1', '#e04545');
      this.burst(x, y, RED, 8);
      this.showWhy(item);
      this.audio.bad();
      this.buzz([30, 40, 30]);
      this.cameras.main.shake(120, 0.006);
      card.destroy();
      this.sd.onCombo(0);
      this.sd.onScore(this.score);
    }
  }

  /** Feedback pédagogique : explique pourquoi la carte tapée n'était pas une bonne cible. */
  private showWhy(item: GameItem): void {
    const msg = item.why ?? `« ${item.label} » n'est pas un symptôme d'asthme`;
    this.whyText?.destroy(); // remplace un éventuel message encore affiché
    const t = this.add
      .text(this.scale.width / 2, this.scale.height - 110, msg, {
        fontFamily: 'Arial',
        fontSize: '17px',
        fontStyle: 'bold',
        color: '#ffffff',
        align: 'center',
        backgroundColor: '#a03030',
        padding: { x: 14, y: 9 },
        wordWrap: { width: this.scale.width - 70 },
      })
      .setOrigin(0.5)
      .setDepth(1000)
      .setAlpha(0);
    this.whyText = t;
    this.tweens.add({ targets: t, alpha: 1, y: t.y - 8, duration: 150 });
    this.tweens.add({ targets: t, alpha: 0, delay: 1500, duration: 350, onComplete: () => t.destroy() });
  }

  private onComboMilestone(): void {
    this.audio.combo(this.combo);
    this.buzz([15, 30, 15]);
    this.hitStop(90);
    this.pop(this.scale.width / 2, 210, `COMBO ×${this.combo}`, '#ff9410');
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
      this.banner(`VAGUE ${wave + 1}`, '#2b78c2');
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
      .setStroke('#ffffff', 6) // contour blanc façon autocollant, lisible sur le fond clair
      .setOrigin(0.5);
    this.tweens.add({ targets: t, y: y - 54, alpha: 0, duration: 640, onComplete: () => t.destroy() });
  }

  private banner(text: string, color = '#ff9410'): void {
    const b = this.add
      .text(this.scale.width / 2, 150, text, { fontFamily: 'Arial', fontSize: '30px', fontStyle: 'bold', color })
      .setStroke('#ffffff', 8)
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
