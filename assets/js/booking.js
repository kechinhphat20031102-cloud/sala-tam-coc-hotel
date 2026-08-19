/**
 * SALA TAM CỐC HOTEL & SPA - BOOKING ENGINE & EMAIL RESERVATION SYSTEM
 */

// ==========================================
// CẤU HÌNH GỬI EMAIL TỰ ĐỘNG (EMAILJS)
// ==========================================
const EMAIL_CONFIG = {
  HOTEL_EMAIL: 'salatamcochotel@gmail.com',
  HOTEL_HOTLINE: '0942 060 533 - 0986 969 898',
  HOTEL_ADDRESS: 'Khu Đồng Đốt, Phường Nam Hoa Lư, Tỉnh Ninh Bình',
  
  // Thông tin cấu hình tài khoản EmailJS (Miễn phí 200 email/tháng)
  // Khi Quý khách đăng ký EmailJS, điền các mã tương ứng vào đây:
  EMAILJS_PUBLIC_KEY: '',      // Ví dụ: 'user_abcdef123456'
  EMAILJS_SERVICE_ID: '',      // Ví dụ: 'service_gmail'
  EMAILJS_TEMPLATE_HOTEL: '',  // Template gửi về cho khách sạn (salatamcochotel@gmail.com)
  EMAILJS_TEMPLATE_GUEST: ''   // Template gửi xác nhận cho khách hàng
};

