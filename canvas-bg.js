const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 70; // Cantidad de nodos cibernéticos
const maxDistance = 120;  // Distancia máxima para conectar líneas
let animationFrameId = null;
let isBgActive = true;

let mouse = {
    x: null,
    y: null,
    radius: 150
};

// Ajustar tamaño del Canvas al cambiar la pantalla
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

// Clase Partícula / Nodo
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
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < mouse.radius) {
                let angle = Math.atan2(dy, dx);
                let force = (mouse.radius - distance) / mouse.radius;
                this.x -= Math.cos(angle) * force * 3;
                this.y -= Math.sin(angle) * force * 3;
            }
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#f5c2e7'; // Verde acento
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
            let dx = particles[i].x - particles[j].x;
            let dy = particles[i].y - particles[j].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
                let opacity = 1 - (distance / maxDistance);
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(116, 199, 187, ${opacity * 0.25})`; // Verde 500
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }
}

// Bucle de animación
function animate() {
    if (!isBgActive) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    connectParticles();
    animationFrameId = requestAnimationFrame(animate);
}

// Funciones globales para activar / desactivar desde el botón
function stopCanvasAnimation() {
    isBgActive = false;
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function startCanvasAnimation() {
    if (!isBgActive) {
        isBgActive = true;
        animate();
    }
}

// Cargar preferencia guardada o iniciar por defecto
const savedBgPref = localStorage.getItem('bg_active');

initCanvas();

if (savedBgPref === 'false') {
    isBgActive = false;
} else {
    animate();
}
// Agrega esta función a tu canvas-bg.js existente para soportar el cambio dinámico de color:
let nodeColor = '#f5c2e7';
let lineColor = '116, 199, 187';

// Ajuste de tonos para alta visibilidad y dinamismo según el modo
function updateCanvasTheme(theme) {
    if (theme === 'light') {
        // Verde bosque brillante y opacidad equilibrada para fondo claro
        nodeColor = '#510da0';       
        lineColor = '81, 13, 160';
    } else {
        // Verde neón brillante para modo oscuro
        nodeColor = '#f5c2e7';       
        lineColor = '116, 199, 187';
    }
}

// Sincronizar tema inicial del canvas
if (localStorage.getItem('theme') === 'light') {
    updateCanvasTheme('light');
}

// En la función draw() de Particle dentro de canvas-bg.js, usa nodeColor:
// ctx.fillStyle = nodeColor;

// En connectParticles(), usa lineColor:
// ctx.strokeStyle = `rgba(${lineColor}, ${opacity * 0.25})`;