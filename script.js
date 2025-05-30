document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle - Improved functionality
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open'); // Prevent background scrolling when menu is open
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }

    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Add scroll effect to navbar - Optimized for performance
    let lastScrollTop = 0;
    let scrollTimer;
    
    window.addEventListener('scroll', () => {
        // Debounce the scroll event for better performance
        if (scrollTimer) clearTimeout(scrollTimer);
        
        scrollTimer = setTimeout(() => {
            const navbar = document.querySelector('.navbar');
            const currentScrollTop = window.scrollY;
            
            if (currentScrollTop > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            lastScrollTop = currentScrollTop;
        }, 10);
    });
    
    // Popsicle additional animation
    const popsicle = document.querySelector('.popsicle');

    // Add a slight rotation on mouse movement
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;

        if (popsicle) {
            popsicle.style.transform = `rotateX(${mouseY * 10}deg) rotateY(${mouseX * 10}deg)`;
        }
    });

    // Add interaction to the CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            // You can add navigation or modal opening here
            console.log('CTA button clicked');
        });
    }
    
    // Animated counter for stats section
    const animateCounter = (element, target, duration) => {
        const startTime = performance.now();
        const startValue = 0;
        
        const updateCounter = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const value = Math.floor(progress * (target - startValue) + startValue);
            
            element.textContent = value + (element.dataset.suffix || '');
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        };
        
        requestAnimationFrame(updateCounter);
    };
    
    // Start counting when elements are in viewport
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: "0px"
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.value || entry.target.textContent);
                animateCounter(entry.target, target, 2000);
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => {
        stat.dataset.value = stat.textContent;
        stat.textContent = '0';
        statsObserver.observe(stat);
    });
    
    // Add hover effect to image badges
    const badges = document.querySelectorAll('.image-badge');
    badges.forEach(badge => {
        badge.addEventListener('mouseenter', () => {
            badge.style.transform = badge.classList.contains('top') ? 
                'rotate(5deg) scale(1.1)' : 'rotate(-5deg) scale(1.1)';
        });
        
        badge.addEventListener('mouseleave', () => {
            badge.style.transform = badge.classList.contains('top') ? 
                'rotate(5deg)' : 'rotate(-5deg)';
        });
    });
    
    // Add a reveal animation for sections as they come into view
    const revealSections = document.querySelectorAll('.reveal-section');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    revealSections.forEach(section => {
        revealObserver.observe(section);
    });
    
    // Interactive flavor picker
    const flavorButtons = document.querySelectorAll('.flavor-btn');
    const heroImage = document.querySelector('.hero-image img');
    
    if (flavorButtons.length && heroImage) {
        flavorButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                flavorButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Change image based on data attribute
                const flavor = button.dataset.flavor;
                heroImage.src = `images/popsicle-${flavor}.png`;
                
                // Add a small animation to the image
                heroImage.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    heroImage.style.transform = 'scale(1)';
                }, 200);
            });
        });
    }
    
    // Magnetic effect for primary button
    const primaryBtn = document.querySelector('.primary-btn');
    if (primaryBtn) {
        primaryBtn.addEventListener('mousemove', (e) => {
            const rect = primaryBtn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const moveX = (x - centerX) * 0.1;
            const moveY = (y - centerY) * 0.1;
            
            primaryBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        primaryBtn.addEventListener('mouseleave', () => {
            primaryBtn.style.transform = 'translate(0, 0)';
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu
                const hamburger = document.querySelector('.hamburger');
                const navMenu = document.querySelector('.nav-menu');
                if (hamburger && navMenu) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            }
        });
    });
});
