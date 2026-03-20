'use client';

import { useState } from 'react';
import Link from 'next/link';
import { clinicConfig } from '@/config/clinic';

const TIME_SLOTS = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
];

export default function BookPage() {
  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    service: '', branch: '', date: '', time: '', message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading'); setErrorMsg('');
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) { setStatus('success'); }
      else {
        const d = await res.json();
        setErrorMsg(d.error || 'Something went wrong');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
      setStatus('error');
    }
  };

  const selectedBranch = clinicConfig.branches.find((b) => b.name === form.branch);

  if (status === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-bg)' }}>
        <div className="text-center max-w-md px-6">
          <div className="text-6xl mb-6 animate-bounce">✅</div>
          <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-primary)' }}>
            Appointment Requested!
          </h1>
          <p className="text-gray-600 mb-3">
            We&apos;ll confirm your appointment within 2 hours.
          </p>
          {form.email && (
            <p className="text-gray-500 text-sm mb-6">
              A confirmation email has been sent to <strong>{form.email}</strong>.
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/"
              className="px-8 py-3 rounded-full text-white font-semibold transition-opacity hover:opacity-90"
              style={{ background: 'var(--color-primary)' }}>
              Back to Home
            </Link>
            {selectedBranch && (
              <a href={`https://wa.me/${selectedBranch.whatsapp}`} target="_blank" rel="noopener noreferrer"
                className="px-8 py-3 rounded-full font-semibold border-2 text-center"
                style={{ borderColor: '#25D366', color: '#25D366' }}>
                WhatsApp Branch
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-4" style={{ background: 'var(--color-bg)' }}>
      <div className="text-center mb-12">
        <Link href="/" className="text-sm opacity-60 hover:opacity-100 mb-4 inline-block">
          ← Back to Home
        </Link>
        <h1 className="text-4xl font-bold mb-3" style={{ color: 'var(--color-primary)' }}>
          Book an Appointment
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Fill in your details and we&apos;ll confirm within 2 hours. Same-day slots often available.
        </p>
      </div>

      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name + Phone */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Full Name *</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} required
                placeholder="Jane Doe"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Phone Number *</label>
              <input type="tel" name="phone" value={form.phone} onChange={handleChange} required
                placeholder="+254 700 000 000"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2" />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Email Address <span className="text-gray-400 font-normal">(for confirmation + reminders)</span>
            </label>
            <input type="email" name="email" value={form.email} onChange={handleChange}
              placeholder="jane@email.com"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2" />
          </div>

          {/* Branch */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Branch *</label>
            <select name="branch" value={form.branch} onChange={handleChange} required
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 bg-white">
              <option value="">Select a branch...</option>
              {clinicConfig.branches.map((b) => (
                <option key={b.name} value={b.name}>📍 {b.name} — {b.address}</option>
              ))}
            </select>
          </div>

          {/* Branch hours hint */}
          {selectedBranch && (
            <div className="bg-blue-50 rounded-xl px-4 py-3 text-xs text-blue-700 -mt-2">
              <strong>{selectedBranch.name}</strong> — Mon–Fri: {selectedBranch.hours.weekdays} · Sat: {selectedBranch.hours.saturday}
            </div>
          )}

          {/* Service */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Service *</label>
            <select name="service" value={form.service} onChange={handleChange} required
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 bg-white">
              <option value="">Select a service...</option>
              {clinicConfig.services.map((s) => (
                <option key={s.name} value={s.name}>{s.icon} {s.name} — {s.price}</option>
              ))}
            </select>
          </div>

          {/* Date + Time */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Preferred Date *</label>
              <input type="date" name="date" value={form.date} onChange={handleChange} required
                min={new Date().toISOString().split('T')[0]}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Preferred Time</label>
              <select name="time" value={form.time} onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 bg-white">
                <option value="">Any time</option>
                {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Additional Notes</label>
            <textarea name="message" value={form.message} onChange={handleChange} rows={3}
              placeholder="Any concerns, allergies, or special requests..."
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 resize-none" />
          </div>

          {status === 'error' && <p className="text-red-500 text-sm">{errorMsg}</p>}

          <button type="submit" disabled={status === 'loading'}
            className="w-full py-3 rounded-full text-white font-semibold text-base transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{ background: 'var(--color-primary)' }}>
            {status === 'loading' ? 'Submitting...' : 'Request Appointment'}
          </button>

          <p className="text-center text-xs text-gray-400">
            Or call/WhatsApp us:{' '}
            <a href={`tel:${clinicConfig.phone}`} className="font-medium hover:underline" style={{ color: 'var(--color-primary)' }}>
              {clinicConfig.phone}
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
