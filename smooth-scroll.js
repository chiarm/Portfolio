document.addEventListener('DOMContentLoaded', () => {
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      lerp: 0.2,
      wheelMultiplier: 1,
      smoothWheel: true,
      sync: true,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          lenis.scrollTo(targetElement, {
            offset: -70,
            duration: 1.2,
          });
        }
      });
    });
  }
});
