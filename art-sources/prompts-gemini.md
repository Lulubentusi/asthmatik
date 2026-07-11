# Prompts Gemini (Nano Banana 2) — cartes Asthmatik

## Mode d'emploi

1. **Ouvre une seule conversation** Gemini et commence par téléverser `tousse.png` avec ce message :
   > Voici le style de référence pour une série d'illustrations. Je vais te demander 33 images une par une : garde exactement le même style, le même personnage et le même rendu sticker pour toutes.
2. Génère ensuite les images **une par une** avec les prompts ci-dessous (chaque prompt est autonome).
3. Quota gratuit ≈ 20 images/jour → prévois 2 jours.
4. Enregistre chaque image sous le nom de son slug (ex. `besoin-air.png`) dans `art-sources/` — l'optimisation (256 px, coins arrondis) et l'intégration dans le jeu sont automatisées ensuite.
5. Si une image sort avec du texte ou un style qui dérive, réponds simplement : « Même image mais sans aucun texte » ou « Reprends le style de la première image ».

## Préambule commun (déjà inclus dans chaque prompt)

> Illustration manga/anime au trait encré net et couleurs avec trames discrètes, format carré. Personnage récurrent : un adolescent aux cheveux noirs ébouriffés portant un hoodie rayé gris clair et gris foncé. Rendu autocollant : personnage détouré par un épais contour blanc, arrière-plan de couloir d'école simple et flouté. Plan buste, composition centrée, très expressif, lisible en miniature. Aucun texte, aucune lettre, aucun chiffre, aucune onomatopée dans l'image.

---

## Symptômes à taper (good)

### 1. je-tousse *(optionnel : regénération sans les onomatopées anglaises)*
Illustration manga/anime au trait encré net et couleurs avec trames discrètes, format carré. Personnage récurrent : un adolescent aux cheveux noirs ébouriffés portant un hoodie rayé gris clair et gris foncé. Rendu autocollant : personnage détouré par un épais contour blanc, arrière-plan de couloir d'école simple et flouté. Plan buste, composition centrée, très expressif, lisible en miniature. Aucun texte, aucune lettre, aucun chiffre, aucune onomatopée dans l'image. Scène : il tousse fort, le poing devant la bouche, les yeux fermés, penché en avant, avec de petites gouttelettes et un petit nuage près de sa bouche.

### 2. besoin-air
Illustration manga/anime au trait encré net et couleurs avec trames discrètes, format carré. Personnage récurrent : un adolescent aux cheveux noirs ébouriffés portant un hoodie rayé gris clair et gris foncé. Rendu autocollant : personnage détouré par un épais contour blanc, arrière-plan de couloir d'école simple et flouté. Plan buste, composition centrée, très expressif, lisible en miniature. Aucun texte, aucune lettre, aucun chiffre, aucune onomatopée dans l'image. Scène : bouche grande ouverte cherchant désespérément de l'air, une main sur la poitrine, l'air aspiré visualisé par de petites spirales devant sa bouche, expression légèrement paniquée.

### 3. je-siffle
Illustration manga/anime au trait encré net et couleurs avec trames discrètes, format carré. Personnage récurrent : un adolescent aux cheveux noirs ébouriffés portant un hoodie rayé gris clair et gris foncé. Rendu autocollant : personnage détouré par un épais contour blanc, arrière-plan de couloir d'école simple et flouté. Plan buste, composition centrée, très expressif, lisible en miniature. Aucun texte, aucune lettre, aucun chiffre, aucune onomatopée dans l'image. Scène : une main sur la poitrine, bouche entrouverte, sa respiration sifflante visualisée par de petites notes de musique et des lignes ondulées devant sa bouche.

