'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import DeleteConfirmDialog from '../components/DeleteConfirmDialog';
import { mockExpenses, mockCategories } from '@/lib/mock-data';
import { Expense } from '@/types/dashboard';
import { BiPlus, BiSearch } from 'react-icons/bi';

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [formOpen, setFormOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | undefined>();
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filteredExpenses = useMemo(() => {
    return expenses
      .filter((exp) => {
        const matchesSearch = exp.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = filterCategory === 'all' || exp.category === filterCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [expenses, searchQuery, filterCategory]);

  const handleAddClick = () => {
    setEditingExpense(undefined);
    setFormOpen(true);
  };

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setFormOpen(true);
  };

  const handleSave = (expense: Expense) => {
    if (editingExpense) {
      setExpenses(expenses.map((e) => (e.id === expense.id ? expense : e)));
    } else {
      setExpenses([...expenses, expense]);
    }
    setFormOpen(false);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      setExpenses(expenses.filter((e) => e.id !== deleteId));
      setDeleteId(null);
      setDeleteConfirmOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Expenses</h1>
        <p className="text-gray-600">Manage all your expenses in one place</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1">
          <label className="text-sm text-gray-700 mb-2 block">Search</label>
          <div className="relative">
            <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search by description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:bg-white focus:border-brand-green"
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-700 mb-2 block">Category</label>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="bg-gray-50 border-gray-300 text-gray-900 w-full md:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200 shadow-lg">
              <SelectItem value="all" className="text-gray-900 hover:bg-gray-100">
                All Categories
              </SelectItem>
              {mockCategories.map((cat) => (
                <SelectItem key={cat.id} value={cat.name} className="text-gray-900 hover:bg-gray-100">
                  {cat.icon} {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleAddClick}
          className="w-full md:w-auto bg-brand-green hover:bg-brand-green-hover text-white font-semibold flex items-center gap-2 transition-all-smooth"
        >
          <BiPlus size={20} />
          Add Expense
        </Button>
      </div>

      <div>
        <p className="text-sm text-gray-600 mb-4">{filteredExpenses.length} expenses found</p>
        <ExpenseList expenses={filteredExpenses} onEdit={handleEdit} onDelete={handleDeleteClick} />
      </div>

      <ExpenseForm
        open={formOpen}
        mode={editingExpense ? 'edit' : 'add'}
        expense={editingExpense}
        onSave={handleSave}
        onClose={() => {
          setFormOpen(false);
          setEditingExpense(undefined);
        }}
      />

      <DeleteConfirmDialog
        open={deleteConfirmOpen}
        title="Delete Expense?"
        description="This action cannot be undone. The expense will be permanently removed."
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteConfirmOpen(false)}
      />
    </div>
  );
}
