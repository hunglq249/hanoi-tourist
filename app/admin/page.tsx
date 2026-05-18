'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RefreshCw, Car, Layers, Star, HelpCircle, CheckSquare, Tag, LogOut, Info } from 'lucide-react';
import BookingsTab from './_components/BookingsTab';
import CarsManager from './_components/CarsManager';
import ServicesManager from './_components/ServicesManager';
import PricingManager from './_components/PricingManager';
import TestimonialsManager from './_components/TestimonialsManager';
import FAQsManager from './_components/FAQsManager';
import WhyUsManager from './_components/WhyUsManager';
import AboutUsManager from './_components/AboutUsManager';

const TABS = [
  { key: 'bookings',     label: 'Đặt xe',         icon: Car },
  { key: 'cars',        label: 'Xe',              icon: Car },
  { key: 'services',    label: 'Dịch vụ',         icon: Layers },
  { key: 'whyus',       label: 'Tại sao chọn',    icon: CheckSquare },
  { key: 'pricing',     label: 'Bảng giá',        icon: Tag },
  { key: 'testimonials', label: 'Đánh giá',       icon: Star },
  { key: 'faqs',        label: 'FAQ',             icon: HelpCircle },
  { key: 'aboutus',     label: 'Về chúng tôi',    icon: Info },
] as const;

type Tab = (typeof TABS)[number]['key'];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('bookings');
  const router = useRouter();

  const logout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.replace('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <header className="border-b border-[#1A1A1A] bg-[#0A0A0A] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#006400] to-[#008000] flex items-center justify-center">
              <span className="text-white font-bold text-sm font-display">H</span>
            </div>
            <span className="font-semibold">Hanoi Tourism — Quản trị</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" target="_blank" className="text-[#8A8A8A] text-sm hover:text-white transition-colors">
              Xem website →
            </a>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 text-[#8A8A8A] text-sm hover:text-red-400 transition-colors"
            >
              <LogOut size={14} />
              Đăng xuất
            </button>
          </div>
        </div>
      </header>

      {/* Tab bar */}
      <div className="border-b border-[#1A1A1A] bg-[#0A0A0A] sticky top-16 z-10 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1 py-2 min-w-max">
            {TABS.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === key
                    ? 'bg-[#006400] text-white'
                    : 'text-[#8A8A8A] hover:text-white hover:bg-[#1A1A1A]'
                }`}
              >
                <Icon size={14} />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'bookings'     && <BookingsTab />}
        {activeTab === 'cars'         && <CarsManager />}
        {activeTab === 'services'     && <ServicesManager />}
        {activeTab === 'whyus'        && <WhyUsManager />}
        {activeTab === 'pricing'      && <PricingManager />}
        {activeTab === 'testimonials' && <TestimonialsManager />}
        {activeTab === 'faqs'         && <FAQsManager />}
        {activeTab === 'aboutus'      && <AboutUsManager />}
      </div>
    </div>
  );
}
