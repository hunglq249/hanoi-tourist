'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import type { WhyUsReason, WhyUsData } from '@/lib/types';

const ICON_OPTIONS = ['Shield', 'Award', 'Headphones', 'MapPin', 'CreditCard', 'RefreshCw', 'Star', 'Clock', 'Car', 'Building2'];

const BLANK_REASON: Omit<WhyUsReason, 'id'> = { icon: 'Shield', title: '', description: '' };

export default function WhyUsManager() {
  const [data, setData] = useState<WhyUsData>({ reasons: [], partners: [] });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<WhyUsReason | 'new' | null>(null);
  const [form, setForm] = useState<Omit<WhyUsReason, 'id'>>(BLANK_REASON);
  const [partnersText, setPartnersText] = useState('');
  const [savingPartners, setSavingPartners] = useState(false);

  useEffect(() => {
    fetch('/api/admin/whyus').then((r) => r.json()).then((d: WhyUsData) => {
      setData(d);
      setPartnersText(d.partners.join('\n'));
    }).finally(() => setLoading(false));
  }, []);

  const openNew = () => { setForm(BLANK_REASON); setEditing('new'); };
  const openEdit = (item: WhyUsReason) => { const { id: _, ...rest } = item; setForm(rest); setEditing(item); };

  const saveReason = async () => {
    if (!form.title.trim()) return;
    if (editing === 'new') {
      const res = await fetch('/api/admin/whyus', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      });
      const newItem = await res.json();
      setData((p) => ({ ...p, reasons: [...p.reasons, newItem] }));
    } else if (editing) {
      const id = (editing as WhyUsReason).id;
      await fetch(`/api/admin/whyus/${id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, id }),
      });
      setData((p) => ({ ...p, reasons: p.reasons.map((r) => r.id === id ? { ...form, id } : r) }));
    }
    setEditing(null);
  };

  const delReason = async (id: string) => {
    if (!confirm('Xoá lý do này?')) return;
    await fetch(`/api/admin/whyus/${id}`, { method: 'DELETE' });
    setData((p) => ({ ...p, reasons: p.reasons.filter((r) => r.id !== id) }));
  };

  const savePartners = async () => {
    setSavingPartners(true);
    const partners = partnersText.split('\n').map((p) => p.trim()).filter(Boolean);
    await fetch('/api/admin/whyus', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ partners }),
    });
    setData((p) => ({ ...p, partners }));
    setSavingPartners(false);
  };

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((p) => ({ ...p, [k]: v }));

  if (loading) return <div className="text-[#8A8A8A] py-10 text-center">Đang tải...</div>;

  return (
    <div className="space-y-10">
      {/* Reasons */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-semibold">Lý do chọn chúng tôi <span className="text-[#8A8A8A] font-normal text-sm">({data.reasons.length})</span></h3>
          <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#006400] text-white text-sm font-medium hover:bg-[#008000] transition-colors">
            <Plus size={14} /> Thêm lý do
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {data.reasons.map((item) => (
            <div key={item.id} className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-5 hover:border-[#3A3A3A] transition-colors">
              <div className="flex items-start gap-3">
                <div className="text-[#CCCCCC] text-xs font-mono bg-[#2A2A2A] px-2 py-0.5 rounded flex-shrink-0 mt-0.5">{item.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-semibold text-sm mb-1">{item.title}</div>
                  <div className="text-[#8A8A8A] text-xs leading-relaxed line-clamp-2">{item.description}</div>
                </div>
                <div className="flex gap-1.5 flex-shrink-0">
                  <button onClick={() => openEdit(item)} className="w-7 h-7 rounded-lg bg-[#2A2A2A] hover:bg-[#3A3A3A] flex items-center justify-center transition-colors">
                    <Pencil size={12} className="text-[#CCCCCC]" />
                  </button>
                  <button onClick={() => delReason(item.id)} className="w-7 h-7 rounded-lg bg-red-900/20 hover:bg-red-900/40 flex items-center justify-center transition-colors">
                    <Trash2 size={12} className="text-red-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {data.reasons.length === 0 && (
            <div className="col-span-2 text-center py-10 text-[#8A8A8A] border border-dashed border-[#2A2A2A] rounded-xl">Chưa có lý do nào</div>
          )}
        </div>
      </div>

      {/* Partners */}
      <div>
        <h3 className="text-white font-semibold mb-4">Đối tác <span className="text-[#8A8A8A] font-normal text-sm">(mỗi dòng một tên)</span></h3>
        <div className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-5">
          <textarea
            className="input-dark resize-none mb-4"
            rows={6}
            value={partnersText}
            onChange={(e) => setPartnersText(e.target.value)}
            placeholder="Tập đoàn Sun Group&#10;FPT Corporation&#10;Vinhomes"
          />
          <button
            onClick={savePartners}
            disabled={savingPartners}
            className="px-5 py-2.5 rounded-lg bg-[#006400] text-white text-sm font-medium hover:bg-[#008000] transition-colors disabled:opacity-50"
          >
            {savingPartners ? 'Đang lưu...' : 'Lưu danh sách đối tác'}
          </button>
        </div>
      </div>

      {/* Reason Modal */}
      {editing !== null && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl w-full max-w-lg p-7" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-white font-display text-lg font-bold mb-6">{editing === 'new' ? 'Thêm lý do' : 'Sửa lý do'}</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#CCCCCC] text-sm font-medium mb-1.5">Tiêu đề</label>
                  <input className="input-dark" value={form.title} onChange={(e) => set('title', e.target.value)} placeholder="Bảo hiểm toàn diện" />
                </div>
                <div>
                  <label className="block text-[#CCCCCC] text-sm font-medium mb-1.5">Icon</label>
                  <select className="input-dark" value={form.icon} onChange={(e) => set('icon', e.target.value)}>
                    {ICON_OPTIONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[#CCCCCC] text-sm font-medium mb-1.5">Mô tả</label>
                <textarea className="input-dark resize-none" rows={3} value={form.description} onChange={(e) => set('description', e.target.value)} />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={saveReason} className="flex-1 py-2.5 rounded-xl bg-[#006400] text-white text-sm font-medium hover:bg-[#008000] transition-colors">Lưu</button>
              <button onClick={() => setEditing(null)} className="py-2.5 px-5 rounded-xl bg-[#2A2A2A] text-[#CCCCCC] text-sm font-medium hover:bg-[#3A3A3A] transition-colors">Huỷ</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
