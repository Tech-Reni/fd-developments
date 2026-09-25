/* ============================================
   FD DEVELOPMENTS LIMITED
   Navigation JavaScript
   ============================================ */

(function() {
  'use strict';

  // ============================================
  // MOBILE MENU
  // ============================================

  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', function() {
      const isOpen = mobileMenu.classList.contains('open');

      mobileMenu.classList.toggle('open');
      mobileMenuToggle.classList.toggle('active');
      document.body.classList.toggle('no-scroll', !isOpen);

      // Update aria
      mobileMenuToggle.setAttribute('aria-expanded', String(!isOpen));
      mobileMenuToggle.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
    });

    // Close mobile menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('open');
        mobileMenuToggle.classList.remove('active');
        document.body.classList.remove('no-scroll');
      });
    });

    // Close on escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        mobileMenuToggle.classList.remove('active');
        document.body.classList.remove('no-scroll');
      }
    });
  }

  // ============================================
  // MEGA MENU
  // ============================================

  const servicesLink = document.getElementById('servicesLink');
  const megaMenu = document.getElementById('megaMenu');

  if (servicesLink && megaMenu) {
    let megaMenuTimeout;

    // Open on hover
    servicesLink.addEventListener('mouseenter', function() {
      clearTimeout(megaMenuTimeout);
      megaMenu.classList.add('open');
    });

    servicesLink.addEventListener('mouseleave', function() {
      megaMenuTimeout = setTimeout(function() {
        megaMenu.classList.remove('open');
      }, 200);
    });

    // Keep open when hovering over the mega menu itself
    megaMenu.addEventListener('mouseenter', function() {
      clearTimeout(megaMenuTimeout);
    });

    megaMenu.addEventListener('mouseleave', function() {
      megaMenuTimeout = setTimeout(function() {
        megaMenu.classList.remove('open');
      }, 200);
    });

    // Close on click outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.has-megamenu') && megaMenu.classList.contains('open')) {
        megaMenu.classList.remove('open');
      }
    });

    // Close on escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        megaMenu.classList.remove('open');
      }
    });
  }

  // ============================================
  // SEARCH OVERLAY
  // ============================================

  const searchToggle = document.getElementById('searchToggle');
  const searchOverlay = document.getElementById('searchOverlay');
  const searchClose = document.getElementById('searchClose');
  const searchInput = searchOverlay ? searchOverlay.querySelector('input[type="search"]') : null;

  function openSearch() {
    if (!searchOverlay) return;

    searchOverlay.classList.add('open');
    document.body.classList.add('no-scroll');

    if (searchInput) {
      setTimeout(function() {
        searchInput.focus();
      }, 300);
    }
  }

  function closeSearch() {
    if (!searchOverlay) return;

    searchOverlay.classList.remove('open');
    document.body.classList.remove('no-scroll');
  }

  if (searchToggle) {
    searchToggle.addEventListener('click', openSearch);
  }

  if (searchClose) {
    searchClose.addEventListener('click', closeSearch);
  }

  // Close on escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && searchOverlay && searchOverlay.classList.contains('open')) {
      closeSearch();
    }
  });

  // Close on overlay click
  if (searchOverlay) {
    searchOverlay.addEventListener('click', function(e) {
      if (e.target === searchOverlay) {
        closeSearch();
      }
    });
  }

  // Handle search form submission
  const searchForm = searchOverlay ? searchOverlay.querySelector('.search-form') : null;

  if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const query = searchInput ? searchInput.value.trim() : '';

      if (query) {
        // Redirect to projects page with search query
        window.location.href = 'projects.html?search=' + encodeURIComponent(query);
      }
    });
  }

  // ============================================
  // FAQ ACCORDION
  // ============================================

  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function(item) {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (!question || !answer) return;

    question.addEventListener('click', function() {
      const isActive = item.classList.contains('active');

      // Close all items
      faqItems.forEach(function(otherItem) {
        otherItem.classList.remove('active');
        const otherAnswer = otherItem.querySelector('.faq-answer');
        const otherQuestion = otherItem.querySelector('.faq-question');
        if (otherAnswer) otherAnswer.style.maxHeight = '0';
        if (otherQuestion) otherQuestion.setAttribute('aria-expanded', 'false');
      });

      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

})();