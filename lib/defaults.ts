import type { Service, PricingPlan, Testimonial, FAQItem, WhyUsData } from './types';

export const DEFAULT_SERVICES: Service[] = [
  {
    id: 'svc-1',
    icon: 'Car',
    title: 'Thuê xe tự lái',
    description:
      'Tự do khám phá Hà Nội và các tỉnh lân cận với đội xe đa dạng từ sedan 4 chỗ đến SUV 7 chỗ. Thủ tục nhanh gọn, nhận xe trong 30 phút.',
    features: '<ul><li>Xe mới 100%</li><li>Bảo hiểm đầy đủ</li><li>GPS miễn phí</li><li>Hỗ trợ 24/7</li></ul>',
    highlight: true,
  },
  {
    id: 'svc-2',
    icon: 'Building2',
    title: 'Thuê xe dài hạn',
    description:
      'Giải pháp tối ưu cho văn phòng và doanh nghiệp. Tiết kiệm chi phí hơn so với mua xe, không lo bảo dưỡng, đăng kiểm.',
    features: '<ul><li>Hợp đồng từ 1 tháng</li><li>Tài xế tùy chọn</li><li>Bảo dưỡng miễn phí</li><li>Đổi xe linh hoạt</li></ul>',
    highlight: false,
  },
  {
    id: 'svc-3',
    icon: 'MapPin',
    title: 'Giao nhận xe tận nơi',
    description:
      'Chúng tôi giao xe đến tận sân bay, khách sạn, văn phòng hoặc địa chỉ bạn yêu cầu trong nội thành Hà Nội.',
    features: '<ul><li>Nội thành miễn phí</li><li>Sân bay Nội Bài</li><li>Khách sạn, resort</li><li>Theo lịch hẹn</li></ul>',
    highlight: false,
  },
];

export const DEFAULT_PRICING: PricingPlan[] = [
  {
    id: 'plan-1',
    name: 'Ngắn ngày',
    price: 'Từ 700K',
    unit: '/ngày',
    description: 'Phù hợp cho chuyến đi ngắn, du lịch cuối tuần',
    features: '<ul><li>Xe sedan 4-5 chỗ</li><li>Bảo hiểm cơ bản</li><li>GPS miễn phí</li><li>Giao xe tại Hà Nội</li><li>Hỗ trợ 7-22h</li></ul>',
    cta: 'Đặt xe ngay',
    highlight: false,
  },
  {
    id: 'plan-2',
    name: 'Tuần / Tháng',
    price: 'Từ 14M',
    unit: '/tháng',
    description: 'Tiết kiệm đến 30% so với thuê ngày, lý tưởng cho công tác',
    features: '<ul><li>Tất cả dòng xe</li><li>Bảo hiểm toàn diện</li><li>GPS + camera hành trình</li><li>Giao nhận tận nơi</li><li>Hỗ trợ 24/7</li><li>Đổi xe 1 lần miễn phí</li></ul>',
    cta: 'Đặt xe ngay',
    highlight: true,
  },
  {
    id: 'plan-3',
    name: 'Doanh nghiệp',
    price: 'Báo giá',
    unit: 'theo hợp đồng',
    description: 'Giải pháp thuê xe dài hạn cho văn phòng và doanh nghiệp',
    features: '<ul><li>Từ 3 xe trở lên</li><li>Tài xế tùy chọn</li><li>Bảo dưỡng miễn phí</li><li>Hóa đơn VAT</li><li>Quản lý đội xe</li><li>Account Manager riêng</li><li>Ưu tiên đổi xe</li></ul>',
    cta: 'Liên hệ tư vấn',
    highlight: false,
  },
];

export const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: 'rev-1',
    name: 'Trần Minh Hoàng',
    role: 'Giám đốc Marketing, FPT',
    avatar: 'T',
    rating: 5,
    text: 'Dịch vụ xuất sắc! Đặt xe qua Zalo lúc 10 giờ tối, sáng hôm sau đã có xe ngay trước cửa. Xe sạch sẽ, mới tinh, tài xế chuyên nghiệp. Đã thuê dài hạn 6 tháng cho văn phòng.',
    date: 'Tháng 3/2024',
  },
  {
    id: 'rev-2',
    name: 'Nguyễn Thu Hà',
    role: 'Chủ doanh nghiệp',
    avatar: 'N',
    rating: 5,
    text: 'Chúng tôi đang thuê 5 xe cho đội ngũ sales của công ty. Hanoi Tourism hỗ trợ rất nhiệt tình, giá cả hợp lý và quan trọng nhất là xe luôn sẵn sàng khi cần.',
    date: 'Tháng 2/2024',
  },
  {
    id: 'rev-3',
    name: 'Lê Quang Vinh',
    role: 'Du lịch cá nhân',
    avatar: 'L',
    rating: 5,
    text: 'Thuê xe tự lái đi Ninh Bình 3 ngày. Xe Toyota Innova rộng rãi, máy lạnh mát, đi êm. Chỉ cần CCCD và GPLX là xong thủ tục, không phức tạp như mình lo.',
    date: 'Tháng 1/2024',
  },
  {
    id: 'rev-4',
    name: 'Phạm Việt Anh',
    role: 'Kỹ sư phần mềm',
    avatar: 'P',
    rating: 5,
    text: 'Đã thử nhiều dịch vụ thuê xe ở Hà Nội nhưng Hanoi Tourism là uy tín nhất. Giá công khai, không cò kè, hỗ trợ 24/7 thật sự. Khi xe bị xịt lốp lúc 2 giờ sáng, họ gửi cứu hộ trong 20 phút.',
    date: 'Tháng 12/2023',
  },
];

