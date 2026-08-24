/**
 * SALA TAM COC HOTEL & SPA - ADMIN DATA CONTROLLER & SYNC MODULE
 */

const DEFAULT_SALA_DATA = {
  hotelInfo: {
    name: "Sala Tam Coc Hotel & Spa",
    address: "Tam Coc Area, Ninh Binh Province, Vietnam",
    hotline1: "+84 9 42 06 05 33",
    hotline2: "+84 9 86 96 98 98",
    hotline3: "+84 3 37 40 84 84 (Français)",
    email: "salatamcochotel@gmail.com",
    whatsapp: "+84942060533",
    heroTitle: "SALA TAM COC HOTEL & SPA",
    heroSubtitle: "WELCOME TO",
    heroDesc: "A serene retreat amid the timeless beauty of Ninh Binh"
  },
  rooms: {
    "superior-double": {
      nameEn: "Superior Double City View – 28m²",
      nameVi: "Phòng Superior Double City View – 28m²",
      price: "1,100,000",
      size: "28 m²",
      guests: "02 Guests",
      beds: "1 King Bed (1.8m x 2.0m)",
      view: "City & Street View Window",
      cover: "Ảnh Sala Tam Coc Hotel & Spa/Superior Double city view/ANT_4807.jpg",
      photos: [
        "Ảnh Sala Tam Coc Hotel & Spa/Superior Double city view/ANT_4807.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Superior Double city view/ANT_4818.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Superior Double city view/ANT_4825.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Superior Double city view/ANT_4829.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Superior Double city view/ANT_4832.jpg"
      ],
      descEn: "Cozy and bright room featuring large city-view windows, comfortable 1 King bed, refined wooden furnishings, and complete upscale amenities.",
      descVi: "Phòng Superior Double sở hữu thiết kế trang nhã, ấm cúng với cửa sổ lớn đón ánh sáng tự nhiên hướng phố. Trang bị giường đôi King êm ái cùng hệ thống tiện nghi đầy đủ."
    },
    "superior-triple": {
      nameEn: "Superior Triple City View – 30m²",
      nameVi: "Phòng Superior Triple City View – 30m²",
      price: "1,500,000",
      size: "30 m²",
      guests: "03 Guests",
      beds: "3 Single Beds (or 1 King + 1 Single)",
      view: "City & Mountain View Window",
      cover: "Ảnh Sala Tam Coc Hotel & Spa/Superior Triple city view/ANT_4672.jpg",
      photos: [
        "Ảnh Sala Tam Coc Hotel & Spa/Superior Triple city view/ANT_4672.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Superior Triple city view/ANT_4622.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Superior Triple city view/ANT_4659.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Superior Triple city view/ANT_4691.jpg"
      ],
      descEn: "Spacious room designed for 3 guests with 3 Single beds (or 1 King + 1 Single), offering street and mountain views.",
      descVi: "Lựa chọn hoàn hảo cho nhóm bạn hoặc gia đình 3 người. Căn phòng được bố trí 3 giường đơn cao cấp, không gian rộng rãi và thoáng mát."
    },
    "deluxe-double": {
      nameEn: "Deluxe Double Balcony – 28m²",
      nameVi: "Phòng Deluxe Double Ban Công View Núi – 28m²",
      price: "1,300,000",
      size: "28 m²",
      guests: "02 Guests",
      beds: "1 King Bed (1.8m x 2.0m)",
      view: "Private Mountain View Balcony",
      cover: "Ảnh Sala Tam Coc Hotel & Spa/Deluxe Double room balcony/ANT_4561.jpg",
      photos: [
        "Ảnh Sala Tam Coc Hotel & Spa/Deluxe Double room balcony/ANT_4561.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Deluxe Double room balcony/ANT_4576.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Deluxe Double room balcony/ANT_4579.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Deluxe Double room balcony/ANT_4581.jpg"
      ],
      descEn: "Private open balcony overlooking Tam Coc limestone hills, refined wooden interior, high-end bedding, and quiet atmosphere.",
      descVi: "Sở hữu ban công riêng ngắm trọn cảnh non nước Tam Cốc hữu tình. Phòng trang bị nội thất gỗ ấm áp, giường King êm ái."
    },
    "deluxe-twin": {
      nameEn: "Deluxe Twin Balcony – 35m²",
      nameVi: "Phòng Deluxe Twin Ban Công View Núi – 35m²",
      price: "1,500,000",
      size: "35 m²",
      guests: "02 – 04 Guests",
      beds: "2 King Beds",
      view: "Scenic Mountain & Garden Balcony",
      cover: "Ảnh Sala Tam Coc Hotel & Spa/Deluxe Family room balcony/ANT_4411.jpg",
      photos: [
        "Ảnh Sala Tam Coc Hotel & Spa/Deluxe Family room balcony/ANT_4411.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Deluxe Family room balcony/ANT_4359.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Deluxe Family room balcony/ANT_4379.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Deluxe Family room balcony/ANT_4423.jpg"
      ],
      descEn: "Spacious 35m² twin room with 2 King Beds, private balcony bathed in natural sunlight, and breathtaking mountain views.",
      descVi: "Phòng Twin 35m² rộng rãi trang bị 2 giường King lớn, ban công riêng đón trọn ánh nắng tự nhiên và không khí trong lành."
    },
    "luxury-double": {
      nameEn: "Luxury Double with Balcony & Bath tub – 28m²",
      nameVi: "Phòng Luxury Double Ban Công & Bồn Tắm – 28m²",
      price: "1,700,000",
      size: "28 m²",
      guests: "02 Guests",
      beds: "1 King Bed + Freestanding Bathtub",
      view: "Panoramic Mountain Balcony & Glass Bathtub",
      cover: "Ảnh Sala Tam Coc Hotel & Spa/Luxury Double with Balcony & Bath tub/ANT_4542.jpg",
      photos: [
        "Ảnh Sala Tam Coc Hotel & Spa/Luxury Double with Balcony & Bath tub/ANT_4542.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Luxury Double with Balcony & Bath tub/ANT_4550.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Luxury Double with Balcony & Bath tub/ANT_4593_1.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Luxury Double with Balcony & Bath tub/ANT_4616.jpg"
      ],
      descEn: "Our most requested luxury room featuring a romantic glass-wall deep soaking tub, private balcony with mountain view.",
      descVi: "Hạng phòng sang trọng được yêu thích nhất với bồn tắm nằm thư giãn view kính trong suốt tinh tế, ban công riêng ngắm toàn cảnh núi."
    },
    "luxury-twin": {
      nameEn: "Luxury Twin with Balcony & Bath tub – 35m²",
      nameVi: "Phòng Luxury Twin Ban Công & Bồn Tắm – 35m²",
      price: "1,700,000",
      size: "35 m²",
      guests: "02 – 04 Guests",
      beds: "1 King Bed + Bathtub",
      view: "Mountain View Balcony & Soaking Bathtub",
      cover: "Ảnh Sala Tam Coc Hotel & Spa/Luxury Twin with Balcony & Bath tub/ANT_4359.jpg",
      photos: [
        "Ảnh Sala Tam Coc Hotel & Spa/Luxury Twin with Balcony & Bath tub/ANT_4359.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Luxury Twin with Balcony & Bath tub/ANT_4379.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Luxury Twin with Balcony & Bath tub/ANT_4411.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Luxury Twin with Balcony & Bath tub/ANT_4423.jpg"
      ],
      descEn: "Luxurious 35m² room with high-end bedding, relaxing freestanding bathtub with view, and private mountain balcony.",
      descVi: "Mang đến trải nghiệm nghỉ dưỡng tiện nghi đỉnh cao với không gian 35m² rộng rãi, bồn tắm nằm hiện đại view thoáng mát."
    },
    "deluxe-family": {
      nameEn: "Deluxe Family Balcony – 35m²",
      nameVi: "Phòng Deluxe Family Ban Công View Núi – 35m²",
      price: "2,000,000",
      size: "35 m²",
      guests: "04 Guests",
      beds: "2 King Beds",
      view: "Scenic Mountain & Countryside Balcony",
      cover: "Ảnh Sala Tam Coc Hotel & Spa/Deluxe Family room balcony/ANT_4359.jpg",
      photos: [
        "Ảnh Sala Tam Coc Hotel & Spa/Deluxe Family room balcony/ANT_4359.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Deluxe Family room balcony/ANT_4379.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Deluxe Family room balcony/ANT_4411.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Deluxe Family room balcony/ANT_4419.jpeg"
      ],
      descEn: "Ideal for families of 4, featuring 2 King Beds, airy mountain balcony, and ample living space for quality family bonding.",
      descVi: "Được thiết kế dành riêng cho gia đình 4 người với 2 giường King lớn êm ái, ban công rộng rãi đón gió trong lành và tầm nhìn tuyệt đẹp ra núi."
    },
    "family-connecting": {
      nameEn: "Family Connecting room 1 – 55m²",
      nameVi: "Phòng Gia Đình Nối Liền 1 – 55m² (2 Phòng Ngủ)",
      price: "2,500,000",
      size: "55 m²",
      guests: "04 – 06 Guests",
      beds: "2 Interconnected Bedrooms (2 King Beds)",
      view: "Double Mountain View Balcony",
      cover: "Ảnh Sala Tam Coc Hotel & Spa/Family Connecting room 1/ANT_4606.jpg",
      photos: [
        "Ảnh Sala Tam Coc Hotel & Spa/Family Connecting room 1/ANT_4606.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Family Connecting room 1/ANT_4502 phòng thông.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Family Connecting room 1/ANT_4609.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Family Connecting room 1/ANT_4526.jpg"
      ],
      descEn: "Two interconnected bedrooms with private connecting door, 2 King beds, and 2 separate ensuite bathrooms, combining privacy with family togetherness.",
      descVi: "Căn hộ 55m² gồm 2 phòng ngủ thông nhau có cửa nối liền, 2 phòng tắm riêng biệt mang lại sự riêng tư tối đa nhưng vẫn gắn kết các thành viên."
    },
    "family-connecting-2": {
      nameEn: "Family Connecting room 2 – 60m²",
      nameVi: "Phòng Gia Đình Nối Liền 2 – 60m² (2 Phòng Ngủ Thượng Hạng)",
      price: "2,700,000",
      size: "60 m²",
      guests: "05 – 07 Guests",
      beds: "2 Interconnected Bedrooms (2 King Beds + 1 Single Bed)",
      view: "Panoramic Mountain View Balcony",
      cover: "Ảnh Sala Tam Coc Hotel & Spa/Family Connecting room 2/ANT_4502.jpg",
      photos: [
        "Ảnh Sala Tam Coc Hotel & Spa/Family Connecting room 2/ANT_4502.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Family Connecting room 2/ANT_4523.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Family Connecting room 2/ANT_4526.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Family Connecting room 2/ANT_4530.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Family Connecting room 2/ANT_4579.jpg"
      ],
      descEn: "Spacious 60m² grand family suite featuring 2 interconnected bedrooms (2 King Beds + 1 Single Bed) and 2 private bathrooms for up to 7 guests.",
      descVi: "Căn hộ gia đình thượng hạng 60m² với 2 phòng ngủ thông nhau (2 giường King + 1 giường đơn) và 2 phòng tắm riêng biệt, thích hợp gia đình đông người đến 7 khách."
    }
  },
  tours: {
    "hoa-lu-bai-dinh-trang-an-mua-cave": {
      title: "Hoa Lư - Bái Đính - Tràng An - Hang Múa",
      price: "$45 / Guest",
      desc: "Cố đô Hoa Lư, Chùa Bái Đính lớn nhất ĐNÁ, Thuyền Tràng An UNESCO, Đỉnh Ngọa Long Hang Múa."
    },
    "hoa-lu-trang-an-mua-cave-bich-dong": {
      title: "Hoa Lư - Tràng An - Hang Múa - Chùa Bích Động",
      price: "$45 / Guest",
      desc: "Chùa Bích Động cổ kính 1428, Hang Múa View Tam Cốc, Cố đô Hoa Lư, Thuyền Tràng An UNESCO."
    },
    "bai-dinh-trang-an-mua-cave": {
      title: "Bái Đính - Tràng An - Hang Múa",
      price: "$48 / Guest",
      desc: "Quần thể tâm linh Chùa Bái Đính, Thuyền Tràng An, Đỉnh Ngọa Long Hang Múa ngắm hoàng hôn."
    },
    "cuc-phuong-national-park": {
      title: "Vườn Quốc Gia Cúc Phương 1 Ngày",
      price: "$45 / Guest",
      desc: "Trung tâm Cứu hộ Linh trưởng, Động Người Xưa (7.500 năm), Ăn trưa rừng Bống, Trekking Cây Trò Ngàn Năm."
    },
    "cuc-phuong-van-long": {
      title: "Vườn Quốc Gia Cúc Phương & Đầm Vân Long",
      price: "$50 / Guest",
      desc: "Rừng Cúc Phương cổ thụ kết hợp thuyền tre Khu bảo tồn thiên nhiên Đầm Vân Long ngắm Voọc mông trắng."
    },
    "countryside-adventure": {
      title: "Khám Phá Miền Quê Ninh Bình (Xe Máy / Jeep / Xe Đạp)",
      price: "$40 / Guest",
      desc: "Đạp xe làng quê, Chùa Bích Động, Đền Voi, Trải nghiệm nông dân Buffalo Caves (bắt cá, cưỡi trâu, cấy lúa)."
    },
    "bich-dong-thai-vy-thung-nham": {
      title: "Chùa Bích Động - Đền Thái Vi - Vườn Chim Thung Nham",
      price: "$45 / Guest",
      desc: "Đạp xe đồng lúa Tam Cốc, Chùa Bích Động, Đền Thái Vi, Thuyền tre Vườn chim Thung Nham lúc hoàng hôn."
    },
    "limousine": {
      title: "Hà Nội ⇄ Ninh Bình VIP Limousine Shuttle",
      priceOneWay: "250,000 VND ($10) / seat",
      priceRoundTrip: "480,000 VND ($20) / seat",
      schedule: "Chạy liên tục từ 06:00 - 20:00 hàng ngày, Đưa đón tận nơi tại khách sạn"
    }
  }
};

