(function () {
  /* CURSOR */
  const cursor = document.getElementById('custom-cursor');
  const cursorBlur = document.getElementById('cursor-blur');

  if (cursor && cursorBlur) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      cursorBlur.style.left = `${e.clientX}px`;
      cursorBlur.style.top = `${e.clientY}px`;
    });

    document.addEventListener('mouseenter', (e) => {
      const target = e.target;
      const isInteractive = target.matches('a, button, input, .project-card, .skill-card, .bg-toggle-btn, .theme-toggle-btn') ||
        target.closest('a, button, .project-card, .skill-card');

      if (isInteractive) {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.backgroundColor = isLight ? '#510da0' : '#f5c2e7';
      }
    }, true);

    document.addEventListener('mouseleave', (e) => {
      const target = e.target;
      const isInteractive = target.matches('a, button, input, .project-card, .skill-card, .bg-toggle-btn, .theme-toggle-btn') ||
        target.closest('a, button, .project-card, .skill-card');

      if (isInteractive) {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        cursor.style.width = '10px';
        cursor.style.height = '10px';
        cursor.style.backgroundColor = isLight ? '#400a7f' : '#94e2d5';
      }
    }, true);
  }

  /* BG TOGGLE */
  const toggleBgBtn = document.getElementById('toggle-bg-btn');
  const toggleBgText = document.getElementById('toggle-bg-text');

  function getBgActive() {
    return typeof window.isBgActive === 'function' ? window.isBgActive() : true;
  }

  if (toggleBgBtn) {
    if (!getBgActive()) {
      toggleBgBtn.classList.add('disabled');
      if (toggleBgText) toggleBgText.textContent = 'OFF';
    }

    toggleBgBtn.addEventListener('click', () => {
      if (getBgActive()) {
        stopCanvasAnimation();
        toggleBgBtn.classList.add('disabled');
        if (toggleBgText) toggleBgText.textContent = 'OFF';
        localStorage.setItem('bg_active', 'false');
      } else {
        startCanvasAnimation();
        toggleBgBtn.classList.remove('disabled');
        if (toggleBgText) toggleBgText.textContent = 'ON';
        localStorage.setItem('bg_active', 'true');
      }
    });
  }

  /* MOBILE MENU */
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu');

  if (menuBtn && navMenu) {
    let menuOpen = false;

    menuBtn.addEventListener('click', () => {
      menuOpen = !menuOpen;
      navMenu.classList.toggle('open', menuOpen);
      menuBtn.setAttribute('aria-expanded', String(menuOpen));
      const icon = menuBtn.querySelector('i');
      if (icon) {
        icon.setAttribute('data-lucide', menuOpen ? 'x' : 'menu');
        if (typeof lucide !== 'undefined') lucide.createIcons();
      }
    });

    navMenu.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        menuOpen = false;
        navMenu.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        const icon = menuBtn.querySelector('i');
        if (icon) {
          icon.setAttribute('data-lucide', 'menu');
          if (typeof lucide !== 'undefined') lucide.createIcons();
        }
      });
    });
  }

  /* COPY EMAIL */
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-copy-email]');
    if (!btn) return;

    const email = 'adrianteeeen@gmail.com';
    const copyText = btn.querySelector('.copy-text');
    const original = copyText ? copyText.textContent : '';

    navigator.clipboard.writeText(email).then(() => {
      if (copyText) copyText.textContent = '¡Email Copiado!';

      const origBg = btn.style.backgroundColor;
      const origColor = btn.style.color;
      const origBorder = btn.style.borderColor;

      btn.style.backgroundColor = '#94e2d5';
      btn.style.color = '#000000';
      btn.style.borderColor = '#94e2d5';

      setTimeout(() => {
        if (copyText) copyText.textContent = original;
        btn.style.backgroundColor = origBg;
        btn.style.color = origColor;
        btn.style.borderColor = origBorder;
      }, 2000);
    });
  });
})();
