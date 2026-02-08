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
    <div className="bg-white border border-gray-200 shadow-md rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl" style={{ backgroundColor: category.color + '20', border: '1px solid ' + category.color }}>
            {category.icon}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{category.name}</h3>
            <p className="text-xs text-gray-600">{percentage}% of total</p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-2xl font-bold text-brand-green">${category.totalSpent.toFixed(2)}</p>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div className="h-full rounded-full transition-all-smooth" style={{ width: `${Math.min(percentage, 100)}%`, backgroundColor: category.color }} />
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <button
          onClick={onEdit}
          className="flex-1 flex items-center justify-center gap-1 py-2 px-3 bg-blue-50 hover:bg-blue-100 border border-blue-300 rounded-lg text-blue-600 transition-all-smooth text-xs font-medium"
        >
          <BiEdit size={14} />
          Edit
        </button>
        <button
          onClick={onDelete}
          className="flex-1 flex items-center justify-center gap-1 py-2 px-3 bg-red-50 hover:bg-red-100 border border-red-300 rounded-lg text-red-600 transition-all-smooth text-xs font-medium"
        >
          <BiTrash size={14} />
          Delete
        </button>
      </div>
    </div>
  );
}
