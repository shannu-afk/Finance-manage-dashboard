import React from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Dashboard({ accounts, transactions, totalBalance }) {
  // Calculate spending by category
  const spendingByCategory = transactions
    .filter((tx) => tx.type === 'debit')
    .reduce((acc, tx) => {
      const existing = acc.find((item) => item.name === tx.category);
      if (existing) {
        existing.value += tx.amount;
      } else {
        acc.push({ name: tx.category, value: tx.amount });
      }
      return acc;
    }, []);

  // Calculate income vs expense
  const totalIncome = transactions
    .filter((tx) => tx.type === 'credit')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalExpense = transactions
    .filter((tx) => tx.type === 'debit')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const incomeExpenseData = [
    { name: 'Income', value: totalIncome },
    { name: 'Expenses', value: totalExpense },
  ];

  const COLORS = ['#8b5cf6', '#6366f1', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444'];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg shadow p-6">
          <p className="text-sm opacity-90 mb-2">Total Balance</p>
          <p className="text-3xl font-bold">${totalBalance.toFixed(2)}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg shadow p-6">
          <p className="text-sm opacity-90 mb-2">Total Income</p>
          <p className="text-3xl font-bold">${totalIncome.toFixed(2)}</p>
        </div>
        <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-lg shadow p-6">
          <p className="text-sm opacity-90 mb-2">Total Expenses</p>
          <p className="text-3xl font-bold">${totalExpense.toFixed(2)}</p>
        </div>
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-lg shadow p-6">
          <p className="text-sm opacity-90 mb-2">Accounts</p>
          <p className="text-3xl font-bold">{accounts.length}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spending by Category */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Spending by Category</h3>
          {spendingByCategory.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={spendingByCategory}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {spendingByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500">No spending data available</p>
          )}
        </div>

        {/* Income vs Expenses */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Income vs Expenses</h3>
          {incomeExpenseData.some((item) => item.value > 0) ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={incomeExpenseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                <Bar dataKey="value" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500">No income/expense data available</p>
          )}
        </div>
      </div>

      {/* Accounts Overview */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Accounts Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {accounts.map((account) => (
            <div key={account._id} className="border border-gray-200 rounded-lg p-4">
              <p className="text-sm text-gray-600">{account.accountName}</p>
              <p className="text-2xl font-bold text-gray-800 mt-2">${account.balance.toFixed(2)}</p>
              <p className="text-xs text-gray-500 mt-2 capitalize">{account.accountType}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
