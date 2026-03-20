import type { Metadata } from 'next';
import Link from 'next/link';
import { clinicConfig } from '@/config/clinic';

export const metadata: Metadata = {
  title: 'Terms of Service',
  robots: { index: false, follow: false },
};

export default function TermsPage() {
  const updated = 'March 2026';
  return (
    <div className="min-h-screen py-16 px-4" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-sm opacity-60 hover:opacity-100 mb-6 inline-block">← Back to Home</Link>

        <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--color-primary)' }}>Terms of Service</h1>
        <p className="text-gray-400 text-sm mb-10">Last updated: {updated}</p>

        <div className="bg-white rounded-2xl p-8 shadow-sm space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--color-primary)' }}>1. Acceptance</h2>
            <p>By using the {clinicConfig.name} website or booking an appointment online, you agree to these Terms of Service. If you do not agree, please do not use our services.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--color-primary)' }}>2. Appointment Bookings</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Online bookings are <strong>requests</strong> — not confirmed appointments. We will contact you within 2 hours to confirm your slot.</li>
              <li>Appointments are subject to availability at your chosen branch.</li>
              <li>You must provide accurate personal and contact information when booking.</li>
              <li>A confirmed appointment is a commitment — please arrive on time.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--color-primary)' }}>3. Cancellations & No-Shows</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Please cancel or reschedule at least <strong>24 hours</strong> before your appointment by calling or WhatsApp-ing us.</li>
              <li>Repeated no-shows without notice may result in being asked to pay a deposit for future bookings.</li>
              <li>Emergency cancellations are understood — just let us know as soon as possible.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--color-primary)' }}>4. Payments</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Prices displayed on this website are indicative starting prices. Final cost depends on the treatment required and will be confirmed during consultation.</li>
              <li>Payment is due at the time of service unless a payment plan has been agreed in advance.</li>
              <li>We accept cash and M-Pesa.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--color-primary)' }}>5. Medical Disclaimer</h2>
            <p>The content on this website is for general informational purposes only and does not constitute medical advice. Always consult a qualified dental professional for diagnosis and treatment. Online booking does not replace a clinical examination.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--color-primary)' }}>6. Website Use</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You may use this website for personal, non-commercial purposes only.</li>
              <li>You must not misuse the booking form or submit false information.</li>
              <li>We reserve the right to refuse service to anyone who abuses our online systems.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--color-primary)' }}>7. Limitation of Liability</h2>
            <p>{clinicConfig.name} is not liable for any indirect or consequential loss arising from your use of this website or reliance on information published here. Our liability is limited to the direct cost of the service provided.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--color-primary)' }}>8. Changes to These Terms</h2>
            <p>We may update these terms at any time. Continued use of our website or services after changes constitutes acceptance of the new terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--color-primary)' }}>9. Contact</h2>
            <div className="space-y-1 text-sm">
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
