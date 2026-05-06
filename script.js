import { getPublicContent } from './content-service.js';

const EMAILJS_CONFIG = {
    serviceId: 'service_ajfh6z8',
    templateId: 'template_8bjf35g',
    publicKey: 'X9R7sa5bkpR_Nsyrr'
};

document.addEventListener('DOMContentLoaded', async () => {
    // ----------------------------------------------------
    // INITIALIZATION & DOM POPULATION
    // ----------------------------------------------------
    const content = await getPublicContent();
    const {
        flavours,
        franchiseFeatures,
        franchiseStats,
        contactInfo,
        franchiseLocations
    } = content;

    if (content.warnings.length) {
        console.warn('ChillPops content fallback warning:', content.warnings);
    }
    
    // Set Footer Year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Custom Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    if (cursorDot) {
        window.addEventListener('mousemove', (e) => {
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
        });
        
        // Hover effects on links and buttons
        const interactables = document.querySelectorAll('a, button, .btn, .brutal-card, .flavour-card');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.style.transform = 'translate(-50%, -50%) scale(2)';
                cursorDot.style.backgroundColor = 'var(--color-yellow)';
            });
            el.addEventListener('mouseleave', () => {
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorDot.style.backgroundColor = 'var(--color-pink)';
            });
        });
    }

    // Populate Franchise Features
    const franchiseFeatContainer = document.querySelector('.franchise-features-list');
    if (franchiseFeatContainer) {
        franchiseFeatContainer.innerHTML = franchiseFeatures.map((feat, i) => `
            <div class="mt-2" style="border-left: 3px solid var(--color-dark); padding-left:1rem;">
                <h4 style="font-size:1.1rem; margin-bottom:0.25rem; font-family:var(--font-heading);">${feat.icon} ${feat.title}</h4>
                <p style="font-size:0.95rem; margin-bottom:0;">${feat.description}</p>
            </div>
        `).join('');
    }

    // Populate Franchise Stats
    const franchiseStatsContainer = document.querySelector('.franchise-stats-container');
    if (franchiseStatsContainer) {
        franchiseStatsContainer.innerHTML = franchiseStats.map(stat => `
            <div class="stat-box">
                <div class="stat-number" data-count="${stat.count}">0</div>
                <div class="stat-label" style="font-weight:700; text-transform:uppercase;">${stat.label}</div>
            </div>
        `).join('');
    }

    // Populate Franchise Locations
    const locationShowcase = document.querySelector('.location-grid');
    if (locationShowcase) {
        locationShowcase.innerHTML = franchiseLocations.map(loc => `
            <div class="location-card">
                <div class="icon">${loc.icon}</div>
                <h4>${loc.city}</h4>
                <p style="margin:0; font-weight:700; font-size:1rem;">${loc.count} Store${loc.count > 1 ? 's' : ''}</p>
            </div>
        `).join('');
    }

    // Populate Flavours into 3 Marquee Rows
    const row1Containers = document.querySelectorAll('.row-1');
    const row2Containers = document.querySelectorAll('.row-2');
    const row3Containers = document.querySelectorAll('.row-3');
    
    // We want lots of cards to make the marquee look full, so we will duplicate the flavours array a few times.
    const extendedFlavours = [...flavours, ...flavours, ...flavours, ...flavours];
    
    // Divide roughly evenly
    const third = Math.ceil(extendedFlavours.length / 3);
    const set1 = extendedFlavours.slice(0, third);
    const set2 = extendedFlavours.slice(third, third * 2);
    const set3 = extendedFlavours.slice(third * 2);

    const buildCardHTML = (flavour) => `
        <div class="flavour-card">
            <div class="flavour-img-box">
                <img src="${flavour.image}" alt="${flavour.name}" loading="lazy">
            </div>
            <h3>${flavour.name}</h3>
            <p style="font-weight:500;">${flavour.description}</p>
            <div class="flavour-tags">
                ${flavour.tags.map(tag => `<span class="tag ${tag.toLowerCase() === 'bestseller' ? 'featured' : ''}">${tag}</span>`).join('')}
            </div>
        </div>
    `;

    if (row1Containers.length) {
        row1Containers.forEach(container => container.innerHTML = set1.map(buildCardHTML).join(''));
        row2Containers.forEach(container => container.innerHTML = set2.map(buildCardHTML).join(''));
        row3Containers.forEach(container => container.innerHTML = set3.map(buildCardHTML).join(''));
    }

    // Populate Contact Information
    const addressEl = document.querySelector('.contact-address');
    const phonesEl = document.querySelector('.contact-phones');
    const hoursList = document.querySelector('.hours-list');
    const socialLinks = document.querySelector('.social-links');

    if (addressEl) addressEl.innerHTML = contactInfo.address;
    if (phonesEl) phonesEl.innerHTML = `<a href="tel:${contactInfo.phone}" style="color:var(--color-dark);">${contactInfo.phone}</a><br/><a href="mailto:${contactInfo.email}" style="color:var(--color-dark);">${contactInfo.email}</a>`;
    
    if (hoursList) {
        hoursList.innerHTML = contactInfo.hours.map(hour => `
            <li style="display:flex; justify-content:space-between; border-bottom: 2px solid var(--color-dark); padding: 0.5rem 0;">
                <span>${hour.day}</span> 
                <span>${hour.time}</span>
            </li>
        `).join('');
    }

    if (socialLinks) {
        socialLinks.innerHTML = contactInfo.social.map(social => `
            <a href="${social.url}" class="social-link" target="_blank" rel="noopener noreferrer" title="${social.platform}">
                <i class="${social.platform.toLowerCase().includes('instagram') ? 'ph-bold ph-instagram-logo' : 'ph-bold ph-phone'}"></i>
            </a>
        `).join('');
    }

    // Contact Form -> EmailJS
    const contactForm = document.querySelector('#contact-form');
    const contactStatus = document.querySelector('#contact-form-status');
    const submitButton = contactForm?.querySelector('button[type="submit"]');

    if (window.emailjs && typeof window.emailjs.init === 'function') {
        window.emailjs.init(EMAILJS_CONFIG.publicKey);
    }

    const setContactStatus = (message, tone = '') => {
        if (!contactStatus) return;
        contactStatus.textContent = message;
        contactStatus.className = `contact-form-status ${tone}`.trim();
    };

    if (contactForm) {
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            if (!window.emailjs || typeof window.emailjs.send !== 'function') {
                setContactStatus('Email sending is not available right now.', 'is-error');
                return;
            }

            const formData = new FormData(contactForm);
            const name = String(formData.get('name') || '').trim();
            const email = String(formData.get('email') || '').trim();
            const message = String(formData.get('message') || '').trim();

            if (submitButton) submitButton.disabled = true;
            setContactStatus('Sending your message...', 'is-pending');

            try {
                await window.emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, {
                    name,
                    email,
                    message,
                });

                contactForm.reset();
                setContactStatus('Message sent. We will get back to you soon.', 'is-success');
            } catch (error) {
                console.error('EmailJS send failed:', error);
                setContactStatus('Could not send your message right now. Please try again.', 'is-error');
            } finally {
                if (submitButton) submitButton.disabled = false;
            }
        });
    }

    // ----------------------------------------------------
    // UI INTERACTIONS & GSAP ANIMATIONS
    // ----------------------------------------------------
    
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '0';
        } else {
            navbar.style.padding = '0';
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
                ? '<i class="ph-bold ph-x"></i>' 
                : '<i class="ph-bold ph-list"></i>';
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navToggle.innerHTML = '<i class="ph-bold ph-list"></i>';
            });
        });
    }

    // Initialize GSAP
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Reveal Animation - Snappy and brutally fast
    const heroTl = gsap.timeline();
    heroTl.fromTo('.gsap-hero-reveal', 
        { scale: 0.9, opacity: 0, rotation:-5 },
        { scale: 1, opacity: 1, rotation:0, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)', delay: 0.1 }
    );
    heroTl.fromTo('.gsap-nav-item',
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'bounce.out' },
        '-=0.2'
    );

    // Fade Up Elements on Scroll (Snappy pops for Neobrutalism)
    const fadeUpElements = document.querySelectorAll('.gsap-fade-up');
    fadeUpElements.forEach(el => {
        gsap.fromTo(el, 
            { y: 100, opacity: 0, scale:0.9 },
            { 
                y: 0, 
                opacity: 1, 
                scale: 1,
                duration: 0.6, 
                ease: 'back.out(2)',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    // Stats Counter Animation
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = Number(stat.getAttribute('data-count'));
        gsap.to(stat, {
            innerHTML: target,
            duration: 2,
            ease: 'power4.out',
            snap: { innerHTML: 1 },
            scrollTrigger: {
                trigger: stat.parentElement,
                start: 'top 85%',
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
