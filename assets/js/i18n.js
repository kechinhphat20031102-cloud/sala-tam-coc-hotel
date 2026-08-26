/**
 * SALA TAM COC HOTEL & SPA - MULTILINGUAL ENGINE (i18n)
 * Supported Languages: English (en - default), Vietnamese (vi), Russian (ru), French (fr)
 */

const translations = {
  en: {
    // Topbar & Nav
    "address": "Tam Coc Area, Ninh Binh Province, Vietnam",
    "hotline_1": "+84 9 42 06 05 33",
    "hotline_2": "+84 9 86 96 98 98",
    "hotline_3": "+84 3 37 40 84 84 (Français)",
    "nav_home": "Home",
    "nav_rooms": "Rooms & Suites",
    "nav_offers": "Special Offers",
    "nav_dining": "Restaurant",
    "nav_spa": "Spa & Wellness",
    "nav_tours": "Daily Tours",
    "nav_gallery": "Photo Gallery",
    "nav_contact": "Book Now",
    "btn_book_now": "Book Now",
    "btn_view_details": "View Details",
    "btn_book_room": "Book Room",
    "btn_book_table": "Reserve Table",
    "btn_book_package": "Book Package",
    "btn_book_tour": "Book Tour",
    "btn_explore_menu": "Explore Menu",
    "btn_learn_more": "Learn More",
    "btn_view_itinerary": "View Detailed Itinerary",
    "btn_details": "Details",

    // Hero Slider
    "hero_sub_1": "WELCOME TO",
    "hero_title_1": "SALA TAM COC HOTEL & SPA",
    "hero_desc_1": "A serene retreat amid the timeless beauty of Ninh Binh",
    "hero_sub_2": "Panoramic Limestone Views",
    "hero_title_2": "ROOFTOP INFINITY POOL",
    "hero_desc_2": "Immerse yourself in refreshing crystal water while taking in breathtaking sunsets over Tam Coc valley.",
    "hero_sub_3": "Flavors Of Ancient Capital",
    "hero_title_3": "AUTHENTIC DINING & BUFFET BREAKFAST",
    "hero_desc_3": "Savor daily fresh international & local buffet breakfast and traditional Ninh Binh goat delicacies.",
    "hero_sub_4": "Warm Vietnamese Hospitality",
    "hero_title_4": "ELEGANT ROOMS & SUITES",
    "hero_desc_4": "Modern amenities, scenic balconies, luxury soaking tubs, and heartfelt boutique service.",

    // Quick Booking Bar
    "qb_title": "Check Availability & Best Rates",
    "qb_checkin": "Expected Check-in Date",
    "qb_checkout": "Expected Check-out Date",
    "qb_room": "Room Category",
    "qb_guests": "Number of Guests",
    "qb_submit": "Booking Inquiries",
    "guest_1": "1 Adult",
    "guest_2": "2 Adults",
    "guest_3": "3 Adults",
    "guest_4": "4+ People (Family)",

    // About Section
    "about_sub": "A New Boutique Hotel",
    "about_title": "A Luxurious Haven Amid Legendary Landscapes",
    "about_desc_1": "Located in the heart of Tam Coc, just steps from the famous Tam Coc Boat Wharf, <strong>Sala Tam Coc Hotel & Spa</strong> is a charming boutique hotel where the timeless beauty of Ninh Binh meets contemporary comfort and thoughtful hospitality.",
    "about_desc_2": "Our elegantly designed rooms feature private balconies with refreshing mountain or city views, offering a peaceful retreat after a day of exploring. At Sala Tam Coc Hotel & Spa, every detail is thoughtfully designed to provide a warm, comfortable, and memorable stay — making it the perfect choice for discovering the natural beauty and cultural heritage of Ninh Binh.",
    "feat_pool": "Rooftop Infinity Swimming Pool with Mountain View",
    "feat_dining": "Restaurant & Daily Buffet Breakfast",
    "feat_spa": "Lotus Spa Herbal Baths & Relaxing Body Therapy",
    "feat_tours": "Private Tour Bookings & VIP Limousine Transfer",

    // Rooms Section
    "rooms_sub": "ACCOMMODATION",
    "rooms_title": "Rooms & Suites Collection",
    "rooms_desc": "All rooms feature Free Wi-Fi, Smart TV, Air Conditioning, Hot Rain Shower, Tea & Coffee Set, Bottled Mineral Water, Umbrella, In-room Safety Box, Slippers, Soft Bathrobes.",
    "filter_all": "All Rooms",
    "filter_double": "Couples / Double",
    "filter_triple": "Triple (3 Guests)",
    "filter_luxury": "Luxury with Bathtub",
    "filter_family": "Family Suites",
    "price_from": "From",
    "per_night": "/ night",

    // Offers Section
    "offers_sub": "Promotions & Packages",
    "offers_title": "Special Holiday Packages",
    "offers_desc": "Enjoy exclusive savings, complimentary tour tickets, and VIP transport when booking directly on our official website.",
    "badge_hot": "Hot Deal 25% Off",
    "badge_vip": "VIP Inclusive Combo",
    "badge_family": "Family Saver",

    // Dining Section
    "dining_sub": "Culinary Heritage",
    "dining_title": "Sala Restaurant & Daily Buffet Breakfast",
    "dining_desc": "Sala Restaurant delivers an exquisite gastronomic journey showcasing famous Ninh Binh mountain goat specialties, crispy rice crackers, hill chicken, and a fresh daily buffet breakfast.",
    "serving_hours": "Serving Hours:",
    "hours_val": "07:00 - 20:30 Daily",
    "capacity": "Capacity:",
    "capacity_val": "Up to 120 Guests",
    "buffet_time": "Buffet Breakfast:",
    "buffet_val": "07:00 - 09:30 Daily",
    "table_res": "Reservation:",

    // Spa Section
    "spa_sub": "Mind & Body Harmony",
    "spa_title": "Sala Lotus Spa & Wellness",
    "spa_desc": "After an exhilarating day exploring Tam Coc caves and peaks, unwind in fragrant herbal steam and therapeutic massage rooted in traditional Vietnamese medicine.",

    // Tours Section & Page
    "tours_sub": "Exploration & Adventures",
    "tours_title": "Daily Tours & Limousine",
    "tours_desc": "Sala Tam Coc Hotel organizes professional tours, licensed local guides, and top-tier VIP limousine transfers.",
    "tours_banner_sub": "UNESCO World Heritage Discovery",
    "tours_banner_title": "Excursions & Limousine Services",
    "tours_banner_desc": "Immerse yourself in limestone karsts, emerald rivers, and thousand-year heritage with curated private tours and door-to-door VIP Limousine transport.",
    "btn_view_all_tours": "View All 7 Ninh Binh Daily Tours & Limousine",
    "tour_duration_label": "Duration:",
    "tour_inclusions_label": "Inclusions:",
    "tour_highlights_label": "Highlights:",
    "tour_1_day": "1 Day",
    "tour_experience": "Experience",

    // Tour 1 Card
    "tour1_title": "Hoa Lu - Bai Dinh - Trang An - Mua Cave",
    "tour1_badge": "Best Seller Daily Tour",
    "tour1_desc": "Full-day journey exploring thousand-year ancient capital Hoa Lu, worshiping at Southeast Asia's largest Bai Dinh Pagoda, rowing through UNESCO Heritage Trang An, and conquering 500 stone steps at Mua Cave Ngoa Long Peak.",
    "tour1_time": "1 Day (08:00 - 17:00)",
    "tour1_inc": "AC Vehicle, Tour Guide, Entrance Fees, Trang An Boat, Specialty Lunch, Water",
    "tour1_hl": "Ancient Capital, Bai Dinh Pagoda, Trang An Sampan Boat, Ngoa Long Peak",

    // Tour 2 Card
    "tour2_title": "Hoa Lu - Trang An - Mua Cave - Bich Dong Pagoda",
    "tour2_badge": "Heritage & Ancient Cave",
    "tour2_desc": "Discover ancient Bich Dong Pagoda built in 1428 leaning against limestone mountain, challenge 500 steps of Mua Cave for panoramic Tam Coc views, combined with Hoa Lu Ancient Capital and Trang An boat tour.",
    "tour2_time": "1 Day (08:30 - 16:30)",
    "tour2_inc": "AC Transfer, Guide, Entrance & Boat Tickets, Specialty Lunch, Water",
    "tour2_hl": "Bich Dong Pagoda 1428, Mua Cave View Tam Coc, Hoa Lu, Trang An",

    // Tour 3 Card
    "tour3_title": "Bai Dinh - Trang An - Mua Cave",
    "tour3_badge": "Spiritual & Nature Journey",
    "tour3_desc": "Spiritual journey to Bai Dinh Pagoda, row through cool caves in Trang An, and enjoy breathtaking sunset atop Mua Cave Peak.",
    "tour3_time": "1 Day (08:00 - 17:00)",
    "tour3_inc": "AC Bus, Guide, Entrance & Trang An Boat, Restaurant Lunch",
    "tour3_hl": "Record-holding Bai Dinh Pagoda, Trang An Boat, Mua Cave Panorama",

    // Tour 4 Card
    "tour4_title": "Cuc Phuong National Park Day Tour",
    "tour4_badge": "Jungle Trekking & Wildlife",
    "tour4_desc": "Experience Cuc Phuong primary rainforest: Visit Endangered Primate Rescue Center, Cave of Prehistoric Man (7,500 yrs), lunch inside Bong jungle, and trek to Thousand-Year-Old Tree.",
    "tour4_time": "1 Day (08:00 - 16:00)",
    "tour4_inc": "AC Transfer, Professional Guide, Park Entrance Fee, Jungle Lunch",
    "tour4_hl": "Primate Rescue Center, Prehistoric Cave, Thousand-Year Tree",

    // Tour 5 Card
    "tour5_title": "Cuc Phuong National Park & Van Long Wetland",
    "tour5_badge": "Forest & Wetland Ecotourism",
    "tour5_desc": "Combine morning trekking in Cuc Phuong forest with afternoon bamboo boat ride exploring Van Long Wetland Reserve to spot rare Delacour's langurs and wild birds.",
    "tour5_time": "1 Day (08:30 - 18:00)",
    "tour5_inc": "Private Transfer, Cuc Phuong Ticket & Van Long Boat, Nature Guide, Lunch",
    "tour5_hl": "Cuc Phuong Forest, Thousand-Year Tree, Van Long Bamboo Boat",

    // Tour 6 Card
    "tour6_title": "Ninh Binh Countryside Adventure (Motorbike / Jeep / Bicycle)",
    "tour6_badge": "Rustic Countryside Experience",
    "tour6_desc": "Unique rural village experience: Cycling to Bich Dong Pagoda, Elephant Temple, local lunch, and hands-on Buffalo Caves activities (catching fish with basket, rice planting, buffalo riding, waterfall bath).",
    "tour6_time": "1 Day (08:30 - 17:00)",
    "tour6_inc": "Transport (Bicycle/Motorbike/Jeep), Local Guide, Tickets & Farming Gear, Lunch",
    "tour6_hl": "Tam Coc Villages, Bich Dong Pagoda, Buffalo Caves Farming Experience",

    // Tour 7 Card
    "tour7_title": "Bich Dong Pagoda - Thai Vy Temple - Thung Nham Bird Valley",
    "tour7_badge": "Heritage & Bird Sanctuary",
    "tour7_desc": "Cycling through Tam Coc rice fields to Bich Dong Pagoda & Thai Vy Temple, followed by an afternoon boat ride through Thung Nham Ecotourism Park to witness thousands of birds returning to their nests.",
    "tour7_time": "1 Day (08:30 - 16:30)",
    "tour7_inc": "AC Vehicle & Mountain Bikes, Thung Nham Ticket & Boat, Tour Guide, Lunch",
    "tour7_hl": "Rice Field Cycling, Bich Dong Pagoda, Thai Vy Temple, Thung Nham Bird Valley",

    // Limousine Service Card
    "limo_badge": "VIP Transportation Service",
    "limo_title": "Hanoi ⇆ Ninh Binh VIP Limousine Transfer",
    "limo_desc": "Premium 9-11 seat VIP Limousine service with door-to-door pickup from Hanoi / Noi Bai Airport directly to Sala Tam Coc Hotel. Luxury leather massage seats, high-speed Wi-Fi, USB charging ports.",
    "limo_feat1": "Reclining leather massage seats, USB chargers, bottled water & high-speed Wi-Fi",
    "limo_feat2": "Travel time: 1.5 hours via modern expressway",
    "limo_feat3": "Shared seat: 200,000₫ - 250,000₫ / seat | Private charter: Available on request",
    "btn_book_limo": "Book Limousine: 0942 060 533",
    "btn_zalo_support": "Zalo / WhatsApp Support",

    // Modal Dynamic Headings
    "modal_detailed_itinerary": "Detailed Itinerary",
    "modal_inclusions": "Inclusions",
    "modal_child_policy": "Child Policy",
    "modal_zalo_advice": "WhatsApp / Zalo Consultation",

    // Footer & Modals
    "footer_title": "Sala Tam Coc Hotel & Spa",
    "footer_tagline": "Tam Coc Area, Ninh Binh Province, Vietnam.",
    "footer_desc": "Delivering an unforgettable boutique vacation in the heart of UNESCO heritage.",
    "quick_links": "Quick Links",
    "contact_info": "Contact Info",
    "copyright": "Copyright © 2026 Sala Tam Coc Hotel & Spa. All rights reserved.",
    "tour_hotline_title": "24/7 Tour Hotline",
    "tour_advice_title": "Itinerary Advice",
    "btn_whatsapp_zalo": "WhatsApp / Zalo Advice",
    
    // Booking Modal
    "modal_title": "Booking Inquiries",
    "modal_sub": "Sala Tam Coc Hotel & Spa • Our team will contact you via Zalo/WhatsApp to confirm your reservation.",
    "label_name": "Full Name *",
    "label_phone": "Phone / WhatsApp / Zalo *",
    "label_email": "Email (Optional)",
    "label_room": "Room Category",
    "label_checkin": "Expected Check-in Date *",
    "label_checkout": "Expected Check-out Date *",
    "label_adults": "Number of Guests",
    "label_children": "Children",
    "label_note": "Special Requests (airport pickup, dietary, anniversary...)",
    "est_total": "Estimated Total:",
    "est_price_ref": "Estimated for 1 night • Reference price: 1,300,000 VND (includes buffet breakfast)",
    "btn_confirm_booking": "Submit Booking Request",
    "btn_cancel": "Cancel"
  },

  vi: {
    "address": "Tam Cốc, Tỉnh Ninh Bình, Việt Nam",
    "hotline_1": "+84 9 42 06 05 33",
    "hotline_2": "+84 9 86 96 98 98",
    "hotline_3": "+84 3 37 40 84 84 (Tiếng Pháp)",
    "nav_home": "Trang Chủ",
    "nav_rooms": "Hạng Phòng",
    "nav_offers": "Ưu Đãi",
    "nav_dining": "Nhà Hàng",
    "nav_spa": "Spa & Trị Liệu",
    "nav_tours": "Daily Tours",
    "nav_gallery": "Thư Viện Ảnh",
    "nav_contact": "Book Now",
    "btn_book_now": "Book Now",
    "btn_view_details": "Xem Chi Tiết",
    "btn_book_room": "Đặt Phòng",
    "btn_book_table": "Đặt Bàn Ngay",
    "btn_book_package": "Đặt Gói Này Ngay",
    "btn_book_tour": "Đặt Tour",
    "btn_explore_menu": "Khám Phá Thực Đơn",
    "btn_learn_more": "Tìm Hiểu Thêm",
    "btn_view_itinerary": "Xem Lịch Trình Chi Tiết",
    "btn_details": "Chi Tiết",

    "hero_sub_1": "WELCOME TO",
    "hero_title_1": "SALA TAM COC HOTEL & SPA",
    "hero_desc_1": "Khu nghỉ dưỡng thanh bình giữa lòng di sản Ninh Bình",
    "hero_sub_2": "Tầm Nhìn Ôm Trọn Vịnh Non Nước",
    "hero_title_2": "ROOFTOP INFINITY POOL",
    "hero_desc_2": "Đắm mình trong làn nước xanh mát và ngắm hoàng hôn buông xuống thung lũng Tam Cốc.",
    "hero_sub_3": "Mỹ Vị Đậm Chất Cố Đô",
    "hero_title_3": "AUTHENTIC DINING & BUFFET BREAKFAST",
    "hero_desc_3": "Thưởng thức tiệc buffet sáng tươi ngon mỗi ngày và đặc sản dê núi Ninh Bình danh tiếng.",
    "hero_sub_4": "Sự Đón Tiếp Nồng Hậu",
    "hero_title_4": "ELEGANT ROOMS & SUITES",
    "hero_desc_4": "Tiện nghi sang trọng, ban công view núi, bồn tắm nằm thư giãn và dịch vụ tận tâm.",

    "qb_title": "Kiểm Tra Phòng & Giá Ưu Đãi Tốt Nhất",
    "qb_checkin": "Ngày Nhận Phòng Dự Kiến",
    "qb_checkout": "Ngày Trả Phòng Dự Kiến",
    "qb_room": "Hạng Phòng Cho Chọn",
    "qb_guests": "Số Lượng Khách",
    "qb_submit": "Gửi Yêu Cầu Đặt Phòng",
    "guest_1": "1 Người Lớn",
    "guest_2": "2 Người Lớn",
    "guest_3": "3 Người Lớn",
    "guest_4": "4+ Người (Gia Đình)",

    "about_sub": "Khách Sạn Boutique Mới",
    "about_title": "Thiên Đường Nghỉ Dưỡng Sang Trọng Giữa Miền Di Sản",
    "about_desc_1": "Tọa lạc ngay trung tâm Tam Cốc, cách bến thuyền Tam Cốc chỉ vài bước chân, <strong>Sala Tam Cốc Hotel & Spa</strong> là điểm dừng chân boutique lý tưởng kết hợp hoàn hảo giữa vẻ đẹp thơ mộng của Ninh Bình và tiện nghi hiện đại.",
    "about_desc_2": "Mỗi phòng nghỉ đều sở hữu ban công thoáng đãng view núi non hoặc phố xá. Tại Sala Tam Cốc, từng chi tiết nhỏ đều được chăm chút tỉ mỉ nhằm đem lại trải nghiệm thư thái và ấn tượng nhất cho kỳ nghỉ của quý khách.",
    "feat_pool": "Hồ Bơi Vô Cực Sân Thượng View Núi Non",
    "feat_dining": "Nhà Hàng & Buffet Sáng Mỗi Ngày",
    "feat_spa": "Lotus Spa & Ngâm Chân Thảo Dược Cổ Truyền",
    "feat_tours": "Tư Vấn Tour Bản Địa & Xe Limousine VIP Đón Tiễn",

    "rooms_sub": "HỆ THỐNG PHÒNG NGHỈ",
    "rooms_title": "Hệ Thống Phòng Nghỉ Đẳng Cấp",
    "rooms_desc": "Mỗi căn phòng trang bị Wifi, Tivi, Điều hòa, Vòi sen, Trà cà phê, Nước lọc, Ô, Két sắt, Dép đi trong nhà, Áo choàng tắm.",
    "filter_all": "Tất Cả Hạng Phòng",
    "filter_double": "Phòng Đôi (Couples)",
    "filter_triple": "Phòng 3 Khách (Triple)",
    "filter_luxury": "Luxury & Bồn Tắm",
    "filter_family": "Phòng Gia Đình (Family)",
    "price_from": "Từ",
    "per_night": "/ đêm",

    "tours_sub": "Khám Phá & Trải Nghiệm",
    "tours_title": "Daily Tours & Xe Limousine",
    "tours_desc": "Sala Tam Cốc Hotel tổ chức các tour du lịch chuyên nghiệp, hướng dẫn viên bản địa am hiểu và dịch vụ xe Limousine VIP đưa đón tận nơi.",
    "tours_banner_sub": "Khám Phá Di Sản Thế Giới UNESCO",
    "tours_banner_title": "Tour Du Lịch & Dịch Vụ Xe Đưa Đón",
    "tours_banner_desc": "Hành trình khám phá danh thắng Ninh Bình với các tour du lịch 1 ngày trọn gói và xe Limousine VIP đón tận nơi.",
    "btn_view_all_tours": "Xem Tất Cả 7 Tour Du Lịch Ninh Bình & Xe Limousine",
    "tour_duration_label": "Thời gian:",
    "tour_inclusions_label": "Bao gồm:",
    "tour_highlights_label": "Điểm nổi bật:",
    "tour_1_day": "1 Ngày",
    "tour_experience": "Trải Nghiệm",

    // Tour 1 Card
    "tour1_title": "Hoa Lư - Bái Đính - Tràng An - Hang Múa",
    "tour1_badge": "Best Seller Daily Tour",
    "tour1_desc": "Hành trình 1 ngày trọn vẹn khám phá Cố đô Hoa Lư ngàn năm, chiêm bái Chùa Bái Đính lớn nhất ĐNÁ, xuôi thuyền Di sản Tràng An và chinh phục 500 bậc đá Đỉnh Ngọa Long Hang Múa.",
    "tour1_time": "1 Ngày (08:00 - 17:00)",
    "tour1_inc": "Xe máy lạnh, HDV, vé thắng cảnh, thuyền Tràng An, ăn trưa đặc sản, nước uống",
    "tour1_hl": "Cố đô, Chùa Bái Đính, Thuyền Tràng An, Đỉnh Ngọa Long",

    // Tour 2 Card
    "tour2_title": "Hoa Lư - Tràng An - Hang Múa - Chùa Bích Động",
    "tour2_badge": "Di Sản & Hang Động Cổ",
    "tour2_desc": "Khám phá Chùa Bích Động cổ kính tựa lưng núi đá vôi xây dựng năm 1428, thử thách 500 bậc đá Hang Múa ngắm thung lũng Tam Cốc, kết hợp Cố đô Hoa Lư và thuyền Tràng An.",
    "tour2_time": "1 Ngày (08:30 - 16:30)",
    "tour2_inc": "Xe đưa đón, HDV, vé thắng cảnh & vé thuyền, bữa trưa đặc sản, nước uống",
    "tour2_hl": "Chùa Bích Động 1428, Hang Múa View Tam Cốc, Hoa Lư, Tràng An",

    // Tour 3 Card
    "tour3_title": "Bái Đính - Tràng An - Hang Múa",
    "tour3_badge": "Hành Trình Tâm Linh & Thiên Nhiên",
    "tour3_desc": "Hành trình tâm linh chiêm bái đại lễ Chùa Bái Đính, đi thuyền chèo tay xuyên các hang động mát lạnh Tràng An và thưởng ngoạn hoàng hôn tuyệt đẹp trên đỉnh Hang Múa.",
    "tour3_time": "1 Ngày (08:00 - 17:00)",
    "tour3_inc": "Xe máy lạnh, HDV, vé tham quan & thuyền Tràng An, bữa trưa nhà hàng",
    "tour3_hl": "Chùa Bái Đính kỷ lục, Thuyền Tràng An, Hang Múa panorama",

    // Tour 4 Card
    "tour4_title": "Vườn Quốc Gia Cúc Phương 1 Ngày",
    "tour4_badge": "Trekking Rừng Nguyên Sinh",
    "tour4_desc": "Trải nghiệm rừng nguyên sinh Cúc Phương: Thăm Trung tâm Cứu hộ Linh trưởng Quý hiếm, Động Người Xưa (7.500 năm), ăn trưa giữa rừng Bống và trekking ngắm Cây Trò Ngàn Năm.",
    "tour4_time": "1 Ngày (08:00 - 16:00)",
    "tour4_inc": "Xe đưa đón, HDV chuyên nghiệp, vé rừng Cúc Phương, bữa trưa giữa rừng",
    "tour4_hl": "Cứu hộ linh trưởng, Động Người Xưa, Cây Trò ngàn năm cổ thụ",

    // Tour 5 Card
    "tour5_title": "Vườn Quốc Gia Cúc Phương & Đầm Vân Long",
    "tour5_badge": "Du Lịch Sinh Thái Rừng & Đầm Lầy",
    "tour5_desc": "Kết hợp hành trình trekking rừng Cúc Phương buổi sáng và buổi chiều đi thuyền tre khám phá Khu bảo tồn thiên nhiên ngập nước Đầm Vân Long ngắm Voọc mông trắng quý hiếm.",
    "tour5_time": "1 Ngày (08:30 - 18:00)",
    "tour5_inc": "Xe riêng đưa đón, vé Cúc Phương & thuyền Vân Long, HDV am hiểu thiên nhiên, ăn trưa",
    "tour5_hl": "Rừng Cúc Phương, Cây Trò ngàn năm, Thuyền tre Đầm Vân Long",

    // Tour 6 Card
    "tour6_title": "Khám Phá Miền Quê Ninh Bình (Xe Máy / Jeep / Xe Đạp)",
    "tour6_badge": "Trải Nghiệm Làng Quê Độc Đáo",
    "tour6_desc": "Tour trải nghiệm làng quê nông thôn độc đáo: Đạp xe ghé Chùa Bích Động, Đền Voi, ăn trưa quê và tham gia hoạt động Buffalo Caves (bắt cá bằng nơm, cấy lúa, cưỡi trâu, tắm thác).",
    "tour6_time": "1 Ngày (08:30 - 17:00)",
    "tour6_inc": "Phương tiện (Xe đạp/Xe máy/Jeep), HDV bản địa, vé & dụng cụ trải nghiệm, ăn trưa",
    "tour6_hl": "Làng quê Tam Cốc, Chùa Bích Động, Trải nghiệm nông dân Buffalo Caves",

    // Tour 7 Card
    "tour7_title": "Chùa Bích Động - Đền Thái Vi - Vườn Chim Thung Nham",
    "tour7_badge": "Di Sản & Vườn Chim Sinh Thái",
    "tour7_desc": "Hành trình đạp xe xuyên qua cánh đồng lúa Tam Cốc ghé thăm Chùa Bích Động & Đền Thái Vi, buổi chiều ngồi thuyền tre khám phá Khu sinh thái Vườn chim Thung Nham ngắm chim trời kéo về tổ.",
    "tour7_time": "1 Ngày (08:30 - 16:30)",
    "tour7_inc": "Xe ô tô & xe đạp, vé Thung Nham & thuyền chèo, HDV, bữa trưa đặc sản",
    "tour7_hl": "Đạp xe đồng lúa, Chùa Bích Động, Đền Thái Vi, Vườn chim Thung Nham",

    // Limousine Service Card
    "limo_badge": "Dịch Vụ Vận Chuyển VIP",
    "limo_title": "Hà Nội ⇆ Ninh Bình VIP Limousine",
    "limo_desc": "Dịch vụ xe Limousine VIP 9-11 chỗ đưa đón tận nơi từ Hà Nội / Sân bay Nội Bài về thẳng Khách sạn Sala Tam Cốc. Ghế da massage cao cấp, Wi-Fi tốc độ cao, cổng sạc USB.",
    "limo_feat1": "Ghế da massage thư giãn, sạc USB, nước uống & Wi-Fi tốc độ cao",
    "limo_feat2": "Thời gian di chuyển: 1.5 giờ qua đường cao tốc hiện đại",
    "limo_feat3": "Vé ghép: 200,000₫ - 250,000₫ / ghế | Xe riêng: Hỗ trợ theo yêu cầu",
    "btn_book_limo": "Đặt Xe Limousine: 0942 060 533",
    "btn_zalo_support": "Hỗ Trợ Qua Zalo",

    // Modal Dynamic Headings
    "modal_detailed_itinerary": "Lịch Trình Chi Tiết",
    "modal_inclusions": "Dịch Vụ Bao Gồm",
    "modal_child_policy": "Chính Sách Trẻ Em",
    "modal_zalo_advice": "Tư Vấn Zalo / WhatsApp",

    // Footer & Modals
    "footer_title": "Sala Tam Coc Hotel & Spa",
    "footer_tagline": "Tam Cốc, Ninh Bình, Việt Nam.",
    "footer_desc": "Đem đến cho bạn kỳ nghỉ boutique sang trọng trọn vẹn tại miền di sản.",
    "quick_links": "Liên Kết Nhanh",
    "contact_info": "Thông Tin Liên Hệ",
    "copyright": "Copyright © 2026 Sala Tam Coc Hotel & Spa. All rights reserved.",
    "tour_hotline_title": "Hotline Tour 24/7",
    "tour_advice_title": "Tư Vấn Lịch Trình",
    "btn_whatsapp_zalo": "Tư Vấn Zalo / WhatsApp",

    // Booking Modal
    "modal_title": "Yêu Cầu Đặt Phòng",
    "modal_sub": "Sala Tam Cốc Hotel & Spa • Bộ phận tư vấn sẽ liên hệ qua Zalo/WhatsApp để xác nhận phòng cho bạn.",
    "label_name": "Họ và Tên *",
    "label_phone": "Số Điện Thoại / WhatsApp / Zalo *",
    "label_email": "Email (Không bắt buộc)",
    "label_room": "Hạng Phòng Lựa Chọn",
    "label_checkin": "Ngày Nhận Phòng Dự Kiến *",
    "label_checkout": "Ngày Trả Phòng Dự Kiến *",
    "label_adults": "Số Lượng Khách",
    "label_children": "Trẻ Em",
    "label_note": "Yêu Cầu Đặc Biệt (đón sân bay, ăn chay, kỷ niệm ngày cưới...)",
    "est_total": "Tổng Giá Tạm Tính:",
    "est_price_ref": "Tạm tính cho 1 đêm • Giá tham khảo: 1.300.000 VNĐ (đã bao gồm ăn sáng buffet)",
    "btn_confirm_booking": "Gửi Yêu Cầu Đặt Phòng",
    "btn_cancel": "Hủy Bỏ"
  }
};

