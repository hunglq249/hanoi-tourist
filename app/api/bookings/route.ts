import { NextRequest, NextResponse } from 'next/server';
import { getBookings, createBooking } from '@/lib/content';
import { Booking } from '@/lib/types';

export async function GET() {
  const bookings = await getBookings();
  return NextResponse.json({ bookings });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      type, fullName, phone, email,
      carModel, startDate, endDate,
      pickupLocation, notes,
    } = body;

    if (!fullName || !phone || !carModel || !startDate || !endDate || !pickupLocation) {
      return NextResponse.json({ error: 'Thiếu thông tin bắt buộc' }, { status: 400 });
    }

    const booking = await createBooking({
      status: 'pending',
      type: type || 'self-drive',
      fullName, phone, email, carModel,
      startDate, endDate, pickupLocation, notes,
    });

    // Send Zalo notification (placeholder)
    await sendZaloNotification(booking);

    return NextResponse.json({ success: true, booking }, { status: 201 });
  } catch (err) {
    console.error('Booking error:', err);
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}

async function sendZaloNotification(booking: Booking) {
  // =====================================================
  // ZALO OA INTEGRATION
  // =====================================================
  // Để tích hợp Zalo OA thật, làm theo các bước:
  //
  // 1. Đăng ký Zalo OA tại: https://oa.zalo.me
  // 2. Vào My Zalo App → Tạo ứng dụng mới
  // 3. Lấy: APP_ID, SECRET_KEY, ACCESS_TOKEN (Official Account)
  // 4. Set environment variables:
  //    ZALO_ACCESS_TOKEN=your_access_token
  //    ZALO_OA_ID=your_oa_id
  //    ZALO_ADMIN_PHONE=0912345678 (số zalo nhận thông báo)
  //
  // 5. Uncomment đoạn code dưới và thay placeholder:
  // =====================================================

  const ZALO_ACCESS_TOKEN = process.env.ZALO_ACCESS_TOKEN;
  const ZALO_ADMIN_USER_ID = process.env.ZALO_ADMIN_USER_ID;

  if (!ZALO_ACCESS_TOKEN || !ZALO_ADMIN_USER_ID) {
    console.log('📢 [Zalo Placeholder] Đơn đặt xe mới:', {
      id: booking.id,
      name: booking.fullName,
      phone: booking.phone,
      car: booking.carModel,
      dates: `${booking.startDate} → ${booking.endDate}`,
    });
    return;
  }

  const message = `🚗 ĐƠN ĐẶT XE MỚI - Hanoi Tourism\n\n` +
    `👤 Khách hàng: ${booking.fullName}\n` +
    `📞 Điện thoại: ${booking.phone}\n` +
    `🚙 Xe: ${booking.carModel}\n` +
    `📅 Từ: ${new Date(booking.startDate).toLocaleDateString('vi-VN')}\n` +
    `📅 Đến: ${new Date(booking.endDate).toLocaleDateString('vi-VN')}\n` +
    `📍 Nhận xe: ${booking.pickupLocation}\n` +
    `📋 Loại: ${booking.type === 'self-drive' ? 'Tự lái' : 'Dài hạn'}\n` +
    (booking.notes ? `📝 Ghi chú: ${booking.notes}\n` : '') +
    `\n⏰ ${new Date().toLocaleString('vi-VN')}\n` +
    `🆔 Mã đơn: ${booking.id.slice(0, 8).toUpperCase()}`;

  try {
    const res = await fetch('https://openapi.zalo.me/v3.0/oa/message/cs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access_token': ZALO_ACCESS_TOKEN,
      },
      body: JSON.stringify({
        recipient: { user_id: ZALO_ADMIN_USER_ID },
        message: { text: message },
      }),
    });
    const data = await res.json();
    console.log('Zalo notification sent:', data);
  } catch (err) {
    console.error('Failed to send Zalo notification:', err);
  }
}
