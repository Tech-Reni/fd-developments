/* ============================================
   FD DEVELOPMENTS LIMITED
   Contact Form JavaScript
   ============================================ */

(function() {
  'use strict';

  // ============================================
  // CONTACT FORM
  // ============================================

  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const formError = document.getElementById('formError');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Get form fields
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const phone = document.getElementById('phone');
      const subject = document.getElementById('subject');
      const message = document.getElementById('message');

      // Validate
      let isValid = true;

      // Name validation
      if (!name.value.trim()) {
        showFieldError(name);
        isValid = false;
      } else {
        clearFieldError(name);
      }

      // Email validation
      if (!isValidEmail(email.value.trim())) {
        showFieldError(email);
        isValid = false;
      } else {
        clearFieldError(email);
      }

      // Subject validation
      if (!subject.value) {
        showFieldError(subject);
        isValid = false;
      } else {
        clearFieldError(subject);
      }

      // Message validation
      if (!message.value.trim()) {
        showFieldError(message);
        isValid = false;
      } else {
        clearFieldError(message);
      }

      if (!isValid) {
        if (formError) {
          formError.classList.add('visible');
          setTimeout(function() {
            formError.classList.remove('visible');
          }, 4000);
        }
        return;
      }

      // Simulate form submission
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending...';

      setTimeout(function() {
        // Show success message
        if (formSuccess) {
          formSuccess.classList.add('visible');
        }

        // Reset form
        contactForm.reset();

        // Restore button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        // Hide success message after 5 seconds
        setTimeout(function() {
          if (formSuccess) {
            formSuccess.classList.remove('visible');
          }
        }, 5000);
      }, 1500);
    });
  }

  // ============================================
  // FORM VALIDATION HELPERS
  // ============================================

  function showFieldError(field) {
    field.style.borderColor = '#C1121F';
    field.style.boxShadow = '0 0 0 3px rgba(193, 18, 31, 0.1)';
    field.style.animation = 'shake 0.5s ease';
  }

  function clearFieldError(field) {
    field.style.borderColor = '';
    field.style.boxShadow = '';
    field.style.animation = '';
  }

  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Clear errors on input
  const formInputs = contactForm ? contactForm.querySelectorAll('input, select, textarea') : [];

  formInputs.forEach(function(input) {
    input.addEventListener('input', function() {
      clearFieldError(this);
    });
    input.addEventListener('change', function() {
      clearFieldError(this);
    });
  });

  // ============================================
  // WHATSAPP BUTTON TOOLTIP
  // ============================================

  const whatsappBtn = document.querySelector('.whatsapp-btn');

  if (whatsappBtn) {
    whatsappBtn.setAttribute('title', 'Chat with us on WhatsApp');
  }

})();