### 4. essouffle
Illustration manga/anime au trait encré net et couleurs avec trames discrètes, format carré. Personnage récurrent : un adolescent aux cheveux noirs ébouriffés portant un hoodie rayé gris clair et gris foncé. Rendu autocollant : personnage détouré par un épais contour blanc, arrière-plan de couloir d'école simple et flouté. Plan buste, composition centrée, très expressif, lisible en miniature. Aucun texte, aucune lettre, aucun chiffre, aucune onomatopée dans l'image. Scène : plié en deux, les mains sur les genoux, épuisé après une course, grosses gouttes de sueur et petits nuages de souffle près de sa bouche.

### 5. oppresse
Illustration manga/anime au trait encré net et couleurs avec trames discrètes, format carré. Personnage récurrent : un adolescent aux cheveux noirs ébouriffés portant un hoodie rayé gris clair et gris foncé. Rendu autocollant : personnage détouré par un épais contour blanc, arrière-plan de couloir d'école simple et flouté. Plan buste, composition centrée, très expressif, lisible en miniature. Aucun texte, aucune lettre, aucun chiffre, aucune onomatopée dans l'image. Scène : les deux mains crispées sur sa poitrine, expression douloureuse, la sensation d'écrasement représentée par une grosse pierre grise stylisée flottant au-dessus de sa poitrine.

### 6. serre
Illustration manga/anime au trait encré net et couleurs avec trames discrètes, format carré. Personnage récurrent : un adolescent aux cheveux noirs ébouriffés portant un hoodie rayé gris clair et gris foncé. Rendu autocollant : personnage détouré par un épais contour blanc, arrière-plan de couloir d'école simple et flouté. Plan buste, composition centrée, très expressif, lisible en miniature. Aucun texte, aucune lettre, aucun chiffre, aucune onomatopée dans l'image. Scène : il serre sa poitrine avec ses bras croisés comme s'il était comprimé, grimace, lignes de tension dessinées autour de son torse.

### 7. gene-effort
Illustration manga/anime au trait encré net et couleurs avec trames discrètes, format carré. Personnage récurrent : un adolescent aux cheveux noirs ébouriffés portant un hoodie rayé gris clair et gris foncé. Rendu autocollant : personnage détouré par un épais contour blanc, arrière-plan de couloir d'école simple et flouté. Plan buste, composition centrée, très expressif, lisible en miniature. Aucun texte, aucune lettre, aucun chiffre, aucune onomatopée dans l'image. Scène : en train de jouer au foot, un ballon au premier plan, il s'arrête en plein effort, une main sur la poitrine, essoufflé et en sueur.

### 8. arrete-sport
Illustration manga/anime au trait encré net et couleurs avec trames discrètes, format carré. Personnage récurrent : un adolescent aux cheveux noirs ébouriffés portant un hoodie rayé gris clair et gris foncé. Rendu autocollant : personnage détouré par un épais contour blanc, arrière-plan de couloir d'école simple et flouté. Plan buste, composition centrée, très expressif, lisible en miniature. Aucun texte, aucune lettre, aucun chiffre, aucune onomatopée dans l'image. Scène : assis sur un banc, un ballon posé à côté de lui, tête baissée et épaules tombantes, obligé d'abandonner son match, l'air déçu.

### 9. bronchites
Illustration manga/anime au trait encré net et couleurs avec trames discrètes, format carré. Personnage récurrent : un adolescent aux cheveux noirs ébouriffés portant un hoodie rayé gris clair et gris foncé. Rendu autocollant : personnage détouré par un épais contour blanc, arrière-plan de couloir d'école simple et flouté. Plan buste, composition centrée, très expressif, lisible en miniature. Aucun texte, aucune lettre, aucun chiffre, aucune onomatopée dans l'image. Scène : malade, emmitouflé dans une écharpe et une couverture, joues rouges de fièvre, l'air abattu, une main sur la poitrine.

