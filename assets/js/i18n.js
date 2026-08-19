/**
 * SALA TAM CỐC HOTEL & SPA - MULTILINGUAL ENGINE (i18n)
 * Supported Languages: English (en - default), Vietnamese (vi), Russian (ru), French (fr)
 */

const translations = {
  en: {
    // Topbar & Nav
    "address": "Dong Dot Area, Nam Hoa Lu, Ninh Binh Province, Vietnam",
    "hotline_1": "Hotline 1: 0942 060 533",
    "hotline_2": "Hotline 2: 0986 969 898",
    "nav_home": "Home",
    "nav_rooms": "Rooms & Suites",
    "nav_offers": "Special Offers",
    "nav_dining": "Dining & Bar",
    "nav_spa": "Spa & Wellness",
    "nav_tours": "Ninh Binh Tours",
    "nav_gallery": "Photo Gallery",
    "nav_contact": "Contact",
    "btn_book_now": "Book Now",
    "btn_view_details": "View Details",
    "btn_book_room": "Book Room",
    "btn_book_table": "Reserve Table",
    "btn_book_package": "Book Package",
    "btn_book_tour": "Book Tour",
    "btn_explore_menu": "Explore Menu",
    "btn_learn_more": "Learn More",
    "btn_view_itinerary": "View Itinerary",

    // Hero Slider
    "hero_sub_1": "Boutique Luxury In The Heart Of Tam Coc",
    "hero_title_1": "SALA TAM COC HOTEL & SPA",
    "hero_desc_1": "An oasis of peace nestled amid the limestone peaks and golden rice paddies of legendary Ninh Binh.",
    "hero_sub_2": "Panoramic Limestone Views",
    "hero_title_2": "ROOFTOP INFINITY POOL",
    "hero_desc_2": "Immerse yourself in refreshing crystal water while taking in breathtaking sunsets over Tam Coc valley.",
    "hero_sub_3": "Flavors Of Ancient Capital",
    "hero_title_3": "AUTHENTIC DINING & BUFFET",
    "hero_desc_3": "Savor daily fresh international breakfast buffet and traditional Ninh Binh goat delicacies.",
    "hero_sub_4": "Warm Vietnamese Hospitality",
    "hero_title_4": "ELEGANT ROOMS & SUITES",
    "hero_desc_4": "Modern amenities, scenic balconies, luxury soaking tubs, and heartfelt boutique service.",

    // Quick Booking Bar
    "qb_title": "Check Availability & Best Rates",
    "qb_checkin": "Check-in Date",
    "qb_checkout": "Check-out Date",
    "qb_room": "Select Room Type",
    "qb_guests": "Guests",
    "qb_submit": "Check Rates",
    "guest_1": "1 Adult",
    "guest_2": "2 Adults",
    "guest_3": "3 Adults",
    "guest_4": "4+ Adults (Family)",

    // About Section
    "about_sub": "Welcome To Sala Tam Coc",
    "about_title": "A Luxurious Haven Amid Legendary Landscapes",
    "about_desc_1": "Located in Dong Dot area, adjacent to the famous Tam Coc - Bich Dong boat wharf, <strong>Sala Tam Coc Hotel & Spa</strong> is a premier luxury boutique retreat where timeless heritage meets modern comfort.",
    "about_desc_2": "Featuring 100% airy rooms with mountain or city view balconies, rooftop infinity swimming pool, refined restaurant, and rejuvenating lotus spa, we are committed to making your stay in Ninh Binh truly unforgettable.",
    "feat_pool": "Rooftop Infinity Swimming Pool with Mountain View",
    "feat_dining": "Restaurant & Daily Complimentary Breakfast Buffet",
    "feat_spa": "Lotus Spa Herbal Baths & Relaxing Body Therapy",
    "feat_tours": "Private Tour Bookings & VIP Limousine Transfer",
    "feat_buffet": "Daily International & Local Breakfast Buffet",

    // Rooms Section
    "rooms_sub": "Luxury Accommodation",
    "rooms_title": "Rooms & Suites Collection",
    "rooms_desc": "All rooms are impeccably designed with warm wooden aesthetics, private balconies, plush beds, and panoramic views of nature.",
    "filter_all": "All Rooms",
    "filter_double": "Couples / Double",
    "filter_triple": "Triple (3 Guests)",
    "filter_luxury": "Luxury with Bathtub",
    "filter_family": "Family Suites",
    "price_from": "From",
    "per_night": "/ night",

    // Room Names & Descriptions
    "r1_name": "Superior Double City View",
    "r1_desc": "Cozy and bright with large city-view windows, comfortable King bed, and complete upscale amenities.",
    "r2_name": "Superior Triple City View",
    "r2_desc": "Spacious room designed for 3 guests with 1 King bed and 1 Single bed, offering street and mountain view.",
    "r3_name": "Deluxe Double Room Balcony",
    "r3_desc": "Private open balcony overlooking Tam Coc limestone hills, refined wooden interior, and quiet ambiance.",
    "r4_name": "Deluxe Family Room Balcony",
    "r4_desc": "Ideal for families of 4, featuring 2 large double beds, airy mountain balcony, and ample living space.",
    "r5_name": "Luxury Double with Balcony & Bath tub",
    "r5_desc": "Our signature luxury room with a panoramic glass soaking tub, private balcony, and king bed.",
    "r6_name": "Luxury Twin with Balcony & Bath tub",
    "r6_desc": "Two plush single beds, scenic balcony bathed in morning sunlight, and relaxing freestanding bathtub.",
    "r7_name": "Family Connecting Room",
    "r7_desc": "Two interconnected bedrooms with 2 private bathrooms, ensuring privacy and closeness for big families.",

    // Offers Section
    "offers_sub": "Promotions & Packages",
    "offers_title": "Special Holiday Packages",
    "offers_desc": "Enjoy exclusive savings, complimentary tour tickets, and VIP transport when booking directly on our official website.",
    "badge_hot": "Hot Deal 25% Off",
    "badge_vip": "VIP Inclusive Combo",
    "badge_family": "Family Saver",
    "offer1_title": "Romantic Tam Coc Getaway (3D2N)",
    "offer1_desc": "An idyllic retreat for couples exploring Ninh Binh scenic beauty with luxury boutique hospitality.",
    "offer1_f1": "02 nights in Deluxe Double Balcony room",
    "offer1_f2": "02 Tam Coc - Bich Dong boat rowing tickets",
    "offer1_f3": "Unlimited rooftop infinity pool access",
    "offer1_f4": "Daily breakfast buffet & welcome drink",

    "offer2_title": "Ninh Binh Heritage Discovery (4D3N)",
    "offer2_desc": "Complete journey exploring Trang An, Hang Mua dragon peak, ancient capital Hoa Lu and Bai Dinh pagoda.",
    "offer2_f1": "03 nights in Luxury Double with Balcony & Bathtub",
    "offer2_f2": "2-way VIP Limousine transfer Hanoi - Ninh Binh",
    "offer2_f3": "Private guided sightseeing tour",
    "offer2_f4": "Special local dining experience at Sala Restaurant",

    "offer3_title": "Family Weekend Retreat (2D1N)",
    "offer3_desc": "A memorable weekend escape for the whole family amidst fresh countryside nature.",
    "offer3_f1": "01 night in spacious Family Connecting Room (55m²)",
    "offer3_f2": "Free stay for 2 children under 6 years old",
    "offer3_f3": "20% discount on dining & Lotus Spa therapy",
    "offer3_f4": "Complimentary tandem bicycles for village tours",

    // Dining Section
    "dining_sub": "Culinary Heritage",
    "dining_title": "Sala Restaurant & Daily Breakfast Buffet",
    "dining_desc": "Sala Restaurant delivers an exquisite gastronomic journey showcasing famous Ninh Binh mountain goat specialties, crispy rice crackers, hill chicken, and a fresh daily international buffet.",
    "serving_hours": "Serving Hours:",
    "hours_val": "06:00 - 22:30 Daily",
    "capacity": "Capacity:",
    "capacity_val": "Up to 120 Guests",
    "buffet_time": "Breakfast Buffet:",
    "buffet_val": "06:30 - 09:30 Daily",

    // Spa Section
    "spa_sub": "Mind & Body Harmony",
    "spa_title": "Sala Lotus Spa & Wellness",
    "spa_desc": "After an exhilarating day exploring Tam Coc caves and peaks, unwind in fragrant herbal steam and therapeutic massage rooted in traditional Vietnamese medicine.",
    "spa_1_title": "Traditional Herbal Foot Soak",
    "spa_1_desc": "Boosts blood circulation, relieving muscle tension after climbing Hang Mua peak.",
    "spa_2_title": "Hot Stone Full Body Massage",
    "spa_2_desc": "Natural volcanic basalt stones with organic lotus essential oils to release deep stress.",
    "spa_3_title": "Lotus Essential Oil Body Therapy",
    "spa_3_desc": "Replenishes skin radiance, restores mental serenity and physical vitality.",

    // Tours Section
    "tours_sub": "Exploration & Adventures",
    "tours_title": "Ninh Binh Sightseeing Tours",
    "tours_desc": "Sala Tam Coc Hotel organizes professional tours, licensed local guides, and top-tier limousine transfers.",
    "tour1_title": "Tam Coc - Bich Dong Rowing Boat",
    "tour1_desc": "Glide along Ngo Dong river through three karst caves and visit historic Bich Dong pagoda.",
    "tour2_title": "Trang An UNESCO Scenic Complex",
    "tour2_desc": "Magnificent boat ride through mystical aquatic caves and serene ancient water temples.",
    "tour3_title": "Hang Mua Dragon Peak Trek",
    "tour3_desc": "Ascend 500 stone steps to Ngoa Long peak for an awe-inspiring 360-degree panorama.",
    "tour4_title": "VIP Hanoi ⇆ Ninh Binh Limousine",
    "tour4_desc": "Door-to-door luxury leather seating transfer with high-speed Wi-Fi and USB chargers.",

    // Footer & Modals
    "footer_tagline": "Dong Dot Area, Nam Hoa Lu, Ninh Binh Province, Vietnam. Delivering an unforgettable boutique vacation in the heart of UNESCO heritage.",
    "quick_links": "Quick Links",
    "contact_info": "Contact Info",
    "copyright": "Copyright © 2026 Sala Tam Coc Hotel & Spa. All rights reserved.",
    
    // Booking Modal
    "modal_title": "Direct Room Reservation",
    "modal_sub": "Sala Tam Coc Hotel & Spa • Best Rate Guarantee",
    "label_name": "Full Name *",
    "label_phone": "Phone / WhatsApp / Zalo *",
    "label_email": "Email Address (for instant confirmation) *",
    "label_room": "Select Room Type",
    "label_checkin": "Check-in Date *",
    "label_checkout": "Check-out Date *",
    "label_adults": "Number of Adults",
    "label_children": "Children",
    "label_note": "Special Requests (airport pickup, dietary, anniversary...)",
    "est_total": "Estimated Total:",
    "btn_confirm_booking": "Confirm Reservation",
    "btn_cancel": "Cancel"
  },

  vi: {
    "address": "Khu Đồng Đốt, Phường Nam Hoa Lư, Tỉnh Ninh Bình, Việt Nam",
    "hotline_1": "Hotline 1: 0942 060 533",
    "hotline_2": "Hotline 2: 0986 969 898",
    "nav_home": "Trang Chủ",
    "nav_rooms": "Hạng Phòng",
    "nav_offers": "Ưu Đãi",
    "nav_dining": "Nhà Hàng & Bar",
    "nav_spa": "Spa & Trị Liệu",
    "nav_tours": "Tour Ninh Bình",
    "nav_gallery": "Thư Viện Ảnh",
    "nav_contact": "Liên Hệ",
    "btn_book_now": "Đặt Phòng Ngay",
    "btn_view_details": "Xem Chi Tiết",
    "btn_book_room": "Đặt Phòng",
    "btn_book_table": "Đặt Bàn Ngay",
    "btn_book_package": "Đặt Gói Này Ngay",
    "btn_book_tour": "Đặt Tour",
    "btn_explore_menu": "Khám Phá Thực Đơn",
    "btn_learn_more": "Tìm Hiểu Thêm",
    "btn_view_itinerary": "Xem Lịch Trình",

    "hero_sub_1": "Kỳ Nghỉ Thượng Lưu Tại Trái Tim Tam Cốc",
    "hero_title_1": "SALA TAM CỐC HOTEL & SPA",
    "hero_desc_1": "Không gian nghỉ dưỡng thanh bình giữa non nước hữu tình và cánh đồng lúa thơ mộng của Ninh Bình.",
    "hero_sub_2": "Tầm Nhìn Ôm Trọn Vịnh Non Nước",
    "hero_title_2": "HỒ BƠI VÔ CỰC SÂN THƯỢNG",
    "hero_desc_2": "Đắm mình trong làn nước xanh mát và ngắm hoàng hôn buông xuống thung lũng Tam Cốc.",
    "hero_sub_3": "Mỹ Vị Đậm Chất Cố Đô",
    "hero_title_3": "ẨM THỰC ĐẶC SẮC & BUFFET SÁNG",
    "hero_desc_3": "Thưởng thức tiệc buffet sáng tươi ngon mỗi ngày và đặc sản dê núi Ninh Bình danh tiếng.",
    "hero_sub_4": "Sự Đón Tiếp Nồng Hậu",
    "hero_title_4": "HỆ THỐNG PHÒNG NGHỈ ĐẲNG CẤP",
    "hero_desc_4": "Tiện nghi sang trọng, ban công view núi, bồn tắm nằm thư giãn và dịch vụ tận tâm.",

    "qb_title": "Kiểm Tra Phòng & Giá Ưu Đãi Tốt Nhất",
    "qb_checkin": "Ngày Nhận Phòng",
    "qb_checkout": "Ngày Trả Phòng",
    "qb_room": "Chọn Hạng Phòng",
    "qb_guests": "Số Lượng Khách",
    "qb_submit": "Xem Giá & Đặt",
    "guest_1": "1 Người lớn",
    "guest_2": "2 Người lớn",
    "guest_3": "3 Người lớn",
    "guest_4": "4+ Người lớn (Gia đình)",

    "about_sub": "Chào Mừng Đến Với Sala Tam Cốc",
    "about_title": "Không Gian Nghỉ Dưỡng Tinh Hoa Giữa Lòng Di Sản",
    "about_desc_1": "Tọa lạc tại Khu Đồng Đốt, kề cận bến thuyền Tam Cốc - Bích Động, <strong>Sala Tam Cốc Hotel & Spa</strong> là điểm dừng chân lý tưởng kết hợp hoàn hảo giữa nét mộc mạc của thiên nhiên và tiện nghi boutique hiện đại.",
    "about_desc_2": "Sở hữu 100% phòng nghỉ ban công thoáng đãng, bể bơi vô cực sân thượng, nhà hàng buffet và spa thảo dược, chúng tôi mang đến cho bạn kỳ nghỉ trọn vẹn tại Ninh Bình.",
    "feat_pool": "Hồ Bơi Vô Cực Sân Thượng View Núi Non",
    "feat_dining": "Nhà Hàng Buffet & Đặc Sản Cố Đô Ninh Bình",
    "feat_spa": "Lotus Spa & Ngâm Chân Thảo Dược Cổ Truyền",
    "feat_tours": "Tư Vấn Tour Bản Địa & Xe Limousine VIP Đón Tiễn",
    "feat_buffet": "Buffet Sáng Miễn Phí Mỗi Ngày Cho Khách Lưu Trú",

    "rooms_sub": "Nghỉ Dưỡng Thượng Lưu",
    "rooms_title": "Hệ Thống Phòng Nghỉ Đẳng Cấp",
    "rooms_desc": "Mỗi căn phòng đều được thiết kế tinh xảo với nội thất gỗ ấm cúng, ban công riêng ngắm trọn cảnh sắc thiên nhiên non nước.",
    "filter_all": "Tất Cả Hạng Phòng",
    "filter_double": "Phòng Đôi (Couples)",
    "filter_triple": "Phòng 3 Khách (Triple)",
    "filter_luxury": "Luxury & Bồn Tắm",
    "filter_family": "Phòng Gia Đình (Family)",
    "price_from": "Từ",
    "per_night": "/ đêm",

    "r1_name": "Superior Double City View",
    "r1_desc": "Không gian ấm cúng, cửa sổ lớn đón ánh sáng tự nhiên hướng phố, trang bị giường King và tiện nghi cao cấp.",
    "r2_name": "Superior Triple City View",
    "r2_desc": "Phòng rộng rãi dành cho 3 khách với 1 giường đôi và 1 giường đơn, tầm nhìn thoáng mát hướng phố và núi.",
    "r3_name": "Deluxe Double Room Balcony",
    "r3_desc": "Ban công riêng ngắm trọn vẹn cảnh sắc núi đá Tam Cốc, nội thất gỗ thanh lịch và không gian yên tĩnh.",
    "r4_name": "Deluxe Family Room Balcony",
    "r4_desc": "Thiết kế lý tưởng cho gia đình 4 người với 2 giường lớn, ban công rộng đón gió núi trong lành.",
    "r5_name": "Luxury Double with Balcony & Bath tub",
    "r5_desc": "Hạng phòng cao cấp với bồn tắm nằm thư giãn view kính trong suốt sang trọng và ban công view núi.",
    "r6_name": "Luxury Twin with Balcony & Bath tub",
    "r6_desc": "2 giường đơn êm ái, ban công ngập tràn ánh nắng và bồn tắm nằm thư giãn đẳng cấp.",
    "r7_name": "Family Connecting Room",
    "r7_desc": "2 phòng ngủ thông nhau có cửa kết nối, 2 phòng tắm riêng biệt mang lại sự riêng tư tối đa cho đại gia đình.",

    "offers_sub": "Khuyến Mãi & Combo Nghỉ Dưỡng",
    "offers_title": "Gói Ưu Đãi Đặc Biệt",
    "offers_desc": "Tận hưởng kỳ nghỉ trọn vẹn với các gói ưu đãi tiết kiệm hấp dẫn nhất khi đặt phòng trực tiếp trên website.",
    "badge_hot": "Ưu Đãi Hot 25%",
    "badge_vip": "Combo Trọn Gói VIP",
    "badge_family": "Gia Đình Tiết Kiệm",
    "offer1_title": "Kỳ Nghỉ Thơ Mộng Tam Cốc (3N2Đ)",
    "offer1_desc": "Gói combo lý tưởng cho cặp đôi trải nghiệm cảnh sắc Ninh Bình êm đềm và dịch vụ cao cấp.",
    "offer1_f1": "02 đêm nghỉ tại phòng Deluxe Double Balcony",
    "offer1_f2": "02 vé chèo thuyền khám phá Tam Cốc - Bích Động",
    "offer1_f3": "Miễn phí sử dụng hồ bơi vô cực ngắm trọn núi non",
    "offer1_f4": "Buffet sáng hàng ngày & đồ uống chào mừng",

    "offer2_title": "Khám Phá Di Sản Ninh Bình (4N3Đ)",
    "offer2_desc": "Hành trình khám phá trọn vẹn Tràng An - Hang Múa - Cố Đô Hoa Lư - Chùa Bái Đính.",
    "offer2_f1": "03 đêm nghỉ dưỡng tại Luxury Double Balcony & Bồn Tắm",
    "offer2_f2": "Xe Limousine VIP đưa đón 2 chiều Hà Nội - Ninh Bình",
    "offer2_f3": "Tour riêng có hướng dẫn viên tham quan danh thắng",
    "offer2_f4": "Bữa tối đặc sản Dê núi Ninh Bình tại Nhà hàng Sala",

    "offer3_title": "Family Weekend Retreat (2N1Đ)",
    "offer3_desc": "Kỳ nghỉ cuối tuần ấm áp dành cho cả gia đình cùng tận hưởng không khí trong lành miền di sản.",
    "offer3_f1": "01 đêm nghỉ tại Family Connecting Room rộng 55m²",
    "offer3_f2": "Miễn phí cho 02 trẻ em dưới 6 tuổi đi cùng",
    "offer3_f3": "Giảm 20% toàn bộ dịch vụ ăn uống & trị liệu Spa",
    "offer3_f4": "Miễn phí xe đạp đôi dạo quanh làng quê Ninh Bình",

    "dining_sub": "Tinh Hoa Ẩm Thực Cố Đô",
    "dining_title": "Nhà Hàng & Buffet Sáng Sala Tam Cốc",
    "dining_desc": "Nhà hàng Sala mang đến trải nghiệm vị giác thăng hoa với đặc sản dê núi, cơm cháy sốt đậm đà cùng tiệc buffet sáng phong phú tươi mới mỗi ngày.",
    "serving_hours": "Giờ phục vụ:",
    "hours_val": "06:00 - 22:30 Hàng ngày",
    "capacity": "Sức chứa:",
    "capacity_val": "Tối đa 120 khách",
    "buffet_time": "Buffet sáng:",
    "buffet_val": "06:30 - 09:30 Hàng ngày",

    "spa_sub": "Chăm Sóc Thân & Tâm",
    "spa_title": "Sala Lotus Spa & Wellness",
    "spa_desc": "Thả mình trong hương thơm thảo mộc tự nhiên và các liệu pháp bấm huyệt y học cổ truyền giúp tái tạo năng lượng sau ngày dài tham quan.",
    "spa_1_title": "Ngâm Chân Thảo Dược Cổ Truyền",
    "spa_1_desc": "Giúp lưu thông khí huyết, giải tỏa mệt mỏi sau chuyến leo núi Hang Múa.",
    "spa_2_title": "Massage Toàn Thân Đá Nóng Tự Nhiên",
    "spa_2_desc": "Đá bazan giữ nhiệt kết hợp tinh dầu hoa sen tự nhiên giải tỏa căng cơ.",
    "spa_3_title": "Trị Liệu Tinh Dầu Thảo Mộc Phục Hồi",
    "spa_3_desc": "Nuôi dưỡng làn da, thư giãn sâu tinh thần và phục hồi thể lực.",

    "tours_sub": "Hành Trình Khám Phá",
    "tours_title": "Tour Du Lịch Danh Thắng Ninh Bình",
    "tours_desc": "Khách sạn cung cấp tour tham quan chuyên nghiệp, hướng dẫn viên bản địa và dịch vụ xe đưa đón Limousine cao cấp.",
    "tour1_title": "Chèo Thuyền Tam Cốc - Bích Động",
    "tour1_desc": "Ngồi thuyền nan xuôi dòng sông Ngô Đồng qua ba hang động kỳ vĩ ngắm lúa vàng.",
    "tour2_title": "Quần Thể Danh Thắng Tràng An",
    "tour2_desc": "Di sản Thế giới UNESCO với hệ thống hang động xuyên thủy và đền đài linh thiêng.",
    "tour3_title": "Chinh Phục Đỉnh Núi Hang Múa",
    "tour3_desc": "Thử thách gần 500 bậc đá lên đỉnh Ngọa Long ngắm toàn cảnh Tam Cốc ngoạn mục.",
    "tour4_title": "Xe Limousine VIP Hà Nội ⇆ Ninh Bình",
    "tour4_desc": "Đưa đón tận nơi ghế da cao cấp êm ái, cổng sạc điện thoại và Wi-Fi miễn phí.",

    "footer_tagline": "Khu Đồng Đốt, Phường Nam Hoa Lư, Tỉnh Ninh Bình. Đem đến cho bạn kỳ nghỉ boutique sang trọng trọn vẹn tại miền di sản.",
    "quick_links": "Liên Kết Nhanh",
    "contact_info": "Thông Tin Liên Hệ",
    "copyright": "Copyright © 2026 Sala Tam Cốc Hotel & Spa. All rights reserved.",

    "modal_title": "Đặt Phòng Trực Tiếp",
    "modal_sub": "Sala Tam Cốc Hotel & Spa • Đảm Bảo Giá Tốt Nhất",
    "label_name": "Họ và tên khách hàng *",
    "label_phone": "Số điện thoại / Zalo *",
    "label_email": "Địa chỉ Email (nhận xác nhận đặt phòng) *",
    "label_room": "Hạng phòng lựa chọn",
    "label_checkin": "Ngày nhận phòng *",
    "label_checkout": "Ngày trả phòng *",
    "label_adults": "Số lượng khách",
    "label_children": "Trẻ em đi kèm",
    "label_note": "Yêu cầu đặc biệt (đón sân bay, ăn chay, kỷ niệm...)",
    "est_total": "Tổng ước tính:",
    "btn_confirm_booking": "Xác Nhận Đặt Phòng",
    "btn_cancel": "Hủy Bỏ"
  },

  ru: {
    "address": "Район Донг Дот, Нам Хоа Лу, Провинция Ниньбинь, Вьетнам",
    "hotline_1": "Горячая линия 1: +84 942 060 533",
    "hotline_2": "Горячая линия 2: +84 986 969 898",
    "nav_home": "Главная",
    "nav_rooms": "Номера и люксы",
    "nav_offers": "Спецпредложения",
    "nav_dining": "Ресторан и бар",
    "nav_spa": "Спа и велнес",
    "nav_tours": "Туры в Ниньбинь",
    "nav_gallery": "Галерея",
    "nav_contact": "Контакты",
    "btn_book_now": "Забронировать",
    "btn_view_details": "Подробнее",
    "btn_book_room": "Забронировать номер",
    "btn_book_table": "Заказать столик",
    "btn_book_package": "Выбрать пакет",
    "btn_book_tour": "Заказать тур",
    "btn_explore_menu": "Посмотреть меню",
    "btn_learn_more": "Узнать больше",
    "btn_view_itinerary": "Маршрут",

    "hero_sub_1": "Бутик-роскошь в сердце Там Кок",
    "hero_title_1": "SALA TAM COC HOTEL & SPA",
    "hero_desc_1": "Оазис спокойствия среди карстовых вершин и рисовых полей легендарного Ниньбиня.",
    "hero_sub_2": "Панорамный вид на горы",
    "hero_title_2": "ПАНОРАМНЫЙ БАССЕЙН НА КРЫШЕ",
    "hero_desc_2": "Окунитесь в чистейшую воду и насладитесь незабываемым закатом над долиной Там Кок.",
    "hero_sub_3": "Кулинарные традиции древней столицы",
    "hero_title_3": "РЕСТОРАН И ШВЕДСКИЙ СТОЛ",
    "hero_desc_3": "Вкуснейшие завтраки «шведский стол» и фирменные блюда местной вьетнамской кухни.",
    "hero_sub_4": "Истинное вьетнамское гостеприимство",
    "hero_title_4": "РОСКОШНЫЕ НОМЕРА И ЛЮКСЫ",
    "hero_desc_4": "Современный комфорт, балконы с видом на горы, ванны и первоклассный бутик-сервис.",

    "qb_title": "Проверить наличие мест и лучшие цены",
    "qb_checkin": "Дата заезда",
    "qb_checkout": "Дата выезда",
    "qb_room": "Категория номера",
    "qb_guests": "Гости",
    "qb_submit": "Поиск номеров",
    "guest_1": "1 взрослый",
    "guest_2": "2 взрослых",
    "guest_3": "3 взрослых",
    "guest_4": "4+ взрослых (Семья)",

    "about_sub": "Добро пожаловать в Sala Tam Coc",
    "about_title": "Роскошный отдых в окружении природного наследия",
    "about_desc_1": "Отель <strong>Sala Tam Coc Hotel & Spa</strong> расположен в районе Донг Дот, вблизи лодочной пристани Там Кок. Это идеальное сочетание аутентичной природы и бутик-комфорта.",
    "about_desc_2": "Все номера оснащены панорамными балконами. К услугам гостей бассейн на крыше, ресторан и спа-салон с травяными процедурами.",
    "feat_pool": "Панорамный бассейн на крыше с видом на горы",
    "feat_dining": "Ресторан и бесплатный ежедневный завтрак «шведский стол»",
    "feat_spa": "Спа-процедуры и традиционные травяные ванны для ног",
    "feat_tours": "Организация индивидуальных туров и трансфер на VIP-лимузине",
    "feat_buffet": "Ежедневный шведский стол для всех гостей отеля",

    "rooms_sub": "Премиальное размещение",
    "rooms_title": "Коллекция номеров и люксов",
    "rooms_desc": "Все номера оформлены в теплых тонах натурального дерева с личными балконами и видом на природу.",
    "filter_all": "Все номера",
    "filter_double": "Для пар / Двухместные",
    "filter_triple": "Трехместные",
    "filter_luxury": "Люксы с ванной",
    "filter_family": "Семейные номера",
    "price_from": "От",
    "per_night": "/ ночь",

    "r1_name": "Superior Double City View",
    "r1_desc": "Уютный номер с панорамными окнами на город, кроватью King-size и всеми удобствами.",
    "r2_name": "Superior Triple City View",
    "r2_desc": "Просторный номер для 3 гостей с 1 двуспальной и 1 односпальной кроватью.",
    "r3_name": "Deluxe Double Room Balcony",
    "r3_desc": "Индивидуальный балкон с великолепным видом на горы Там Кок и тихая атмосфера.",
    "r4_name": "Deluxe Family Room Balcony",
    "r4_desc": "Идеально для семей из 4 человек: 2 большие кровати и просторный балкон с видом на природу.",
    "r5_name": "Luxury Double with Balcony & Bath tub",
    "r5_desc": "Флагманский люкс с элегантной ванной у панорамного окна и персональным балконом.",
    "r6_name": "Luxury Twin with Balcony & Bath tub",
    "r6_desc": "Две удобные односпальные кровати, балкон с утренним солнцем и расслабляющая ванна.",
    "r7_name": "Family Connecting Room",
    "r7_desc": "Два смежных номера с дверью и двумя санузлами для максимального комфорта большой семьи.",

    "offers_sub": "Акции и пакеты",
    "offers_title": "Специальные предложения",
    "offers_desc": "Получите эксклюзивные скидки, бесплатные билеты на экскурсии и трансфер при прямом бронировании.",
    "badge_hot": "Скидка 25%",
    "badge_vip": "VIP Все Включено",
    "badge_family": "Семейная выгода",
    "offer1_title": "Романтический отдых в Там Кок (3 дня / 2 ночи)",
    "offer1_desc": "Прекрасный пакет для пар: проживание в номере Deluxe с балконом и билеты на лодку в Там Кок.",
    "offer1_f1": "02 ночи в номере Deluxe Double Balcony",
    "offer1_f2": "02 билета на лодочную экскурсию Там Кок",
    "offer1_f3": "Неограниченный доступ к бассейну на крыше",
    "offer1_f4": "Ежедневный завтрак «шведский стол» и приветственный напиток",

    "offer2_title": "Открытие наследия Ниньбиня (4 дня / 3 ночи)",
    "offer2_desc": "Полное путешествие по достопримечательностям Чанган, пещере Муа, Хоа Лу и пагоде Бай Динь.",
    "offer2_f1": "03 ночи в номере Luxury Double с ванной и балконом",
    "offer2_f2": "VIP-трансфер на лимузине Ханой ⇆ Ниньбинь",
    "offer2_f3": "Индивидуальный экскурсионный тур с гидом",
    "offer2_f4": "Ужин с фирменными блюдами в ресторане Sala",

    "offer3_title": "Семейные выходные (2 дня / 1 ночь)",
    "offer3_desc": "Теплый семейный отдых на свежем воздухе среди живописных деревенских пейзажей.",
    "offer3_f1": "01 ночь в семейном номере Family Connecting (55 кв.м)",
    "offer3_f2": "Бесплатное проживание для 2 детей до 6 лет",
    "offer3_f3": "Скидка 20% на ресторан и спа-процедуры",
    "offer3_f4": "Бесплатные велосипеды для прогулок",

    "dining_sub": "Кулинарные шедевры",
    "dining_title": "Ресторан Sala и завтрак «шведский стол»",
    "dining_desc": "Ресторан Sala предлагает изысканные блюда вьетнамской и европейской кухни, а также богатый шведский стол.",
    "serving_hours": "Часы работы:",
    "hours_val": "06:00 - 22:30 ежедневно",
    "capacity": "Вместимость:",
    "capacity_val": "До 120 гостей",
    "buffet_time": "Завтрак «шведский стол»:",
    "buffet_val": "06:30 - 09:30 ежедневно",

    "spa_sub": "Гармония тела и души",
    "spa_title": "Sala Lotus Spa & Wellness",
    "spa_desc": "Расслабляющие спа-процедуры, ванночки на местных травах и традиционный массаж после насыщенных экскурсий.",
    "spa_1_title": "Травяная ванночка для ног",
    "spa_1_desc": "Снимает усталость и восстанавливает силы после прогулок по горам.",
    "spa_2_title": "Массаж горячими базальтовыми камнями",
    "spa_2_desc": "Натуральные камни и эфирное масло лотоса для глубокого расслабления.",
    "spa_3_title": "Ароматерапия с натуральными маслами",
    "spa_3_desc": "Питает кожу, дарит душевный покой и снимает стресс.",

    "tours_sub": "Путешествия и экскурсии",
    "tours_title": "Экскурсионные туры по Ниньбиню",
    "tours_desc": "Профессиональные гиды, комфортабельный транспорт и лучшие маршруты по объектам ЮНЕСКО.",
    "tour1_title": "Лодочный тур Там Кок - Бить Донг",
    "tour1_desc": "Прогулка на традиционной лодке по реке Нго Донг через три живописные пещеры.",
    "tour2_title": "Ландшафтный комплекс Чанган (ЮНЕСКО)",
    "tour2_desc": "Уникальная водная система пещер и древние храмы посреди изумрудных вод.",
    "tour3_title": "Восхождение на пик Дракона (Ханг Муа)",
    "tour3_desc": "500 каменных ступеней к вершине с фантастическим панорамным видом.",
    "tour4_title": "VIP-лимузин Ханой ⇆ Ниньбинь",
    "tour4_desc": "Комфортная поездка в просторном кожаном салоне с Wi-Fi и зарядками.",

    "footer_tagline": "Район Донг Дот, Нам Хоа Лу, Ниньбинь. Незабываемый бутик-отдых в самом сердце всемирного наследия.",
    "quick_links": "Навигация",
    "contact_info": "Контакты",
    "copyright": "Copyright © 2026 Sala Tam Coc Hotel & Spa. Все права защищены.",

    "modal_title": "Прямое бронирование номера",
    "modal_sub": "Sala Tam Coc Hotel & Spa • Гарантия лучшей цены",
    "label_name": "ФИО гостя *",
    "label_phone": "Телефон / WhatsApp / Telegram *",
    "label_email": "Электронная почта (для подтверждения) *",
    "label_room": "Категория номера",
    "label_checkin": "Дата заезда *",
    "label_checkout": "Дата выезда *",
    "label_adults": "Количество взрослых",
    "label_children": "Дети",
    "label_note": "Особые пожелания (трансфер, питание, годовщина...)",
    "est_total": "Примерная стоимость:",
    "btn_confirm_booking": "Подтвердить бронирование",
    "btn_cancel": "Отмена"
  },

  fr: {
    "address": "Zone de Dong Dot, Nam Hoa Lu, Province de Ninh Binh, Vietnam",
    "hotline_1": "Ligne directe 1: +84 942 060 533",
    "hotline_2": "Ligne directe 2: +84 986 969 898",
    "nav_home": "Accueil",
    "nav_rooms": "Chambres & Suites",
    "nav_offers": "Offres Spéciales",
    "nav_dining": "Restaurant & Bar",
    "nav_spa": "Spa & Bien-être",
    "nav_tours": "Tours Ninh Binh",
    "nav_gallery": "Galerie Photos",
    "nav_contact": "Contact",
    "btn_book_now": "Réserver",
    "btn_view_details": "Voir Détails",
    "btn_book_room": "Réserver Chambre",
    "btn_book_table": "Réserver Table",
    "btn_book_package": "Choisir ce Forfait",
    "btn_book_tour": "Réserver Tour",
    "btn_explore_menu": "Découvrir Menu",
    "btn_learn_more": "En Savoir Plus",
    "btn_view_itinerary": "Voir Itinéraire",

    "hero_sub_1": "Luxe Boutique au Cœur de Tam Coc",
    "hero_title_1": "SALA TAM COC HOTEL & SPA",
    "hero_desc_1": "Un havre de paix niché entre les pitons karstiques et les rizières dorées de Ninh Binh.",
    "hero_sub_2": "Vue Panoramique sur les Montagnes",
    "hero_title_2": "PISCINE INFINIE SUR LE TOIT",
    "hero_desc_2": "Plongez dans des eaux cristallines tout en admirant un magnifique coucher de soleil sur Tam Coc.",
    "hero_sub_3": "Saveurs de l'Ancienne Capitale",
    "hero_title_3": "RESTAURANT AUTHENTIQUE & BUFFET",
    "hero_desc_3": "Savourez un buffet petit-déjeuner international frais et les délices culinaires de Ninh Binh.",
    "hero_sub_4": "Hospitalité Vietnamienne Chaleureuse",
    "hero_title_4": "CHAMBRES & SUITES DE CHARME",
    "hero_desc_4": "Confort moderne, balcons panoramiques, baignoires de relaxation et service hôtelier d'exception.",

    "qb_title": "Vérifier Disponibilité & Meilleurs Tarifs",
    "qb_checkin": "Date d'arrivée",
    "qb_checkout": "Date de départ",
    "qb_room": "Type de Chambre",
    "qb_guests": "Voyageurs",
    "qb_submit": "Vérifier les Prix",
    "guest_1": "1 Adulte",
    "guest_2": "2 Adultes",
    "guest_3": "3 Adultes",
    "guest_4": "4+ Adultes (Famille)",

    "about_sub": "Bienvenue à Sala Tam Coc",
    "about_title": "Une Escale de Charme au Cœur du Patrimoine",
    "about_desc_1": "Niché à proximité de l'embarcadère de Tam Coc - Bich Dong, <strong>Sala Tam Coc Hotel & Spa</strong> offre une alliance harmonieuse entre beauté naturelle et confort raffiné.",
    "about_desc_2": "Toutes nos chambres disposent de balcons privés. Profitez de notre piscine sur le toit, notre restaurant gourmet et nos soins spa apaisants.",
    "feat_pool": "Piscine infinie sur le toit avec vue sur les monts karstiques",
    "feat_dining": "Restaurant et buffet petit-déjeuner offert chaque matin",
    "feat_spa": "Lotus Spa et bains de pieds aux herbes traditionnelles",
    "feat_tours": "Organisation d'excursions privées et transferts en Limousine VIP",
    "feat_buffet": "Buffet petit-déjeuner complet inclus pour tous les résidents",

    "rooms_sub": "Hébergement de Prestige",
    "rooms_title": "Collection de Chambres & Suites",
    "rooms_desc": "Chaque chambre est subtilement aménagée en bois noble với balcon privatif et vue splendide sur la nature.",
    "filter_all": "Toutes les Chambres",
    "filter_double": "Couples / Double",
    "filter_triple": "Triple (3 Personnes)",
    "filter_luxury": "Luxe avec Baignoire",
    "filter_family": "Suites Familiales",
    "price_from": "À partir de",
    "per_night": "/ nuit",

    "r1_name": "Superior Double City View",
    "r1_desc": "Chambre lumineuse avec vue sur la ville, grand lit King douillet et équipements haut de gamme.",
    "r2_name": "Superior Triple City View",
    "r2_desc": "Espace généreux pour 3 personnes avec 1 grand lit double et 1 lit simple, vue sur ville et monts.",
    "r3_name": "Deluxe Double Room Balcony",
    "r3_desc": "Balcon privé avec vue panoramique sur les falaises de Tam Coc, boiseries élégantes et calme absolu.",
    "r4_name": "Deluxe Family Room Balcony",
    "r4_desc": "Idéale pour les familles de 4 personnes avec 2 grands lits doubles et balcon spacieux.",
    "r5_name": "Luxury Double with Balcony & Bath tub",
    "r5_desc": "Notre chambre signature avec baignoire îlot vitrée relaxante, balcon et lit King de grand luxe.",
    "r6_name": "Luxury Twin with Balcony & Bath tub",
    "r6_desc": "Deux lits simples confortables, balcon ensoleillé et baignoire bienfaisante.",
    "r7_name": "Family Connecting Room",
    "r7_desc": "Deux chambres communicantes avec 2 salles de bain privées pour l'intimité de toute la famille.",

    "offers_sub": "Forfaits & Promotions",
    "offers_title": "Offres Spéciales Séjour",
    "offers_desc": "Bénéficiez de réductions exclusives et d'avantages privilégiés en réservant sur notre site officiel.",
    "badge_hot": "Offre -25%",
    "badge_vip": "Combo Tout Inclus VIP",
    "badge_family": "Spécial Famille",
    "offer1_title": "Escapade Romantique à Tam Coc (3J2N)",
    "offer1_desc": "Séjour idyllique en chambre Deluxe avec balade en barque à Tam Coc offerte pour deux.",
    "offer1_f1": "02 nuits en chambre Deluxe Double Balcon",
    "offer1_f2": "02 billets pour la barque de Tam Coc - Bich Dong",
    "offer1_f3": "Accès libre à la piscine infinie sur le toit",
    "offer1_f4": "Buffet petit-déjeuner et boisson de bienvenue",

    "offer2_title": "Découverte du Patrimoine de Ninh Binh (4J3N)",
    "offer2_desc": "Visite complète de Trang An, du mont Hang Mua, de l'ancienne capitale Hoa Lu et de Bai Dinh.",
    "offer2_f1": "03 nuits en chambre Luxury Double avec baignoire",
    "offer2_f2": "Transfert aller-retour en Limousine VIP Hanoi - Ninh Binh",
    "offer2_f3": "Excursion privée avec guide local",
    "offer2_f4": "Dîner gastronomique au restaurant Sala",

    "offer3_title": "Week-end Évasion en Famille (2J1N)",
    "offer3_desc": "Un week-end ressourçant au grand air dans la quiétude de la campagne vietnamienne.",
    "offer3_f1": "01 nuit en Suite Familiale Communicante (55m²)",
    "offer3_f2": "Séjour gratuit pour 2 enfants de moins de 6 ans",
    "offer3_f3": "20% de réduction sur la restauration et le Lotus Spa",
    "offer3_f4": "Prêt gratuit de vélos pour explorer les villages",

    "dining_sub": "Art Culinaire",
    "dining_title": "Restaurant Sala & Buffet Petit-Déjeuner",
    "dining_desc": "Le restaurant Sala vous invite à savourer le meilleur de la cuisine traditionnelle et internationale.",
    "serving_hours": "Horaires:",
    "hours_val": "06h00 - 22h30 tous les jours",
    "capacity": "Capacité:",
    "capacity_val": "Jusqu'à 120 Couverts",
    "buffet_time": "Buffet Petit-déjeuner:",
    "buffet_val": "06h30 - 09h30 chaque matin",

    "spa_sub": "Harmonie du Corps & de l'Esprit",
    "spa_title": "Sala Lotus Spa & Bien-être",
    "spa_desc": "Détendez-vous avec nos soins traditionnels aux herbes médicinales et nos massages relaxants.",
    "spa_1_title": "Bain de Pieds aux Plantes Médicinales",
    "spa_1_desc": "Soulage immédiatement la fatigue après l'ascension du mont Hang Mua.",
    "spa_2_title": "Massage Corporel aux Pierres Chaudes",
    "spa_2_desc": "Pierres volcaniques et huiles essentielles de lotus pour dénouer les tensions.",
    "spa_3_title": "Aromathérapie aux Essences Naturelles",
    "spa_3_desc": "Nourrit la peau, apaise l'esprit et revitalise tout le corps.",

    "tours_sub": "Expéditions & Découvertes",
    "tours_title": "Excursions Incontournables de Ninh Binh",
    "tours_desc": "Circuits professionnels, guides francophones/anglophones et transferts haut de gamme.",
    "tour1_title": "Balade en Barque Tam Coc - Bich Dong",
    "tour1_desc": "Glissez sur la rivière Ngo Dong à travers les trois grottes majestueuses.",
    "tour2_title": "Complexe Paysager de Trang An (UNESCO)",
    "tour2_desc": "Navigation féerique entre pitons rocheux, grottes aquatiques et temples sacrés.",
    "tour3_title": "Ascension du Mont du Dragon (Hang Mua)",
    "tour3_desc": "500 marches pour une vue panoramique à 360 degrés sur toute la vallée.",
    "tour4_title": "Limousine VIP Hanoi ⇆ Ninh Binh",
    "tour4_desc": "Voyage grand confort avec sièges en cuir inclinables, Wi-Fi et prises USB.",

    "footer_tagline": "Zone de Dong Dot, Nam Hoa Lu, Ninh Binh. Un séjour d'exception dans un cadre classé au patrimoine mondial de l'UNESCO.",
    "quick_links": "Liens Rapides",
    "contact_info": "Coordonnées",
    "copyright": "Copyright © 2026 Sala Tam Coc Hotel & Spa. Tous droits réservés.",

    "modal_title": "Réservation Directe de Chambre",
    "modal_sub": "Sala Tam Coc Hotel & Spa • Garantie du Meilleur Tarif",
    "label_name": "Nom complet du voyageur *",
    "label_phone": "Téléphone / WhatsApp / Zalo *",
    "label_email": "Adresse Email (pour confirmation immédiate) *",
    "label_room": "Type de chambre souhaité",
    "label_checkin": "Date d'arrivée *",
    "label_checkout": "Date de départ *",
    "label_adults": "Nombre d'adultes",
    "label_children": "Enfants accompagnateurs",
    "label_note": "Demandes particulières (transfert aéroport, régime, anniversaire...)",
    "est_total": "Total estimé:",
    "btn_confirm_booking": "Confirmer la Réservation",
    "btn_cancel": "Annuler"
  }
};

