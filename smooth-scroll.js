/* ==========================================
   SMOOTH SCROLL Y GESTIÓN DE ANCLAS (LENIS)
   ========================================== */
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

    // Bucle de animación optimizado
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Conectar los enlaces del menú para que Lenis baje suavemente al hacer clic
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Evita el salto brusco por defecto del navegador
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          // Usa el método de Lenis para desplazarse de forma fluida hacia la sección
          lenis.scrollTo(targetElement, {
            offset: -70, // Ajusta este valor si quieres dejar espacio para tu header fijo
            duration: 1.2, // Velocidad específica para la transición del menú
          });
        }
      });
    });
  }
});