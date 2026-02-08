'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Expense } from '@/types/dashboard';
import { mockCategories } from '@/lib/mock-data';

type Props = {
  open: boolean;
  mode: 'add' | 'edit';
  expense?: Expense;
  onSave: (expense: Expense) => void;
  onClose: () => void;
};

export default function ExpenseForm({ open, mode, expense, onSave, onClose }: Props) {
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (mode === 'edit' && expense) {
      setFormData({
        amount: expense.amount.toString(),
        category: expense.category,
        description: expense.description,
        date: expense.date,
      });
    } else {
      setFormData({
        amount: '',
        category: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
      });
    }
  }, [expense, mode, open]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!formData.amount || !formData.category || !formData.description) {
      return;
    }

    const newExpense: Expense = {
      id: expense?.id || Date.now().toString(),
      amount: parseFloat(formData.amount),
      category: formData.category,
      description: formData.description,
      date: formData.date,
      createdAt: expense?.createdAt || new Date().toISOString(),
    };

    onSave(newExpense);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white border-gray-200">
        <DialogHeader>
          <DialogTitle className="text-gray-900">{mode === 'add' ? 'Add Expense' : 'Edit Expense'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="amount" className="text-gray-700">
              Amount
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="mt-2 bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
              required
            />
          </div>

          <div>
            <Label htmlFor="category" className="text-gray-700">
              Category
            </Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger className="mt-2 bg-gray-50 border-gray-300 text-gray-900">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200 shadow-lg">
                {mockCategories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.name} className="text-gray-900 hover:bg-gray-100">
                    {cat.icon} {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description" className="text-gray-700">
              Description
            </Label>
            <Input
              id="description"
              type="text"
              placeholder="What did you spend on?"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="mt-2 bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
              required
            />
          </div>

          <div>
            <Label htmlFor="date" className="text-gray-700">
              Date
            </Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="mt-2 bg-gray-50 border-gray-300 text-gray-900"
              required
            />
          </div>

          <DialogFooter className="pt-4">
            <Button variant="outline" onClick={onClose} className="border-gray-300 hover:bg-gray-50 text-gray-700">
              Cancel
            </Button>
            <Button type="submit" className="bg-brand-green hover:bg-brand-green-hover text-white font-semibold">
              {mode === 'add' ? 'Add Expense' : 'Update Expense'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
