'use client';

import { useMemo } from 'react';
import { LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import StatsCard from './components/StatsCard';
import ChartCard from './components/ChartCard';
import ExpenseList from './components/ExpenseList';
import { mockExpenses, mockUser, calculateStats } from '@/lib/mock-data';
import { BiTrendingUp, BiWallet, BiBarChart, BiListUl } from 'react-icons/bi';

export default function DashboardPage() {
  const stats = useMemo(() => calculateStats(mockExpenses), []);

  const recentExpenses = mockExpenses.slice(0, 10);

  const pieColors = ['#4EA685', '#3b82f6', '#a855f7', '#ec4899', '#f59e0b', '#ef4444', '#06b6d4', '#64748b'];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Welcome back, {mockUser.username}!</h1>
        <p className="text-gray-600">Here's your spending overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="This Month"
          value={stats.totalThisMonth}
          icon={<BiWallet />}
          trend={{ value: Math.abs(stats.trendPercentage), direction: stats.trendPercentage > 0 ? 'up' : 'down' }}
        />
        <StatsCard title="All Time" value={stats.totalAllTime} icon={<BiTrendingUp />} />
        <StatsCard title="Average/Day" value={stats.averagePerDay} icon={<BiBarChart />} />
        <StatsCard title="Total Expenses" value={mockExpenses.length} icon={<BiListUl />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Monthly Spending Trend">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={stats.monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis stroke="#6b7280" tick={{ fill: '#6b7280' }} />
              <YAxis stroke="#6b7280" tick={{ fill: '#6b7280' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                labelStyle={{ color: '#111827' }}
                itemStyle={{ color: '#6b7280' }}
              />
              <Line type="monotone" dataKey="amount" stroke="#4EA685" strokeWidth={2} dot={{ fill: '#4EA685', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Spending by Category">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={stats.byCategory} dataKey="percentage" nameKey="category" cx="50%" cy="50%" outerRadius={80} label>
                {stats.byCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                labelStyle={{ color: '#111827' }}
                itemStyle={{ color: '#6b7280' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Recent Expenses</h2>
        </div>
        <ExpenseList expenses={recentExpenses} onEdit={() => {}} onDelete={() => {}} />
      </div>
    </div>
  );
}