### 10. je-crache
Illustration manga/anime au trait encré net et couleurs avec trames discrètes, format carré. Personnage récurrent : un adolescent aux cheveux noirs ébouriffés portant un hoodie rayé gris clair et gris foncé. Rendu autocollant : personnage détouré par un épais contour blanc, arrière-plan de couloir d'école simple et flouté. Plan buste, composition centrée, très expressif, lisible en miniature. Aucun texte, aucune lettre, aucun chiffre, aucune onomatopée dans l'image. Scène : penché en avant, il crache, quelques gouttelettes vertes stylisées près de sa bouche, une main devant la bouche, expression incommodée.

## Allergie et fatigue (good)

### 11. eternue
Illustration manga/anime au trait encré net et couleurs avec trames discrètes, format carré. Personnage récurrent : un adolescent aux cheveux noirs ébouriffés portant un hoodie rayé gris clair et gris foncé. Rendu autocollant : personnage détouré par un épais contour blanc, arrière-plan de couloir d'école simple et flouté. Plan buste, composition centrée, très expressif, lisible en miniature. Aucun texte, aucune lettre, aucun chiffre, aucune onomatopée dans l'image. Scène : en plein éternuement explosif, tête rejetée en arrière, yeux fermés, fines gouttelettes projetées devant lui, un mouchoir dans la main.

### 12. yeux-piquent
Illustration manga/anime au trait encré net et couleurs avec trames discrètes, format carré. Personnage récurrent : un adolescent aux cheveux noirs ébouriffés portant un hoodie rayé gris clair et gris foncé. Rendu autocollant : personnage détouré par un épais contour blanc, arrière-plan de couloir d'école simple et flouté. Plan buste, composition centrée, très expressif, lisible en miniature. Aucun texte, aucune lettre, aucun chiffre, aucune onomatopée dans l'image. Scène : il se frotte les yeux avec les poings, yeux rouges et larmoyants, petites étoiles d'irritation stylisées autour de ses yeux.

### 13. nez-coule
Illustration manga/anime au trait encré net et couleurs avec trames discrètes, format carré. Personnage récurrent : un adolescent aux cheveux noirs ébouriffés portant un hoodie rayé gris clair et gris foncé. Rendu autocollant : personnage détouré par un épais contour blanc, arrière-plan de couloir d'école simple et flouté. Plan buste, composition centrée, très expressif, lisible en miniature. Aucun texte, aucune lettre, aucun chiffre, aucune onomatopée dans l'image. Scène : le nez rouge qui coule, une goutte au bout du nez, il tient un mouchoir sous son nez, l'air incommodé.

### 14. gorge-pique
Illustration manga/anime au trait encré net et couleurs avec trames discrètes, format carré. Personnage récurrent : un adolescent aux cheveux noirs ébouriffés portant un hoodie rayé gris clair et gris foncé. Rendu autocollant : personnage détouré par un épais contour blanc, arrière-plan de couloir d'école simple et flouté. Plan buste, composition centrée, très expressif, lisible en miniature. Aucun texte, aucune lettre, aucun chiffre, aucune onomatopée dans l'image. Scène : une main sur la gorge, grimace de gêne, bouche entrouverte, petites étincelles rouges stylisées autour de sa gorge pour figurer le picotement.

### 15. fatigue
Illustration manga/anime au trait encré net et couleurs avec trames discrètes, format carré. Personnage récurrent : un adolescent aux cheveux noirs ébouriffés portant un hoodie rayé gris clair et gris foncé. Rendu autocollant : personnage détouré par un épais contour blanc, arrière-plan de couloir d'école simple et flouté. Plan buste, composition centrée, très expressif, lisible en miniature. Aucun texte, aucune lettre, aucun chiffre, aucune onomatopée dans l'image. Scène : épuisé, paupières lourdes à moitié fermées, cernes marqués, épaules affaissées, en plein bâillement, petites bulles de sommeil flottant près de sa tête.

## Signes de gravité (gravity)

