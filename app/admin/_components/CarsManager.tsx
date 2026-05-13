'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import type { Car } from '@/lib/types';
import { formatCurrency } from '@/lib/data';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Editor = dynamic<any>(
  () => (import('@tinymce/tinymce-react').then((m) => m.Editor) as unknown as Promise<React.ComponentType<any>>),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-40 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-[#8A8A8A] text-sm">
        Đang tải editor...
      </div>
    ),
  }
);

const BLANK: Omit<Car, 'id'> = {
  name: '', brand: '', category: 'sedan', seats: 5, year: new Date().getFullYear(),
  transmission: 'auto', fuel: 'gasoline', pricePerDay: 0, pricePerMonth: 0,
  image: '', features: '', available: true,
};

const TINYMCE_BASE = {
  skin: 'oxide-dark',
  content_css: 'dark',
  height: 220,
  menubar: false,
  statusbar: false,
  resize: false,
  plugins: 'lists link autolink',
  toolbar: 'bold italic underline | bullist numlist | removeformat | link',
  content_style: `
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      font-size: 14px;
      color: #CCCCCC;
      background: #1A1A1A;
      padding: 8px 12px;
      margin: 0;
    }
    ul, ol { padding-left: 1.25rem; }
    li { margin-bottom: 4px; }
    a { color: #006400; }
  `,
};

