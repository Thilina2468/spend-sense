'use client';

import { ReactNode } from 'react';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-dark-bg min-h-screen">
      <MobileNav />
      <Sidebar />

      <main className="md:ml-64 pt-16 md:pt-0">
        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}
