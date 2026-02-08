'use client';

import { Expense } from '@/types/dashboard';
import { BiEdit, BiTrash } from 'react-icons/bi';

type Props = {
  expense: Expense;
  onEdit: () => void;
  onDelete: () => void;
};

export default function ExpenseCard({ expense, onEdit, onDelete }: Props) {
  const categoryColors: { [key: string]: string } = {
    Food: 'bg-green-50 text-green-700 border-green-300',
    Transport: 'bg-blue-50 text-blue-700 border-blue-300',
    Entertainment: 'bg-purple-50 text-purple-700 border-purple-300',
    Shopping: 'bg-pink-50 text-pink-700 border-pink-300',
    Bills: 'bg-amber-50 text-amber-700 border-amber-300',
    Health: 'bg-red-50 text-red-700 border-red-300',
    Education: 'bg-cyan-50 text-cyan-700 border-cyan-300',
    Others: 'bg-slate-50 text-slate-700 border-slate-300',
  };

  return (
    <div className="bg-white border border-gray-200 shadow-md rounded-lg p-4 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-2xl font-bold text-brand-green">${expense.amount.toFixed(2)}</p>
          <p className="text-xs text-gray-600 mt-1">{new Date(expense.date).toLocaleDateString()}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${categoryColors[expense.category] || categoryColors.Others}`}>
          {expense.category}
        </span>
      </div>

      <p className="text-sm text-gray-900">{expense.description}</p>

      <div className="flex gap-2 pt-2">
        <button
          onClick={onEdit}
          className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-blue-50 hover:bg-blue-100 border border-blue-300 rounded-lg text-blue-600 transition-all-smooth text-sm"
        >
          <BiEdit size={16} />
          Edit
        </button>
        <button
          onClick={onDelete}
          className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-red-50 hover:bg-red-100 border border-red-300 rounded-lg text-red-600 transition-all-smooth text-sm"
        >
          <BiTrash size={16} />
          Delete
        </button>
      </div>
    </div>
  );
}
