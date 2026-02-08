'use client';

import { Expense } from '@/types/dashboard';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { BiEdit, BiTrash, BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import ExpenseCard from './ExpenseCard';
import { useState, useEffect } from 'react';

type Props = {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
};

export default function ExpenseList({ expenses, onEdit, onDelete }: Props) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(expenses.length / itemsPerPage);

  useEffect(() => {
    if (currentPage >= totalPages && totalPages > 0) {
      setCurrentPage(totalPages - 1);
    } else if (totalPages === 0) {
      setCurrentPage(0);
    }
  }, [expenses.length, totalPages]);

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

  const paginatedExpenses = expenses.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  if (expenses.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">No expenses yet. Start by adding one!</p>
      </div>
    );
  }

  return (
    <>
      <div className="hidden md:block bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50 border-b border-gray-200">
            <TableRow className="border-gray-200 hover:bg-transparent">
              <TableHead className="text-gray-600">Date</TableHead>
              <TableHead className="text-gray-600">Description</TableHead>
              <TableHead className="text-gray-600">Category</TableHead>
              <TableHead className="text-gray-600 text-right">Amount</TableHead>
              <TableHead className="text-gray-600 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedExpenses.map((expense, idx) => (
              <TableRow key={expense.id} className={`border-gray-200 hover:bg-gray-50 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <TableCell className="text-gray-900">{new Date(expense.date).toLocaleDateString()}</TableCell>
                <TableCell className="text-gray-900">{expense.description}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${categoryColors[expense.category] || categoryColors.Others}`}>
                    {expense.category}
                  </span>
                </TableCell>
                <TableCell className="text-right text-brand-green font-semibold">${expense.amount.toFixed(2)}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(expense)}
                    className="text-blue-600 hover:bg-blue-50 h-8 w-8 p-0"
                  >
                    <BiEdit size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(expense.id)}
                    className="text-red-600 hover:bg-red-50 h-8 w-8 p-0"
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
        {paginatedExpenses.map((expense) => (
          <ExpenseCard key={expense.id} expense={expense} onEdit={() => onEdit(expense)} onDelete={() => onDelete(expense.id)} />
        ))}
      </div>

      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-600">
          Page {currentPage + 1} of {totalPages} ({expenses.length} total)
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
            className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <BiChevronLeft size={20} />
            Previous
          </Button>
          <Button
            onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
            disabled={currentPage === totalPages - 1}
            className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            Next
            <BiChevronRight size={20} />
          </Button>
        </div>
      </div>
    </>
  );
}