### 16. mal-parler
Illustration manga/anime au trait encré net et couleurs avec trames discrètes, format carré. Personnage récurrent : un adolescent aux cheveux noirs ébouriffés portant un hoodie rayé gris clair et gris foncé. Rendu autocollant : personnage détouré par un épais contour blanc, arrière-plan de couloir d'école simple et flouté. Plan buste, composition centrée, très expressif, lisible en miniature. Aucun texte, aucune lettre, aucun chiffre, aucune onomatopée dans l'image. Scène : il essaie de parler mais n'y arrive pas, une main sur la gorge, l'autre main tendue, une bulle de bande dessinée entièrement vide au-dessus de lui, expression inquiète.

### 17. plus-parler
Illustration manga/anime au trait encré net et couleurs avec trames discrètes, format carré. Personnage récurrent : un adolescent aux cheveux noirs ébouriffés portant un hoodie rayé gris clair et gris foncé. Rendu autocollant : personnage détouré par un épais contour blanc, arrière-plan de couloir d'école simple et flouté. Plan buste, composition centrée, très expressif, lisible en miniature. Aucun texte, aucune lettre, aucun chiffre, aucune onomatopée dans l'image. Scène : bouche entrouverte incapable d'émettre un son, les deux mains sur la gorge, une bulle de bande dessinée vide barrée d'une grande croix rouge au-dessus de lui, expression de détresse.

### 18. spray-ko
Illustration manga/anime au trait encré net et couleurs avec trames discrètes, format carré. Personnage récurrent : un adolescent aux cheveux noirs ébouriffés portant un hoodie rayé gris clair et gris foncé. Rendu autocollant : personnage détouré par un épais contour blanc, arrière-plan de couloir d'école simple et flouté. Plan buste, composition centrée, très expressif, lisible en miniature. Aucun texte, aucune lettre, aucun chiffre, aucune onomatopée dans l'image. Scène : il regarde d'un air paniqué son inhalateur bleu pour l'asthme qu'il tient à la main, rien n'en sort, une grande croix rouge stylisée flotte à côté de l'inhalateur.

### 19. levres-bleues
Illustration manga/anime au trait encré net et couleurs avec trames discrètes, format carré. Personnage récurrent : un adolescent aux cheveux noirs ébouriffés portant un hoodie rayé gris clair et gris foncé. Rendu autocollant : personnage détouré par un épais contour blanc, arrière-plan de couloir d'école simple et flouté. Plan buste, composition centrée, très expressif, lisible en miniature. Aucun texte, aucune lettre, aucun chiffre, aucune onomatopée dans l'image. Scène : gros plan sur son visage pâle avec les lèvres nettement teintées de bleu, il touche ses lèvres du bout des doigts, expression inquiète, petit flocon stylisé près du visage.

### 20. idees-embrouillees
Illustration manga/anime au trait encré net et couleurs avec trames discrètes, format carré. Personnage récurrent : un adolescent aux cheveux noirs ébouriffés portant un hoodie rayé gris clair et gris foncé. Rendu autocollant : personnage détouré par un épais contour blanc, arrière-plan de couloir d'école simple et flouté. Plan buste, composition centrée, très expressif, lisible en miniature. Aucun texte, aucune lettre, aucun chiffre, aucune onomatopée dans l'image. Scène : l'air confus et étourdi, yeux en spirale, il se tient le front, un gribouillis emmêlé stylisé flotte au-dessus de sa tête.

### 21. coeur-vite
Illustration manga/anime au trait encré net et couleurs avec trames discrètes, format carré. Personnage récurrent : un adolescent aux cheveux noirs ébouriffés portant un hoodie rayé gris clair et gris foncé. Rendu autocollant : personnage détouré par un épais contour blanc, arrière-plan de couloir d'école simple et flouté. Plan buste, composition centrée, très expressif, lisible en miniature. Aucun texte, aucune lettre, aucun chiffre, aucune onomatopée dans l'image. Scène : une main plaquée sur son cœur, expression inquiète, un gros cœur rouge stylisé battant très fort à côté de sa poitrine avec des traits de vibration.

