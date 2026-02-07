'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BiHome, BiWallet, BiCategory, BiCog, BiLogOut } from 'react-icons/bi';

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(path);
  };

  const navItems = [
    { label: 'Overview', href: '/dashboard', icon: <BiHome size={20} /> },
    { label: 'Expenses', href: '/dashboard/expenses', icon: <BiWallet size={20} /> },
    { label: 'Categories', href: '/dashboard/categories', icon: <BiCategory size={20} /> },
    { label: 'Settings', href: '/dashboard/settings', icon: <BiCog size={20} /> },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-dark-card/30 backdrop-blur-sm border-r border-dark-border/50 flex flex-col hidden md:flex">
      <div className="p-6 border-b border-dark-border/50">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-neon-green to-neon-cyan bg-clip-text text-transparent">
          Spend Sense
        </h1>
        <p className="text-xs text-gray-500 mt-1">Expense Tracker</p>
      </div>

      <nav className="flex-1 p-6 space-y-2 overflow-y-auto scrollbar-dark">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all-smooth ${
                active
                  ? 'bg-gradient-to-r from-neon-green/20 to-neon-cyan/10 text-neon-green shadow-neon-green'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-dark-border/50">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-red-400 hover:bg-dark-bg transition-all-smooth">
          <BiLogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
