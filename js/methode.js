/* Bloc « Ma méthode avec l'IA » : les 4 étapes apparaissent en décalé au scroll (GSAP).
   Sans animation si prefers-reduced-motion ou si GSAP est absent. */
(() => {
  const bloc = document.getElementById('methode');
  if (!bloc || !window.gsap) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const etapes = bloc.querySelectorAll('.methode-etape');
  gsap.set(etapes, { opacity: 0, y: 24 });

  const obs = new IntersectionObserver((entrees) => {
    if (!entrees.some((e) => e.isIntersecting)) return;
    obs.disconnect();
    gsap.to(etapes, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.12, clearProps: 'opacity,transform' });
  }, { threshold: 0.25 });
  obs.observe(bloc);
})();
