/* ================================================================
   scroll.css — Styles pour les animations d'apparition + bouton haut
   ──────────────────────────────────────────────────────────────
   Ce fichier travaille EN TANDEM avec scroll.js :
   - scroll.js AJOUTE ou ENLÈVE la classe "show" sur les éléments
   - scroll.css DÉFINIT à quoi ressemble un élément avec ou sans "show"
================================================================ */


/* ================================================================
   ÉTAT INITIAL — Élément CACHÉ
   ──────────────────────────────────────────────────────────────
   Tout élément avec la classe "scroll" commence invisible
   et décalé vers la gauche.
   La "transition" détermine comment le changement vers "show" s'anime.
================================================================ */
.scroll {
  opacity   : 0;                   /* Invisible (0 = transparent, 1 = opaque) */
  filter    : blur(8px);           /* Flou visuel */
  transform : translateX(-80px);   /* Décalé de 80px vers la gauche */

  /* La transition s'applique quand on PASSE de .scroll à .show */
  /* "opacity 0.8s ease-in-out" = l'opacité change en 0.8 seconde */
  /* "filter 0.8s" et "transform 0.8s" = le flou et le décalage aussi */
  transition :
    opacity   0.8s ease-in-out,
    filter    0.8s ease-in-out,
    transform 0.8s ease-in-out;
}


/* ================================================================
   ÉTAT FINAL — Élément VISIBLE
   ──────────────────────────────────────────────────────────────
   Quand scroll.js ajoute la classe "show", l'élément revient
   à son état normal : visible, net, et à sa position d'origine.
   La transition CSS crée l'animation entre les deux états.
================================================================ */
.show {
  opacity   : 1;             /* Complètement visible */
  filter    : blur(0);       /* Plus de flou */
  transform : translateX(0); /* Revient à sa position normale */
}


/* ================================================================
   ACCESSIBILITÉ — Préférence "mouvement réduit"
   ──────────────────────────────────────────────────────────────
   Certains utilisateurs activent "Réduire les animations" dans leurs
   paramètres système (car les animations peuvent causer des malaises).
   Cette media query désactive les transitions pour eux.
================================================================ */
@media (prefers-reduced-motion) {
  .scroll {
    transition : none; /* Aucune animation = apparition immédiate */
  }
}


/* ================================================================
   BOUTON "RETOUR EN HAUT"
   ──────────────────────────────────────────────────────────────
   Bouton fixe en bas à droite de l'écran.
   Il est caché par défaut (display:none dans le HTML ou via JS).
   scroll.js le rend visible quand on défile vers le bas.
================================================================ */
#bouton-haut {
  display       : none;    /* Caché par défaut (JS le montre quand nécessaire) */
  position      : fixed;   /* Reste à la même position même en défilant */
  bottom        : 60px;    /* 60px depuis le bas de l'écran */
  right         : 30px;    /* 30px depuis la droite */
  z-index       : 99;      /* Par-dessus le contenu, mais sous le header (999) */
  background    : transparent;
  border        : none;
  cursor        : pointer;
  padding       : 12px;
  border-radius : 8px;
  transition    : background-color 0.2s ease;
}

/* La flèche SVG à l'intérieur du bouton est blanche */
#bouton-haut svg {
  fill : var(--violet); /* La flèche est violette */
}

/* Fond violet semi-transparent au survol */
#bouton-haut:hover {
  background-color : rgba(122, 102, 209, 0.15);
  border-radius    : 50%; /* Devient rond au survol */
}
