// EchoGrid Cyberpunk Interface System

// System initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log('%c[ECHOGRID] System initializing...', 'color: #00ffff; font-family: monospace;');
    
    // Initialize cyber systems
    initCyberInterface();
    initMatrixEffects();
    initTerminalEffects();
    initSystemSounds();
    initTerminalEmulator();
    
    // Boot sequence
    setTimeout(() => {
        console.log('%c[ECHOGRID] All systems online. Welcome to the Grid.', 'color: #00ff41; font-family: monospace;');
    }, 2000);
});

// Cyber Interface initialization
function initCyberInterface() {
    const buttons = document.querySelectorAll('.cyber-button');
    
    buttons.forEach(button => {
        // Add hover sound effect placeholder
        button.addEventListener('mouseenter', function() {
            // Placeholder for hover sound
            console.log('[AUDIO] Interface hover detected');
        });
        
        // Button click handlers
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const buttonText = this.querySelector('.button-text').textContent;
            
            if (buttonText === 'INITIALIZE') {
                initSystemCheck();
            } else if (buttonText === 'TERMINAL') {
                // Terminal button is handled separately in initTerminalEmulator()
                return;
            }
            
            // Add click effect
            addClickEffect(this);
        });
    });
}

// Grid entry sequence
function initGridEntry() {
    console.log('%c[SYSTEM] Initiating grid entry protocol...', 'color: #00ffff; font-family: monospace;');
    
    // Create matrix rain effect
    createMatrixRain();
    
    // Simulate loading
    const loadingMessages = [
        'Establishing connection...',
        'Authenticating credentials...',
        'Loading neural interface...',
        'Grid access granted.'
    ];
    
    let messageIndex = 0;
    const interval = setInterval(() => {
        console.log(`%c[GRID] ${loadingMessages[messageIndex]}`, 'color: #00ff41; font-family: monospace;');
        messageIndex++;
        
        if (messageIndex >= loadingMessages.length) {
            clearInterval(interval);
            showWelcomeMessage();
        }
    }, 1500);
}

// System initialization check - Launch Tron Light Cycles
function initSystemCheck() {
    console.log('%c[SYSTEM] Initializing Tron Light Cycle Grid...', 'color: #ff6600; font-family: monospace;');
    
    // Create and launch the light cycle simulation
    const lightCycles = new TronLightCycles();
    lightCycles.initialize();
}

// Matrix visual effects
function initMatrixEffects() {
    // Add glitch effect to title
    const title = document.querySelector('.cyber-title');
    if (title) {
        setInterval(() => {
            if (Math.random() > 0.95) {
                title.style.textShadow = '2px 0 #ff0000, -2px 0 #00ffff';
                setTimeout(() => {
                    title.style.textShadow = '';
                }, 100);
            }
        }, 100);
    }
    
    // Animate status values
    animateStatusValues();
}

