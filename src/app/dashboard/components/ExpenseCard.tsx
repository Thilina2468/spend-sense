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
    Food: 'bg-green-500/20 text-green-400 border-green-500/30',
    Transport: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    Entertainment: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    Shopping: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
    Bills: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    Health: 'bg-red-500/20 text-red-400 border-red-500/30',
    Education: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    Others: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  };

  return (
    <div className="bg-dark-card/40 backdrop-blur-md border border-dark-border/30 rounded-lg p-4 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-2xl font-bold text-neon-green">${expense.amount.toFixed(2)}</p>
          <p className="text-xs text-gray-500 mt-1">{new Date(expense.date).toLocaleDateString()}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${categoryColors[expense.category] || categoryColors.Others}`}>
          {expense.category}
        </span>
      </div>

      <p className="text-sm text-gray-300">{expense.description}</p>

      <div className="flex gap-2 pt-2">
        <button
          onClick={onEdit}
          className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-neon-blue/10 hover:bg-neon-blue/30 border border-neon-blue/30 rounded-lg text-neon-blue transition-all-smooth text-sm"
        >
          <BiEdit size={16} />
          Edit
        </button>
        <button
          onClick={onDelete}
          className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-red-500/10 hover:bg-red-500/30 border border-red-500/30 rounded-lg text-red-400 transition-all-smooth text-sm"
        >
          <BiTrash size={16} />
          Delete
        </button>
      </div>
    </div>
  );
}
