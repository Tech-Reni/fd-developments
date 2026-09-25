/* ============================================
   FD DEVELOPMENTS LIMITED
   Main JavaScript - Core Functionality
   ============================================ */

(function() {
  'use strict';

  // ============================================
  // LOADING SCREEN
  // ============================================

  const loader = document.getElementById('loader');

  window.addEventListener('load', function() {
    setTimeout(function() {
      if (loader) {
        loader.classList.add('hidden');
        document.body.classList.remove('no-scroll');
      }
    }, 800);
  });

  // Prevent scroll during load
  document.body.classList.add('no-scroll');

  // ============================================
  // CUSTOM CURSOR
  // ============================================

  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');

  if (cursorDot && cursorRing && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', function(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;

      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    // Smooth ring follow
    function animateRing() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';

      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .gallery-item, .service-card, .why-card, .value-card, .filter-btn, input, textarea, select');

    interactiveElements.forEach(function(el) {
      el.addEventListener('mouseenter', function() {
        cursorRing.classList.add('hovering');
      });
      el.addEventListener('mouseleave', function() {
        cursorRing.classList.remove('hovering');
      });
    });

    // Click effect
    document.addEventListener('mousedown', function() {
      cursorRing.classList.add('active');
    });

    document.addEventListener('mouseup', function() {
      cursorRing.classList.remove('active');
    });
  }

  // ============================================
  // SCROLL PROGRESS BAR
  // ============================================

  const scrollProgress = document.getElementById('scrollProgress');

  function updateScrollProgress() {
    if (!scrollProgress) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    scrollProgress.style.width = scrollPercent + '%';
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  // ============================================
  // NAVBAR SCROLL EFFECT
  // ============================================

  const navbar = document.getElementById('navbar');

  function updateNavbar() {
    if (!navbar) return;

    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  // ============================================
  // SCROLL TO TOP BUTTON
  // ============================================

  const scrollTopBtn = document.getElementById('scrollTopBtn');

  function updateScrollTopBtn() {
    if (!scrollTopBtn) return;

    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', updateScrollTopBtn, { passive: true });
  updateScrollTopBtn();

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ============================================
  // THEME TOGGLE (Dark/Light Mode)
  // ============================================

  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  // Load saved theme
  const savedTheme = localStorage.getItem('fd-theme');
  if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('fd-theme', newTheme);
    });
  }

  // ============================================
  // NEWSLETTER POPUP
  // ============================================

  const newsletterPopup = document.getElementById('newsletterPopup');
  const newsletterPopupClose = document.getElementById('newsletterPopupClose');

  // Show popup after 5 seconds if not dismissed
  if (newsletterPopup && !localStorage.getItem('fd-newsletter-dismissed')) {
    setTimeout(function() {
      newsletterPopup.classList.add('visible');
    }, 5000);
  }

  if (newsletterPopupClose) {
    newsletterPopupClose.addEventListener('click', function() {
      newsletterPopup.classList.remove('visible');
      localStorage.setItem('fd-newsletter-dismissed', 'true');
    });
  }

  // ============================================
  // NEWSLETTER FORMS
  // ============================================

  const newsletterForms = document.querySelectorAll('.newsletter-form');

  newsletterForms.forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const emailInput = form.querySelector('input[type="email"]');
      const email = emailInput ? emailInput.value.trim() : '';

      if (email && isValidEmail(email)) {
        // Simulate successful subscription
        const button = form.querySelector('button');
        const originalText = button.textContent;

        button.textContent = '✓ Subscribed!';
        button.style.background = '#25D366';

        setTimeout(function() {
          button.textContent = originalText;
          button.style.background = '';
          form.reset();

          // Close popup if open
          if (newsletterPopup) {
            newsletterPopup.classList.remove('visible');
            localStorage.setItem('fd-newsletter-dismissed', 'true');
          }
        }, 2000);
      } else {
        // Show error state
        if (emailInput) {
          emailInput.style.borderColor = '#C1121F';
          emailInput.style.animation = 'shake 0.5s ease';

          setTimeout(function() {
            emailInput.style.borderColor = '';
            emailInput.style.animation = '';
          }, 2000);
        }
      }
    });
  });

  // ============================================
  // PAGE TRANSITION
  // ============================================

  const pageTransition = document.getElementById('pageTransition');

  // Handle internal link clicks with page transition
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href]');

    if (!link) return;

    const href = link.getAttribute('href');

    // Only animate for internal page links
    if (href && href.endsWith('.html') && !href.startsWith('#')) {
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      const targetPage = href.split('/').pop();

      if (currentPage !== targetPage) {
        e.preventDefault();

        if (pageTransition) {
          pageTransition.classList.add('active');

          setTimeout(function() {
            window.location.href = href;
          }, 500);
        } else {
          window.location.href = href;
        }
      }
    }
  });

  // ============================================
  // UTILITY FUNCTIONS
  // ============================================

  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // ============================================
  // LAZY LOADING IMAGES
  // ============================================

  // Use Intersection Observer for lazy loading
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    const imageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px'
    });

    lazyImages.forEach(function(img) {
      imageObserver.observe(img);
    });
  }

  // ============================================
  // ACTIVE NAV LINK ON SCROLL
  // ============================================

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    const scrollPos = window.scrollY + 100;

    sections.forEach(function(section) {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;

      if (scrollPos >= top && scrollPos < bottom) {
        const id = section.getAttribute('id');

        navLinks.forEach(function(link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

})();