import React, { useState } from 'react';
import { transactionAPI } from '../services/api';

export default function TransactionForm({ onSuccess, accounts }) {
  const [formData, setFormData] = useState({
    accountId: accounts[0]?._id || '',
    amount: '',
    type: 'debit',
    category: 'Uncategorized',
    merchant: '',
    description: '',
    transactionDate: new Date().toISOString().split('T')[0],
  });
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    'Uncategorized',
    'Food & Dining',
    'Shopping',
    'Transportation',
    'Utilities',
    'Entertainment',
    'Healthcare',
    'Salary',
    'Other',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await transactionAPI.createTransaction(formData);
      setFormData({
        accountId: accounts[0]?._id || '',
        amount: '',
        type: 'debit',
        category: 'Uncategorized',
        merchant: '',
        description: '',
        transactionDate: new Date().toISOString().split('T')[0],
      });
      onSuccess();
    } catch (error) {
      console.error('Error creating transaction:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Add Transaction</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Account</label>
          <select
            name="accountId"
            value={formData.accountId}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          >
            <option value="">Select Account</option>
            {accounts.map((account) => (
              <option key={account._id} value={account._id}>
                {account.accountName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="debit">Debit (Expense)</option>
            <option value="credit">Credit (Income)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Merchant</label>
          <input
            type="text"
            name="merchant"
            value={formData.merchant}
            onChange={handleChange}
            placeholder="Amazon, Starbucks"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            type="date"
            name="transactionDate"
            value={formData.transactionDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Optional notes"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="md:col-span-2 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50"
        >
          {isLoading ? 'Adding...' : 'Add Transaction'}
        </button>
      </form>
    </div>
  );
}
