import { Component, EventEmitter, Output } from '@angular/core';
import { GameItem, ITEMS_BY_TYPE } from './items';

/**
 * Galerie de consultation de toutes les cartes du jeu, ordonnée par
 * signes de gravité, symptômes, puis positif / pas un symptôme d'asthme.
 * Affichée en overlay depuis l'écran d'accueil (pas de router dans l'app).
 */
@Component({
  selector: 'app-cards-gallery',
  standalone: true,
  template: `
    <div class="gallery">
      <header>
        <button class="icon-btn" (click)="closed.emit()" aria-label="retour">←</button>
        <h2>Toutes les cartes</h2>
        <button class="icon-btn sexe" (click)="toggleSexe()" [attr.aria-label]="sexe === 'g' ? 'voir les cartes fille' : 'voir les cartes garçon'">
          {{ sexe === 'g' ? '👧' : '👦' }}
        </button>
      </header>

      @for (section of sections; track section.title) {
        <section [class]="section.type">
          <h3><span class="badge">{{ section.badge }}</span> {{ section.title }}</h3>
          <div class="grid">
            @for (item of section.items; track item.slug) {
              <figure class="card">
                <img [src]="srcOf(item)" [alt]="item.label" loading="lazy" />
                <figcaption>
                  {{ item.label }}
                  @if (item.why) {
                    <small>{{ item.why }}</small>
                  }
                </figcaption>
              </figure>
            }
          </div>
        </section>
      }
    </div>
  `,
  styles: [
    `
      :host { display: contents; }
      .gallery {
        position: absolute; inset: 0; overflow-y: auto; z-index: 10;
        padding: 0 14px calc(24px + env(safe-area-inset-bottom, 0px));
        color: #22304d; font-family: 'Segoe UI', system-ui, sans-serif;
        background: rgba(235, 248, 255, 0.92); backdrop-filter: blur(6px); animation: fade 0.25s ease;
      }
      @keyframes fade { from { opacity: 0; } to { opacity: 1; } }

      header {
        position: sticky; top: 0; z-index: 2; display: flex; align-items: center; gap: 10px;
        padding: calc(12px + env(safe-area-inset-top, 0px)) 0 10px;
        background: linear-gradient(180deg, rgba(235, 248, 255, 0.97) 75%, rgba(235, 248, 255, 0));
      }
      header h2 { flex: 1; margin: 0; font-size: 22px; text-align: center; color: #1d3557; text-shadow: 0 2px 0 #fff; }
      .icon-btn {
        background: rgba(255, 255, 255, 0.85); border: none; border-radius: 10px; color: #1d3557;
        font-size: 18px; width: 36px; height: 32px; cursor: pointer; flex: 0 0 auto;
        box-shadow: 0 3px 8px rgba(29, 53, 87, 0.25);
      }

      section { max-width: 560px; margin: 0 auto 18px; }
      section h3 {
        display: flex; align-items: center; gap: 8px; margin: 14px 2px 10px;
        font-size: 16px; color: #1d3557; text-shadow: 0 1px 0 #fff;
      }
      .badge { font-size: 12px; font-weight: 800; padding: 2px 10px; border-radius: 999px; white-space: nowrap; }
      section.gravity .badge { color: #a36400; background: rgba(255, 176, 32, 0.2); border: 1px solid rgba(163, 100, 0, 0.4); }
      section.good .badge { color: #157347; background: rgba(58, 208, 122, 0.18); border: 1px solid rgba(21, 115, 71, 0.4); }
      section.avoid .badge { color: #c73535; background: rgba(255, 93, 93, 0.16); border: 1px solid rgba(199, 53, 53, 0.4); }

      .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(102px, 1fr)); gap: 10px; }
      .card {
        display: flex; flex-direction: column; align-items: center; gap: 5px; margin: 0;
        padding: 10px 6px; border-radius: 16px; background: #fff; border: 3px solid #fff;
        box-shadow: 0 6px 16px rgba(29, 53, 87, 0.22);
      }
      section.gravity .card { border-color: #ffd9a0; }
      section.avoid .card { border-color: #ffd6d6; }
      .card img { width: 72px; height: 72px; border-radius: 12px; }
      .card figcaption { font-size: 11px; font-weight: 600; line-height: 1.2; text-align: center; opacity: 0.9; }
      .card small { display: block; margin-top: 3px; font-size: 10px; font-weight: 400; opacity: 0.75; }
    `,
  ],
})
export class CardsGalleryComponent {
  @Output() closed = new EventEmitter<void>();

  /** 'g' = garçon (cards/<slug>.webp), 'f' = fille (cards/<slug>-f.webp) */
  sexe: 'g' | 'f' = 'g';

  readonly sections = [
    { type: 'gravity', title: 'Signes de gravité 🚨', badge: 'Tape ! +1', items: ITEMS_BY_TYPE.gravity },
    { type: 'good', title: "Symptômes d'asthme / allergie", badge: 'Tape ! +1', items: ITEMS_BY_TYPE.good },
    { type: 'avoid', title: 'Positif / pas un symptôme', badge: 'Évite ! −1', items: ITEMS_BY_TYPE.avoid },
  ] as const;

  toggleSexe(): void {
    this.sexe = this.sexe === 'g' ? 'f' : 'g';
  }

  srcOf(item: GameItem): string {
    return `cards/${item.slug}${this.sexe === 'f' ? '-f' : ''}.webp`;
  }
}
