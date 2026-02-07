'use client';

import { Expense } from '@/types/dashboard';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { BiEdit, BiTrash } from 'react-icons/bi';
import ExpenseCard from './ExpenseCard';

type Props = {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
};

export default function ExpenseList({ expenses, onEdit, onDelete }: Props) {
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

  if (expenses.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 mb-4">No expenses yet. Start by adding one!</p>
      </div>
    );
  }

  return (
    <>
      <div className="hidden md:block bg-dark-card border border-dark-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-dark-bg border-b border-dark-border">
            <TableRow className="border-dark-border hover:bg-transparent">
              <TableHead className="text-gray-400">Date</TableHead>
              <TableHead className="text-gray-400">Description</TableHead>
              <TableHead className="text-gray-400">Category</TableHead>
              <TableHead className="text-gray-400 text-right">Amount</TableHead>
              <TableHead className="text-gray-400 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map((expense, idx) => (
              <TableRow key={expense.id} className={`border-dark-border hover:bg-dark-bg/50 ${idx % 2 === 0 ? 'bg-dark-card' : 'bg-dark-card/50'}`}>
                <TableCell className="text-gray-300">{new Date(expense.date).toLocaleDateString()}</TableCell>
                <TableCell className="text-gray-300">{expense.description}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${categoryColors[expense.category] || categoryColors.Others}`}>
                    {expense.category}
                  </span>
                </TableCell>
                <TableCell className="text-right text-neon-green font-semibold">${expense.amount.toFixed(2)}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(expense)}
                    className="text-neon-blue hover:bg-neon-blue/10 h-8 w-8 p-0"
                  >
                    <BiEdit size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(expense.id)}
                    className="text-red-400 hover:bg-red-500/10 h-8 w-8 p-0"
                  >
                    <BiTrash size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="md:hidden space-y-3">
        {expenses.map((expense) => (
          <ExpenseCard key={expense.id} expense={expense} onEdit={() => onEdit(expense)} onDelete={() => onDelete(expense.id)} />
        ))}
      </div>
    </>
  );
}
