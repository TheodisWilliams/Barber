import Image from 'next/image';
import Link from 'next/link';
import { Instagram } from 'lucide-react';
import { getBarbers } from '@/lib/strapi';
import type { Barber } from '@/types';

export const metadata = {
  title: 'Our Barbers - A Cut Above the Rest',
  description: 'Meet our team of expert barbers dedicated to providing premium grooming services.',
};

// TODO: Replace with actual barber photos from Unsplash
const DEFAULT_BARBER_IMAGE = 'https://source.unsplash.com/400x400/?barber,portrait,professional';

export default async function BarbersPage() {
  let barbers: Barber[] = [];

  try {
    const barbersData = await getBarbers('photo,services');
    barbers = barbersData.data || [];
  } catch (error) {
    console.error('Failed to fetch barbers:', error);
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-brand-black text-white py-20">
        <div className="container-custom text-center">
          <h1 className="mb-6">Meet Our Team</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Skilled professionals dedicated to delivering exceptional cuts and grooming experiences.
          </p>
        </div>
      </section>

      {/* Barbers Grid */}
      <section className="section-padding bg-brand-warm">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {barbers.map((barber) => {
              const photoUrl = barber.attributes.photo?.data?.attributes.url
                ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${barber.attributes.photo.data.attributes.url}`
                : DEFAULT_BARBER_IMAGE;

              return (
                <div key={barber.id} className="card card-hover group">
                  <div className="relative h-80 overflow-hidden">
                    <Image
                      src={photoUrl}
                      alt={barber.attributes.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">
                      {barber.attributes.name}
                    </h3>

                    {barber.attributes.specialties && barber.attributes.specialties.length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {barber.attributes.specialties.slice(0, 3).map((specialty, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-brand-gold/10 text-brand-charcoal px-2 py-1 rounded"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {barber.attributes.bio}
                    </p>

                    <div className="flex gap-3">
                      <Link
                        href={`/barbers/${barber.attributes.slug}`}
                        className="btn btn-outline flex-1 text-center text-sm"
                      >
                        View Profile
                      </Link>
                      <Link
                        href={`/book?barberId=${barber.id}`}
                        className="btn btn-primary flex-1 text-center text-sm"
                      >
                        Book Now
                      </Link>
                    </div>

                    {barber.attributes.instagramHandle && (
                      <a
                        href={`https://instagram.com/${barber.attributes.instagramHandle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-600 hover:text-brand-gold transition-colors"
                      >
                        <Instagram className="w-4 h-4" />
                        @{barber.attributes.instagramHandle}
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {barbers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">
                Our team information is being updated. Please check back soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-brand-black text-white">
        <div className="container-custom text-center">
          <h2 className="mb-6">Can't Decide?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Not sure which barber to choose? We'll match you with the perfect barber
            based on your style preferences.
          </p>
          <Link href="/book" className="btn btn-secondary text-lg px-8 py-4">
            Start Booking
          </Link>
        </div>
      </section>
    </div>
  );
}
