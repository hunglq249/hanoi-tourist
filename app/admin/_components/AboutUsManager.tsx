'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import type { AboutUs } from '@/lib/types';

const Editor = dynamic<any>(
  () => (import('@tinymce/tinymce-react').then((m) => m.Editor) as unknown as Promise<React.ComponentType<any>>),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-48 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-[#8A8A8A] text-sm">
        Đang tải editor...
      </div>
    ),
  }
);

const TINYMCE_BASE = {
  skin: 'oxide-dark',
  content_css: 'dark',
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
    p { margin-bottom: 0.75rem; }
    a { color: #006400; }
  `,
};

const BLANK: AboutUs = { whoWeAre: '', history: '', vision: '', coreValues: '' };

const SECTIONS: { key: keyof AboutUs; label: string; height: number }[] = [
  { key: 'whoWeAre',   label: 'Chúng tôi là ai?',          height: 220 },
  { key: 'history',    label: 'Hình thành và phát triển',   height: 260 },
  { key: 'vision',     label: 'Tầm nhìn và Sứ mệnh',       height: 220 },
  { key: 'coreValues', label: 'Giá trị cốt lõi',           height: 260 },
];

type SaveStatus = 'idle' | 'saving' | 'saved';

export default function AboutUsManager() {
  const [form, setForm] = useState<AboutUs>(BLANK);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<SaveStatus>('idle');

  useEffect(() => {
    fetch('/api/admin/about-us')
      .then((r) => r.json())
      .then((d: AboutUs) => setForm(d))
      .finally(() => setLoading(false));
  }, []);

  const set = (key: keyof AboutUs, value: string) =>
    setForm((p) => ({ ...p, [key]: value }));

  const save = async () => {
    setStatus('saving');
    await fetch('/api/admin/about-us', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setStatus('saved');
    setTimeout(() => setStatus('idle'), 2500);
  };

  if (loading) return <div className="text-[#8A8A8A] py-10 text-center">Đang tải...</div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <p className="text-[#8A8A8A] text-sm">Chỉnh sửa nội dung trang Về chúng tôi</p>
        <button
          onClick={save}
          disabled={status === 'saving'}
          className="px-5 py-2.5 rounded-lg bg-[#006400] text-white text-sm font-medium hover:bg-[#008000] transition-colors disabled:opacity-60 min-w-[120px]"
        >
          {status === 'saving' ? 'Đang lưu...' : status === 'saved' ? '✓ Đã lưu' : 'Lưu tất cả'}
        </button>
      </div>

      {SECTIONS.map(({ key, label, height }) =>
        (() => {
          const snap = form[key];
          return (
            <div key={key} className="bg-[#141414] border border-[#2A2A2A] rounded-xl p-6">
              <label className="block text-white font-semibold mb-3">{label}</label>
              <Editor
                key={key}
                tinymceScriptSrc="/tinymce/tinymce.min.js"
                licenseKey="gpl"
                onEditorChange={(content: string) => set(key, content)}
                init={{
                  ...TINYMCE_BASE,
                  height,
                  setup: (editor: { on: (e: string, cb: () => void) => void; setContent: (html: string) => void }) => {
                    editor.on('init', () => editor.setContent(snap || ''));
                  },
                }}
              />
            </div>
          );
        })()
      )}
    </div>
  );
}
