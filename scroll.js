// scroll.js v4 — perf optimized
// IntersectionObserver avec threshold pour éviter les triggers inutiles
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

// Bouton retour en haut
const boutonHaut = document.getElementById("bouton-haut");
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const scrolled = document.documentElement.scrollTop > 20;
      boutonHaut.style.display = scrolled ? "flex" : "none";
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

function topFunction() {
  document.documentElement.scrollTop = 0;
}

// Curseur simple — direct transform, 0 lag, 0 ring
const cursor = document.getElementById('cursor');
if (cursor) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
  }, { passive: true });

  // Hover sur éléments interactifs
  document.querySelectorAll('a, button, .carte-projet, .carte-competence').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });

  // Masquer hors de la fenêtre
  document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; });
}
