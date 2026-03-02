import Link from 'next/link';
import { clinicConfig } from '@/config/clinic';

export default function AboutPage() {
  return (
    <div className="min-h-screen py-16 px-4" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <Link href="/" className="text-sm opacity-60 hover:opacity-100 mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--color-primary)' }}>
            About {clinicConfig.name}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            {clinicConfig.tagline}
          </p>
        </div>

        {/* Story */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-primary)' }}>
            Our Story
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            {clinicConfig.name} was founded with one goal: to make quality dental care accessible,
            comfortable, and affordable for every family in our community. We believe that a
            healthy smile is the foundation of confidence and wellbeing.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Our team of experienced dental professionals uses the latest techniques and technology
            to ensure every patient leaves feeling cared for and satisfied. From routine check-ups
            to advanced cosmetic procedures, we provide comprehensive care under one roof.
          </p>
        </div>

        {/* Trust points */}
        <div className="grid sm:grid-cols-3 gap-6 mb-8">
          {[
            { icon: '🏆', title: '10+ Years', subtitle: 'Of trusted service' },
            { icon: '😊', title: '2,000+', subtitle: 'Happy patients served' },
            { icon: '⚡', title: 'Same Day', subtitle: 'Appointments available' },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl p-6 text-center shadow-sm"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <div className="text-2xl font-bold mb-1" style={{ color: 'var(--color-primary)' }}>
                {item.title}
              </div>
              <div className="text-gray-500 text-sm">{item.subtitle}</div>
            </div>
          ))}
        </div>

        {/* Contact info */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--color-primary)' }}>
            Find Us
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="font-semibold">Address</p>
                  <p className="text-gray-600 text-sm">{clinicConfig.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">📞</span>
                <div>
                  <p className="font-semibold">Phone</p>
                  <a
                    href={`tel:${clinicConfig.phone}`}
                    className="text-sm hover:underline"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    {clinicConfig.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">✉️</span>
                <div>
                  <p className="font-semibold">Email</p>
                  <a
                    href={`mailto:${clinicConfig.email}`}
                    className="text-sm hover:underline"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    {clinicConfig.email}
                  </a>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <p className="font-semibold">Opening Hours</p>
              <div className="text-sm text-gray-600 space-y-1">
                <div className="flex justify-between">
                  <span>Monday – Friday</span>
                  <span>{clinicConfig.hours.weekdays}</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>{clinicConfig.hours.saturday}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-red-500">{clinicConfig.hours.sunday}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <Link
            href="/book"
            className="inline-block px-10 py-4 rounded-full text-white font-semibold text-lg transition-opacity hover:opacity-90"
            style={{ background: 'var(--color-primary)' }}
          >
            Book Your Appointment
          </Link>
        </div>
      </div>
    </div>
  );
}
