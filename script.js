
// Chillpops Website JavaScript
// All interactive features and animations

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initNavigation();
    initHeroAnimations();
    initScrollAnimations();
    initFlavorsScroll();
    initGallery();
    initTestimonialSlider();
    initMusicToggle();
    initDripsAnimation();
    initFormHandlers();
    initScrollEffects();
    
    console.log('🍭 Chillpops website loaded successfully!');
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navbar = document.getElementById('navbar');
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Hero section animations
function initHeroAnimations() {
    createFallingPopsicles();
    
    // Animate hero elements on load
    setTimeout(() => {
        document.querySelector('.hero-content').style.opacity = '1';
        document.querySelector('.hero-visual').style.opacity = '1';
    }, 500);
}

// Create falling popsicles animation
function createFallingPopsicles() {
    const container = document.getElementById('fallingPopsicles');
    const popsicleEmojis = ['🍭', '🍡', '🧊', '🍓', '🥭', '🥥', '🫐'];
    
    function createPopsicle() {
        const popsicle = document.createElement('div');
        popsicle.className = 'falling-popsicle';
        popsicle.textContent = popsicleEmojis[Math.floor(Math.random() * popsicleEmojis.length)];
        
        // Random position and animation
        popsicle.style.left = Math.random() * 100 + '%';
        popsicle.style.animationDuration = (Math.random() * 3 + 5) + 's';
        popsicle.style.animationDelay = Math.random() * 2 + 's';
        
        container.appendChild(popsicle);
        
        // Remove after animation
        setTimeout(() => {
            if (popsicle.parentNode) {
                popsicle.parentNode.removeChild(popsicle);
            }
        }, 8000);
    }
    
    // Create popsicles at intervals
    setInterval(createPopsicle, 2000);
    
    // Create initial popsicles
    for (let i = 0; i < 3; i++) {
        setTimeout(createPopsicle, i * 1000);
    }
}

// Scroll animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate SVG paths
                const svgPaths = entry.target.querySelectorAll('.title-underline path');
                svgPaths.forEach(path => {
                    path.style.animation = 'drawLine 2s ease-out forwards';
                });
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all fade-in elements
    document.querySelectorAll('.fade-in-element').forEach(el => {
        observer.observe(el);
    });
}

