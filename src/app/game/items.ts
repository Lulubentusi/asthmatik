/**
 * Manifeste des items du jeu.
 *  - 'good'    : symptôme d'asthme / allergie / fatigue  -> à cliquer (+1)
 *  - 'gravity' : signe de gravité -> à cliquer (+1) + effet URGENCE
 *  - 'avoid'   : positif / non lié -> à éviter (-1)
 * Les slugs correspondent aux illustrations public/cards/<slug>.webp (garçon)
 * et public/cards/<slug>-f.webp (fille) ; les SVG public/icons/ sont l'ancien jeu d'icônes.
 */
export type ItemType = 'good' | 'gravity' | 'avoid';

export interface GameItem {
  slug: string;
  label: string;
  type: ItemType;
  /** Feedback pédagogique affiché quand le joueur tape cette carte par erreur. */
  why?: string;
}

export const ITEMS: GameItem[] = [
  // --- à cliquer : symptômes (asthme) ---
  { slug: 'je-tousse',      label: 'Je tousse',                          type: 'good' },
  { slug: 'besoin-air',     label: "J'ai besoin d'air",                  type: 'good' },
  { slug: 'je-siffle',      label: 'Je siffle quand je respire',         type: 'good' },
  { slug: 'essouffle',      label: 'Je me sens très essoufflé',          type: 'good' },
  { slug: 'oppresse',       label: 'Je me sens oppressé',                type: 'good' },
  { slug: 'serre',          label: 'Je me sens serré',                   type: 'good' },
  { slug: 'gene-effort',    label: 'Je suis gêné après un effort',       type: 'good' },
  { slug: 'arrete-sport',   label: "J'arrête mon sport ou mon jeu",      type: 'good' },
  { slug: 'bronchites',     label: 'Je fais des bronchites',             type: 'good' },
  { slug: 'je-crache',      label: 'Je crache',                          type: 'good' },
  // --- à cliquer : allergie ---
  { slug: 'eternue',        label: "J'éternue",                          type: 'good' },
  { slug: 'yeux-piquent',   label: "J'ai les yeux qui piquent",          type: 'good' },
  { slug: 'nez-coule',      label: 'Mon nez pique / coule',              type: 'good' },
  { slug: 'gorge-pique',    label: 'Ma gorge me pique',                  type: 'good' },
  // --- à cliquer : autre (carte) ---
  { slug: 'fatigue',        label: 'Je suis fatigué',                    type: 'good' },
  // --- à cliquer : signes de GRAVITÉ (URGENCE) ---
  { slug: 'mal-parler',        label: "J'ai du mal à parler",            type: 'gravity' },
  { slug: 'plus-parler',       label: 'Je ne peux presque plus parler',  type: 'gravity' },
  { slug: 'spray-ko',          label: 'Le spray bleu ne fonctionne pas', type: 'gravity' },
  { slug: 'levres-bleues',     label: "J'ai les lèvres bleues",          type: 'gravity' },
  { slug: 'idees-embrouillees',label: "Mes idées s'embrouillent",        type: 'gravity' },
  { slug: 'coeur-vite',        label: 'Mon cœur bat vite',               type: 'gravity' },
  { slug: 'transpire',         label: 'Je transpire',                    type: 'gravity' },
  { slug: 'angoisse',          label: 'Je suis angoissé',                type: 'gravity' },
  // --- à éviter : positif / sain ---
  { slug: 'en-forme',       label: 'Je suis en forme',                   type: 'avoid', why: 'Être en forme, c\'est bon signe !' },
  { slug: 'respire-calme',  label: 'Je respire tranquillement',          type: 'avoid', why: 'Respirer tranquillement, c\'est bon signe !' },
  { slug: 'dors-bien',      label: 'Je dors bien',                       type: 'avoid', why: 'Bien dormir, c\'est bon signe !' },
  { slug: 'bois-eau',       label: "Je bois de l'eau",                   type: 'avoid', why: 'Boire de l\'eau, c\'est sain !' },
  { slug: 'content',        label: 'Je suis content',                    type: 'avoid', why: 'Être content, c\'est bon signe !' },
  { slug: 'calme',          label: 'Je me sens calme',                   type: 'avoid', why: 'Se sentir calme, c\'est bon signe !' },
  // --- à éviter : non lié ---
  { slug: 'mal-ventre',     label: "J'ai mal au ventre",                 type: 'avoid', why: 'Le mal de ventre n\'est pas un signe d\'asthme' },
  { slug: 'mal-dents',      label: "J'ai mal aux dents",                 type: 'avoid', why: 'Le mal de dents n\'est pas un signe d\'asthme' },
  { slug: 'cogne',          label: 'Je me suis cogné',                   type: 'avoid', why: 'Se cogner n\'a pas de lien avec l\'asthme' },
  { slug: 'faim',           label: "J'ai faim",                          type: 'avoid', why: 'Avoir faim n\'a pas de lien avec l\'asthme' },
];

export const ITEMS_BY_TYPE: Record<ItemType, GameItem[]> = {
  good: ITEMS.filter((i) => i.type === 'good'),
  gravity: ITEMS.filter((i) => i.type === 'gravity'),
  avoid: ITEMS.filter((i) => i.type === 'avoid'),
};
