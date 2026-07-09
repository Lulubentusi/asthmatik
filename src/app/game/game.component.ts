import { Component, ElementRef, Input, NgZone, OnDestroy, ViewChild } from '@angular/core';
import Phaser from 'phaser';
import { MainScene, WinInfo, SceneData } from './main-scene';
import { GOAL, digitFor, groupOf, computeRank, Rank } from './config';
import { GameAudio } from './audio';

@Component({
  selector: 'app-game',
  standalone: true,
  template: `
    <div #wrap class="wrap">
      <div #host class="host"></div>

      @if (started && !won) {
        <div class="hud">
          <button class="icon-btn mute" (click)="toggleMute()" aria-label="son">{{ muted ? '🔇' : '🔊' }}</button>
          <button class="icon-btn restart" (click)="replay()" aria-label="recommencer">↺</button>
          <div class="bar"><span [style.width.%]="(score / goal) * 100"></span></div>
          <div class="score">{{ score }} / {{ goal }}</div>
          @if (combo >= 2) {
            <div class="combo">Combo ×{{ combo }}</div>
          }
        </div>
      }

      @if (!started) {
        <div class="overlay start">
          <h1>🫁 Asthmatik</h1>
          <p class="tag">Tape les <b>symptômes de l'asthme</b>.<br />Évite le <b>positif</b> et le <b>pas en lien</b>.</p>
          <p class="goal">Objectif <b>{{ goal }} points</b> · +1 bonne cible, −1 mauvaise</p>
          <button class="cta" (click)="start()">JOUER</button>
        </div>
      }

      @if (won) {
        <div class="overlay win">
          <div class="rank" [attr.data-rank]="rank">{{ rank }}</div>
          <h2>Bravo !</h2>
          <p class="sub">Ton chiffre pour le cadena</p>
          <div class="digit">{{ digit ?? '?' }}</div>
          <p class="group">Groupe {{ group }} · joueur {{ playerIndex }} · équipe {{ team }}</p>
          <p class="meta">⏱ {{ timeSec }}s · combo max ×{{ bestCombo }} · {{ badTaps }} erreur(s)</p>
          <p class="tip">Donne ce chiffre à ton équipe pour ouvrir le cadena !</p>
          <button class="cta ghost" (click)="replay()">Rejouer</button>
        </div>
      }
    </div>
  `,
  styles: [
    `
      :host { display: block; }
      .wrap {
        position: fixed; inset: 0; overflow: hidden; touch-action: manipulation;
        background: radial-gradient(120% 90% at 50% 0%, #1a2140 0%, #0f1220 55%, #080a14 100%);
      }
      .host { position: absolute; inset: 0; }

      /* ---- overlays ---- */
      .overlay {
        position: absolute; inset: 0; display: flex; flex-direction: column; gap: 14px;
        align-items: center; justify-content: center; text-align: center; padding: 24px;
        color: #fff; font-family: 'Segoe UI', system-ui, sans-serif;
        background: rgba(8, 10, 20, 0.55); backdrop-filter: blur(3px); animation: fade 0.25s ease;
      }
      .overlay.win { background: rgba(8, 10, 20, 0.88); backdrop-filter: blur(6px); }
      @keyframes fade { from { opacity: 0; } to { opacity: 1; } }
      .overlay h1 { font-size: 40px; margin: 0; letter-spacing: 0.5px; text-shadow: 0 0 22px rgba(58, 208, 122, 0.6); }
      .overlay h2 { font-size: 30px; margin: 0; }
      .overlay p { margin: 0; max-width: 330px; line-height: 1.45; }
      .tag { opacity: 0.95; } .goal { font-size: 13px; opacity: 0.72; }
      .sub { opacity: 0.85; font-size: 15px; }

      .cta {
        margin-top: 10px; padding: 16px 46px; font-size: 20px; font-weight: 800; border: none;
        border-radius: 999px; background: #3ad07a; color: #06210f; cursor: pointer;
        box-shadow: 0 8px 26px rgba(58, 208, 122, 0.45); animation: pulse 1.6s ease-in-out infinite;
      }
      .cta.ghost { background: transparent; color: #fff; border: 2px solid rgba(255, 255, 255, 0.6); box-shadow: none; animation: none; }
      .cta:active { transform: scale(0.96); }
      @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }

      /* ---- écran victoire ---- */
      .digit {
        font-size: 96px; font-weight: 900; line-height: 1; color: #ffd447;
        background: #171c33; border: 2px solid rgba(255, 212, 71, 0.4); border-radius: 22px;
        padding: 6px 34px; margin: 2px 0; text-shadow: 0 0 26px rgba(255, 212, 71, 0.6);
        animation: digitPop 0.4s cubic-bezier(0.2, 1.4, 0.4, 1);
      }
      @keyframes digitPop { from { transform: scale(0.3); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      .group { font-size: 14px; color: #9fe3ff; } .meta { font-size: 12px; opacity: 0.6; } .tip { font-size: 14px; opacity: 0.9; }

      .rank {
        width: 92px; height: 92px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
        font-size: 54px; font-weight: 900; color: #0b0f1c; margin-bottom: 4px;
        animation: rankPop 0.45s cubic-bezier(0.2, 1.5, 0.4, 1);
      }
      @keyframes rankPop { from { transform: scale(0) rotate(-25deg); } to { transform: scale(1) rotate(0); } }
      .rank[data-rank='S'] { background: #ffd447; box-shadow: 0 0 34px rgba(255, 212, 71, 0.8); }
      .rank[data-rank='A'] { background: #3ad07a; box-shadow: 0 0 26px rgba(58, 208, 122, 0.7); }
      .rank[data-rank='B'] { background: #7fd4ff; box-shadow: 0 0 22px rgba(127, 212, 255, 0.6); }
      .rank[data-rank='C'] { background: #c9c2b0; }

      /* ---- HUD ---- */
      .hud { position: absolute; top: 0; left: 0; right: 0; padding: 12px 14px; pointer-events: none; }
      .icon-btn {
        position: absolute; top: 10px; pointer-events: auto; background: rgba(0, 0, 0, 0.35);
        border: none; border-radius: 10px; color: #fff; font-size: 18px; width: 36px; height: 32px; cursor: pointer;
      }
      .mute { left: 12px; } .restart { right: 12px; }
      .bar { height: 14px; background: rgba(255, 255, 255, 0.14); border-radius: 999px; overflow: hidden; margin: 4px 52px 0; }
      .bar span { display: block; height: 100%; background: linear-gradient(90deg, #3ad07a, #7fffa8); transition: width 0.2s ease; }
      .score { margin-top: 6px; text-align: center; color: #fff; font-weight: 800; text-shadow: 0 1px 3px #000; }
      .combo { margin-top: 2px; text-align: center; color: #ffd447; font-weight: 900; font-size: 18px; text-shadow: 0 1px 3px #000; }
    `,
  ],
})
export class GameComponent implements OnDestroy {
  @Input() playerIndex = 1;
  @Input() team = 'ados';
  @Input() goal = GOAL;

