'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BiMenu, BiX, BiHome, BiWallet, BiCategory, BiCog, BiLogOut } from 'react-icons/bi';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/');

  const navItems = [
    { label: 'Overview', href: '/dashboard', icon: <BiHome size={20} /> },
    { label: 'Expenses', href: '/dashboard/expenses', icon: <BiWallet size={20} /> },
    { label: 'Categories', href: '/dashboard/categories', icon: <BiCategory size={20} /> },
    { label: 'Settings', href: '/dashboard/settings', icon: <BiCog size={20} /> },
  ];

  return (
    <nav className="md:hidden fixed top-0 left-0 right-0 bg-dark-card border-b border-dark-border z-50">
      <div className="flex items-center justify-between p-4">
        <h1 className="text-xl font-bold bg-gradient-to-r from-neon-green to-neon-cyan bg-clip-text text-transparent">
          Spend
        </h1>
        <button onClick={() => setIsOpen(!isOpen)} className="text-neon-green hover:text-neon-cyan transition-colors">
          {isOpen ? <BiX size={24} /> : <BiMenu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 top-16 bg-black/50 backdrop-blur-sm z-40" onClick={() => setIsOpen(false)} />
      )}

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-dark-card border-b border-dark-border space-y-1 p-4 z-50">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all-smooth ${
                  active
                    ? 'bg-gradient-to-r from-neon-green/20 to-neon-cyan/10 text-neon-green border border-neon-green/50'
                    : 'text-gray-400 hover:text-white hover:bg-dark-bg'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-red-400 hover:bg-dark-bg transition-all-smooth mt-4">
            <BiLogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </nav>
  );
}
