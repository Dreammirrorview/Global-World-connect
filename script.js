// Adegan Global Enterprise - JavaScript Functionality

// Tab Navigation Functions
function showTab(tabId) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Remove active class from all buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => button.classList.remove('active'));
    
    // Show selected tab content
    document.getElementById(tabId).classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
}

function showCableTab(tabId) {
    showTab(tabId);
}

function showMemoryTab(tabId) {
    showTab(tabId);
}

function showSearchTab(tabId) {
    showTab(tabId);
}

function showPowerTab(tabId) {
    showTab(tabId);
}

function showSoftwareTab(tabId) {
    showTab(tabId);
}

function showDishTab(tabId) {
    showTab(tabId);
}

// Digital Display Functions
let clockInterval;
let displayLines = [];

function addDisplayLine(text) {
    const displayScreen = document.getElementById('displayScreen');
    const newLine = document.createElement('div');
    newLine.textContent = `> ${text}`;
    displayScreen.appendChild(newLine);
    displayScreen.scrollTop = displayScreen.scrollHeight;
    displayLines.push(text);
}

function clearDisplay() {
    const displayScreen = document.getElementById('displayScreen');
    displayScreen.innerHTML = '<div>> Screen cleared...</div>';
    displayLines = [];
    setTimeout(() => {
        addDisplayLine('Ready for input...');
    }, 500);
}

function showSystemStatus() {
    addDisplayLine('--- System Status ---');
    addDisplayLine('System: ONLINE');
    addDisplayLine('CPU Usage: 45%');
    addDisplayLine('Memory: 67% Used');
    addDisplayLine('Disk: 34% Used');
    addDisplayLine('Network: CONNECTED');
    addDisplayLine('Security: ACTIVE');
    addDisplayLine('-------------------');
}

function showNetworkInfo() {
    addDisplayLine('--- Network Information ---');
    addDisplayLine('IP Address: 192.168.1.100');
    addDisplayLine('Gateway: 192.168.1.1');
    addDisplayLine('DNS: 8.8.8.8');
    addDisplayLine('Speed: 1 Gbps');
    addDisplayLine('Packets: 12,453 sent, 11,892 received');
    addDisplayLine('---------------------------');
}

function startClock() {
    if (clockInterval) {
        clearInterval(clockInterval);
        clockInterval = null;
        addDisplayLine('Clock stopped');
    } else {
        addDisplayLine('Clock started');
        clockInterval = setInterval(() => {
            const now = new Date();
            const timeString = now.toLocaleTimeString();
            addDisplayLine(`Current Time: ${timeString}`);
        }, 1000);
    }
}

// Encode/Decode Functions
function encodeText() {
    const input = document.getElementById('encodeInput').value;
    const output = document.getElementById('encodeOutput');
    try {
        const encoded = btoa(input);
        output.value = encoded;
        addDisplayLine(`Encoded: ${input.substring(0, 30)}...`);
    } catch (error) {
        output.value = 'Error encoding text';
        addDisplayLine('Error: Could not encode text');
    }
}

function decodeText() {
    const input = document.getElementById('encodeInput').value;
    const output = document.getElementById('encodeOutput');
    try {
        const decoded = atob(input);
        output.value = decoded;
        addDisplayLine(`Decoded: ${decoded.substring(0, 30)}...`);
    } catch (error) {
        output.value = 'Error decoding text - Invalid Base64';
        addDisplayLine('Error: Invalid Base64 input');
    }
}

function encodeHex() {
    const input = document.getElementById('encodeInput').value;
    const output = document.getElementById('encodeOutput');
    let hex = '';
    for (let i = 0; i < input.length; i++) {
        hex += input.charCodeAt(i).toString(16).padStart(2, '0');
    }
    output.value = hex;
    addDisplayLine(`Hex encoded: ${hex.substring(0, 30)}...`);
}

function decodeHex() {
    const input = document.getElementById('encodeInput').value;
    const output = document.getElementById('encodeOutput');
    try {
        let str = '';
        for (let i = 0; i < input.length; i += 2) {
            str += String.fromCharCode(parseInt(input.substr(i, 2), 16));
        }
        output.value = str;
        addDisplayLine(`Hex decoded: ${str.substring(0, 30)}...`);
    } catch (error) {
        output.value = 'Error decoding hex - Invalid input';
        addDisplayLine('Error: Invalid hex input');
    }
}

// Terminal Functions
function handleTerminalInput(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('terminalInput');
        const command = input.value.trim();
        
        if (command) {
            processCommand(command);
            input.value = '';
        }
    }
}

