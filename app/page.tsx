import { Phone, Mail, MapPin, Clock, Shield, Heart, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ContactForm from '@/components/ContactForm';
import HeroSection from '@/components/HeroSection';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-blue-600">Dental Clinic</h1>
              <p className="text-sm text-gray-600">Quality Care, Healthy Smiles</p>
            </div>
            <nav className="hidden md:flex gap-6">
              <a href="#services" className="text-gray-700 hover:text-blue-600">Services</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600">About</a>
              <a href="#locations" className="text-gray-700 hover:text-blue-600">Locations</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600">Contact</a>
            </nav>
            <a href="#contact">
              <Button>Contact Us</Button>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <HeroSection />

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive dental care for the whole family
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Smile, title: 'General Dentistry', desc: 'Routine checkups, cleanings, and preventive care' },
              { icon: Shield, title: 'Cosmetic Dentistry', desc: 'Teeth whitening, veneers, and smile makeovers' },
              { icon: Heart, title: 'Emergency Care', desc: '24/7 emergency dental services for urgent needs' },
            ].map((service, i) => (
              <div key={i} className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
                <service.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Us?</h2>
            <p className="text-gray-700 mb-8">
              With years of experience and a commitment to excellence, we provide personalized dental care that puts your comfort and health first.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">10+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">2</div>
                <div className="text-gray-600">Convenient Locations</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">1000+</div>
                <div className="text-gray-600">Happy Patients</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section id="locations" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Locations</h2>
            <p className="text-gray-600">Visit us at either of our convenient branches</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Eldoret Branch */}
            <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              {/* Google Map Embed - REPLACE WITH YOUR ACTUAL EMBED CODE */}
              <div className="w-full h-64 bg-gray-200 relative">
                {/*
                  TO ADD YOUR MAP:
                  1. Go to Google Maps
                  2. Search for your clinic location
                  3. Click "Share" → "Embed a map"
                  4. Copy the iframe code
                  5. Replace the div below with your iframe

                  Example:
                  <iframe
                    src="https://www.google.com/maps/embed?pb=YOUR_EMBED_CODE"
                    width="100%"
                    height="256"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                */}
                <div className="flex items-center justify-center h-full">
                  <div className="text-center p-4">
                    <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Google Map will appear here</p>
                    <p className="text-xs text-gray-400 mt-1">Add embed code in page.tsx</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-4 text-blue-600">Eldoret Branch</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-600 mt-1" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-gray-600">Uganda Road, Eldoret</p>
                      <p className="text-gray-600">Next to ABC Bank</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gray-600 mt-1" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <a href="tel:+254712345678" className="text-blue-600 hover:underline">+254 712 345 678</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-gray-600 mt-1" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a href="mailto:eldoret@dentalclinic.co.ke" className="text-blue-600 hover:underline">eldoret@dentalclinic.co.ke</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gray-600 mt-1" />
                    <div>
                      <p className="font-medium">Hours</p>
                      <p className="text-gray-600">Mon-Fri: 8AM-6PM</p>
                      <p className="text-gray-600">Sat: 9AM-2PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Kitale Branch */}
            <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              {/* Google Map Embed - REPLACE WITH YOUR ACTUAL EMBED CODE */}
              <div className="w-full h-64 bg-gray-200 relative">
                {/*
                  TO ADD YOUR MAP:
                  1. Go to Google Maps
                  2. Search for your clinic location
                  3. Click "Share" → "Embed a map"
                  4. Copy the iframe code
                  5. Replace the div below with your iframe

                  Example:
                  <iframe
                    src="https://www.google.com/maps/embed?pb=YOUR_EMBED_CODE"
                    width="100%"
                    height="256"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                */}
                <div className="flex items-center justify-center h-full">
                  <div className="text-center p-4">
                    <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Google Map will appear here</p>
                    <p className="text-xs text-gray-400 mt-1">Add embed code in page.tsx</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-4 text-blue-600">Kitale Branch</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-600 mt-1" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-gray-600">Kenyatta Street, Kitale</p>
                      <p className="text-gray-600">Opposite Town Hall</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gray-600 mt-1" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <a href="tel:+254723456789" className="text-blue-600 hover:underline">+254 723 456 789</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-gray-600 mt-1" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a href="mailto:kitale@dentalclinic.co.ke" className="text-blue-600 hover:underline">kitale@dentalclinic.co.ke</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gray-600 mt-1" />
                    <div>
                      <p className="font-medium">Hours</p>
                      <p className="text-gray-600">Mon-Fri: 8AM-6PM</p>
                      <p className="text-gray-600">Sat: 9AM-2PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Get In Touch</h2>
              <p className="text-gray-600 mb-8">
                Have questions or ready to schedule an appointment? Contact us today!
              </p>

              {/* Contact Info Cards */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <Phone className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Call Us</h3>
                  <p className="text-gray-600 text-sm mb-1">Eldoret: +254 712 345 678</p>
                  <p className="text-gray-600 text-sm">Kitale: +254 723 456 789</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <Mail className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Email Us</h3>
                  <p className="text-gray-600 text-sm">info@dentalclinic.co.ke</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Working Hours</h3>
                  <p className="text-gray-600 text-sm mb-1">Mon-Fri: 8AM - 6PM</p>
                  <p className="text-gray-600 text-sm">Sat: 9AM - 2PM</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-6 text-center">Send Us a Message</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Dental Clinic</h3>
              <p className="text-gray-400">
                Quality dental care for the whole family across Eldoret and Kitale.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <a href="#services" className="block text-gray-400 hover:text-white">Services</a>
                <a href="#about" className="block text-gray-400 hover:text-white">About Us</a>
                <a href="#locations" className="block text-gray-400 hover:text-white">Locations</a>
                <a href="#contact" className="block text-gray-400 hover:text-white">Contact Us</a>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>info@dentalclinic.co.ke</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+254 712 345 678</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Dental Clinic. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
