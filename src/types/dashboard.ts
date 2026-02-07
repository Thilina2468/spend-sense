export type Expense = {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  createdAt: string;
};

export type Category = {
  id: string;
  name: string;
  color: string;
  icon: string;
  totalSpent: number;
};

export type MonthlyData = {
  month: string;
  amount: number;
};

export type DashboardStats = {
  totalThisMonth: number;
  totalAllTime: number;
  averagePerDay: number;
  trendPercentage: number;
  byCategory: { category: string; amount: number; percentage: number }[];
  monthlyTrend: MonthlyData[];
};
