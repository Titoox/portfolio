/* ================================================================
   scroll.js — Animations au défilement + bouton "retour en haut"
   ──────────────────────────────────────────────────────────────
   Ce fichier gère 2 fonctionnalités :
   ① L'animation d'apparition des éléments quand on défile
   ② Le bouton qui permet de remonter en haut de la page
================================================================ */


/* ================================================================
   ① ANIMATION D'APPARITION AU DÉFILEMENT
   ──────────────────────────────────────────────────────────────
   Objectif : les éléments avec la classe "scroll" sont invisibles
   au départ (définis dans scroll.css), puis apparaissent avec une
   animation quand ils entrent dans l'écran.

   On utilise l'API IntersectionObserver : un "observateur" qui
   surveille si un élément est visible dans la fenêtre du navigateur.
================================================================ */

// On crée un nouvel observateur.
// La fonction entre parenthèses s'exécute à chaque changement de visibilité.
// "entries" = tableau de tous les éléments observés.
const observateur = new IntersectionObserver((entries) => {

  // On parcourt chaque élément observé
  entries.forEach((element) => {

    // isIntersecting = true si l'élément est visible dans l'écran
    if (element.isIntersecting) {

      // L'élément entre dans l'écran → on ajoute la classe "show"
      // La classe "show" (définie dans scroll.css) déclenche l'animation
      element.target.classList.add('show');

    } else {

      // L'élément sort de l'écran → on enlève "show"
      // L'animation se réinitialise pour la prochaine fois
      element.target.classList.remove('show');

    }
  });

});


// On sélectionne TOUS les éléments HTML qui ont la classe "scroll"
// querySelectorAll retourne une liste (NodeList) de tous ces éléments
const elementsAnimes = document.querySelectorAll('.scroll');

// Pour chaque élément trouvé, on le "confie" à l'observateur
// Il va surveiller quand cet élément entre/sort de l'écran
elementsAnimes.forEach((el) => observateur.observe(el));


/* ================================================================
   ② BOUTON "RETOUR EN HAUT DE PAGE"
   ──────────────────────────────────────────────────────────────
   Objectif : un bouton flèche apparaît quand on a défilé vers le bas.
   En cliquant dessus, on remonte tout en haut de la page.
================================================================ */

// On récupère le bouton HTML par son id "bouton-haut"
// getElementById cherche un élément par son attribut id=""
let boutonHaut = document.getElementById("bouton-haut");


// window.onscroll = une fonction qui s'exécute à CHAQUE mouvement de défilement
// "window" = la fenêtre du navigateur (l'objet global)
window.onscroll = function () {
  afficherBouton(); // On appelle notre fonction à chaque scroll
};


// Cette fonction vérifie si on a défilé de plus de 20px
// Si oui : on montre le bouton / Si non : on le cache
function afficherBouton() {

  // document.body.scrollTop = défilement sur anciens navigateurs
  // document.documentElement.scrollTop = défilement sur les navigateurs modernes
  // On vérifie les deux pour être compatible partout
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {

    // On a défilé → le bouton devient visible (block = affiché comme un bloc)
    boutonHaut.style.display = "block";

  } else {

    // On est en haut → le bouton disparaît
    boutonHaut.style.display = "none";

  }
}


// Cette fonction est appelée dans le HTML : onclick="topFunction()"
// Elle remet le défilement à 0 (= remonte tout en haut)
function topFunction() {

  // On remet le défilement de la page à 0
  document.body.scrollTop = 0;             // Pour Safari
  document.documentElement.scrollTop = 0; // Pour Chrome, Firefox, IE, Opera

}
