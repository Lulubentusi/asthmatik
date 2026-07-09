# 🫁 Asthmatik — Jeu d'épreuve pour escape game

> Mini-jeu web mobile pour une épreuve d'escape game sur le thème de l'asthme.
> Les joueurs tapent les **symptômes de l'asthme** qui tombent, évitent les intrus,
> et débloquent un chiffre du code du cadena une fois **30 points** atteints.

---

## 1. Concept

- **Contexte** : une épreuve = un jeu web joué sur téléphone, accédé via **QRCode**.
- **Équipe** : 8 joueurs, chacun sur son propre téléphone avec son propre QRCode.
- **But du joueur** : atteindre **30 points** (1 pt par bonne réponse).
- **Récompense** : à 30 pts, le joueur débloque **1 chiffre**. Les 8 chiffres réunis
  forment le(s) code(s) du/des cadena(s) pour passer à la salle suivante.
- **Pédagogie** : apprendre à **reconnaître les vrais symptômes de l'asthme**.

## 2. Décisions figées (brainstorm)

| Sujet | Choix retenu |
|---|---|
| **Techno** | Angular + **Phaser 3**, build **statique** |
| **Gameplay** | **Objets qui tombent** : taper les symptômes avant qu'ils touchent le sol |
| **Scoring** | **+1** bonne cible / **−1** mauvaise cible, **sans chrono**, on rejoue jusqu'à 30. Couche **combo + rang S/A/B + temps** par-dessus, pour le fun/compétition (n'affecte PAS l'ouverture du cadena) |
| **Publics** | **2 équipes** (ados & parents) mais **jeu strictement identique** (aucun mode de difficulté). Les **2 sets de QRCodes** ne servent qu'à **attribuer les chiffres** par équipe (`team=ados\|parents`) |
| **Compétition** | **Rang S/A/B/C + temps de complétion** pour tous (100 % local → garde le zéro-backend ; pas de classement live serveur) |
| **Ton du contenu** | **Fun d'abord, médicalement correct** : icônes cartoon, symptômes réels, **relecture médicale légère** |
| **Contenu source** | Symptômes = **24 items de la « Carte de Paul »** (`Carte de paul MAJ 22.05.26.pdf`) — voir §4 |
| **Items allergie** | **Comptent comme symptômes à cliquer** (+1) |
| **Signes de gravité** | **Mécanique URGENCE** : effet spécial + alerte secours + bonus de style (voir §5) |
| **Distracteurs** | La carte n'en donne qu'un → on **ajoute** des items **positifs/sains + non liés** (hors carte) pour le **−1** |
| **Cadena** | 8 chiffres **en 2 groupes de 4** (joueurs 1-4 = code A, joueurs 5-8 = code B) → compatible avec **1 cadena à 8 molettes** OU **2 cadenas de 4**. **Modèle physique tranché à l'achat** |
| **Hébergement** | Statique **gratuit** (GitHub Pages / Netlify / Cloudflare Pages) |
| **Backend** | **Aucun** (tout se joue en local sur le téléphone) |

## 3. Architecture technique

**Point clé : aucun serveur nécessaire.** Tout est calculé côté téléphone → hébergement
100 % statique, gratuit à vie, et rien ne peut « planter » côté serveur le jour J.

- Chaque QRCode encode **l'équipe + l'index du joueur** dans l'URL : `.../?team=ados&j=3`.
- L'app contient la **table (équipe, joueur) → chiffre** (ex. ados `[4,7,1,9,3,5,8,2]`, parents `[…]`).
  - Joueurs 1-4 → **code A** (ex. `4 7 1 9`)
  - Joueurs 5-8 → **code B** (ex. `3 5 8 2`)
  - ⚠️ `team` **n'influence que le chiffre attribué**, jamais la difficulté (jeu identique — voir §6).
- Le chiffre n'est **révélé qu'à l'écran de victoire** (après 30 pts).
- Le score est un simple compteur en mémoire : pas de base de données, pas de synchro
  entre téléphones.

## 4. Contenu pédagogique — « Carte de Paul » (source officielle)

> **Source des symptômes** : PDF `Carte de paul MAJ 22.05.26.pdf` (**24 formulations à la
> 1re personne**). Présentation **fun d'abord** en **icônes cartoon**, **médicalement correct**
> → **relecture médicale légère** avant le build.
> **Décisions actées** : allergie = **à cliquer** ✅ · signes de gravité = **mécanique URGENCE** 🚨.

### ✅ À CLIQUER — symptômes (+1) — 15 items de la carte
- **Asthme :** Je tousse · J'ai besoin d'air · Je siffle quand je respire · Je me sens très essoufflé ·
  Je me sens oppressé · Je me sens serré · Je suis gêné après un effort physique ·
  J'arrête mon sport ou mon jeu · Je fais des bronchites · Je crache
