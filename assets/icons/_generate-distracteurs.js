/*
 * Générateur des icônes de DISTRACTEURS (à éviter, -1) — hors « Carte de Paul ».
 * Même style que les 24 (helpers partagés dans _lib.js). Usage : node _generate-distracteurs.js
 * Produit : <slug>.svg (x9) + contact-sheet-distracteurs.svg + preview-distracteurs.html
 * (« je suis en forme » est déjà généré par _generate.js — c'est un item de la carte.)
 */
const lib = require('./_lib.js');
const { wrap, head, S, SKIN, BLUE, RED, eDot, eHappy, eShut, mSmile, mBig, mSad, mGrim, drop, spark, writeAll } = lib;

const brows = `<path d="M44 48 l10 3"/><path d="M76 48 l-10 3"/>`; // sourcils inquiets

const icons = [
  // ---- Positifs / sains ----
  { slug:'respire-calme', label:'Je respire tranquillement', cat:'positif', svg: wrap(head({
      eyes:eHappy, mouth:mSmile,
      front:`<path d="M64 62 q12 -2 18 -7" opacity="0.45"/><path d="M64 67 q12 0 18 -3" opacity="0.3"/>
             <path d="M86 40 q11 -7 15 2 q-9 7 -15 -2 z" fill="#9ed88f" stroke="${S}"/><path d="M89 42 q6 1 9 4"/>`})) },

  { slug:'dors-bien', label:'Je dors bien', cat:'positif', svg: wrap(head({
      eyes:eHappy, mouth:mSmile,
      back:`<ellipse cx="60" cy="94" rx="36" ry="9" fill="#dfeaf7"/>`,
      front:`<path d="M90 30 a11 11 0 1 0 5 20 a13 13 0 0 1 -5 -20 z" fill="#ffe08a" stroke="${S}"/>${spark(78,26,0.7)}
             <path d="M70 44 h9 l-9 9 h9" stroke="${S}"/>`})) },

  { slug:'bois-eau', label:"Je bois de l'eau", cat:'positif', svg: wrap(`
      ${drop(60,22,1)}
      <path d="M42 40 h36 l-5 45 a4 4 0 0 1 -4 3.5 h-18 a4 4 0 0 1 -4 -3.5 z" fill="#eaf6ff" stroke="${S}"/>
      <path d="M46 58 h28 l-3.6 26 a3 3 0 0 1 -3 2.6 h-15 a3 3 0 0 1 -3 -2.6 z" fill="#7fd4ff" stroke="none"/>
      <path d="M46 58 h28" stroke="${S}"/>
      <circle cx="55" cy="70" r="2" fill="#fff" stroke="${S}"/><circle cx="66" cy="78" r="1.6" fill="#fff" stroke="${S}"/>`) },

  { slug:'content', label:'Je suis content', cat:'positif', svg: wrap(head({
      eyes:eHappy, mouth:mBig,
      front:`<circle cx="46" cy="65" r="4" fill="#ff9a9a" stroke="none"/><circle cx="74" cy="65" r="4" fill="#ff9a9a" stroke="none"/>
             <path d="M92 34 c-3 -4 -9 -1 -9 4 c0 4 6 8 9 10 c3 -2 9 -6 9 -10 c0 -5 -6 -8 -9 -4 z" fill="#ff8fa3" stroke="${S}"/>
             <path d="M25 46 c-2.4 -3 -7 -1 -7 3 c0 3 4 5 7 6 c3 -1 7 -3 7 -6 c0 -4 -4.6 -6 -7 -3 z" fill="#ff8fa3" stroke="${S}"/>`})) },

  { slug:'calme', label:'Je me sens calme', cat:'positif', svg: wrap(head({
      eyes:eShut, mouth:mSmile,
      front:`<path d="M20 46 q-5 12 2 24" opacity="0.4" stroke="${BLUE}"/><path d="M100 46 q5 12 -2 24" opacity="0.4" stroke="${BLUE}"/>
             ${spark(60,20,0.7)}`})) },

  // ---- Non liés ----
  { slug:'mal-ventre', label:"J'ai mal au ventre", cat:'non-lie', svg: wrap(head({
      eyes:eShut, brows, mouth:mSad,
      front:`<path d="M34 84 q9 -6 17 -1" fill="${SKIN}" stroke="${S}"/><path d="M69 83 q8 -5 17 1" fill="${SKIN}" stroke="${S}"/>
             <path d="M60 86 a3 3 0 1 1 -3 3 a6 6 0 1 1 6 -6 a9 9 0 1 1 -9 9" fill="none" stroke="${RED}" stroke-width="3"/>`})) },

  { slug:'mal-dents', label:"J'ai mal aux dents", cat:'non-lie', svg: wrap(head({
      eyes:eShut, brows, mouth:mGrim,
      back:`<circle cx="90" cy="66" r="13" fill="${SKIN}" stroke="${S}"/>`,
      front:`<path d="M74 84 q9 -3 15 6" fill="${SKIN}" stroke="${S}"/>
             <path d="M97 50 q4 -5 9 0 q1 7 -2 12 q-2 -4 -2 -7 q0 3 -2 7 q-4 -5 -3 -12 z" fill="#fff" stroke="${S}"/>
             <path d="M95 42 l4 -4 M100 42 l-3 -4 M107 48 l3 -3" stroke="${RED}"/>`})) },

  { slug:'cogne', label:'Je me suis cogné', cat:'non-lie', svg: wrap(head({
      eyes:eShut, mouth:mSad,
      back:`<circle cx="74" cy="24" r="9" fill="${SKIN}" stroke="${S}"/>`,
      front:`<g transform="rotate(18 74 22)"><rect x="67" y="18" width="14" height="8" rx="2.5" fill="#ffd9a0" stroke="${S}"/><path d="M74 18 v8 M70 22 h8" stroke="${S}"/></g>
             ${spark(90,22,0.7)}${spark(58,15,0.6)}`})) },

  { slug:'faim', label:"J'ai faim", cat:'non-lie', svg: wrap(head({
      eyes:eDot, mouth:mSad,
      front:`${drop(66,74,0.55)}
             <ellipse cx="86" cy="30" rx="15" ry="11" fill="#fff" stroke="${S}"/>
             <circle cx="70" cy="44" r="3" fill="#fff" stroke="${S}"/><circle cx="63" cy="50" r="2" fill="#fff" stroke="${S}"/>
             <path d="M80 27 q8 -7 13 0 q1 8 -7 9 l-8 5 3 -7 z" fill="#e6b06a" stroke="${S}"/>
             <circle cx="76" cy="35" r="2.2" fill="#fff" stroke="${S}"/>`})) },
];

writeAll(icons, __dirname, {
  title: 'Asthmatik — distracteurs à éviter (hors carte)',
  sheetFile: 'contact-sheet-distracteurs.svg',
  previewFile: 'preview-distracteurs.html',
});
console.log(`OK — ${icons.length} distracteurs + contact-sheet-distracteurs.svg + preview-distracteurs.html`);
