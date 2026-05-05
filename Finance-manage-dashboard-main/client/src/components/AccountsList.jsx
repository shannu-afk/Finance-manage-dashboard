import React, { useState, useEffect } from 'react';
import { accountAPI } from '../services/api';

export default function AccountsList({ accounts, onRefresh }) {
  const [formData, setFormData] = useState({
    accountName: '',
    accountType: 'checking',
    balance: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'balance' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await accountAPI.createAccount(formData);
      setFormData({ accountName: '', accountType: 'checking', balance: '' });
      onRefresh();
    } catch (error) {
      console.error('Error creating account:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this account?')) {
      try {
        await accountAPI.deleteAccount(id);
        onRefresh();
      } catch (error) {
        console.error('Error deleting account:', error);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Create Account Form */}
      <div className="lg:col-span-1 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Add Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Account Name</label>
            <input
              type="text"
              name="accountName"
              value={formData.accountName}
              onChange={handleChange}
              placeholder="My Checking"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              name="accountType"
              value={formData.accountType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="checking">Checking</option>
              <option value="savings">Savings</option>
              <option value="credit">Credit</option>
              <option value="investment">Investment</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Balance</label>
            <input
              type="number"
              name="balance"
              value={formData.balance}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50"
          >
            {isLoading ? 'Adding...' : 'Add Account'}
          </button>
        </form>
      </div>

      {/* Accounts List */}
      <div className="lg:col-span-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {accounts.map((account) => (
            <div key={account._id} className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm opacity-90">{account.accountName}</p>
                  <p className="text-xs opacity-75 capitalize">{account.accountType}</p>
                </div>
                <button
                  onClick={() => handleDelete(account._id)}
                  className="text-white hover:text-red-200 transition"
                >
                  ✕
                </button>
              </div>
              <div className="mb-4">
                <p className="text-3xl font-bold">${account.balance.toFixed(2)}</p>
              </div>
              <p className="text-xs opacity-75">{account.institution}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
