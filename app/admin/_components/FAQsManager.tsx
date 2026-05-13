'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, GripVertical } from 'lucide-react';
import type { FAQItem } from '@/lib/types';

const BLANK: Omit<FAQItem, 'id'> = { q: '', a: '' };

export default function FAQsManager() {
  const [items, setItems] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<FAQItem | 'new' | null>(null);
  const [form, setForm] = useState<Omit<FAQItem, 'id'>>(BLANK);

  useEffect(() => {
    fetch('/api/admin/faqs').then((r) => r.json()).then(setItems).finally(() => setLoading(false));
  }, []);

  const openNew = () => { setForm(BLANK); setEditing('new'); };
  const openEdit = (item: FAQItem) => { setForm({ q: item.q, a: item.a }); setEditing(item); };

  const save = async () => {
    if (!form.q.trim() || !form.a.trim()) return;
    if (editing === 'new') {
      const res = await fetch('/api/admin/faqs', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      });
      const newItem = await res.json();
      setItems((p) => [...p, newItem]);
    } else if (editing) {
      await fetch(`/api/admin/faqs/${editing.id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, id: editing.id }),
      });
      setItems((p) => p.map((i) => i.id === (editing as FAQItem).id ? { ...form, id: (editing as FAQItem).id } : i));
    }
    setEditing(null);
  };

  const del = async (id: string) => {
    if (!confirm('Xoá câu hỏi này?')) return;
    await fetch(`/api/admin/faqs/${id}`, { method: 'DELETE' });
    setItems((p) => p.filter((i) => i.id !== id));
  };

  if (loading) return <div className="text-[#8A8A8A] py-10 text-center">Đang tải...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-[#8A8A8A] text-sm">{items.length} câu hỏi</p>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#006400] text-white text-sm font-medium hover:bg-[#008000] transition-colors">
          <Plus size={14} /> Thêm câu hỏi
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={item.id} className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-5 hover:border-[#3A3A3A] transition-colors">
            <div className="flex items-start gap-3">
              <span className="text-[#006400] font-mono text-xs font-bold mt-1 flex-shrink-0">Q{idx + 1}</span>
              <div className="flex-1 min-w-0">
                <div className="text-white font-medium text-sm mb-1.5">{item.q}</div>
                <div className="text-[#8A8A8A] text-xs leading-relaxed line-clamp-2">{item.a}</div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => openEdit(item)} className="w-8 h-8 rounded-lg bg-[#2A2A2A] hover:bg-[#3A3A3A] flex items-center justify-center transition-colors">
                  <Pencil size={13} className="text-[#CCCCCC]" />
                </button>
                <button onClick={() => del(item.id)} className="w-8 h-8 rounded-lg bg-red-900/20 hover:bg-red-900/40 flex items-center justify-center transition-colors">
                  <Trash2 size={13} className="text-red-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-center py-12 text-[#8A8A8A] border border-dashed border-[#2A2A2A] rounded-xl">
            Chưa có câu hỏi nào
          </div>
        )}
      </div>

      {/* Modal */}
      {editing !== null && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl w-full max-w-lg p-7" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-white font-display text-lg font-bold mb-6">
              {editing === 'new' ? 'Thêm câu hỏi' : 'Sửa câu hỏi'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[#CCCCCC] text-sm font-medium mb-1.5">Câu hỏi</label>
                <input className="input-dark" value={form.q} onChange={(e) => setForm((p) => ({ ...p, q: e.target.value }))} placeholder="Nhập câu hỏi..." />
              </div>
              <div>
                <label className="block text-[#CCCCCC] text-sm font-medium mb-1.5">Câu trả lời</label>
                <textarea className="input-dark resize-none" rows={4} value={form.a} onChange={(e) => setForm((p) => ({ ...p, a: e.target.value }))} placeholder="Nhập câu trả lời..." />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={save} className="flex-1 py-2.5 rounded-xl bg-[#006400] text-white text-sm font-medium hover:bg-[#008000] transition-colors">
                Lưu
              </button>
              <button onClick={() => setEditing(null)} className="py-2.5 px-5 rounded-xl bg-[#2A2A2A] text-[#CCCCCC] text-sm font-medium hover:bg-[#3A3A3A] transition-colors">
                Huỷ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