// Animate status display values
function animateStatusValues() {
    const statusValues = document.querySelectorAll('.status-value');
    
    statusValues.forEach((value, index) => {
        setTimeout(() => {
            const originalText = value.textContent;
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let iterations = 0;
            
            const interval = setInterval(() => {
                value.textContent = originalText
                    .split('')
                    .map((char, charIndex) => {
                        if (charIndex < iterations) {
                            return originalText[charIndex];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('');
                
                if (iterations >= originalText.length) {
                    clearInterval(interval);
                    value.textContent = originalText;
                }
                
                iterations += 1/3;
            }, 30);
        }, index * 500);
    });
}

// Terminal effects
function initTerminalEffects() {
    const commands = [
        'system.initialize()',
        'grid.connect()',
        'neural.link.establish()',
        'security.protocols.active()',
        'welcome.user()'
    ];
    
    let commandIndex = 0;
    const terminalCommand = document.querySelector('.command');
    
    if (terminalCommand) {
        setInterval(() => {
            terminalCommand.textContent = commands[commandIndex];
            commandIndex = (commandIndex + 1) % commands.length;
        }, 3000);
    }
}

// Click effect animation
function addClickEffect(element) {
    element.style.transform = 'scale(0.95)';
    element.style.filter = 'brightness(1.5)';
    
    setTimeout(() => {
        element.style.transform = '';
        element.style.filter = '';
    }, 150);
}

// Matrix rain effect
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.1';
    
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charArray = chars.split('');
    
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ffff';
        ctx.font = `${fontSize}px monospace`;
        
        for (let i = 0; i < drops.length; i++) {
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    const matrixInterval = setInterval(drawMatrix, 35);
    
    // Remove after 10 seconds
    setTimeout(() => {
        clearInterval(matrixInterval);
        document.body.removeChild(canvas);
    }, 10000);
}

// Welcome message system
function showWelcomeMessage() {
    const messages = [
        'Grid connection established.',
        'Neural interface synchronized.',
        'Welcome to EchoGrid, User.',
        'The digital realm awaits your command.'
    ];
    
    messages.forEach((message, index) => {
        setTimeout(() => {
            console.log(`%c[WELCOME] ${message}`, 'color: #00ff41; font-family: monospace; font-size: 14px;');
        }, index * 1000);
    });
}

// System sounds (placeholder for future audio implementation)
function initSystemSounds() {
    // Placeholder for Web Audio API implementation
    console.log('%c[AUDIO] Sound system initialized (silent mode)', 'color: #666; font-family: monospace;');
}

// Cyber utilities
const CyberUtils = {
    // Generate random cyber text
    generateCyberText: function(length = 10) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        return Array.from({length}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    },
    
    // Glitch text effect
    glitchText: function(element, duration = 1000) {
        const originalText = element.textContent;
        const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        
        const glitchInterval = setInterval(() => {
            element.textContent = originalText
                .split('')
                .map(char => Math.random() > 0.8 ? chars[Math.floor(Math.random() * chars.length)] : char)
                .join('');
        }, 50);
        
        setTimeout(() => {
            clearInterval(glitchInterval);
            element.textContent = originalText;
        }, duration);
    },
    
    // Create particle effect
    createParticleEffect: function(x, y) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = '#00ffff';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.boxShadow = '0 0 10px #00ffff';
        particle.style.zIndex = '1000';
        
        document.body.appendChild(particle);
        
        // Animate particle
        particle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${(Math.random() - 0.5) * 200}px, ${(Math.random() - 0.5) * 200}px) scale(0)`, opacity: 0 }
        ], {
            duration: 1000,
            easing: 'ease-out'
        }).onfinish = () => {
            document.body.removeChild(particle);
        };
    }
};

// Enhanced interaction system
document.addEventListener('DOMContentLoaded', function() {
    // Add particle effects on click
    document.addEventListener('click', function(e) {
        CyberUtils.createParticleEffect(e.clientX, e.clientY);
        
        // Console logging with cyber style
        if (e.target.matches('button')) {
            console.log(`%c[USER_INPUT] Button activated: ${e.target.textContent}`, 'color: #ff6600; font-family: monospace;');
        }
    });
    
    // Konami code easter egg
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up, Up, Down, Down, Left, Right, Left, Right, B, A
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.keyCode);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
            console.log('%c[EASTER_EGG] Konami Code Detected! Activating enhanced cyber mode...', 'color: #ff00ff; font-family: monospace; font-size: 16px;');
            document.body.style.animation = 'cyberPulse 2s infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 10000);
        }
    });
    
    // Window resize handler for responsive effects
    window.addEventListener('resize', function() {
        // Regenerate particles if needed
        console.log('%c[SYSTEM] Interface adapted to new dimensions', 'color: #00ffff; font-family: monospace;');
    });
});

// Export cyber utilities
if (typeof window !== 'undefined') {
    window.CyberUtils = CyberUtils;
}





// Add CSS animation for easter egg
const style = document.createElement('style');
style.textContent = `
@keyframes cyberPulse {
    0%, 100% { 
        filter: hue-rotate(0deg) brightness(1); 
    }
    25% { 
        filter: hue-rotate(90deg) brightness(1.2); 
    }
    50% { 
        filter: hue-rotate(180deg) brightness(1.5); 
    }
    75% { 
        filter: hue-rotate(270deg) brightness(1.2); 
    }
}
`;
document.head.appendChild(style);