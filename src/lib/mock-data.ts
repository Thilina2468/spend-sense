import type { Expense, Category, MonthlyData, DashboardStats } from '@/types/dashboard';

export const mockCategories: Category[] = [
  { id: '1', name: 'Food', color: '#22c55e', icon: '🍔', totalSpent: 450.75 },
  { id: '2', name: 'Transport', color: '#3b82f6', icon: '🚗', totalSpent: 280.00 },
  { id: '3', name: 'Entertainment', color: '#a855f7', icon: '🎬', totalSpent: 195.50 },
  { id: '4', name: 'Shopping', color: '#ec4899', icon: '🛍️', totalSpent: 320.25 },
  { id: '5', name: 'Bills', color: '#f59e0b', icon: '💡', totalSpent: 540.00 },
  { id: '6', name: 'Health', color: '#ef4444', icon: '🏥', totalSpent: 125.00 },
  { id: '7', name: 'Education', color: '#06b6d4', icon: '📚', totalSpent: 200.00 },
  { id: '8', name: 'Others', color: '#64748b', icon: '📦', totalSpent: 89.50 },
];

export const mockExpenses: Expense[] = [
  { id: '1', amount: 45.50, category: 'Food', description: 'Grocery shopping at Whole Foods', date: '2026-02-05', createdAt: '2026-02-05T10:30:00Z' },
  { id: '2', amount: 120.00, category: 'Transport', description: 'Monthly metro pass', date: '2026-02-01', createdAt: '2026-02-01T08:00:00Z' },
  { id: '3', amount: 95.00, category: 'Entertainment', description: 'Netflix + Spotify subscription', date: '2026-02-03', createdAt: '2026-02-03T15:20:00Z' },
  { id: '4', amount: 200.00, category: 'Shopping', description: 'New winter jacket', date: '2026-02-04', createdAt: '2026-02-04T12:45:00Z' },
  { id: '5', amount: 150.00, category: 'Bills', description: 'Electricity bill', date: '2026-02-02', createdAt: '2026-02-02T09:15:00Z' },
  { id: '6', amount: 32.99, category: 'Food', description: 'Lunch at Chipotle', date: '2026-02-04', createdAt: '2026-02-04T13:00:00Z' },
  { id: '7', amount: 160.00, category: 'Transport', description: 'Uber rides', date: '2026-02-03', createdAt: '2026-02-03T18:30:00Z' },
  { id: '8', amount: 75.00, category: 'Health', description: 'Gym membership', date: '2026-02-01', createdAt: '2026-02-01T07:00:00Z' },
  { id: '9', amount: 120.50, category: 'Shopping', description: 'Amazon purchase - shoes', date: '2026-02-02', createdAt: '2026-02-02T20:10:00Z' },
  { id: '10', amount: 28.75, category: 'Food', description: 'Coffee and pastries', date: '2026-02-05', createdAt: '2026-02-05T08:30:00Z' },
  { id: '11', amount: 200.00, category: 'Education', description: 'Online course subscription', date: '2026-01-30', createdAt: '2026-01-30T14:20:00Z' },
  { id: '12', amount: 45.00, category: 'Entertainment', description: 'Movie tickets', date: '2026-01-28', createdAt: '2026-01-28T19:45:00Z' },
  { id: '13', amount: 89.99, category: 'Shopping', description: 'H&M clothing sale', date: '2026-01-25', createdAt: '2026-01-25T16:30:00Z' },
  { id: '14', amount: 60.00, category: 'Food', description: 'Dinner at Italian restaurant', date: '2026-01-24', createdAt: '2026-01-24T20:00:00Z' },
  { id: '15', amount: 30.00, category: 'Transport', description: 'Gas for car', date: '2026-01-23', createdAt: '2026-01-23T11:15:00Z' },
  { id: '16', amount: 125.00, category: 'Bills', description: 'Internet bill', date: '2026-01-20', createdAt: '2026-01-20T10:00:00Z' },
  { id: '17', amount: 50.00, category: 'Health', description: 'Vitamins and supplements', date: '2026-01-22', createdAt: '2026-01-22T14:30:00Z' },
  { id: '18', amount: 75.50, category: 'Others', description: 'Car wash and maintenance', date: '2026-01-19', createdAt: '2026-01-19T12:00:00Z' },
  { id: '19', amount: 40.00, category: 'Entertainment', description: 'Concert tickets', date: '2026-01-18', createdAt: '2026-01-18T17:20:00Z' },
  { id: '20', amount: 155.00, category: 'Shopping', description: 'Gaming mouse and keyboard', date: '2026-01-15', createdAt: '2026-01-15T15:45:00Z' },
];

export const mockUser = {
  id: '1',
  username: 'John Doe',
  email: 'john@example.com',
  joinDate: '2025-06-15',
};

export const mockMonthlyData: MonthlyData[] = [
  { month: 'Sep', amount: 1850 },
  { month: 'Oct', amount: 1620 },
  { month: 'Nov', amount: 2100 },
  { month: 'Dec', amount: 2450 },
  { month: 'Jan', amount: 1950 },
  { month: 'Feb', amount: 1450 },
];

export const calculateStats = (expenses: Expense[]): DashboardStats => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const thisMonthExpenses = expenses.filter((exp) => {
    const date = new Date(exp.date);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  });

  const totalThisMonth = thisMonthExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const totalAllTime = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const averagePerDay = totalAllTime / 30;

  const byCategory = mockCategories
    .map((cat) => {
      const categoryExpenses = expenses.filter((exp) => exp.category === cat.name);
      const amount = categoryExpenses.reduce((sum, exp) => sum + exp.amount, 0);
      return {
        category: cat.name,
        amount,
        percentage: totalAllTime > 0 ? Math.round((amount / totalAllTime) * 100) : 0,
      };
    })
    .filter((cat) => cat.amount > 0);

  const lastMonthTotal = 1950;
  const trendPercentage = totalThisMonth > 0 ? Math.round(((totalThisMonth - lastMonthTotal) / lastMonthTotal) * 100) : 0;

  return {
    totalThisMonth,
    totalAllTime,
    averagePerDay: Math.round(averagePerDay * 100) / 100,
    trendPercentage,
    byCategory,
    monthlyTrend: mockMonthlyData,
  };
};
