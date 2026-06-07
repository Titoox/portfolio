/* scroll.js v4 responsive — IntersectionObserver + hamburger + curseur + scroll */

/* ── 1. Scroll reveal ── */
const observateur = new IntersectionObserver((entries) => {
  entries.forEach((el) => {
    if (el.isIntersecting) {
      el.target.classList.add('show');
    } else {
      el.target.classList.remove('show');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.scroll, .scroll-left, .scroll-right')
  .forEach(el => observateur.observe(el));


/* ── 2. Bouton retour en haut ── */
const boutonHaut = document.getElementById("bouton-haut");
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const scrolled = document.documentElement.scrollTop > 20;
      if (boutonHaut) boutonHaut.style.display = scrolled ? "flex" : "none";
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

function topFunction() {
  document.documentElement.scrollTop = 0;
}


/* ── 3. Curseur personnalisé (desktop uniquement) ── */
const cursor = document.getElementById('cursor');
const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

if (cursor && !isTouch) {
  /* Appliquer cursor:none uniquement quand le curseur custom est actif */
  document.body.style.cursor = 'none';

  document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
  }, { passive: true });

  document.querySelectorAll('a, button, .carte-projet, .carte-competence, .stack-pilule').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });

  document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; });
} else if (cursor) {
  cursor.style.display = 'none';
}


/* ── 4. Hamburger menu ── */
const navToggle = document.getElementById('nav-toggle');
const navigation = document.querySelector('.navigation');

if (navToggle && navigation) {
  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.classList.toggle('open');
    navigation.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
    // Bloquer le scroll body quand menu ouvert
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Fermer au clic sur un lien
  navigation.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navigation.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Fermer si resize vers desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
      navToggle.classList.remove('open');
      navigation.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false'); /* Sync accessibilité au resize */
      document.body.style.overflow = '';
    }
  }, { passive: true });
}


// ===== Effet carte holographique : inclinaison 3D + lueur qui suit la souris =====
const cartesHolo = document.querySelectorAll('.profil-stat');
const animationReduite = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// On n'active l'effet que si l'utilisateur n'a pas demandé de réduire les animations
if (!animationReduite) {
  cartesHolo.forEach(carte => {
    carte.addEventListener('mousemove', evenement => {
      const rectangle = carte.getBoundingClientRect();
      const positionX = evenement.clientX - rectangle.left;
      const positionY = evenement.clientY - rectangle.top;

      const centreX = rectangle.width / 2;
      const centreY = rectangle.height / 2;

      // Plus le curseur s'éloigne du centre, plus la carte penche (diviseur = douceur)
      const rotationX = (positionY - centreY) / 12;
      const rotationY = (centreX - positionX) / 12;

      carte.style.transform =
        `perspective(800px) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;

      // Position de la lueur du curseur (--x/--y) pour le dégradé radial du fond
      const pourcentX = (positionX / rectangle.width) * 100;
      const pourcentY = (positionY / rectangle.height) * 100;
      carte.style.setProperty('--x', pourcentX + '%');
      carte.style.setProperty('--y', pourcentY + '%');

      // Position du reflet métallique (--bg-x/--bg-y) : il balaie la carte à l'inverse
      carte.style.setProperty('--bg-x', pourcentX + '%');
      carte.style.setProperty('--bg-y', pourcentY + '%');
    });

    // Au départ de la souris : la carte revient à plat, lueur et reflet se recentrent
    carte.addEventListener('mouseleave', () => {
      carte.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
      carte.style.setProperty('--x', '50%');
      carte.style.setProperty('--y', '50%');
      carte.style.setProperty('--bg-x', '50%');
      carte.style.setProperty('--bg-y', '50%');
    });
  });

  // Cartes empilées en éventail : le bord lumineux suit le curseur le long de la bordure.
  // On pose --x/--y (en pixels) sur la boîte de survol ; le bord ::before s'en sert.
  const cartesPile = document.querySelectorAll('.carte-pile');
  cartesPile.forEach(carte => {
    carte.addEventListener('mousemove', evenement => {
      const rectangle = carte.getBoundingClientRect();
      const positionX = evenement.clientX - rectangle.left;
      const positionY = evenement.clientY - rectangle.top;
      carte.style.setProperty('--x', positionX + 'px');
      carte.style.setProperty('--y', positionY + 'px');
    });
    carte.addEventListener('mouseleave', () => {
      carte.style.setProperty('--x', '50%');
      carte.style.setProperty('--y', '50%');
    });
  });
}
