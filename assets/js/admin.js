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

  let activeRoomKey = 'superior-double';
  let activeLang = 'vi';
  let roomDataState = {};

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
    roomDataState = JSON.parse(JSON.stringify(data.rooms || {}));

    // 1. Hotel Info
    if (data.hotelInfo) {
      document.getElementById('info_hotline1') && (document.getElementById('info_hotline1').value = data.hotelInfo.hotline1 || '');
      document.getElementById('info_hotline2') && (document.getElementById('info_hotline2').value = data.hotelInfo.hotline2 || '');
      document.getElementById('info_hotline3') && (document.getElementById('info_hotline3').value = data.hotelInfo.hotline3 || '');
      document.getElementById('info_email') && (document.getElementById('info_email').value = data.hotelInfo.email || '');
      document.getElementById('info_whatsapp') && (document.getElementById('info_whatsapp').value = data.hotelInfo.whatsapp || '');
      document.getElementById('info_address') && (document.getElementById('info_address').value = data.hotelInfo.address || '');
      document.getElementById('info_hero_sub') && (document.getElementById('info_hero_sub').value = data.hotelInfo.heroSubtitle || '');
      document.getElementById('info_hero_desc') && (document.getElementById('info_hero_desc').value = data.hotelInfo.heroDesc || '');
    }

    // 2. Load Rooms Form
    renderRoomEditForm();

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
      document.getElementById('limo_oneway') && (document.getElementById('limo_oneway').value = data.tours['limousine'].priceOneWay || '');
      document.getElementById('limo_roundtrip') && (document.getElementById('limo_roundtrip').value = data.tours['limousine'].priceRoundTrip || '');
      document.getElementById('limo_schedule') && (document.getElementById('limo_schedule').value = data.tours['limousine'].schedule || '');
    }
  }

  function saveCurrentRoomFormToState() {
    if (!roomDataState[activeRoomKey]) {
      roomDataState[activeRoomKey] = {};
    }
    const room = roomDataState[activeRoomKey];

    const nameVal = document.getElementById('admin_field_room_name')?.value.trim();
    const descVal = document.getElementById('admin_field_room_desc')?.value.trim();
    const sizeVal = document.getElementById('admin_field_room_size')?.value.trim();
    const guestsVal = document.getElementById('admin_field_room_guests')?.value.trim();
    const bedsVal = document.getElementById('admin_field_room_beds')?.value.trim();
    const priceVal = document.getElementById('admin_field_room_price')?.value.trim();
    const viewVal = document.getElementById('admin_field_room_view')?.value.trim();
    const coverVal = document.getElementById('admin_field_room_cover')?.value.trim();

    if (sizeVal !== undefined) room.size = sizeVal;
    if (priceVal !== undefined) room.price = priceVal;

    // Preserve photos array and enforce cover as photo #0
    if (Array.isArray(room.photos) && room.photos.length > 0) {
      room.cover = room.photos[0];
    } else if (coverVal) {
      room.cover = coverVal;
    }

    if (activeLang === 'vi') {
      if (nameVal !== undefined) room.nameVi = nameVal;
      if (descVal !== undefined) room.descVi = descVal;
      if (guestsVal !== undefined) room.guestsVi = guestsVal;
      if (bedsVal !== undefined) room.bedsVi = bedsVal;
      if (viewVal !== undefined) room.viewVi = viewVal;
    } else if (activeLang === 'en') {
      if (nameVal !== undefined) room.nameEn = nameVal;
      if (descVal !== undefined) room.descEn = descVal;
      if (guestsVal !== undefined) room.guests = guestsVal;
      if (bedsVal !== undefined) room.beds = bedsVal;
      if (viewVal !== undefined) room.view = viewVal;
    } else if (activeLang === 'fr') {
      if (nameVal !== undefined) room.nameFr = nameVal;
      if (descVal !== undefined) room.descFr = descVal;
      if (guestsVal !== undefined) room.guestsFr = guestsVal;
      if (bedsVal !== undefined) room.bedsFr = bedsVal;
      if (viewVal !== undefined) room.viewFr = viewVal;
    }
  }

  function renderRoomEditForm() {
    const room = roomDataState[activeRoomKey] || {};

    const selectEl = document.getElementById('adminRoomKeySelect');
    if (selectEl && selectEl.value !== activeRoomKey) {
      selectEl.value = activeRoomKey;
    }

    const roomTitleText = room.nameVi || room.nameEn || (selectEl?.options[selectEl?.selectedIndex]?.text) || activeRoomKey;
    const titleEl = document.getElementById('adminActiveRoomTitle');
    if (titleEl) titleEl.innerText = roomTitleText;

    const keyBadge = document.getElementById('adminActiveRoomKey');
    if (keyBadge) keyBadge.innerText = `Key: ${activeRoomKey}`;

    const langNames = { vi: 'Tiếng Việt', en: 'English', fr: 'Français' };
    const langBadge = document.getElementById('adminActiveLangBadge');
    if (langBadge) langBadge.innerText = `[ Đang chỉnh sửa: ${langNames[activeLang]} ]`;

    document.querySelectorAll('.current-lang-text').forEach(el => {
      el.innerText = langNames[activeLang];
    });

    let nameVal = '';
    let descVal = '';
    let guestsVal = '';
    let bedsVal = '';
    let viewVal = '';

    if (activeLang === 'vi') {
      nameVal = room.nameVi || room.nameEn || '';
      descVal = room.descVi || room.descEn || '';
      guestsVal = room.guestsVi || room.guests || '';
      bedsVal = room.bedsVi || room.beds || '';
      viewVal = room.viewVi || room.view || '';
    } else if (activeLang === 'en') {
      nameVal = room.nameEn || '';
      descVal = room.descEn || '';
      guestsVal = room.guests || room.guestsEn || '';
      bedsVal = room.beds || room.bedsEn || '';
      viewVal = room.view || room.viewEn || '';
    } else if (activeLang === 'fr') {
      const defRoom = (window.DEFAULT_SALA_DATA && window.DEFAULT_SALA_DATA.rooms && window.DEFAULT_SALA_DATA.rooms[activeRoomKey]) || {};
      nameVal = room.nameFr || defRoom.nameFr || room.nameEn || '';
      descVal = room.descFr || defRoom.descFr || room.descEn || '';
      guestsVal = room.guestsFr || defRoom.guestsFr || room.guests || '';
      bedsVal = room.bedsFr || defRoom.bedsFr || room.beds || '';
      viewVal = room.viewFr || defRoom.viewFr || room.view || '';
    }

    const fieldName = document.getElementById('admin_field_room_name');
    const fieldDesc = document.getElementById('admin_field_room_desc');
    const fieldSize = document.getElementById('admin_field_room_size');
    const fieldGuests = document.getElementById('admin_field_room_guests');
    const fieldBeds = document.getElementById('admin_field_room_beds');
    const fieldPrice = document.getElementById('admin_field_room_price');
    const fieldView = document.getElementById('admin_field_room_view');
    const fieldCover = document.getElementById('admin_field_room_cover');
    const fieldPhotos = document.getElementById('admin_field_room_photos');

    if (fieldName) fieldName.value = nameVal;
    if (fieldDesc) fieldDesc.value = descVal;
    if (fieldSize) fieldSize.value = room.size || '';
    if (fieldGuests) fieldGuests.value = guestsVal;
    if (fieldBeds) fieldBeds.value = bedsVal;
    if (fieldPrice) fieldPrice.value = room.price || '';
    if (fieldView) fieldView.value = viewVal;
    if (fieldCover) fieldCover.value = room.cover || '';
    if (fieldPhotos) fieldPhotos.value = Array.isArray(room.photos) ? room.photos.join('\n') : (room.photos || '');

    renderPhotoGalleryGrid();
  }

  // RENDER VISUAL PHOTO GALLERY GRID
  function renderPhotoGalleryGrid() {
    const gridContainer = document.getElementById('admin_photos_gallery_grid');
    if (!gridContainer) return;

    const room = roomDataState[activeRoomKey] || {};
    let photos = Array.isArray(room.photos) ? [...room.photos] : [];

    // Ensure cover image is photo #0 if photos exists
    if (photos.length > 0) {
      room.cover = photos[0];
    } else {
      room.cover = '';
    }

    if (photos.length === 0) {
      gridContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 30px; background: rgba(255,255,255,0.02); border: 2px dashed rgba(255,255,255,0.15); border-radius: 8px; color: #888;">
          <i class="fa-regular fa-image" style="font-size: 2.2rem; margin-bottom: 8px; opacity: 0.5;"></i>
          <p style="margin: 0; font-size: 0.9rem;">Chưa có hình ảnh nào cho phòng này. Nhấn <strong>"+ Thêm Ảnh Từ Máy Tính"</strong> để tải ảnh lên.</p>
        </div>
      `;
      syncPhotoFormFields(photos);
      return;
    }

    gridContainer.innerHTML = photos.map((photoUrl, idx) => {
      const isCover = (idx === 0);
      const isPendingUpload = typeof photoUrl === 'string' && photoUrl.startsWith('data:image/');
      return `
        <div class="admin-photo-card" data-idx="${idx}" style="position: relative; background: #222428; border: ${isCover ? '2px solid var(--primary-gold)' : (isPendingUpload ? '2px dashed #42a5f5' : '1px solid rgba(255,255,255,0.15)')}; border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; transition: all 0.25s ease; box-shadow: 0 4px 12px rgba(0,0,0,0.3);">
          ${isCover ? `<div style="position: absolute; top: 6px; left: 6px; background: var(--primary-gold); color: #111; font-weight: 700; font-size: 0.7rem; padding: 2px 7px; border-radius: 4px; z-index: 2; box-shadow: 0 2px 6px rgba(0,0,0,0.4);"><i class="fa-solid fa-star"></i> ẢNH ĐẠI DIỆN</div>` : `<div style="position: absolute; top: 6px; left: 6px; background: rgba(0,0,0,0.6); color: #ccc; font-weight: 600; font-size: 0.7rem; padding: 2px 6px; border-radius: 4px; z-index: 2;">#${idx + 1}</div>`}
          ${isPendingUpload ? `<div style="position: absolute; top: 6px; right: 6px; background: #1976d2; color: #fff; font-weight: 700; font-size: 0.65rem; padding: 2px 6px; border-radius: 4px; z-index: 2;"><i class="fa-solid fa-cloud-arrow-up"></i> Chưa đẩy GitHub</div>` : ''}
          
          <div style="height: 105px; width: 100%; background: #000; display: flex; align-items: center; justify-content: center; overflow: hidden; position: relative;">
            <img src="${photoUrl}" alt="Photo ${idx + 1}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null; this.src='https://placehold.co/300x200/222/d4af37?text=Image+Error';">
          </div>

          <div style="padding: 6px; background: #1a1b1e; display: flex; justify-content: space-between; align-items: center; gap: 4px;">
            <div style="display: flex; gap: 3px;">
              ${idx > 0 ? `<button type="button" class="photo-move-left-btn" data-idx="${idx}" title="Chuyển lên trước" style="background: #333; color: #fff; border: none; padding: 3px 7px; border-radius: 4px; cursor: pointer; font-size: 0.75rem;"><i class="fa-solid fa-chevron-left"></i></button>` : ''}
              ${idx < photos.length - 1 ? `<button type="button" class="photo-move-right-btn" data-idx="${idx}" title="Chuyển xuống sau" style="background: #333; color: #fff; border: none; padding: 3px 7px; border-radius: 4px; cursor: pointer; font-size: 0.75rem;"><i class="fa-solid fa-chevron-right"></i></button>` : ''}
              ${!isCover ? `<button type="button" class="photo-set-cover-btn" data-idx="${idx}" title="Đặt làm ảnh đại diện" style="background: rgba(197,168,128,0.2); color: var(--primary-gold); border: 1px solid var(--primary-gold); padding: 3px 7px; border-radius: 4px; cursor: pointer; font-size: 0.75rem;"><i class="fa-solid fa-star"></i></button>` : ''}
            </div>
            <button type="button" class="photo-delete-btn" data-idx="${idx}" title="Xóa ảnh này" style="background: #c62828; color: #fff; border: none; padding: 3px 8px; border-radius: 4px; cursor: pointer; font-size: 0.75rem;"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>
      `;
    }).join('');

    syncPhotoFormFields(photos);
    attachPhotoCardListeners();
  }

  function syncPhotoFormFields(photos) {
    const fieldCover = document.getElementById('admin_field_room_cover');
    const fieldPhotos = document.getElementById('admin_field_room_photos');

    if (fieldCover) fieldCover.value = photos.length > 0 ? photos[0] : '';
    if (fieldPhotos) fieldPhotos.value = photos.join('\n');
    
    if (roomDataState[activeRoomKey]) {
      roomDataState[activeRoomKey].photos = photos;
      roomDataState[activeRoomKey].cover = photos.length > 0 ? photos[0] : '';
    }
  }

  function attachPhotoCardListeners() {
    const gridContainer = document.getElementById('admin_photos_gallery_grid');
    if (!gridContainer) return;

    // Delete photo
    gridContainer.querySelectorAll('.photo-delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const idx = parseInt(btn.getAttribute('data-idx'), 10);
        const room = roomDataState[activeRoomKey];
        if (room && Array.isArray(room.photos)) {
          room.photos.splice(idx, 1);
          if (room.photos.length > 0) {
            room.cover = room.photos[0];
          } else {
            room.cover = '';
          }
          renderPhotoGalleryGrid();
          showToast('Đã xóa 1 ảnh khỏi danh sách!', 'info');
        }
      });
    });

    // Set cover photo (move to index 0)
    gridContainer.querySelectorAll('.photo-set-cover-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const idx = parseInt(btn.getAttribute('data-idx'), 10);
        const room = roomDataState[activeRoomKey];
        if (room && Array.isArray(room.photos) && idx > 0) {
          const target = room.photos.splice(idx, 1)[0];
          room.photos.unshift(target);
          room.cover = room.photos[0];
          renderPhotoGalleryGrid();
          showToast('Đã đặt làm Ảnh Đại Diện (Vị trí #1)!', 'success');
        }
      });
    });

    // Move Left
    gridContainer.querySelectorAll('.photo-move-left-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const idx = parseInt(btn.getAttribute('data-idx'), 10);
        const room = roomDataState[activeRoomKey];
        if (room && Array.isArray(room.photos) && idx > 0) {
          const temp = room.photos[idx];
          room.photos[idx] = room.photos[idx - 1];
          room.photos[idx - 1] = temp;
          room.cover = room.photos[0];
          renderPhotoGalleryGrid();
        }
      });
    });

    // Move Right
    gridContainer.querySelectorAll('.photo-move-right-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const idx = parseInt(btn.getAttribute('data-idx'), 10);
        const room = roomDataState[activeRoomKey];
        if (room && Array.isArray(room.photos) && idx < room.photos.length - 1) {
          const temp = room.photos[idx];
          room.photos[idx] = room.photos[idx + 1];
          room.photos[idx + 1] = temp;
          room.cover = room.photos[0];
          renderPhotoGalleryGrid();
        }
      });
    });
  }

  // Compress image file using HTML5 Canvas to keep fast, sharp & within quota
  function compressImageFile(file, maxWidth = 1600, maxHeight = 1200, quality = 0.82) {
    return new Promise((resolve, reject) => {
      if (!file || !file.type.startsWith('image/')) {
        return reject(new Error('Tệp tải lên không phải hình ảnh'));
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          let width = img.width;
          let height = img.height;

          if (width > maxWidth || height > maxHeight) {
            if (width / height > maxWidth / maxHeight) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            } else {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedDataUrl);
        };
        img.onerror = () => resolve(e.target.result);
        img.src = e.target.result;
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  }

  // Handle File Upload from Computer
  const uploadBtn = document.getElementById('admin_btn_upload_photos');
  const uploadInput = document.getElementById('admin_upload_photos_input');

  uploadBtn?.addEventListener('click', () => uploadInput?.click());

  uploadInput?.addEventListener('change', async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    showToast(`Đang xử lý tối ưu ${files.length} tệp ảnh...`, 'info');
    const room = roomDataState[activeRoomKey] || {};
    if (!Array.isArray(room.photos)) room.photos = [];

    let count = 0;
    for (let i = 0; i < files.length; i++) {
      try {
        const compressed = await compressImageFile(files[i], 1600, 1200, 0.82);
        room.photos.push(compressed);
        count++;
      } catch(err) {
        console.error("Compression error:", err);
      }
    }

    if (room.photos.length > 0 && !room.cover) {
      room.cover = room.photos[0];
    }

    renderPhotoGalleryGrid();
    showToast(`Đã thêm ${count} ảnh mới! Nhấn "Lưu & Đẩy Lên GitHub" để đẩy ảnh trực tiếp vào kho lưu trữ GitHub.`, 'success');
    uploadInput.value = '';
  });

  // Handle Manual URL / Path addition
  const addUrlBtn = document.getElementById('admin_btn_add_url_photo');
  addUrlBtn?.addEventListener('click', () => {
    const inputPath = prompt('Nhập đường dẫn file ảnh hoặc URL (vd: Ảnh Sala Tam Coc Hotel & Spa/.../ANT_4807.jpg):');
    if (inputPath && inputPath.trim()) {
      const room = roomDataState[activeRoomKey] || {};
      if (!Array.isArray(room.photos)) room.photos = [];
      room.photos.push(inputPath.trim());
      renderPhotoGalleryGrid();
      showToast('Đã thêm 1 ảnh mới vào danh sách!', 'success');
    }
  });

  // LISTENERS FOR ROOM SELECT & LANG BUTTONS
  const roomSelectEl = document.getElementById('adminRoomKeySelect');
  roomSelectEl?.addEventListener('change', (e) => {
    saveCurrentRoomFormToState();
    activeRoomKey = e.target.value;
    renderRoomEditForm();
  });

  const langBtns = document.querySelectorAll('.admin-lang-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      saveCurrentRoomFormToState();
      langBtns.forEach(b => {
        b.classList.remove('active');
        b.style.background = '#24262c';
        b.style.color = '#e0e0e0';
        b.style.borderColor = 'rgba(255,255,255,0.15)';
        b.style.fontWeight = '600';
      });

      btn.classList.add('active');
      btn.style.background = 'var(--primary-gold)';
      btn.style.color = '#111';
      btn.style.borderColor = 'var(--primary-gold)';
      btn.style.fontWeight = '700';

      activeLang = btn.getAttribute('data-lang') || 'vi';
      renderRoomEditForm();
    });
  });

  // SAVE ALL DATA FUNCTION
  function saveAllDataToStorage() {
    saveCurrentRoomFormToState();

    const fullData = window.getSalaData();
    fullData.rooms = roomDataState;

    if (document.getElementById('info_hotline1')) {
      fullData.hotelInfo = {
        ...fullData.hotelInfo,
        hotline1: document.getElementById('info_hotline1')?.value.trim() || fullData.hotelInfo.hotline1,
        hotline2: document.getElementById('info_hotline2')?.value.trim() || fullData.hotelInfo.hotline2,
        hotline3: document.getElementById('info_hotline3')?.value.trim() || fullData.hotelInfo.hotline3,
        email: document.getElementById('info_email')?.value.trim() || fullData.hotelInfo.email,
        whatsapp: document.getElementById('info_whatsapp')?.value.trim() || fullData.hotelInfo.whatsapp,
        address: document.getElementById('info_address')?.value.trim() || fullData.hotelInfo.address,
        heroSubtitle: document.getElementById('info_hero_sub')?.value.trim() || fullData.hotelInfo.heroSubtitle,
        heroDesc: document.getElementById('info_hero_desc')?.value.trim() || fullData.hotelInfo.heroDesc
      };
    }

    window.saveSalaData(fullData);

    // Trigger custom event for real-time sync across tabs/modals
    window.dispatchEvent(new CustomEvent('salaDataUpdated'));

    showToast('Đã lưu và đồng bộ dữ liệu phòng thành công!', 'success');
  }

  document.getElementById('adminSaveSingleRoomBtn')?.addEventListener('click', saveAllDataToStorage);
  document.getElementById('saveAllBtn')?.addEventListener('click', saveAllDataToStorage);

  // EXPORT JSON
  document.getElementById('exportJsonBtn')?.addEventListener('click', () => {
    saveCurrentRoomFormToState();
    const data = window.getSalaData();
    data.rooms = roomDataState;

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

  // IMPORT JSON
  const importJsonBtn = document.getElementById('importJsonBtn');
  const importFileInput = document.getElementById('importFileInput');

  importJsonBtn?.addEventListener('click', () => importFileInput?.click());

  importFileInput?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target.result);
        window.saveSalaData(importedData);
        loadDataIntoForms();
        showToast('Tải dữ liệu từ file JSON lên thành công!', 'success');
      } catch(err) {
        showToast('Lỗi đọc file JSON: ' + err.message, 'error');
      }
    };
    reader.readAsText(file);
    importFileInput.value = '';
  });

  // RESET DEFAULTS
  document.getElementById('resetDefaultsBtn')?.addEventListener('click', () => {
    if (confirm('Bạn có chắc chắn muốn khôi phục dữ liệu về mặc định ban đầu không? Tất cả chỉnh sửa chưa xuất file sẽ bị xóa.')) {
      window.resetSalaData();
      loadDataIntoForms();
      showToast('Đã khôi phục dữ liệu mặc định thành công!', 'info');
    }
  });

  // GITHUB PAT TOKEN MANAGEMENT & AUTOMATIC REST API PUSH
  const ghTokenInput = document.getElementById('admin_gh_token_input');
  const saveGhTokenBtn = document.getElementById('saveGhTokenBtn');
  const testGhTokenBtn = document.getElementById('testGhTokenBtn');
  const adminSyncGithubBtn = document.getElementById('adminSyncGithubBtn');

  const REPO_OWNER = 'kechinhphat20031102-cloud';
  const REPO_NAME = 'sala-tam-coc-hotel';

  if (ghTokenInput) {
    ghTokenInput.value = localStorage.getItem('sala_gh_token') || '';
  }

  saveGhTokenBtn?.addEventListener('click', () => {
    const token = ghTokenInput?.value.trim();
    if (token) {
      localStorage.setItem('sala_gh_token', token);
      showToast('Đã lưu GitHub Personal Access Token thành công!', 'success');
    } else {
      localStorage.removeItem('sala_gh_token');
      showToast('Đã xóa Token GitHub khỏi trình duyệt', 'info');
    }
  });

  function getGhAuthHeader(token) {
    if (!token) return {};
    return { 'Authorization': token.startsWith('github_pat_') ? `Bearer ${token}` : `token ${token}` };
  }

  testGhTokenBtn?.addEventListener('click', async () => {
    const token = ghTokenInput?.value.trim() || localStorage.getItem('sala_gh_token');
    if (!token) {
      showToast('Vui lòng nhập GitHub Token (PAT) để thử kết nối!', 'error');
      return;
    }

    try {
      showToast('Đang kiểm tra kết nối với GitHub API...', 'info');
      const res = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`, {
        headers: {
          ...getGhAuthHeader(token),
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (res.ok) {
        showToast('✅ Kết nối GitHub Repository thành công!', 'success');
      } else {
        const errData = await res.json().catch(() => ({}));
        showToast(`❌ Lỗi kết nối GitHub (${res.status}): ${errData.message || 'Token không hợp lệ hoặc thiếu quyền repo'}`, 'error');
      }
    } catch(err) {
      showToast('Lỗi mạng khi gọi GitHub API: ' + err.message, 'error');
    }
  });

  async function pushDataToGithub() {
    saveCurrentRoomFormToState();

    let token = localStorage.getItem('sala_gh_token') || ghTokenInput?.value.trim();
    if (!token) {
      token = prompt('Vui lòng nhập GitHub Personal Access Token (PAT) để đẩy trực tiếp dữ liệu mới lên GitHub:');
      if (token && token.trim()) {
        token = token.trim();
        localStorage.setItem('sala_gh_token', token);
        if (ghTokenInput) ghTokenInput.value = token;
      } else {
        showToast('Chưa nhập Token GitHub. Không thể đẩy dữ liệu tự động.', 'error');
        return;
      }
    }

    try {
      // 1. Scan for any base64 images that need to be uploaded as real files to GitHub
      const pendingUploads = [];
      Object.keys(roomDataState).forEach(rKey => {
        const r = roomDataState[rKey];
        if (r && Array.isArray(r.photos)) {
          r.photos.forEach((photo, pIdx) => {
            if (typeof photo === 'string' && photo.startsWith('data:image/')) {
              pendingUploads.push({ roomKey: rKey, pIdx, dataUrl: photo });
            }
          });
        }
      });

      if (pendingUploads.length > 0) {
        showToast(`Đang tải lên ${pendingUploads.length} ảnh mới vào thư mục assets/images/rooms trên GitHub...`, 'info');
        for (let i = 0; i < pendingUploads.length; i++) {
          const item = pendingUploads[i];
          const match = item.dataUrl.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
          if (!match) continue;

          let ext = match[1].toLowerCase();
          if (ext === 'jpeg') ext = 'jpg';
          const base64Data = match[2];
          const safeKey = item.roomKey.replace(/[^a-zA-Z0-9_-]/g, '_');
          const filename = `${safeKey}_${Date.now()}_${i + 1}.${ext}`;
          const uploadPath = `assets/images/rooms/${filename}`;

          showToast(`Đang tải ảnh ${i + 1}/${pendingUploads.length} lên GitHub (${filename})...`, 'info');

          const uploadRes = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${uploadPath}`, {
            method: 'PUT',
            headers: {
              ...getGhAuthHeader(token),
              'Accept': 'application/vnd.github.v3+json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              message: `Upload room image ${filename} from Admin`,
              content: base64Data
            })
          });

          if (!uploadRes.ok) {
            const errData = await uploadRes.json().catch(() => ({}));
            throw new Error(`Lỗi tải tệp ảnh ${filename} lên GitHub (${uploadRes.status}): ${errData.message || 'Không có quyền ghi'}`);
          }

          // Successfully uploaded: update path in roomDataState
          roomDataState[item.roomKey].photos[item.pIdx] = uploadPath;
          if (item.pIdx === 0) {
            roomDataState[item.roomKey].cover = uploadPath;
          }
        }

        showToast('Đã tải toàn bộ tệp ảnh mới vào kho lưu trữ GitHub thành công!', 'success');
        renderPhotoGalleryGrid();
      }

      // 2. Save clean data to localStorage (now contains only clean string paths)
      saveAllDataToStorage();

      showToast('🚀 Đang cập nhật dữ liệu cấu hình phòng lên GitHub...', 'info');

      // 3. Build admin-data.js content
      const fullData = window.getSalaData();
      fullData.rooms = roomDataState;

      const jsContent = `/**
 * SALA TAM COC HOTEL & SPA - ADMIN DATA CONTROLLER & SYNC MODULE
 * Auto-synced from Admin Dashboard
 */

const DEFAULT_SALA_DATA = ${JSON.stringify(fullData, null, 2)};

function sanitizeSalaData(inputData) {
  if (!inputData || typeof inputData !== 'object') return DEFAULT_SALA_DATA;
  const data = JSON.parse(JSON.stringify(inputData));
  if (data.rooms) {
    Object.keys(DEFAULT_SALA_DATA.rooms).forEach(key => {
      const def = DEFAULT_SALA_DATA.rooms[key];
      if (!data.rooms[key]) {
        data.rooms[key] = { ...def };
      } else {
        data.rooms[key] = {
          ...def,
          ...data.rooms[key],
          cover: (Array.isArray(data.rooms[key].photos) && data.rooms[key].photos.length > 0) ? data.rooms[key].photos[0] : (data.rooms[key].cover || def.cover),
          nameFr: data.rooms[key].nameFr || def.nameFr,
          descFr: data.rooms[key].descFr || def.descFr,
          guestsFr: data.rooms[key].guestsFr || def.guestsFr,
          bedsFr: data.rooms[key].bedsFr || def.bedsFr,
          viewFr: data.rooms[key].viewFr || def.viewFr
        };
      }
    });
  }
  return data;
}

window.getSalaData = function() {
  try {
    const custom = localStorage.getItem('sala_custom_data');
    if (custom) {
      const parsed = JSON.parse(custom);
      const sanitized = sanitizeSalaData(parsed);
      return {
        hotelInfo: { ...DEFAULT_SALA_DATA.hotelInfo, ...(sanitized.hotelInfo || {}) },
        rooms: { ...DEFAULT_SALA_DATA.rooms, ...(sanitized.rooms || {}) },
        tours: { ...DEFAULT_SALA_DATA.tours, ...(sanitized.tours || {}) }
      };
    }
  } catch(e) {
    console.error("Error reading custom sala data:", e);
  }
  return DEFAULT_SALA_DATA;
};

window.saveSalaData = function(data) {
  try {
    const sanitized = sanitizeSalaData(data);
    localStorage.setItem('sala_custom_data', JSON.stringify(sanitized));
  } catch(e) {
    console.error("Error saving custom sala data:", e);
  }
};

window.resetSalaData = function() {
  localStorage.removeItem('sala_custom_data');
  return DEFAULT_SALA_DATA;
};
`;

      const filePath = 'assets/js/admin-data.js';
      const getFileRes = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`, {
        headers: {
          ...getGhAuthHeader(token),
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (!getFileRes.ok) {
        if (getFileRes.status === 401 || getFileRes.status === 403) {
          localStorage.removeItem('sala_gh_token');
          if (ghTokenInput) ghTokenInput.value = '';
          alert('❌ GitHub Token của bạn không chính xác hoặc đã hết hạn!\n\nVui lòng tạo Token mới trên GitHub có tích chọn quyền "repo" (Full control of repositories).');
        }
        throw new Error(`Mã lỗi ${getFileRes.status}: Khóa Token GitHub không chính xác hoặc không có quyền ghi!`);
      }

      const fileData = await getFileRes.json();
      const currentSha = fileData.sha;

      // Safe chunked UTF-8 to Base64
      const utf8Bytes = new TextEncoder().encode(jsContent);
      let binaryStr = '';
      const chunkSize = 8192;
      for (let i = 0; i < utf8Bytes.length; i += chunkSize) {
        binaryStr += String.fromCharCode.apply(null, utf8Bytes.subarray(i, i + chunkSize));
      }
      const base64Content = btoa(binaryStr);

      const updateRes = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`, {
        method: 'PUT',
        headers: {
          ...getGhAuthHeader(token),
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: 'Auto-sync room data & photo gallery from Admin Dashboard',
          content: base64Content,
          sha: currentSha
        })
      });

      if (updateRes.ok) {
        renderPhotoGalleryGrid();
        showToast('🎉 ĐÃ ĐẨY DỮ LIỆU & HÌNH ẢNH LÊN GITHUB THÀNH CÔNG! Tất cả máy tính và điện thoại sẽ tự động hiển thị thông tin & ảnh mới sau khoảng 20-30 giây.', 'success');
      } else {
        const errJson = await updateRes.json().catch(() => ({}));
        throw new Error(errJson.message || 'Lỗi cập nhật file lên GitHub');
      }
    } catch(err) {
      showToast('❌ Lỗi đẩy dữ liệu lên GitHub: ' + err.message, 'error');
    }
  }

  adminSyncGithubBtn?.addEventListener('click', pushDataToGithub);
  document.getElementById('adminSaveRoomAndPushGithubBtn')?.addEventListener('click', pushDataToGithub);

  // TOAST NOTIFICATIONS
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
