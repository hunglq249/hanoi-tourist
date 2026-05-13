'use client';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/lib/theme-provider';

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="w-9 h-9 rounded-lg flex items-center justify-center border border-[#2A2A2A] dark:border-[#2A2A2A] text-[#666666] dark:text-[#8A8A8A] hover:border-[#006400]/60 hover:text-[#006400] transition-all duration-200"
    >
      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
