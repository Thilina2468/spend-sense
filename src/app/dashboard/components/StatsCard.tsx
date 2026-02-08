'use client';

import { ReactNode } from 'react';

type Props = {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: { value: number; direction: 'up' | 'down' };
  className?: string;
};

export default function StatsCard({ title, value, icon, trend, className = '' }: Props) {
  return (
    <div className={`bg-white border border-gray-200 shadow-md rounded-xl p-6 transition-all-smooth hover:shadow-green-strong hover:border-brand-green ${className}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <p className="text-gray-600 text-sm mb-2">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{typeof value === 'number' ? `$${value.toFixed(2)}` : value}</p>
        </div>
        <div className="w-12 h-12 bg-brand-green-light rounded-lg flex items-center justify-center text-2xl text-brand-green">
          {icon}
        </div>
      </div>

      {trend && (
        <div className="flex items-center gap-2">
          <span className={`text-sm font-semibold ${trend.direction === 'up' ? 'text-red-600' : 'text-brand-green'}`}>
            {trend.direction === 'up' ? '↑' : '↓'} {Math.abs(trend.value)}%
          </span>
          <span className="text-xs text-gray-600">vs last month</span>
        </div>
      )}
    </div>
  );
}
