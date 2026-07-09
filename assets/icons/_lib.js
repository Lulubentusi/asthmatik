/*
 * Bibliothèque partagée de dessin cartoon (SVG) pour Asthmatik.
 * Utilisée par _generate.js (24 items) et _generate-distracteurs.js.
 * Style : petit personnage "Paul" + motifs, trait épais, fond neutre uniforme
 * (PAS de code couleur par catégorie -> ne révèle pas la bonne réponse en jeu).
 */
const fs = require('fs');
const path = require('path');

const S = '#33302b';       // trait (encre)
const SKIN = '#ffd4a3';    // peau
const HAIR = '#8a5a34';    // cheveux
const BG = '#fffdf5';      // fond token (uniforme)
const BLUE = '#7fd4ff';    // gouttes / eau
const RED = '#e23b3b';     // interdiction / alerte / douleur

const wrap = (inner) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <rect x="4" y="4" width="112" height="112" rx="26" fill="${BG}" stroke="#e6ddc4" stroke-width="2"/>
  <g fill="none" stroke="${S}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round">
${inner}
  </g>
</svg>`;

/* yeux */
const eDot    = `<circle cx="50" cy="55" r="3.3" fill="${S}" stroke="none"/><circle cx="70" cy="55" r="3.3" fill="${S}" stroke="none"/>`;
const eWide   = `<circle cx="50" cy="54" r="7" fill="#fff"/><circle cx="70" cy="54" r="7" fill="#fff"/><circle cx="50" cy="55" r="3" fill="${S}" stroke="none"/><circle cx="70" cy="55" r="3" fill="${S}" stroke="none"/>`;
const eHappy  = `<path d="M45 57 q5 -7 10 0"/><path d="M65 57 q5 -7 10 0"/>`;
const eSleepy = `<path d="M45 55 q5 4 10 0"/><path d="M65 55 q5 4 10 0"/>`;
const eShut   = `<path d="M45 55 h10"/><path d="M65 55 h10"/>`;
const eWorry  = `<circle cx="50" cy="57" r="3.3" fill="${S}" stroke="none"/><circle cx="70" cy="57" r="3.3" fill="${S}" stroke="none"/><path d="M44 49 l10 3"/><path d="M76 49 l-10 3"/>`;
const eDizzy  = `<path d="M46 55 a3.2 3.2 0 1 1 6 0 a2 2 0 1 1 -4 0"/><path d="M68 55 a3.2 3.2 0 1 1 6 0 a2 2 0 1 1 -4 0"/>`;

/* bouches */
const mSmile   = `<path d="M50 70 q10 7 20 0"/>`;
const mBig     = `<path d="M47 68 q13 13 26 0 z" fill="${S}" stroke="none"/><path d="M47 68 q13 13 26 0"/>`;
const mGasp    = `<ellipse cx="60" cy="72" rx="7" ry="9" fill="${S}" stroke="none"/>`;
const mFlat    = `<path d="M52 72 h16"/>`;
const mSad     = `<path d="M50 74 q10 -7 20 0"/>`;
const mWavy    = `<path d="M49 72 q5 5 10 0 q5 -5 10 0"/>`;
const mGrim    = `<rect x="49" y="67" width="22" height="9" rx="2" fill="#fff"/><path d="M56 67 v9 M63 67 v9 M49 71.5 h22"/>`;
const mPant    = `<path d="M50 68 q10 11 20 0 z" fill="${S}" stroke="none"/><path d="M55 74 q5 7 10 0 z" fill="#ff8a8a" stroke="none"/>`;
const mPurse   = `<circle cx="60" cy="72" r="3.6" fill="${S}" stroke="none"/>`;

/* tête (les défauts référencent les yeux/bouches définis ci-dessus) */
const head = ({eyes = eDot, mouth = mSmile, brows = '', back = '', front = ''}) => `${back}
    <path d="M33 52 Q33 22 60 22 Q87 22 87 52 Q60 40 33 52 Z" fill="${HAIR}"/>
    <circle cx="60" cy="58" r="27" fill="${SKIN}"/>
    ${brows}${eyes}${mouth}${front}`;

/* motifs réutilisables */
const drop  = (x, y, s = 1) => `<path d="M${x} ${y} q${-6*s} ${9*s} 0 ${13*s} q${6*s} ${-4*s} 0 ${-13*s} z" fill="${BLUE}"/>`;
const puff  = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff"/>`;
const spark = (x, y, s = 1) => `<path d="M${x} ${y-6*s} l${1.6*s} ${4.4*s} ${4.4*s} ${1.6*s} ${-4.4*s} ${1.6*s} ${-1.6*s} ${4.4*s} ${-1.6*s} ${-4.4*s} ${-4.4*s} ${-1.6*s} ${4.4*s} ${-1.6*s} z" fill="#ffd447"/>`;