export default function CarsManager() {
  const [items, setItems] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Car | 'new' | null>(null);
  const [form, setForm] = useState<Omit<Car, 'id'>>(BLANK);

  useEffect(() => {
    fetch('/api/admin/cars').then((r) => r.json()).then(setItems).finally(() => setLoading(false));
  }, []);

  const toFeaturesHtml = (raw: unknown): string => {
    if (Array.isArray(raw)) {
      return raw.length > 0
        ? `<ul>${(raw as string[]).map((f) => `<li>${f}</li>`).join('')}</ul>`
        : '';
    }
    return typeof raw === 'string' ? raw : '';
  };

  const openNew = () => { setForm(BLANK); setEditing('new'); };
  const openEdit = (car: Car) => {
    const { id: _, ...rest } = car;
    setForm({ ...rest, features: toFeaturesHtml(rest.features) });
    setEditing(car);
  };

  const save = async () => {
    if (!form.name.trim()) return;
    if (editing === 'new') {
      const res = await fetch('/api/admin/cars', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      });
      const newItem = await res.json();
      setItems((p) => [...p, newItem]);
    } else if (editing) {
      const id = (editing as Car).id;
      await fetch(`/api/admin/cars/${id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, id }),
      });
      setItems((p) => p.map((c) => c.id === id ? { ...form, id } : c));
    }
    setEditing(null);
  };

  const del = async (id: string) => {
    if (!confirm('Xoá xe này?')) return;
    await fetch(`/api/admin/cars/${id}`, { method: 'DELETE' });
    setItems((p) => p.filter((c) => c.id !== id));
  };

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((p) => ({ ...p, [k]: v }));

  if (loading) return <div className="text-[#8A8A8A] py-10 text-center">Đang tải...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-[#8A8A8A] text-sm">{items.length} xe</p>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#006400] text-white text-sm font-medium hover:bg-[#008000] transition-colors">
          <Plus size={14} /> Thêm xe
        </button>
      </div>

      <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2A2A2A]">
                {['Xe', 'Loại', 'Giá/ngày', 'Giá/tháng', 'Trạng thái', ''].map((h) => (
                  <th key={h} className="text-left text-[#8A8A8A] text-xs font-medium px-5 py-4 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((car) => (
                <tr key={car.id} className="border-b border-[#1A1A1A] hover:bg-[#1A1A1A] transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#2A2A2A] flex-shrink-0">
                        {car.image ? <img src={car.image} alt={car.name} className="w-full h-full object-cover" /> : null}
                      </div>
                      <div>
                        <div className="text-white font-medium text-sm">{car.name}</div>
                        <div className="text-[#8A8A8A] text-xs">{car.brand} · {car.year} · {car.seats} chỗ</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs bg-[#2A2A2A] text-[#CCCCCC] px-2 py-0.5 rounded capitalize">{car.category}</span>
                    <div className="text-[#8A8A8A] text-xs mt-1">{car.transmission === 'auto' ? 'Tự động' : 'Số sàn'} · {car.fuel}</div>
                  </td>
                  <td className="px-5 py-4 text-[#006400] font-semibold text-sm">{formatCurrency(car.pricePerDay)}</td>
                  <td className="px-5 py-4 text-[#CCCCCC] text-sm">{formatCurrency(car.pricePerMonth)}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${car.available ? 'text-green-400 bg-green-400/10 border-green-400/30' : 'text-red-400 bg-red-400/10 border-red-400/30'}`}>
                      {car.available ? 'Sẵn có' : 'Không có sẵn'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(car)} className="w-8 h-8 rounded-lg bg-[#2A2A2A] hover:bg-[#3A3A3A] flex items-center justify-center transition-colors">
                        <Pencil size={13} className="text-[#CCCCCC]" />
                      </button>
                      <button onClick={() => del(car.id)} className="w-8 h-8 rounded-lg bg-red-900/20 hover:bg-red-900/40 flex items-center justify-center transition-colors">
                        <Trash2 size={13} className="text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr><td colSpan={6} className="text-center py-12 text-[#8A8A8A]">Chưa có xe nào</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {editing !== null && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl w-full max-w-2xl p-7 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-white font-display text-lg font-bold mb-6">{editing === 'new' ? 'Thêm xe' : 'Sửa xe'}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[#CCCCCC] text-sm font-medium mb-1.5">Tên xe</label>
                <input className="input-dark" value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Kia K5" />
              </div>
              <div>
                <label className="block text-[#CCCCCC] text-sm font-medium mb-1.5">Thương hiệu</label>
                <input className="input-dark" value={form.brand} onChange={(e) => set('brand', e.target.value)} placeholder="Kia" />
              </div>
              <div>
                <label className="block text-[#CCCCCC] text-sm font-medium mb-1.5">Loại xe</label>
                <select className="input-dark" value={form.category} onChange={(e) => set('category', e.target.value as Car['category'])}>
                  <option value="sedan">Sedan</option>
                  <option value="suv">SUV</option>
                  <option value="mpv">MPV</option>
                  <option value="luxury">Luxury</option>
                </select>
              </div>
              <div>
                <label className="block text-[#CCCCCC] text-sm font-medium mb-1.5">Hộp số</label>
                <select className="input-dark" value={form.transmission} onChange={(e) => set('transmission', e.target.value as Car['transmission'])}>
                  <option value="auto">Tự động</option>
                  <option value="manual">Số sàn</option>
                </select>
              </div>
              <div>
                <label className="block text-[#CCCCCC] text-sm font-medium mb-1.5">Nhiên liệu</label>
                <select className="input-dark" value={form.fuel} onChange={(e) => set('fuel', e.target.value as Car['fuel'])}>
                  <option value="gasoline">Xăng</option>
                  <option value="diesel">Dầu</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="electric">Điện</option>
                </select>
              </div>
              <div>
                <label className="block text-[#CCCCCC] text-sm font-medium mb-1.5">Số chỗ</label>
                <input className="input-dark" type="number" value={form.seats} onChange={(e) => set('seats', Number(e.target.value))} />
              </div>
              <div>
                <label className="block text-[#CCCCCC] text-sm font-medium mb-1.5">Năm sản xuất</label>
                <input className="input-dark" type="number" value={form.year} onChange={(e) => set('year', Number(e.target.value))} />
              </div>
              <div>
                <label className="block text-[#CCCCCC] text-sm font-medium mb-1.5">Giá / ngày (VND)</label>
                <input className="input-dark" type="number" value={form.pricePerDay} onChange={(e) => set('pricePerDay', Number(e.target.value))} />
              </div>
              <div className="col-span-2">
                <label className="block text-[#CCCCCC] text-sm font-medium mb-1.5">Giá / tháng (VND)</label>
                <input className="input-dark" type="number" value={form.pricePerMonth} onChange={(e) => set('pricePerMonth', Number(e.target.value))} />
              </div>
              <div className="col-span-2">
                <label className="block text-[#CCCCCC] text-sm font-medium mb-1.5">URL ảnh</label>
                <input className="input-dark" value={form.image} onChange={(e) => set('image', e.target.value)} placeholder="https://..." />
              </div>
              <div className="col-span-2">
                <label className="block text-[#CCCCCC] text-sm font-medium mb-2">Tính năng nổi bật</label>
                {(() => {
                  const featuresSnapshot = form.features;
                  return (
                    <Editor
                      key={editing === 'new' ? 'new' : (editing as Car).id}
                      tinymceScriptSrc="/tinymce/tinymce.min.js"
                      licenseKey="gpl"
                      onEditorChange={(content: string) => set('features', content)}
                      init={{
                        ...TINYMCE_BASE,
                        setup: (editor: { on: (event: string, cb: () => void) => void; setContent: (html: string) => void }) => {
                          editor.on('init', () => {
                            editor.setContent(featuresSnapshot || '');
                          });
                        },
                      }}
                    />
                  );
                })()}
              </div>
              <div className="col-span-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.available} onChange={(e) => set('available', e.target.checked)} className="w-4 h-4 accent-[#006400]" />
                  <span className="text-[#CCCCCC] text-sm">Xe đang sẵn có</span>
                </label>
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
