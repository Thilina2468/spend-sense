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
    <div className={`bg-dark-card/40 backdrop-blur-md border border-dark-border/30 rounded-xl p-6 transition-all-smooth hover:bg-dark-card/60 hover:border-neon-green/50 hover:shadow-neon-green ${className}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <p className="text-gray-400 text-sm mb-2">{title}</p>
          <p className="text-3xl font-bold text-white">{typeof value === 'number' ? `$${value.toFixed(2)}` : value}</p>
        </div>
        <div className="w-12 h-12 bg-gradient-to-br from-neon-green/20 to-neon-cyan/10 rounded-lg flex items-center justify-center text-2xl">
          {icon}
        </div>
      </div>

      {trend && (
        <div className="flex items-center gap-2">
          <span className={`text-sm font-semibold ${trend.direction === 'up' ? 'text-red-400' : 'text-neon-green'}`}>
            {trend.direction === 'up' ? '↑' : '↓'} {Math.abs(trend.value)}%
          </span>
          <span className="text-xs text-gray-500">vs last month</span>
        </div>
      )}
    </div>
  );
}