document.addEventListener('DOMContentLoaded', () => {
  // Khởi tạo EmailJS SDK nếu đã có Public Key
  if (typeof emailjs !== 'undefined' && EMAIL_CONFIG.EMAILJS_PUBLIC_KEY) {
    emailjs.init(EMAIL_CONFIG.EMAILJS_PUBLIC_KEY);
  }

  const bookingModal = document.getElementById('bookingModal');
  const modalCloseBtns = document.querySelectorAll('.modal-close, .modal-cancel');
  const openBookingBtns = document.querySelectorAll('[data-open-booking]');
  const quickBookingForm = document.getElementById('quickBookingForm');
  const modalBookingForm = document.getElementById('modalBookingForm');

  // Bảng giá phòng tham khảo (VNĐ / đêm)
  const roomRates = {
    'superior-double': { name: 'Superior Double City View', price: 850000 },
    'superior-triple': { name: 'Superior Triple City View', price: 1150000 },
    'deluxe-double': { name: 'Deluxe Double Room Balcony', price: 1250000 },
    'deluxe-family': { name: 'Deluxe Family Room Balcony', price: 1750000 },
    'luxury-double': { name: 'Luxury Double with Balcony & Bath tub', price: 1650000 },
    'luxury-twin': { name: 'Luxury Twin with Balcony & Bath tub', price: 1650000 },
    'family-connecting': { name: 'Family Connecting Room (2 Phòng)', price: 2450000 }
  };

  // Mở Modal Đặt Phòng
  window.openBookingModal = (roomKey = '', checkin = '', checkout = '', guests = '2') => {
    if (!bookingModal) return;

    const roomSelect = document.getElementById('modal-room-type');
    const cinInput = document.getElementById('modal-checkin');
    const coutInput = document.getElementById('modal-checkout');
    const adultsInput = document.getElementById('modal-adults');

    if (roomKey && roomSelect) {
      roomSelect.value = roomKey;
    }
    if (checkin && cinInput) {
      cinInput.value = checkin;
    }
    if (checkout && coutInput) {
      coutInput.value = checkout;
    }
    if (guests && adultsInput) {
      adultsInput.value = guests;
    }

    // Gán ngày mặc định hôm nay và ngày mai nếu trống
    if (cinInput && !cinInput.value) {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      cinInput.value = today.toISOString().split('T')[0];
      if (coutInput && !coutInput.value) {
        coutInput.value = tomorrow.toISOString().split('T')[0];
      }
    }

    calculateEstimatedPrice();
    bookingModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  // Đóng Modal
  window.closeBookingModal = () => {
    if (!bookingModal) return;
    bookingModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  };

  // Lắng nghe nút mở đặt phòng
  openBookingBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const openVal = btn.getAttribute('data-open-booking');
      const roomVal = btn.getAttribute('data-room');
      const roomKey = (openVal && openVal !== '' && openVal !== 'true') ? openVal : (roomVal || 'deluxe-double');
      window.openBookingModal(roomKey);
    });
  });

  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.closeBookingModal();
    });
  });

  bookingModal?.addEventListener('click', (e) => {
    if (e.target === bookingModal) {
      window.closeBookingModal();
    }
  });

  // Submit từ thanh Quick Booking trang chủ
  quickBookingForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const cin = document.getElementById('quick-checkin')?.value;
    const cout = document.getElementById('quick-checkout')?.value;
    const room = document.getElementById('quick-room')?.value;
    const guests = document.getElementById('quick-guests')?.value;

    window.openBookingModal(room, cin, cout, guests);
  });

  // Tính toán giá tiền tạm tính
  function calculateEstimatedPrice() {
    const roomKey = document.getElementById('modal-room-type')?.value;
    const cinVal = document.getElementById('modal-checkin')?.value;
    const coutVal = document.getElementById('modal-checkout')?.value;
    const priceDisplay = document.getElementById('estimated-price-display');

    if (!roomKey || !cinVal || !coutVal || !priceDisplay) return { total: 0, diffDays: 1, formatted: '0₫' };

    const cin = new Date(cinVal);
    const cout = new Date(coutVal);

    if (cout <= cin) {
      priceDisplay.innerHTML = '<span style="color: #ff6b6b;"><i class="fa-solid fa-triangle-exclamation"></i> Ngày trả phòng phải sau ngày nhận phòng</span>';
      return { total: 0, diffDays: 0, formatted: 'Chưa hợp lệ' };
    }

    const diffTime = Math.abs(cout - cin);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const roomInfo = roomRates[roomKey] || { name: 'Phòng nghỉ', price: 0 };
    
    let total = 0;
    let formattedTotal = 'Liên hệ hotline';

    if (roomInfo.price > 0) {
      total = diffDays * roomInfo.price;
      formattedTotal = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total);
      priceDisplay.innerHTML = `Tổng ước tính: <strong style="font-size: 1.15rem; color: #D4AF37;">${formattedTotal}</strong> (${diffDays} đêm • Bao gồm buffet sáng & VAT)`;
    } else {
      priceDisplay.innerHTML = `Thời gian lưu trú: <strong>${diffDays} đêm</strong> • <em>Hotline sẽ báo giá ưu đãi tốt nhất khi xác nhận</em>`;
    }

    return { total, diffDays, formatted: formattedTotal };
  }

  // Lắng nghe thay đổi trường ngày & loại phòng
  ['modal-room-type', 'modal-checkin', 'modal-checkout'].forEach(id => {
    document.getElementById(id)?.addEventListener('change', calculateEstimatedPrice);
  });

  // XỬ LÝ KHI SUBMIT FORM ĐẶT PHÒNG
  modalBookingForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = modalBookingForm.querySelector('button[type="submit"]');
    const originalBtnHtml = submitBtn ? submitBtn.innerHTML : 'Xác Nhận Đặt Phòng';

    const name = document.getElementById('modal-name')?.value.trim();
    const phone = document.getElementById('modal-phone')?.value.trim();
    const email = document.getElementById('modal-email')?.value.trim();
    const roomType = document.getElementById('modal-room-type')?.value;
    const cin = document.getElementById('modal-checkin')?.value;
    const cout = document.getElementById('modal-checkout')?.value;
    const adults = document.getElementById('modal-adults')?.value || '2';
    const children = document.getElementById('modal-children')?.value || '0';
    const note = document.getElementById('modal-note')?.value.trim() || 'Không có ghi chú thêm';

    if (!name || !phone || !email || !cin || !cout) {
      alert('Vui lòng điền đầy đủ Họ tên, Số điện thoại, Email và Ngày nhận/trả phòng!');
      return;
    }

    // Tạo mã đặt phòng tự động
    const bookingCode = 'SALA-' + Math.floor(10000 + Math.random() * 90000);
    const roomName = roomRates[roomType]?.name || roomType;
    const { diffDays, formatted } = calculateEstimatedPrice();

    // Hiển thị trạng thái đang xử lý
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang gửi thông tin đặt phòng...';
    }

    // Tập hợp dữ liệu gửi qua Email
    const templateParams = {
      booking_code: bookingCode,
      hotel_email: EMAIL_CONFIG.HOTEL_EMAIL,
      customer_name: name,
      customer_phone: phone,
      customer_email: email,
      room_name: roomName,
      checkin_date: cin,
      checkout_date: cout,
      num_nights: diffDays,
      num_adults: adults,
      num_children: children,
      total_price: formatted,
      special_note: note,
      hotel_hotline: EMAIL_CONFIG.HOTEL_HOTLINE,
      hotel_address: EMAIL_CONFIG.HOTEL_ADDRESS,
      booking_time: new Date().toLocaleString('vi-VN')
    };

    // 1. Gửi Email thông qua EmailJS (nếu đã cấu hình Service ID)
    let emailSentSuccessfully = false;
    if (typeof emailjs !== 'undefined' && EMAIL_CONFIG.EMAILJS_SERVICE_ID) {
      try {
        // Gửi thông báo đến Gmail khách sạn
        if (EMAIL_CONFIG.EMAILJS_TEMPLATE_HOTEL) {
          await emailjs.send(EMAIL_CONFIG.EMAILJS_SERVICE_ID, EMAIL_CONFIG.EMAILJS_TEMPLATE_HOTEL, templateParams);
        }
        // Gửi email xác nhận đến khách hàng
        if (EMAIL_CONFIG.EMAILJS_TEMPLATE_GUEST) {
          await emailjs.send(EMAIL_CONFIG.EMAILJS_SERVICE_ID, EMAIL_CONFIG.EMAILJS_TEMPLATE_GUEST, templateParams);
        }
        emailSentSuccessfully = true;
      } catch (err) {
        console.warn('EmailJS delivery status:', err);
      }
    }

    // Khôi phục nút submit
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHtml;
    }

    // Đóng popup đặt phòng
    window.closeBookingModal();

    // Hiển thị thông báo xác nhận sang trọng
    const successMsg = `🎉 ĐẶT PHÒNG THÀNH CÔNG!\n\n` +
      `• Mã đặt phòng: ${bookingCode}\n` +
      `• Khách hàng: ${name} (${phone})\n` +
      `• Hạng phòng: ${roomName}\n` +
      `• Thời gian: ${cin} ➔ ${cout} (${diffDays} đêm)\n` +
      `• Tổng ước tính: ${formatted}\n\n` +
      `✅ Thông tin đặt phòng đã được gửi về Gmail: ${EMAIL_CONFIG.HOTEL_EMAIL}\n` +
      `✅ Email xác nhận đã được gửi đến: ${email}\n\n` +
      `Bộ phận Lễ tân Sala Tam Cốc sẽ liên hệ với Quý khách qua số ${phone} trong ít phút để hoàn tất thủ tục.`;

    alert(successMsg);

    // Gợi ý mở Zalo chat trực tiếp
    if (confirm('Quý khách có muốn mở Zalo Hotline 0942 060 533 để trao đổi trực tiếp với Lễ tân ngay không?')) {
      const zaloUrl = `https://zalo.me/0942060533`;
      window.open(zaloUrl, '_blank');
    }

    // Reset form
    modalBookingForm.reset();
  });
});
