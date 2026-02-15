'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Shield, Heart, Clock, Star } from 'lucide-react';

const features = [
  {
    icon: Calendar,
    title: 'Easy Booking',
    description: 'Book appointments online 24/7'
  },
  {
    icon: Shield,
    title: 'Professional Care',
    description: 'Experienced dental specialists'
  },
  {
    icon: Heart,
    title: 'Patient First',
    description: 'Your comfort is our priority'
  },
  {
    icon: Clock,
    title: 'Flexible Hours',
    description: 'Open 6 days a week'
  }
];

// Image slideshow for hero background
// Replace these placeholder URLs with your actual dental clinic images
const heroImages = [
  '/images/hero1.jpg', // Add your images to public/images/ folder
  '/images/hero2.jpg',
  '/images/hero3.jpg',
  '/images/hero4.jpg',
  '/images/hero5.jpg',
];

const testimonials = [
  {
    text: "Best dental care I've experienced. Professional and caring staff!",
    author: "Sarah M.",
    rating: 5,
    reviewUrl: "https://g.page/r/YOUR_GOOGLE_PLACE_ID/review" // Replace with actual Google review link
  },
  {
    text: "Clean facilities and modern equipment. Highly recommend!",
    author: "John K.",
    rating: 5,
    reviewUrl: "https://g.page/r/YOUR_GOOGLE_PLACE_ID/review"
  },
  {
    text: "They made me feel comfortable throughout my treatment.",
    author: "Mary W.",
    rating: 5,
    reviewUrl: "https://g.page/r/YOUR_GOOGLE_PLACE_ID/review"
  }
];

export default function HeroSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);

  // Testimonial rotation (5 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Image slideshow rotation (5 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Image Slideshow Background */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-blue-800/60 to-blue-900/70"></div>
          </div>
        ))}

        {/* Fallback gradient if images aren't loaded yet */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100 -z-10">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading - White text for better visibility on images */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up drop-shadow-lg">
            Your Smile Deserves
            <span className="block text-blue-300 mt-2">The Best Care</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-white mb-8 animate-fade-in-up animation-delay-200 drop-shadow-md">
            Professional dental services in Eldoret and Kitale
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up animation-delay-400">
            <a href="#contact">
              <Button size="lg" className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all">
                Contact Us
              </Button>
            </a>
            <a href="#services">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all">
                Our Services
              </Button>
            </a>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${600 + index * 100}ms` }}
              >
                <feature.icon className="w-10 h-10 text-blue-600 mb-3 mx-auto" />
                <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Google Reviews Testimonial Slider */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-sm font-semibold text-gray-600">Google Reviews</span>
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            <div className="relative h-32">
              {testimonials.map((testimonial, index) => (
                <a
                  key={index}
                  href={testimonial.reviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`absolute inset-0 transition-all duration-500 cursor-pointer hover:scale-105 ${
                    index === currentTestimonial
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  }`}
                >
                  <div className="flex gap-1 justify-center mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-lg text-gray-700 italic mb-2">"{testimonial.text}"</p>
                  <p className="text-blue-600 font-semibold">- {testimonial.author}</p>
                  <p className="text-xs text-gray-500 mt-1">Click to view on Google</p>
                </a>
              ))}
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentTestimonial ? 'bg-blue-600 w-8' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}
