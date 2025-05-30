document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const navbarContainer = document.querySelector('.navbar-container');
    const mobileToggle = document.querySelector('.navbar-toggle');
    const navbarNav = document.querySelector('.navbar-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const navItems = document.querySelectorAll('.nav-item');

    // Add unique floating effect to navbar
    let prevScrollPos = window.pageYOffset;
    
    window.addEventListener('scroll', function() {
        // Floating effect on scroll
        let currentScrollPos = window.pageYOffset;
        
        if (currentScrollPos > 150) {
            // When scrolled down, add floating effect
            navbar.style.borderRadius = '0 0 20px 20px';
            navbar.style.margin = '0 10px';
            navbar.style.width = 'calc(100% - 20px)';
            navbar.style.boxShadow = '0 10px 30px rgba(235, 45, 89, 0.25)';
            navbar.style.backdropFilter = 'blur(5px)';
            navbar.style.background = 'linear-gradient(135deg, rgba(235, 45, 89, 0.95) 0%, rgba(255, 92, 132, 0.95) 100%)';
        } else {
            // Reset to original state
            navbar.style.borderRadius = '0';
            navbar.style.margin = '0';
            navbar.style.width = '100%';
            navbar.style.boxShadow = '0 2px 15px rgba(235, 45, 89, 0.3)';
            navbar.style.backdropFilter = 'none';
            navbar.style.background = 'linear-gradient(135deg, #eb2d59 0%, #ff5c84 100%)';
        }
        
        // Hide/show navbar on scroll
        if (prevScrollPos > currentScrollPos) {
            navbar.style.top = "0";
        } else {
            navbar.style.top = "-100px";
        }
        
        if (currentScrollPos < 50) {
            navbar.style.top = "0"; // Always show at top of page
        }
        
        prevScrollPos = currentScrollPos;
    });
    
    // Add shimmer effect to brand name
    const brandName = document.querySelector('.navbar-brand h1');
    brandName.innerHTML = brandName.textContent.split('').map(char => 
        `<span class="shimmer-char">${char}</span>`
    ).join('');
    
    const shimmerChars = document.querySelectorAll('.shimmer-char');
    shimmerChars.forEach((char, index) => {
        char.style.display = 'inline-block';
        char.style.transition = 'transform 0.3s ease, color 0.3s ease';
        char.style.transformOrigin = 'bottom center';
        
        // Random shimmer effect on hover
        brandName.addEventListener('mouseover', function() {
            setTimeout(() => {
                char.style.color = '#fff';
                char.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.8)';
                char.style.transform = 'translateY(-3px)';
            }, 30 * index);
        });
        
        brandName.addEventListener('mouseout', function() {
            setTimeout(() => {
                char.style.color = '';
                char.style.textShadow = '';
                char.style.transform = 'translateY(0)';
            }, 30 * index);
        });
    });
    
    // Magnetic hover effect for nav items
    navItems.forEach(item => {
        item.addEventListener('mousemove', function(e) {
            const link = item.querySelector('.nav-link');
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            link.style.transform = `translate(${(x - rect.width / 2) / 10}px, ${(y - rect.height / 2) / 10}px)`;
        });
        
        item.addEventListener('mouseleave', function() {
            const link = item.querySelector('.nav-link');
            link.style.transform = 'translate(0, 0)';
        });
    });

    // Toggle mobile menu
    mobileToggle.addEventListener('click', function() {
        mobileToggle.classList.toggle('active');
        navbarNav.classList.toggle('active');
    });

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileToggle.classList.remove('active');
            navbarNav.classList.remove('active');
        });
    });

    // Add smooth scrolling for anchor links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Add active class to clicked link
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
            
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Create a confetti burst effect when clicking menu items
                    createConfettiBurst(e.clientX, e.clientY);
                    
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Create confetti burst function
    function createConfettiBurst(x, y) {
        const confettiCount = 20;
        const colors = ['#fff', '#ff9eb3', '#ffcad4'];
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            const size = Math.random() * 8 + 4;
            
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.position = 'fixed';
            confetti.style.zIndex = '9999';
            confetti.style.left = `${x}px`;
            confetti.style.top = `${y}px`;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            
            document.body.appendChild(confetti);
            
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 5 + 5;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            // Animate the confetti
            const startTime = Date.now();
            
            function animateConfetti() {
                const elapsed = Date.now() - startTime;
                const duration = 1000; // 1 second
                
                if (elapsed < duration) {
                    const progress = elapsed / duration;
                    const x = parseFloat(confetti.style.left) + vx;
                    const y = parseFloat(confetti.style.top) + vy + progress * 20; // Add gravity
                    const opacity = 1 - progress;
                    
                    confetti.style.left = `${x}px`;
                    confetti.style.top = `${y}px`;
                    confetti.style.opacity = opacity;
                    
                    requestAnimationFrame(animateConfetti);
                } else {
                    document.body.removeChild(confetti);
                }
            }
            
            requestAnimationFrame(animateConfetti);
        }
    }
});
