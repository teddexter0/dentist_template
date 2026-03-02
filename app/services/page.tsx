import Link from 'next/link';
import { clinicConfig } from '@/config/clinic';

export default function ServicesPage() {
  return (
    <div className="min-h-screen py-16 px-4" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <Link href="/" className="text-sm opacity-60 hover:opacity-100 mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--color-primary)' }}>
            Our Services
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Comprehensive dental care for the whole family — from routine cleaning to advanced restorative work.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {clinicConfig.services.map((service) => (
            <div
              key={service.name}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-primary)' }}>
                {service.name}
              </h3>
              <p className="text-gray-600 mb-3 text-sm leading-relaxed">
                {service.description}
              </p>
              <p className="text-sm font-semibold" style={{ color: 'var(--color-accent)' }}>
                {service.price}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className="rounded-2xl p-10 text-center text-white"
          style={{ background: 'var(--color-primary)' }}
        >
          <h2 className="text-3xl font-bold mb-3">Ready to Book?</h2>
          <p className="opacity-90 mb-6 text-lg">
            Same-day appointments often available. Call or book online.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="px-8 py-3 rounded-full font-semibold transition-all hover:scale-105"
              style={{ background: 'var(--color-accent)', color: '#1A1A1A' }}
            >
              Book Online
            </Link>
            <a
              href={`tel:${clinicConfig.phone}`}
              className="px-8 py-3 rounded-full font-semibold border-2 border-white transition-all hover:bg-white hover:text-gray-900"
            >
              {clinicConfig.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
