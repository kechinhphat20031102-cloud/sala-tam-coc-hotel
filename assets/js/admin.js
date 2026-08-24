/**
 * SALA TAM COC HOTEL & SPA - ADMIN DASHBOARD INTERACTION SCRIPT
 */

document.addEventListener('DOMContentLoaded', () => {
  const loginGate = document.getElementById('loginGate');
  const adminDashboard = document.getElementById('adminDashboard');
  const loginForm = document.getElementById('loginForm');
  const passwordInput = document.getElementById('adminPassword');
  const loginError = document.getElementById('loginError');
  const logoutBtn = document.getElementById('logoutBtn');

  const CORRECT_PASSWORD = 'sala2026';

  // Check login session
  if (sessionStorage.getItem('sala_admin_authed') === 'true') {
    showDashboard();
  }

  // Handle Login
  loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (passwordInput.value === CORRECT_PASSWORD) {
      sessionStorage.setItem('sala_admin_authed', 'true');
      loginError.style.display = 'none';
      showDashboard();
      showToast('Đăng nhập thành công!', 'success');
    } else {
      loginError.style.display = 'block';
      passwordInput.value = '';
      passwordInput.focus();
    }
  });

  // Handle Logout
  logoutBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    sessionStorage.removeItem('sala_admin_authed');
    adminDashboard.style.display = 'none';
    loginGate.style.display = 'flex';
    showToast('Đã đăng xuất hệ thống admin', 'info');
  });

  function showDashboard() {
    loginGate.style.display = 'none';
    adminDashboard.style.display = 'block';
    loadDataIntoForms();
  }

  // TAB SWITCHING
  const tabBtns = document.querySelectorAll('.admin-tab-btn');
  const tabContents = document.querySelectorAll('.admin-tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      document.getElementById(targetId)?.classList.add('active');
    });
  });

  // LOAD DATA INTO FORMS
  function loadDataIntoForms() {
    const data = window.getSalaData();

    // 1. Hotel Info
    if (data.hotelInfo) {
      document.getElementById('info_hotline1').value = data.hotelInfo.hotline1 || '';
      document.getElementById('info_hotline2').value = data.hotelInfo.hotline2 || '';
      document.getElementById('info_hotline3').value = data.hotelInfo.hotline3 || '';
      document.getElementById('info_email').value = data.hotelInfo.email || '';
      document.getElementById('info_whatsapp').value = data.hotelInfo.whatsapp || '';
      document.getElementById('info_address').value = data.hotelInfo.address || '';
      document.getElementById('info_hero_sub').value = data.hotelInfo.heroSubtitle || '';
      document.getElementById('info_hero_desc').value = data.hotelInfo.heroDesc || '';
    }

    // 2. Rooms
    if (data.rooms) {
      Object.keys(data.rooms).forEach(roomKey => {
        const room = data.rooms[roomKey];
        const priceInput = document.getElementById(`room_price_${roomKey}`);
        const nameEnInput = document.getElementById(`room_nameEn_${roomKey}`);
        const nameViInput = document.getElementById(`room_nameVi_${roomKey}`);
        const sizeInput = document.getElementById(`room_size_${roomKey}`);
        const guestsInput = document.getElementById(`room_guests_${roomKey}`);
        const bedsInput = document.getElementById(`room_beds_${roomKey}`);
        const viewInput = document.getElementById(`room_view_${roomKey}`);
        const coverInput = document.getElementById(`room_cover_${roomKey}`);
        const photosInput = document.getElementById(`room_photos_${roomKey}`);

        if (priceInput) priceInput.value = room.price || '';
        if (nameEnInput) nameEnInput.value = room.nameEn || '';
        if (nameViInput) nameViInput.value = room.nameVi || '';
        if (sizeInput) sizeInput.value = room.size || '';
        if (guestsInput) guestsInput.value = room.guests || '';
        if (bedsInput) bedsInput.value = room.beds || '';
        if (viewInput) viewInput.value = room.view || '';
        if (coverInput) coverInput.value = room.cover || '';
        if (photosInput) photosInput.value = Array.isArray(room.photos) ? room.photos.join('\n') : (room.photos || '');
        if (descEnInput) descEnInput.value = room.descEn || '';
        if (descViInput) descViInput.value = room.descVi || '';
      });
    }

    // 3. Tours
    const tourKeys = [
      { id: 1, key: 'hoa-lu-bai-dinh-trang-an-mua-cave' },
      { id: 2, key: 'hoa-lu-trang-an-mua-cave-bich-dong' },
      { id: 3, key: 'bai-dinh-trang-an-mua-cave' },
      { id: 4, key: 'cuc-phuong-national-park' },
      { id: 5, key: 'cuc-phuong-van-long' },
      { id: 6, key: 'countryside-adventure' },
      { id: 7, key: 'bich-dong-thai-vy-thung-nham' }
    ];

    tourKeys.forEach(item => {
      const tourData = data.tours ? data.tours[item.key] : null;
      if (tourData) {
        const titleEl = document.getElementById(`tour${item.id}_title`);
        const priceEl = document.getElementById(`tour${item.id}_price`);
        const descEl = document.getElementById(`tour${item.id}_desc`);
        if (titleEl) titleEl.value = tourData.title || '';
        if (priceEl) priceEl.value = tourData.price || '';
        if (descEl) descEl.value = tourData.desc || '';
      }
    });

    if (data.tours && data.tours['limousine']) {
      document.getElementById('limo_oneway').value = data.tours['limousine'].priceOneWay || '';
      document.getElementById('limo_roundtrip').value = data.tours['limousine'].priceRoundTrip || '';
      document.getElementById('limo_schedule').value = data.tours['limousine'].schedule || '';
    }
  }

  // SAVE ALL DATA
  const saveAllBtn = document.getElementById('saveAllBtn');
  saveAllBtn?.addEventListener('click', () => {
    const currentData = window.getSalaData();

    // 1. Gather Hotel Info
    currentData.hotelInfo = {
      ...currentData.hotelInfo,
      hotline1: document.getElementById('info_hotline1').value.trim(),
      hotline2: document.getElementById('info_hotline2').value.trim(),
      hotline3: document.getElementById('info_hotline3').value.trim(),
      email: document.getElementById('info_email').value.trim(),
      whatsapp: document.getElementById('info_whatsapp').value.trim(),
      address: document.getElementById('info_address').value.trim(),
      heroSubtitle: document.getElementById('info_hero_sub').value.trim(),
      heroDesc: document.getElementById('info_hero_desc').value.trim()
    };

    // 2. Gather Rooms
    Object.keys(currentData.rooms).forEach(roomKey => {
      const priceVal = document.getElementById(`room_price_${roomKey}`)?.value.trim();
      const nameEnVal = document.getElementById(`room_nameEn_${roomKey}`)?.value.trim();
      const nameViVal = document.getElementById(`room_nameVi_${roomKey}`)?.value.trim();
      const sizeVal = document.getElementById(`room_size_${roomKey}`)?.value.trim();
      const guestsVal = document.getElementById(`room_guests_${roomKey}`)?.value.trim();
      const bedsVal = document.getElementById(`room_beds_${roomKey}`)?.value.trim();
      const viewVal = document.getElementById(`room_view_${roomKey}`)?.value.trim();
      const coverVal = document.getElementById(`room_cover_${roomKey}`)?.value.trim();
      const photosVal = document.getElementById(`room_photos_${roomKey}`)?.value.trim();
      const descEnVal = document.getElementById(`room_descEn_${roomKey}`)?.value.trim();
      const descViVal = document.getElementById(`room_descVi_${roomKey}`)?.value.trim();

      const photosArr = photosVal ? photosVal.split('\n').map(s => s.trim()).filter(Boolean) : (currentData.rooms[roomKey]?.photos || []);

      currentData.rooms[roomKey] = {
        ...currentData.rooms[roomKey],
        price: priceVal || currentData.rooms[roomKey].price,
        nameEn: nameEnVal || currentData.rooms[roomKey].nameEn,
        nameVi: nameViVal || currentData.rooms[roomKey].nameVi,
        size: sizeVal || currentData.rooms[roomKey].size,
        guests: guestsVal || currentData.rooms[roomKey].guests,
        beds: bedsVal || currentData.rooms[roomKey].beds,
        view: viewVal || currentData.rooms[roomKey].view,
        cover: coverVal || currentData.rooms[roomKey].cover,
        photos: photosArr.length > 0 ? photosArr : currentData.rooms[roomKey].photos,
        descEn: descEnVal || currentData.rooms[roomKey].descEn,
        descVi: descViVal || currentData.rooms[roomKey].descVi
      };
    });

    // 3. Gather Tours
    if (!currentData.tours) currentData.tours = {};

    tourKeys.forEach(item => {
      const titleVal = document.getElementById(`tour${item.id}_title`)?.value.trim();
      const priceVal = document.getElementById(`tour${item.id}_price`)?.value.trim();
      const descVal = document.getElementById(`tour${item.id}_desc`)?.value.trim();

      currentData.tours[item.key] = {
        ...currentData.tours[item.key],
        title: titleVal || currentData.tours[item.key]?.title,
        price: priceVal || currentData.tours[item.key]?.price,
        desc: descVal || currentData.tours[item.key]?.desc
      };
    });

    if (currentData.tours['limousine']) {
      currentData.tours['limousine'].priceOneWay = document.getElementById('limo_oneway').value.trim();
      currentData.tours['limousine'].priceRoundTrip = document.getElementById('limo_roundtrip').value.trim();
      currentData.tours['limousine'].schedule = document.getElementById('limo_schedule').value.trim();
    }

    // Save to localStorage
    if (window.saveSalaData(currentData)) {
      showToast('Đã lưu tất cả thay đổi thành công!', 'success');
    } else {
      showToast('Có lỗi xảy ra khi lưu dữ liệu!', 'error');
    }
  });

  // EXPORT JSON FILE
  const exportJsonBtn = document.getElementById('exportJsonBtn');
  exportJsonBtn?.addEventListener('click', () => {
    const data = window.getSalaData();
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sala-tam-coc-data-${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Đã tải xuống file cấu hình JSON thành công!', 'success');
  });

  // IMPORT JSON FILE
  const importJsonBtn = document.getElementById('importJsonBtn');
  const importFileInput = document.getElementById('importFileInput');

  importJsonBtn?.addEventListener('click', () => {
    importFileInput.click();
  });

  importFileInput?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target.result);
        if (window.saveSalaData(importedData)) {
          loadDataIntoForms();
          showToast('Tải dữ liệu từ file JSON lên thành công!', 'success');
        } else {
          showToast('File JSON không hợp lệ!', 'error');
        }
      } catch(err) {
        showToast('Lỗi đọc file JSON: ' + err.message, 'error');
      }
    };
    reader.readAsText(file);
    importFileInput.value = '';
  });

  // RESET DEFAULTS
  const resetDefaultsBtn = document.getElementById('resetDefaultsBtn');
  resetDefaultsBtn?.addEventListener('click', () => {
    if (confirm('Bạn có chắc chắn muốn khôi phục dữ liệu về mặc định ban đầu không? Tất cả chỉnh sửa chưa xuất file sẽ bị xóa.')) {
      window.resetSalaData();
      loadDataIntoForms();
      showToast('Đã khôi phục dữ liệu mặc định thành công!', 'info');
    }
  });

  // TOAST ALERT HELPER
  function showToast(message, type = 'info') {
    let toastContainer = document.getElementById('adminToastContainer');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'adminToastContainer';
      toastContainer.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 99999;
        display: flex;
        flex-direction: column;
        gap: 10px;
      `;
      document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    const bgColor = type === 'success' ? '#2e7d32' : type === 'error' ? '#c62828' : '#0288d1';
    toast.style.cssText = `
      background: ${bgColor};
      color: #ffffff;
      padding: 14px 22px;
      border-radius: 8px;
      font-size: 0.9rem;
      font-weight: 500;
      box-shadow: 0 4px 18px rgba(0,0,0,0.3);
      animation: slideInRight 0.3s ease;
      display: flex;
      align-items: center;
      gap: 10px;
    `;
    toast.innerHTML = `<i class="fa-solid ${type === 'success' ? 'fa-circle-check' : type === 'error' ? 'fa-circle-exclamation' : 'fa-circle-info'}"></i> ${message}`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
});
