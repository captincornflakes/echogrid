// Tron Light Cycles Game
class TronLightCycles {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.gameContainer = null;
        this.isRunning = false;
        this.animationId = null;
        
        // Game settings
        this.gridSize = Math.min(window.innerWidth * 0.9, window.innerHeight * 0.9);
        this.cellSize = 8;
        this.speed = 60; // milliseconds between moves (doubled speed)
        
        // Light cycles
        this.cycles = [
            {
                x: Math.floor(this.gridSize * 0.25), 
                y: Math.floor(this.gridSize * 0.5), 
                dx: 1, dy: 0,
                color: '#8a2be2', 
                name: 'PLAYER 1',
                trail: [], 
                alive: true,
                isPlayer: true
            },
            {
                x: Math.floor(this.gridSize * 0.75), 
                y: Math.floor(this.gridSize * 0.5), 
                dx: -1, dy: 0,
                color: '#ff1493', 
                name: 'AI OPPONENT',
                trail: [], 
                alive: true,
                isPlayer: false,
                aiTimer: 0,
                aiDirection: 0
            }
        ];
        
        this.lastUpdate = 0;
        this.keys = {
            w: false, a: false, s: false, d: false
        };
        
        this.gameState = 'init'; // init, playing, gameOver
        this.winner = null;
    }
    
    initialize() {
        this.createGameContainer();
        this.setupCanvas();
        this.setupControls();
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
            width: 100vw;
            height: 100vh;
            background: radial-gradient(circle at center, #220122 0%, #110011 100%);
            z-index: 2000;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-family: 'Orbitron', monospace;
            color: #8a2be2;
            overflow: hidden;
        `;
        
        document.body.appendChild(this.gameContainer);
        
        // Prevent scrolling
        document.body.style.overflow = 'hidden';
    }
    
    setupCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.gridSize;
        this.canvas.height = this.gridSize;
        this.canvas.style.cssText = `
            border: 3px solid #8a2be2;
            box-shadow: 
                0 0 50px #8a2be2, 
                inset 0 0 30px rgba(138, 43, 226, 0.1),
                0 0 100px rgba(138, 43, 226, 0.3);
            background: radial-gradient(circle at center, #110011 0%, #000000 100%);
            image-rendering: pixelated;
        `;
        
        this.ctx = this.canvas.getContext('2d');
        
        // Add title
        const title = document.createElement('h1');
        title.textContent = 'TRON LIGHT CYCLE ARENA';
        title.style.cssText = `
            position: absolute;
            top: 20px;
            font-size: clamp(1.5rem, 4vw, 3rem);
            text-shadow: 0 0 20px #8a2be2;
            animation: tronGlow 2s ease-in-out infinite alternate;
            margin: 0;
            z-index: 10;
        `;
        
        // Add controls info
        const controls = document.createElement('div');
        controls.id = 'gameStatus';
        controls.style.cssText = `
            position: absolute;
            bottom: 20px;
            text-align: center;
            color: #ff1493;
            font-size: clamp(0.8rem, 2vw, 1.2rem);
            z-index: 10;
        `;
        controls.innerHTML = `
            <div style="margin-bottom: 10px;">
                <p>INITIALIZING LIGHT CYCLE GRID...</p>
            </div>
            <div style="font-size: 0.8em; color: #666;">
                <p>WASD to control • ESC to exit</p>
            </div>
        `;
        
        // Add score display
        const scoreDisplay = document.createElement('div');
        scoreDisplay.id = 'scoreDisplay';
        scoreDisplay.style.cssText = `
            position: absolute;
            top: 80px;
            left: 20px;
            right: 20px;
            display: flex;
            justify-content: space-between;
            font-size: clamp(0.9rem, 2.5vw, 1.3rem);
            z-index: 10;
        `;
        
        this.gameContainer.appendChild(title);
        this.gameContainer.appendChild(scoreDisplay);
        this.gameContainer.appendChild(this.canvas);
        this.gameContainer.appendChild(controls);
        
        // Add styles
        if (!document.getElementById('tronStyles')) {
            const style = document.createElement('style');
            style.id = 'tronStyles';
            style.textContent = `
                @keyframes tronGlow {
                    from { 
                        text-shadow: 0 0 20px #8a2be2; 
                        transform: scale(1);
                    }
                    to { 
                        text-shadow: 0 0 40px #8a2be2, 0 0 60px #8a2be2; 
                        transform: scale(1.02);
                    }
                }
                @keyframes tronPulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.7; }
                }
                @keyframes gameOverGlow {
                    0%, 100% { 
                        text-shadow: 0 0 20px currentColor;
                        transform: scale(1);
                    }
                    50% { 
                        text-shadow: 0 0 40px currentColor, 0 0 60px currentColor;
                        transform: scale(1.1);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    setupControls() {
        this.keyHandler = (e) => {
            const key = e.key.toLowerCase();
            
            if (key === 'escape') {
                this.destroy();
                return;
            }
            
            if (!this.isRunning || this.gameState !== 'playing') return;
            
            const player = this.cycles[0]; // Player is always first cycle
            if (!player.alive) return;
            
            // Handle WASD movement
            switch(key) {
                case 'w':
                    if (player.dy !== 1) { // Can't go back into yourself
                        player.dx = 0;
                        player.dy = -1;
                    }
                    break;
                case 's':
                    if (player.dy !== -1) {
                        player.dx = 0;
                        player.dy = 1;
                    }
                    break;
                case 'a':
                    if (player.dx !== 1) {
                        player.dx = -1;
                        player.dy = 0;
                    }
                    break;
                case 'd':
                    if (player.dx !== -1) {
                        player.dx = 1;
                        player.dy = 0;
                    }
                    break;
            }
        };
        
        document.addEventListener('keydown', this.keyHandler);
    }
    
    showInitSequence() {
        const messages = [
            'LOADING GRID PARAMETERS...',
            'INITIALIZING LIGHT CYCLES...',
            'CALIBRATING ENERGY WALLS...',
            'ESTABLISHING ARENA BOUNDS...',
            'ACTIVATING PLAYER CONTROLS...',
            'GRID ONLINE - RACE COMMENCING!'
        ];
        
        let messageIndex = 0;
        const statusDiv = document.getElementById('gameStatus');
        
        const showNextMessage = () => {
            if (messageIndex < messages.length) {
                statusDiv.innerHTML = `
                    <div style="margin-bottom: 10px;">
                        <p style="animation: tronPulse 1s ease-in-out;">${messages[messageIndex]}</p>
                    </div>
                    <div style="font-size: 0.8em; color: #666;">
                        <p>WASD to control • ESC to exit</p>
                    </div>
                `;
                messageIndex++;
                
                if (messageIndex < messages.length) {
                    setTimeout(showNextMessage, 1200);
                } else {
                    setTimeout(() => this.startGame(), 1500);
                }
            }
        };
        
        setTimeout(showNextMessage, 800);
    }
    
    startGame() {
        console.log('%c[TRON] Light Cycle Arena initialized! Use WASD to control your cycle.', 'color: #8a2be2; font-family: monospace;');
        
        this.gameState = 'playing';
        this.isRunning = true;
        
        // Update status display
        const statusDiv = document.getElementById('gameStatus');
        statusDiv.innerHTML = `
            <div style="color: #ff1493;">
                <p>ARENA ACTIVE - SURVIVE THE GRID!</p>
            </div>
            <div style="font-size: 0.8em; color: #666;">
                <p>WASD to control • ESC to exit</p>
            </div>
        `;
        
        this.drawGrid();
        this.gameLoop();
    }
    
    drawGrid() {
        this.ctx.fillStyle = 'rgba(0, 0, 17, 0.1)';
        this.ctx.fillRect(0, 0, this.gridSize, this.gridSize);
        
        // Draw grid lines
        this.ctx.strokeStyle = 'rgba(0, 255, 255, 0.05)';
        this.ctx.lineWidth = 1;
        
        const gridSpacing = this.cellSize * 8;
        for (let i = 0; i <= this.gridSize; i += gridSpacing) {
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
            this.checkGameOver();
            this.lastUpdate = now;
        }
        
        this.animationId = requestAnimationFrame(() => this.gameLoop());
    }
    
    update() {
        if (this.gameState !== 'playing') return;
        
        this.cycles.forEach((cycle, index) => {
            if (!cycle.alive) return;
            
            // Add current position to trail BEFORE moving
            cycle.trail.push({ x: cycle.x, y: cycle.y });
            
            // AI behavior for non-player cycles
            if (!cycle.isPlayer) {
                this.updateAI(cycle);
            }
            
            // Calculate new position
            const newX = cycle.x + (cycle.dx * this.cellSize);
            const newY = cycle.y + (cycle.dy * this.cellSize);
            
            // Check boundaries BEFORE moving
            if (newX < 0 || newX >= this.gridSize || 
                newY < 0 || newY >= this.gridSize) {
                cycle.alive = false;
                console.log(`%c[TRON] ${cycle.name} hit the arena boundary!`, 'color: #ff6600; font-family: monospace;');
                return;
            }
            
            // Check collisions BEFORE moving
            
            // 1. Check collision with ALL trails from ALL cycles
            const allTrails = [];
            this.cycles.forEach(c => {
                // Include all trail positions from all cycles
                allTrails.push(...c.trail);
            });
            
            // 2. Check collision with OTHER cycles' current positions (head-to-head)
            const otherCycles = this.cycles.filter((c, i) => i !== index && c.alive);
            const headToHeadCollision = otherCycles.some(otherCycle => 
                otherCycle.x === newX && otherCycle.y === newY
            );
            
            // 3. Check collision with trails
            const trailCollision = allTrails.some(pos => pos.x === newX && pos.y === newY);
            
            if (trailCollision || headToHeadCollision) {
                cycle.alive = false;
                if (headToHeadCollision) {
                    console.log(`%c[TRON] ${cycle.name} collided head-to-head with opponent!`, 'color: #ff6600; font-family: monospace;');
                } else {
                    console.log(`%c[TRON] ${cycle.name} collided with an energy trail!`, 'color: #ff6600; font-family: monospace;');
                }
                return;
            }
            
            // Move cycle to new position only if no collision
            cycle.x = newX;
            cycle.y = newY;
        });
    }
    
    updateAI(cycle) {
        cycle.aiTimer++;
        
        // Check for immediate dangers
        const lookAhead = this.cellSize * 3;
        const nextX = cycle.x + (cycle.dx * lookAhead);
        const nextY = cycle.y + (cycle.dy * lookAhead);
        
        // Get all trail positions and opponent positions
        const allTrails = [];
        const opponentPositions = [];
        this.cycles.forEach(c => {
            allTrails.push(...c.trail);
            if (c !== cycle && c.alive) {
                opponentPositions.push({ x: c.x, y: c.y });
            }
        });
        
        // Check if current direction leads to danger
        const margin = this.cellSize * 8;
        const nearBoundary = nextX < margin || nextX > this.gridSize - margin ||
                            nextY < margin || nextY > this.gridSize - margin;
        
        const nearTrail = allTrails.some(pos => 
            Math.abs(pos.x - nextX) < this.cellSize * 2 && 
            Math.abs(pos.y - nextY) < this.cellSize * 2
        );
        
        const nearOpponent = opponentPositions.some(pos => 
            Math.abs(pos.x - nextX) < this.cellSize * 3 && 
            Math.abs(pos.y - nextY) < this.cellSize * 3
        );
        
        // Change direction if in danger or periodically
        if (cycle.aiTimer > 25 || nearBoundary || nearTrail || nearOpponent || Math.random() < 0.03) {
            const directions = [
                { dx: 1, dy: 0 }, { dx: -1, dy: 0 },
                { dx: 0, dy: 1 }, { dx: 0, dy: -1 }
            ];
            
            // Filter out reverse direction and dangerous directions
            const safeDirections = directions.filter(dir => {
                // Can't reverse
                if (dir.dx === -cycle.dx && dir.dy === -cycle.dy) return false;
                
                // Check if this direction is safe
                const testX = cycle.x + (dir.dx * lookAhead);
                const testY = cycle.y + (dir.dy * lookAhead);
                
                // Check boundaries
                if (testX < margin || testX > this.gridSize - margin ||
                    testY < margin || testY > this.gridSize - margin) return false;
                
                // Check trails
                const wouldHitTrail = allTrails.some(pos => 
                    Math.abs(pos.x - testX) < this.cellSize && 
                    Math.abs(pos.y - testY) < this.cellSize
                );
                
                // Check opponent positions
                const wouldHitOpponent = opponentPositions.some(pos => 
                    Math.abs(pos.x - testX) < this.cellSize * 2 && 
                    Math.abs(pos.y - testY) < this.cellSize * 2
                );
                
                return !wouldHitTrail && !wouldHitOpponent;
            });
            
            // Choose a safe direction, or random if no safe options
            const directionsToUse = safeDirections.length > 0 ? safeDirections : directions.filter(dir => 
                !(dir.dx === -cycle.dx && dir.dy === -cycle.dy)
            );
            
            if (directionsToUse.length > 0) {
                const newDir = directionsToUse[Math.floor(Math.random() * directionsToUse.length)];
                cycle.dx = newDir.dx;
                cycle.dy = newDir.dy;
                cycle.aiTimer = 0;
            }
        }
    }
    
    draw() {
        this.drawGrid();
        
        this.cycles.forEach(cycle => {
            // Draw trail
            this.ctx.fillStyle = cycle.color;
            this.ctx.shadowColor = cycle.color;
            this.ctx.shadowBlur = 8;
            
            cycle.trail.forEach((pos, index) => {
                const alpha = Math.max(0.3, 1 - (cycle.trail.length - index) * 0.01);
                this.ctx.globalAlpha = alpha;
                this.ctx.fillRect(pos.x, pos.y, this.cellSize, this.cellSize);
            });
            
            this.ctx.globalAlpha = 1;
            
            // Draw cycle head (if alive)
            if (cycle.alive) {
                this.ctx.fillStyle = cycle.color;
                this.ctx.shadowBlur = 15;
                
                // Pulsing effect for player
                const pulseSize = cycle.isPlayer ? this.cellSize + Math.sin(Date.now() * 0.01) * 2 : this.cellSize;
                const offset = cycle.isPlayer ? (this.cellSize - pulseSize) / 2 : 0;
                
                this.ctx.fillRect(cycle.x + offset, cycle.y + offset, pulseSize, pulseSize);
            }
            
            this.ctx.shadowBlur = 0;
        });
        
        // Update score display
        this.updateScoreDisplay();
    }
    
    updateScoreDisplay() {
        const scoreDisplay = document.getElementById('scoreDisplay');
        if (scoreDisplay) {
            const player1 = this.cycles[0];
            const player2 = this.cycles[1];
            
            scoreDisplay.innerHTML = `
                <div style="color: ${player1.color}; text-shadow: 0 0 10px ${player1.color};">
                    ${player1.name}: ${player1.alive ? 'ONLINE' : 'DEREZZED'}
                </div>
                <div style="color: #ff1493; font-size: 0.8em;">
                    ARENA TIME: ${Math.floor((Date.now() / 1000) % 999)}
                </div>
                <div style="color: ${player2.color}; text-shadow: 0 0 10px ${player2.color};">
                    ${player2.name}: ${player2.alive ? 'ONLINE' : 'DEREZZED'}
                </div>
            `;
        }
    }
    
    checkGameOver() {
        const aliveCycles = this.cycles.filter(c => c.alive);
        
        if (aliveCycles.length <= 1 && this.gameState === 'playing') {
            this.gameState = 'gameOver';
            
            if (aliveCycles.length === 1) {
                this.winner = aliveCycles[0];
                console.log(`%c[TRON] ${this.winner.name} wins the Light Cycle Arena!`, 'color: #ff1493; font-family: monospace;');
            } else {
                console.log('%c[TRON] Draw! All cycles derezzed simultaneously!', 'color: #ffff00; font-family: monospace;');
            }
            
            this.showGameOver();
        }
    }
    
    showGameOver() {
        const statusDiv = document.getElementById('gameStatus');
        const winnerText = this.winner ? 
            `${this.winner.name} WINS!` : 
            'SIMULTANEOUS DEREZ - DRAW!';
        
        const winnerColor = this.winner ? this.winner.color : '#ffff00';
        
        statusDiv.innerHTML = `
            <div style="color: ${winnerColor}; animation: gameOverGlow 1s ease-in-out infinite;">
                <p>${winnerText}</p>
                <p style="font-size: 0.8em; margin-top: 5px;">GAME OVER</p>
            </div>
            <div style="font-size: 0.8em; color: #666; margin-top: 10px;">
                <p>ESC to exit • Auto-close in 5 seconds</p>
            </div>
        `;
        
        // Auto-close after 5 seconds
        setTimeout(() => {
            if (this.gameContainer) {
                this.destroy();
            }
        }, 5000);
    }
    
    destroy() {
        console.log('%c[TRON] Light Cycle Arena terminated.', 'color: #ff6600; font-family: monospace;');
        
        this.isRunning = false;
        this.gameState = 'destroyed';
        
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        if (this.keyHandler) {
            document.removeEventListener('keydown', this.keyHandler);
        }
        
        if (this.gameContainer) {
            this.gameContainer.remove();
        }
        
        // Restore body scrolling
        document.body.style.overflow = '';
    }
}