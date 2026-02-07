'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import CategoryCard from '../components/CategoryCard';
import CategoryForm from '../components/CategoryForm';
import DeleteConfirmDialog from '../components/DeleteConfirmDialog';
import { mockCategories, calculateStats, mockExpenses } from '@/lib/mock-data';
import { Category } from '@/types/dashboard';
import { BiPlus } from 'react-icons/bi';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [formOpen, setFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | undefined>();
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const stats = useMemo(() => calculateStats(mockExpenses), []);
  const totalSpent = stats.totalAllTime;

  const handleAddClick = () => {
    setEditingCategory(undefined);
    setFormOpen(true);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormOpen(true);
  };

  const handleSave = (category: Category) => {
    const index = categories.findIndex((c) => c.id === category.id);
    if (index !== -1) {
      setCategories(categories.map((c) => (c.id === category.id ? category : c)));
    } else {
      setCategories([...categories, category]);
    }
    setFormOpen(false);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      setCategories(categories.filter((c) => c.id !== deleteId));
      setDeleteId(null);
      setDeleteConfirmOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Categories</h1>
          <p className="text-gray-400">Manage your spending categories</p>
        </div>
        <Button
          onClick={handleAddClick}
          className="bg-neon-green hover:bg-neon-green/90 text-black font-semibold flex items-center gap-2"
        >
          <BiPlus size={20} />
          Add Category
        </Button>
      </div>

      {categories.length === 0 ? (
        <div className="text-center py-12 bg-dark-card border border-dark-border rounded-xl">
          <p className="text-gray-400 mb-4">No categories yet. Create one to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => {
            const categoryExpenses = mockExpenses.filter((exp) => exp.category === category.name);
            const categoryTotal = categoryExpenses.reduce((sum, exp) => sum + exp.amount, 0);
            const percentage = totalSpent > 0 ? Math.round((categoryTotal / totalSpent) * 100) : 0;

            return (
              <CategoryCard
                key={category.id}
                category={{ ...category, totalSpent: categoryTotal }}
                percentage={percentage}
                onEdit={() => handleEdit(category)}
                onDelete={() => handleDeleteClick(category.id)}
              />
            );
          })}
        </div>
      )}

      <CategoryForm
        open={formOpen}
        mode={editingCategory ? 'edit' : 'add'}
        category={editingCategory}
        onSave={handleSave}
        onClose={() => {
          setFormOpen(false);
          setEditingCategory(undefined);
        }}
      />

      <DeleteConfirmDialog
        open={deleteConfirmOpen}
        title="Delete Category?"
        description="This will not affect existing expenses in this category, just remove the category itself."
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteConfirmOpen(false)}
      />
    </div>
  );
}
