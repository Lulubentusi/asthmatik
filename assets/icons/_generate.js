/*
 * Générateur d'icônes cartoon (SVG) — 24 items de la « Carte de Paul ».
 * Helpers partagés dans _lib.js.  Usage : node _generate.js
 * Produit : <slug>.svg (x24) + contact-sheet.svg + preview.html
 */
const lib = require('./_lib.js');
const {
  wrap, head, S, SKIN, BLUE, RED,
  eDot, eWide, eHappy, eSleepy, eShut, eWorry, eDizzy,
  mSmile, mBig, mGasp, mFlat, mWavy, mGrim, mPant, mPurse,
  drop, puff, spark, writeAll,
} = lib;

const icons = [
  // ---- Asthme (à cliquer) ----
  { slug:'je-tousse', label:'Je tousse', cat:'asthme', svg: wrap(head({
      eyes:eShut, mouth:`<ellipse cx="58" cy="72" rx="5" ry="6" fill="${S}" stroke="none"/>`,
      front:`<circle cx="84" cy="76" r="9" fill="${SKIN}"/><path d="M76 76 h16 M80 72 v8 M84 71 v10 M88 72 v8"/>
             ${puff(98,60,4)}${puff(106,66,3)}${puff(100,72,2.5)}`})) },

  { slug:'besoin-air', label:"J'ai besoin d'air", cat:'asthme', svg: wrap(head({
      eyes:eWide, mouth:mGasp,
      front:`<path d="M20 58 q14 -8 24 4"/><path d="M18 70 q16 -6 26 4"/><path d="M40 62 l6 0 -2 -4"/><path d="M42 74 l6 0 -2 -4"/>`})) },

  { slug:'je-siffle', label:'Je siffle quand je respire', cat:'asthme', svg: wrap(head({
      eyes:eDot, mouth:mPurse,
      front:`<g stroke="none" fill="${S}"><ellipse cx="90" cy="72" rx="5" ry="4"/><rect x="94" y="48" width="2.6" height="24"/><path d="M94 48 q9 1 9 9 q-4 -5 -9 -3 z"/></g>
             <path d="M70 66 q6 -5 12 0" opacity="0.7"/><path d="M70 74 q6 -5 12 0" opacity="0.45"/>`})) },

  { slug:'essouffle', label:'Je me sens très essoufflé', cat:'asthme', svg: wrap(head({
      eyes:eShut, mouth:mPant,
      front:`<path d="M80 64 q10 -3 9 8"/>${puff(90,58,3.2)}${puff(97,65,2.6)}${puff(31,58,3.2)}${puff(24,64,2.6)}`})) },

  { slug:'oppresse', label:'Je me sens oppressé', cat:'asthme', svg: wrap(head({
      eyes:eShut, brows:`<path d="M44 47 l10 3"/><path d="M76 47 l-10 3"/>`, mouth:mGrim,
      back:`<rect x="36" y="6" width="48" height="15" rx="3" fill="#bfb8a6"/><path d="M44 10 h32 M44 14 h32" stroke="#8f8a78" stroke-width="2"/>`,
      front:`<path d="M46 22 v6 M60 22 v6 M74 22 v6"/><path d="M43 28 l3 -4 3 4 M57 28 l3 -4 3 4 M71 28 l3 -4 3 4"/>`})) },

  { slug:'serre', label:'Je me sens serré', cat:'asthme', svg: wrap(head({
      eyes:eShut, mouth:mGrim,
      front:`<rect x="30" y="52" width="60" height="13" rx="4" fill="#a8794f"/><rect x="54" y="50" width="12" height="17" rx="2" fill="#8a5f38"/>
             <path d="M18 58 l10 -3 M18 58 l10 3"/><path d="M102 58 l-10 -3 M102 58 l-10 3"/>`})) },

  { slug:'gene-effort', label:'Je suis gêné après un effort physique', cat:'asthme', svg: wrap(`
      <circle cx="72" cy="34" r="8" fill="${S}" stroke="none"/>
      <g stroke="${S}" stroke-width="6" fill="none" stroke-linecap="round">
        <path d="M68 44 l-9 15"/><path d="M59 59 l-13 5"/><path d="M62 53 l7 16"/><path d="M69 69 l11 -3"/>
        <path d="M68 47 l14 5"/><path d="M64 49 l-13 4"/>
      </g>
      ${puff(30,32,3.4)}${puff(23,30,2.6)}<path d="M40 30 q6 -3 11 1" stroke="${S}" stroke-width="3.2"/>`) },

  { slug:'arrete-sport', label:"J'arrête mon sport ou mon jeu", cat:'asthme', svg: wrap(`
      <circle cx="42" cy="66" r="16" fill="#fff" stroke="${S}"/>
      <path d="M42 54 l6 5 -2 8 h-8 l-2 -8 z" fill="${S}" stroke="none"/>
      <path d="M28 62 l6 3 M56 62 l-6 3 M42 80 l0 -4" stroke="${S}"/>
      <rect x="60" y="58" width="36" height="20" rx="10" fill="#cfd3d8" stroke="${S}"/>
      <path d="M70 64 v8 M66 68 h8" stroke="${S}"/><circle cx="86" cy="66" r="2.4" fill="${S}" stroke="none"/><circle cx="90" cy="72" r="2.4" fill="${S}" stroke="none"/>
      <circle cx="84" cy="34" r="13" fill="${RED}" stroke="${S}"/><rect x="80" y="29" width="3.4" height="10" rx="1" fill="#fff" stroke="none"/><rect x="86" y="29" width="3.4" height="10" rx="1" fill="#fff" stroke="none"/>`) },

  { slug:'bronchites', label:'Je fais des bronchites', cat:'asthme', svg: wrap(`
      <path d="M60 34 v12"/><path d="M60 46 q-3 -6 -9 -5 M60 46 q3 -6 9 -5"/>
      <path d="M51 43 q-17 5 -17 26 q0 15 11 15 q9 0 9 -13 v-27 z" fill="#ffb3ba" stroke="${S}"/>
      <path d="M69 43 q17 5 17 26 q0 15 -11 15 q-9 0 -9 -13 v-27 z" fill="#ffb3ba" stroke="${S}"/>
      <circle cx="76" cy="72" r="8" fill="#7ec87e" stroke="${S}"/><path d="M76 62 v-4 M76 82 v4 M66 72 h-4 M86 72 h4 M69 65 l-3 -3 M83 79 l3 3 M69 79 l-3 3 M83 65 l3 -3"/>
      <circle cx="73" cy="71" r="1.4" fill="${S}" stroke="none"/><circle cx="79" cy="71" r="1.4" fill="${S}" stroke="none"/>`) },

  { slug:'je-crache', label:'Je crache', cat:'asthme', svg: wrap(head({
      eyes:eShut, mouth:`<path d="M52 70 q8 8 16 2 q-8 8 -16 -2 z" fill="${S}" stroke="none"/>`,
      front:`<path d="M74 74 q9 1 13 8"/>${drop(92,80,1.1)}<circle cx="99" cy="90" r="2.4" fill="${BLUE}" stroke="${S}"/>`})) },

  // ---- Allergie (à cliquer) ----
  { slug:'eternue', label:"J'éternue", cat:'allergie', svg: wrap(head({
      eyes:eShut, mouth:mGasp,
      front:`<path d="M40 68 l-13 4 4 11 13 -4 z" fill="#fff"/>
             <circle cx="88" cy="56" r="2.6" fill="${BLUE}" stroke="${S}"/><circle cx="97" cy="63" r="2.1" fill="${BLUE}" stroke="${S}"/><circle cx="90" cy="70" r="1.9" fill="${BLUE}" stroke="${S}"/>`})) },

  { slug:'yeux-piquent', label:"J'ai les yeux qui piquent", cat:'allergie', svg: wrap(`
      <ellipse cx="60" cy="58" rx="30" ry="18" fill="#fff" stroke="${S}"/>
      <path d="M32 60 q26 12 56 0" stroke="${RED}"/><path d="M38 54 q6 -3 12 0 M74 55 q-6 -3 -12 0" stroke="${RED}"/>
      <circle cx="60" cy="58" r="12" fill="#8fd0ff" stroke="${S}"/><circle cx="60" cy="58" r="5" fill="${S}" stroke="none"/><circle cx="64" cy="54" r="2" fill="#fff" stroke="none"/>
      ${drop(60,76,1)}${spark(90,42,1)}${spark(30,44,0.8)}`) },

  { slug:'nez-coule', label:'Mon nez pique / coule', cat:'allergie', svg: wrap(head({
      eyes:eSleepy, mouth:mFlat,
      front:`<path d="M60 56 q-5 9 0 13 q5 0 5 -3" fill="${SKIN}"/><ellipse cx="60" cy="76" rx="3.2" ry="5.4" fill="${BLUE}" stroke="${S}"/>
             ${spark(80,50,0.8)}<path d="M40 68 l-11 4 3 9 11 -4 z" fill="#fff"/>`})) },

  { slug:'gorge-pique', label:'Ma gorge me pique', cat:'allergie', svg: wrap(head({
      eyes:eShut, brows:`<path d="M44 48 l10 3"/><path d="M76 48 l-10 3"/>`, mouth:mGrim,
      front:`<path d="M48 84 q12 -7 24 0" fill="${SKIN}"/><path d="M52 82 q8 6 16 0" stroke="${RED}"/>
             <path d="M60 80 l-2 -6 M60 80 l2 -6 M67 82 l1 -6 M53 82 l-1 -6" stroke="#e2a13b"/>`})) },

  // ---- Autre (carte -> à cliquer) ----
  { slug:'fatigue', label:'Je suis fatigué', cat:'autre', svg: wrap(head({
      eyes:eSleepy, mouth:`<ellipse cx="60" cy="73" rx="5" ry="6" fill="${S}" stroke="none"/>`,
      front:`<path d="M74 26 h12 l-12 12 h12" stroke="${S}"/><path d="M90 40 h8 l-8 8 h8" stroke="${S}"/><path d="M100 52 h5 l-5 5 h5" stroke="${S}"/>`})) },

  // ---- Gravité (à cliquer + URGENCE) ----
  { slug:'mal-parler', label:"J'ai du mal à parler", cat:'gravite', svg: wrap(head({
      eyes:eDot, mouth:`<path d="M50 72 q10 3 20 0"/>`,
      front:`<path d="M66 20 h34 a6 6 0 0 1 6 6 v14 a6 6 0 0 1 -6 6 h-18 l-7 8 v-8 h-9 a6 6 0 0 1 -6 -6 v-14 a6 6 0 0 1 6 -6 z" fill="#fff"/>
             <circle cx="78" cy="33" r="2.4" fill="${S}" stroke="none"/><circle cx="86" cy="33" r="2.4" fill="${S}" stroke="none"/><circle cx="94" cy="33" r="2.4" fill="${S}" stroke="none"/>`})) },

  { slug:'plus-parler', label:'Je ne peux presque plus parler', cat:'gravite', svg: wrap(head({
      eyes:eWorry, mouth:mFlat,
      front:`<path d="M66 20 h34 a6 6 0 0 1 6 6 v14 a6 6 0 0 1 -6 6 h-18 l-7 8 v-8 h-9 a6 6 0 0 1 -6 -6 v-14 a6 6 0 0 1 6 -6 z" fill="#fff"/>
             <line x1="66" y1="44" x2="104" y2="20" stroke="${RED}" stroke-width="5"/>`})) },

  { slug:'spray-ko', label:'Le spray bleu ne fonctionne pas', cat:'gravite', svg: wrap(`
      <rect x="44" y="62" width="34" height="16" rx="4" fill="#2f7bd6" stroke="${S}"/>
      <rect x="46" y="34" width="20" height="30" rx="5" fill="#3f8be0" stroke="${S}"/>
      <rect x="49" y="26" width="14" height="10" rx="3" fill="#6aa8ee" stroke="${S}"/>
      <circle cx="60" cy="56" r="34" fill="none" stroke="${RED}" stroke-width="6"/>
      <line x1="36" y1="80" x2="84" y2="32" stroke="${RED}" stroke-width="6"/>`) },

  { slug:'levres-bleues', label:"J'ai les lèvres bleues", cat:'gravite', svg: wrap(head({
      eyes:eWorry, mouth:`<path d="M47 70 q13 9 26 0 q-13 5 -26 0 z" fill="#5aa0e0" stroke="${S}"/>`,
      front:`<circle cx="46" cy="66" r="3.5" fill="#a9c9ec" stroke="none"/><circle cx="74" cy="66" r="3.5" fill="#a9c9ec" stroke="none"/>`})) },

  { slug:'idees-embrouillees', label:"Mes idées s'embrouillent", cat:'gravite', svg: wrap(head({
      eyes:eDizzy, mouth:mWavy,
      front:`<path d="M40 24 c8 -9 17 6 25 -3 c8 -7 16 7 8 12 c9 3 1 13 -8 9 c-9 4 -19 -3 -14 -10" fill="none" stroke="${S}"/>
             <path d="M92 24 q0 -8 6 -8 q6 0 6 6 q0 5 -6 6 v3" stroke="${S}"/><circle cx="98" cy="45" r="1.7" fill="${S}" stroke="none"/>`})) },

  { slug:'coeur-vite', label:'Mon cœur bat vite', cat:'gravite', svg: wrap(`
      <path d="M60 46 c-10 -13 -30 -3 -30 14 c0 15 22 27 30 33 c8 -6 30 -18 30 -33 c0 -17 -20 -27 -30 -14 z" fill="#ff5d73" stroke="${S}"/>
      <path d="M34 70 h11 l4 -12 6 24 4 -12 h13" stroke="#fff" stroke-width="3"/>
      <path d="M98 52 h12 M98 63 h16 M98 74 h12" stroke="${S}"/>`) },

  { slug:'transpire', label:'Je transpire', cat:'gravite', svg: wrap(head({
      eyes:eShut, mouth:mFlat,
      front:`${drop(39,40,1)}${drop(80,42,1)}${drop(33,60,0.9)}${drop(88,60,0.9)}<path d="M46 40 q14 -6 28 0"/>`})) },

  { slug:'angoisse', label:'Je suis angoissé', cat:'gravite', svg: wrap(head({
      eyes:eWorry, mouth:mWavy,
      front:`${drop(82,44,1)}<path d="M30 32 v-8 M37 30 v-8 M44 32 v-8" stroke="${BLUE}"/>`})) },

  // ---- Positif (carte -> à ÉVITER) ----
  { slug:'en-forme', label:'Je suis en forme', cat:'positif', svg: wrap(head({
      eyes:eHappy, mouth:mBig,
      front:`<circle cx="46" cy="65" r="4" fill="#ff9a9a" stroke="none"/><circle cx="74" cy="65" r="4" fill="#ff9a9a" stroke="none"/>
             <circle cx="86" cy="66" r="6" fill="${SKIN}"/><path d="M80 80 q10 -6 8 -18" stroke-width="6"/>
             ${spark(28,32,1)}${spark(96,40,0.8)}`})) },
];

writeAll(icons, __dirname, { title:'Asthmatik — 24 icônes (Carte de Paul)', sheetFile:'contact-sheet.svg', previewFile:'preview.html' });
console.log(`OK — ${icons.length} icônes + contact-sheet.svg + preview.html`);
