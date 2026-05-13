import type { Metadata } from 'next';
import DarkModeEnforcer from './_components/DarkModeEnforcer';

export const metadata: Metadata = {
  title: 'Quản trị | Hanoi Tourism',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <DarkModeEnforcer />
      {children}
    </div>
  );
}
