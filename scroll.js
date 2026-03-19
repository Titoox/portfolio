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
  document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
  }, { passive: true });

  document.querySelectorAll('a, button, .carte-projet, .carte-competence').forEach(el => {
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
      document.body.style.overflow = '';
    }
  }, { passive: true });
}