// Helper: auto-fix broken cover paths in custom data
function sanitizeSalaData(data) {
  if (!data || !data.rooms) return DEFAULT_SALA_DATA;
  
  Object.keys(DEFAULT_SALA_DATA.rooms).forEach(key => {
    if (!data.rooms[key]) {
      data.rooms[key] = { ...DEFAULT_SALA_DATA.rooms[key] };
    } else {
      const defaultCover = DEFAULT_SALA_DATA.rooms[key].cover;
      const currentCover = data.rooms[key].cover;
      // If cover is invalid, missing or pointing to broken path like limousine png or phòng 2.jpg
      if (!currentCover || currentCover.includes('limousine') || currentCover.includes('phòng 2') || !currentCover.includes('Ảnh Sala Tam Coc')) {
        data.rooms[key].cover = defaultCover;
      }
    }
  });
  return data;
}

// Global helper functions to get and save custom data
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
    // Apply changes instantly to window.ROOMS_DETAILS_DATA if loaded
    if (window.ROOMS_DETAILS_DATA && sanitized.rooms) {
      Object.keys(sanitized.rooms).forEach(key => {
        if (window.ROOMS_DETAILS_DATA[key]) {
          Object.assign(window.ROOMS_DETAILS_DATA[key], sanitized.rooms[key]);
        }
      });
    }
    return true;
  } catch(e) {
    console.error("Error saving custom sala data:", e);
    return false;
  }
};

window.resetSalaData = function() {
  localStorage.removeItem('sala_custom_data');
  if (window.ROOMS_DETAILS_DATA) {
    Object.keys(DEFAULT_SALA_DATA.rooms).forEach(key => {
      if (window.ROOMS_DETAILS_DATA[key]) {
        Object.assign(window.ROOMS_DETAILS_DATA[key], DEFAULT_SALA_DATA.rooms[key]);
      }
    });
  }
};
