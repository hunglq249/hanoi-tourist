'use client';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/lib/theme-provider';

export default function ThemeToggle({ invert = false }: { invert?: boolean }) {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
        invert
          ? 'border border-white/30 text-white/80 hover:bg-white/20 hover:text-white'
          : 'border border-gray-200 dark:border-[#2A2A2A] text-[#546A54] dark:text-[#8A8A8A] hover:border-[#006400]/60 hover:text-[#006400] dark:hover:border-[#006400]/60 dark:hover:text-[#006400]'
      }`}
    >
      {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}
