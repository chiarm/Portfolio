function toggleTheme() {
  const themeStylesheet = document.getElementById('theme-stylesheet');
  const icon = document.getElementById('theme-icon');
  
  // Comprobar si actualmente estamos en modo oscuro
  const isDark = themeStylesheet.getAttribute('href') === 'styles.css';
  
  if (isDark) {
    // Cambiar a Modo Día
    themeStylesheet.setAttribute('href', 'styles-light.css');
    if (icon) icon.innerText = '🌚';
    localStorage.setItem('theme', 'light');
    if (typeof updateCanvasTheme === 'function') updateCanvasTheme('light');
  } else {
    // Cambiar a Modo Noche
    themeStylesheet.setAttribute('href', 'styles.css');
    if (icon) icon.innerText = '🌞';
    localStorage.setItem('theme', 'dark');
    if (typeof updateCanvasTheme === 'function') updateCanvasTheme('dark');
  }
}

// Cargar la preferencia guardada al iniciar
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  const themeStylesheet = document.getElementById('theme-stylesheet');
  const icon = document.getElementById('theme-icon');
  
  if (savedTheme === 'light') {
    themeStylesheet.setAttribute('href', 'styles-light.css');
    if (icon) icon.innerText = '🌚';
  } else {
    themeStylesheet.setAttribute('href', 'styles.css');
    if (icon) icon.innerText = '🌞';
  }
});