import { flavours, aboutFeatures, franchiseFeatures, franchiseStats, contactInfo, franchiseLocations } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // INITIALIZATION & DOM POPULATION
    // ----------------------------------------------------
    
    // Set Footer Year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Custom Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorGlow = document.querySelector('.cursor-glow');

    if (cursorDot && cursorGlow) {
        window.addEventListener('mousemove', (e) => {
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
            cursorGlow.style.left = `${e.clientX}px`;
            cursorGlow.style.top = `${e.clientY}px`;
        });
        
        // Hover effects on links and buttons
        const interactables = document.querySelectorAll('a, button, .btn, .bento-panel, .flavour-card');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorGlow.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorGlow.style.background = 'rgba(255, 42, 95, 0.15)'; // Light theme accent glow
            });
            el.addEventListener('mouseleave', () => {
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorGlow.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorGlow.style.background = 'rgba(255, 42, 95, 0.05)';
            });
        });
    }

    // Populate Franchise Features
    const franchiseFeatContainer = document.querySelector('.franchise-features-list');
    if (franchiseFeatContainer) {
        franchiseFeatContainer.innerHTML = franchiseFeatures.map((feat, i) => `
            <div class="mt-3">
                <h4 style="font-size:1.1rem; margin-bottom:0.25rem;">${feat.icon} ${feat.title}</h4>
                <p class="text-muted" style="font-size:0.95rem;">${feat.description}</p>
            </div>
        `).join('');
    }

    // Populate Franchise Stats
    const franchiseStatsContainer = document.querySelector('.franchise-stats-container');
    if (franchiseStatsContainer) {
        franchiseStatsContainer.innerHTML = franchiseStats.map(stat => `
            <div class="stat-item">
                <div class="stat-number" data-count="${stat.count}">0</div>
                <div class="stat-label">${stat.label}</div>
            </div>
        `).join('');
    }

    // Populate Franchise Locations
    const locationShowcase = document.querySelector('.location-showcase');
    if (locationShowcase) {
        locationShowcase.innerHTML = franchiseLocations.map(loc => `
            <div class="location-card">
                <div class="icon">${loc.icon}</div>
                <h4>${loc.city}</h4>
                <p>${loc.count} Store${loc.count > 1 ? 's' : ''}</p>
            </div>
        `).join('');
    }

    // Populate Flavours
    const flavoursContainer = document.querySelector('.flavour-items');
    if (flavoursContainer) {
        flavoursContainer.innerHTML = flavours.map(flavour => `
            <div class="flavour-card">
                <div class="flavour-card-img-wrap">
                    <img src="${flavour.image}" alt="${flavour.name}" class="flavour-card-img" loading="lazy">
                </div>
                <h3>${flavour.name}</h3>
                <p>${flavour.description}</p>
                <div class="flavour-tags">
                    ${flavour.tags.map(tag => `<span class="tag ${tag.toLowerCase() === 'bestseller' ? 'featured' : ''}">${tag}</span>`).join('')}
                </div>
            </div>
        `).join('');
    }

    // Populate Contact Information
    const addressEl = document.querySelector('.contact-address');
    const phonesEl = document.querySelector('.contact-phones');
    const hoursList = document.querySelector('.hours-list');
    const socialLinks = document.querySelector('.social-links');

    if (addressEl) addressEl.innerHTML = contactInfo.address;
    if (phonesEl) phonesEl.innerHTML = `<a href="tel:${contactInfo.phone}" style="color:white; font-size:1.25rem; font-weight:700;">${contactInfo.phone}</a><br/><a href="mailto:${contactInfo.email}" style="color:rgba(255,255,255,0.8);">${contactInfo.email}</a>`;
    
    if (hoursList) {
        hoursList.innerHTML = contactInfo.hours.map(hour => `
            <li class="hour-item">
                <strong>${hour.day}</strong> 
                <span>${hour.time}</span>
            </li>
        `).join('');
    }

    if (socialLinks) {
        socialLinks.innerHTML = contactInfo.social.map(social => `
            <a href="${social.url}" class="social-link" target="_blank" rel="noopener noreferrer" title="${social.platform}">
                <i class="${social.platform.toLowerCase().includes('instagram') ? 'ph-fill ph-instagram-logo' : 'ph-fill ph-phone'}"></i>
            </a>
        `).join('');
    }

    // ----------------------------------------------------
    // UI INTERACTIONS & GSAP ANIMATIONS
    // ----------------------------------------------------
    
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const navToggle = document.querySelector('.navbar-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navToggle.innerHTML = mobileMenu.classList.contains('active') 
                ? '<i class="ph ph-x"></i>' 
                : '<i class="ph ph-list"></i>';
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navToggle.innerHTML = '<i class="ph ph-list"></i>';
            });
        });
    }

    // Initialize GSAP
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Reveal Animation
    const heroTl = gsap.timeline();
    heroTl.fromTo('.gsap-hero-reveal', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
    );
    heroTl.fromTo('.gsap-nav-item',
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' },
        '-=1'
    );

    // Fade Up Elements on Scroll (Including Bento Grids)
    const fadeUpElements = document.querySelectorAll('.gsap-fade-up, .bento-panel');
    fadeUpElements.forEach(el => {
        gsap.fromTo(el, 
            { y: 60, opacity: 0 },
            { 
                y: 0, 
                opacity: 1, 
                duration: 1, 
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    // Parallax Images
    const parallaxImages = document.querySelectorAll('.parallax-img');
    parallaxImages.forEach(img => {
        const wrap = img.closest('.parallax-img-wrap') || img.parentElement;
        const speed = img.getAttribute('data-speed') || 0.15;
        
        gsap.to(img, {
            y: () => window.innerHeight * speed,
            ease: 'none',
            scrollTrigger: {
                trigger: wrap,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });

    // Stats Counter Animation
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = Number(stat.getAttribute('data-count'));
        gsap.to(stat, {
            innerHTML: target,
            duration: 2.5,
            ease: 'power2.out',
            snap: { innerHTML: 1 },
            scrollTrigger: {
                trigger: stat.parentElement,
                start: 'top 80%',
                once: true
            }
        });
    });

    // Active Nav Link highlight sync
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 250)) {
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