- **Allergie (comptent aussi) :** J'éternue · J'ai les yeux qui piquent · Mon nez pique / coule · Ma gorge me pique
- **Autre (carte) :** Je suis fatigué *(présent sur la carte → compté ; non spécifique, à confirmer médicalement)*

### 🚨 À CLIQUER — signes de GRAVITÉ (+1 + effet URGENCE) — 8 items — *voir §5*
- J'ai du mal à parler · Je ne peux presque plus parler · Le spray bleu ne fonctionne pas ·
  J'ai les lèvres bleues · Mes idées s'embrouillent · Mon cœur bat vite · Je transpire · Je suis angoissé

### ❌ À ÉVITER — positif / non lié (−1) — **items ajoutés (hors carte)**
La carte ne fournit qu'**un seul** vrai « à éviter » (« je suis en forme »). Pour garder le **défi**
et donner du sens au **−1**, on **ajoute** un set de distracteurs (icônes cartoon, même voix « Je… »),
**à valider** :
- **Positifs / sains :** Je suis en forme *(carte)* · Je respire tranquillement · Je dors bien ·
  Je bois de l'eau · Je suis content · Je me sens calme
- **Non liés :** J'ai mal au ventre · J'ai mal aux dents · Je me suis cogné · J'ai faim
- **Écartés volontairement** (trop proches de vrais items) : tout ce qui touche à l'**effort/sport**
  (conflit avec « gêné après effort ») et le type « j'ai chaud » (conflit avec « je transpire »).

**Règle de tri appliquée** : tout item **présent sur la carte** est **à cliquer** (donc « je suis
fatigué » = +1) **sauf « je suis en forme »** (le positif). Les items **à éviter** sont **ajoutés hors carte**.
**À confirmer (relecture médicale) :** « je suis fatigué » en +1 · liste finale des distracteurs ajoutés.

## 5. Boucle de jeu (détails)

1. **Écran d'accueil** : titre, règles courtes, gros bouton **JOUER**
   (indispensable sur mobile pour débloquer le son + passer en plein écran).
2. **Jeu** : les items tombent du haut à vitesse croissante.
   - Tap sur symptôme → **+1**, feedback vert + son + vibration.
   - Tap sur intrus → **−1** (plancher à 0), feedback rouge.
   - Item qui touche le sol → pas de pénalité (garde le jeu non-bloquant).
3. **HUD** : jauge de progression **0 → 30** bien visible + score.
4. **Montée de difficulté** : intervalle de spawn ↓ et vitesse de chute ↑ avec le temps.
5. **Victoire (30 pts)** : révèle **le chiffre du joueur**, sa **position** et son
   **groupe (A ou B)**, avec la consigne « communique ton chiffre à ton équipe ».
   Affiche aussi le **rang S/A/B/C**, le **temps** et le **plus gros combo**.
