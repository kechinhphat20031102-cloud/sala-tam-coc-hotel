/**
 * SALA TAM CỐC HOTEL & SPA - MAIN INTERACTION SCRIPT
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. STICKY HEADER & BACK TO TOP BUTTON
  const header = document.querySelector('.header-main');
  const backToTopBtn = document.querySelector('.float-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      header?.classList.add('scrolled');
      backToTopBtn?.classList.add('visible');
    } else {
      header?.classList.remove('scrolled');
      backToTopBtn?.classList.remove('visible');
    }
  });

  backToTopBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // 2. MOBILE MENU TOGGLE
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  mobileToggle?.addEventListener('click', () => {
    navMenu?.classList.toggle('open');
    const icon = mobileToggle.querySelector('i');
    if (icon) {
      if (navMenu?.classList.contains('open')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    }
  });

  // Mobile Dropdown click support
  const navDropdownToggles = document.querySelectorAll('.nav-item');
  navDropdownToggles.forEach(item => {
    if (item.querySelector('.nav-dropdown')) {
      item.addEventListener('click', (e) => {
        if (window.innerWidth <= 992) {
          item.classList.toggle('dropdown-open');
        }
      });
    }
  });

  // 3. HERO BACKGROUND SLIDER
  const slides = document.querySelectorAll('.hero-slide');
  let currentSlide = 0;
  if (slides.length > 1) {
    setInterval(() => {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    }, 6000);
  }

  // 4. ROOMS CATEGORY FILTER (TABS)
  const roomFilterBtns = document.querySelectorAll('.rooms-filter button');
  const roomCards = document.querySelectorAll('.room-card');

  roomFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      roomFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');
      roomCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 5. GALLERY FILTER & LIGHTBOX
  const galleryFilterBtns = document.querySelectorAll('.gallery-filter button');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      galleryFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');
      galleryItems.forEach(item => {
        if (filterVal === 'all' || item.getAttribute('data-category') === filterVal) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Simple Lightbox
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.querySelector('.lightbox-close');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('h5')?.innerText || 'Sala Tam Cốc Hotel & Spa';
      if (lightboxModal && lightboxImg && img) {
        lightboxImg.src = img.src;
        if (lightboxCaption) lightboxCaption.innerText = title;
        lightboxModal.classList.add('active');
      }
    });
  });

  lightboxClose?.addEventListener('click', () => {
    lightboxModal?.classList.remove('active');
  });

  lightboxModal?.addEventListener('click', (e) => {
    if (e.target === lightboxModal) {
      lightboxModal.classList.remove('active');
    }
  });

  // 6. DEFAULT DATES IN BOOKING FORM
  const checkinInput = document.getElementById('quick-checkin') || document.getElementById('modal-checkin');
  const checkoutInput = document.getElementById('quick-checkout') || document.getElementById('modal-checkout');

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const setDateInputs = (cin, cout) => {
    if (cin && !cin.value) cin.value = formatDate(today);
    if (cout && !cout.value) cout.value = formatDate(tomorrow);
  };

  setDateInputs(document.getElementById('quick-checkin'), document.getElementById('quick-checkout'));
  setDateInputs(document.getElementById('modal-checkin'), document.getElementById('modal-checkout'));
});
