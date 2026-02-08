'use client';

import { ReactNode } from 'react';

type Props = {
  title: string;
  children: ReactNode;
  className?: string;
};

export default function ChartCard({ title, children, className = '' }: Props) {
  return (
    <div className={`bg-white border border-gray-200 shadow-md rounded-xl p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-6">{title}</h3>
      <div className="w-full h-full">{children}</div>
    </div>
  );
}
