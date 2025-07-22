/* ---------- PRELOADER ---------- */
window.addEventListener('load', () => {
    const pre = document.getElementById('preloader');
    const main = document.querySelector('.main-content-wrapper');
    pre.classList.add('fade-out');
    setTimeout(() => { 
        pre.style.display = 'none'; 
        main.classList.add('show');
    }, 800);
});

/* ---------- SIDEBAR FUNCTIONALITY ---------- */
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const mobileSidebarToggle = document.getElementById('mobileSidebarToggle');
const sidebarOverlay = document.getElementById('sidebarOverlay');

// Desktop sidebar toggle
sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
});

// Mobile sidebar toggle
mobileSidebarToggle.addEventListener('click', () => {
    sidebar.classList.add('active');
    sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

// Close mobile sidebar
sidebarOverlay.addEventListener('click', () => {
    sidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
    document.body.style.overflow = '';
});

// Restore sidebar state
if (localStorage.getItem('sidebarCollapsed') === 'true') {
    sidebar.classList.add('collapsed');
}

/* ---------- NAVIGATION ---------- */
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.dashboard-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Update breadcrumb
    const currentSection = document.getElementById('currentSection');
    if (currentSection) {
        const sectionNames = {
            'dashboard': 'Dashboard',
            'students': 'Students',
            'sessions': 'Sessions',
            'calendar': 'Calendar',
            'analytics': 'Analytics',
            'earnings': 'Earnings',
            'reports': 'Reports',
            'messages': 'Messages',
            'reviews': 'Reviews'
        };
        currentSection.textContent = sectionNames[sectionId] || 'Dashboard';
    }
    
    // Close mobile sidebar if open
    if (window.innerWidth <= 768) {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Handle navigation clicks
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('data-section');
        if (sectionId) {
            showSection(sectionId);
        }
    });
});

/* ---------- MODAL FUNCTIONALITY ---------- */
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal when clicking outside
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal.id);
        }
    });
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(modal => {
            closeModal(modal.id);
        });
    }
});

/* ---------- SEARCH FUNCTIONALITY ---------- */
const globalSearch = document.getElementById('globalSearch');
const studentSearch = document.getElementById('studentSearch');

// Global search
if (globalSearch) {
    globalSearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        console.log('Global search:', searchTerm);
        // Implement global search logic here
    });
}

// Student search
if (studentSearch) {
    studentSearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const studentCards = document.querySelectorAll('.student-card');
        
        studentCards.forEach(card => {
            const studentName = card.querySelector('.student-info h4').textContent.toLowerCase();
            if (studentName.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

/* ---------- FORM HANDLING ---------- */
// Schedule Session Form
const scheduleForm = document.querySelector('#schedule-modal form');
if (scheduleForm) {
    scheduleForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const sessionData = {
            student: formData.get('student-select'),
            date: formData.get('session-date'),
            time: formData.get('session-time'),
            duration: formData.get('session-duration'),
            type: formData.get('session-type'),
            notes: formData.get('session-notes')
        };
        
        console.log('Scheduling session:', sessionData);
        
        // Simulate API call
        setTimeout(() => {
            alert('Session scheduled successfully!');
            closeModal('schedule-modal');
            e.target.reset();
        }, 1000);
    });
}

// Add Student Form
const studentForm = document.querySelector('#student-modal form');
if (studentForm) {
    studentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const studentData = {
            firstName: formData.get('student-first-name'),
            lastName: formData.get('student-last-name'),
            email: formData.get('student-email'),
            level: formData.get('student-level'),
            timezone: formData.get('student-timezone'),
            goals: formData.get('student-goals'),
            interests: formData.get('student-interests')
        };
        
        console.log('Adding student:', studentData);
        
        // Simulate API call
        setTimeout(() => {
            alert('Student added successfully!');
            closeModal('student-modal');
            e.target.reset();
        }, 1000);
    });
}