6. **Rejouer** : possibilité de relancer si le joueur veut (ou en cas d'abandon).

### Mécanique « signe de gravité → URGENCE » 🚨
Quand un **signe de gravité** (lèvres bleues, spray bleu inefficace, ne peut plus parler,
idées embrouillées…) apparaît **et est tapé correctement** :
- **effet spécial** : flash rouge, son d'alerte, vibration marquée ;
- **message pédagogique** court : « URGENCE → spray + appelle les secours (15 / 112) » ;
- **récompense** : `+1` pour la progression comme les autres, **plus un bonus de style/combo**
  (récompense la vigilance sans raccourcir l'apprentissage) ;
- **apparition plus rare** que les symptômes normaux (ce sont des signes d'alerte).

## 6. Deux équipes — mais un jeu **IDENTIQUE**

- 2 équipes (ados & parents) qui jouent **exactement le même jeu** : même difficulté, même
  contenu, même rythme, même juice. **Aucun mode de difficulté.**
- Seule différence : **le set de QRCodes par équipe** sert à **attribuer les chiffres** du/des cadena(s).
  → paramètre `team` (ex. `?j=3&team=ados`) qui **ne change QUE le chiffre attribué**, jamais le gameplay.
- Chaque équipe de 8 assemble son code (2 groupes de 4). 2 cadenas possibles (1 par équipe) ou 1 partagé.
- Le **défi** vient du jeu lui-même (vitesse, distracteurs, juice, rang/temps) — identique pour tous, voir §7.

## 7. Défi & fun pour les ados (anti « trop nul / la flemme »)

> Le jeu est **le même pour tous**, mais c'est surtout côté **ados** qu'il faut éviter le
> « trop nul / la flemme ». Objectif : qu'ils **apprennent en s'amusant** sans le sentir.
> La reconnaissance des symptômes doit être **la compétence qui fait gagner**, pas un quiz plaqué.

- **Le cadena reste débloqué à 30 pts nets** (apprentissage garanti). Par-dessus, une couche
  « skill » **qui ne bloque pas** entretient la compétition :
  - **Combo / multiplicateur de série** : enchaîner sans erreur fait monter un compteur de style.
  - **Rang de fin S / A / B / C** (façon arcade) = vitesse + précision + plus gros combo. Pour la fierté. ✅ *retenu*
  - **Temps de complétion affiché** (« bouclé en 47 s ») → comparaison naturelle entre potes. ✅ *retenu*
  - 🚫 **Pas de classement live serveur** : on reste 100 % local pour garder le zéro-backend / gratuit.
- **Juice** (le point qui évite le « cheap ») : léger screen shake, particules, sons punchy,
  vibration, chiffres qui pop, freeze-frame sur gros combo.
- **Direction artistique** : arcade dark/néon, **PAS** un poster de prévention scolaire.
  Ton court, direct, un brin cheeky. **Zéro texte long** à lire, zéro ton moralisateur.
- **Pièges** : au rythme rapide, des items **positifs / sains** se glissent dans le flux →
  ne PAS taper par réflexe (c'est le **−1**). Et les **signes de gravité** demandent une
  réaction spéciale. Il faut *savoir* pour bien jouer (c'est là que passe l'apprentissage).
- **Escalade / vagues** : ça va de plus en plus vite, mini pic d'intensité (« boss wave ») vers la fin.
- **Social** : écran de fin partageable + classement (au moins verbal) des 8 de l'équipe.

## 8. Mécanisme du cadena

- 8 QRCodes **numérotés 1 à 8** par équipe (un par joueur ; 2 équipes = 2 sets).
- Chaque joueur qui gagne obtient **1 chiffre** + sa **position** dans le code.
- Assemblage : `[J1][J2][J3][J4]` = **code A**, `[J5][J6][J7][J8]` = **code B**.
- Matériel : **un cadena à 8 molettes** OU **deux cadenas de 4 chiffres** (au choix).
- Prévoir les **chiffres de secours** notés en poche (plan B si un téléphone lâche).

## 9. Points de vigilance

- 📱 **Mobile-first** : portrait, une main, grosses cibles tactiles, iOS Safari + Android Chrome.
- 🔊 **Audio** : ne se débloque qu'après une interaction utilisateur (bouton JOUER).
- 🌐 **Réseau** : prévoir une bonne couverture wifi/4G ; envisager une **PWA hors-ligne** (bonus).
- 🕵️ **Anti-triche** (optionnel) : l'URL ne contient que l'index, pas le chiffre ; on peut
  obfusquer davantage la table, mais l'enjeu reste faible pour un escape game.
- ♿ **Accessibilité** : contrastes, taille de police, feedback non uniquement basé sur la couleur.

---

## ✅ TODO

### Phase 0 — Cadrage & contenu
- [ ] **Relecture médicale légère** des **24 items** + de la répartition (allergie=cliquer, gravité=urgence actés)
- [x] ~~Trancher « je suis fatigué »~~ → **+1** (présent sur la carte) ; à confirmer en relecture médicale
- [ ] Rédiger + valider le **set de distracteurs** (positifs/sains + non liés, hors carte) pour le **−1**
- [x] **Icônes cartoon des 24 items** générées (SVG) → `assets/icons/` (+ `contact-sheet.png`, `preview.html`)
- [x] **Icônes des distracteurs** générées (9 SVG) → `assets/icons/` (+ `contact-sheet-distracteurs.png`)
- [ ] Définir la **table (équipe, joueur) → chiffre** (8 chiffres, 2 groupes de 4, par équipe)
- [ ] En déduire **code A** (joueurs 1-4) et **code B** (joueurs 5-8) pour chaque équipe
- [ ] Choisir/acheter le(s) **cadena(s)** (1×8 molettes ou 2×4 chiffres) et régler le(s) code(s)
- [ ] Prévoir **2 sets de QRCodes** (1 par équipe) — **même jeu**, seul le **chiffre attribué** diffère
- [ ] Rassembler les **assets libres de droits** : icônes/emoji par item, sons **punchy** de feedback

### Phase 1 — Setup projet ✅ (fait)
- [x] Projet **Angular 19** (standalone) à la racine + **Phaser 3.90** installé
- [x] `GameComponent` qui **monte une instance Phaser** dans une `<div>` (`src/app/game/`)
- [x] Config **responsive portrait** (Phaser `Scale.FIT` 450×800, autocenter)
- [x] **Paramètre joueur** `?j=` + **paramètre équipe** `?team=` lus dans `AppComponent`
- [x] Icônes servies depuis `public/icons/` — **build OK** + test HTTP (index/JS/icônes = 200)
- Lancer : `npm start` → http://localhost:4200/?team=ados&j=3   ·   build prod : `npm run build`
- ⚠️ Codes des cadenas = **placeholder** dans `src/app/game/config.ts` (`TEAM_CODES`)

### Phase 2 — Boucle de jeu (Phaser) ✅ (fait — `main-scene.ts` + `audio.ts`)
- [x] Scène principale : **spawn d'objets qui tombent** (symptômes + distracteurs)
- [x] **Détection du tap** (`pointerdown`) sur chaque objet
- [x] Logique de **score +1 / −1** (plancher à 0)
- [x] **Condition de victoire** à 30 points
- [x] **Montée de difficulté** progressive (vitesse de chute + fréquence de spawn)
- [x] **Distracteurs positifs/sains + non liés** dans le flux (gèrent le **−1**)
- [x] **Combo** + plus gros combo + **multiplicateur visuel** (HUD « Combo ×N » + pop paliers)
- [x] **Feedback juteux** : **son synthétisé** (Web Audio, zéro asset) + `navigator.vibrate` + anim + chiffres qui pop
- [x] **Juice** : **particules** à chaque bonne cible + **freeze-frame** (hit-stop) sur paliers/urgence
- [x] **Vagues / escalade** + **« DERNIÈRE VAGUE »** (boss burst) à l'approche des 30 pts
- [x] **URGENCE gravité** : flash rouge + shake + **message « spray + appelle le 15 »** + son d'alerte + **bonus de style** + apparition **plus rare** (~7 %)
- Vérifié en **navigateur headless (Chrome)** : canvas OK, tap/score OK, bannière URGENCE OK, **0 erreur console**.
- Reste (Phase 3) : rang S/A/B/C, plein écran, bouton Rejouer, DA aboutie.

### Phase 3 — UI / HUD (Angular) ✅ (fait — `game.component.ts`)
- [x] **Écran d'accueil** : règles courtes + bouton JOUER (débloque audio **+ plein écran**)
- [x] **HUD** : jauge 0→30 + score temps réel + **compteur de combo** + boutons son/recommencer
- [x] **Écran de victoire** : **rang S/A/B/C** stylé + **chiffre** + **groupe A/B** + joueur/équipe + temps + combo + erreurs
- [x] **Direction artistique** dark/néon (dégradés, halos, pop du chiffre/rang, CTA animé)
- [x] **Bouton Rejouer** (+ bouton ↺ en jeu pour recommencer / abandon)
- [x] Communication **Phaser ↔ Angular** (callbacks + `NgZone`)
- Bonus : **`?goal=N`** (défaut 30) pour régler l'objectif — pratique pour une **démo rapide**.
- Vérifié en **Chrome headless** : victoire → rang **B**, chiffre **4** (parents j6), groupe **B**, Rejouer OK, **0 erreur**.

### Phase 4 — QR & déploiement
- [ ] Mettre la **table de mapping** joueur → chiffre en config
- [ ] (Optionnel) **obfusquer** le chiffre / renforcer l'anti-triche
- [ ] `ng build` → vérifier le **base-href** pour l'hébergeur choisi
- [ ] **Déployer** en statique gratuit (GitHub Pages / Netlify / Cloudflare Pages)
- [ ] **Générer les QRCodes** — **2 sets** : équipe ados (`?j=1..8&team=ados`) et parents (`&team=parents`), **même jeu**, chiffres différents
- [ ] **Imprimer / plastifier** les QRCodes **numérotés 1 à 8**, bien distinguer les 2 équipes

### Phase 5 — Tests & jour J
- [ ] Tests **multi-appareils** : iOS Safari, Android Chrome, plusieurs tailles d'écran
- [ ] Test de **charge réseau** (8 téléphones en même temps sur le wifi du lieu)
- [ ] **Playtest avec de vrais ados** : valider le « c'est stylé » vs « trop nul / la flemme »
- [ ] **Équilibrage (jeu unique)** : assez relevé pour les ados **sans** frustrer les parents ; 30 pts en ~1-2 min
- [ ] Test du **flux complet** : scan → jeu → chiffre → assemblage → ouverture cadena
- [ ] Préparer le **plan B** (chiffres de secours notés, QR de rechange)

### Bonus (si le temps le permet)
- [ ] **PWA hors-ligne** (fonctionne même sans réseau une fois chargé)
- [ ] **Thème visuel** poumons / médical + habillage sonore
- [ ] **Multi-langue** (FR/EN)
- [ ] **Écran « chef d'équipe »** récapitulant les chiffres reçus
- [ ] Petit **tuto animé** de 3 s au premier lancement
