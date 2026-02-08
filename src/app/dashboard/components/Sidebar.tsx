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
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 shadow-sm flex flex-col hidden md:flex">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-brand-green">
          Spend Sense
        </h1>
        <p className="text-xs text-gray-600 mt-1">Expense Tracker</p>
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
                  ? 'bg-brand-green-light text-brand-green border-l-4 border-brand-green'
                  : 'text-gray-600 hover:text-brand-green hover:bg-gray-50'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-gray-200">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:text-black hover:bg-gray-100 transition-all-smooth">
          <BiLogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
