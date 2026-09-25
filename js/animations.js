/* ============================================
   FD DEVELOPMENTS LIMITED
   Animations JavaScript
   ============================================ */

(function() {
  'use strict';

  // ============================================
  // SCROLL REVEAL ANIMATIONS
  // ============================================

  const animatedElements = document.querySelectorAll('[data-animate]');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const el = entry.target;
          const animation = el.getAttribute('data-animate');
          const delay = el.getAttribute('data-delay');

          // Add animation class
          el.classList.add('animated');

          // Apply animation
          if (animation) {
            el.style.animationName = getAnimationName(animation);
            el.style.animationDuration = '1s';
            el.style.animationFillMode = 'forwards';
            el.style.animationTimingFunction = 'cubic-bezier(0.22, 1, 0.36, 1)';

            if (delay) {
              el.style.animationDelay = (parseInt(delay) * 0.1) + 's';
            }
          }

          observer.unobserve(el);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(function(el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show all elements
    animatedElements.forEach(function(el) {
      el.classList.add('animated');
      el.style.opacity = '1';
    });
  }

  function getAnimationName(animation) {
    const animations = {
      'fade': 'fadeIn',
      'fade-up': 'fadeInUp',
      'fade-down': 'fadeInDown',
      'fade-left': 'fadeInLeft',
      'fade-right': 'fadeInRight',
      'zoom-in': 'zoomIn',
      'zoom-out': 'zoomOut'
    };

    return animations[animation] || 'fadeInUp';
  }

  // ============================================
  // COUNTER ANIMATIONS
  // ============================================

  const counters = document.querySelectorAll('[data-counter]');

  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-counter')) || 0;
          const duration = 2000;
          const start = 0;
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            const current = Math.floor(easedProgress * target);

            el.textContent = current;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              el.textContent = target;
              el.classList.add('counting');
            }
          }

          requestAnimationFrame(updateCounter);
          observer.unobserve(el);
        }
      });
    }, {
      threshold: 0.5
    });

    counters.forEach(function(counter) {
      counterObserver.observe(counter);
    });
  } else {
    // Fallback: set final values
    counters.forEach(function(counter) {
      counter.textContent = counter.getAttribute('data-counter');
    });
  }

  // ============================================
  // TYPED TEXT ANIMATION
  // ============================================

  const typedText = document.getElementById('typedText');

  if (typedText) {
    const phrases = [
      'Landmarks Today',
      'Luxury Living',
      'Premium Spaces',
      'Architectural Excellence',
      'Dream Homes'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typedText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typedText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at full word
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500;
      }

      setTimeout(type, typingSpeed);
    }

    // Start typing after loader
    setTimeout(type, 1500);
  }

  // ============================================
  // PARALLAX EFFECT
  // ============================================

  const parallaxElements = document.querySelectorAll('.parallax-bg');

  function updateParallax() {
    parallaxElements.forEach(function(el) {
      const speed = parseFloat(el.getAttribute('data-speed')) || 0.3;
      const rect = el.parentElement.getBoundingClientRect();

      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const offset = (window.innerHeight - rect.top) * speed;
        el.style.transform = 'translateY(' + offset + 'px)';
      }
    });
  }

  window.addEventListener('scroll', updateParallax, { passive: true });
  updateParallax();

  // ============================================
  // TILT EFFECT
  // ============================================

  const tiltCards = document.querySelectorAll('.tilt-card');

  tiltCards.forEach(function(card) {
    card.addEventListener('mousemove', function(e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / centerY * -10;
      const rotateY = (x - centerX) / centerX * 10;

      card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
    });

    card.addEventListener('mouseleave', function() {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
  });

  // ============================================
  // FLOATING SHAPES
  // ============================================

  const floatingShapes = document.querySelectorAll('.floating-shape');

  floatingShapes.forEach(function(shape, index) {
    shape.style.animationDelay = (index * -3) + 's';
  });

  // ============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================

  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');

      if (targetId === '#') return;

      const target = document.querySelector(targetId);

      if (target) {
        e.preventDefault();

        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

})();