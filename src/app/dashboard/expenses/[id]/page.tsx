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
        <h1 className="text-2xl font-bold text-white mb-4">Expense not found</h1>
        <Button onClick={() => router.push('/dashboard/expenses')} className="bg-neon-green hover:bg-neon-green/90 text-black">
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
        className="text-gray-400 hover:text-white hover:bg-dark-bg flex items-center gap-2"
      >
        <BiArrowBack /> Back
      </Button>

      <div className="bg-dark-card border border-dark-border rounded-xl p-8 space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-gray-400 text-sm mb-2">Amount</p>
            <p className="text-5xl font-bold text-neon-green">${expense.amount.toFixed(2)}</p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setFormOpen(true)}
              className="bg-neon-blue/10 hover:bg-neon-blue/20 text-neon-blue border border-neon-blue/50 flex items-center gap-2"
            >
              <BiEdit /> Edit
            </Button>
            <Button
              onClick={() => setDeleteOpen(true)}
              className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/50 flex items-center gap-2"
            >
              <BiTrash /> Delete
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-dark-border">
          <div>
            <p className="text-gray-400 text-sm mb-2">Category</p>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{category?.icon}</span>
              <span className="text-white font-semibold">{expense.category}</span>
            </div>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-2">Date</p>
            <p className="text-white text-lg">{new Date(expense.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>

        <div className="pt-4 border-t border-dark-border">
          <p className="text-gray-400 text-sm mb-2">Description</p>
          <p className="text-white text-lg">{expense.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-dark-border text-sm">
          <div>
            <p className="text-gray-500">Created</p>
            <p className="text-gray-300">{new Date(expense.createdAt).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-500">ID</p>
            <p className="text-gray-300 font-mono">{expense.id}</p>
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