function processCommand(command) {
    const terminal = document.getElementById('terminal');
    const prompt = document.createElement('div');
    prompt.textContent = `> ${command}`;
    terminal.insertBefore(prompt, terminal.lastElementChild);
    
    const response = document.createElement('div');
    
    switch (command.toLowerCase()) {
        case 'help':
            response.innerHTML = `Available commands:<br>
            - help: Show this help message<br>
            - clear: Clear terminal<br>
            - status: Show system status<br>
            - network: Show network info<br>
            - date: Show current date and time<br>
            - scan: Initiate system scan<br>
            - security: Check security status<br>
            - cameras: List active cameras<br>
            - version: Show system version`;
            break;
        case 'clear':
            terminal.innerHTML = `> Terminal cleared<br>> Type 'help' for available commands<br>> _<input type="text" class="terminal-input" id="terminalInput" placeholder="Enter command..." onkeypress="handleTerminalInput(event)">`;
            document.getElementById('terminalInput').focus();
            return;
        case 'status':
            response.innerHTML = `System Status:<br>
            - Status: ONLINE<br>
            - Uptime: 45 days, 12 hours, 34 minutes<br>
            - CPU: 45% used<br>
            - Memory: 67% used<br>
            - Disk: 34% used<br>
            - Temperature: 42°C`;
            break;
        case 'network':
            response.innerHTML = `Network Information:<br>
            - Status: CONNECTED<br>
            - IP: 192.168.1.100<br>
            - Gateway: 192.168.1.1<br>
            - DNS: 8.8.8.8, 8.8.4.4<br>
            - Speed: 1 Gbps<br>
            - Latency: 12ms`;
            break;
        case 'date':
            const now = new Date();
            response.textContent = `Current Date & Time: ${now.toLocaleString()}`;
            break;
        case 'scan':
            response.innerHTML = `Initiating system scan...<br>
            Scanning network devices...<br>
            Scanning security cameras...<br>
            Scanning sensors...<br>
            Scan complete: 156 devices found, all operational`;
            break;
        case 'security':
            response.innerHTML = `Security Status:<br>
            - Level: HIGH<br>
            - Firewall: ACTIVE<br>
            - Antivirus: RUNNING<br>
            - Threats Blocked: 2,453<br>
            - Last Scan: 1 hour ago<br>
            - Status: SECURE`;
            break;
        case 'cameras':
            response.innerHTML = `Active Cameras: 156<br>
            - Online: 154<br>
            - Offline: 2<br>
            - Recording: 148<br>
            - Motion Detection: ACTIVE`;
            break;
        case 'version':
            response.innerHTML = `Adegan Global Enterprise<br>
            Network Terminal v2.0<br>
            Build: 2024.12.15<br>
            © Adegan Global Enterprise`;
            break;
        default:
            response.textContent = `Command not recognized: ${command}. Type 'help' for available commands.`;
    }
    
    terminal.insertBefore(response, terminal.lastElementChild);
    terminal.scrollTop = terminal.scrollHeight;
}

// Voice Recognition Functions
let recognition;
let isListening = false;

function toggleVoiceRecognition() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        document.getElementById('voiceTranscript').textContent = 'Voice recognition not supported in this browser. Please use Chrome or Edge.';
        return;
    }
    
    if (isListening) {
        stopListening();
    } else {
        startListening();
    }
}

function startListening() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    
    recognition.onstart = function() {
        isListening = true;
        document.getElementById('voiceButton').classList.add('listening');
        document.getElementById('voiceStatus').textContent = 'Listening... Speak now!';
        document.getElementById('voiceTranscript').textContent = 'Listening...';
    };
    
    recognition.onresult = function(event) {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript;
            }
        }
        
        if (finalTranscript) {
            document.getElementById('voiceTranscript').textContent = finalTranscript;
            processVoiceCommand(finalTranscript.toLowerCase());
        }
    };
    
    recognition.onerror = function(event) {
        document.getElementById('voiceStatus').textContent = 'Error: ' + event.error;
        stopListening();
    };
    
    recognition.onend = function() {
        if (isListening) {
            recognition.start();
        }
    };
    
    recognition.start();
}

function stopListening() {
    isListening = false;
    if (recognition) {
        recognition.stop();
    }
    document.getElementById('voiceButton').classList.remove('listening');
    document.getElementById('voiceStatus').textContent = 'Click to start listening...';
}

function processVoiceCommand(command) {
    const transcript = document.getElementById('voiceTranscript');
    
    if (command.includes('status') || command.includes('system')) {
        transcript.textContent += '\n\nCommand: Showing system status...';
        showSystemStatus();
    } else if (command.includes('network') || command.includes('connection')) {
        transcript.textContent += '\n\nCommand: Showing network info...';
        showNetworkInfo();
    } else if (command.includes('clear') || command.includes('clean')) {
        transcript.textContent += '\n\nCommand: Clearing display...';
        clearDisplay();
    } else if (command.includes('scan')) {
        transcript.textContent += '\n\nCommand: Initiating scan...';
        addDisplayLine('Voice command: Initiating system scan...');
    } else if (command.includes('security')) {
        transcript.textContent += '\n\nCommand: Checking security...';
        addDisplayLine('Voice command: Checking security status...');
    } else if (command.includes('help')) {
        transcript.textContent += '\n\nCommand: Available voice commands: status, network, clear, scan, security, help';
    } else {
        transcript.textContent += '\n\nCommand not recognized. Try saying "help" for available commands.';
    }
}

