/* ============================================
   FD DEVELOPMENTS LIMITED
   Gallery & Projects JavaScript
   ============================================ */

(function() {
  'use strict';

  // ============================================
  // FILTER FUNCTIONALITY
  // ============================================

  const filterButtons = document.querySelectorAll('.filter-btn');
  const filterableItems = document.querySelectorAll('[data-category]');

  filterButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');

      // Update active button
      filterButtons.forEach(function(btn) {
        btn.classList.remove('active');
      });
      this.classList.add('active');

      // Filter items
      filterableItems.forEach(function(item) {
        const categories = item.getAttribute('data-category') || '';

        if (filter === 'all' || categories.includes(filter)) {
          item.style.display = '';
          item.style.animation = 'none';
          item.offsetHeight; // Trigger reflow
          item.style.animation = 'fadeInUp 0.6s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // ============================================
  // LIGHTBOX
  // ============================================

  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let lightboxItems = [];
  let lightboxIndex = 0;

  // Collect all gallery items
  function collectGalleryItems() {
    lightboxItems = Array.from(document.querySelectorAll('.gallery-item'));
  }

  function openLightbox(index) {
    if (!lightbox || lightboxItems.length === 0) return;

    lightboxIndex = index;
    const item = lightboxItems[index];
    const img = item.querySelector('img');
    const title = item.querySelector('.gallery-item-overlay h4');
    const category = item.querySelector('.gallery-item-overlay span');

    if (img) {
      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt || 'Gallery image';
    }

    if (lightboxCaption) {
      lightboxCaption.textContent = (title ? title.textContent : '') + (category ? ' - ' + category.textContent : '');
    }

    if (lightboxCounter) {
      lightboxCounter.textContent = (index + 1) + ' / ' + lightboxItems.length;
    }

    lightbox.classList.add('open');
    document.body.classList.add('no-scroll');
  }

  function closeLightbox() {
    if (!lightbox) return;

    lightbox.classList.remove('open');
    document.body.classList.remove('no-scroll');
  }

  function navigateLightbox(direction) {
    if (lightboxItems.length === 0) return;

    lightboxIndex = (lightboxIndex + direction + lightboxItems.length) % lightboxItems.length;
    openLightbox(lightboxIndex);
  }

  // Click on gallery items
  document.querySelectorAll('.gallery-item').forEach(function(item) {
    item.addEventListener('click', function() {
      collectGalleryItems();
      const index = lightboxItems.indexOf(this);
      openLightbox(index);
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', function() {
      navigateLightbox(-1);
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', function() {
      navigateLightbox(1);
    });
  }

  // Close on escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('open')) {
      closeLightbox();
    }

    if (e.key === 'ArrowLeft' && lightbox && lightbox.classList.contains('open')) {
      navigateLightbox(-1);
    }

    if (e.key === 'ArrowRight' && lightbox && lightbox.classList.contains('open')) {
      navigateLightbox(1);
    }
  });

  // Close on overlay click
  if (lightbox) {
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // ============================================
  // PROJECT MODAL
  // ============================================

  const projectModal = document.getElementById('projectModal');
  const projectModalClose = document.getElementById('projectModalClose');
  const projectModalImage = document.getElementById('projectModalImage');
  const projectModalTitle = document.getElementById('projectModalTitle');
  const projectModalCategory = document.getElementById('projectModalCategory');
  const projectModalDescription = document.getElementById('projectModalDescription');
  const specArea = document.getElementById('specArea');
  const specBedrooms = document.getElementById('specBedrooms');
  const specYear = document.getElementById('specYear');
  const projectModalPrev = document.getElementById('projectModalPrev');
  const projectModalNext = document.getElementById('projectModalNext');

  // Project data
  const projectData = {
    1: {
      title: 'Victoria Island Villa',
      category: 'Luxury Homes',
      description: 'A stunning 5-bedroom luxury villa in the heart of Victoria Island, featuring an infinity pool, smart home automation, premium Spanish porcelain tiles throughout, and breathtaking views of the Lagos skyline.',
      images: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80'
      ],
      area: 850,
      bedrooms: 5,
      year: 2024
    },
    2: {
      title: 'Lekki Phase 1 Residence',
      category: 'Residential',
      description: 'A contemporary family home in Lekki Phase 1, designed with modern architecture, smart home features, and premium finishes. Features include a home cinema, gym, and landscaped garden.',
      images: [
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
        'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80'
      ],
      area: 620,
      bedrooms: 4,
      year: 2023
    },
    3: {
      title: 'Ikeja Commercial Tower',
      category: 'Commercial',
      description: 'A premium commercial tower in the heart of Ikeja, offering modern office spaces with state-of-the-art facilities, high-speed elevators, and excellent connectivity to major business districts.',
      images: [
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
        'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80'
      ],
      area: 2500,
      bedrooms: 0,
      year: 2022
    },
    4: {
      title: 'Banana Island Apartments',
      category: 'Apartments',
      description: 'Luxury waterfront apartments on Banana Island with stunning lagoon views, private balconies, and world-class amenities including a swimming pool, gym, and 24/7 security.',
      images: [
        'https://images.unsplash.com/photo-1600607687929-6e0a4c1a5b1a?w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80'
      ],
      area: 180,
      bedrooms: 3,
      year: 2023
    },
    5: {
      title: 'Ikoyi Home Renovation',
      category: 'Renovations',
      description: 'A complete luxury renovation of a classic Ikoyi home, transforming it into a modern masterpiece with premium finishes, new interiors, and state-of-the-art systems.',
      images: [
        'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80'
      ],
      area: 450,
      bedrooms: 4,
      year: 2024
    },
    6: {
      title: 'Eko Atlantic Penthouse',
      category: 'Luxury Homes',
      description: 'A signature penthouse development in Eko Atlantic City, featuring panoramic ocean views, private rooftop terrace, and the finest luxury finishes available.',
      images: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80'
      ],
      area: 1200,
      bedrooms: 6,
      year: 2026
    },
    7: {
      title: 'Abuja Business District',
      category: 'Commercial',
      description: 'A modern office complex in Abuja\'s Central Business District, offering premium office spaces with advanced technology infrastructure and excellent accessibility.',
      images: [
        'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80'
      ],
      area: 3000,
      bedrooms: 0,
      year: 2026
    },
    8: {
      title: 'Lekki Gardens Estate',
      category: 'Residential',
      description: 'A gated community in Lekki with modern amenities including a clubhouse, swimming pool, children\'s play area, and 24/7 security. Beautifully designed homes for modern family living.',
      images: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687929-6e0a4c1a5b1a?w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80'
      ],
      area: 500,
      bedrooms: 4,
      year: 2026
    },
    9: {
      title: 'Yaba Smart Apartments',
      category: 'Apartments',
      description: 'Modern smart apartments in Yaba designed for urban professionals. Features include smart home automation, co-working spaces, and excellent connectivity to the city.',
      images: [
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
        'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80'
      ],
      area: 120,
      bedrooms: 2,
      year: 2026
    }
  };

  let currentProjectImages = [];
  let currentProjectImageIndex = 0;

  function openProjectModal(projectId) {
    const data = projectData[projectId];

    if (!data || !projectModal) return;

    // Set content
    if (projectModalTitle) projectModalTitle.textContent = data.title;
    if (projectModalCategory) projectModalCategory.textContent = data.category;
    if (projectModalDescription) projectModalDescription.textContent = data.description;
    if (specArea) specArea.textContent = data.area;
    if (specBedrooms) specBedrooms.textContent = data.bedrooms;
    if (specYear) specYear.textContent = data.year;

    // Set gallery
    currentProjectImages = data.images;
    currentProjectImageIndex = 0;

    if (projectModalImage) {
      projectModalImage.src = currentProjectImages[0];
      projectModalImage.alt = data.title;
    }

    // Show modal
    projectModal.classList.add('open');
    document.body.classList.add('no-scroll');
  }

  function closeProjectModal() {
    if (!projectModal) return;

    projectModal.classList.remove('open');
    document.body.classList.remove('no-scroll');
  }

  function navigateProjectImage(direction) {
    if (currentProjectImages.length === 0) return;

    currentProjectImageIndex = (currentProjectImageIndex + direction + currentProjectImages.length) % currentProjectImages.length;

    if (projectModalImage) {
      projectModalImage.src = currentProjectImages[currentProjectImageIndex];
    }
  }

  // Click on project cards
  document.querySelectorAll('.project-card[data-project]').forEach(function(card) {
    card.addEventListener('click', function() {
      const projectId = this.getAttribute('data-project');
      openProjectModal(projectId);
    });
  });

  if (projectModalClose) {
    projectModalClose.addEventListener('click', closeProjectModal);
  }

  if (projectModalPrev) {
    projectModalPrev.addEventListener('click', function() {
      navigateProjectImage(-1);
    });
  }

  if (projectModalNext) {
    projectModalNext.addEventListener('click', function() {
      navigateProjectImage(1);
    });
  }

  // Close on escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && projectModal && projectModal.classList.contains('open')) {
      closeProjectModal();
    }
  });

  // Close on overlay click
  if (projectModal) {
    projectModal.addEventListener('click', function(e) {
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });
  }

  // ============================================
  // URL SEARCH PARAMETER HANDLING
  // ============================================

  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get('search');

  if (searchQuery) {
    const query = searchQuery.toLowerCase();

    filterableItems.forEach(function(item) {
      const text = item.textContent.toLowerCase();

      if (text.includes(query)) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });

    // Set active filter to all
    filterButtons.forEach(function(btn) {
      btn.classList.remove('active');
      if (btn.getAttribute('data-filter') === 'all') {
        btn.classList.add('active');
      }
    });
  }

})();