/**
 * Apply selected language across all elements with [data-i18n]
 */
function setLanguage(lang) {
  if (!translations[lang]) lang = 'en';
  localStorage.setItem('sala_lang', lang);
  document.documentElement.lang = lang;

  const currentTrans = translations[lang];

  // Update text content of data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (currentTrans[key]) {
      el.innerHTML = currentTrans[key];
    }
  });

  // Update placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (currentTrans[key]) {
      el.placeholder = currentTrans[key];
    }
  });

  // Update active state in language dropdown
  document.querySelectorAll('.lang-dropdown a, .lang-select-item').forEach(item => {
    if (item.getAttribute('data-lang') === lang) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  const currentFlagEl = document.querySelector('.current-lang-display');
  if (currentFlagEl) {
    const langMap = {
      en: '<span class="lang-flag">🇬🇧</span> English',
      vi: '<span class="lang-flag">🇻🇳</span> Tiếng Việt',
      ru: '<span class="lang-flag">🇷🇺</span> Русский',
      fr: '<span class="lang-flag">🇫🇷</span> Français'
    };
    currentFlagEl.innerHTML = langMap[lang] || '<span class="lang-flag">🇬🇧</span> English';
  }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('sala_lang') || 'en';
  setLanguage(savedLang);

  // Toggle dropdown on click (especially mobile touch)
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