// Map Functions
function handleMapSearch(event) {
    if (event.key === 'Enter') {
        searchDestination();
    }
}

function searchDestination() {
    const destination = document.getElementById('destinationSearch').value;
    if (destination) {
        addDisplayLine(`Searching for: ${destination}...`);
        addDisplayLine(`Location found: ${destination}`);
        addDisplayLine(`Calculating route...`);
        addDisplayLine(`Route calculated successfully`);
        alert(`Searching for: ${destination}\n\nLocation found and route calculated!\n\nNavigation ready.`);
    } else {
        alert('Please enter a destination to search.');
    }
}

function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const lat = position.coords.latitude.toFixed(4);
                const lng = position.coords.longitude.toFixed(4);
                addDisplayLine(`Current Location: ${lat}, ${lng}`);
                alert(`Your current location:\nLatitude: ${lat}\nLongitude: ${lng}`);
            },
            function(error) {
                addDisplayLine('Error: Could not retrieve location');
                alert('Unable to retrieve your location. Please enable location services.');
            }
        );
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

function changeLanguage() {
    const language = document.getElementById('languageSelect').value;
    const languageNames = {
        'en': 'English',
        'es': 'Español',
        'fr': 'Français',
        'de': 'Deutsch',
        'zh': '中文',
        'ja': '日本語',
        'ko': '한국어',
        'ar': 'العربية',
        'pt': 'Português',
        'ru': 'Русский',
        'hi': 'हिन्दी',
        'yo': 'Yorùbá'
    };
    addDisplayLine(`Language changed to: ${languageNames[language]}`);
    alert(`Language changed to: ${languageNames[language]}`);
}

// Modal Functions
function openContactModal() {
    document.getElementById('contactModal').classList.add('active');
}

function closeContactModal() {
    document.getElementById('contactModal').classList.remove('active');
}

function submitContactForm(event) {
    event.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    closeContactModal();
}

// Owner Functions
function showCredentials() {
    addDisplayLine('--- Owner Credentials ---');
    addDisplayLine('Name: Olawale Abdul-Ganiyu');
    addDisplayLine('Position: Founder & CEO');
    addDisplayLine('Company: Adegan Global Enterprise');
    addDisplayLine('Experience: 15+ years in Technology');
    addDisplayLine('Expertise: Scanning, Security, Digital Solutions');
    addDisplayLine('Certifications: Multiple Industry Certifications');
    addDisplayLine('------------------------');
}

// Scroll Functions
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// Update Signal Indicators
function updateSignals() {
    const tvStrength = Math.random() * 100;
    const radioStrength = Math.random() * 100;
    const networkStrength = Math.random() * 100;
    
    document.getElementById('tvSignalStrength').textContent = 
        tvStrength > 80 ? 'Excellent' : tvStrength > 60 ? 'Good' : tvStrength > 40 ? 'Fair' : 'Weak';
    
    document.getElementById('radioSignalStrength').textContent = 
        radioStrength > 80 ? 'Excellent' : radioStrength > 60 ? 'Good' : radioStrength > 40 ? 'Fair' : 'Weak';
    
    document.getElementById('networkSignalStrength').textContent = 
        networkStrength > 80 ? 'Excellent' : networkStrength > 60 ? 'Good' : networkStrength > 40 ? 'Fair' : 'Weak';
}

// Update Security Stats
function updateSecurityStats() {
    const threatsBlocked = parseInt(document.getElementById('threatsBlocked').textContent.replace(',', ''));
    const newThreats = threatsBlocked + Math.floor(Math.random() * 10);
    document.getElementById('threatsBlocked').textContent = newThreats.toLocaleString();
    
    const alerts = parseInt(document.getElementById('alertsToday').textContent);
    if (Math.random() > 0.9) {
        document.getElementById('alertsToday').textContent = alerts + 1;
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    addDisplayLine('--- Adegan Global Enterprise ---');
    addDisplayLine('Digital Command Center v2.0');
    addDisplayLine('Initializing systems...');
    addDisplayLine('Loading modules...');
    addDisplayLine('All systems operational');
    addDisplayLine('Ready for commands...');
    
    // Update signals every 5 seconds
    setInterval(updateSignals, 5000);
    
    // Update security stats every 10 seconds
    setInterval(updateSecurityStats, 10000);
    
    // Close modal when clicking outside
    window.onclick = function(event) {
        const modal = document.getElementById('contactModal');
        if (event.target === modal) {
            closeContactModal();
        }
    };
    
    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl + ` to focus terminal
    if (e.ctrlKey && e.key === '`') {
        e.preventDefault();
        document.getElementById('terminalInput').focus();
    }
    
    // Escape to close modals
    if (e.key === 'Escape') {
        closeContactModal();
    }
});