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

// Terminal Emulator System
function initTerminalEmulator() {
    const terminal = new CyberTerminal();
    
    // Open terminal button
    const openBtn = document.getElementById('openTerminal');
    if (openBtn) {
        openBtn.addEventListener('click', () => {
            terminal.open();
        });
    }
    
    // Close terminal button
    const closeBtn = document.getElementById('closeTerminal');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            terminal.close();
        });
    }
}

// Cyber Terminal Class
class CyberTerminal {
    constructor() {
        this.element = document.getElementById('terminalEmulator');
        this.output = document.getElementById('terminalOutput');
        this.input = document.getElementById('terminalInput');
        this.currentPath = '/home/user';
        this.commandHistory = [];
        this.historyIndex = -1;
        
        // Fake file system structure
        this.fileSystem = {
            '/': {
                type: 'directory',
                contents: {
                    'home': { type: 'directory', contents: {
                        'user': { type: 'directory', contents: {
                            'documents': { type: 'directory', contents: {
                                'readme.txt': { type: 'file', content: 'Welcome to EchoGrid Terminal!\nThis is a simulated Linux environment.' },
                                'secrets.txt': { type: 'file', content: 'ACCESS_CODE: ECHO-GRID-2025\nGRID_KEY: CY83R-N3TW0RK' }
                            }},
                            'projects': { type: 'directory', contents: {
                                'echogrid.py': { type: 'file', content: '#!/usr/bin/env python3\nprint("Welcome to EchoGrid!")' },
                                'matrix.sh': { type: 'file', content: '#!/bin/bash\necho "Entering the Matrix..."' }
                            }},
                            'config': { type: 'directory', contents: {
                                '.bashrc': { type: 'file', content: 'export PATH=$PATH:/usr/local/bin\nalias ll="ls -la"' },
                                'system.conf': { type: 'file', content: '[SYSTEM]\nmode=cyberpunk\ntheme=tron\ngrid_access=enabled' }
                            }}
                        }}
                    }},
                    'etc': { type: 'directory', contents: {
                        'passwd': { type: 'file', content: 'root:x:0:0:root:/root:/bin/bash\nuser:x:1000:1000:EchoGrid User:/home/user:/bin/bash' },
                        'hostname': { type: 'file', content: 'echogrid-matrix' }
                    }},
                    'usr': { type: 'directory', contents: {
                        'bin': { type: 'directory', contents: {
                            'nano': { type: 'executable' },
                            'vim': { type: 'executable' },
                            'python3': { type: 'executable' },
                            'node': { type: 'executable' }
                        }}
                    }},
                    'var': { type: 'directory', contents: {
                        'log': { type: 'directory', contents: {
                            'system.log': { type: 'file', content: '[2025-10-31 12:00:01] System boot complete\n[2025-10-31 12:00:02] EchoGrid services online' }
                        }}
                    }}
                }
            }
        };
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Handle input
        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const command = this.input.value.trim();
                if (command) {
                    this.executeCommand(command);
                    this.commandHistory.push(command);
                    this.historyIndex = this.commandHistory.length;
                }
                this.input.value = '';
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (this.historyIndex > 0) {
                    this.historyIndex--;
                    this.input.value = this.commandHistory[this.historyIndex];
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (this.historyIndex < this.commandHistory.length - 1) {
                    this.historyIndex++;
                    this.input.value = this.commandHistory[this.historyIndex];
                } else {
                    this.historyIndex = this.commandHistory.length;
                    this.input.value = '';
                }
            }
        });
        
        // Close on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.element.classList.contains('active')) {
                this.close();
            }
        });
    }
    
    open() {
        this.element.classList.add('active');
        setTimeout(() => {
            this.input.focus();
        }, 300);
    }
    
    close() {
        this.element.classList.remove('active');
    }
    
    addOutput(text, className = 'result') {
        const line = document.createElement('div');
        line.className = `output-line ${className}`;
        line.textContent = text;
        this.output.appendChild(line);
        this.scrollToBottom();
    }
    
    addCommandEcho(command) {
        const line = document.createElement('div');
        line.className = 'output-line command';
        line.innerHTML = `<span style="color: var(--neon-green)">user@echogrid:${this.currentPath}$</span> ${command}`;
        this.output.appendChild(line);
        this.scrollToBottom();
    }
    
    scrollToBottom() {
        this.output.scrollTop = this.output.scrollHeight;
    }
    
    executeCommand(command) {
        this.addCommandEcho(command);
        
        const parts = command.split(' ');
        const cmd = parts[0];
        const args = parts.slice(1);
        
        switch (cmd) {
            case 'help':
                this.showHelp();
                break;
            case 'ls':
                this.listDirectory(args);
                break;
            case 'cd':
                this.changeDirectory(args[0] || '/home/user');
                break;
            case 'pwd':
                this.addOutput(this.currentPath);
                break;
            case 'cat':
                this.displayFile(args[0]);
                break;
            case 'whoami':
                this.addOutput('user');
                break;
            case 'date':
                this.addOutput(new Date().toString());
                break;
            case 'uname':
                this.addOutput('EchoGrid Linux 5.15.0-echogrid x86_64');
                break;
            case 'ps':
                this.showProcesses();
                break;
            case 'df':
                this.showDiskUsage();
                break;
            case 'top':
                this.addOutput('System monitor not available in this environment', 'error');
                break;
            case 'echo':
                this.addOutput(args.join(' '));
                break;
            case 'clear':
                this.clearOutput();
                break;
            case 'history':
                this.showHistory();
                break;
            case 'matrix':
                this.runMatrix();
                break;
            case 'hack':
                this.runHackSequence();
                break;
            case 'grid':
                this.showGridStatus();
                break;
            case 'exit':
                this.close();
                break;
            default:
                this.addOutput(`Command not found: ${cmd}`, 'error');
                this.addOutput('Type "help" for available commands', 'result');
        }
    }
    
    showHelp() {
        const commands = [
            'Available Commands:',
            '  help     - Show this help message',
            '  ls       - List directory contents',
            '  cd       - Change directory',
            '  pwd      - Print working directory',
            '  cat      - Display file contents',
            '  whoami   - Display current user',
            '  date     - Show current date/time',
            '  uname    - System information',
            '  ps       - Show processes',
            '  df       - Show disk usage',
            '  echo     - Display text',
            '  clear    - Clear terminal',
            '  history  - Show command history',
            '  matrix   - Run matrix simulation',
            '  hack     - Initiate hack sequence',
            '  grid     - Show grid status',
            '  exit     - Close terminal'
        ];
        commands.forEach(cmd => this.addOutput(cmd));
    }
    
    listDirectory(args) {
        const path = this.resolvePath(args[0] || this.currentPath);
        const dir = this.getDirectoryContents(path);
        
        if (!dir) {
            this.addOutput(`ls: cannot access '${args[0] || '.'}': No such file or directory`, 'error');
            return;
        }
        
        Object.keys(dir).forEach(name => {
            const item = dir[name];
            if (item.type === 'directory') {
                this.addOutput(name + '/', 'success');
            } else {
                this.addOutput(name);
            }
        });
    }
    
    changeDirectory(path) {
        const newPath = this.resolvePath(path);
        const dir = this.getDirectoryContents(newPath);
        
        if (dir) {
            this.currentPath = newPath;
            this.updatePrompt();
        } else {
            this.addOutput(`cd: no such file or directory: ${path}`, 'error');
        }
    }
    
    displayFile(filename) {
        if (!filename) {
            this.addOutput('cat: missing file operand', 'error');
            return;
        }
        
        const filePath = this.resolvePath(filename);
        const file = this.getFile(filePath);
        
        if (file && file.type === 'file') {
            file.content.split('\n').forEach(line => {
                this.addOutput(line);
            });
        } else {
            this.addOutput(`cat: ${filename}: No such file or directory`, 'error');
        }
    }
    
    showProcesses() {
        const processes = [
            'PID    COMMAND',
            '1      systemd',
            '2      kthreadd',
            '150    sshd',
            '1337   echogrid-daemon',
            '2025   matrix-engine',
            '3141   cyber-guardian'
        ];
        processes.forEach(proc => this.addOutput(proc));
    }
    
    showDiskUsage() {
        const usage = [
            'Filesystem     1K-blocks    Used Available Use% Mounted on',
            '/dev/sda1       1048576  524288    524288  50% /',
            '/dev/sda2       2097152  419430   1677722  20% /home',
            'echogrid-fs     4194304 1048576   3145728  25% /grid'
        ];
        usage.forEach(line => this.addOutput(line));
    }
    
    showHistory() {
        this.commandHistory.forEach((cmd, index) => {
            this.addOutput(`${index + 1}  ${cmd}`);
        });
    }
    
    runMatrix() {
        const matrixLines = [
            'Initializing Matrix Protocol...',
            'Loading neural pathways...',
            'Connecting to the Grid...',
            'Reality.exe has stopped working',
            'Welcome to the Matrix'
        ];
        
        matrixLines.forEach((line, index) => {
            setTimeout(() => {
                this.addOutput(line, 'success');
            }, index * 800);
        });
    }
    
    runHackSequence() {
        const hackLines = [
            'INITIATING HACK SEQUENCE...',
            'Scanning for vulnerabilities...',
            'Found 42 open ports',
            'Exploiting buffer overflow...',
            'Bypassing firewall...',
            'Accessing mainframe...',
            'Download complete: secret_files.zip',
            'Covering tracks...',
            'HACK COMPLETE - You are now l33t!'
        ];
        
        hackLines.forEach((line, index) => {
            setTimeout(() => {
                this.addOutput(line, index < hackLines.length - 1 ? 'result' : 'success');
            }, index * 500);
        });
    }
    
    showGridStatus() {
        const status = [
            'ECHOGRID SYSTEM STATUS:',
            '========================',
            'Grid Status: ONLINE',
            'Neural Links: 2,048 active',
            'Data Flow: 1.21 TB/s',
            'Security Level: MAXIMUM',
            'Last Breach: Never detected',
            'Uptime: 1337 days'
        ];
        status.forEach(line => this.addOutput(line, 'success'));
    }
    
    clearOutput() {
        this.output.innerHTML = '';
    }
    
    updatePrompt() {
        const promptSpan = this.element.querySelector('.terminal-prompt');
        if (promptSpan) {
            promptSpan.textContent = `user@echogrid:${this.currentPath}$ `;
        }
    }
    
    resolvePath(path) {
        if (!path || path === '.') return this.currentPath;
        if (path === '..') {
            const parts = this.currentPath.split('/').filter(p => p);
            parts.pop();
            return '/' + parts.join('/');
        }
        if (path.startsWith('/')) return path;
        return this.currentPath === '/' ? `/${path}` : `${this.currentPath}/${path}`;
    }
    
    getDirectoryContents(path) {
        const parts = path.split('/').filter(p => p);
        let current = this.fileSystem['/'];
        
        for (const part of parts) {
            if (current.contents && current.contents[part] && current.contents[part].type === 'directory') {
                current = current.contents[part];
            } else {
                return null;
            }
        }
        
        return current.contents;
    }
    
    getFile(path) {
        const parts = path.split('/').filter(p => p);
        const filename = parts.pop();
        const dirPath = '/' + parts.join('/');
        const dir = this.getDirectoryContents(dirPath);
        
        return dir && dir[filename] ? dir[filename] : null;
    }
}