### 22. transpire
Illustration manga/anime au trait encré net et couleurs avec trames discrètes, format carré. Personnage récurrent : un adolescent aux cheveux noirs ébouriffés portant un hoodie rayé gris clair et gris foncé. Rendu autocollant : personnage détouré par un épais contour blanc, arrière-plan de couloir d'école simple et flouté. Plan buste, composition centrée, très expressif, lisible en miniature. Aucun texte, aucune lettre, aucun chiffre, aucune onomatopée dans l'image. Scène : le visage couvert de grosses gouttes de sueur, il s'essuie le front avec sa manche, l'air mal à l'aise, auréoles d'humidité sur le hoodie.

### 23. angoisse
Illustration manga/anime au trait encré net et couleurs avec trames discrètes, format carré. Personnage récurrent : un adolescent aux cheveux noirs ébouriffés portant un hoodie rayé gris clair et gris foncé. Rendu autocollant : personnage détouré par un épais contour blanc, arrière-plan de couloir d'école simple et flouté. Plan buste, composition centrée, très expressif, lisible en miniature. Aucun texte, aucune lettre, aucun chiffre, aucune onomatopée dans l'image. Scène : recroquevillé, les bras serrés autour de lui, yeux écarquillés, tremblant, petites lignes de tremblement et ombre bleutée d'anxiété autour de lui.

## À éviter : positif / sain (avoid)

### 24. en-forme
Illustration manga/anime au trait encré net et couleurs avec trames discrètes, format carré. Personnage récurrent : un adolescent aux cheveux noirs ébouriffés portant un hoodie rayé gris clair et gris foncé. Rendu autocollant : personnage détouré par un épais contour blanc, arrière-plan de couloir d'école simple et flouté. Plan buste, composition centrée, très expressif, lisible en miniature. Aucun texte, aucune lettre, aucun chiffre, aucune onomatopée dans l'image. Scène : souriant et plein d'énergie, bras fléchi montrant fièrement son biceps, clin d'œil, petites étoiles d'énergie autour de lui.

### 25. respire-calme
Illustration manga/anime au trait encré net et couleurs avec trames discrètes, format carré. Personnage récurrent : un adolescent aux cheveux noirs ébouriffés portant un hoodie rayé gris clair et gris foncé. Rendu autocollant : personnage détouré par un épais contour blanc, arrière-plan de couloir d'école simple et flouté. Plan buste, composition centrée, très expressif, lisible en miniature. Aucun texte, aucune lettre, aucun chiffre, aucune onomatopée dans l'image. Scène : les yeux fermés, sourire paisible, une main posée doucement sur la poitrine, il inspire calmement, petites feuilles et douces volutes d'air autour de lui.

### 26. dors-bien
Illustration manga/anime au trait encré net et couleurs avec trames discrètes, format carré. Personnage récurrent : un adolescent aux cheveux noirs ébouriffés portant un hoodie rayé gris clair et gris foncé. Rendu autocollant : personnage détouré par un épais contour blanc, arrière-plan de chambre nocturne simple et flouté. Plan buste, composition centrée, très expressif, lisible en miniature. Aucun texte, aucune lettre, aucun chiffre, aucune onomatopée dans l'image. Scène : profondément endormi sur un oreiller moelleux, sourire aux lèvres, couverture remontée, un croissant de lune et de petites bulles de sommeil flottant au-dessus de lui.

### 27. bois-eau
Illustration manga/anime au trait encré net et couleurs avec trames discrètes, format carré. Personnage récurrent : un adolescent aux cheveux noirs ébouriffés portant un hoodie rayé gris clair et gris foncé. Rendu autocollant : personnage détouré par un épais contour blanc, arrière-plan de couloir d'école simple et flouté. Plan buste, composition centrée, très expressif, lisible en miniature. Aucun texte, aucune lettre, aucun chiffre, aucune onomatopée dans l'image. Scène : il boit joyeusement un grand verre d'eau fraîche, gouttes de condensation sur le verre, l'air désaltéré et content.

