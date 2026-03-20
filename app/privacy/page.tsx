import type { Metadata } from 'next';
import Link from 'next/link';
import { clinicConfig } from '@/config/clinic';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  const updated = 'March 2026';
  return (
    <div className="min-h-screen py-16 px-4" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-sm opacity-60 hover:opacity-100 mb-6 inline-block">← Back to Home</Link>

        <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--color-primary)' }}>Privacy Policy</h1>
        <p className="text-gray-400 text-sm mb-10">Last updated: {updated}</p>

        <div className="bg-white rounded-2xl p-8 shadow-sm space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--color-primary)' }}>1. Who We Are</h2>
            <p>{clinicConfig.name} operates dental clinics at {clinicConfig.branches.map(b => b.name).join(' and ')}. This policy explains how we collect, use, and protect your personal data when you use our website or book an appointment.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--color-primary)' }}>2. What We Collect</h2>
            <p className="mb-2">When you book an appointment or contact us, we may collect:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Full name and phone number</li>
              <li>Email address (optional, for confirmations and reminders)</li>
              <li>Preferred appointment date, time, and service</li>
              <li>Any notes or concerns you share in the booking form</li>
            </ul>
            <p className="mt-3">We do <strong>not</strong> collect payment card details through this website.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--color-primary)' }}>3. How We Use Your Data</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>To confirm and manage your appointment</li>
              <li>To send you appointment reminders and follow-up messages</li>
              <li>To send occasional dental health newsletters (only if you provided your email)</li>
              <li>To improve our services based on booking patterns</li>
            </ul>
            <p className="mt-3">We will never sell, rent, or share your personal data with third parties for marketing purposes.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--color-primary)' }}>4. Email Communications</h2>
            <p>If you provided your email address when booking, you may receive:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>A booking confirmation email</li>
              <li>A reminder when you are due for a check-up (approximately every 6 months)</li>
              <li>Occasional dental health tips and promotional offers</li>
            </ul>
            <p className="mt-3">You can opt out of newsletters at any time by contacting us at <a href={`mailto:${clinicConfig.email}`} className="underline" style={{ color: 'var(--color-primary)' }}>{clinicConfig.email}</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--color-primary)' }}>5. Data Storage</h2>
            <p>Booking records are stored securely on our systems. Your data is retained for up to 5 years to maintain your dental records history, after which it is deleted or anonymised.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--color-primary)' }}>6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Request a copy of the personal data we hold about you</li>
              <li>Ask us to correct or delete your data</li>
              <li>Withdraw consent for email communications at any time</li>
            </ul>
            <p className="mt-3">To exercise any of these rights, email us at <a href={`mailto:${clinicConfig.email}`} className="underline" style={{ color: 'var(--color-primary)' }}>{clinicConfig.email}</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--color-primary)' }}>7. Cookies</h2>
            <p>This website uses minimal technical cookies required for the site to function. We do not use advertising or tracking cookies.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--color-primary)' }}>8. Contact</h2>
            <p>For any privacy-related queries, contact us at:</p>
            <div className="mt-3 space-y-1 text-sm">
              <p><strong>{clinicConfig.name}</strong></p>
              <p>{clinicConfig.address}</p>
              <p>Email: <a href={`mailto:${clinicConfig.email}`} className="underline" style={{ color: 'var(--color-primary)' }}>{clinicConfig.email}</a></p>
              <p>Phone: <a href={`tel:${clinicConfig.phone}`} className="underline" style={{ color: 'var(--color-primary)' }}>{clinicConfig.phone}</a></p>
            </div>
          </section>
        </div>

        <div className="text-center mt-8">
          <Link href="/" className="inline-block px-8 py-3 rounded-full text-white font-semibold" style={{ background: 'var(--color-primary)' }}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
