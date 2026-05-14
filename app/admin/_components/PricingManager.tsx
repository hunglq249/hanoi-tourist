'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import type { PricingPlan } from '@/lib/types';

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

const BLANK: Omit<PricingPlan, 'id'> = { name: '', price: '', unit: '', description: '', features: '', cta: 'Đặt xe ngay', highlight: false };

const TINYMCE_BASE = {
  skin: 'oxide-dark',
  content_css: 'dark',
  height: 200,
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

function toHtml(raw: unknown): string {
  if (Array.isArray(raw)) {
    return (raw as string[]).length > 0
      ? `<ul>${(raw as string[]).map((f) => `<li>${f}</li>`).join('')}</ul>`
      : '';
  }
  return typeof raw === 'string' ? raw : '';
}

export default function PricingManager() {
  const [items, setItems] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<PricingPlan | 'new' | null>(null);
  const [form, setForm] = useState<Omit<PricingPlan, 'id'>>(BLANK);

  useEffect(() => {
    fetch('/api/admin/pricing').then((r) => r.json()).then(setItems).finally(() => setLoading(false));
  }, []);

  const openNew = () => { setForm(BLANK); setEditing('new'); };
  const openEdit = (item: PricingPlan) => {
    const { id: _, ...rest } = item;
    setForm({ ...rest, features: toHtml(rest.features) });
    setEditing(item);
  };

  const save = async () => {
    if (!form.name.trim()) return;
    if (editing === 'new') {
      const res = await fetch('/api/admin/pricing', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      });
      const newItem = await res.json();
      setItems((p) => [...p, newItem]);
    } else if (editing) {
      const id = (editing as PricingPlan).id;
      await fetch(`/api/admin/pricing/${id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, id }),
      });
      setItems((p) => p.map((i) => i.id === id ? { ...form, id } : i));
    }
    setEditing(null);
  };

  const del = async (id: string) => {
    if (!confirm('Xoá gói này?')) return;
    await fetch(`/api/admin/pricing/${id}`, { method: 'DELETE' });
    setItems((p) => p.filter((i) => i.id !== id));
  };

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((p) => ({ ...p, [k]: v }));

  if (loading) return <div className="text-[#8A8A8A] py-10 text-center">Đang tải...</div>;

  const editKey = editing === 'new' ? 'new' : editing ? (editing as PricingPlan).id : '';

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-[#8A8A8A] text-sm">{items.length} gói giá</p>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#006400] text-white text-sm font-medium hover:bg-[#008000] transition-colors">
          <Plus size={14} /> Thêm gói
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className={`bg-[#141414] border rounded-xl p-5 relative ${item.highlight ? 'border-[#006400]/40' : 'border-[#2A2A2A]'}`}>
            {item.highlight && (
              <span className="absolute -top-2.5 left-4 bg-[#006400] text-white text-[10px] font-bold px-3 py-0.5 rounded-full">TIẾT KIỆM</span>
            )}
            <div className="flex items-start justify-between mb-2">
              <div className="text-white font-semibold text-sm">{item.name}</div>
              <div className="flex gap-1.5">
                <button onClick={() => openEdit(item)} className="w-7 h-7 rounded-lg bg-[#2A2A2A] hover:bg-[#3A3A3A] flex items-center justify-center transition-colors">
                  <Pencil size={12} className="text-[#CCCCCC]" />
                </button>
                <button onClick={() => del(item.id)} className="w-7 h-7 rounded-lg bg-red-900/20 hover:bg-red-900/40 flex items-center justify-center transition-colors">
                  <Trash2 size={12} className="text-red-400" />
                </button>
              </div>
            </div>
            <div className="text-[#006400] font-bold text-lg">{item.price} <span className="text-[#8A8A8A] text-xs font-normal">{item.unit}</span></div>
            <div className="text-[#8A8A8A] text-xs mt-1 line-clamp-2">{item.description}</div>
            <div className="text-[#666] text-xs mt-2">{(item.features.match(/<li/g) || []).length} tính năng · CTA: {item.cta}</div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="col-span-3 text-center py-12 text-[#8A8A8A] border border-dashed border-[#2A2A2A] rounded-xl">Chưa có gói giá</div>
        )}
      </div>

      {editing !== null && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl w-full max-w-2xl p-7 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-white font-display text-lg font-bold mb-6">{editing === 'new' ? 'Thêm gói giá' : 'Sửa gói giá'}</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#CCCCCC] text-sm font-medium mb-1.5">Tên gói</label>
                  <input className="input-dark" value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Ngắn ngày" />
                </div>
                <div>
                  <label className="block text-[#CCCCCC] text-sm font-medium mb-1.5">Nút CTA</label>
                  <input className="input-dark" value={form.cta} onChange={(e) => set('cta', e.target.value)} placeholder="Đặt xe ngay" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#CCCCCC] text-sm font-medium mb-1.5">Giá hiển thị</label>
                  <input className="input-dark" value={form.price} onChange={(e) => set('price', e.target.value)} placeholder="Từ 700K" />
                </div>
                <div>
                  <label className="block text-[#CCCCCC] text-sm font-medium mb-1.5">Đơn vị</label>
                  <input className="input-dark" value={form.unit} onChange={(e) => set('unit', e.target.value)} placeholder="/ngày" />
                </div>
              </div>
              <div>
                <label className="block text-[#CCCCCC] text-sm font-medium mb-1.5">Mô tả ngắn</label>
                <textarea className="input-dark resize-none" rows={2} value={form.description} onChange={(e) => set('description', e.target.value)} placeholder="Phù hợp cho chuyến đi ngắn..." />
              </div>
              <div>
                <label className="block text-[#CCCCCC] text-sm font-medium mb-2">Tính năng</label>
                {(() => {
                  const snap = form.features;
                  return (
                    <Editor
                      key={`feat-${editKey}`}
                      tinymceScriptSrc="/tinymce/tinymce.min.js"
                      licenseKey="gpl"
                      onEditorChange={(content: string) => set('features', content)}
                      init={{
                        ...TINYMCE_BASE,
                        setup: (editor: { on: (e: string, cb: () => void) => void; setContent: (html: string) => void }) => {
                          editor.on('init', () => editor.setContent(snap || ''));
                        },
                      }}
                    />
                  );
                })()}
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.highlight} onChange={(e) => set('highlight', e.target.checked)} className="w-4 h-4 accent-[#006400]" />
                <span className="text-[#CCCCCC] text-sm">Đánh dấu &quot;Tiết kiệm nhất&quot;</span>
              </label>
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
