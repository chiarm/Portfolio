(function () {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  const particleCount = 70;
  const maxDistance = 120;
  let animationFrameId = null;
  let isBgActive = true;

  const mouse = { x: null, y: null, radius: 150 };

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });
  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.radius = 2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

      if (mouse.x && mouse.y) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
          const angle = Math.atan2(dy, dx);
          const force = (mouse.radius - distance) / mouse.radius;
          this.x -= Math.cos(angle) * force * 3;
          this.y -= Math.sin(angle) * force * 3;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = nodeColor;
      ctx.fill();
    }
  }

  function initCanvas() {
    resizeCanvas();
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          const opacity = 1 - distance / maxDistance;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${lineColor}, ${opacity * 0.25})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    if (!isBgActive) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => { p.update(); p.draw(); });
    connectParticles();
    animationFrameId = requestAnimationFrame(animate);
  }

  window.isBgActive = function () { return isBgActive; };

  window.stopCanvasAnimation = function () {
    isBgActive = false;
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  window.startCanvasAnimation = function () {
    if (!isBgActive) {
      isBgActive = true;
      animate();
    }
  };

  let nodeColor = '#f5c2e7';
  let lineColor = '116, 199, 187';

  window.updateCanvasTheme = function (theme) {
    if (theme === 'light') {
      nodeColor = '#510da0';
      lineColor = '81, 13, 160';
    } else {
      nodeColor = '#f5c2e7';
      lineColor = '116, 199, 187';
    }
  };

  if (localStorage.getItem('theme') === 'light') {
    updateCanvasTheme('light');
  }

  /* PAGE VISIBILITY API */
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (isBgActive && animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    } else {
      if (isBgActive && !animationFrameId) {
        animate();
      }
    }
  });

  const savedBgPref = localStorage.getItem('bg_active');
  initCanvas();

  if (savedBgPref === 'false') {
    isBgActive = false;
  } else {
    animate();
  }
})();
