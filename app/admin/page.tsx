'use client';

import { useState, useEffect, useCallback } from 'react';
import { clinicConfig } from '@/config/clinic';

interface Booking {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  branch: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
  timestamp: string;
  status: string;
}

const NEWSLETTER_TIPS = [
  {
    label: '🦷 Brushing Tip',
    subject: '🦷 Quick Dental Tip from Bright Smiles',
    body: `<h3 style="color:#1B4F72;">Did you know?</h3><p style="color:#444;line-height:1.7;">Brushing twice a day for <strong>2 minutes each time</strong> reduces cavities by up to 40%. Use a soft-bristled brush and fluoride toothpaste.</p><p style="color:#444;line-height:1.7;">Also — replace your toothbrush every <strong>3 months</strong>, or after any illness.</p>`,
  },
  {
    label: '✨ Whitening Offer',
    subject: '✨ Special Whitening Package — Bright Smiles',
    body: `<h3 style="color:#1B4F72;">Brighten Your Smile This Season!</h3><p style="color:#444;line-height:1.7;">We're running a special whitening package for our valued patients. Walk out with a noticeably brighter smile in just one visit.</p><ul style="color:#444;line-height:2;"><li>Professional in-chair whitening</li><li>Take-home maintenance kit</li><li>Free follow-up check</li></ul><p style="color:#1B4F72;font-weight:600;">Book this week to secure your slot.</p>`,
  },
  {
    label: '🍬 Sugar & Teeth',
    subject: '🍬 How Sugar Affects Your Teeth — Bright Smiles',
    body: `<h3 style="color:#1B4F72;">Sugar & Your Teeth</h3><p style="color:#444;line-height:1.7;">Sugar feeds bacteria in your mouth which produce acids that attack enamel — the main cause of cavities.</p><p style="color:#444;line-height:1.7;"><strong>3 easy habits:</strong></p><ol style="color:#444;line-height:2;"><li>Rinse with water after sugary drinks</li><li>Chew sugar-free gum to stimulate saliva</li><li>Wait 30 min after eating before brushing</li></ol>`,
  },
  {
    label: '👶 Kids Dental',
    subject: '👶 Dental Tips for Kids — Bright Smiles',
    body: `<h3 style="color:#1B4F72;">Healthy Teeth Start Young</h3><p style="color:#444;line-height:1.7;">Children should have their first dental visit by age 1, or when the first tooth appears. Early visits prevent fear and catch issues early.</p><ul style="color:#444;line-height:2;"><li>Supervise brushing until age 7–8</li><li>Use a pea-sized amount of fluoride toothpaste</li><li>Limit juice and sugary snacks</li></ul>`,
  },
];

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'newsletter' | 'reminders'>('overview');

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const [nlSubject, setNlSubject] = useState('');
  const [nlBody, setNlBody] = useState('');
  const [nlSending, setNlSending] = useState(false);
  const [nlResult, setNlResult] = useState<{ sent: number; failed: number; total: number } | null>(null);
  const [selectedTip, setSelectedTip] = useState<number | null>(null);

  const [reminderSending, setReminderSending] = useState(false);
  const [reminderResult, setReminderResult] = useState<{ sent: number; skipped: number } | null>(null);

  const adminPass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';

  const loadBookings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/bookings', { headers: { 'x-admin-token': adminPass } });
      if (res.ok) {
        const data = await res.json();
        setBookings(data.bookings || []);
      }
    } catch { /* keep empty */ }
    finally { setLoading(false); }
  }, [adminPass]);

  useEffect(() => { if (authenticated) loadBookings(); }, [authenticated, loadBookings]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === adminPass) { setAuthenticated(true); }
    else { setError('Incorrect password'); }
  };

  const updateStatus = async (id: string, status: string) => {
    setUpdatingId(id);
    await fetch('/api/bookings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': adminPass },
      body: JSON.stringify({ id, status }),
    });
    setBookings((prev: Booking[]) => prev.map((b: Booking) => b.id === id ? { ...b, status } : b));
    setUpdatingId(null);
  };

  const sendNewsletter = async () => {
    if (!nlSubject || !nlBody) return;
    setNlSending(true); setNlResult(null);
    const res = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': adminPass },
      body: JSON.stringify({ subject: nlSubject, bodyHtml: nlBody }),
    });
    setNlResult(await res.json());
    setNlSending(false);
  };

  const sendReminders = async () => {
    setReminderSending(true); setReminderResult(null);
    const res = await fetch('/api/reminders', { method: 'POST', headers: { 'x-admin-token': adminPass } });
    setReminderResult(await res.json());
    setReminderSending(false);
  };

  const filteredBookings = bookings.filter((b) => {
    const q = filter.toLowerCase();
    const matchSearch = !q || b.name.toLowerCase().includes(q) || b.service.toLowerCase().includes(q) || b.phone.includes(q) || b.branch.toLowerCase().includes(q);
    const matchStatus = !statusFilter || b.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const uniqueEmailCount = new Set(bookings.filter((b) => b.email).map((b) => b.email.toLowerCase())).size;
  const pendingToday = bookings.filter((b) => b.preferredDate === new Date().toISOString().split('T')[0]).length;
  const dueReminders = bookings.filter((b) => {
    if (!b.email) return false;
    const sixMoAgo = new Date(); sixMoAgo.setMonth(sixMoAgo.getMonth() - 6);
    return new Date(b.timestamp) < sixMoAgo;
  }).length;

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--color-bg)' }}>
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
          <h1 className="text-2xl font-bold mb-1 text-center" style={{ color: 'var(--color-primary)' }}>
            {clinicConfig.name}
          </h1>
          <p className="text-center text-gray-400 mb-6 text-sm">Admin Dashboard</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password" autoFocus
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2" />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" className="w-full py-3 rounded-full text-white font-semibold transition-opacity hover:opacity-90"
              style={{ background: 'var(--color-primary)' }}>Sign In</button>
          </form>
          <p className="text-center text-xs text-gray-400 mt-4">Default: admin123 — change in .env.local</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-6xl mx-auto">

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>{clinicConfig.name}</h1>
            <p className="text-gray-400 text-sm">Admin Dashboard</p>
          </div>
          <button onClick={() => setAuthenticated(false)} className="text-sm text-gray-400 hover:text-gray-600">Sign Out</button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Bookings', value: bookings.length, color: 'var(--color-primary)' },
            { label: 'Appointments Today', value: pendingToday, color: '#f59e0b' },
            { label: 'Email Subscribers', value: uniqueEmailCount, color: '#10b981' },
            { label: 'Reminders Due', value: dueReminders, color: '#ef4444' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm text-center">
              <div className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
              <div className="text-gray-500 text-xs mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-white rounded-xl p-1 shadow-sm w-fit flex-wrap">
          {([
            { key: 'overview', label: '📊 Overview' },
            { key: 'bookings', label: '📅 Bookings' },
            { key: 'newsletter', label: '📧 Newsletter' },
            { key: 'reminders', label: '⏰ Reminders' },
          ] as const).map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={activeTab === tab.key ? { background: 'var(--color-primary)', color: '#fff' } : { color: '#6b7280' }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="font-bold mb-4" style={{ color: 'var(--color-primary)' }}>Bookings by Branch</h2>
                {clinicConfig.branches.map((branch) => {
                  const count = bookings.filter((b) => b.branch === branch.name).length;
                  const pct = bookings.length ? Math.round((count / bookings.length) * 100) : 0;
                  return (
                    <div key={branch.name} className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700">{branch.name}</span>
                        <span className="font-semibold" style={{ color: 'var(--color-primary)' }}>{count}</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: 'var(--color-primary)' }} />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="font-bold mb-4" style={{ color: 'var(--color-primary)' }}>Status Breakdown</h2>
                {['Pending','Confirmed','Completed','Cancelled'].map((s) => {
                  const count = bookings.filter((b) => b.status === s).length;
                  const colors: Record<string, string> = { Pending:'#f59e0b', Confirmed:'#3b82f6', Completed:'#10b981', Cancelled:'#ef4444' };
                  return (
                    <div key={s} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                      <span className="text-sm text-gray-600">{s}</span>
                      <span className="px-2 py-1 rounded-full text-xs font-medium text-white" style={{ background: colors[s] }}>{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-bold mb-4" style={{ color: 'var(--color-primary)' }}>Popular Services</h2>
              <div className="grid sm:grid-cols-3 gap-3">
                {clinicConfig.services.map((svc) => {
                  const count = bookings.filter((b) => b.service === svc.name).length;
                  return (
                    <div key={svc.name} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <span className="text-2xl">{svc.icon}</span>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{svc.name}</p>
                        <p className="text-xs text-gray-400">{count} booking{count !== 1 ? 's' : ''}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-bold mb-4" style={{ color: 'var(--color-primary)' }}>Quick Actions</h2>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => setActiveTab('bookings')} className="px-5 py-2 rounded-full text-white text-sm font-medium" style={{ background: 'var(--color-primary)' }}>
                  View All Bookings
                </button>
                <button onClick={() => setActiveTab('newsletter')} className="px-5 py-2 rounded-full text-sm font-medium border-2" style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}>
                  Send Newsletter ({uniqueEmailCount} patients)
                </button>
                <button onClick={() => setActiveTab('reminders')} className="px-5 py-2 rounded-full text-sm font-medium border-2 border-red-200 text-red-500">
                  Send Reminders ({dueReminders} due)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* BOOKINGS */}
        {activeTab === 'bookings' && (
          <div>
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)}
                placeholder="Search name, phone, service, branch..."
                className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none bg-white" />
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none">
                <option value="">All Statuses</option>
                {['Pending','Confirmed','Completed','Cancelled'].map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <button onClick={loadBookings} className="px-4 py-2.5 rounded-lg text-sm border border-gray-200 bg-white hover:bg-gray-50">↻ Refresh</button>
            </div>
            {loading ? (
              <div className="text-center py-12 text-gray-400">Loading...</div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 text-gray-500 text-left bg-gray-50">
                        {['Patient','Phone','Service','Branch','Date & Time','Status','Update'].map((h) => (
                          <th key={h} className="px-4 py-3 font-medium text-xs uppercase tracking-wide">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBookings.length === 0 ? (
                        <tr><td colSpan={7} className="px-4 py-10 text-center text-gray-400">No bookings found</td></tr>
                      ) : filteredBookings.map((b) => (
                        <tr key={b.id} className="border-b border-gray-50 hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <p className="font-medium text-gray-900">{b.name}</p>
                            {b.email && <p className="text-xs text-gray-400">{b.email}</p>}
                          </td>
                          <td className="px-4 py-3">
                            <a href={`tel:${b.phone}`} className="text-blue-600 hover:underline text-xs">{b.phone}</a>
                          </td>
                          <td className="px-4 py-3 text-gray-700">{b.service}</td>
                          <td className="px-4 py-3 text-gray-500 text-xs">{b.branch}</td>
                          <td className="px-4 py-3 text-xs">
                            <p className="text-gray-700">{b.preferredDate}</p>
                            {b.preferredTime && <p className="text-gray-400">{b.preferredTime}</p>}
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              b.status === 'Confirmed' ? 'bg-blue-100 text-blue-700'
                              : b.status === 'Pending' ? 'bg-yellow-100 text-yellow-700'
                              : b.status === 'Completed' ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-500'}`}>
                              {b.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <select value={b.status} onChange={(e) => updateStatus(b.id, e.target.value)}
                              disabled={updatingId === b.id}
                              className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white focus:outline-none disabled:opacity-50">
                              {['Pending','Confirmed','Completed','Cancelled'].map((s) => <option key={s} value={s}>{s}</option>)}
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-400">
                  Showing {filteredBookings.length} of {bookings.length} bookings
                </div>
              </div>
            )}
          </div>
        )}

        {/* NEWSLETTER */}
        {activeTab === 'newsletter' && (
          <div className="max-w-2xl">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-bold mb-1" style={{ color: 'var(--color-primary)' }}>Send Newsletter</h2>
              <p className="text-gray-400 text-sm mb-5">Sends to all <strong>{uniqueEmailCount}</strong> patients who provided an email.</p>
              <p className="text-sm font-medium text-gray-600 mb-2">Quick Templates:</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {NEWSLETTER_TIPS.map((tip, i) => (
                  <button key={i} onClick={() => { setSelectedTip(i); setNlSubject(tip.subject); setNlBody(tip.body); }}
                    className="px-3 py-1.5 rounded-full text-xs font-medium border transition-all"
                    style={selectedTip === i
                      ? { background: 'var(--color-primary)', color: '#fff', borderColor: 'var(--color-primary)' }
                      : { borderColor: '#e5e7eb', color: '#6b7280' }}>
                    {tip.label}
                  </button>
                ))}
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                  <input type="text" value={nlSubject} onChange={(e) => setNlSubject(e.target.value)}
                    placeholder="e.g. 🦷 Quick tip from your dentist"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Body (HTML) *</label>
                  <textarea value={nlBody} onChange={(e) => setNlBody(e.target.value)} rows={7}
                    placeholder="<p>Your message here...</p>"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none resize-none font-mono bg-white" />
                  <p className="text-xs text-gray-400 mt-1">HTML supported. Header/footer added automatically.</p>
                </div>
                {nlResult && (
                  <div className={`p-4 rounded-xl text-sm ${nlResult.failed === 0 ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
                    ✅ Sent to {nlResult.sent}/{nlResult.total} patients.{nlResult.failed > 0 && ` ${nlResult.failed} failed.`}
                  </div>
                )}
                <button onClick={sendNewsletter} disabled={nlSending || !nlSubject || !nlBody}
                  className="w-full py-3 rounded-full text-white font-semibold disabled:opacity-40"
                  style={{ background: 'var(--color-primary)' }}>
                  {nlSending ? `Sending to ${uniqueEmailCount} patients...` : `Send to ${uniqueEmailCount} Patients`}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* REMINDERS */}
        {activeTab === 'reminders' && (
          <div className="max-w-xl">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-bold mb-1" style={{ color: 'var(--color-primary)' }}>Checkup Reminders</h2>
              <p className="text-gray-400 text-sm mb-6">
                Sends a friendly reminder to patients who have not visited in <strong>6+ months</strong>.<br />
                Currently <strong>{dueReminders}</strong> patient{dueReminders !== 1 ? 's' : ''} overdue.
              </p>
              <div className="bg-blue-50 rounded-xl p-4 mb-5 text-sm text-blue-700">
                <p className="font-semibold mb-1">Email preview:</p>
                <p>&ldquo;Hi [Name], it&apos;s been X months since your last visit. Book your check-up today!&rdquo;</p>
              </div>
              {reminderResult && (
                <div className="bg-green-50 text-green-700 rounded-xl p-4 mb-4 text-sm">
                  ✅ Sent <strong>{reminderResult.sent}</strong> reminder{reminderResult.sent !== 1 ? 's' : ''}.
                  {reminderResult.skipped > 0 && ` ${reminderResult.skipped} skipped (recent visit or no email).`}
                </div>
              )}
              <button onClick={sendReminders} disabled={reminderSending || dueReminders === 0}
                className="w-full py-3 rounded-full text-white font-semibold disabled:opacity-40"
                style={{ background: 'var(--color-primary)' }}>
                {reminderSending ? 'Sending...' : `Send Reminders to ${dueReminders} Patients`}
              </button>
              <div className="mt-6 pt-5 border-t border-gray-100">
                <p className="text-sm font-medium text-gray-600 mb-2">Automate monthly via cron:</p>
                <code className="block bg-gray-50 rounded-lg p-3 text-xs text-gray-600 break-all">
                  POST /api/reminders — Header: x-cron-secret: YOUR_SECRET
                </code>
                <p className="text-xs text-gray-400 mt-2">Set CRON_SECRET in .env.local. Works with Vercel Cron or GitHub Actions.</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