// Function to update webpage content based on language
function setLanguage(lang) {
  if (!translations[lang]) lang = 'en';
  localStorage.setItem('sala_lang', lang);
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  const currentFlagEl = document.querySelector('.current-lang-display');
  if (currentFlagEl) {
    const langMap = {
      en: '<span class="lang-flag">🇬🇧</span> GB English',
      vi: '<span class="lang-flag">🇻🇳</span> Tiếng Việt',
      ru: '<span class="lang-flag">🇷🇺</span> Русский',
      fr: '<span class="lang-flag">🇫🇷</span> Français'
    };
    currentFlagEl.innerHTML = langMap[lang] || '<span class="lang-flag">🇬🇧</span> GB English';
  }

  // Update active state in language dropdowns
  document.querySelectorAll('.lang-dropdown a').forEach(a => {
    if (a.getAttribute('data-lang') === lang) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });

  // Dispatch custom language change event
  document.dispatchEvent(new CustomEvent('salaLanguageChange', { detail: { lang } }));
}

// Initialize on DOM load (Default to English)
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('sala_lang') || 'en';
  setLanguage(savedLang);

  // Toggle dropdown on click
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const dropdown = btn.nextElementSibling;
      if (dropdown && dropdown.classList.contains('lang-dropdown')) {
        const isVisible = dropdown.style.display === 'block';
        document.querySelectorAll('.lang-dropdown').forEach(d => d.style.display = 'none');
        dropdown.style.display = isVisible ? 'none' : 'block';
      }
    });
  });

  // Close dropdown on outside click
  document.addEventListener('click', () => {
    document.querySelectorAll('.lang-dropdown').forEach(d => d.style.display = '');
  });

  // Bind click events on language items
  document.querySelectorAll('[data-lang]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const selected = btn.getAttribute('data-lang');
      setLanguage(selected);
      document.querySelectorAll('.lang-dropdown').forEach(d => d.style.display = '');
    });
  });
});
