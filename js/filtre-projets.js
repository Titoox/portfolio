/* Filtre des projets : Tous / Avec l'IA / Fait main (GSAP, sans animation si prefers-reduced-motion) */
(() => {
  const grille = document.getElementById('projets-grille');
  const statut = document.getElementById('filtre-statut');
  const boutons = document.querySelectorAll('.filtre-bouton');
  if (!grille || !boutons.length) return;

  const cartes = [...grille.querySelectorAll('.carte-projet')];
  const reduit = window.matchMedia('(prefers-reduced-motion: reduce)');
  const libelles = { tous: 'tous les projets', ia: "projets avec l'IA", main: 'projets faits main' };
  let filtreActuel = 'tous';

  const visibles = (f) => cartes.filter((c) => f === 'tous' || c.dataset.type === f);

  const afficher = (f) => {
    const cibles = visibles(f);
    grille.dataset.filtre = f;
    cartes.forEach((c) => { c.hidden = !cibles.includes(c); });
    cibles.forEach((c) => c.classList.add('show'));
    return cibles;
  };

  const appliquer = (f) => {
    if (f === filtreActuel) return;
    filtreActuel = f;
    boutons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filtre === f)));

    const sortantes = cartes.filter((c) => !c.hidden);
    const fini = (cibles) => {
      statut.textContent = `Filtre : ${libelles[f]} (${cibles.length})`;
    };

    if (reduit.matches || !window.gsap) {
      fini(afficher(f));
      return;
    }

    gsap.killTweensOf(cartes);
    gsap.to(sortantes, {
      opacity: 0, y: 12, duration: 0.18, ease: 'power1.in',
      onComplete: () => {
        const cibles = afficher(f);
        gsap.fromTo(cibles,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', stagger: 0.06,
            clearProps: 'opacity,transform' });
        fini(cibles);
      },
    });
  };

  boutons.forEach((b) => b.addEventListener('click', () => appliquer(b.dataset.filtre)));
})();
