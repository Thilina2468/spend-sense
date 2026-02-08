'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { mockExpenses, mockCategories } from '@/lib/mock-data';
import { Expense } from '@/types/dashboard';
import { BiArrowBack, BiEdit, BiTrash } from 'react-icons/bi';
import ExpenseForm from '../../components/ExpenseForm';
import DeleteConfirmDialog from '../../components/DeleteConfirmDialog';

export default function ExpenseDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const expense = mockExpenses.find((e) => e.id === params.id);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  if (!expense) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Expense not found</h1>
        <Button onClick={() => router.push('/dashboard/expenses')} className="bg-brand-green hover:bg-brand-green-hover text-white">
          Back to Expenses
        </Button>
      </div>
    );
  }

  const category = mockCategories.find((c) => c.name === expense.category);

  const handleSave = (updated: Expense) => {
    const index = mockExpenses.findIndex((e) => e.id === updated.id);
    if (index !== -1) {
      mockExpenses[index] = updated;
    }
    setFormOpen(false);
    router.refresh();
  };

  const handleDelete = () => {
    const index = mockExpenses.findIndex((e) => e.id === expense.id);
    if (index !== -1) {
      mockExpenses.splice(index, 1);
    }
    router.push('/dashboard/expenses');
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <Button
        onClick={() => router.back()}
        variant="ghost"
        className="text-gray-600 hover:text-brand-green hover:bg-gray-50 flex items-center gap-2"
      >
        <BiArrowBack /> Back
      </Button>

      <div className="bg-white border border-gray-200 shadow-md rounded-xl p-8 space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-gray-600 text-sm mb-2">Amount</p>
            <p className="text-5xl font-bold text-brand-green">${expense.amount.toFixed(2)}</p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setFormOpen(true)}
              className="bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-300 flex items-center gap-2"
            >
              <BiEdit /> Edit
            </Button>
            <Button
              onClick={() => setDeleteOpen(true)}
              className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-300 flex items-center gap-2"
            >
              <BiTrash /> Delete
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
          <div>
            <p className="text-gray-600 text-sm mb-2">Category</p>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{category?.icon}</span>
              <span className="text-gray-900 font-semibold">{expense.category}</span>
            </div>
          </div>
          <div>
            <p className="text-gray-600 text-sm mb-2">Date</p>
            <p className="text-gray-900 text-lg">{new Date(expense.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <p className="text-gray-600 text-sm mb-2">Description</p>
          <p className="text-gray-900 text-lg">{expense.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 text-sm">
          <div>
            <p className="text-gray-600">Created</p>
            <p className="text-gray-700">{new Date(expense.createdAt).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-600">ID</p>
            <p className="text-gray-700 font-mono">{expense.id}</p>
          </div>
        </div>
      </div>

      <ExpenseForm
        open={formOpen}
        mode="edit"
        expense={expense}
        onSave={handleSave}
        onClose={() => setFormOpen(false)}
      />

      <DeleteConfirmDialog
        open={deleteOpen}
        title="Delete Expense?"
        description="This action cannot be undone. The expense will be permanently removed."
        onConfirm={handleDelete}
        onCancel={() => setDeleteOpen(false)}
      />
    </div>
  );
}