// Tron Light Cycles Game
class TronLightCycles {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.gameContainer = null;
        this.isRunning = false;
        this.animationId = null;
        
        // Game settings
        this.gridSize = 400;
        this.cellSize = 4;
        this.speed = 80; // milliseconds between moves
        
        // Light cycles
        this.cycles = [
            {
                x: 50, y: 200, dx: 1, dy: 0,
                color: '#00ffff', name: 'PLAYER 1',
                trail: [], alive: true
            },
            {
                x: 350, y: 200, dx: -1, dy: 0,
                color: '#ff6600', name: 'PLAYER 2',
                trail: [], alive: true
            }
        ];
        
        this.lastUpdate = 0;
    }
    
    initialize() {
        this.createGameContainer();
        this.setupCanvas();
        this.showInitSequence();
    }
    
    createGameContainer() {
        // Remove existing container if any
        const existing = document.getElementById('tronGameContainer');
        if (existing) existing.remove();
        
        this.gameContainer = document.createElement('div');
        this.gameContainer.id = 'tronGameContainer';
        this.gameContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            z-index: 2000;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-family: 'Orbitron', monospace;
            color: #00ffff;
        `;
        
        document.body.appendChild(this.gameContainer);
    }
    
    setupCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.gridSize;
        this.canvas.height = this.gridSize;
        this.canvas.style.cssText = `
            border: 2px solid #00ffff;
            box-shadow: 0 0 30px #00ffff, inset 0 0 20px rgba(0, 255, 255, 0.1);
            background: #000011;
        `;
        
        this.ctx = this.canvas.getContext('2d');
        
        // Add title
        const title = document.createElement('h2');
        title.textContent = 'TRON LIGHT CYCLE ARENA';
        title.style.cssText = `
            margin-bottom: 20px;
            font-size: 2rem;
            text-shadow: 0 0 20px #00ffff;
            animation: tronGlow 2s ease-in-out infinite alternate;
        `;
        
        // Add controls info
        const controls = document.createElement('div');
        controls.innerHTML = `
            <div style="margin-top: 20px; text-align: center; color: #00ff41;">
                <p>INITIALIZING LIGHT CYCLE GRID...</p>
                <p style="margin-top: 10px; font-size: 0.9rem; color: #666;">Press ESC to exit</p>
            </div>
        `;
        
        this.gameContainer.appendChild(title);
        this.gameContainer.appendChild(this.canvas);
        this.gameContainer.appendChild(controls);
        
        // Add styles
        if (!document.getElementById('tronStyles')) {
            const style = document.createElement('style');
            style.id = 'tronStyles';
            style.textContent = `
                @keyframes tronGlow {
                    from { text-shadow: 0 0 20px #00ffff; }
                    to { text-shadow: 0 0 40px #00ffff, 0 0 60px #00ffff; }
                }
                @keyframes tronPulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.7; }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Handle ESC key
        this.handleKeyboard();
    }
    
    handleKeyboard() {
        const keyHandler = (e) => {
            if (e.key === 'Escape') {
                this.destroy();
                document.removeEventListener('keydown', keyHandler);
            }
        };
        document.addEventListener('keydown', keyHandler);
    }
    
    showInitSequence() {
        const messages = [
            'LOADING GRID PARAMETERS...',
            'INITIALIZING LIGHT CYCLES...',
            'CALIBRATING ENERGY WALLS...',
            'ESTABLISHING ARENA BOUNDS...',
            'GRID ONLINE - RACE COMMENCING!'
        ];
        
        let messageIndex = 0;
        const controlsDiv = this.gameContainer.querySelector('div');
        
        const showNextMessage = () => {
            if (messageIndex < messages.length) {
                controlsDiv.innerHTML = `
                    <div style="margin-top: 20px; text-align: center; color: #00ff41;">
                        <p style="animation: tronPulse 1s ease-in-out;">${messages[messageIndex]}</p>
                        <p style="margin-top: 10px; font-size: 0.9rem; color: #666;">Press ESC to exit</p>
                    </div>
                `;
                messageIndex++;
                
                if (messageIndex < messages.length) {
                    setTimeout(showNextMessage, 1000);
                } else {
                    setTimeout(() => this.startGame(), 1000);
                }
            }
        };
        
        setTimeout(showNextMessage, 500);
    }
    
    startGame() {
        console.log('%c[TRON] Light Cycle Arena initialized!', 'color: #00ffff; font-family: monospace;');
        
        this.isRunning = true;
        this.drawGrid();
        this.gameLoop();
        
        // Auto-close after 15 seconds
        setTimeout(() => {
            if (this.isRunning) {
                this.destroy();
            }
        }, 15000);
    }
    
    drawGrid() {
        this.ctx.fillStyle = '#000011';
        this.ctx.fillRect(0, 0, this.gridSize, this.gridSize);
        
        // Draw grid lines
        this.ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
        this.ctx.lineWidth = 0.5;
        
        for (let i = 0; i <= this.gridSize; i += this.cellSize * 5) {
            this.ctx.beginPath();
            this.ctx.moveTo(i, 0);
            this.ctx.lineTo(i, this.gridSize);
            this.ctx.stroke();
            
            this.ctx.beginPath();
            this.ctx.moveTo(0, i);
            this.ctx.lineTo(this.gridSize, i);
            this.ctx.stroke();
        }
    }
    
    gameLoop() {
        if (!this.isRunning) return;
        
        const now = Date.now();
        if (now - this.lastUpdate > this.speed) {
            this.update();
            this.draw();
            this.lastUpdate = now;
        }
        
        this.animationId = requestAnimationFrame(() => this.gameLoop());
    }
    
    update() {
        this.cycles.forEach((cycle, index) => {
            if (!cycle.alive) return;
            
            // Add current position to trail
            cycle.trail.push({ x: cycle.x, y: cycle.y });
            
            // Move cycle
            cycle.x += cycle.dx * this.cellSize;
            cycle.y += cycle.dy * this.cellSize;
            
            // AI for second cycle (simple bouncing behavior)
            if (index === 1) {
                // Change direction randomly or when hitting walls
                if (Math.random() < 0.1 || 
                    cycle.x <= this.cellSize || cycle.x >= this.gridSize - this.cellSize ||
                    cycle.y <= this.cellSize || cycle.y >= this.gridSize - this.cellSize) {
                    
                    const directions = [
                        { dx: 1, dy: 0 }, { dx: -1, dy: 0 },
                        { dx: 0, dy: 1 }, { dx: 0, dy: -1 }
                    ];
                    const newDir = directions[Math.floor(Math.random() * directions.length)];
                    cycle.dx = newDir.dx;
                    cycle.dy = newDir.dy;
                }
            }
            
            // Check boundaries
            if (cycle.x < 0 || cycle.x >= this.gridSize || 
                cycle.y < 0 || cycle.y >= this.gridSize) {
                cycle.alive = false;
            }
            
            // Check trail collisions
            const allTrails = this.cycles.flatMap(c => c.trail);
            if (allTrails.some(pos => pos.x === cycle.x && pos.y === cycle.y)) {
                cycle.alive = false;
            }
        });
    }
    
    draw() {
        this.drawGrid();
        
        this.cycles.forEach(cycle => {
            // Draw trail
            this.ctx.fillStyle = cycle.color;
            this.ctx.shadowColor = cycle.color;
            this.ctx.shadowBlur = 10;
            
            cycle.trail.forEach(pos => {
                this.ctx.fillRect(pos.x, pos.y, this.cellSize, this.cellSize);
            });
            
            // Draw cycle head (if alive)
            if (cycle.alive) {
                this.ctx.fillStyle = cycle.color;
                this.ctx.shadowBlur = 20;
                this.ctx.fillRect(cycle.x, cycle.y, this.cellSize, this.cellSize);
            }
            
            this.ctx.shadowBlur = 0;
        });
        
        // Draw HUD
        this.drawHUD();
    }
    
    drawHUD() {
        this.ctx.fillStyle = '#00ffff';
        this.ctx.font = '12px Orbitron, monospace';
        this.ctx.textAlign = 'left';
        
        this.cycles.forEach((cycle, index) => {
            const status = cycle.alive ? 'ONLINE' : 'DEREZZED';
            const color = cycle.alive ? cycle.color : '#666';
            
            this.ctx.fillStyle = color;
            this.ctx.fillText(`${cycle.name}: ${status}`, 10, 20 + (index * 20));
        });
        
        // Race timer
        this.ctx.fillStyle = '#00ff41';
        this.ctx.textAlign = 'right';
        this.ctx.fillText('ARENA TIME: ' + Math.floor(Date.now() / 1000) % 100, this.gridSize - 10, 20);
        
        this.ctx.textAlign = 'left';
    }
    
    destroy() {
        console.log('%c[TRON] Light Cycle Arena terminated.', 'color: #ff6600; font-family: monospace;');
        
        this.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.gameContainer) {
            this.gameContainer.remove();
        }
    }
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