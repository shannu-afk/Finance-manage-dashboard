import React from 'react';

export default function Navbar({ user, onLogout }) {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-purple-600">📊 PFM Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          {user && (
            <>
              <span className="text-gray-700 font-medium">{user.name}</span>
              <button
                onClick={onLogout}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
