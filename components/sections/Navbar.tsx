'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Phone } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/data';
import ThemeToggle from '@/components/ui/ThemeToggle';

const navLinks = [
  { href: '#services', label: 'Dịch vụ' },
  { href: '#fleet', label: 'Đội xe' },
  { href: '#pricing', label: 'Bảng giá' },
  { href: '#booking', label: 'Đặt xe' },
  { href: '#faq', label: 'FAQ' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'dark:bg-[#0A0A0A]/95 bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.15)] dark:shadow-[0_2px_20px_rgba(0,0,0,0.5)] border-b border-gray-200 dark:border-[#2A2A2A]'
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-lg flex-shrink-0 p-0.5">
              <Image src="/logo.svg" alt="Ha noi Tourism logo" width={36} height={36} />
            </div>
            <div>
              <div className="font-display font-bold dark:text-white text-[#0A0A0A] text-xl leading-tight">
                Ha noi <span className="text-[#008000]">Tourism</span>
              </div>
              <div className="text-[10px] text-[#8A8A8A] tracking-widest uppercase">Car Rental Service</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="dark:text-[#CCCCCC] text-[#444444] hover:text-[#006400] text-sm font-medium transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#006400] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`tel:${COMPANY_INFO.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-2 text-[#006400] text-sm font-semibold hover:opacity-80 transition-opacity"
            >
              <Phone size={16} />
              {COMPANY_INFO.phone}
            </a>
            <ThemeToggle />
            <a href="#booking" className="btn-gold text-sm py-2.5 px-5">
              Đặt xe ngay
            </a>
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className="dark:text-white text-[#0A0A0A] p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden dark:bg-[#141414] bg-white border-t dark:border-[#2A2A2A] border-gray-200 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block px-4 py-3 dark:text-[#CCCCCC] text-[#444444] hover:text-[#006400] text-sm font-medium"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="px-4 pt-4 border-t dark:border-[#2A2A2A] border-gray-200 mt-2">
              <a href="#booking" className="btn-gold w-full block text-center text-sm">
                Đặt xe ngay
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
