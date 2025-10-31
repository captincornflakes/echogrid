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