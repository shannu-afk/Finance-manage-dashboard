import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function PlaidLink() {
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const handleConnectBank = async () => {
    setLoading(true);
    try {
      // 1. Get link_token
      const response = await fetch('http://localhost:5000/api/plaid/link_token', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const { link_token } = await response.json();

      // 2. Load Plaid Link
      const { plaid } = await loadPlaidScript();
      const handler = plaid.create({
        token: link_token,
        onSuccess: (public_token) => {
          // 3. Exchange
          fetch('http://localhost:5000/api/plaid/exchange', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ public_token }),
          }).then(() => {
            alert('Bank connected! Refresh dashboard.');
          });
        },
        onExit: () => setLoading(false),
      });
      handler.open();
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const loadPlaidScript = async () => {
    return new Promise((resolve) => {
      if (window.plaid) {
        resolve({ plaid: window.plaid });
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://cdn.plaid.com/link/v2/stable/link-initialize.js';
      script.async = true;
      script.onload = () => resolve({ plaid: window.plaid });
      document.head.appendChild(script);
    });
  };

  return (
    <button
      onClick={handleConnectBank}
      disabled={loading}
      className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 transition-colors"
    >
      {loading ? 'Loading...' : 'Connect Bank Account'}
    </button>
  );
}

