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
  let activeArticleKey = 'tam-coc-travel-guide-2026';
  let activeArticleLang = 'vi';
  let articlesDataState = {};

  // ==========================================
  // CLOUDINARY CDN CONFIGURATION & UPLOADER
  // ==========================================
  const CLOUDINARY_CONFIG = {
    cloudName: 'n7my6tye',
    uploadPreset: 'sala_upload',
    folder: 'sala_tam_coc'
  };

  async function uploadImageToCloudinary(fileOrDataUrl, subfolder = '') {
    const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`;
    const formData = new FormData();
    formData.append('file', fileOrDataUrl);
    formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);
    const targetFolder = subfolder ? `${CLOUDINARY_CONFIG.folder}/${subfolder}` : CLOUDINARY_CONFIG.folder;
    formData.append('folder', targetFolder);

    const res = await fetch(url, {
      method: 'POST',
      body: formData
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error?.message || `Lỗi tải ảnh lên Cloudinary (${res.status})`);
    }

    const data = await res.json();
    return data.secure_url;
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

      if (targetId === 'tab-analytics' && typeof renderAnalyticsTab === 'function') {
        renderAnalyticsTab();
      }
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

    // 4. Articles (Discover SEO Content)
    articlesDataState = JSON.parse(JSON.stringify(data.articles || {}));
    const artKeys = Object.keys(articlesDataState);
    if (artKeys.length > 0 && !articlesDataState[activeArticleKey]) {
      activeArticleKey = artKeys[0];
    }
    if (typeof renderArticleSelect === 'function') renderArticleSelect();
    if (typeof renderArticleEditForm === 'function') renderArticleEditForm();
    if (typeof renderArticlesTable === 'function') renderArticlesTable();
    if (typeof renderAnalyticsTab === 'function') renderAnalyticsTab();
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

    showToast(`Đang tải ${files.length} ảnh trực tiếp lên Cloudinary CDN...`, 'info');
    const room = roomDataState[activeRoomKey] || {};
    if (!Array.isArray(room.photos)) room.photos = [];

    let count = 0;
    for (let i = 0; i < files.length; i++) {
      try {
        showToast(`Đang tải ảnh ${i + 1}/${files.length} (${files[i].name}) lên Cloudinary...`, 'info');
        let uploadPayload = files[i];
        if (files[i].size > 9 * 1024 * 1024) {
          uploadPayload = await compressImageFile(files[i], 1920, 1440, 0.85);
        }
        const secureUrl = await uploadImageToCloudinary(uploadPayload, 'rooms');
        room.photos.push(secureUrl);
        count++;
      } catch(err) {
        console.error("Cloudinary upload error:", err);
        showToast(`Lỗi khi tải ảnh ${files[i].name}: ${err.message}`, 'error');
      }
    }

    if (room.photos.length > 0 && !room.cover) {
      room.cover = room.photos[0];
    }

    renderPhotoGalleryGrid();
    showToast(`Đã tải thành công ${count} ảnh lên Cloudinary CDN! Không tốn dung lượng GitHub/Vercel.`, 'success');
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
    if (typeof saveCurrentArticleFormToState === 'function') saveCurrentArticleFormToState();

    const fullData = window.getSalaData();
    fullData.rooms = roomDataState;
    fullData.articles = articlesDataState;
    fullData.lastUpdated = Date.now();

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

    showToast('Đã lưu và đồng bộ dữ liệu thành công!', 'success');
  }

  document.getElementById('adminSaveSingleRoomBtn')?.addEventListener('click', saveAllDataToStorage);
  document.getElementById('saveAllBtn')?.addEventListener('click', saveAllDataToStorage);

  // EXPORT JSON
  document.getElementById('exportJsonBtn')?.addEventListener('click', () => {
    saveCurrentRoomFormToState();
    if (typeof saveCurrentArticleFormToState === 'function') saveCurrentArticleFormToState();
    const data = window.getSalaData();
    data.rooms = roomDataState;
    data.articles = articlesDataState;

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

  // ==========================================
  // DISCOVER & SEO ARTICLES CONTROLLER
  // ==========================================

  const articleKeySelect = document.getElementById('adminArticleKeySelect');
  const articleIdInput = document.getElementById('article_id');
  const articleCategorySelect = document.getElementById('article_category');
  const articleDateInput = document.getElementById('article_date');
  const articleReadTimeInput = document.getElementById('article_read_time');
  const articleStatusSelect = document.getElementById('article_status');
  const articleCoverInput = document.getElementById('article_cover');
  const articleCoverPreview = document.getElementById('article_cover_preview');
  const articleCoverPreviewWrap = document.getElementById('article_cover_preview_wrap');
  const articleTitleInput = document.getElementById('article_title');
  const articleDescInput = document.getElementById('article_desc');
  const articleContentInput = document.getElementById('article_content');
  const articleTitleLabel = document.getElementById('article_title_label');
  const articleDescLabel = document.getElementById('article_desc_label');
  const articleContentLabel = document.getElementById('article_content_label');
  const articleActiveLangBadge = document.getElementById('adminArticleActiveLangBadge');
  const adminArticlesTableBody = document.getElementById('adminArticlesTableBody');

  function updateCoverPreview(url) {
    if (url && url.trim()) {
      if (articleCoverPreview) articleCoverPreview.src = url.trim();
      if (articleCoverPreviewWrap) articleCoverPreviewWrap.style.display = 'block';
    } else {
      if (articleCoverPreviewWrap) articleCoverPreviewWrap.style.display = 'none';
    }
  }

  articleCoverInput?.addEventListener('input', (e) => {
    updateCoverPreview(e.target.value);
  });

  const uploadArticleCoverBtn = document.getElementById('admin_btn_upload_article_cover');
  const articleCoverFileInput = document.getElementById('admin_article_cover_file_input');

  uploadArticleCoverBtn?.addEventListener('click', () => articleCoverFileInput?.click());

  articleCoverFileInput?.addEventListener('change', async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      showToast(`Đang tải ảnh bìa "${file.name}" lên Cloudinary CDN...`, 'info');
      let uploadPayload = file;
      if (file.size > 9 * 1024 * 1024) {
        uploadPayload = await compressImageFile(file, 1920, 1440, 0.85);
      }
      const secureUrl = await uploadImageToCloudinary(uploadPayload, 'articles');
      if (articleCoverInput) {
        articleCoverInput.value = secureUrl;
      }
      updateCoverPreview(secureUrl);
      showToast('Đã tải ảnh bìa lên Cloudinary CDN thành công!', 'success');
    } catch (err) {
      console.error("Cloudinary article cover upload error:", err);
      showToast(`Lỗi tải ảnh bìa lên Cloudinary: ${err.message}`, 'error');
    }
    articleCoverFileInput.value = '';
  });

  // ==========================================
  // ARTICLE CONTENT TOOLBAR & CURSOR IMAGE INSERTION
  // ==========================================
  const btnInsertContentImage = document.getElementById('btn_insert_content_image');
  const contentImageFileInput = document.getElementById('content_image_file_input');
  const btnInsertH3 = document.getElementById('btn_insert_h3');
  const btnInsertP = document.getElementById('btn_insert_p');
  const btnInsertTip = document.getElementById('btn_insert_tip');
  const btnTogglePreview = document.getElementById('btn_toggle_preview_content');
  const previewBtnText = document.getElementById('preview_content_btn_text');
  const articleContentLivePreview = document.getElementById('article_content_live_preview');

  let savedCursorPos = null;

  function insertTextAtCursor(textarea, textToInsert) {
    if (!textarea) return;
    const start = textarea.selectionStart !== undefined ? textarea.selectionStart : textarea.value.length;
    const end = textarea.selectionEnd !== undefined ? textarea.selectionEnd : textarea.value.length;
    const original = textarea.value;

    const before = original.substring(0, start);
    const after = original.substring(end);

    const prefix = (before.length > 0 && !before.endsWith('\n\n') && !before.endsWith('\n')) ? '\n\n' : '';
    const suffix = (!after.startsWith('\n\n') && !after.startsWith('\n')) ? '\n\n' : '';

    const fullSnippet = prefix + textToInsert + suffix;
    textarea.value = before + fullSnippet + after;

    const newPos = start + fullSnippet.length;
    textarea.selectionStart = textarea.selectionEnd = newPos;
    textarea.focus();

    saveCurrentArticleFormToState();
  }

  btnInsertContentImage?.addEventListener('click', () => {
    if (articleContentInput) {
      savedCursorPos = {
        start: articleContentInput.selectionStart,
        end: articleContentInput.selectionEnd
      };
    }
    contentImageFileInput?.click();
  });

  contentImageFileInput?.addEventListener('change', async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const defaultCaption = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
    const caption = prompt('Nhập chú thích hiển thị dưới bức ảnh (hoặc để trống):', defaultCaption);

    try {
      showToast(`Đang tải ảnh "${file.name}" lên Cloudinary CDN...`, 'info');
      let uploadPayload = file;
      if (file.size > 9 * 1024 * 1024) {
        uploadPayload = await compressImageFile(file, 1920, 1440, 0.85);
      }
      const secureUrl = await uploadImageToCloudinary(uploadPayload, 'articles');

      const cleanCaption = caption && caption.trim() ? caption.trim() : '';
      const figureHtml = `<figure class="article-image-block" style="margin: 24px 0; text-align: center;">\n  <img src="${secureUrl}" alt="${cleanCaption || 'Hình ảnh bài viết'}" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.25);">\n${cleanCaption ? `  <figcaption style="font-size: 0.88rem; color: #a0a0a0; margin-top: 8px; font-style: italic;">${cleanCaption}</figcaption>\n` : ''}</figure>`;

      if (articleContentInput) {
        if (savedCursorPos) {
          articleContentInput.selectionStart = savedCursorPos.start;
          articleContentInput.selectionEnd = savedCursorPos.end;
        }
        insertTextAtCursor(articleContentInput, figureHtml);
      }

      showToast('Đã chèn ảnh vào đúng vị trí đang trỏ thành công!', 'success');

      if (articleContentLivePreview && articleContentLivePreview.style.display !== 'none') {
        articleContentLivePreview.innerHTML = articleContentInput.value;
      }
    } catch (err) {
      console.error("Insert content image error:", err);
      showToast(`Lỗi khi tải ảnh chèn bài viết: ${err.message}`, 'error');
    }
    contentImageFileInput.value = '';
  });

  btnInsertH3?.addEventListener('click', () => {
    const title = prompt('Nhập tiêu đề mục con (H3):', '1. Khám phá địa điểm...');
    if (title && title.trim()) {
      insertTextAtCursor(articleContentInput, `<h3>${title.trim()}</h3>`);
    }
  });

  btnInsertP?.addEventListener('click', () => {
    insertTextAtCursor(articleContentInput, `<p>Nhập nội dung đoạn văn chi tiết tại đây...</p>`);
  });

  btnInsertTip?.addEventListener('click', () => {
    const tip = prompt('Nhập nội dung lưu ý / mẹo hữu ích:', 'Du khách nên mang giày thể thao và áo khoác mỏng...');
    if (tip && tip.trim()) {
      insertTextAtCursor(articleContentInput, `<div class="article-tip" style="background: rgba(197,168,128,0.1); border-left: 3px solid var(--primary-gold); padding: 12px 16px; margin: 16px 0; border-radius: 4px;"><strong>Lưu ý quan trọng:</strong> ${tip.trim()}</div>`);
    }
  });

  btnTogglePreview?.addEventListener('click', () => {
    if (!articleContentInput || !articleContentLivePreview) return;
    const isShowingPreview = articleContentLivePreview.style.display !== 'none';
    if (isShowingPreview) {
      articleContentLivePreview.style.display = 'none';
      articleContentInput.style.display = 'block';
      if (previewBtnText) previewBtnText.textContent = 'Xem Trước Trực Quan';
      btnTogglePreview.classList.remove('active');
    } else {
      articleContentLivePreview.innerHTML = articleContentInput.value || '<p style="color:#888;">(Chưa có nội dung để xem trước)</p>';
      articleContentLivePreview.style.display = 'block';
      articleContentInput.style.display = 'none';
      if (previewBtnText) previewBtnText.textContent = 'Quay Lại Soạn Thảo';
      btnTogglePreview.classList.add('active');
    }
  });

  function renderArticleSelect() {
    if (!articleKeySelect) return;
    articleKeySelect.innerHTML = '';
    const keys = Object.keys(articlesDataState);
    if (keys.length === 0) {
      const opt = document.createElement('option');
      opt.value = '';
      opt.textContent = '(Chưa có bài viết nào)';
      articleKeySelect.appendChild(opt);
      return;
    }

    keys.forEach((k, idx) => {
      const art = articlesDataState[k] || {};
      const opt = document.createElement('option');
      opt.value = k;
      const isHidden = art.hidden === true || art.status === 'hidden';
      const statusPrefix = isHidden ? ' [ĐÃ ẨN]' : '';
      const title = art.titleVi || art.titleEn || art.titleFr || k;
      opt.textContent = `${idx + 1}. [${art.category || 'guide'}]${statusPrefix} ${title}`;
      if (k === activeArticleKey) opt.selected = true;
      articleKeySelect.appendChild(opt);
    });
  }

  function renderArticleEditForm() {
    const art = articlesDataState[activeArticleKey] || {};
    
    if (articleContentLivePreview) articleContentLivePreview.style.display = 'none';
    if (articleContentInput) articleContentInput.style.display = 'block';
    if (previewBtnText) previewBtnText.textContent = 'Xem Trước Trực Quan';

    if (articleIdInput) {
      articleIdInput.value = activeArticleKey || '';
      articleIdInput.disabled = !!articlesDataState[activeArticleKey];
    }
    if (articleCategorySelect) articleCategorySelect.value = art.category || 'guide';
    if (articleDateInput) articleDateInput.value = art.date || new Date().toISOString().slice(0, 10);
    if (articleReadTimeInput) articleReadTimeInput.value = art.readTime || '5';
    if (articleStatusSelect) {
      const isHidden = art.hidden === true || art.status === 'hidden';
      articleStatusSelect.value = isHidden ? 'hidden' : 'visible';
    }
    if (articleCoverInput) {
      const c = art.cover || art.image || '';
      articleCoverInput.value = c;
      updateCoverPreview(c);
    }

    const langName = activeArticleLang === 'vi' ? 'Tiếng Việt' : (activeArticleLang === 'en' ? 'English' : 'Français');
    if (articleActiveLangBadge) {
      articleActiveLangBadge.textContent = `Đang soạn: ${langName}`;
    }
    if (articleTitleLabel) {
      articleTitleLabel.innerHTML = `<i class="fa-solid fa-heading"></i> Tiêu Đề Bài Viết (${langName}):`;
    }
    if (articleDescLabel) {
      articleDescLabel.innerHTML = `<i class="fa-solid fa-align-left"></i> Tóm Tắt Ngắn / Excerpt (${langName}):`;
    }
    if (articleContentLabel) {
      articleContentLabel.innerHTML = `<i class="fa-solid fa-file-lines"></i> Nội Dung Chi Tiết HTML (${langName}):`;
    }

    if (activeArticleLang === 'vi') {
      if (articleTitleInput) articleTitleInput.value = art.titleVi || '';
      if (articleDescInput) articleDescInput.value = art.descVi || '';
      if (articleContentInput) articleContentInput.value = art.contentVi || '';
    } else if (activeArticleLang === 'en') {
      if (articleTitleInput) articleTitleInput.value = art.titleEn || '';
      if (articleDescInput) articleDescInput.value = art.descEn || '';
      if (articleContentInput) articleContentInput.value = art.contentEn || '';
    } else if (activeArticleLang === 'fr') {
      if (articleTitleInput) articleTitleInput.value = art.titleFr || '';
      if (articleDescInput) articleDescInput.value = art.descFr || '';
      if (articleContentInput) articleContentInput.value = art.contentFr || '';
    }
  }

  function saveCurrentArticleFormToState() {
    if (!activeArticleKey) return;
    if (!articlesDataState[activeArticleKey]) {
      articlesDataState[activeArticleKey] = {};
    }

    const art = articlesDataState[activeArticleKey];
    art.id = activeArticleKey;
    if (articleCategorySelect) art.category = articleCategorySelect.value;
    if (articleDateInput) art.date = articleDateInput.value.trim();
    if (articleReadTimeInput) art.readTime = articleReadTimeInput.value.trim();
    if (articleStatusSelect) {
      const isHidden = articleStatusSelect.value === 'hidden';
      art.hidden = isHidden;
      art.status = isHidden ? 'hidden' : 'visible';
    }
    if (articleCoverInput) art.cover = articleCoverInput.value.trim();

    if (activeArticleLang === 'vi') {
      if (articleTitleInput) art.titleVi = articleTitleInput.value.trim();
      if (articleDescInput) art.descVi = articleDescInput.value.trim();
      if (articleContentInput) art.contentVi = articleContentInput.value.trim();
    } else if (activeArticleLang === 'en') {
      if (articleTitleInput) art.titleEn = articleTitleInput.value.trim();
      if (articleDescInput) art.descEn = articleDescInput.value.trim();
      if (articleContentInput) art.contentEn = articleContentInput.value.trim();
    } else if (activeArticleLang === 'fr') {
      if (articleTitleInput) art.titleFr = articleTitleInput.value.trim();
      if (articleDescInput) art.descFr = articleDescInput.value.trim();
      if (articleContentInput) art.contentFr = articleContentInput.value.trim();
    }
  }

  function renderArticlesTable() {
    if (!adminArticlesTableBody) return;
    adminArticlesTableBody.innerHTML = '';
    const keys = Object.keys(articlesDataState);
    if (keys.length === 0) {
      adminArticlesTableBody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding: 20px; color: #999;">Chưa có bài viết nào</td></tr>';
      return;
    }

    keys.forEach(k => {
      const art = articlesDataState[k] || {};
      const tr = document.createElement('tr');
      tr.style.borderBottom = '1px solid rgba(255,255,255,0.06)';
      tr.style.transition = 'all 0.25s ease';

      const isHidden = art.hidden === true || art.status === 'hidden';
      if (isHidden) {
        tr.style.opacity = '0.65';
        tr.style.background = 'rgba(255, 152, 0, 0.04)';
      }

      const coverSrc = art.cover || art.image || 'https://res.cloudinary.com/n7my6tye/image/upload/v1789287139/sala_tam_coc/%E1%BA%A2nh_Sala_Tam_Coc_Hotel___Spa/B%E1%BB%83_B%C6%A1i_S%C3%A2n_Th%C6%B0%E1%BB%A3ng___T%C3%B2a_Nh%C3%A0/wdsbvbpgapecc8kasvtp.jpg';
      const titleVi = art.titleVi || '(Chưa có tiêu đề tiếng Việt)';
      const titleEn = art.titleEn || '(No English title)';

      tr.innerHTML = `
        <td style="padding: 10px;">
          <img src="${coverSrc}" alt="${k}" style="width: 60px; height: 42px; object-fit: cover; border-radius: 4px; ${isHidden ? 'filter: grayscale(40%);' : ''}">
        </td>
        <td style="padding: 10px;">
          <strong style="color: #fff;">${titleVi}</strong><br>
          <small style="color: #aaa;">${titleEn}</small>
        </td>
        <td style="padding: 10px;">
          <span style="background: rgba(197,168,128,0.2); color: var(--primary-gold); padding: 3px 8px; border-radius: 12px; font-size: 0.75rem; text-transform: uppercase;">${art.category || 'guide'}</span>
        </td>
        <td style="padding: 10px; text-align: center; white-space: nowrap;">
          ${isHidden
            ? '<span style="background: rgba(255,152,0,0.18); color: #ffa726; border: 1px solid rgba(255,152,0,0.4); padding: 4px 10px; border-radius: 12px; font-size: 0.78rem; font-weight: 700; display: inline-flex; align-items: center; gap: 5px;"><i class="fa-solid fa-eye-slash"></i> Đã Ẩn</span>'
            : '<span style="background: rgba(76,175,80,0.18); color: #81c784; border: 1px solid rgba(76,175,80,0.4); padding: 4px 10px; border-radius: 12px; font-size: 0.78rem; font-weight: 700; display: inline-flex; align-items: center; gap: 5px;"><i class="fa-solid fa-eye"></i> Đang Hiện</span>'
          }
        </td>
        <td style="padding: 10px; color: #aaa; white-space: nowrap;">${art.date || ''}</td>
        <td style="padding: 10px; text-align: center; white-space: nowrap;">
          <button type="button" class="btn btn-outline-gold btn-sm edit-art-btn" data-key="${k}" style="margin-right: 6px;"><i class="fa-solid fa-pen"></i> Sửa</button>
          <button type="button" class="btn btn-sm toggle-art-btn" data-key="${k}" title="${isHidden ? 'Hiện bài viết này lên website' : 'Tạm ẩn bài viết khỏi độc giả'}" style="margin-right: 6px; ${isHidden ? 'background: rgba(76,175,80,0.18); color: #81c784; border: 1px solid rgba(76,175,80,0.45);' : 'background: rgba(255,152,0,0.18); color: #ffa726; border: 1px solid rgba(255,152,0,0.45);'}; font-weight: 600; cursor: pointer; transition: all 0.2s;">
            <i class="fa-solid ${isHidden ? 'fa-eye' : 'fa-eye-slash'}"></i> ${isHidden ? 'Hiện' : 'Ẩn'}
          </button>
          <button type="button" class="btn btn-outline-white btn-sm del-art-btn" data-key="${k}" style="color: #ff8a80; border-color: #ff8a80;" title="Xóa bài viết"><i class="fa-solid fa-trash"></i></button>
        </td>
      `;
      adminArticlesTableBody.appendChild(tr);
    });

    adminArticlesTableBody.querySelectorAll('.edit-art-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        saveCurrentArticleFormToState();
        activeArticleKey = btn.getAttribute('data-key');
        renderArticleSelect();
        renderArticleEditForm();
        window.scrollTo({ top: document.getElementById('adminArticleKeySelect').offsetTop - 100, behavior: 'smooth' });
      });
    });

    adminArticlesTableBody.querySelectorAll('.toggle-art-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const k = btn.getAttribute('data-key');
        if (!k || !articlesDataState[k]) return;
        saveCurrentArticleFormToState();
        const currentlyHidden = articlesDataState[k].hidden === true || articlesDataState[k].status === 'hidden';
        articlesDataState[k].hidden = !currentlyHidden;
        articlesDataState[k].status = articlesDataState[k].hidden ? 'hidden' : 'visible';
        
        if (k === activeArticleKey && articleStatusSelect) {
          articleStatusSelect.value = articlesDataState[k].hidden ? 'hidden' : 'visible';
        }

        renderArticleSelect();
        renderArticlesTable();
        saveAllDataToStorage();

        const artTitle = articlesDataState[k].titleVi || k;
        if (articlesDataState[k].hidden) {
          showToast(`Đã ẩn bài viết "${artTitle}" khỏi người xem!`, 'info');
        } else {
          showToast(`Đã kích hoạt hiển thị công khai bài viết "${artTitle}"!`, 'success');
        }
      });
    });

    adminArticlesTableBody.querySelectorAll('.del-art-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const k = btn.getAttribute('data-key');
        deleteArticleByKey(k);
      });
    });
  }

  function deleteArticleByKey(k) {
    if (!k || !articlesDataState[k]) return;
    if (confirm(`Bạn có chắc chắn muốn xóa bài viết "${articlesDataState[k].titleVi || k}" không?`)) {
      delete articlesDataState[k];
      const remaining = Object.keys(articlesDataState);
      activeArticleKey = remaining.length > 0 ? remaining[0] : '';
      renderArticleSelect();
      renderArticleEditForm();
      renderArticlesTable();
      saveAllDataToStorage();
      showToast('Đã xóa bài viết thành công!', 'info');
    }
  }

  // Article Lang Switch
  const articleLangBtns = document.querySelectorAll('.admin-article-lang-btn');
  articleLangBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      saveCurrentArticleFormToState();
      articleLangBtns.forEach(b => {
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

      activeArticleLang = btn.getAttribute('data-lang') || 'vi';
      renderArticleEditForm();
    });
  });

  // Article Key Select
  articleKeySelect?.addEventListener('change', () => {
    saveCurrentArticleFormToState();
    activeArticleKey = articleKeySelect.value;
    renderArticleEditForm();
  });

  // Add new article button
  document.getElementById('adminAddNewArticleBtn')?.addEventListener('click', () => {
    saveCurrentArticleFormToState();
    const titlePrompt = prompt('Nhập tiêu đề bài viết mới (Tiếng Việt):');
    if (!titlePrompt || !titlePrompt.trim()) return;

    // Generate slug from title
    const slug = titlePrompt.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') + '-' + Date.now().toString().slice(-4);

    articlesDataState[slug] = {
      id: slug,
      category: 'guide',
      date: new Date().toISOString().slice(0, 10),
      readTime: '5',
      cover: 'https://res.cloudinary.com/n7my6tye/image/upload/v1789287139/sala_tam_coc/%E1%BA%A2nh_Sala_Tam_Coc_Hotel___Spa/B%E1%BB%83_B%C6%A1i_S%C3%A2n_Th%C6%B0%E1%BB%A3ng___T%C3%B2a_Nh%C3%A0/wdsbvbpgapecc8kasvtp.jpg',
      titleVi: titlePrompt.trim(),
      descVi: titlePrompt.trim() + ' - Cẩm nang chi tiết từ Sala Tam Cốc Hotel & Spa.',
      contentVi: '<h3>1. Giới thiệu</h3><p>Nội dung bài viết mới...</p>',
      titleEn: titlePrompt.trim(),
      descEn: 'Travel guide by Sala Tam Coc Hotel & Spa.',
      contentEn: '<h3>1. Overview</h3><p>Article content in English...</p>',
      titleFr: titlePrompt.trim(),
      descFr: 'Guide de voyage par Sala Tam Coc Hotel & Spa.',
      contentFr: '<h3>1. Introduction</h3><p>Contenu en français...</p>',
      hidden: false,
      status: 'visible'
    };

    activeArticleKey = slug;
    renderArticleSelect();
    renderArticleEditForm();
    renderArticlesTable();
    saveAllDataToStorage();
    showToast('Đã tạo bài viết mới! Vui lòng hoàn thiện nội dung và lưu lại.', 'success');
  });

  // Save single article button
  document.getElementById('saveArticleBtn')?.addEventListener('click', () => {
    saveCurrentArticleFormToState();
    renderArticleSelect();
    renderArticlesTable();
    saveAllDataToStorage();
    showToast('Đã cập nhật bài viết vào bộ nhớ!', 'success');
  });

  // Delete article button
  document.getElementById('deleteArticleBtn')?.addEventListener('click', () => {
    deleteArticleByKey(activeArticleKey);
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
    if (typeof saveCurrentArticleFormToState === 'function') saveCurrentArticleFormToState();

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
      // 1. Scan for any base64 images that need to be uploaded to Cloudinary CDN
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
        showToast(`Đang tải lên ${pendingUploads.length} ảnh mới lên Cloudinary CDN...`, 'info');
        for (let i = 0; i < pendingUploads.length; i++) {
          const item = pendingUploads[i];
          showToast(`Đang tải ảnh ${i + 1}/${pendingUploads.length} lên Cloudinary...`, 'info');
          const secureUrl = await uploadImageToCloudinary(item.dataUrl, 'rooms');
          roomDataState[item.roomKey].photos[item.pIdx] = secureUrl;
          if (item.pIdx === 0) {
            roomDataState[item.roomKey].cover = secureUrl;
          }
        }
        showToast('Đã tải toàn bộ ảnh mới lên Cloudinary CDN thành công!', 'success');
        renderPhotoGalleryGrid();
      }

      // 2. Save clean data to localStorage (now contains only clean string paths)
      saveAllDataToStorage();

      showToast('🚀 Đang cập nhật dữ liệu cấu hình phòng lên GitHub...', 'info');

      // 3. Build admin-data.js content
      const fullData = window.getSalaData();
      fullData.rooms = roomDataState;
      fullData.articles = articlesDataState;
      fullData.lastUpdated = Date.now();

      const jsContent = `/**
 * SALA TAM COC HOTEL & SPA - ADMIN DATA CONTROLLER & SYNC MODULE
 * Auto-synced from Admin Dashboard
 */

const DEFAULT_SALA_DATA = ${JSON.stringify(fullData, null, 2)};

function sanitizeSalaData(inputData) {
  if (!inputData || typeof inputData !== 'object') return DEFAULT_SALA_DATA;
  const data = JSON.parse(JSON.stringify(inputData));
  if (!data.articles && DEFAULT_SALA_DATA.articles) {
    data.articles = { ...DEFAULT_SALA_DATA.articles };
  }
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
      const defTime = (DEFAULT_SALA_DATA && DEFAULT_SALA_DATA.lastUpdated) || 0;
      const customTime = (parsed && parsed.lastUpdated) || 0;
      const isAdminPage = window.location.pathname.endsWith('admin.html') || window.location.href.includes('admin.html');

      // If GitHub data is newer or local storage has no valid timestamp, purge stale local data!
      if (defTime > customTime || !customTime) {
        localStorage.removeItem('sala_custom_data');
        return DEFAULT_SALA_DATA;
      }

      // On non-admin pages, unless local is explicitly newer (admin previewing draft), prioritize DEFAULT_SALA_DATA
      if (!isAdminPage && customTime <= defTime) {
        return DEFAULT_SALA_DATA;
      }

      const sanitized = sanitizeSalaData(parsed);
      return {
        hotelInfo: { ...DEFAULT_SALA_DATA.hotelInfo, ...(sanitized.hotelInfo || {}) },
        rooms: { ...DEFAULT_SALA_DATA.rooms, ...(sanitized.rooms || {}) },
        tours: { ...DEFAULT_SALA_DATA.tours, ...(sanitized.tours || {}) },
        articles: { ...DEFAULT_SALA_DATA.articles, ...(sanitized.articles || {}) }
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
  document.getElementById('adminSaveArticleAndPushGithubBtn')?.addEventListener('click', pushDataToGithub);

  // =========================================================================
  // PHÂN HỆ THỐNG KÊ TRUY CẬP & QUẢN LÝ YÊU CẦU TƯ VẤN (ANALYTICS & LEADS)
  // =========================================================================
  
  function renderAnalyticsTab() {
    if (!window.SalaTracker) return;
    const analytics = window.SalaTracker.getAnalytics();
    const inquiries = window.SalaTracker.getInquiries();

    // 1. Cập nhật thẻ KPI
    const totalViewsEl = document.getElementById('kpiTotalViews');
    const totalVisitorsEl = document.getElementById('kpiTotalVisitors');
    const todayViewsEl = document.getElementById('kpiTodayViews');
    const todayVisitorsEl = document.getElementById('kpiTodayVisitors');
    const pendingLeadsEl = document.getElementById('kpiPendingLeads');
    const badgeEl = document.getElementById('leadsPendingBadge');

    const fmt = num => new Intl.NumberFormat('vi-VN').format(num || 0);

    if (totalViewsEl) totalViewsEl.textContent = fmt(analytics.totalPageviews);
    if (totalVisitorsEl) totalVisitorsEl.textContent = fmt(analytics.totalVisitors);

    const todayObj = (analytics.daily && analytics.daily.length > 0) ? analytics.daily[analytics.daily.length - 1] : { pageviews: 0, visitors: 0 };
    if (todayViewsEl) todayViewsEl.textContent = fmt(todayObj.pageviews);
    if (todayVisitorsEl) {
      todayVisitorsEl.innerHTML = `<i class="fa-solid fa-clock"></i> Từ ${fmt(todayObj.visitors)} khách ghé thăm`;
    }

    // Đơn chờ tư vấn
    const pendingCount = inquiries.filter(x => x.status === 'pending').length;
    if (pendingLeadsEl) pendingLeadsEl.textContent = `${pendingCount} đơn mới`;
    if (badgeEl) {
      badgeEl.textContent = pendingCount;
      if (pendingCount > 0) {
        badgeEl.classList.remove('empty');
      } else {
        badgeEl.classList.add('empty');
      }
    }

    // 2. Vẽ Biểu đồ xu hướng
    const rangeSelect = document.getElementById('chartTimeRangeSelect');
    const selectedRange = rangeSelect ? rangeSelect.value : '7d';
    renderTrendChart(selectedRange, analytics);

    // 3. Render Top URLs
    renderTopUrls(analytics.urls || {});

    // 4. Render Bảng danh sách đơn tư vấn
    renderInquiriesTable();
  }

  // Vẽ biểu đồ xu hướng truy cập theo các lựa chọn:
  // 'today' (Hôm nay), '7d' (7 ngày gần nhất), '30d' (30 ngày gần nhất), '3m' (3 tháng gần nhất), '9m' (9 tháng gần nhất)
  function renderTrendChart(range, analytics) {
    const chartBox = document.getElementById('trendChartContainer');
    const avgInfoEl = document.getElementById('chartAverageInfo');
    const subTitleEl = document.getElementById('chartSubTitle');
    if (!chartBox) return;

    if (!analytics) {
      if (window.SalaTracker) analytics = window.SalaTracker.getAnalytics();
      else return;
    }

    const dailyData = analytics.daily || [];
    const monthlyData = analytics.monthly || {};
    const today = new Date();
    const fmt = num => new Intl.NumberFormat('vi-VN').format(num || 0);

    let items = [];
    let subTitleText = '(Lượt xem theo ngày)';
    let avgSummaryText = '';
    let boxGap = '14px';
    let barMaxWidth = '42px';
    let isCompact = false;

    const getFormatDate = d => {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${y}-${m}-${day}`;
    };

    const todayStr = getFormatDate(today);

    if (range === 'today') {
      subTitleText = `(Lượt xem theo khung giờ hôm nay – ${today.toLocaleDateString('vi-VN')})`;
      boxGap = '14px';
      barMaxWidth = '48px';

      const todayEntry = dailyData.find(d => d.date === todayStr) || { pageviews: 0, visitors: 0, hourly: {} };
      const hourly = todayEntry.hourly || {};
      const curHour = today.getHours();

      const slots = [
        { label: '0h - 4h', sub: 'Đêm', hours: [0, 1, 2, 3] },
        { label: '4h - 8h', sub: 'Sáng sớm', hours: [4, 5, 6, 7] },
        { label: '8h - 12h', sub: 'Buổi sáng', hours: [8, 9, 10, 11] },
        { label: '12h - 16h', sub: 'Buổi chiều', hours: [12, 13, 14, 15] },
        { label: '16h - 20h', sub: 'Chiều tối', hours: [16, 17, 18, 19] },
        { label: '20h - 24h', sub: 'Đêm tối', hours: [20, 21, 22, 23] }
      ];

      slots.forEach(slot => {
        const slotViews = slot.hours.reduce((sum, h) => sum + (hourly[h] || 0), 0);
        const isCurrentSlot = slot.hours.includes(curHour);
        items.push({
          label: slot.label,
          subLabel: isCurrentSlot ? `${slot.sub} (Nay)` : slot.sub,
          views: slotViews,
          visitors: isCurrentSlot ? todayEntry.visitors || 0 : 0,
          isHighlight: isCurrentSlot,
          tooltip: `<strong>${fmt(slotViews)}</strong> lượt xem<br><span style="color:#aaa;">Khung ${slot.label} (${slot.sub})</span>`
        });
      });

      avgSummaryText = `Tổng hôm nay: ${fmt(todayEntry.pageviews)} lượt xem • ${fmt(todayEntry.visitors)} khách ghé thăm`;

    } else if (range === '30d') {
      subTitleText = '(Lượt xem theo ngày – 30 ngày gần nhất)';
      boxGap = '4px';
      barMaxWidth = '16px';
      isCompact = true;

      for (let i = 29; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const dStr = getFormatDate(d);
        const isToday = (i === 0);
        const entry = dailyData.find(x => x.date === dStr) || { pageviews: 0, visitors: 0 };
        const dayViews = entry.pageviews || 0;
        const dayVisitors = entry.visitors || 0;

        const showLabel = (i === 29 || i === 22 || i === 15 || i === 8 || i === 0);
        const dateLabel = `${d.getDate()}/${d.getMonth() + 1}`;

        items.push({
          label: showLabel ? (isToday ? 'Nay' : dateLabel) : '•',
          subLabel: '',
          views: dayViews,
          visitors: dayVisitors,
          isHighlight: isToday,
          tooltip: `<strong>${fmt(dayViews)}</strong> lượt xem<br><span style="color:#aaa;">${fmt(dayVisitors)} khách (${d.toLocaleDateString('vi-VN')})</span>`
        });
      }

      const totalViews = items.reduce((sum, it) => sum + it.views, 0);
      const avgViews = Math.round(totalViews / 30);
      avgSummaryText = `Trung bình: ~${fmt(avgViews)} lượt/ngày • Tổng 30 ngày: ${fmt(totalViews)} lượt`;

    } else if (range === '3m') {
      subTitleText = '(Lượt xem theo tháng – 3 tháng gần nhất)';
      boxGap = '26px';
      barMaxWidth = '68px';

      for (let i = 2; i >= 0; i--) {
        const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
        const y = d.getFullYear();
        const m = d.getMonth() + 1;
        const mKey = `${y}-${String(m).padStart(2, '0')}`;
        const isCurrentMonth = (i === 0);

        const mDailies = dailyData.filter(x => x.date && x.date.startsWith(mKey));
        const dailyViews = mDailies.reduce((s, x) => s + (x.pageviews || 0), 0);
        const dailyVisitors = mDailies.reduce((s, x) => s + (x.visitors || 0), 0);
        const storedM = monthlyData[mKey] || { pageviews: 0, visitors: 0 };
        const views = Math.max(dailyViews, storedM.pageviews || 0);
        const visitors = Math.max(dailyVisitors, storedM.visitors || 0);

        items.push({
          label: `Tháng ${m}`,
          subLabel: isCurrentMonth ? `${y} (Nay)` : `${y}`,
          views: views,
          visitors: visitors,
          isHighlight: isCurrentMonth,
          tooltip: `<strong>${fmt(views)}</strong> lượt xem<br><span style="color:#aaa;">${fmt(visitors)} khách (Tháng ${m}/${y})</span>`
        });
      }

      const totalViews = items.reduce((sum, it) => sum + it.views, 0);
      const avgViews = Math.round(totalViews / 3);
      avgSummaryText = `Trung bình: ~${fmt(avgViews)} lượt/tháng • Tổng 3 tháng: ${fmt(totalViews)} lượt`;

    } else if (range === '9m') {
      subTitleText = '(Lượt xem theo tháng – 9 tháng gần nhất)';
      boxGap = '10px';
      barMaxWidth = '38px';

      for (let i = 8; i >= 0; i--) {
        const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
        const y = d.getFullYear();
        const m = d.getMonth() + 1;
        const mKey = `${y}-${String(m).padStart(2, '0')}`;
        const isCurrentMonth = (i === 0);

        const mDailies = dailyData.filter(x => x.date && x.date.startsWith(mKey));
        const dailyViews = mDailies.reduce((s, x) => s + (x.pageviews || 0), 0);
        const dailyVisitors = mDailies.reduce((s, x) => s + (x.visitors || 0), 0);
        const storedM = monthlyData[mKey] || { pageviews: 0, visitors: 0 };
        const views = Math.max(dailyViews, storedM.pageviews || 0);
        const visitors = Math.max(dailyVisitors, storedM.visitors || 0);

        items.push({
          label: `Thg ${m}`,
          subLabel: isCurrentMonth ? `${y} (Nay)` : `${y}`,
          views: views,
          visitors: visitors,
          isHighlight: isCurrentMonth,
          tooltip: `<strong>${fmt(views)}</strong> lượt xem<br><span style="color:#aaa;">${fmt(visitors)} khách (Tháng ${m}/${y})</span>`
        });
      }

      const totalViews = items.reduce((sum, it) => sum + it.views, 0);
      const avgViews = Math.round(totalViews / 9);
      avgSummaryText = `Trung bình: ~${fmt(avgViews)} lượt/tháng • Tổng 9 tháng: ${fmt(totalViews)} lượt`;

    } else {
      // Mặc định: '7d' (7 ngày gần nhất)
      subTitleText = '(Lượt xem theo ngày – 7 ngày gần nhất)';
      boxGap = '14px';
      barMaxWidth = '42px';

      const dayLabels = ['CN', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

      for (let i = 6; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const dStr = getFormatDate(d);
        const isToday = (i === 0);
        const dayName = isToday ? 'Hôm nay' : (dayLabels[d.getDay()] || dStr);
        const shortDate = `${d.getDate()}/${d.getMonth() + 1}`;
        const entry = dailyData.find(x => x.date === dStr) || { pageviews: 0, visitors: 0 };
        const dayViews = entry.pageviews || 0;
        const dayVisitors = entry.visitors || 0;

        items.push({
          label: dayName,
          subLabel: shortDate,
          views: dayViews,
          visitors: dayVisitors,
          isHighlight: isToday,
          tooltip: `<strong>${fmt(dayViews)}</strong> lượt xem<br><span style="color:#aaa;">${fmt(dayVisitors)} khách (${shortDate})</span>`
        });
      }

      const totalViews = items.reduce((sum, it) => sum + it.views, 0);
      const avgViews = Math.round(totalViews / 7);
      avgSummaryText = `Trung bình: ~${fmt(avgViews)} lượt/ngày • Tổng 7 ngày: ${fmt(totalViews)} lượt`;
    }

    if (subTitleEl) subTitleEl.textContent = subTitleText;
    if (avgInfoEl) avgInfoEl.textContent = avgSummaryText;

    chartBox.style.gap = boxGap;

    const maxViews = Math.max(...items.map(it => it.views), 10);

    let html = '';
    items.forEach(item => {
      const heightPercent = item.views > 0 ? Math.max(14, Math.round((item.views / maxViews) * 100)) : 3;
      const isZero = item.views === 0;
      const fillStyle = isZero
        ? 'background: rgba(197, 168, 128, 0.15);'
        : (item.isHighlight ? 'background: linear-gradient(180deg, #ffd54f 0%, #d4af37 100%); box-shadow: 0 0 10px rgba(212,175,55,0.4);' : '');

      html += `
        <div class="chart-col" style="${isCompact ? 'padding: 0 1px;' : ''}">
          <div class="bar-container" style="max-width: ${barMaxWidth};">
            <div class="bar-fill" style="height: ${heightPercent}%; ${fillStyle}">
              <div class="bar-tooltip">
                ${item.tooltip}
              </div>
            </div>
          </div>
          <div class="bar-label" style="${item.isHighlight ? 'color: var(--primary-gold); font-weight: 700;' : ''}; ${isCompact ? 'font-size: 0.7rem; margin-top: 4px;' : ''}">
            ${item.label}
            ${item.subLabel ? `<div class="bar-date">${item.subLabel}</div>` : ''}
          </div>
        </div>
      `;
    });

    chartBox.innerHTML = html;
  }

  // Render danh sách Top URLs
  function renderTopUrls(urlsMap) {
    const container = document.getElementById('topUrlsContainer');
    if (!container) return;

    const list = Object.entries(urlsMap).map(([url, val]) => ({
      url: url,
      title: val.title || url,
      count: val.count || 0
    })).filter(x => x.count > 0);

    list.sort((a, b) => b.count - a.count);

    if (list.length === 0) {
      container.innerHTML = `
        <div style="color: #888; padding: 40px 20px; text-align: center;">
          <i class="fa-solid fa-chart-simple" style="font-size: 2.2rem; margin-bottom: 12px; display: block; color: rgba(197,168,128,0.25);"></i>
          Chưa có trang nào được xem.<br><span style="font-size: 0.8rem; color: #666;">Khi có khách ghé thăm các trang trên web, bảng xếp hạng Top URL sẽ tự động xuất hiện tại đây.</span>
        </div>
      `;
      return;
    }

    const maxCount = Math.max(...list.map(x => x.count), 1);
    const totalViews = list.reduce((sum, x) => sum + x.count, 0) || 1;

    let html = '';
    list.slice(0, 10).forEach((item, index) => {
      const rank = index + 1;
      const rankClass = rank === 1 ? 'rank-1' : rank === 2 ? 'rank-2' : rank === 3 ? 'rank-3' : '';
      const percent = Math.round((item.count / maxCount) * 100);
      const trafficShare = Math.round((item.count / totalViews) * 100);

      html += `
        <div class="url-item">
          <div class="url-header">
            <span class="url-rank-badge ${rankClass}">#${rank}</span>
            <a href="${item.url}" target="_blank" class="url-title-link" title="${item.title}">
              ${item.title}
            </a>
            <span class="url-count-tag">${item.count} lượt <span style="font-size: 0.72rem; color: #888; font-weight: normal;">(${trafficShare}%)</span></span>
          </div>
          <div style="font-size: 0.75rem; color: #777; margin-bottom: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
            <i class="fa-solid fa-link" style="font-size: 0.68rem;"></i> ${item.url}
          </div>
          <div class="url-bar-track">
            <div class="url-bar-fill" style="width: ${percent}%;"></div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  // Render bảng danh sách đơn tư vấn phòng
  function renderInquiriesTable() {
    const tableBody = document.getElementById('leadsTableBody');
    const countEl = document.getElementById('leadsCountText');
    if (!tableBody || !window.SalaTracker) return;

    let inquiries = window.SalaTracker.getInquiries() || [];

    const searchKeyword = (document.getElementById('leadSearchInput')?.value || '').trim().toLowerCase();
    const statusFilter = document.getElementById('leadStatusFilter')?.value || 'all';
    const roomFilter = document.getElementById('leadRoomFilter')?.value || 'all';

    // Lọc theo từ khóa
    if (searchKeyword) {
      inquiries = inquiries.filter(item => {
        return (
          (item.customer_name && item.customer_name.toLowerCase().includes(searchKeyword)) ||
          (item.customer_phone && item.customer_phone.includes(searchKeyword)) ||
          (item.id && item.id.toLowerCase().includes(searchKeyword)) ||
          (item.room_name && item.room_name.toLowerCase().includes(searchKeyword)) ||
          (item.note && item.note.toLowerCase().includes(searchKeyword))
        );
      });
    }

    // Lọc theo trạng thái
    if (statusFilter !== 'all') {
      inquiries = inquiries.filter(item => item.status === statusFilter);
    }

    // Lọc theo hạng phòng
    if (roomFilter !== 'all') {
      inquiries = inquiries.filter(item => item.room_key === roomFilter);
    }

    const totalRaw = (window.SalaTracker.getInquiries() || []).length;
    if (countEl) {
      countEl.textContent = `(Hiển thị ${inquiries.length} / ${totalRaw} yêu cầu)`;
    }

    if (inquiries.length === 0) {
      const msg = totalRaw === 0
        ? 'Chưa có yêu cầu tư vấn nào.<br><span style="font-size: 0.8rem; color: #777;">Khi khách hàng gửi form đặt phòng hoặc liên hệ trên website, danh sách sẽ tự động hiển thị tại đây.</span>'
        : 'Không có yêu cầu tư vấn nào phù hợp với bộ lọc hiện tại.';
      tableBody.innerHTML = `
        <tr>
          <td colspan="8" style="text-align: center; padding: 45px 20px; color: #888;">
            <i class="fa-solid fa-inbox" style="font-size: 2.2rem; margin-bottom: 10px; display: block; color: rgba(197,168,128,0.25);"></i>
            ${msg}
          </td>
        </tr>
      `;
      return;
    }

    let html = '';
    inquiries.forEach(lead => {
      const cleanPhone = (lead.customer_phone || '').replace(/[^0-9+]/g, '');
      const status = lead.status || 'pending';

      html += `
        <tr data-lead-id="${lead.id}">
          <td>
            <div style="font-weight: 700; color: #fff;">${lead.id}</div>
            <div style="font-size: 0.76rem; color: #888; margin-top: 2px;">
              <i class="fa-regular fa-clock"></i> ${lead.formatted_time || lead.created_at ? lead.formatted_time || new Date(lead.created_at).toLocaleString('vi-VN') : ''}
            </div>
          </td>
          <td>
            <div style="font-weight: 600; color: #ffffff;">${lead.customer_name || 'Khách Vãng Lai'}</div>
            ${lead.customer_email && lead.customer_email !== '(không cung cấp)' ? `<div style="font-size: 0.76rem; color: #aaa;"><i class="fa-regular fa-envelope"></i> ${lead.customer_email}</div>` : ''}
          </td>
          <td>
            <div style="font-weight: 600; margin-bottom: 6px;">
              <a href="tel:${cleanPhone}" style="color: var(--primary-gold); text-decoration: none;" title="Bấm để gọi hotline">
                <i class="fa-solid fa-phone"></i> ${lead.customer_phone || '-'}
              </a>
            </div>
            ${cleanPhone ? `
              <a href="https://zalo.me/${cleanPhone}" target="_blank" class="btn-zalo-lead" title="Nhắn tin Zalo trực tiếp cho khách">
                <i class="fa-solid fa-comment-dots"></i> Nhắn Zalo
              </a>
            ` : ''}
          </td>
          <td>
            <div style="font-weight: 600; color: var(--primary-gold-light);">${lead.room_name || 'Tư vấn phòng'}</div>
            <div style="font-size: 0.76rem; color: #888; margin-top: 3px;">
              <i class="fa-solid fa-users"></i> ${lead.num_adults || '2'} người lớn ${lead.num_children && lead.num_children !== '0' ? `, ${lead.num_children} trẻ em` : ''}
            </div>
          </td>
          <td>
            <div style="font-size: 0.85rem; color: #fff;">${lead.checkin_date || '-'} ➔ ${lead.checkout_date || '-'}</div>
            ${lead.num_nights ? `<div style="font-size: 0.76rem; color: #a0a0a0;">(${lead.num_nights} đêm)</div>` : ''}
          </td>
          <td>
            <div style="max-width: 220px; font-size: 0.83rem; color: #d0d0d0; word-break: break-word;">
              ${lead.note ? lead.note : '<span style="color:#666;">Không có</span>'}
            </div>
            ${lead.admin_notes ? `
              <div style="margin-top: 5px; font-size: 0.76rem; color: #81c784; background: rgba(76,175,80,0.1); padding: 3px 6px; border-radius: 4px; border-left: 2px solid #4caf50;">
                <i class="fa-solid fa-clipboard-check"></i> <strong>Lễ tân:</strong> ${lead.admin_notes}
              </div>
            ` : ''}
          </td>
          <td>
            <select class="status-select ${status}" data-lead-id="${lead.id}">
              <option value="pending" ${status === 'pending' ? 'selected' : ''}>Chờ tư vấn</option>
              <option value="in_progress" ${status === 'in_progress' ? 'selected' : ''}>Đang tư vấn</option>
              <option value="confirmed" ${status === 'confirmed' ? 'selected' : ''}>Đã chốt phòng</option>
              <option value="cancelled" ${status === 'cancelled' ? 'selected' : ''}>Đã hủy</option>
            </select>
          </td>
          <td style="text-align: right;">
            <div style="display: flex; justify-content: flex-end; gap: 6px;">
              <button type="button" class="btn btn-outline-white btn-sm edit-lead-note-btn" data-lead-id="${lead.id}" title="Ghi chú lễ tân" style="padding: 6px 9px;">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button type="button" class="btn btn-outline-white btn-sm delete-lead-btn" data-lead-id="${lead.id}" title="Xóa yêu cầu" style="padding: 6px 9px; color: #ef5350; border-color: rgba(239,83,80,0.4);">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    });

    tableBody.innerHTML = html;

    // Gắn sự kiện đổi trạng thái
    tableBody.querySelectorAll('.status-select').forEach(sel => {
      sel.addEventListener('change', () => {
        const id = sel.getAttribute('data-lead-id');
        const newStatus = sel.value;
        sel.className = `status-select ${newStatus}`;

        if (window.SalaTracker.updateInquiryStatus(id, newStatus)) {
          const statusNames = {
            pending: 'Chờ tư vấn',
            in_progress: 'Đang tư vấn',
            confirmed: 'Đã chốt phòng',
            cancelled: 'Đã hủy'
          };
          showToast(`Đã cập nhật trạng thái đơn ${id} thành: "${statusNames[newStatus]}"`, 'success');
          
          // Cập nhật lại số lượng KPI và Badge
          const allInqs = window.SalaTracker.getInquiries();
          const pendingCount = allInqs.filter(x => x.status === 'pending').length;
          const kpiPending = document.getElementById('kpiPendingLeads');
          const badge = document.getElementById('leadsPendingBadge');
          if (kpiPending) kpiPending.textContent = `${pendingCount} đơn mới`;
          if (badge) {
            badge.textContent = pendingCount;
            if (pendingCount > 0) badge.classList.remove('empty');
            else badge.classList.add('empty');
          }
        }
      });
    });

    // Gắn sự kiện sửa ghi chú lễ tân
    tableBody.querySelectorAll('.edit-lead-note-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-lead-id');
        const lead = (window.SalaTracker.getInquiries() || []).find(x => x.id === id);
        const currentNote = lead ? (lead.admin_notes || '') : '';
        const newNote = prompt(`Nhập ghi chú lễ tân cho đơn tư vấn [${id}]:`, currentNote);
        if (newNote !== null) {
          window.SalaTracker.updateInquiryNotes(id, newNote.trim());
          showToast(`Đã lưu ghi chú cho đơn ${id}`, 'success');
          renderInquiriesTable();
        }
      });
    });

    // Gắn sự kiện xóa đơn
    tableBody.querySelectorAll('.delete-lead-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-lead-id');
        if (confirm(`Bạn có chắc chắn muốn xóa yêu cầu tư vấn [${id}] không? Thao tác này không thể hoàn tác.`)) {
          window.SalaTracker.deleteInquiry(id);
          showToast(`Đã xóa yêu cầu tư vấn ${id}`, 'info');
          renderAnalyticsTab();
        }
      });
    });
  }

  // Khởi tạo các sự kiện cho phân hệ Analytics & Leads
  function initAnalyticsEventListeners() {
    // 1. Tìm kiếm và lọc
    document.getElementById('leadSearchInput')?.addEventListener('input', renderInquiriesTable);
    document.getElementById('leadStatusFilter')?.addEventListener('change', renderInquiriesTable);
    document.getElementById('leadRoomFilter')?.addEventListener('change', renderInquiriesTable);

    // 2. Làm mới dữ liệu
    document.getElementById('refreshAnalyticsBtn')?.addEventListener('click', () => {
      renderAnalyticsTab();
      showToast('Đã làm mới dữ liệu thống kê & danh sách tư vấn!', 'success');
    });

    // 3. Xuất file Excel / CSV
    document.getElementById('exportLeadsCsvBtn')?.addEventListener('click', () => {
      if (window.SalaTracker) {
        window.SalaTracker.exportLeadsCsv();
        showToast('Đang xuất file Excel danh sách khách hàng...', 'info');
      }
    });

    // 4. Lựa chọn phạm vi thời gian biểu đồ xu hướng (Hôm nay, 7 ngày, 30 ngày, 3 tháng, 9 tháng)
    document.getElementById('chartTimeRangeSelect')?.addEventListener('change', (e) => {
      if (window.SalaTracker) {
        renderTrendChart(e.target.value, window.SalaTracker.getAnalytics());
      }
    });

    // 5. Modal nhập đơn tư vấn thủ công
    const modal = document.getElementById('manualLeadModal');
    const openBtn = document.getElementById('openAddLeadModalBtn');
    const closeBtn = document.getElementById('closeManualLeadModal');
    const cancelBtn = document.getElementById('cancelManualLeadBtn');
    const form = document.getElementById('manualLeadForm');

    openBtn?.addEventListener('click', () => {
      if (modal) {
        modal.style.display = 'flex';
        form?.reset();
        const todayStr = new Date().toISOString().split('T')[0];
        const cin = document.getElementById('manual_checkin');
        if (cin) cin.value = todayStr;
      }
    });

    const closeModal = () => {
      if (modal) modal.style.display = 'none';
    };

    closeBtn?.addEventListener('click', closeModal);
    cancelBtn?.addEventListener('click', closeModal);
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('manual_customer_name')?.value.trim();
      const phone = document.getElementById('manual_customer_phone')?.value.trim();
      const email = document.getElementById('manual_customer_email')?.value.trim();
      const roomKey = document.getElementById('manual_room_key')?.value;
      const roomSelect = document.getElementById('manual_room_key');
      const roomName = roomSelect?.options[roomSelect.selectedIndex]?.text || roomKey;
      const cin = document.getElementById('manual_checkin')?.value;
      const cout = document.getElementById('manual_checkout')?.value;
      const guests = document.getElementById('manual_guests')?.value.trim() || '2 người lớn';
      const status = document.getElementById('manual_status')?.value || 'pending';
      const note = document.getElementById('manual_note')?.value.trim();

      if (!name || !phone) {
        alert('Vui lòng nhập tên và số điện thoại khách hàng!');
        return;
      }

      let nights = 1;
      if (cin && cout) {
        const cinD = new Date(cin);
        const coutD = new Date(cout);
        if (coutD > cinD) {
          nights = Math.ceil((coutD - cinD) / 86400000);
        }
      }

      const newLead = {
        customer_name: name,
        customer_phone: phone,
        customer_email: email,
        room_key: roomKey,
        room_name: roomName,
        checkin_date: cin || '-',
        checkout_date: cout || '-',
        num_nights: nights,
        num_adults: guests,
        num_children: '0',
        note: note,
        status: status,
        admin_notes: 'Nhập trực tiếp từ Admin Dashboard'
      };

      if (window.SalaTracker) {
        const saved = window.SalaTracker.recordInquiry(newLead);
        closeModal();
        renderAnalyticsTab();
        showToast(`Đã thêm yêu cầu tư vấn mới [${saved.id}] cho khách ${name}!`, 'success');
      }
    });
  }

  // Khởi động listeners phân hệ Analytics
  initAnalyticsEventListeners();

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

  // Check login session (must run after all functions and listeners are defined)
  if (sessionStorage.getItem('sala_admin_authed') === 'true') {
    showDashboard();
  }
});
