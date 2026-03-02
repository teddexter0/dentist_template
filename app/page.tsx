'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Menu, X } from 'lucide-react';
import { clinicConfig } from '@/config/clinic';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % clinicConfig.testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      {/* NAV */}
      <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <span className="text-2xl font-bold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-playfair)' }}>
              {clinicConfig.name}
            </span>
          </Link>
          <nav className="hidden md:flex gap-6 items-center text-sm">
            <Link href="/services" className="text-gray-600 hover:text-gray-900 transition-colors">Services</Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">About</Link>
            <a href={`tel:${clinicConfig.phone}`} className="text-gray-600 hover:text-gray-900 transition-colors">{clinicConfig.phone}</a>
            <Link
              href="/book"
              className="px-5 py-2 rounded-full text-white text-sm font-medium transition-opacity hover:opacity-90"
              style={{ background: 'var(--color-primary)' }}
            >
              Book Appointment
            </Link>
          </nav>
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
            <Link href="/services" className="block text-gray-700 py-2" onClick={() => setMenuOpen(false)}>Services</Link>
            <Link href="/about" className="block text-gray-700 py-2" onClick={() => setMenuOpen(false)}>About</Link>
            <Link
              href="/book"
              className="block py-2 text-center rounded-full text-white font-medium"
              style={{ background: 'var(--color-primary)' }}
              onClick={() => setMenuOpen(false)}
            >
              Book Appointment
            </Link>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="py-24 px-4 text-center relative overflow-hidden animate-fade-in-up" style={{ background: 'var(--hero-bg)' }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-medium uppercase tracking-widest mb-4 opacity-70" style={{ color: 'var(--color-primary)' }}>
            Professional Dental Care
          </p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-playfair)' }}>
            {clinicConfig.name}
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-xl mx-auto">{clinicConfig.tagline}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="px-10 py-4 rounded-full text-white font-semibold text-lg transition-all hover:scale-105 shadow-md"
              style={{ background: 'var(--color-primary)' }}
            >
              Book Appointment
            </Link>
            <a
              href={`https://wa.me/${clinicConfig.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 rounded-full font-semibold text-lg border-2 transition-all hover:scale-105"
              style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="py-8 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-center text-sm">
            {[
              { icon: '🏆', text: '10+ Years Experience' },
              { icon: '😊', text: '2,000+ Happy Patients' },
              { icon: '⚡', text: 'Same-Day Appointments' },
              { icon: '👨‍⚕️', text: 'Qualified Specialists' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-gray-600">
                <span>{item.icon}</span>
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 px-4" style={{ background: 'var(--color-bg)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-playfair)' }}>
              Our Services
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">Comprehensive dental care for the whole family, all under one roof.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {clinicConfig.services.map((service, i) => (
              <div
                key={service.name}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border border-gray-50 animate-fade-in-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-primary)' }}>{service.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-3">{service.description}</p>
                <p className="text-xs font-semibold" style={{ color: 'var(--color-accent)' }}>{service.price}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/services"
              className="inline-block px-8 py-3 rounded-full font-semibold border-2 transition-colors hover:text-white hover:bg-current"
              style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-playfair)' }}>
            How It Works
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Book Online', desc: 'Choose your service and preferred date in seconds.' },
              { step: '2', title: 'Visit Us', desc: 'Our team welcomes you at our comfortable clinic.' },
              { step: '3', title: 'Leave Smiling', desc: 'Walk out with a healthier, more confident smile.' },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold mb-4" style={{ background: 'var(--color-primary)' }}>
                  {item.step}
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-primary)' }}>{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-4" style={{ background: 'var(--color-bg)' }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-playfair)' }}>
            What Our Patients Say
          </h2>
          <div className="bg-white rounded-2xl p-8 shadow-sm relative min-h-48">
            {clinicConfig.testimonials.map((t, i) => (
              <div
                key={i}
                className={`transition-all duration-500 ${i === currentTestimonial ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}
              >
                <div className="flex justify-center mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <span key={j} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-700 text-lg italic mb-4">&ldquo;{t.text}&rdquo;</p>
                <p className="font-semibold" style={{ color: 'var(--color-primary)' }}>{t.name}</p>
              </div>
            ))}
            <div className="flex justify-center gap-2 mt-8">
              {clinicConfig.testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`h-2 rounded-full transition-all ${i === currentTestimonial ? 'w-8' : 'w-2 bg-gray-300'}`}
                  style={i === currentTestimonial ? { background: 'var(--color-primary)', width: '2rem' } : {}}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-white text-center" style={{ background: 'var(--color-primary)' }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            Ready for Your Best Smile?
          </h2>
          <p className="opacity-90 text-lg mb-8">Book today — same-day appointments often available.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="px-10 py-4 rounded-full font-semibold text-lg text-gray-900 transition-all hover:scale-105" style={{ background: 'var(--color-accent)' }}>
              Book Appointment
            </Link>
            <a href={`tel:${clinicConfig.phone}`} className="px-10 py-4 rounded-full font-semibold text-lg border-2 border-white transition-all hover:bg-white hover:text-gray-900">
              {clinicConfig.phone}
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-playfair)' }}>{clinicConfig.name}</h3>
              <p className="text-gray-400 text-sm">{clinicConfig.tagline}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <Link href="/services" className="block hover:text-white">Services</Link>
                <Link href="/about" className="block hover:text-white">About Us</Link>
                <Link href="/book" className="block hover:text-white">Book Appointment</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Contact</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <a href={`tel:${clinicConfig.phone}`} className="hover:text-white">{clinicConfig.phone}</a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <a href={`mailto:${clinicConfig.email}`} className="hover:text-white">{clinicConfig.email}</a>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{clinicConfig.address}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <div>Mon–Fri: {clinicConfig.hours.weekdays}</div>
                    <div>Sat: {clinicConfig.hours.saturday}</div>
                    <div>Sun: {clinicConfig.hours.sunday}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} {clinicConfig.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
