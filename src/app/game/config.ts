/** Constantes de jeu + tables d'attribution des chiffres du cadena. */

export const GOAL = 30; // points à atteindre pour débloquer le chiffre

/**
 * Chiffre attribué à chaque joueur, par équipe.
 * 8 joueurs -> index 1..8. Joueurs 1-4 = code A, joueurs 5-8 = code B.
 * ⚠️ PLACEHOLDER : remplacer par les vrais codes des cadenas avant le jour J.
 */
export const TEAM_CODES: Record<string, number[]> = {
  //          j1 j2 j3 j4 | j5 j6 j7 j8   (codeA | codeB)
  ados:    [1, 2, 3, 4, 5, 6, 7, 8],
  parents: [9, 8, 7, 6, 5, 4, 3, 2],
};

export function digitFor(team: string, playerIndex: number): number | null {
  const table = TEAM_CODES[team] ?? TEAM_CODES['ados'];
  if (playerIndex < 1 || playerIndex > table.length) return null;
  return table[playerIndex - 1];
}

/** Groupe du code : joueurs 1-4 = A, 5-8 = B. */
export function groupOf(playerIndex: number): 'A' | 'B' {
  return playerIndex <= 4 ? 'A' : 'B';
}

export type Rank = 'S' | 'A' | 'B' | 'C';

/** Rang arcade de fin, basé sur précision (erreurs), rapidité et plus gros combo. */
export function computeRank(p: { badTaps: number; timeSec: number; bestCombo: number }): Rank {
  const { badTaps, timeSec, bestCombo } = p;
  if (badTaps <= 1 && timeSec <= 45 && bestCombo >= 15) return 'S';
  if (badTaps <= 3 && timeSec <= 70 && bestCombo >= 8) return 'A';
  if (badTaps <= 6 && timeSec <= 110) return 'B';
  return 'C';
}
