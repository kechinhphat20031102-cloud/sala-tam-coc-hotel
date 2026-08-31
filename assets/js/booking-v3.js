/**
 * SALA TAM CỐC HOTEL & SPA - HỆ THỐNG LIÊN HỆ ĐẶT PHÒNG
 * Khách điền thông tin → Gửi email về Gmail khách sạn → Lễ tân liên hệ Zalo
 */

// ==========================================
// CẤU HÌNH GỬI EMAIL TỰ ĐỘNG (EMAILJS)
// ==========================================
const EMAIL_CONFIG = {
  HOTEL_EMAIL: 'salatamcochotel@gmail.com',
  HOTEL_HOTLINE: '0942 060 533 - 0986 969 898',
  HOTEL_ADDRESS: 'Khu Đồng Đốt, Phường Nam Hoa Lư, Tỉnh Ninh Bình',

  // Đăng ký tại emailjs.com (miễn phí 200 email/tháng), điền mã vào đây:
  EMAILJS_PUBLIC_KEY: 'khSp1L6N6SbPN8aeG',
  EMAILJS_SERVICE_ID: 'service_w6rdbjd',
  EMAILJS_TEMPLATE_HOTEL: 'template_3x22qzk'
};

document.addEventListener('DOMContentLoaded', () => {
  // Khởi tạo EmailJS nếu đã cấu hình
  if (typeof emailjs !== 'undefined' && EMAIL_CONFIG.EMAILJS_PUBLIC_KEY) {
    emailjs.init(EMAIL_CONFIG.EMAILJS_PUBLIC_KEY);
  }

  const bookingModal    = document.getElementById('bookingModal');
  const modalCloseBtns  = document.querySelectorAll('.modal-close, .modal-cancel');
  const openBookingBtns = document.querySelectorAll('[data-open-booking]');
  const quickBookingForm = document.getElementById('quickBookingForm');
  const modalBookingForm = document.getElementById('modalBookingForm');

  // Bảng tên hạng phòng
  const roomNames = {
    'superior-double':   'Superior Double City View – 28m²',
    'superior-triple':   'Superior Triple City View – 30m²',
    'deluxe-double':     'Deluxe Double Balcony – 28m²',
    'deluxe-twin':       'Deluxe Twin Balcony – 35m²',
    'luxury-double':     'Luxury Double with Balcony & Bath tub – 28m²',
    'luxury-twin':       'Luxury Twin with Balcony & Bath tub – 35m²',
    'deluxe-family':     'Deluxe Family Balcony – 35m²',
    'family-connecting': 'Family Connecting room 1 – 55m²',
    'family-connecting-2': 'Family Connecting room 2 – 60m²'
  };

  // Giá phòng tham khảo (VNĐ/đêm) đồng bộ 100% với danh sách phòng bên ngoài
  const roomRates = {
    'superior-double':   1300000,
    'superior-triple':   1800000,
    'deluxe-double':     1500000,
    'deluxe-twin':       1600000,
    'luxury-double':     1650000,
    'luxury-twin':       1750000,
    'deluxe-family':     2100000,
    'family-connecting': 2600000,
    'family-connecting-2': 2750000
  };

  // ==========================================
  // MỞ MODAL LIÊN HỆ ĐẶT PHÒNG
  // ==========================================
  window.openBookingModal = (roomKey = '', checkin = '', checkout = '', guests = '2') => {
    if (!bookingModal) return;

    // Tự động đóng menu mobile nếu đang mở để tránh đè giao diện
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      const icon = document.querySelector('.mobile-toggle i');
      if (icon) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    }

    const roomSelect  = document.getElementById('modal-room-type');
    const cinInput    = document.getElementById('modal-checkin');
    const coutInput   = document.getElementById('modal-checkout');
    const adultsInput = document.getElementById('modal-adults');

    if (roomKey && roomSelect)   roomSelect.value  = roomKey;
    if (checkin && cinInput)     cinInput.value    = checkin;
    if (checkout && coutInput)   coutInput.value   = checkout;
    if (guests && adultsInput)   adultsInput.value = guests;

    // Gán ngày mặc định nếu trống
    if (cinInput && !cinInput.value) {
      const today    = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      cinInput.value  = today.toISOString().split('T')[0];
      if (coutInput && !coutInput.value)
        coutInput.value = tomorrow.toISOString().split('T')[0];
    }

    updateEstimate();
    bookingModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeBookingModal = () => {
    if (!bookingModal) return;
    bookingModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  };

  // Lắng nghe nút "Booking Inquiries"
  openBookingBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const val = btn.getAttribute('data-open-booking');
      const roomKey = (val && val !== '' && val !== 'true') ? val : 'deluxe-double';
      window.openBookingModal(roomKey);
    });
  });

  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', (e) => { e.preventDefault(); window.closeBookingModal(); });
  });

  bookingModal?.addEventListener('click', (e) => {
    if (e.target === bookingModal) window.closeBookingModal();
  });

  // ==========================================
  // FORM NHANH TRANG CHỦ → MỞ MODAL
  // ==========================================
  quickBookingForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const cin    = document.getElementById('quick-checkin')?.value;
    const cout   = document.getElementById('quick-checkout')?.value;
    const room   = document.getElementById('quick-room')?.value;
    const guests = document.getElementById('quick-guests')?.value;
    window.openBookingModal(room, cin, cout, guests);
  });

  // ==========================================
  // TÍNH ƯỚC TÍNH SỐ ĐÊM
  // ==========================================
  function updateEstimate() {
    const roomKey     = document.getElementById('modal-room-type')?.value;
    const cinVal      = document.getElementById('modal-checkin')?.value;
    const coutVal     = document.getElementById('modal-checkout')?.value;
    const priceBox    = document.getElementById('estimated-price-display');
    if (!priceBox) return;

    const currentLang = localStorage.getItem('sala_lang') || 'en';
    const rate        = roomRates[roomKey] || 1300000;
    const fmtRate     = new Intl.NumberFormat('en-US').format(rate);

    if (!cinVal || !coutVal) {
      if (currentLang === 'vi') {
        priceBox.innerHTML = `<i class="fa-regular fa-clock"></i> Ước tính cho 1 đêm • Giá tham khảo: <strong style="color:#D4AF37">${fmtRate} VNĐ</strong> (bao gồm buffet sáng)`;
      } else if (currentLang === 'fr') {
        priceBox.innerHTML = `<i class="fa-regular fa-clock"></i> Estimé pour 1 nuit • Prix de référence : <strong style="color:#D4AF37">${fmtRate} VND</strong> (petit-déjeuner inclus)`;
      } else {
        priceBox.innerHTML = `<i class="fa-regular fa-clock"></i> Estimated for 1 night • Reference price: <strong style="color:#D4AF37">${fmtRate} VND</strong> (includes buffet breakfast)`;
      }
      return;
    }

    const cin  = new Date(cinVal);
    const cout = new Date(coutVal);
    if (cout <= cin) {
      const errMsg = currentLang === 'vi' ? 'Ngày trả phòng phải sau ngày nhận phòng' : (currentLang === 'fr' ? 'La date de départ doit être postérieure à la date d\'arrivée' : 'Check-out date must be after check-in date');
      priceBox.innerHTML = `<span style="color:#ff6b6b"><i class="fa-solid fa-triangle-exclamation"></i> ${errMsg}</span>`;
      return;
    }

    const nights  = Math.ceil(Math.abs(cout - cin) / 86400000);
    const total   = nights * rate;
    const fmtTotal = new Intl.NumberFormat('en-US').format(total);

    if (currentLang === 'vi') {
      priceBox.innerHTML = `Ước tính cho <strong>${nights} đêm</strong> • Giá tham khảo: <strong style="color:#D4AF37">${fmtTotal} VNĐ</strong> (bao gồm buffet sáng)`;
    } else if (currentLang === 'fr') {
      priceBox.innerHTML = `Estimé pour <strong>${nights} nuit(s)</strong> • Prix de référence : <strong style="color:#D4AF37">${fmtTotal} VND</strong> (petit-déjeuner inclus)`;
    } else {
      priceBox.innerHTML = `Estimated for <strong>${nights} night(s)</strong> • Reference price: <strong style="color:#D4AF37">${fmtTotal} VND</strong> (includes buffet breakfast)`;
    }
  }

  ['modal-room-type', 'modal-checkin', 'modal-checkout'].forEach(id => {
    document.getElementById(id)?.addEventListener('change', updateEstimate);
  });

  // ==========================================
  // SUBMIT FORM → GỬI EMAIL VỀ KHÁCH SẠN
  // ==========================================
  modalBookingForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn      = modalBookingForm.querySelector('button[type="submit"]');
    const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';

    const name     = document.getElementById('modal-name')?.value.trim();
    const phone    = document.getElementById('modal-phone')?.value.trim();
    const email    = document.getElementById('modal-email')?.value.trim() || '(không cung cấp)';
    const roomType = document.getElementById('modal-room-type')?.value;
    const cin      = document.getElementById('modal-checkin')?.value;
    const cout     = document.getElementById('modal-checkout')?.value;
    const adults   = document.getElementById('modal-adults')?.value || '2';
    const children = document.getElementById('modal-children')?.value || '0';
    const note     = document.getElementById('modal-note')?.value.trim() || 'Không có';

    if (!name || !phone || !cin || !cout) {
      alert('Vui lòng điền đầy đủ: Họ tên, Số điện thoại (Zalo), và Ngày dự kiến nhận/trả phòng!');
      return;
    }

    const reqCode   = 'SALA-REQ-' + Math.floor(10000 + Math.random() * 90000);
    const roomName  = roomNames[roomType] || roomType;
    const cin_d     = new Date(cin);
    const cout_d    = new Date(cout);
    const nights    = (cout_d > cin_d) ? Math.ceil(Math.abs(cout_d - cin_d) / 86400000) : 0;

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang gửi yêu cầu...';
    }

    // Dữ liệu gửi email (bao gồm cả biến tùy chỉnh và biến mặc định của EmailJS để tương thích hoàn toàn)
    const templateParams = {
      request_code:   reqCode,
      hotel_email:    EMAIL_CONFIG.HOTEL_EMAIL,
      customer_name:  name,
      customer_phone: phone,
      customer_email: email,
      room_name:      roomName,
      checkin_date:   cin,
      checkout_date:  cout,
      num_nights:     nights,
      num_adults:     adults,
      num_children:   children,
      special_note:   note,
      hotel_hotline:  EMAIL_CONFIG.HOTEL_HOTLINE,
      booking_time:   new Date().toLocaleString('vi-VN'),

      // Các biến dự phòng mặc định của EmailJS
      name:    name,
      email:   email,
      phone:   phone,
      time:    new Date().toLocaleString('vi-VN'),
      message: `• Mã YC: ${reqCode}\n• SĐT Zalo: ${phone}\n• Hạng phòng: ${roomName}\n• Ngày nhận phòng dự kiến: ${cin}\n• Ngày trả phòng dự kiến: ${cout} (${nights} đêm)\n• Số khách: ${adults} người lớn, ${children} trẻ em\n• Ghi chú: ${note}`
    };

    // Gửi email thông báo đến Gmail khách sạn
    if (typeof emailjs !== 'undefined' && EMAIL_CONFIG.EMAILJS_SERVICE_ID && EMAIL_CONFIG.EMAILJS_TEMPLATE_HOTEL) {
      try {
        await emailjs.send(EMAIL_CONFIG.EMAILJS_SERVICE_ID, EMAIL_CONFIG.EMAILJS_TEMPLATE_HOTEL, templateParams);
      } catch (err) {
        console.warn('EmailJS error:', err);
      }
    }

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHtml;
    }

    window.closeBookingModal();

    // Thông báo xác nhận
    alert(
      `✅ GỬI YÊU CẦU THÀNH CÔNG!\n\n` +
      `• Mã yêu cầu: ${reqCode}\n` +
      `• Họ tên: ${name}\n` +
      `• Zalo/Điện thoại: ${phone}\n` +
      `• Hạng phòng: ${roomName}\n` +
      `• Dự kiến nhận phòng: ${cin}\n` +
      `• Dự kiến trả phòng: ${cout} (${nights} đêm)\n\n` +
      `📞 Lễ tân Sala Tam Cốc sẽ liên hệ lại qua Zalo số ${phone} trong thời gian sớm nhất để xác nhận phòng và giá!\n\n` +
      `Hotline hỗ trợ ngay: 0942 060 533`
    );

    // Mở Zalo chat trực tiếp
    if (confirm('Bạn có muốn nhắn tin Zalo trực tiếp cho Lễ tân ngay bây giờ không?')) {
      window.open('https://zalo.me/0942060533', '_blank');
    }

    modalBookingForm.reset();
  });

  // ==========================================
  // SUBMIT FORM TRANG LIÊN HỆ (contact.html)
  // ==========================================
  const contactForm = document.getElementById('contactForm');
  contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';

    const name    = document.getElementById('contact-name')?.value.trim();
    const phone   = document.getElementById('contact-phone')?.value.trim();
    const email   = document.getElementById('contact-email')?.value.trim();
    const message = document.getElementById('contact-message')?.value.trim();

    if (!name || !phone || !email || !message) {
      alert('Vui lòng nhập đầy đủ thông tin liên hệ!');
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang gửi...';
    }

    const templateParams = {
      customer_name:  name,
      customer_phone: phone,
      customer_email: email,
      special_note:   message,
      booking_time:   new Date().toLocaleString('vi-VN'),

      // Fallbacks
      name:    name,
      email:   email,
      phone:   phone,
      time:    new Date().toLocaleString('vi-VN'),
      message: `• Lời nhắn từ trang Contact:\n• Họ tên: ${name}\n• SĐT: ${phone}\n• Email: ${email}\n• Nội dung: ${message}`
    };

    if (typeof emailjs !== 'undefined' && EMAIL_CONFIG.EMAILJS_SERVICE_ID && EMAIL_CONFIG.EMAILJS_TEMPLATE_HOTEL) {
      try {
        await emailjs.send(EMAIL_CONFIG.EMAILJS_SERVICE_ID, EMAIL_CONFIG.EMAILJS_TEMPLATE_HOTEL, templateParams);
      } catch (err) {
        console.warn('EmailJS error:', err);
      }
    }

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHtml;
    }

    alert(`✅ CẢM ƠN BẠN!\n\nYêu cầu liên hệ của ${name} đã được gửi tới Sala Tam Cốc Hotel & Spa. Chúng tôi sẽ phản hồi lại bạn sớm nhất!`);
    if (confirm('Bạn có muốn nhắn tin Zalo trực tiếp cho Lễ tân ngay bây giờ không?')) {
      window.open('https://zalo.me/0942060533', '_blank');
    }
    contactForm.reset();
  });
});
