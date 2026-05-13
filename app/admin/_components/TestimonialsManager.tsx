'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Star } from 'lucide-react';
import type { Testimonial } from '@/lib/types';

const BLANK: Omit<Testimonial, 'id'> = { name: '', role: '', avatar: '', rating: 5, text: '', date: '' };

export default function TestimonialsManager() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Testimonial | 'new' | null>(null);
  const [form, setForm] = useState<Omit<Testimonial, 'id'>>(BLANK);

  useEffect(() => {
    fetch('/api/admin/testimonials').then((r) => r.json()).then(setItems).finally(() => setLoading(false));
  }, []);

  const openNew = () => { setForm(BLANK); setEditing('new'); };
  const openEdit = (item: Testimonial) => { const { id: _, ...rest } = item; setForm(rest); setEditing(item); };

  const save = async () => {
    if (!form.name.trim()) return;
    if (editing === 'new') {
      const res = await fetch('/api/admin/testimonials', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      });
      const newItem = await res.json();
      setItems((p) => [...p, newItem]);
    } else if (editing) {
      const id = (editing as Testimonial).id;
      await fetch(`/api/admin/testimonials/${id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, id }),
      });
      setItems((p) => p.map((i) => i.id === id ? { ...form, id } : i));
    }
    setEditing(null);
  };

  const del = async (id: string) => {
    if (!confirm('Xoá đánh giá này?')) return;
    await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' });
    setItems((p) => p.filter((i) => i.id !== id));
  };

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((p) => ({ ...p, [k]: v }));

  if (loading) return <div className="text-[#8A8A8A] py-10 text-center">Đang tải...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-[#8A8A8A] text-sm">{items.length} đánh giá</p>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#006400] text-white text-sm font-medium hover:bg-[#008000] transition-colors">
          <Plus size={14} /> Thêm đánh giá
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-5 hover:border-[#3A3A3A] transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#006400] to-[#008000] flex items-center justify-center text-white font-bold text-sm font-display flex-shrink-0">
                  {item.avatar || item.name.charAt(0)}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{item.name}</div>
                  <div className="text-[#8A8A8A] text-xs">{item.role}</div>
                </div>
              </div>
              <div className="flex gap-1.5">
                <button onClick={() => openEdit(item)} className="w-7 h-7 rounded-lg bg-[#2A2A2A] hover:bg-[#3A3A3A] flex items-center justify-center transition-colors">
                  <Pencil size={12} className="text-[#CCCCCC]" />
                </button>
                <button onClick={() => del(item.id)} className="w-7 h-7 rounded-lg bg-red-900/20 hover:bg-red-900/40 flex items-center justify-center transition-colors">
                  <Trash2 size={12} className="text-red-400" />
                </button>
              </div>
            </div>
            <div className="flex gap-0.5 mb-2">
              {Array.from({ length: item.rating }).map((_, i) => (
                <Star key={i} size={12} className="text-[#006400] fill-[#006400]" />
              ))}
            </div>
            <p className="text-[#8A8A8A] text-xs leading-relaxed line-clamp-2">{item.text}</p>
            <div className="text-[#666] text-xs mt-2">{item.date}</div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="col-span-2 text-center py-12 text-[#8A8A8A] border border-dashed border-[#2A2A2A] rounded-xl">
            Chưa có đánh giá nào
          </div>
        )}
      </div>

      {/* Modal */}
      {editing !== null && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl w-full max-w-lg p-7 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-white font-display text-lg font-bold mb-6">
              {editing === 'new' ? 'Thêm đánh giá' : 'Sửa đánh giá'}
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#CCCCCC] text-sm font-medium mb-1.5">Tên khách hàng</label>
                  <input className="input-dark" value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Nguyễn Văn A" />
                </div>
                <div>
                  <label className="block text-[#CCCCCC] text-sm font-medium mb-1.5">Chức vụ / Mô tả</label>
                  <input className="input-dark" value={form.role} onChange={(e) => set('role', e.target.value)} placeholder="Giám đốc, FPT" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#CCCCCC] text-sm font-medium mb-1.5">Avatar (1 ký tự)</label>
                  <input className="input-dark" maxLength={1} value={form.avatar} onChange={(e) => set('avatar', e.target.value)} placeholder="N" />
                </div>
                <div>
                  <label className="block text-[#CCCCCC] text-sm font-medium mb-1.5">Đánh giá (1-5)</label>
                  <select className="input-dark" value={form.rating} onChange={(e) => set('rating', Number(e.target.value))}>
                    {[5, 4, 3, 2, 1].map((v) => <option key={v} value={v}>{v} sao</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[#CCCCCC] text-sm font-medium mb-1.5">Nội dung đánh giá</label>
                <textarea className="input-dark resize-none" rows={4} value={form.text} onChange={(e) => set('text', e.target.value)} placeholder="Nhập nội dung đánh giá..." />
              </div>
              <div>
                <label className="block text-[#CCCCCC] text-sm font-medium mb-1.5">Thời gian</label>
                <input className="input-dark" value={form.date} onChange={(e) => set('date', e.target.value)} placeholder="Tháng 3/2024" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={save} className="flex-1 py-2.5 rounded-xl bg-[#006400] text-white text-sm font-medium hover:bg-[#008000] transition-colors">Lưu</button>
              <button onClick={() => setEditing(null)} className="py-2.5 px-5 rounded-xl bg-[#2A2A2A] text-[#CCCCCC] text-sm font-medium hover:bg-[#3A3A3A] transition-colors">Huỷ</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
