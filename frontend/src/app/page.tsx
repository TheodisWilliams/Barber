import Link from 'next/link';
import Image from 'next/image';
import { Scissors, Clock, Star, MapPin } from 'lucide-react';
import { getTestimonials } from '@/lib/strapi';

// TODO: Replace with actual Unsplash images - these are placeholder URLs
const HERO_IMAGE = 'https://source.unsplash.com/1600x900/?barbershop,modern';
const GALLERY_IMAGES = [
  'https://source.unsplash.com/800x600/?barber,cutting,hair',
  'https://source.unsplash.com/800x600/?barbershop,interior',
  'https://source.unsplash.com/800x600/?fade,haircut',
  'https://source.unsplash.com/800x600/?barber,tools',
];

export default async function HomePage() {
  // Fetch testimonials
  let testimonials = [];
  try {
    const testimonialsData = await getTestimonials();
    testimonials = testimonialsData.data || [];
  } catch (error) {
    console.error('Failed to fetch testimonials:', error);
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black/80 to-brand-black/60 z-10" />
        <Image
          src={HERO_IMAGE}
          alt="Modern barbershop interior"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 container-custom text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            A Cut Above the Rest
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-brand-warm max-w-2xl mx-auto animate-fade-in animation-delay-200">
            Premium Grooming for the Modern Man
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animation-delay-400">
            <Link href="/book" className="btn btn-secondary text-lg px-8 py-4">
              Book Your Appointment
            </Link>
            <Link href="/services" className="btn btn-outline bg-white/10 backdrop-blur-sm text-white border-white hover:bg-white text-lg px-8 py-4">
              View Services
            </Link>
          </div>
          <p className="mt-8 text-sm text-brand-gold font-medium">
            🖤 Proudly Black-Owned 🖤
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-center mb-16">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 card card-hover">
              <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Scissors className="w-8 h-8 text-brand-gold" />
              </div>
              <h3 className="text-2xl mb-4">Expert Barbers</h3>
              <p className="text-gray-600">
                Our team of skilled barbers brings years of experience and passion to every cut.
              </p>
            </div>

            <div className="text-center p-8 card card-hover">
              <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-brand-gold" />
              </div>
              <h3 className="text-2xl mb-4">Easy Booking</h3>
              <p className="text-gray-600">
                Book online 24/7 with our seamless scheduling system. Pick your barber and time.
              </p>
            </div>

            <div className="text-center p-8 card card-hover">
              <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-brand-gold" />
              </div>
              <h3 className="text-2xl mb-4">Premium Experience</h3>
              <p className="text-gray-600">
                From the vibe to the final look, we deliver an elevated grooming experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="section-padding bg-brand-charcoal text-white">
        <div className="container-custom">
          <h2 className="text-center mb-4">Our Signature Services</h2>
          <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
            Premium cuts and grooming services tailored to your style
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Signature Cut', price: '$45', duration: '45 min' },
              { name: 'Fade & Line Up', price: '$50', duration: '60 min' },
              { name: 'Beard Trim & Shape', price: '$30', duration: '30 min' },
              { name: 'Hot Towel Shave', price: '$40', duration: '45 min' },
              { name: 'Kids Cut (12 & under)', price: '$35', duration: '30 min' },
              { name: 'Full Service Package', price: '$85', duration: '90 min' },
            ].map((service, idx) => (
              <div key={idx} className="bg-brand-charcoal-light p-6 rounded-lg border border-brand-gold/20 hover:border-brand-gold/40 transition-colors">
                <h4 className="text-xl font-semibold mb-2">{service.name}</h4>
                <div className="flex justify-between items-center text-brand-gold">
                  <span className="text-2xl font-bold">{service.price}</span>
                  <span className="text-sm">{service.duration}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/services" className="btn btn-secondary">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-center mb-12">Our Work</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {GALLERY_IMAGES.map((img, idx) => (
              <div key={idx} className="relative h-64 overflow-hidden rounded-lg group">
                <Image
                  src={img}
                  alt={`Gallery image ${idx + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="section-padding bg-brand-warm">
          <div className="container-custom">
            <h2 className="text-center mb-12">What Our Clients Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.slice(0, 3).map((testimonial: any) => (
                <div key={testimonial.id} className="bg-white p-8 rounded-lg shadow-md">
                  <div className="flex mb-4">
                    {[...Array(testimonial.attributes.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-brand-gold text-brand-gold" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">
                    "{testimonial.attributes.review}"
                  </p>
                  <p className="font-semibold">- {testimonial.attributes.customerName}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section-padding bg-brand-black text-white">
        <div className="container-custom text-center">
          <h2 className="mb-6">Ready for Your Best Cut Yet?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Book online now and experience the difference that comes with expertise,
            attention to detail, and genuine care.
          </p>
          <Link href="/book" className="btn btn-secondary text-lg px-8 py-4">
            Book Appointment Now
          </Link>
        </div>
      </section>
    </>
  );
}
