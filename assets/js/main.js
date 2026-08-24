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

  // Mobile Dropdown & Link Click Support
  const navDropdownToggles = document.querySelectorAll('.nav-item');
  navDropdownToggles.forEach(item => {
    const dropdown = item.querySelector('.nav-dropdown');
    if (dropdown) {
      const topLink = item.querySelector('.nav-link');
      topLink?.addEventListener('click', (e) => {
        if (window.innerWidth <= 992) {
          // If clicking link with dropdown on mobile, toggle dropdown view
          e.preventDefault();
          item.classList.toggle('dropdown-open');
        }
      });
    }
  });

  // Close mobile nav when clicking any actual navigation link
  const navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // If it's a dropdown toggle link on mobile, don't close immediately
      if (window.innerWidth <= 992 && link.nextElementSibling && link.nextElementSibling.classList.contains('nav-dropdown')) {
        return;
      }
      navMenu?.classList.remove('open');
      const icon = mobileToggle?.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
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

  // 7. TOUR DETAIL POPUP MODAL SYSTEM
  const tourDetailModal = document.getElementById('tourDetailModal');
  const tourModalClose = document.getElementById('tourModalClose');
  const tourModalBody = document.getElementById('tourModalBody');
  let currentOpenTourKey = null;

  const openTourModal = (tourKey) => {
    if (typeof tourDetailsData === 'undefined' || !tourDetailsData[tourKey] || !tourDetailModal || !tourModalBody) return;
    currentOpenTourKey = tourKey;
    const tour = tourDetailsData[tourKey];

    const currentLang = localStorage.getItem('sala_lang') || 'en';
    const isVi = currentLang === 'vi';

    const displayTitle = isVi ? (tour.titleVi || tour.title) : (tour.titleEn || tour.title);
    const displayDuration = isVi ? (tour.durationVi || tour.duration) : (tour.durationEn || tour.duration);
    
    const itineraryList = isVi ? (tour.itineraryVi || tour.itinerary) : (tour.itineraryEn || tour.itinerary);
    const inclusionsList = isVi ? (tour.inclusionsVi || tour.inclusions) : (tour.inclusionsEn || tour.inclusions);
    const childrenList = isVi ? (tour.childrenPolicyVi || tour.childrenPolicy) : (tour.childrenPolicyEn || tour.childrenPolicy);

    const titleItinerary = isVi ? 'Lịch Trình Chi Tiết' : 'Detailed Itinerary';
    const titleInclusions = isVi ? 'Dịch Vụ Bao Gồm' : 'Inclusions';
    const titleChildPolicy = isVi ? 'Chính Sách Trẻ Em' : 'Child Policy';
    const btnBookText = isVi ? 'Đặt Tour: 0942 060 533' : 'Book Tour: +84 942 060 533';
    const btnConsultText = isVi ? 'Tư Vấn Zalo / WhatsApp' : 'WhatsApp / Zalo Consultation';

    let itineraryHTML = (itineraryList || []).map(item => `
      <li class="tour-timeline-item">
        <div class="tour-timeline-time"><i class="fa-regular fa-clock"></i> ${item.time}</div>
        <div class="tour-timeline-desc">${item.desc}</div>
      </li>
    `).join('');

    let inclusionsHTML = (inclusionsList || []).map(inc => `
      <li><i class="fa-solid fa-circle-check"></i> ${inc}</li>
    `).join('');

    let childPolicyHTML = (childrenList && childrenList.length > 0) ? childrenList.map(cp => `
      <li><i class="fa-solid fa-child"></i> ${cp}</li>
    `).join('') : '';

    tourModalBody.innerHTML = `
      <div class="tour-modal-banner" style="background-image: url('${tour.image}');">
        <div class="tour-modal-banner-overlay">
          <span class="tour-modal-subtitle"><i class="fa-solid fa-compass"></i> ${displayDuration}</span>
          <h2 class="tour-modal-title">${displayTitle}</h2>
        </div>
      </div>
      <div class="tour-modal-content">
        <div class="tour-modal-section-title"><i class="fa-solid fa-list-check"></i> ${titleItinerary}</div>
        <ul class="tour-timeline">
          ${itineraryHTML}
        </ul>

        <div class="tour-modal-section-title"><i class="fa-solid fa-shield-halved"></i> ${titleInclusions}</div>
        <ul class="tour-list-check">
          ${inclusionsHTML}
        </ul>

        ${childPolicyHTML ? `
          <div class="tour-modal-section-title"><i class="fa-solid fa-users"></i> ${titleChildPolicy}</div>
          <ul class="tour-list-check">
            ${childPolicyHTML}
          </ul>
        ` : ''}

        <div class="tour-modal-actions">
          <a href="tel:0942060533" class="btn btn-gold btn-lg"><i class="fa-solid fa-phone"></i> ${btnBookText}</a>
          <a href="https://zalo.me/0942060533" target="_blank" class="btn btn-outline-gold btn-lg"><i class="fa-solid fa-comment-dots"></i> ${btnConsultText}</a>
        </div>
      </div>
    `;

    tourDetailModal.style.display = 'flex';
    tourDetailModal.classList.add('active');
  };

  // Re-render modal if active when language changes
  document.addEventListener('salaLanguageChange', () => {
    if (tourDetailModal && tourDetailModal.classList.contains('active') && currentOpenTourKey) {
      openTourModal(currentOpenTourKey);
    }
  });

  document.querySelectorAll('[data-open-tour]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const tourKey = btn.getAttribute('data-open-tour');
      openTourModal(tourKey);
    });
  });

  tourModalClose?.addEventListener('click', () => {
    if (tourDetailModal) {
      tourDetailModal.style.display = 'none';
      tourDetailModal.classList.remove('active');
      currentOpenTourKey = null;
    }
  });

  tourDetailModal?.addEventListener('click', (e) => {
    if (e.target === tourDetailModal) {
      tourDetailModal.style.display = 'none';
      tourDetailModal.classList.remove('active');
      currentOpenTourKey = null;
    }
  });

  // 12. ADMIN SHORTCUT (Alt + Shift + A)
  document.addEventListener('keydown', (e) => {
    if (e.altKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
      e.preventDefault();
      window.location.href = 'admin.html';
    }
  });
});
