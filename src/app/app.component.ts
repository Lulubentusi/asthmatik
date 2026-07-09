import { Component } from '@angular/core';
import { GameComponent } from './game/game.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GameComponent],
  template: `<app-game [playerIndex]="playerIndex" [team]="team" [goal]="goal"></app-game>`,
})
export class AppComponent {
  // Paramètres lus depuis le QRCode : .../?team=ados&j=3
  // team ne change QUE le chiffre attribué, jamais la difficulté (jeu identique).
  // goal : optionnel (défaut 30), pratique pour une démo rapide.
  private readonly params = new URLSearchParams(location.search);
  readonly team = (this.params.get('team') || 'ados').toLowerCase();
  readonly playerIndex = Math.min(8, Math.max(1, Number.parseInt(this.params.get('j') || '1', 10) || 1));
  readonly goal = this.clampGoal(Number.parseInt(this.params.get('goal') || '30', 10));

  private clampGoal(n: number): number {
    return Number.isFinite(n) && n >= 1 && n <= 99 ? n : 30;
  }
}
