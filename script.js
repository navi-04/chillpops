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
});