  @ViewChild('host', { static: true }) host!: ElementRef<HTMLDivElement>;
  @ViewChild('wrap', { static: true }) wrap!: ElementRef<HTMLDivElement>;

  score = 0;
  combo = 0;
  started = false;
  won = false;
  muted = false;

  digit: number | null = null;
  group: 'A' | 'B' = 'A';
  rank: Rank | null = null;
  timeSec = 0;
  bestCombo = 0;
  badTaps = 0;

  private game?: Phaser.Game;
  private audio = new GameAudio();

  constructor(private zone: NgZone) {}

  start(): void {
    if (this.started) return;
    this.started = true;
    this.audio.unlock();
    this.requestFullscreen();
    this.createGame();
  }

  replay(): void {
    this.game?.destroy(true);
    this.game = undefined;
    this.won = false;
    this.score = 0;
    this.combo = 0;
    this.rank = null;
    this.createGame();
  }

  toggleMute(): void {
    this.muted = this.audio.toggleMute();
  }

  private createGame(): void {
    this.zone.runOutsideAngular(() => {
      this.game = new Phaser.Game({
        type: Phaser.AUTO,
        parent: this.host.nativeElement,
        backgroundColor: '#0f1220',
        scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH, width: 450, height: 800 },
      });

      const data: SceneData = {
        goal: this.goal,
        audio: this.audio,
        onScore: (s: number) => this.zone.run(() => (this.score = s)),
        onCombo: (c: number) => this.zone.run(() => (this.combo = c)),
        onWin: (info: WinInfo) => this.zone.run(() => this.onWin(info)),
      };
      this.game.scene.add('main', MainScene, true, data);
    });
  }

  private onWin(info: WinInfo): void {
    this.won = true;
    this.timeSec = Math.round(info.timeMs / 1000);
    this.bestCombo = info.bestCombo;
    this.badTaps = info.badTaps;
    this.digit = digitFor(this.team, this.playerIndex);
    this.group = groupOf(this.playerIndex);
    this.rank = computeRank({ badTaps: this.badTaps, timeSec: this.timeSec, bestCombo: this.bestCombo });
  }

  private requestFullscreen(): void {
    const el = this.wrap?.nativeElement as HTMLElement & { requestFullscreen?: () => Promise<void> };
    if (document.fullscreenEnabled && el?.requestFullscreen) {
      el.requestFullscreen().catch(() => {
        /* refusé (desktop / hors geste) — sans gravité */
      });
    }
  }

  ngOnDestroy(): void {
    this.game?.destroy(true);
  }
}