// Flavors scroll functionality
function initFlavorsScroll() {
    const scrollContainer = document.getElementById('flavorsScroll');
    const scrollLeftBtn = document.getElementById('scrollLeft');
    const scrollRightBtn = document.getElementById('scrollRight');
    
    if (!scrollContainer) return;
    
    let currentPosition = 0;
    const cardWidth = 320; // Card width + gap
    const visibleCards = Math.floor(window.innerWidth / cardWidth);
    const maxScroll = scrollContainer.children.length - visibleCards;
    
    // Auto-scroll functionality
    let autoScrollInterval;
    
    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            scrollRight();
        }, 4000);
    }
    
    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }
    
    function scrollLeft() {
        if (currentPosition > 0) {
            currentPosition--;
            updateScrollPosition();
        } else {
            // Loop to end
            currentPosition = Math.max(0, maxScroll);
            updateScrollPosition();
        }
    }
    
    function scrollRight() {
        if (currentPosition < maxScroll) {
            currentPosition++;
            updateScrollPosition();
        } else {
            // Loop to beginning
            currentPosition = 0;
            updateScrollPosition();
        }
    }
    
    function updateScrollPosition() {
        const translateX = -currentPosition * cardWidth;
        scrollContainer.style.transform = `translateX(${translateX}px)`;
    }
    
    // Event listeners
    scrollLeftBtn.addEventListener('click', () => {
        stopAutoScroll();
        scrollLeft();
        setTimeout(startAutoScroll, 5000);
    });
    
    scrollRightBtn.addEventListener('click', () => {
        stopAutoScroll();
        scrollRight();
        setTimeout(startAutoScroll, 5000);
    });
    
    // Touch/drag support for mobile
    let isDown = false;
    let startX;
    let scrollLeft;
    
    scrollContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - scrollContainer.offsetLeft;
        scrollLeft = currentPosition * cardWidth;
        stopAutoScroll();
    });
    
    scrollContainer.addEventListener('mouseleave', () => {
        isDown = false;
        setTimeout(startAutoScroll, 5000);
    });
    
    scrollContainer.addEventListener('mouseup', () => {
        isDown = false;
        setTimeout(startAutoScroll, 5000);
    });
    
    scrollContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scrollContainer.offsetLeft;
        const walk = (x - startX) * 2;
        const newPosition = Math.max(0, Math.min(maxScroll, Math.round((scrollLeft - walk) / cardWidth)));
        
        if (newPosition !== currentPosition) {
            currentPosition = newPosition;
            updateScrollPosition();
        }
    });
    
    // Start auto-scroll
    startAutoScroll();
    
    // Pause auto-scroll on hover
    scrollContainer.addEventListener('mouseenter', stopAutoScroll);
    scrollContainer.addEventListener('mouseleave', () => {
        setTimeout(startAutoScroll, 2000);
    });
    
    // Flavor card hover effects
    document.querySelectorAll('.flavor-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            
            // Add pop effect
            const popsicle = this.querySelector('.flavor-popsicle');
            if (popsicle) {
                popsicle.style.animation = 'wiggle 0.5s ease-in-out';
                setTimeout(() => {
                    popsicle.style.animation = '';
                }, 500);
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Gallery functionality
function initGallery() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDescription = document.getElementById('lightboxDescription');
    const lightboxClose = document.querySelector('.lightbox-close');
    
    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            galleryItems.forEach(item => {
                const category = item.dataset.category;
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Lightbox functionality
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const bgImage = getComputedStyle(this.querySelector('.gallery-image')).backgroundImage;
            const title = this.querySelector('.gallery-overlay h3').textContent;
            const description = this.querySelector('.gallery-overlay p').textContent;
            
            // Create a canvas to convert gradient to image for lightbox
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 800;
            canvas.height = 600;
            
            // Create gradient based on item class
            let gradient;
            if (this.querySelector('.tropical-paradise')) {
                gradient = ctx.createRadialGradient(240, 180, 0, 240, 180, 400);
                gradient.addColorStop(0, '#ffa726');
                gradient.addColorStop(0.5, '#ffcc02');
                gradient.addColorStop(1, '#ffe66d');
            } else if (this.querySelector('.vanilla-dreams')) {
                gradient = ctx.createRadialGradient(560, 120, 0, 560, 120, 400);
                gradient.addColorStop(0, '#f8f9fa');
                gradient.addColorStop(0.5, '#e9ecef');
                gradient.addColorStop(1, '#dee2e6');
            } else if (this.querySelector('.berry-medley')) {
                gradient = ctx.createRadialGradient(400, 420, 0, 400, 420, 400);
                gradient.addColorStop(0, '#6c5ce7');
                gradient.addColorStop(0.5, '#a29bfe');
                gradient.addColorStop(1, '#fd79a8');
            } else if (this.querySelector('.golden-sunset')) {
                gradient = ctx.createRadialGradient(320, 360, 0, 320, 360, 400);
                gradient.addColorStop(0, '#fdcb6e');
                gradient.addColorStop(0.5, '#e17055');
                gradient.addColorStop(1, '#fd79a8');
            } else if (this.querySelector('.chocolate-swirl')) {
                gradient = ctx.createRadialGradient(480, 240, 0, 480, 240, 400);
                gradient.addColorStop(0, '#6c5ce7');
                gradient.addColorStop(0.5, '#2d3436');
                gradient.addColorStop(1, '#636e72');
            } else {
                gradient = ctx.createRadialGradient(240, 420, 0, 240, 420, 400);
                gradient.addColorStop(0, '#ffa726');
                gradient.addColorStop(0.5, '#ffe66d');
                gradient.addColorStop(1, '#55a3ff');
            }
            
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 800, 600);
            
            lightboxImage.src = canvas.toDataURL();
            lightboxTitle.textContent = title;
            lightboxDescription.textContent = description;
            
            lightbox.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Animate lightbox
            setTimeout(() => {
                lightbox.style.opacity = '1';
                lightboxImage.style.transform = 'scale(1)';
            }, 10);
        });
    });
    
    // Close lightbox
    function closeLightbox() {
        lightbox.style.opacity = '0';
        setTimeout(() => {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }
    
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === 'block' && e.key === 'Escape') {
            closeLightbox();
        }
    });
}

