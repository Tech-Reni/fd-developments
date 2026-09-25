/* ============================================
   FD DEVELOPMENTS - JavaScript Interactivity
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // NAVBAR SCROLL EFFECT
    // ========================================
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // ========================================
    // MOBILE MENU TOGGLE
    // ========================================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // ========================================
    // ACTIVE NAV LINK ON SCROLL
    // ========================================
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNav() {
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();
    
    // ========================================
    // BACK TO TOP BUTTON
    // ========================================
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    // ========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========================================
    // CONTACT FORM SUBMISSION
    // ========================================
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            
            // Show success message (in production, you would send this to a server)
            alert(`Thank you for contacting FD Developments, ${data.name}! We will get back to you shortly.`);
            
            // Reset form
            this.reset();
        });
    }
    
    // ========================================
    // SCROLL ANIMATIONS (AOS-like effect)
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Elements to animate
    const animateElements = document.querySelectorAll('.service-card, .tile-card, .why-card, .jv-feature');
    animateElements.forEach(el => observer.observe(el));
    
    // Add CSS for scroll animations
    const style = document.createElement('style');
    style.textContent = `
        .service-card, .tile-card, .why-card, .jv-feature {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .service-card.animate-in, 
        .tile-card.animate-in, 
        .why-card.animate-in, 
        .jv-feature.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .service-card:nth-child(2),
        .tile-card:nth-child(2),
        .why-card:nth-child(2),
        .jv-feature:nth-child(2) {
            transition-delay: 0.1s;
        }
        
        .service-card:nth-child(3),
        .tile-card:nth-child(3),
        .why-card:nth-child(3),
        .jv-feature:nth-child(3) {
            transition-delay: 0.2s;
        }
        
        .service-card:nth-child(4),
        .tile-card:nth-child(4),
        .why-card:nth-child(4),
        .jv-feature:nth-child(4) {
            transition-delay: 0.3s;
        }
        
        .service-card:nth-child(5),
        .tile-card:nth-child(5) {
            transition-delay: 0.4s;
        }
        
        .service-card:nth-child(6),
        .tile-card:nth-child(6) {
            transition-delay: 0.5s;
        }
    `;
    document.head.appendChild(style);
    
    // ========================================
    // PARALLAX EFFECT FOR HERO
    // ========================================
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        if (scrolled < hero.offsetHeight) {
            hero.style.backgroundPositionY = (scrolled * 0.5) + 'px';
        }
    });
    
    // ========================================
    // COUNTER ANIMATION FOR STATS
    // ========================================
    const stats = document.querySelectorAll('.stat-number');
    
    function animateCounters() {
        stats.forEach(stat => {
            const target = parseInt(stat.textContent);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const counter = setInterval(function() {
                current += step;
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(counter);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 16);
        });
    }
    
    // Trigger counter animation when about section is visible
    const aboutSection = document.querySelector('.about');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(aboutSection);
    
    // ========================================
    // IMAGE LAZY LOADING
    // ========================================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
    
    // ========================================
    // PREVENT SCROLL ON BODY WHEN MOBILE MENU OPEN
    // ========================================
    navLinks.addEventListener('click', function() {
        if (window.innerWidth <= 992) {
            document.body.style.overflow = '';
        }
    });
    
    hamburger.addEventListener('click', function() {
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // ========================================
    // ADDITIONAL ACCESSIBILITY FEATURES
    // ========================================
    
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#home';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: var(--secondary-color);
        color: var(--dark-color);
        padding: 8px 16px;
        z-index: 1001;
        transition: top 0.3s;
    `;
    document.body.prepend(skipLink);
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '0';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    // ========================================
    // CONSOLE WELCOME MESSAGE
    // ========================================
    console.log('%c Welcome to FD Developments! ', 'background: linear-gradient(135deg, #8B0000, #DC143C); color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
    console.log('%c Premium Tiles | Development | Management ', 'background: #DC143C; color: white; font-size: 14px; padding: 5px 10px; border-radius: 3px;');
    
});