### 28. content
Illustration manga/anime au trait encré net et couleurs avec trames discrètes, format carré. Personnage récurrent : un adolescent aux cheveux noirs ébouriffés portant un hoodie rayé gris clair et gris foncé. Rendu autocollant : personnage détouré par un épais contour blanc, arrière-plan de couloir d'école simple et flouté. Plan buste, composition centrée, très expressif, lisible en miniature. Aucun texte, aucune lettre, aucun chiffre, aucune onomatopée dans l'image. Scène : immense sourire lumineux, yeux pétillants, poings levés de joie, petites étoiles et éclats de joie autour de lui.

### 29. calme
Illustration manga/anime au trait encré net et couleurs avec trames discrètes, format carré. Personnage récurrent : un adolescent aux cheveux noirs ébouriffés portant un hoodie rayé gris clair et gris foncé. Rendu autocollant : personnage détouré par un épais contour blanc, arrière-plan de couloir d'école simple et flouté. Plan buste, composition centrée, très expressif, lisible en miniature. Aucun texte, aucune lettre, aucun chiffre, aucune onomatopée dans l'image. Scène : assis en tailleur, détendu, yeux fermés, mains posées sur les genoux, expression sereine, ambiance douce et apaisée.

## À éviter : non lié (avoid)

### 30. mal-ventre
Illustration manga/anime au trait encré net et couleurs avec trames discrètes, format carré. Personnage récurrent : un adolescent aux cheveux noirs ébouriffés portant un hoodie rayé gris clair et gris foncé. Rendu autocollant : personnage détouré par un épais contour blanc, arrière-plan de couloir d'école simple et flouté. Plan buste, composition centrée, très expressif, lisible en miniature. Aucun texte, aucune lettre, aucun chiffre, aucune onomatopée dans l'image. Scène : plié en avant, les deux mains sur le ventre, grimace de douleur, petites spirales de douleur stylisées au niveau du ventre.

### 31. mal-dents
Illustration manga/anime au trait encré net et couleurs avec trames discrètes, format carré. Personnage récurrent : un adolescent aux cheveux noirs ébouriffés portant un hoodie rayé gris clair et gris foncé. Rendu autocollant : personnage détouré par un épais contour blanc, arrière-plan de couloir d'école simple et flouté. Plan buste, composition centrée, très expressif, lisible en miniature. Aucun texte, aucune lettre, aucun chiffre, aucune onomatopée dans l'image. Scène : une main plaquée sur sa joue gonflée, grimace de douleur, un petit éclair rouge stylisé près de sa joue.

### 32. cogne
Illustration manga/anime au trait encré net et couleurs avec trames discrètes, format carré. Personnage récurrent : un adolescent aux cheveux noirs ébouriffés portant un hoodie rayé gris clair et gris foncé. Rendu autocollant : personnage détouré par un épais contour blanc, arrière-plan de couloir d'école simple et flouté. Plan buste, composition centrée, très expressif, lisible en miniature. Aucun texte, aucune lettre, aucun chiffre, aucune onomatopée dans l'image. Scène : il se frotte une grosse bosse sur le front, grimace, petites étoiles stylisées tournant autour de sa tête.

### 33. faim
Illustration manga/anime au trait encré net et couleurs avec trames discrètes, format carré. Personnage récurrent : un adolescent aux cheveux noirs ébouriffés portant un hoodie rayé gris clair et gris foncé. Rendu autocollant : personnage détouré par un épais contour blanc, arrière-plan de couloir d'école simple et flouté. Plan buste, composition centrée, très expressif, lisible en miniature. Aucun texte, aucune lettre, aucun chiffre, aucune onomatopée dans l'image. Scène : une main sur son ventre, il regarde avec envie une assiette vide qu'il tient avec une fourchette, expression affamée, petit nuage stylisé au-dessus de son ventre.
