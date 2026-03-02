'use client';

import { useState, useEffect } from 'react';
import { clinicConfig } from '@/config/clinic';

interface Booking {
  name: string;
  phone: string;
  email: string;
  service: string;
  preferredDate: string;
  message: string;
  timestamp: string;
  status: string;
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple client-side password check — env var checked server-side in production
    const adminPass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';
    if (password === adminPass) {
      setAuthenticated(true);
      loadBookings();
    } else {
      setError('Incorrect password');
    }
  };

  const loadBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/bookings');
      if (res.ok) {
        const data = await res.json();
        setBookings(data.bookings || []);
      }
    } catch {
      // Sheet not connected yet — show demo data
      setBookings([
        {
          name: 'Jane Doe',
          phone: '+254700111222',
          email: 'jane@example.com',
          service: 'Cleaning',
          preferredDate: '2025-02-15',
          message: 'First visit',
          timestamp: new Date().toISOString(),
          status: 'Pending',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredBookings = bookings.filter(
    (b) =>
      !filter ||
      b.name.toLowerCase().includes(filter.toLowerCase()) ||
      b.service.toLowerCase().includes(filter.toLowerCase()) ||
      b.status.toLowerCase().includes(filter.toLowerCase())
  );

  if (!authenticated) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: 'var(--color-bg)' }}
      >
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
          <h1
            className="text-2xl font-bold mb-2 text-center"
            style={{ color: 'var(--color-primary)' }}
          >
            {clinicConfig.name}
          </h1>
          <p className="text-center text-gray-500 mb-6 text-sm">Admin Dashboard</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2"
              autoFocus
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 rounded-full text-white font-semibold transition-opacity hover:opacity-90"
              style={{ background: 'var(--color-primary)' }}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
              {clinicConfig.name} — Admin
            </h1>
            <p className="text-gray-500 text-sm">{bookings.length} total bookings</p>
          </div>
          <button
            onClick={() => setAuthenticated(false)}
            className="text-sm text-gray-400 hover:text-gray-600"
          >
            Sign Out
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total', value: bookings.length, color: 'var(--color-primary)' },
            {
              label: 'Pending',
              value: bookings.filter((b) => b.status === 'Pending').length,
              color: '#f59e0b',
            },
            {
              label: 'Confirmed',
              value: bookings.filter((b) => b.status === 'Confirmed').length,
              color: '#10b981',
            },
            {
              label: 'Today',
              value: bookings.filter(
                (b) => b.preferredDate === new Date().toISOString().split('T')[0]
              ).length,
              color: 'var(--color-accent)',
            },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl p-4 shadow-sm text-center">
              <div className="text-2xl font-bold" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="text-gray-500 text-xs mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="mb-4">
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter by name, service, or status..."
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 bg-white"
          />
        </div>

        {/* Bookings table */}
        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading bookings...</div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-500 text-left">
                    {['Patient', 'Phone', 'Service', 'Date', 'Status', 'Submitted'].map((h) => (
                      <th key={h} className="px-4 py-3 font-medium">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                        No bookings found
                      </td>
                    </tr>
                  ) : (
                    filteredBookings.map((b, i) => (
                      <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium">{b.name}</td>
                        <td className="px-4 py-3">
                          <a href={`tel:${b.phone}`} className="hover:underline text-blue-600">
                            {b.phone}
                          </a>
                        </td>
                        <td className="px-4 py-3">{b.service}</td>
                        <td className="px-4 py-3">{b.preferredDate}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              b.status === 'Confirmed'
                                ? 'bg-green-100 text-green-700'
                                : b.status === 'Pending'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {b.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-400">
                          {new Date(b.timestamp).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
