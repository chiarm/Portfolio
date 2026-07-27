/* ==========================================
   CURSOR NEÓN PERSONALIZADO FLUIDO
   ========================================== */
const cursor = document.getElementById('custom-cursor');
const cursorBlur = document.getElementById('cursor-blur');

if (cursor && cursorBlur) {
    document.addEventListener('mousemove', (e) => {
        // Posicionamiento exacto
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        
        cursorBlur.style.left = `${e.clientX}px`;
        cursorBlur.style.top = `${e.clientY}px`;
    });

    // Efecto de expansión al pasar sobre botones y enlaces
    const interactiveElements = document.querySelectorAll('a, button, input, .project-card, .skill-card');

    interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.backgroundColor = '#818cf8';
        });

        el.addEventListener('mouseleave', () => {
            cursor.style.width = '10px';
            cursor.style.height = '10px';
            cursor.style.backgroundColor = '#38bdf8';
        });
    });
}
/* ==========================================
   2. COPIAR EMAIL AL PORTAPAPELES
   ========================================== */
function copyEmail(button) {
    const email = "adrianteeeen@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
        const copyTextElement = button.querySelector('.copy-text');
        const originalText = copyTextElement ? copyTextElement.innerText : button.innerText;
        
        if (copyTextElement) {
            copyTextElement.innerText = "¡Email Copiado!";
        } else {
            button.innerText = "¡Email Copiado!";
        }
        
        button.style.borderColor = "#34d399";
        button.style.color = "#34d399";

        setTimeout(() => {
            if (copyTextElement) {
                copyTextElement.innerText = originalText;
            } else {
                button.innerText = originalText;
            }
            button.style.borderColor = "";
            button.style.color = "";
        }, 2000);
    });
}

/* ==========================================
   3. TERMINAL INTERACTIVA
   ========================================== */
const terminalInput = document.getElementById('terminal-input');
const terminalBody = document.getElementById('terminal-body');

if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = terminalInput.value.trim().toLowerCase();
            processCommand(command);
            terminalInput.value = '';
        }
    });
}

function processCommand(cmd) {
    // Añadir línea de lo que escribió el usuario
    const userLine = document.createElement('p');
    userLine.className = 'term-line';
    userLine.innerHTML = `<span class="prompt">&gt; ${escapeHtml(cmd)}</span>`;
    terminalBody.appendChild(userLine);

    const response = document.createElement('p');
    response.className = 'term-line';

    switch (cmd) {
        case 'help':
            response.innerHTML = `Comandos disponibles:<br>
            - <span class="highlight">skills</span>: Muestra el stack principal.<br>
            - <span class="highlight">contact</span>: Muestra los datos de contacto.<br>
            - <span class="highlight">cert</span>: Ver la certificación oficial.<br>
            - <span class="highlight">clear</span>: Limpiar la pantalla.`;
            break;
        case 'skills':
            response.innerHTML = `Stack: Java | Spring Boot | Angular | Python (PCEPT™) | PostgreSQL | Kubernetes`;
            break;
        case 'contact':
            response.innerHTML = `Email: adrianteeeen@gmail.com | Tel: +34 629 96 88 07 | Ubicación: Badajoz, España`;
            break;
        case 'cert':
            response.innerHTML = `Certificación Oficial: Certified Entry-Level Python Programmer (PCEPT™) por Python Institute.`;
            break;
        case 'clear':
            terminalBody.innerHTML = '<p class="term-line">Escribe <span class="highlight">\'help\'</span> para ver la lista de comandos disponibles.</p>';
            return;
        case '':
            return;
        default:
            response.innerHTML = `Comando no reconocido: '${escapeHtml(cmd)}'. Escribe <span class="highlight">'help'</span>.`;
            break;
    }

    terminalBody.appendChild(response);
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

function escapeHtml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}