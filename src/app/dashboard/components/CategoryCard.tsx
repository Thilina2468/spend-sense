'use client';

import { Category } from '@/types/dashboard';
import { BiEdit, BiTrash } from 'react-icons/bi';

type Props = {
  category: Category;
  percentage: number;
  onEdit: () => void;
  onDelete: () => void;
};

export default function CategoryCard({ category, percentage, onEdit, onDelete }: Props) {
  return (
    <div className="bg-dark-card border border-dark-border rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl" style={{ backgroundColor: category.color + '20', borderColor: category.color }}>
            {category.icon}
          </div>
          <div>
            <h3 className="font-semibold text-white">{category.name}</h3>
            <p className="text-xs text-gray-500">{percentage}% of total</p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-2xl font-bold text-neon-green">${category.totalSpent.toFixed(2)}</p>
        <div className="w-full bg-dark-bg rounded-full h-2 overflow-hidden">
          <div className="h-full rounded-full transition-all-smooth" style={{ width: `${Math.min(percentage, 100)}%`, backgroundColor: category.color }} />
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <button
          onClick={onEdit}
          className="flex-1 flex items-center justify-center gap-1 py-2 px-3 bg-neon-blue/10 hover:bg-neon-blue/20 border border-neon-blue/50 rounded-lg text-neon-blue transition-all-smooth text-xs font-medium"
        >
          <BiEdit size={14} />
          Edit
        </button>
        <button
          onClick={onDelete}
          className="flex-1 flex items-center justify-center gap-1 py-2 px-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 transition-all-smooth text-xs font-medium"
        >
          <BiTrash size={14} />
          Delete
        </button>
      </div>
    </div>
  );
}