export const DEFAULT_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    q: 'Cần giấy tờ gì để thuê xe tự lái?',
    a: 'Bạn chỉ cần CCCD/CMND còn hạn và Bằng lái xe (GPLX) phù hợp với loại xe thuê. Đối với xe 4-7 chỗ cần bằng B2 trở lên. Không cần hộ khẩu hay các giấy tờ khác.',
  },
  {
    id: 'faq-2',
    q: 'Có cần đặt cọc không?',
    a: 'Có một khoản tiền đặt cọc từ 3-10 triệu tùy dòng xe, sẽ hoàn trả đầy đủ khi trả xe đúng hạn và nguyên vẹn. Đối với khách hàng đã thuê nhiều lần, chúng tôi có chính sách ưu đãi đặc biệt.',
  },
  {
    id: 'faq-3',
    q: 'Có thể thuê xe và lái ra tỉnh khác không?',
    a: 'Hoàn toàn được! Xe của chúng tôi có thể đi tất cả 63 tỉnh thành trên cả nước. Bạn chỉ cần thông báo trước để chúng tôi chuẩn bị giấy tờ xe phù hợp.',
  },
  {
    id: 'faq-4',
    q: 'Nếu xe hỏng giữa đường phải làm gì?',
    a: 'Gọi ngay hotline 24/7 của chúng tôi. Đội cứu hộ sẽ đến trong vòng 30-60 phút (tùy vị trí). Nếu xe không sửa được, chúng tôi sẽ đổi xe mới ngay lập tức. Không tính thêm chi phí cho trường hợp xe lỗi kỹ thuật.',
  },
  {
    id: 'faq-5',
    q: 'Thuê xe dài hạn cho công ty có cần hợp đồng không?',
    a: 'Có, chúng tôi ký hợp đồng chính thức có công chứng đầy đủ. Hóa đơn VAT được xuất đầy đủ cho doanh nghiệp. Hợp đồng từ 3 tháng trở lên sẽ được ưu đãi giá và các dịch vụ kèm theo.',
  },
  {
    id: 'faq-6',
    q: 'Có thể đặt xe vào buổi tối hay cuối tuần không?',
    a: 'Chúng tôi phục vụ từ 7:00 sáng đến 22:00 tất cả các ngày kể cả lễ, Tết. Hotline hỗ trợ khẩn cấp hoạt động 24/7.',
  },
  {
    id: 'faq-7',
    q: 'Phí giao nhận xe tính như thế nào?',
    a: 'Giao nhận xe trong nội thành Hà Nội (cách văn phòng dưới 10km) hoàn toàn miễn phí. Sân bay Nội Bài phụ thu 150.000đ. Ngoài 10km tính theo km thực tế.',
  },
];

export const DEFAULT_WHYUS: WhyUsData = {
  reasons: [
    {
      id: 'why-1',
      icon: 'Shield',
      title: 'Bảo hiểm toàn diện',
      description:
        'Mọi xe đều được bảo hiểm vật chất và bảo hiểm trách nhiệm dân sự. Bạn hoàn toàn an tâm khi lái.',
    },
    {
      id: 'why-2',
      icon: 'Award',
      title: 'Xe mới, chất lượng cao',
      description:
        'Đội xe 100% đời mới từ 2021 trở lên, được bảo dưỡng định kỳ nghiêm ngặt theo tiêu chuẩn nhà sản xuất.',
    },
    {
      id: 'why-3',
      icon: 'Headphones',
      title: 'Hỗ trợ 24/7',
      description:
        'Đội ngũ hỗ trợ luôn sẵn sàng qua hotline, Zalo và chat. Xử lý sự cố nhanh chóng bất kể giờ giấc.',
    },
    {
      id: 'why-4',
      icon: 'MapPin',
      title: 'Giao xe tận nơi',
      description:
        'Giao nhận xe tại nhà, văn phòng, sân bay. Không mất thời gian đi lại, tiết kiệm tối đa cho bạn.',
    },
    {
      id: 'why-5',
      icon: 'CreditCard',
      title: 'Giá minh bạch',
      description: 'Không phát sinh chi phí ẩn. Giá niêm yết rõ ràng, bao gồm tất cả phí dịch vụ từ đầu.',
    },
    {
      id: 'why-6',
      icon: 'RefreshCw',
      title: 'Đổi xe linh hoạt',
      description:
        'Hợp đồng dài hạn có thể đổi sang dòng xe khác theo nhu cầu công việc và cá nhân.',
    },
  ],
  partners: ['Văn phòng chính phủ', 'Tập đoàn Sun Group', 'FPT Corporation', 'Vinhomes', 'Techcombank', 'Vingroup'],
};