// Testimonial slider
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        // Remove active dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current testimonial
        if (testimonials[index]) {
            testimonials[index].classList.add('active');
            dots[index].classList.add('active');
        }
    }
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentTestimonial = index;
            showTestimonial(currentTestimonial);
        });
    });
    
    // Auto-advance testimonials
    setInterval(nextTestimonial, 5000);
}

// Music toggle functionality
function initMusicToggle() {
    const musicToggle = document.getElementById('musicToggle');
    const backgroundMusic = document.getElementById('backgroundMusic');
    let isPlaying = false;
    
    musicToggle.addEventListener('click', function() {
        if (isPlaying) {
            backgroundMusic.pause();
            musicToggle.style.opacity = '0.6';
            musicToggle.querySelector('.music-icon').textContent = '🔇';
        } else {
            // Note: Browsers require user interaction to play audio
            backgroundMusic.play().catch(e => {
                console.log('Audio play failed:', e);
            });
            musicToggle.style.opacity = '1';
            musicToggle.querySelector('.music-icon').textContent = '🎵';
        }
        isPlaying = !isPlaying;
    });
}

// Drips animation on scroll
function initDripsAnimation() {
    const dripsContainer = document.getElementById('dripsContainer');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        const scrollDelta = Math.abs(currentScrollY - lastScrollY);
        
        // Create drips on significant scroll
        if (scrollDelta > 50) {
            createDrip();
            lastScrollY = currentScrollY;
        }
    });
    
    function createDrip() {
        const drip = document.createElement('div');
        drip.className = 'drip';
        drip.style.left = Math.random() * 100 + '%';
        drip.style.height = Math.random() * 20 + 10 + 'px';
        drip.style.animationDuration = Math.random() * 1 + 0.5 + 's';
        
        dripsContainer.appendChild(drip);
        
        // Remove drip after animation
        setTimeout(() => {
            if (drip.parentNode) {
                drip.parentNode.removeChild(drip);
            }
        }, 2000);
    }
}

// Form handlers
function initFormHandlers() {
    // Franchise form
    const franchiseForm = document.getElementById('franchiseForm');
    if (franchiseForm) {
        franchiseForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.querySelector('span').textContent;
            
            submitBtn.querySelector('span').textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.querySelector('span').textContent = '✅ Sent!';
                
                setTimeout(() => {
                    submitBtn.querySelector('span').textContent = originalText;
                    submitBtn.disabled = false;
                    this.reset();
                    
                    // Show success message
                    showNotification('Thank you! We\'ll be in touch soon! 🍭', 'success');
                }, 2000);
            }, 1500);
            
            console.log('Franchise form submitted:', data);
        });
    }
    
    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.querySelector('span').textContent;
            
            submitBtn.querySelector('span').textContent = 'Subscribing...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.querySelector('span').textContent = '✅ Subscribed!';
                
                setTimeout(() => {
                    submitBtn.querySelector('span').textContent = originalText;
                    submitBtn.disabled = false;
                    this.reset();
                    
                    showNotification('Welcome to the Chillpops family! 🎉', 'success');
                }, 2000);
            }, 1000);
            
            console.log('Newsletter subscription:', email);
        });
    }
}

// Scroll effects
function initScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax effect for hero background
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Utility functions
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 80; // Account for fixed navbar
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #ff6b9d, #ffe66d);
        color: white;
        padding: 1rem 2rem;
        border-radius: 25px;
        box-shadow: 0 10px 30px rgba(255, 107, 157, 0.3);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 600;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Lazy loading for better performance
function initLazyLoading() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('loading');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('Chillpops error:', e.error);
});

// Resize handler
window.addEventListener('resize', debounce(function() {
    // Recalculate scroll positions and animations on resize
    if (window.innerWidth <= 768) {
        // Mobile optimizations
        document.querySelectorAll('.scroll-btn').forEach(btn => {
            btn.style.display = 'none';
        });
    } else {
        document.querySelectorAll('.scroll-btn').forEach(btn => {
            btn.style.display = 'flex';
        });
    }
}, 250));

// Export functions for global access
window.scrollToSection = scrollToSection;
window.showNotification = showNotification;

console.log('🍭 Chillpops JavaScript loaded and ready!');
