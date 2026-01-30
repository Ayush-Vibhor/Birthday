// Navigation function - must be global for onclick handlers
let currentPage = 1;

function goToPage(pageNumber) {
    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    const nextPage = document.getElementById(`page${pageNumber}`);
    if (nextPage) {
        nextPage.classList.add("active");
        currentPage = pageNumber;
        window.scrollTo(0, 0);
    } else {
        console.error("Page not found:", pageNumber);
    }
}

// Initialize - show first page
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    // Show first page immediately (in case it's not already active)
    const firstPage = document.getElementById('page1');
    if (firstPage) {
        firstPage.classList.add('active');
        console.log('First page activated');
    } else {
        console.error('First page not found!');
    }
    
    // Add confetti animation for page 4
    createConfetti();
    console.log('Initialization complete');
});

// Create confetti effect for cake page
function createConfetti() {
    const confettiContainer = document.querySelector('.confetti');
    if (!confettiContainer) return;
    
    const colors = ['#ff6b6b', '#667eea', '#f093fb', '#4ecdc4', '#ffe66d', '#ff9ff3'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.opacity = Math.random();
        confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear infinite`;
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confettiContainer.appendChild(confetti);
    }
}

// Add smooth scroll for photo gallery and click effects
document.addEventListener('DOMContentLoaded', function() {
    const photoGallery = document.querySelector('.photo-gallery');
    if (photoGallery) {
        photoGallery.style.scrollBehavior = 'smooth';
    }
    
    // Add click and touch effects to photos for mobile support
    const photoItems = document.querySelectorAll('.photo-item');
    photoItems.forEach(item => {
        // Click effect
        item.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
        
        // Touch support for mobile - show message on tap
        let touchStartTime = 0;
        item.addEventListener('touchstart', function(e) {
            touchStartTime = Date.now();
            this.classList.add('touched');
        });
        
        item.addEventListener('touchend', function(e) {
            const touchDuration = Date.now() - touchStartTime;
            if (touchDuration < 300) {
                // Quick tap - toggle message
                this.classList.toggle('touched');
            }
            // Keep message visible for a moment
            setTimeout(() => {
                if (!this.matches(':hover')) {
                    this.classList.remove('touched');
                }
            }, 2000);
        });
    });
    
    // Prevent zoom on double tap for mobile
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
});
