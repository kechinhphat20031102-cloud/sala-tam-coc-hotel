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
      nameFr: "Chambre Superior Double City View – 28m²",
      price: "1,300,000",
      size: "28 m²",
      guests: "02 Guests",
      guestsVi: "02 Khách",
      guestsFr: "02 Personnes",
      beds: "01 King Bed",
      bedsVi: "01 Giường King",
      bedsFr: "01 Lit King",
      view: "City & Street View Window",
      viewVi: "Cửa sổ hướng phố",
      viewFr: "Fenêtre vue ville et rue",
      cover: "Ảnh Sala Tam Coc Hotel & Spa/Superior Double city view/ANT_4807.jpg",
      photos: [
        "Ảnh Sala Tam Coc Hotel & Spa/Superior Double city view/ANT_4807.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Superior Double city view/ANT_4818.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Superior Double city view/ANT_4825.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Superior Double city view/ANT_4829.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Superior Double city view/ANT_4832.jpg"
      ],
      descEn: "Cozy and bright room featuring large city & street view windows, comfortable 1 King bed, refined wooden furnishings, and complete upscale amenities.",
      descVi: "Phòng Superior Double sở hữu thiết kế trang nhã, ấm cúng với cửa sổ lớn đón ánh sáng tự nhiên hướng phố. Trang bị giường đôi King êm ái cùng hệ thống tiện nghi đầy đủ.",
      descFr: "Chambre chaleureuse et lumineuse avec de grandes fenêtres vue ville, 1 lit King confortable, mobilier en bois raffiné et équipements modernes pour un séjour relaxant à Tam Coc."
    },
    "superior-triple": {
      nameEn: "Superior Triple City View – 30m²",
      nameVi: "Phòng Superior Triple City View – 30m²",
      nameFr: "Chambre Superior Triple City View – 30m²",
      price: "1,800,000",
      size: "30 m²",
      guests: "03 Guests",
      guestsVi: "03 Khách",
      guestsFr: "03 Personnes",
      beds: "3 Single Beds (or 1 King + 1 Single)",
      bedsVi: "3 Giường đơn (hoặc 1 King + 1 Đơn)",
      bedsFr: "3 Lits simples (ou 1 King + 1 Simple)",
      view: "City & Street View Window",
      viewVi: "Cửa sổ hướng phố",
      viewFr: "Fenêtre vue ville et rue",
      cover: "Ảnh Sala Tam Coc Hotel & Spa/Superior Triple city view/ANT_4672.jpg",
      photos: [
        "Ảnh Sala Tam Coc Hotel & Spa/Superior Triple city view/ANT_4672.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Superior Triple city view/ANT_4622.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Superior Triple city view/ANT_4659.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Superior Triple city view/ANT_4691.jpg"
      ],
      descEn: "Spacious room designed for 3 guests with 3 Single beds (or 1 King + 1 Single), offering street view & balcony.",
      descVi: "Lựa chọn hoàn hảo cho nhóm bạn hoặc gia đình 3 người. Căn phòng được bố trí 3 giường đơn cao cấp, không gian rộng rãi và thoáng mát.",
      descFr: "Chambre spacieuse conçue pour 3 personnes avec 3 lits simples (ou 1 King + 1 Simple), balcon et vue sur la rue et les montagnes."
    },
    "deluxe-double": {
      nameEn: "Deluxe Double Balcony – 28m²",
      nameVi: "Phòng Deluxe Double Ban Công View Phố/Núi – 28m²",
      nameFr: "Chambre Deluxe Double Balcon View Ville/Montagne – 28m²",
      price: "1,500,000",
      size: "28 m²",
      guests: "02 Guests",
      guestsVi: "02 Khách",
      guestsFr: "02 Personnes",
      beds: "01 King Bed",
      bedsVi: "01 Giường King",
      bedsFr: "01 Lit King",
      view: "Private City & Mountain View Balcony",
      viewVi: "Ban công view phố & núi",
      viewFr: "Balcon privé vue ville & montagne",
      cover: "Ảnh Sala Tam Coc Hotel & Spa/Deluxe Double room balcony/ANT_4561.jpg",
      photos: [
        "Ảnh Sala Tam Coc Hotel & Spa/Deluxe Double room balcony/ANT_4561.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Deluxe Double room balcony/ANT_4576.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Deluxe Double room balcony/ANT_4579.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Deluxe Double room balcony/ANT_4581.jpg"
      ],
      descEn: "Private open balcony overlooking city view/Tam Coc limestone hills, refined wooden interior, high-end bedding, and quiet atmosphere.",
      descVi: "Sở hữu ban công riêng ngắm trọn cảnh phố xá & non nước Tam Cốc hữu tình. Phòng trang bị nội thất gỗ ấm áp, giường King êm ái.",
      descFr: "Balcon privé donnant sur la ville et les collines karstiques de Tam Coc, intérieur en bois raffiné, literie haut de gamme et atmosphère paisible."
    },
    "deluxe-twin": {
      nameEn: "Deluxe Twin Balcony – 35m²",
      nameVi: "Phòng Deluxe Twin Ban Công View Phố – 35m²",
      nameFr: "Chambre Deluxe Twin Balcon – 35m²",
      price: "1,600,000",
      size: "35 m²",
      guests: "02 – 04 Guests",
      guestsVi: "02 – 04 Khách",
      guestsFr: "02 – 04 Personnes",
      beds: "2 King Beds",
      bedsVi: "2 Giường King",
      bedsFr: "2 Lits King",
      view: "Private City & Street Balcony",
      viewVi: "Ban công riêng view phố",
      viewFr: "Balcon privé vue ville",
      cover: "Ảnh Sala Tam Coc Hotel & Spa/Deluxe Family room balcony/ANT_4411.jpg",
      photos: [
        "Ảnh Sala Tam Coc Hotel & Spa/Deluxe Family room balcony/ANT_4411.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Deluxe Family room balcony/ANT_4359.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Deluxe Family room balcony/ANT_4379.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Deluxe Family room balcony/ANT_4423.jpg"
      ],
      descEn: "Spacious 35m² twin room with 2 King Beds, private balcony bathed in natural sunlight, and breathtaking city/street views.",
      descVi: "Phòng Twin 35m² rộng rãi trang bị 2 giường King lớn, ban công riêng đón trọn ánh nắng tự nhiên và không khí trong lành.",
      descFr: "Chambre Twin spacieuse de 35m² équipée de 2 lits King, balcon privé ensoleillé avec vue panoramique sur la ville."
    },
    "luxury-double": {
      nameEn: "Luxury Double with Balcony & Bath tub – 28m²",
      nameVi: "Phòng Luxury Double Ban Công & Bồn Tắm – 28m²",
      nameFr: "Chambre Luxury Double Balcon & Baignoire – 28m²",
      price: "1,650,000",
      size: "28 m²",
      guests: "02 Guests",
      guestsVi: "02 Khách",
      guestsFr: "02 Personnes",
      beds: "01 King Bed + Bathtub",
      bedsVi: "01 Giường King + Bồn Tắm",
      bedsFr: "01 Lit King + Baignoire",
      view: "City & Mountain View Balcony",
      viewVi: "Ban công view phố & núi",
      viewFr: "Balcon privé vue montagne & ville",
      cover: "Ảnh Sala Tam Coc Hotel & Spa/Luxury Double with Balcony & Bath tub/ANT_4542.jpg",
      photos: [
        "Ảnh Sala Tam Coc Hotel & Spa/Luxury Double with Balcony & Bath tub/ANT_4542.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Luxury Double with Balcony & Bath tub/ANT_4550.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Luxury Double with Balcony & Bath tub/ANT_4593_1.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Luxury Double with Balcony & Bath tub/ANT_4616.jpg"
      ],
      descEn: "Our most requested luxury room featuring a romantic glass-wall deep soaking tub, private balcony with city/mountain view.",
      descVi: "Hạng phòng sang trọng được yêu thích nhất với bồn tắm nằm thư giãn view kính trong suốt tinh tế, ban công riêng ngắm thành phố & núi non.",
      descFr: "Notre chambre de luxe signature avec baignoire îlot vitrée panoramique, balcon privé et 1 lit King."
    },
    "luxury-twin": {
      nameEn: "Luxury Twin with Balcony & Bath tub – 35m²",
      nameVi: "Phòng Luxury Twin Ban Công & Bồn Tắm – 35m²",
      nameFr: "Chambre Luxury Twin Balcon & Baignoire – 35m²",
      price: "1,750,000",
      size: "35 m²",
      guests: "02 – 04 Guests",
      guestsVi: "02 – 04 Khách",
      guestsFr: "02 – 04 Personnes",
      beds: "2 King Beds + Bathtub",
      bedsVi: "2 Giường King + Bồn Tắm",
      bedsFr: "2 Lits King + Baignoire",
      view: "City & Mountain View Balcony",
      viewVi: "Ban công view phố & núi",
      viewFr: "Balcon privé vue montagne & ville",
      cover: "Ảnh Sala Tam Coc Hotel & Spa/Luxury Twin with Balcony & Bath tub/ANT_4359.jpg",
      photos: [
        "Ảnh Sala Tam Coc Hotel & Spa/Luxury Twin with Balcony & Bath tub/ANT_4359.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Luxury Twin with Balcony & Bath tub/ANT_4379.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Luxury Twin with Balcony & Bath tub/ANT_4411.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Luxury Twin with Balcony & Bath tub/ANT_4423.jpg"
      ],
      descEn: "Our most requested luxury room featuring a romantic glass-wall deep soaking tub, private balcony with city/mountain view.",
      descVi: "Mang đến trải nghiệm nghỉ dưỡng tiện nghi đỉnh cao với không gian 35m² rộng rãi, bồn tắm nằm hiện đại view thoáng mát.",
      descFr: "Chambre luxueuse avec 1 lit King, baignoire îlot relaxante et balcon panoramique sur les montagnes."
    },
    "deluxe-family": {
      nameEn: "Deluxe Family Balcony – 35m²",
      nameVi: "Phòng Deluxe Family Ban Công View Phố – 35m²",
      nameFr: "Suite Deluxe Familiale Balcon – 35m²",
      price: "2,100,000",
      size: "35 m²",
      guests: "04 Guests",
      guestsVi: "04 Khách",
      guestsFr: "04 Personnes",
      beds: "2 King Beds",
      bedsVi: "2 Giường King",
      bedsFr: "2 Lits King",
      view: "Private City & Street Balcony",
      viewVi: "Ban công riêng view phố",
      viewFr: "Balcon privé vue montagne & ville",
      cover: "Ảnh Sala Tam Coc Hotel & Spa/Deluxe Family room balcony/ANT_4359.jpg",
      photos: [
        "Ảnh Sala Tam Coc Hotel & Spa/Deluxe Family room balcony/ANT_4359.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Deluxe Family room balcony/ANT_4379.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Deluxe Family room balcony/ANT_4411.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Deluxe Family room balcony/ANT_4419.jpeg"
      ],
      descEn: "Ideal for families of 4, featuring 2 King Beds, airy city/street balcony, and ample living space for quality family bonding.",
      descVi: "Được thiết kế dành riêng cho gia đình 4 người với 2 giường King lớn êm ái, ban công rộng rãi đón gió trong lành.",
      descFr: "Idéal pour les familles de 4 personnes, comprenant 2 lits King, un balcon aéré vue montagne et un grand espace de vie."
    },
    "family-connecting": {
      nameEn: "Family Connecting room 1 – 55m²",
      nameVi: "Phòng Gia Đình Nối Liền 1 – 55m² (2 Phòng Ngủ)",
      nameFr: "Suite Familiale Communicante 1 – 55m²",
      price: "2,600,000",
      size: "55 m²",
      guests: "04 – 06 Guests",
      guestsVi: "04 – 06 Khách",
      guestsFr: "04 – 06 Personnes",
      beds: "2 Interconnected Bedrooms (2 King Beds)",
      bedsVi: "2 Phòng ngủ thông nhau (2 Giường King)",
      bedsFr: "2 Chambres communicantes (2 Lits King)",
      view: "Private City & Street Balcony",
      viewVi: "Ban công riêng view phố",
      viewFr: "Balcon privé vue montagne",
      cover: "Ảnh Sala Tam Coc Hotel & Spa/Family Connecting room 1/ANT_4606.jpg",
      photos: [
        "Ảnh Sala Tam Coc Hotel & Spa/Family Connecting room 1/ANT_4606.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Family Connecting room 1/ANT_4502 phòng thông.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Family Connecting room 1/ANT_4609.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Family Connecting room 1/ANT_4526.jpg"
      ],
      descEn: "Two interconnected bedrooms with private connecting door, 2 King beds, and 2 separate ensuite bathrooms.",
      descVi: "Căn hộ 55m² gồm 2 phòng ngủ thông nhau có cửa nối liền, 2 phòng tắm riêng biệt mang lại sự riêng tư tối đa.",
      descFr: "Suite communicante avec 2 chambres séparées et 2 salles de bain privées, idéale pour les grandes familles ou groupes d'amis."
    },
    "family-connecting-2": {
      nameEn: "Family Connecting room 2 – 60m²",
      nameVi: "Phòng Gia Đình Nối Liền 2 – 60m² (2 Phòng Ngủ Thượng Hạng)",
      nameFr: "Suite Familiale Communicante 2 – 60m²",
      price: "2,750,000",
      size: "60 m²",
      guests: "05 – 07 Guests",
      guestsVi: "05 – 07 Khách",
      guestsFr: "05 – 07 Personnes",
      beds: "2 Interconnected Bedrooms (2 King + 1 Single)",
      bedsVi: "2 Phòng ngủ thông nhau (2 King + 1 Đơn)",
      bedsFr: "2 Chambres communicantes (2 Kings + 1 Simple)",
      view: "Private City & Street Balcony",
      viewVi: "Ban công riêng view phố",
      viewFr: "Balcon privé vue montagne",
      cover: "Ảnh Sala Tam Coc Hotel & Spa/Family Connecting room 2/ANT_4502.jpg",
      photos: [
        "Ảnh Sala Tam Coc Hotel & Spa/Family Connecting room 2/ANT_4502.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Family Connecting room 2/ANT_4523.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Family Connecting room 2/ANT_4526.jpg",
        "Ảnh Sala Tam Coc Hotel & Spa/Family Connecting room 2/ANT_4530.jpg"
      ],
      descEn: "Spacious 60m² grand family suite featuring 2 interconnected bedrooms (2 King Beds + 1 Single Bed) and 2 private bathrooms.",
      descVi: "Căn hộ gia đình thượng hạng 60m² với 2 phòng ngủ thông nhau (2 giường King + 1 giường đơn) và 2 phòng tắm riêng biệt.",
      descFr: "Suite familiale communicante spacieuse de 60m² avec 2 lits King + 1 lit simple, 2 salles de bain privées et balcon vue montagne."
    }
  },
  tours: {}
};

// Sanitizer helper function
function sanitizeSalaData(inputData) {
  if (!inputData || typeof inputData !== 'object') return DEFAULT_SALA_DATA;
  const data = JSON.parse(JSON.stringify(inputData));

  if (data.rooms) {
    Object.keys(DEFAULT_SALA_DATA.rooms).forEach(key => {
      const def = DEFAULT_SALA_DATA.rooms[key];
      if (!data.rooms[key]) {
        data.rooms[key] = { ...def };
      } else {
        // Merge missing properties from default if any
        data.rooms[key] = {
          ...def,
          ...data.rooms[key],
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
  } catch(e) {
    console.error("Error saving custom sala data:", e);
  }
};

// Reset custom data to default
window.resetSalaData = function() {
  localStorage.removeItem('sala_custom_data');
  return DEFAULT_SALA_DATA;
};