/* ---------- CHART FUNCTIONALITY ---------- */
function drawMiniChart(canvasId, data, color = '#6A5ACD') {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    if (!data || data.length === 0) return;
    
    // Find max value for scaling
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const range = maxValue - minValue || 1;
    
    // Draw line
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    data.forEach((value, index) => {
        const x = (width / (data.length - 1)) * index;
        const y = height - ((value - minValue) / range) * height;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    
    // Draw area under curve
    ctx.globalAlpha = 0.1;
    ctx.fillStyle = color;
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;
}

function drawPerformanceChart() {
    const canvas = document.getElementById('performanceChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Sample data
    const data = {
        sessions: [12, 15, 18, 22, 19, 25, 28, 24, 30, 27, 32, 35],
        students: [20, 21, 22, 24, 23, 24, 25, 26, 24, 25, 26, 24],
        earnings: [800, 950, 1100, 1300, 1150, 1400, 1600, 1450, 1700, 1550, 1800, 2100]
    };
    
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Set up chart dimensions
    const padding = 60;
    const chartWidth = width - (padding * 2);
    const chartHeight = height - (padding * 2);
    
    // Draw grid
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }
    
    // Vertical grid lines
    for (let i = 0; i < labels.length; i++) {
        const x = padding + (chartWidth / (labels.length - 1)) * i;
        ctx.beginPath();
        ctx.moveTo(x, padding);
        ctx.lineTo(x, height - padding);
        ctx.stroke();
    }
    
    // Draw sessions line
    const maxSessions = Math.max(...data.sessions);
    ctx.strokeStyle = '#6A5ACD';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    data.sessions.forEach((value, index) => {
        const x = padding + (chartWidth / (data.sessions.length - 1)) * index;
        const y = height - padding - (value / maxSessions) * chartHeight;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    
    // Draw data points
    ctx.fillStyle = '#6A5ACD';
    data.sessions.forEach((value, index) => {
        const x = padding + (chartWidth / (data.sessions.length - 1)) * index;
        const y = height - padding - (value / maxSessions) * chartHeight;
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
    });
    
    // Draw labels
    ctx.fillStyle = '#64748B';
    ctx.font = '12px Inter';
    ctx.textAlign = 'center';
    
    labels.forEach((label, index) => {
        const x = padding + (chartWidth / (labels.length - 1)) * index;
        ctx.fillText(label, x, height - 20);
    });
}

/* ---------- VIEW TOGGLE ---------- */
const viewButtons = document.querySelectorAll('.view-btn');
const studentsContainer = document.getElementById('studentsContainer');

viewButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        viewButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const view = btn.getAttribute('data-view');
        if (studentsContainer) {
            studentsContainer.className = view === 'list' ? 'students-list' : 'students-grid';
        }
    });
});

/* ---------- CHART PERIOD TOGGLE ---------- */
const chartPeriods = document.querySelectorAll('.chart-period');
chartPeriods.forEach(btn => {
    btn.addEventListener('click', () => {
        chartPeriods.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const period = btn.getAttribute('data-period');
        console.log('Chart period changed to:', period);
        // Redraw chart with new period data
        drawPerformanceChart();
    });
});

/* ---------- NOTIFICATIONS ---------- */
const notificationBtn = document.getElementById('notificationBtn');
if (notificationBtn) {
    notificationBtn.addEventListener('click', () => {
        // Show notifications dropdown or modal
        alert('Notifications:\n\n• New message from Alex Chen\n• Session reminder: 2:00 PM with Maria\n• Payment received from John Smith\n• New student enrollment request\n• Weekly report is ready');
    });
}

/* ---------- REAL-TIME UPDATES ---------- */
function simulateRealTimeUpdates() {
    setInterval(() => {
        // Update notification badge
        const badge = document.querySelector('.notification-badge');
        if (badge && Math.random() > 0.98) { // 2% chance every interval
            const currentCount = parseInt(badge.textContent);
            badge.textContent = currentCount + 1;
        }
        
        // Update live session status
        const liveStatus = document.querySelector('.timeline-status.live');
        if (liveStatus) {
            const now = new Date();
            const minutes = now.getMinutes();
            if (minutes > 30) {
                liveStatus.textContent = 'Ending Soon';
                liveStatus.style.background = '#F59E0B';
            }
        }
    }, 5000); // Check every 5 seconds
}

/* ---------- INITIALIZE ---------- */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize charts
    setTimeout(() => {
        // Sample data for mini charts
        drawMiniChart('studentsChart', [18, 20, 19, 22, 21, 24, 23], '#6A5ACD');
        drawMiniChart('sessionsChart', [45, 52, 48, 58, 55, 62, 59], '#10B981');
        drawMiniChart('earningsChart', [1200, 1350, 1280, 1480, 1420, 1650, 1580], '#00C4B4');
        
        drawPerformanceChart();
    }, 1000);
    
    // Set default active section
    showSection('dashboard');
    
    // Start real-time updates
    simulateRealTimeUpdates();
    
    // Set current date for date inputs
    const today = new Date().toISOString().split('T')[0];
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => {
        if (!input.value) {
            input.value = today;
        }
    });
});

/* ---------- RESPONSIVE HANDLING ---------- */
window.addEventListener('resize', () => {
    // Redraw charts on resize
    setTimeout(() => {
        drawPerformanceChart();
    }, 100);
    
    // Handle sidebar on resize
    if (window.innerWidth > 768) {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
});

/* ---------- KEYBOARD SHORTCUTS ---------- */
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K for global search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (globalSearch) {
            globalSearch.focus();
        }
    }
    
    // Ctrl/Cmd + N for new session
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        openModal('schedule-modal');
    }
    
    // Ctrl/Cmd + Shift + N for new student
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'N') {
        e.preventDefault();
        openModal('student-modal');
    }
});