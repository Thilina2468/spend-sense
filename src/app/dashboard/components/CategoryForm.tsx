'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Category } from '@/types/dashboard';

type Props = {
  open: boolean;
  mode: 'add' | 'edit';
  category?: Category;
  onSave: (category: Category) => void;
  onClose: () => void;
};

const defaultColors = ['#22c55e', '#3b82f6', '#a855f7', '#ec4899', '#f59e0b', '#ef4444', '#06b6d4', '#64748b'];
const defaultEmojis = ['🍔', '🚗', '🎬', '🛍️', '💡', '🏥', '📚', '📦'];

export default function CategoryForm({ open, mode, category, onSave, onClose }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    color: defaultColors[0],
    icon: defaultEmojis[0],
  });

  useEffect(() => {
    if (mode === 'edit' && category) {
      setFormData({
        name: category.name,
        color: category.color,
        icon: category.icon,
      });
    } else {
      setFormData({
        name: '',
        color: defaultColors[0],
        icon: defaultEmojis[0],
      });
    }
  }, [category, mode, open]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!formData.name) {
      return;
    }

    const newCategory: Category = {
      id: category?.id || Date.now().toString(),
      name: formData.name,
      color: formData.color,
      icon: formData.icon,
      totalSpent: category?.totalSpent || 0,
    };

    onSave(newCategory);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white border-gray-200">
        <DialogHeader>
          <DialogTitle className="text-gray-900">{mode === 'add' ? 'Add Category' : 'Edit Category'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-gray-700">
              Category Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="e.g., Groceries"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-2 bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
              required
            />
          </div>

          <div>
            <Label className="text-gray-700">Color</Label>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {defaultColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData({ ...formData, color })}
                  className={`w-10 h-10 rounded-lg transition-all-smooth border-2 ${
                    formData.color === color ? 'border-gray-900 scale-110' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div>
            <Label className="text-gray-700">Emoji</Label>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {defaultEmojis.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setFormData({ ...formData, icon: emoji })}
                  className={`p-2 rounded-lg text-2xl transition-all-smooth border ${
                    formData.icon === emoji ? 'border-brand-green bg-brand-green-light' : 'border-gray-300 bg-white hover:bg-gray-50'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button variant="outline" onClick={onClose} className="border-gray-300 hover:bg-gray-50 text-gray-700">
              Cancel
            </Button>
            <Button type="submit" className="bg-brand-green hover:bg-brand-green-hover text-white font-semibold">
              {mode === 'add' ? 'Add Category' : 'Update Category'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
