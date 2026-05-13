# 🚗 Hanoi Tourism — Website Cho Thuê Xe

Website landing page + hệ thống đặt xe cho dịch vụ cho thuê xe tự lái và thuê xe dài hạn tại Hà Nội.

## ✨ Tính năng

- **Landing Page chuẩn SEO** với Hero, Dịch vụ, Đội xe, Bảng giá, Đặt xe, FAQ
- **Form đặt xe** thu thập đơn hàng (không cần thanh toán)
- **Trang quản trị** tại `/admin` — xem, xác nhận, huỷ đơn
- **Tích hợp Zalo OA** — bắn tin nhắn khi có đơn mới
- **SEO đầy đủ** — meta tags, OG, sitemap, robots, Schema.org
- **Responsive** — mobile-first design
- **Floating buttons** — gọi điện & chat Zalo

## 🚀 Cài đặt

### 1. Cài dependencies

```bash
cd hanoi-tourism
npm install
```

### 2. Cấu hình environment

```bash
cp .env.example .env.local
# Điền vào ZALO_ACCESS_TOKEN và ZALO_ADMIN_USER_ID
```

### 3. Chạy development

```bash
npm run dev
# → http://localhost:3000
# → http://localhost:3000/admin (trang quản trị)
```

### 4. Build production

```bash
npm run build
npm start
```

## 📱 Tích hợp Zalo OA

### Bước 1: Đăng ký Zalo OA
1. Vào [https://oa.zalo.me](https://oa.zalo.me) → Tạo Official Account
2. Điền thông tin doanh nghiệp, chờ duyệt (1-3 ngày)

### Bước 2: Lấy Access Token
1. Vào [Zalo Developers](https://developers.zalo.me) → My Apps
2. Tạo App mới → Liên kết với OA
3. Lấy **Access Token** (có hạn 90 ngày, cần refresh)

### Bước 3: Lấy User ID admin
1. Người dùng nhắn tin cho OA của bạn
2. Vào OA Dashboard → Followers → Copy User ID
3. Hoặc dùng Webhook để tự động lấy user_id

### Bước 4: Cấu hình
```env
ZALO_ACCESS_TOKEN=v3_eyJhbGciOiJIUzI1NiJ9...
ZALO_ADMIN_USER_ID=4141048068791461376
```

## 🏗️ Cấu trúc dự án

```
hanoi-tourism/
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout + SEO metadata
│   ├── globals.css           # Design tokens + styles
│   ├── sitemap.ts            # SEO sitemap
│   ├── robots.ts             # robots.txt
│   ├── admin/
│   │   └── page.tsx          # Trang quản trị đơn hàng
│   └── api/
│       └── bookings/
│           └── route.ts      # API: tạo & lấy đơn đặt xe
├── components/
│   ├── sections/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Stats.tsx
│   │   ├── Services.tsx
│   │   ├── Fleet.tsx
│   │   ├── WhyUs.tsx
│   │   ├── Pricing.tsx
│   │   ├── BookingForm.tsx
│   │   ├── Testimonials.tsx
│   │   ├── FAQ.tsx
│   │   └── Footer.tsx
│   └── ui/
│       └── FloatingContact.tsx
├── lib/
│   ├── types.ts              # TypeScript types
│   ├── data.ts               # Car data, constants
│   └── store.ts              # Zustand store
└── .env.example              # Environment template
```

## 🗄️ Database (Production)

Hiện tại dùng in-memory store (reset khi restart server). Để production:

**Option 1: Vercel KV (Khuyến nghị cho Vercel deploy)**
```bash
npm install @vercel/kv
```

**Option 2: Supabase (Free tier)**
```bash
npm install @supabase/supabase-js
```

**Option 3: PlanetScale / Neon (PostgreSQL)**
```bash
npm install prisma @prisma/client
```

## 🚀 Deploy

### Vercel (Khuyến nghị)
```bash
npm install -g vercel
vercel --prod
# Set environment variables trong Vercel Dashboard
```

### Hosting tự quản
```bash
npm run build
npm start
# Cần Node.js 18+, có thể dùng PM2 để quản lý process
```

## 🎨 Tùy chỉnh

- **Màu sắc**: Sửa trong `tailwind.config.ts` và `globals.css`
- **Nội dung xe**: Sửa `lib/data.ts` → `CARS` array
- **Thông tin công ty**: Sửa `lib/data.ts` → `COMPANY_INFO`
- **Logo**: Thay thế trong `Navbar.tsx` và `Footer.tsx`
