/* ============================================
   FD DEVELOPMENTS LIMITED
   Slider JavaScript - Hero & Testimonials
   ============================================ */

(function() {
  'use strict';

  // ============================================
  // HERO SLIDER
  // ============================================

  const heroSlider = document.getElementById('heroSlider');
  const heroPrev = document.getElementById('heroPrev');
  const heroNext = document.getElementById('heroNext');

  if (heroSlider) {
    const slides = heroSlider.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    let autoPlayInterval;
    const autoPlayDelay = 6000;

    function showSlide(index) {
      slides.forEach(function(slide, i) {
        slide.classList.toggle('active', i === index);
      });
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    }

    function startAutoPlay() {
      stopAutoPlay();
      autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
    }

    function stopAutoPlay() {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
      }
    }

    if (heroNext) {
      heroNext.addEventListener('click', function() {
        nextSlide();
        startAutoPlay();
      });
    }

    if (heroPrev) {
      heroPrev.addEventListener('click', function() {
        prevSlide();
        startAutoPlay();
      });
    }

    // Pause on hover
    heroSlider.addEventListener('mouseenter', stopAutoPlay);
    heroSlider.addEventListener('mouseleave', startAutoPlay);

    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;

    heroSlider.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoPlay();
    }, { passive: true });

    heroSlider.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      startAutoPlay();
    }, { passive: true });

    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchEndX - touchStartX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff < 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    }

    // Start autoplay
    startAutoPlay();
  }

  // ============================================
  // TESTIMONIAL CAROUSEL
  // ============================================

  const testimonialTrack = document.getElementById('testimonialTrack');
  const testimonialPrev = document.getElementById('testimonialPrev');
  const testimonialNext = document.getElementById('testimonialNext');
  const testimonialDots = document.getElementById('testimonialDots');

  if (testimonialTrack) {
    const slides = testimonialTrack.querySelectorAll('.testimonial-slide');
    const dots = testimonialDots ? testimonialDots.querySelectorAll('.testimonial-dot') : [];
    let currentTestimonial = 0;
    let testimonialInterval;
    const testimonialDelay = 8000;

    function showTestimonial(index) {
      slides.forEach(function(slide, i) {
        slide.classList.toggle('active', i === index);
      });

      dots.forEach(function(dot, i) {
        dot.classList.toggle('active', i === index);
      });

      currentTestimonial = index;
    }

    function nextTestimonial() {
      const next = (currentTestimonial + 1) % slides.length;
      showTestimonial(next);
    }

    function prevTestimonial() {
      const prev = (currentTestimonial - 1 + slides.length) % slides.length;
      showTestimonial(prev);
    }

    function startTestimonialAutoPlay() {
      stopTestimonialAutoPlay();
      testimonialInterval = setInterval(nextTestimonial, testimonialDelay);
    }

    function stopTestimonialAutoPlay() {
      if (testimonialInterval) {
        clearInterval(testimonialInterval);
      }
    }

    if (testimonialNext) {
      testimonialNext.addEventListener('click', function() {
        nextTestimonial();
        startTestimonialAutoPlay();
      });
    }

    if (testimonialPrev) {
      testimonialPrev.addEventListener('click', function() {
        prevTestimonial();
        startTestimonialAutoPlay();
      });
    }

    // Dot navigation
    dots.forEach(function(dot) {
      dot.addEventListener('click', function() {
        const index = parseInt(this.getAttribute('data-index')) || 0;
        showTestimonial(index);
        startTestimonialAutoPlay();
      });
    });

    // Pause on hover
    testimonialTrack.addEventListener('mouseenter', stopTestimonialAutoPlay);
    testimonialTrack.addEventListener('mouseleave', startTestimonialAutoPlay);

    // Start autoplay
    startTestimonialAutoPlay();
  }

})();