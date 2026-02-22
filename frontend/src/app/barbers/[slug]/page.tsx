import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Clock } from 'lucide-react';
import { getBarberBySlug } from '@/lib/strapi';
import type { Barber } from '@/types';
import { notFound } from 'next/navigation';

const DEFAULT_BARBER_IMAGE = 'https://source.unsplash.com/800x800/?barber,portrait,professional';

interface BarberProfilePageProps {
  params: {
    slug: string;
  };
}

export default async function BarberProfilePage({ params }: BarberProfilePageProps) {
  let barber: Barber | null = null;

  try {
    const barberData = await getBarberBySlug(params.slug);
    barber = barberData.data?.[0] || null;
  } catch (error) {
    console.error('Failed to fetch barber:', error);
  }

  if (!barber) {
    notFound();
  }

  const photoUrl = barber.attributes.photo?.data?.attributes.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${barber.attributes.photo.data.attributes.url}`
    : DEFAULT_BARBER_IMAGE;

  const workingDays = Object.entries(barber.attributes.workingHours)
    .filter(([_, schedule]) => schedule.enabled)
    .map(([day, schedule]) => ({
      day: day.charAt(0).toUpperCase() + day.slice(1),
      hours: `${schedule.start} - ${schedule.end}`,
    }));

  return (
    <div className="min-h-screen bg-brand-warm">
      {/* Profile Header */}
      <section className="bg-brand-black text-white py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-1">
              <div className="relative h-96 rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src={photoUrl}
                  alt={barber.attributes.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {barber.attributes.name}
              </h1>

              {barber.attributes.specialties && barber.attributes.specialties.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-brand-gold font-semibold mb-2">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {barber.attributes.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="bg-brand-gold/20 text-brand-gold px-3 py-1 rounded-full text-sm"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-brand-gold font-semibold mb-2">About</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {barber.attributes.bio}
                </p>
              </div>

              {barber.attributes.instagramHandle && (
                <a
                  href={`https://instagram.com/${barber.attributes.instagramHandle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand-gold hover:text-brand-gold-muted transition-colors mb-6"
                >
                  <Instagram className="w-5 h-5" />
                  @{barber.attributes.instagramHandle}
                </a>
              )}

              <div className="mt-8">
                <Link
                  href={`/book?barberId=${barber.id}`}
                  className="btn btn-secondary text-lg px-8 py-4"
                >
                  Book with {barber.attributes.name.split(' ')[0]}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Working Hours */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Availability</h2>
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {workingDays.map((schedule) => (
                <div
                  key={schedule.day}
                  className="flex items-center justify-between p-4 bg-brand-warm rounded"
                >
                  <span className="font-semibold">{schedule.day}</span>
                  <span className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    {schedule.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      {barber.attributes.services?.data && barber.attributes.services.data.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-custom max-w-4xl">
            <h2 className="text-3xl font-bold mb-8 text-center">Services Offered</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {barber.attributes.services.data.map((service) => (
                <div
                  key={service.id}
                  className="flex items-center justify-between p-6 bg-brand-warm rounded-lg"
                >
                  <div>
                    <h4 className="font-semibold">{service.attributes.name}</h4>
                    <p className="text-sm text-gray-600">
                      {service.attributes.durationMinutes} minutes
                    </p>
                  </div>
                  <span className="text-xl font-bold text-brand-gold">
                    ${service.attributes.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
