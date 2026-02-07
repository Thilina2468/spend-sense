'use client';

import { ReactNode } from 'react';

type Props = {
  title: string;
  children: ReactNode;
  className?: string;
};

export default function ChartCard({ title, children, className = '' }: Props) {
  return (
    <div className={`bg-dark-card/40 backdrop-blur-md border border-dark-border/30 rounded-xl p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-white mb-6">{title}</h3>
      <div className="w-full h-full">{children}</div>
    </div>
  );
}
