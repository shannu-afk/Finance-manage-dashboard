import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { accountAPI, transactionAPI } from '../services/api';
import Navbar from '../components/Navbar';
import AccountsList from '../components/AccountsList';
import Dashboard from '../components/Dashboard';
import TransactionForm from '../components/TransactionForm';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [accountsRes, transactionsRes, balanceRes] = await Promise.all([
        accountAPI.getAccounts(),
        transactionAPI.getTransactions({}),
        accountAPI.getTotalBalance(),
      ]);
      setAccounts(accountsRes.data.accounts);
      setTransactions(transactionsRes.data.transactions);
      setTotalBalance(balanceRes.data.totalBalance);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onLogout={handleLogout} />

      <div className="max-w-7xl mx-auto py-6 px-4">
        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 font-semibold transition-colors ${
              activeTab === 'dashboard'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('accounts')}
            className={`px-4 py-2 font-semibold transition-colors ${
              activeTab === 'accounts'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Accounts
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`px-4 py-2 font-semibold transition-colors ${
              activeTab === 'transactions'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Transactions
          </button>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading...</p>
          </div>
        ) : (
          <>
            {activeTab === 'dashboard' && (
              <Dashboard accounts={accounts} transactions={transactions} totalBalance={totalBalance} />
            )}
            {activeTab === 'accounts' && <AccountsList accounts={accounts} onRefresh={fetchData} />}
            {activeTab === 'transactions' && (
              <div className="space-y-6">
                <TransactionForm onSuccess={fetchData} accounts={accounts} />
                <div className="bg-white rounded-lg shadow">
                  <div className="px-6 py-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Transactions</h2>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-2 px-4 font-semibold text-gray-700">Date</th>
                            <th className="text-left py-2 px-4 font-semibold text-gray-700">Merchant</th>
                            <th className="text-left py-2 px-4 font-semibold text-gray-700">Category</th>
                            <th className="text-left py-2 px-4 font-semibold text-gray-700">Amount</th>
                            <th className="text-left py-2 px-4 font-semibold text-gray-700">Type</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transactions.map((tx) => (
                            <tr key={tx._id} className="border-b border-gray-100 hover:bg-gray-50">
                              <td className="py-2 px-4 text-gray-700">
                                {new Date(tx.transactionDate).toLocaleDateString()}
                              </td>
                              <td className="py-2 px-4 text-gray-700">{tx.merchant}</td>
                              <td className="py-2 px-4 text-gray-700">{tx.category}</td>
                              <td className="py-2 px-4 font-semibold text-gray-900">
                                ${Math.abs(tx.amount).toFixed(2)}
                              </td>
                              <td className="py-2 px-4">
                                <span
                                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                    tx.type === 'credit'
                                      ? 'bg-green-100 text-green-700'
                                      : 'bg-red-100 text-red-700'
                                  }`}
                                >
                                  {tx.type}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
