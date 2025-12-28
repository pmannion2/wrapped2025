// Developer Wrapped 2025 - Main Application

let currentSlide = 0;
let totalSlides = 0;
let data = null;

// Matrix rain effect
function initMatrix() {
    const canvas = document.getElementById('matrixCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Set canvas size
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Characters - mix of code symbols and letters
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789{}[]()<>/*-+=;:.,!?@#$%^&abcdefghijklmnopqrstuvwxyz';
    const charArray = chars.split('');

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);

    // Array to track y position of each column
    const drops = Array(columns).fill(1);

    function draw() {
        // Semi-transparent black to create fade effect
        ctx.fillStyle = 'rgba(15, 12, 41, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Purple/blue gradient text color
        ctx.fillStyle = '#667eea';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            // Random character
            const char = charArray[Math.floor(Math.random() * charArray.length)];

            // Draw character
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);

            // Reset drop randomly after reaching bottom
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            // Move drop down
            drops[i]++;
        }
    }

    // Run animation at lower framerate for subtle effect
    setInterval(draw, 50);
}

// Initialize the app
async function init() {
    // Start matrix background
    initMatrix();

    try {
        const response = await fetch('data.json');
        data = await response.json();

        setupSlides();
        setupProgressDots();
        setupKeyboardNavigation();
        populateData();
        updateProgress();
    } catch (error) {
        console.error('Failed to load data:', error);
        // Use default placeholder data if fetch fails
        data = getPlaceholderData();
        setupSlides();
        setupProgressDots();
        setupKeyboardNavigation();
        populateData();
        updateProgress();
    }
}

// Get placeholder data for testing
function getPlaceholderData() {
    return {
        year: 2025,
        user: {
            name: "Developer",
            github: "username"
        },
        github: {
            totalCommits: 1247,
            longestStreak: 42,
            currentStreak: 12,
            prsOpened: 156,
            prsMerged: 143,
            reviewsGiven: 289,
            avgReviewTime: "4.2 hours",
            reviewBadge: "Thorough Reviewer",
            topLanguages: [
                { name: "TypeScript", percent: 45, color: "#3178c6" },
                { name: "Python", percent: 28, color: "#3572A5" },
                { name: "Go", percent: 15, color: "#00ADD8" },
                { name: "Rust", percent: 8, color: "#dea584" },
                { name: "JavaScript", percent: 4, color: "#f1e05a" }
            ],
            topRepos: [
                "awesome-project",
                "developer-tools",
                "api-gateway"
            ]
        },
        graphite: {
            prsCreated: 89,
            stacksLanded: 34,
            avgTimeToReview: "2.1 hours",
            mergeVelocity: "5.2 PRs/week"
        },
        fun: {
            mostProductiveDay: "Wednesday",
            favoriteCommitHour: "10 AM",
            badges: [
                "Early Bird",
                "Stack Master",
                "Review Champion",
                "Merge Machine"
            ]
        }
    };
}

// Setup slides
function setupSlides() {
    const slides = document.querySelectorAll('.slide');
    totalSlides = slides.length;
}

// Setup progress dots
function setupProgressDots() {
    const dotsContainer = document.querySelector('.progress-dots');
    dotsContainer.innerHTML = '';

    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = `progress-dot ${i === 0 ? 'active' : ''}`;
        dot.onclick = () => goToSlide(i);
        dotsContainer.appendChild(dot);
    }
}

// Setup keyboard navigation
function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault();
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prevSlide();
        }
    });

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }
}

// Navigate to next slide
function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        goToSlide(currentSlide + 1);
    }
}

// Navigate to previous slide
function prevSlide() {
    if (currentSlide > 0) {
        goToSlide(currentSlide - 1);
    }
}

// Go to specific slide
function goToSlide(index) {
    if (index < 0 || index >= totalSlides) return;

    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.progress-dot');

    // Update slides
    slides.forEach((slide, i) => {
        slide.classList.remove('active', 'prev');
        if (i === index) {
            slide.classList.add('active');
            animateSlideContent(slide);
        } else if (i < index) {
            slide.classList.add('prev');
        }
    });

    // Update dots
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });

    currentSlide = index;
    updateProgress();
    updateNavButtons();
}

// Update progress bar
function updateProgress() {
    const progressFill = document.querySelector('.progress-fill');
    const progress = ((currentSlide + 1) / totalSlides) * 100;
    progressFill.style.width = `${progress}%`;
}

// Update navigation buttons
function updateNavButtons() {
    const prevBtn = document.querySelector('.nav-btn.prev');
    const nextBtn = document.querySelector('.nav-btn.next');

    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === totalSlides - 1;
}

// Animate slide content
function animateSlideContent(slide) {
    slide.classList.add('animate-in');

    // Animate numbers
    const numbers = slide.querySelectorAll('.stat-number[data-stat]');
    numbers.forEach(el => {
        const stat = el.dataset.stat;
        const value = getStatValue(stat);
        if (typeof value === 'number') {
            animateNumber(el, value);
        }
    });

    // Animate language bars
    const languageFills = slide.querySelectorAll('.language-fill');
    languageFills.forEach(fill => {
        const percent = fill.dataset.percent;
        setTimeout(() => {
            fill.style.width = `${percent}%`;
        }, 300);
    });

    // Animate pareto bars
    const paretoFills = slide.querySelectorAll('.pareto-fill');
    paretoFills.forEach((fill, i) => {
        const percent = fill.dataset.percent;
        setTimeout(() => {
            fill.style.width = `${percent}%`;
        }, 100 + i * 50);
    });
}

// Animate number counting
function animateNumber(element, target) {
    const duration = 1500;
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (target - start) * easeOut);

        element.textContent = current.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target.toLocaleString();
        }
    }

    requestAnimationFrame(update);
}

// Get stat value from data
function getStatValue(stat) {
    if (!data) return 0;

    const mapping = {
        totalCommits: data.github?.totalCommits,
        longestStreak: data.github?.longestStreak,
        currentStreak: data.github?.currentStreak,
        prsOpened: data.github?.prsOpened,
        prsMerged: data.github?.prsMerged,
        reviewsGiven: data.github?.reviewsGiven,
        avgReviewTime: data.github?.avgReviewTime,
        reviewBadge: data.github?.reviewBadge,
        graphitePrs: data.graphite?.prsCreated,
        stacksLanded: data.graphite?.stacksLanded,
        avgTimeToReview: data.graphite?.avgTimeToReview,
        mergeVelocity: data.graphite?.mergeVelocity,
        mostProductiveDay: data.fun?.mostProductiveDay,
        favoriteCommitHour: data.fun?.favoriteCommitHour,
        userName: data.user?.name
    };

    return mapping[stat] ?? 0;
}

// Populate all data
function populateData() {
    if (!data) return;

    // Populate stat values
    document.querySelectorAll('[data-stat]').forEach(el => {
        const stat = el.dataset.stat;
        const value = getStatValue(stat);

        if (el.classList.contains('stat-number') && typeof value === 'number') {
            el.textContent = '0'; // Will be animated
        } else if (value) {
            el.textContent = value;
        }
    });

    // Populate languages
    populateLanguages();

    // Populate pareto chart
    populatePareto();

    // Populate contribution graph
    populateContributionGraph();

    // Populate badges
    populateBadges();
}

// Populate languages
function populateLanguages() {
    const container = document.getElementById('languagesContainer');
    if (!container || !data.github?.topLanguages) return;

    container.innerHTML = data.github.topLanguages.map(lang => `
        <div class="language-bar">
            <div class="language-info">
                <span class="language-name">${lang.name}</span>
                <span class="language-percent">${lang.percent}%</span>
            </div>
            <div class="language-progress">
                <div class="language-fill" data-percent="${lang.percent}" style="background: ${lang.color || 'var(--accent-gradient)'}"></div>
            </div>
        </div>
    `).join('');
}

// Populate pareto chart
function populatePareto() {
    const container = document.getElementById('paretoContainer');
    const repoCountEl = document.getElementById('repoCount');
    if (!container || !data.github?.repoPareto) return;

    const pareto = data.github.repoPareto;
    const maxCommits = pareto[0]?.commits || 1;

    if (repoCountEl) {
        repoCountEl.textContent = pareto.length;
    }

    container.innerHTML = pareto.map((item, i) => {
        const [org, repo] = item.repo.split('/');
        const isOrg = org !== 'pmannion2';
        const percent = (item.commits / maxCommits) * 100;

        return `
            <div class="pareto-bar ${isOrg ? 'org' : 'personal'}">
                <span class="pareto-rank">${i + 1}</span>
                <div class="pareto-info">
                    <div class="pareto-repo">${repo}</div>
                    <div class="pareto-org">${org}</div>
                </div>
                <div class="pareto-visual">
                    <div class="pareto-fill-container">
                        <div class="pareto-fill" data-percent="${percent}"></div>
                    </div>
                    <span class="pareto-count">${item.commits}</span>
                </div>
            </div>
        `;
    }).join('');
}

// Populate contribution graph
function populateContributionGraph() {
    const container = document.getElementById('contributionGraph');
    if (!container || !data.github?.contributionGraph) return;

    const graphData = data.github.contributionGraph;
    const maxCommits = Math.max(...graphData.map(w => w.total));

    container.innerHTML = graphData.map(week => {
        const height = maxCommits > 0 ? (week.total / maxCommits) * 100 : 0;
        const minHeight = week.total > 0 ? Math.max(height, 5) : 2; // Minimum visible height
        return `<div class="graph-bar" style="height: ${minHeight}%" data-tooltip="${week.week}: ${week.total} commits"></div>`;
    }).join('');
}

// Populate badges
function populateBadges() {
    const container = document.getElementById('badgesContainer');
    const summaryContainer = document.getElementById('summaryBadges');

    if (!data.fun?.badges) return;

    const awardIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="8" r="7"></circle>
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
    </svg>`;

    const badgesHtml = data.fun.badges.map(badge => `
        <div class="achievement-badge">
            <span class="badge-icon">${awardIcon}</span>
            <span class="badge-text">${badge}</span>
        </div>
    `).join('');

    if (container) container.innerHTML = badgesHtml;
    if (summaryContainer) summaryContainer.innerHTML = badgesHtml;
}

// Restart wrapped experience
function restartWrapped() {
    goToSlide(0);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', init);
