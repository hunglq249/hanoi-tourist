'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Phone, Mail, Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { COMPANY_INFO } from '@/lib/data';
import ThemeToggle from '@/components/ui/ThemeToggle';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

export default function Navbar() {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: '#services', label: t('services') },
    { href: '#fleet', label: t('fleet') },
    { href: '#pricing', label: t('pricing') },
    { href: '#how-it-works', label: t('process') },
    { href: '#booking', label: t('booking') },
    { href: '#faq', label: t('faq') },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top contact bar — desktop only */}
      <div className="bg-[#006400] text-white text-xs hidden md:block">
        <div className="container-custom flex items-center justify-between h-10">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${COMPANY_INFO.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
            >
              <Phone size={12} />
              {COMPANY_INFO.phone}
            </a>
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
            >
              <Mail size={12} />
              {COMPANY_INFO.email}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 opacity-90">
              <Clock size={12} />
              {COMPANY_INFO.workingHours}
            </div>
            <div className="w-px h-4 bg-white/30" />
            <LanguageSwitcher className="text-white/90 hover:text-white font-semibold text-xs tracking-wider transition-colors" />
            <div className="w-px h-4 bg-white/30" />
            <ThemeToggle invert />
          </div>
        </div>
      </div>

      {/* Main nav bar */}
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? 'dark:bg-[#0A0A0A]/97 bg-white/97 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_20px_rgba(0,0,0,0.5)]'
            : 'dark:bg-[#0A0A0A]/80 bg-white'
        } border-b border-gray-100 dark:border-[#1A1A1A]`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shadow-sm flex-shrink-0 p-0.5 border border-gray-100 dark:border-[#2A2A2A]">
                <Image src="/logo.svg" alt="Ha noi Tourism logo" width={32} height={32} />
              </div>
              <div>
                <div className="font-display font-bold dark:text-white text-[#1A2B1A] text-lg leading-tight">
                  Ha noi <span className="text-[#006400]">Tourism</span>
                </div>
                <div className="text-[9px] text-[#8A9A8A] dark:text-[#8A8A8A] tracking-widest uppercase">
                  Car Rental Service
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="dark:text-[#CCCCCC] text-[#3A4A3A] hover:text-[#006400] text-sm font-medium transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#006400] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <a href="#booking" className="btn-gold text-sm py-2.5 px-5">
                {t('bookCta')}
              </a>
            </div>

            {/* Mobile: language switcher + theme toggle + hamburger */}
            <div className="md:hidden flex items-center gap-2">
              <LanguageSwitcher className="text-[#006400] font-bold text-xs px-2 py-1 rounded border border-[#006400]/30 hover:bg-[#006400]/10 transition-colors" />
              <ThemeToggle />
              <button
                className="dark:text-white text-[#1A2B1A] p-2"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden dark:bg-[#141414] bg-white border-t dark:border-[#2A2A2A] border-gray-100 shadow-lg">
          {/* Mobile contact row */}
          <div className="bg-[#006400]/10 dark:bg-[#006400]/10 border-b dark:border-[#2A2A2A] border-[#DDE8DD] px-4 py-3 flex items-center justify-between">
            <a
              href={`tel:${COMPANY_INFO.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-2 text-[#006400] text-sm font-semibold"
            >
              <Phone size={14} />
              {COMPANY_INFO.phone}
            </a>
          </div>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block px-4 py-3 dark:text-[#CCCCCC] text-[#3A4A3A] hover:text-[#006400] hover:bg-[#F0F6F0] dark:hover:bg-[#1A1A1A] text-sm font-medium border-b dark:border-[#2A2A2A] border-gray-100 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="px-4 py-4">
            <a href="#booking" className="btn-gold w-full block text-center text-sm">
              {t('bookCta')}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
