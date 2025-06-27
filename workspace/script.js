document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const navbarContainer = document.querySelector('.navbar-container');
    const mobileToggle = document.querySelector('.navbar-toggle');
    const navbarNav = document.querySelector('.navbar-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const navItems = document.querySelectorAll('.nav-item');
    const body = document.body;
    
    // Create menu overlay for mobile
    const menuOverlay = document.createElement('div');
    menuOverlay.className = 'menu-overlay';
    body.appendChild(menuOverlay);

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
    
    // Remove the magnetic hover effect and replace with cleaner animations
    navItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        
        // Add subtle underline animation instead of magnetic effect
        item.addEventListener('mouseenter', function() {
            link.style.transition = 'all 0.3s ease';
            link.style.transform = 'translateY(-2px)';
            link.style.textShadow = '0 2px 10px rgba(255, 255, 255, 0.3)';
        });
        
        item.addEventListener('mouseleave', function() {
            link.style.transform = 'translateY(0)';
            link.style.textShadow = 'none';
        });
    });

    // Toggle mobile menu with improved functionality
    mobileToggle.addEventListener('click', function() {
        mobileToggle.classList.toggle('active');
        navbarNav.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        
        // Lock scroll when menu is open
        if (navbarNav.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    });
    
    // Close mobile menu when clicking on overlay
    menuOverlay.addEventListener('click', function() {
        mobileToggle.classList.remove('active');
        navbarNav.classList.remove('active');
        menuOverlay.classList.remove('active');
        body.style.overflow = '';
    });
    
    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileToggle.classList.remove('active');
            navbarNav.classList.remove('active');
            menuOverlay.classList.remove('active');
            body.style.overflow = '';
        });
    });
    
    // Close mobile menu when resizing to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navbarNav.classList.contains('active')) {
            mobileToggle.classList.remove('active');
            navbarNav.classList.remove('active');
            menuOverlay.classList.remove('active');
            body.style.overflow = '';
        }
    });
    
    // Add smooth scrolling for anchor links with simpler active state
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
                    // Remove confetti and replace with simple highlight effect
                    addClickEffect(this);
                    
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Add a simple pulse highlight effect when clicking nav links
    function addClickEffect(element) {
        // Create and append a pulse effect element
        const pulseEffect = document.createElement('span');
        pulseEffect.className = 'nav-pulse';
        element.appendChild(pulseEffect);
        
        // Remove the effect after animation completes
        setTimeout(() => {
            if (pulseEffect.parentNode === element) {
                element.removeChild(pulseEffect);
            }
        }, 700);
    }
    
    // Add active class to current section's link
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Franchise Section Scripts
    document.addEventListener('DOMContentLoaded', function() {
        // Mobile navigation toggle
        const navbarToggle = document.querySelector('.navbar-toggle');
        const navbarNav = document.querySelector('.navbar-nav');
        
        if (navbarToggle) {
            navbarToggle.addEventListener('click', function() {
                navbarNav.classList.toggle('active');
                this.classList.toggle('active');
            });
        }

        // Animation for franchise features on scroll
        const franchiseFeatures = document.querySelectorAll('.franchise-section .feature');
        
        // Check if Intersection Observer is supported
        if ('IntersectionObserver' in window) {
            const featureObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Add a slight delay for small features to create a cascade effect
                        if (entry.target.classList.contains('feature-small')) {
                            setTimeout(() => {
                                entry.target.classList.add('animated');
                            }, 150 * Array.from(franchiseFeatures).indexOf(entry.target) % 3);
                        } else {
                            entry.target.classList.add('animated');
                        }
                        featureObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            franchiseFeatures.forEach(feature => {
                featureObserver.observe(feature);
            });
        }
        
        // Add stats counters to franchise section
        const franchiseSection = document.querySelector('.franchise-section .about-text');
        if (franchiseSection) {
            // Create stats element
            const statsHTML = `
                <div class="franchise-stats">
                    <div class="stat-item">
                        <span class="stat-number" data-count="50">0</span>
                        <span class="stat-label">Locations</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number" data-count="95">0</span>
                        <span class="stat-label">Success Rate</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number" data-count="5000">0</span>
                        <span class="stat-label">Daily Customers</span>
                    </div>
                </div>
            `;
            
            // Insert after the first paragraph
            const firstParagraph = franchiseSection.querySelector('p');
            if (firstParagraph) {
                firstParagraph.insertAdjacentHTML('afterend', statsHTML);
            }
            
            // Animate counter when in view
            const statsSection = document.querySelector('.franchise-stats');
            if (statsSection && 'IntersectionObserver' in window) {
                const statsObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            animateCounters();
                            statsObserver.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.5 });
                
                statsObserver.observe(statsSection);
            }
        }
        
        // Franchise brochure download handler
        const brochureBtn = document.querySelector('.franchise-section .btn-secondary');
        if (brochureBtn) {
            brochureBtn.addEventListener('click', function(e) {
                e.preventDefault();
                alert('Thank you for your interest! The franchise brochure will begin downloading shortly.');
                // In a real implementation, you would trigger the file download here
                setTimeout(() => {
                    window.location.href = 'brochure/chillpops_franchise_brochure.pdf';
                }, 1000);
            });
        }
    });

    // Counter animation function
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200; // The lower the faster
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            const increment = target / speed;
            
            let currentCount = 0;
            const updateCount = () => {
                currentCount += increment;
                if (currentCount < target) {
                    counter.innerText = Math.ceil(currentCount);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };
            
            updateCount();
        });
    }
    
    // Add flavor section scroll animation
    document.addEventListener('DOMContentLoaded', function() {
        // Horizontal scroll indicator for flavor section
        const flavourScroll = document.querySelector('.flavour-scroll');
        if (flavourScroll) {
            // Add drag scroll functionality for better mobile experience
            let isDown = false;
            let startX;
            let scrollLeft;
            
            flavourScroll.addEventListener('mousedown', (e) => {
                isDown = true;
                flavourScroll.style.cursor = 'grabbing';
                startX = e.pageX - flavourScroll.offsetLeft;
                scrollLeft = flavourScroll.scrollLeft;
            });
            
            flavourScroll.addEventListener('mouseleave', () => {
                isDown = false;
                flavourScroll.style.cursor = 'grab';
            });
            
            flavourScroll.addEventListener('mouseup', () => {
                isDown = false;
                flavourScroll.style.cursor = 'grab';
            });
            
            flavourScroll.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - flavourScroll.offsetLeft;
                const walk = (x - startX) * 2; // Scroll speed
                flavourScroll.scrollLeft = scrollLeft - walk;
            });
            
            // Set initial grab cursor
            flavourScroll.style.cursor = 'grab';
        }
    });
    
    // Control flavor section background visibility
    document.addEventListener('DOMContentLoaded', function() {
        // Background visibility control
        const flavourSection = document.querySelector('.flavour-section');
        const flavourBackground = document.querySelector('.flavour-background');
        
        if (flavourSection && flavourBackground) {
            // Function to check if flavor section is in viewport
            function isInViewport(element) {
                const rect = element.getBoundingClientRect();
                return (
                    rect.top < window.innerHeight &&
                    rect.bottom > 0
                );
            }
            
            // Function to update flavor section background visibility
            function updateFlavourBackground() {
                if (isInViewport(flavourSection)) {
                    flavourSection.classList.add('active');
                } else {
                    flavourSection.classList.remove('active');
                }
            }
            
            // Initial check
            updateFlavourBackground();
            
            // Check on scroll
            window.addEventListener('scroll', updateFlavourBackground);
            
            // Check on resize
            window.addEventListener('resize', updateFlavourBackground);
        }
    });
    
    // Enhanced user experience for flavour section scrolling with FIXED mobile scrolling
    document.addEventListener('DOMContentLoaded', function() {
        const flavourScroll = document.querySelector('.flavour-scroll');
        
        if (flavourScroll) {
            // Force horizontal scroll mode and prevent vertical scrolling interference
            flavourScroll.style.overflowX = 'scroll';
            flavourScroll.style.overflowY = 'hidden';
            flavourScroll.style.webkitOverflowScrolling = 'touch'; // Smooth scrolling on iOS
            
            // Make sure content is actually scrollable by checking width
            function updateScrollability() {
                const isScrollable = flavourScroll.scrollWidth > flavourScroll.clientWidth;
                
                // If not scrollable, adjust the spacing to make it scrollable
                if (!isScrollable && window.innerWidth < 768) {
                    const items = flavourScroll.querySelectorAll('.flavour-item');
                    if (items.length) {
                        items.forEach(item => {
                            item.style.minWidth = '85%';
                            item.style.marginRight = '15%';
                        });
                    }
                }
            }
            
            // Run on load and resize
            updateScrollability();
            window.addEventListener('resize', updateScrollability);
            
            // Add visual indicators that content is scrollable (left and right arrows)
            const leftIndicator = document.createElement('div');
            leftIndicator.className = 'scroll-indicator left';
            leftIndicator.innerHTML = '←';
            leftIndicator.style.opacity = '0'; // Start hidden as we're at the beginning
            
            const rightIndicator = document.createElement('div');
            rightIndicator.className = 'scroll-indicator right';
            rightIndicator.innerHTML = '→';
            
            // Add mobile-specific indicator for full scrolling
            const mobileScrollHint = document.createElement('div');
            mobileScrollHint.className = 'mobile-scroll-hint';
            mobileScrollHint.innerHTML = 'Swipe to see all flavours →';
            mobileScrollHint.style.display = window.innerWidth < 768 ? 'block' : 'none';
            
            // Hide hint after the user starts scrolling
            flavourScroll.addEventListener('scroll', function() {
                if (flavourScroll.scrollLeft > 10) {
                    mobileScrollHint.style.opacity = '0';
                    setTimeout(() => {
                        mobileScrollHint.style.display = 'none';
                    }, 300);
                }
            });
            
            flavourScroll.appendChild(leftIndicator);
            flavourScroll.appendChild(rightIndicator);
            flavourScroll.appendChild(mobileScrollHint);
            
            // Implement touch-optimized scrolling for mobile
            let touchStartX = 0;
            let touchEndX = 0;
            
            flavourScroll.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });
            
            flavourScroll.addEventListener('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, { passive: true });
            
            function handleSwipe() {
                const distance = touchStartX - touchEndX;
                
                // If the user swiped with enough force, scroll a significant amount
                if (Math.abs(distance) > 50) {
                    flavourScroll.scrollBy({
                        left: distance * 1.5,
                        behavior: 'smooth'
                    });
                }
            }
            
            // Make scrolling more reliable by adding scroll snapping
            flavourScroll.style.scrollSnapType = 'x mandatory';
            const flavourItems = flavourScroll.querySelectorAll('.flavour-item');
            if (flavourItems.length) {
                flavourItems.forEach(item => {
                    item.style.scrollSnapAlign = 'start';
                });
            }
            
            // Ensure the scroll area is wide enough to scroll fully
            const flavourScrollCheck = setInterval(() => {
                if (flavourScroll.scrollWidth <= flavourScroll.clientWidth && flavourItems.length) {
                    // Force more width to allow full scrolling
                    const lastItem = flavourItems[flavourItems.length - 1];
                    lastItem.style.marginRight = '30px';
                    
                    // Stop checking once fixed
                    if (flavourScroll.scrollWidth > flavourScroll.clientWidth) {
                        clearInterval(flavourScrollCheck);
                    }
                } else {
                    clearInterval(flavourScrollCheck);
                }
            }, 500);
            
            // Initial auto scroll hint with improved animation for mobile awareness
            setTimeout(() => {
                // Only do auto-scroll hint if not already scrolled
                if (flavourScroll.scrollLeft < 5) {
                    flavourScroll.scrollBy({
                        left: 120,
                        behavior: 'smooth'
                    });
                    
                    setTimeout(() => {
                        flavourScroll.scrollBy({
                            left: -120,
                            behavior: 'smooth'
                        });
                    }, 800);
                }
            }, 1500);
        }
    });
});
