/**
 * SALA TAM CỐC HOTEL & SPA - WEBSITE ANALYTICS & LEADS TRACKER
 * Hệ thống theo dõi lượt truy cập tự động & lưu trữ yêu cầu tư vấn đặt phòng
 */

(function () {
  'use strict';

  const STORAGE_KEY_ANALYTICS = 'sala_analytics_data';
  const STORAGE_KEY_INQUIRIES = 'sala_booking_inquiries';

  // Format ngày YYYY-MM-DD
  function formatDate(d) {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Tên hiển thị thân thiện cho từng trang và anchor
  function getFriendlyPageInfo() {
    const rawPath = window.location.pathname.split('/').pop() || 'index.html';
    const path = rawPath.toLowerCase();
    const hash = window.location.hash || '';

    const titles = {
      'index.html': 'Trang Chủ – Sala Tam Cốc Hotel & Spa',
      'rooms.html': 'Danh Sách Hạng Phòng & Báo Giá',
      'discover.html': 'Cẩm Nang Khám Phá Tam Cốc',
      'tours.html': 'Tour Ninh Bình & Xe Limousine VIP',
      'dining.html': 'Nhà Hàng Sala & Buffet Sáng Đặc Sản',
      'spa.html': 'Sala Spa & Trị Liệu Thư Giãn',
      'gallery.html': 'Thư Viện Ảnh Sala Tam Cốc',
      'contact.html': 'Liên Hệ & Vị Trí Bản Đồ'
    };

    if (hash === '#cam-nang-tam-coc-bich-dong') {
      return {
        url: '/discover.html#cam-nang-tam-coc-bich-dong',
        title: 'Cẩm Nang Du Lịch Tam Cốc - Bích Động Từ A-Z 2026'
      };
    }
    if (hash === '#mua-lua-chin-tam-coc') {
      return {
        url: '/discover.html#mua-lua-chin-tam-coc',
        title: 'Kinh Nghiệm Đi Tam Cốc Mùa Lúa Chín Vàng'
      };
    }
    if (hash === '#bang-gia-ve-tam-coc') {
      return {
        url: '/discover.html#bang-gia-ve-tam-coc',
        title: 'Bảng Giá Vé Thuyền Tam Cốc & Vé Thắng Cảnh 2026'
      };
    }
    if (path.includes('rooms.html') && hash) {
      const roomKey = hash.replace('#', '');
      return {
        url: `/rooms.html#${roomKey}`,
        title: `Xem Chi Tiết Phòng [${roomKey}]`
      };
    }

    const cleanPath = (path === 'index.html' || path === '') ? '/' : `/${path}`;
    return {
      url: cleanPath,
      title: titles[path] || document.title || cleanPath
    };
  }

  // Khởi tạo bộ thống kê trống (Bắt đầu từ số 0)
  function createZeroAnalytics() {
    const today = new Date();
    const daily = [];

    // Khởi tạo 30 ngày gần nhất với số 0
    for (let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      daily.push({
        date: formatDate(d),
        pageviews: 0,
        visitors: 0,
        hourly: {}
      });
    }

    return {
      totalPageviews: 0,
      totalVisitors: 0,
      lastUpdated: new Date().toISOString(),
      daily: daily,
      monthly: {},
      urls: {},
      clicks: {
        booking_modal: 0,
        zalo_chat: 0,
        hotline_call: 0,
        view_room_detail: 0
      }
    };
  }

  // Lấy dữ liệu Analytics từ LocalStorage
  function getStoredAnalytics() {
    let data = null;
    try {
      const raw = localStorage.getItem(STORAGE_KEY_ANALYTICS);
      if (raw) data = JSON.parse(raw);
    } catch (e) {
      console.warn('Cannot read analytics data from localStorage', e);
    }

    if (!data || !data.daily || !Array.isArray(data.daily)) {
      data = createZeroAnalytics();
      try {
        localStorage.setItem(STORAGE_KEY_ANALYTICS, JSON.stringify(data));
      } catch (e) {}
    }

    // Đảm bảo dữ liệu các ngày luôn cập nhật đến hôm nay
    const todayStr = formatDate(new Date());
    const existingDates = new Set(data.daily.map(d => d.date));

    if (!existingDates.has(todayStr)) {
      data.daily.push({
        date: todayStr,
        pageviews: 0,
        visitors: 0,
        hourly: {}
      });
    }

    // Giữ tối đa 365 ngày lịch sử
    while (data.daily.length > 365) {
      data.daily.shift();
    }

    return data;
  }

  // Lấy danh sách yêu cầu tư vấn (Khởi tạo mảng rỗng [])
  function getStoredInquiries() {
    let inqs = [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY_INQUIRIES);
      if (raw) inqs = JSON.parse(raw);
    } catch (e) {}

    if (!Array.isArray(inqs)) inqs = [];
    return inqs;
  }

  // Lưu danh sách Inquiries
  function saveStoredInquiries(inqs) {
    try {
      localStorage.setItem(STORAGE_KEY_INQUIRIES, JSON.stringify(inqs));
    } catch (e) {
      console.error('Failed to save inquiries', e);
    }
  }

  // Tự động đếm lượt xem trang (Nếu không phải là trang admin.html)
  function trackCurrentPageView() {
    const isDashboard = window.location.pathname.toLowerCase().includes('admin.html');
    if (isDashboard) return; // Tuyệt đối không đếm trang nội bộ của admin

    const analytics = getStoredAnalytics();
    const todayStr = formatDate(new Date());

    // 1. Đếm khách duy nhất trong ngày qua sessionStorage
    const sessionVisitKey = 'sala_visited_' + todayStr;
    const isNewVisitorToday = !sessionStorage.getItem(sessionVisitKey);

    if (isNewVisitorToday) {
      sessionStorage.setItem(sessionVisitKey, 'true');
      analytics.totalVisitors = (analytics.totalVisitors || 0) + 1;
    }

    // 2. Tăng tổng lượt xem (Pageviews)
    analytics.totalPageviews = (analytics.totalPageviews || 0) + 1;

    // 3. Tăng lượt xem hôm nay
    let todayObj = analytics.daily.find(d => d.date === todayStr);
    if (!todayObj) {
      todayObj = {
        date: todayStr,
        pageviews: 0,
        visitors: 0,
        hourly: {}
      };
      analytics.daily.push(todayObj);
    }

    todayObj.pageviews = (todayObj.pageviews || 0) + 1;
    if (isNewVisitorToday) {
      todayObj.visitors = (todayObj.visitors || 0) + 1;
    }

    // Ghi nhận phân bố theo giờ
    const currentHour = new Date().getHours();
    if (!todayObj.hourly) todayObj.hourly = {};
    todayObj.hourly[currentHour] = (todayObj.hourly[currentHour] || 0) + 1;

    // Ghi nhận theo tháng
    const now = new Date();
    const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    if (!analytics.monthly) analytics.monthly = {};
    if (!analytics.monthly[monthKey]) {
      analytics.monthly[monthKey] = { pageviews: 0, visitors: 0 };
    }
    analytics.monthly[monthKey].pageviews = (analytics.monthly[monthKey].pageviews || 0) + 1;
    if (isNewVisitorToday) {
      analytics.monthly[monthKey].visitors = (analytics.monthly[monthKey].visitors || 0) + 1;
    }

    // 4. Cập nhật lượt xem theo từng URL / Bài viết cụ thể
    const pageInfo = getFriendlyPageInfo();
    if (!analytics.urls) analytics.urls = {};

    if (!analytics.urls[pageInfo.url]) {
      analytics.urls[pageInfo.url] = {
        title: pageInfo.title,
        count: 1
      };
    } else {
      analytics.urls[pageInfo.url].count += 1;
      if (pageInfo.title && (!analytics.urls[pageInfo.url].title || analytics.urls[pageInfo.url].title.startsWith('/'))) {
        analytics.urls[pageInfo.url].title = pageInfo.title;
      }
    }

    analytics.lastUpdated = new Date().toISOString();

    try {
      localStorage.setItem(STORAGE_KEY_ANALYTICS, JSON.stringify(analytics));
    } catch (e) {}
  }

  // Ghi nhận các cú click quan trọng (Zalo, Hotline, Đặt phòng)
  function setupClickTracking() {
    document.addEventListener('click', (e) => {
      const target = e.target.closest('a, button');
      if (!target) return;

      const href = target.getAttribute('href') || '';
      const isBookingBtn = target.hasAttribute('data-open-booking') || target.classList.contains('btn-booking') || href.includes('booking');
      const isZaloBtn = href.includes('zalo.me');
      const isHotlineBtn = href.startsWith('tel:');
      const isRoomDetail = target.hasAttribute('data-open-room-detail') || href.includes('rooms.html');

      if (!isBookingBtn && !isZaloBtn && !isHotlineBtn && !isRoomDetail) return;

      const analytics = getStoredAnalytics();
      if (!analytics.clicks) analytics.clicks = {};

      if (isBookingBtn) {
        analytics.clicks.booking_modal = (analytics.clicks.booking_modal || 0) + 1;
      }
      if (isZaloBtn) {
        analytics.clicks.zalo_chat = (analytics.clicks.zalo_chat || 0) + 1;
      }
      if (isHotlineBtn) {
        analytics.clicks.hotline_call = (analytics.clicks.hotline_call || 0) + 1;
      }
      if (isRoomDetail) {
        analytics.clicks.view_room_detail = (analytics.clicks.view_room_detail || 0) + 1;
      }

      try {
        localStorage.setItem(STORAGE_KEY_ANALYTICS, JSON.stringify(analytics));
      } catch (err) {}
    });

    // Theo dõi khi đổi hash (ví dụ người dùng bấm xem bài viết hoặc phòng)
    window.addEventListener('hashchange', () => {
      trackCurrentPageView();
    });
  }

  // Cung cấp API toàn cục SalaTracker
  window.SalaTracker = {
    getAnalytics: getStoredAnalytics,
    getInquiries: getStoredInquiries,

    // Ghi nhận đơn tư vấn mới
    recordInquiry: function (inquiryData) {
      const list = getStoredInquiries();
      const newInquiry = Object.assign(
        {
          id: 'SALA-REQ-' + Math.floor(10000 + Math.random() * 90000),
          created_at: new Date().toISOString(),
          formatted_time: new Date().toLocaleString('vi-VN'),
          status: 'pending',
          admin_notes: ''
        },
        inquiryData
      );

      list.unshift(newInquiry);
      saveStoredInquiries(list);

      // Cập nhật click stats
      const analytics = getStoredAnalytics();
      if (!analytics.clicks) analytics.clicks = {};
      analytics.clicks.booking_modal = (analytics.clicks.booking_modal || 0) + 1;
      try {
        localStorage.setItem(STORAGE_KEY_ANALYTICS, JSON.stringify(analytics));
      } catch (e) {}

      return newInquiry;
    },

    // Đổi trạng thái xử lý
    updateInquiryStatus: function (id, newStatus) {
      const list = getStoredInquiries();
      const item = list.find((x) => x.id === id);
      if (item) {
        item.status = newStatus;
        item.updated_at = new Date().toISOString();
        saveStoredInquiries(list);
        return true;
      }
      return false;
    },

    // Cập nhật ghi chú nội bộ của lễ tân
    updateInquiryNotes: function (id, notes) {
      const list = getStoredInquiries();
      const item = list.find((x) => x.id === id);
      if (item) {
        item.admin_notes = notes;
        item.updated_at = new Date().toISOString();
        saveStoredInquiries(list);
        return true;
      }
      return false;
    },

    // Xóa đơn tư vấn
    deleteInquiry: function (id) {
      let list = getStoredInquiries();
      list = list.filter((x) => x.id !== id);
      saveStoredInquiries(list);
      return true;
    },

    // Xuất danh sách khách hàng sang CSV (hỗ trợ tiếng Việt UTF-8 BOM)
    exportLeadsCsv: function () {
      const list = getStoredInquiries();
      if (!list || list.length === 0) {
        alert('Chưa có yêu cầu tư vấn nào để xuất!');
        return;
      }

      const statusMap = {
        pending: 'Chờ tư vấn (Mới)',
        in_progress: 'Đang tư vấn',
        confirmed: 'Đã chốt phòng',
        cancelled: 'Đã hủy'
      };

      const headers = [
        'Mã Yêu Cầu',
        'Thời Gian Gửi',
        'Họ Tên Khách Hàng',
        'Số Điện Thoại / Zalo',
        'Email',
        'Hạng Phòng Quan Tâm',
        'Ngày Nhận Phòng (Check-in)',
        'Ngày Trả Phòng (Check-out)',
        'Số Đêm',
        'Người Lớn',
        'Trẻ Em',
        'Ghi Chú Khách',
        'Trạng Thái',
        'Ghi Chú Lễ Tân'
      ];

      const rows = list.map((item) => {
        return [
          `"${item.id || ''}"`,
          `"${item.formatted_time || item.created_at || ''}"`,
          `"${(item.customer_name || '').replace(/"/g, '""')}"`,
          `"${item.customer_phone || ''}"`,
          `"${item.customer_email || ''}"`,
          `"${(item.room_name || '').replace(/"/g, '""')}"`,
          `"${item.checkin_date || ''}"`,
          `"${item.checkout_date || ''}"`,
          `"${item.num_nights || ''}"`,
          `"${item.num_adults || ''}"`,
          `"${item.num_children || ''}"`,
          `"${(item.note || '').replace(/"/g, '""')}"`,
          `"${statusMap[item.status] || item.status || ''}"`,
          `"${(item.admin_notes || '').replace(/"/g, '""')}"`
        ].join(',');
      });

      const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `Sala_Tam_Coc_Khach_Tu_Van_${formatDate(new Date())}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    },

    // Đặt lại toàn bộ số liệu thống kê và danh sách đơn về 0
    resetAllDataToZero: function () {
      const zeroData = createZeroAnalytics();
      try {
        localStorage.setItem(STORAGE_KEY_ANALYTICS, JSON.stringify(zeroData));
        localStorage.setItem(STORAGE_KEY_INQUIRIES, JSON.stringify([]));
        
        // Xóa cả cờ session hôm nay để lượt ghé thăm tiếp theo được tính lại từ đầu
        const todayStr = formatDate(new Date());
        sessionStorage.removeItem('sala_visited_' + todayStr);
      } catch (e) {
        console.error('Error resetting analytics to zero', e);
      }
      return zeroData;
    }
  };

  // Tự động kích hoạt
  trackCurrentPageView();
  setupClickTracking();
})();