/* couleurs / libellés de catégorie (pour planche & preview UNIQUEMENT, jamais dans les tokens) */
const catColor = { asthme:'#3a9d5d', allergie:'#3a7bd6', autre:'#8a6d3b', gravite:'#d64545', positif:'#c58a1a', 'non-lie':'#7a6f63' };
const catLabel = { asthme:'Asthme (+1)', allergie:'Allergie (+1)', autre:'Autre carte (+1)', gravite:'Gravité (+1 URGENCE)', positif:'Positif (à éviter, -1)', 'non-lie':'Non lié (à éviter, -1)' };

/* écrit les .svg + une planche-contact + une preview HTML */
function writeAll(icons, DIR, { title, sheetFile, previewFile }) {
  icons.forEach(i => fs.writeFileSync(path.join(DIR, i.slug + '.svg'), i.svg));

  const COLS = 4, CW = 212, CH = 196;
  const rows = Math.ceil(icons.length / COLS);
  let cells = '';
  icons.forEach((i, n) => {
    const c = n % COLS, r = (n / COLS) | 0;
    const x = c * CW + 24, y = r * CH + 16;
    const inner = i.svg.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
    cells += `<svg x="${x}" y="${y}" width="120" height="120" viewBox="0 0 120 120">${inner}</svg>
  <rect x="${x-2}" y="${y+126}" width="8" height="8" rx="2" fill="${catColor[i.cat]}"/>
  <text x="${x+12}" y="${y+133}" font-family="Segoe UI, sans-serif" font-size="11" fill="#333">${i.label.replace(/&/g,'&amp;')}</text>`;
  });
  const sheet = `<svg xmlns="http://www.w3.org/2000/svg" width="${COLS*CW+24}" height="${rows*CH+40}" viewBox="0 0 ${COLS*CW+24} ${rows*CH+40}">
  <rect width="100%" height="100%" fill="#faf6ec"/>
  <text x="24" y="34" font-family="Segoe UI, sans-serif" font-size="20" font-weight="700" fill="#222">${title}</text>
  <g transform="translate(0,44)">${cells}</g>
</svg>`;
  fs.writeFileSync(path.join(DIR, sheetFile), sheet);

  const cats = [...new Set(icons.map(i => i.cat))];
  const legend = cats.map(k => `<span class="tag"><i style="background:${catColor[k]}"></i>${catLabel[k]}</span>`).join('');
  const cards = icons.map(i =>
    `<figure><img src="${i.slug}.svg" alt="${i.label}"/><figcaption><i style="background:${catColor[i.cat]}"></i>${i.label}</figcaption></figure>`).join('\n');
  const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title><style>
 body{font-family:Segoe UI,system-ui,sans-serif;background:#faf6ec;margin:0;padding:24px;color:#222}
 h1{font-size:22px} .legend{margin:8px 0 20px;display:flex;flex-wrap:wrap;gap:14px}
 .tag,figcaption{display:flex;align-items:center;gap:6px;font-size:13px}
 .tag i,figcaption i{width:10px;height:10px;border-radius:3px;display:inline-block}
 .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:14px}
 figure{margin:0;background:#fff;border:1px solid #eadfc6;border-radius:14px;padding:10px;text-align:center}
 img{width:100%;max-width:120px;height:auto} figcaption{justify-content:center;margin-top:6px;text-align:center}
</style></head><body>
<h1>🫁 ${title}</h1>
<div class="legend">${legend}</div>
<p style="font-size:13px;color:#666;max-width:640px">⚠️ En jeu, ne pas afficher la couleur de catégorie sur les icônes (sinon on devine la réponse). Le fond des tokens est volontairement neutre et uniforme.</p>
<div class="grid">${cards}</div>
</body></html>`;
  fs.writeFileSync(path.join(DIR, previewFile), html);
  return icons.length;
}

module.exports = {
  S, SKIN, HAIR, BG, BLUE, RED, wrap, head,
  eDot, eWide, eHappy, eSleepy, eShut, eWorry, eDizzy,
  mSmile, mBig, mGasp, mFlat, mSad, mWavy, mGrim, mPant, mPurse,
  drop, puff, spark, catColor, catLabel, writeAll,
};
