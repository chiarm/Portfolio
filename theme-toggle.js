(function () {
  const STORAGE_KEY = 'theme';
  const html = document.documentElement;
  const icon = document.getElementById('theme-icon');

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    if (icon) icon.textContent = theme === 'light' ? '🌚' : '🌞';
    if (typeof updateCanvasTheme === 'function') updateCanvasTheme(theme);
  }

  function toggleTheme() {
    const current = html.getAttribute('data-theme') || 'dark';
    setTheme(current === 'dark' ? 'light' : 'dark');
  }

  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'light' || saved === 'dark') {
    setTheme(saved);
  }

  const btn = document.getElementById('theme-toggle');
  if (btn) btn.addEventListener('click', toggleTheme);

  window.toggleTheme = toggleTheme;
})();
