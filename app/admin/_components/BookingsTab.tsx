'use client';

import { useState, useEffect } from 'react';
import {
  Car, Clock, CheckCircle, XCircle, RefreshCw, Eye, Phone, Calendar, MapPin, FileText, Mail, Tag,
} from 'lucide-react';
import { Booking } from '@/lib/types';
import { formatDate } from '@/lib/data';

const STATUS_CONFIG = {
  pending:   { label: 'Chờ xử lý',   color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/30' },
  confirmed: { label: 'Đã xác nhận', color: 'text-green-400',  bg: 'bg-green-400/10',  border: 'border-green-400/30'  },
  cancelled: { label: 'Đã huỷ',      color: 'text-red-400',    bg: 'bg-red-400/10',    border: 'border-red-400/30'    },
  completed: { label: 'Hoàn thành',  color: 'text-blue-400',   bg: 'bg-blue-400/10',   border: 'border-blue-400/30'   },
};

function StatusBadge({ status }: { status: Booking['status'] }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${cfg.color} ${cfg.bg} ${cfg.border}`}>
      {cfg.label}
    </span>
  );
}

export default function BookingsTab() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Booking | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/bookings');
      const data = await res.json();
      setBookings(data.bookings || []);
    } catch { /* empty */ }
    setLoading(false);
  };

  useEffect(() => { fetchBookings(); }, []);

  const updateStatus = async (id: string, status: Booking['status']) => {
    await fetch(`/api/bookings/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status } : b));
    if (selected?.id === id) setSelected((prev) => prev ? { ...prev, status } : null);
  };

  const filtered = filterStatus === 'all' ? bookings : bookings.filter((b) => b.status === filterStatus);

  const counts = {
    all: bookings.length,
    pending: bookings.filter((b) => b.status === 'pending').length,
    confirmed: bookings.filter((b) => b.status === 'confirmed').length,
    completed: bookings.filter((b) => b.status === 'completed').length,
  };

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Tổng đơn', value: counts.all, icon: Car, color: 'text-[#006400]' },
          { label: 'Chờ xử lý', value: counts.pending, icon: Clock, color: 'text-yellow-400' },
          { label: 'Đã xác nhận', value: counts.confirmed, icon: CheckCircle, color: 'text-green-400' },
          { label: 'Hoàn thành', value: counts.completed, icon: Car, color: 'text-blue-400' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#8A8A8A] text-sm">{label}</span>
              <Icon size={18} className={color} />
            </div>
            <div className={`font-display text-3xl font-bold ${color}`}>{value}</div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {[
          { key: 'all', label: `Tất cả (${counts.all})` },
          { key: 'pending', label: `Chờ xử lý (${counts.pending})` },
          { key: 'confirmed', label: `Đã xác nhận (${counts.confirmed})` },
          { key: 'completed', label: 'Hoàn thành' },
          { key: 'cancelled', label: 'Đã huỷ' },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilterStatus(key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filterStatus === key
                ? 'bg-[#006400] text-white'
                : 'bg-[#141414] border border-[#2A2A2A] text-[#CCCCCC] hover:border-[#3A3A3A]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-[#8A8A8A]">
            <RefreshCw size={24} className="animate-spin mr-3" />
            Đang tải...
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-[#8A8A8A]">
            <Car size={40} className="mx-auto mb-4 opacity-30" />
            <p>Chưa có đơn đặt xe nào</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#2A2A2A]">
                  {['Mã đơn', 'Khách hàng', 'Xe', 'Thời gian', 'Địa điểm', 'Trạng thái', 'Hành động'].map((h) => (
                    <th key={h} className="text-left text-[#8A8A8A] text-xs font-medium px-5 py-4 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((booking) => (
                  <tr key={booking.id} className="border-b border-[#1A1A1A] hover:bg-[#1A1A1A] transition-colors">
                    <td className="px-5 py-4">
                      <div className="text-[#006400] font-mono text-xs">#{booking.id.slice(0, 8).toUpperCase()}</div>
                      <div className="text-[#666] text-xs mt-0.5">{new Date(booking.createdAt).toLocaleDateString('vi-VN')}</div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="text-white font-medium text-sm">{booking.fullName}</div>
                      <a href={`tel:${booking.phone}`} className="text-[#006400] text-xs hover:underline">{booking.phone}</a>
                    </td>
                    <td className="px-5 py-4">
                      <div className="text-white text-sm">{booking.carModel}</div>
                      <div className="text-[#8A8A8A] text-xs">{booking.type === 'self-drive' ? 'Tự lái' : 'Dài hạn'}</div>
                    </td>
                    <td className="px-5 py-4 text-sm text-[#CCCCCC]">
                      <div>{formatDate(booking.startDate)}</div>
                      <div className="text-[#8A8A8A]">→ {formatDate(booking.endDate)}</div>
                    </td>
                    <td className="px-5 py-4 text-sm text-[#8A8A8A] max-w-[150px] truncate">{booking.pickupLocation}</td>
                    <td className="px-5 py-4"><StatusBadge status={booking.status} /></td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => setSelected(booking)} className="w-8 h-8 rounded-lg bg-[#2A2A2A] hover:bg-[#3A3A3A] flex items-center justify-center transition-colors" title="Xem chi tiết">
                          <Eye size={14} className="text-[#CCCCCC]" />
                        </button>
                        {booking.status === 'pending' && (
                          <button onClick={() => updateStatus(booking.id, 'confirmed')} className="w-8 h-8 rounded-lg bg-green-900/30 hover:bg-green-900/60 border border-green-500/20 flex items-center justify-center transition-colors" title="Xác nhận">
                            <CheckCircle size={14} className="text-green-400" />
                          </button>
                        )}
                        {booking.status !== 'cancelled' && (
                          <button onClick={() => updateStatus(booking.id, 'cancelled')} className="w-8 h-8 rounded-lg bg-red-900/20 hover:bg-red-900/40 border border-red-500/20 flex items-center justify-center transition-colors" title="Huỷ đơn">
                            <XCircle size={14} className="text-red-400" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl max-w-lg w-full p-7 relative" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="text-[#006400] font-mono text-sm mb-1">#{selected.id.slice(0, 8).toUpperCase()}</div>
                <h3 className="text-white font-display text-xl font-bold">Chi tiết đơn đặt xe</h3>
              </div>
              <StatusBadge status={selected.status} />
            </div>
            <div className="space-y-4">
              {[
                { icon: Clock, label: 'Ngày đặt', value: new Date(selected.createdAt).toLocaleString('vi-VN') },
                { icon: Phone, label: 'Khách hàng', value: `${selected.fullName} — ${selected.phone}` },
                ...(selected.email ? [{ icon: Mail, label: 'Email', value: selected.email }] : []),
                { icon: Tag, label: 'Loại thuê', value: selected.type === 'self-drive' ? 'Tự lái' : 'Dài hạn' },
                { icon: Car, label: 'Xe đặt', value: selected.carModel },
                { icon: Calendar, label: 'Thời gian', value: `${formatDate(selected.startDate)} → ${formatDate(selected.endDate)}` },
                { icon: MapPin, label: 'Nhận xe tại', value: selected.pickupLocation },
                ...(selected.notes ? [{ icon: FileText, label: 'Ghi chú', value: selected.notes }] : []),
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#2A2A2A] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={14} className="text-[#006400]" />
                  </div>
                  <div>
                    <div className="text-[#8A8A8A] text-xs">{label}</div>
                    <div className="text-white text-sm mt-0.5">{value}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-7">
              {selected.status === 'pending' && (
                <button onClick={() => updateStatus(selected.id, 'confirmed')} className="flex-1 py-2.5 rounded-xl bg-green-900/30 border border-green-500/30 text-green-400 text-sm font-medium hover:bg-green-900/60 transition-colors">
                  ✓ Xác nhận đơn
                </button>
              )}
              {selected.status === 'confirmed' && (
                <button onClick={() => updateStatus(selected.id, 'completed')} className="flex-1 py-2.5 rounded-xl bg-blue-900/30 border border-blue-500/30 text-blue-400 text-sm font-medium hover:bg-blue-900/60 transition-colors">
                  ✓ Hoàn thành
                </button>
              )}
              <a href={`tel:${selected.phone}`} className="flex-1 py-2.5 rounded-xl bg-[#006400]/10 border border-[#006400]/30 text-[#006400] text-sm font-medium hover:bg-[#006400]/20 transition-colors text-center">
                📞 Gọi khách
              </a>
              <button onClick={() => setSelected(null)} className="py-2.5 px-4 rounded-xl bg-[#2A2A2A] text-[#CCCCCC] text-sm font-medium hover:bg-[#3A3A3A] transition-colors">
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
