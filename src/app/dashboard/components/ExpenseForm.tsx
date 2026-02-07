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
      <DialogContent className="bg-dark-card/40 backdrop-blur-md border-dark-border/30">
        <DialogHeader>
          <DialogTitle className="text-white">{mode === 'add' ? 'Add Expense' : 'Edit Expense'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="amount" className="text-gray-300">
              Amount
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="mt-2 bg-dark-bg/50 border-dark-border/30 text-white placeholder-gray-600"
              required
            />
          </div>

          <div>
            <Label htmlFor="category" className="text-gray-300">
              Category
            </Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger className="mt-2 bg-dark-bg/50 border-dark-border/30 text-white">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-dark-card/40 backdrop-blur-md border-dark-border/30">
                {mockCategories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.name} className="bg-dark-card text-white hover:bg-dark-bg">
                    {cat.icon} {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description" className="text-gray-300">
              Description
            </Label>
            <Input
              id="description"
              type="text"
              placeholder="What did you spend on?"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="mt-2 bg-dark-bg/50 border-dark-border/30 text-white placeholder-gray-600"
              required
            />
          </div>

          <div>
            <Label htmlFor="date" className="text-gray-300">
              Date
            </Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="mt-2 bg-dark-bg border-dark-border text-white"
              required
            />
          </div>

          <DialogFooter className="pt-4">
            <Button variant="outline" onClick={onClose} className="border-dark-border/30 hover:bg-dark-bg/30 text-gray-300">
              Cancel
            </Button>
            <Button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold">
              {mode === 'add' ? 'Add Expense' : 'Update Expense'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
