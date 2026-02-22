import Link from 'next/link';
import { Clock, DollarSign } from 'lucide-react';
import { getServices } from '@/lib/strapi';
import type { Service } from '@/types';

export const metadata = {
  title: 'Services - A Cut Above the Rest',
  description: 'Explore our premium grooming services including cuts, fades, beard trims, and more.',
};

export default async function ServicesPage() {
  let services: Service[] = [];

  try {
    const servicesData = await getServices();
    services = servicesData.data || [];
  } catch (error) {
    console.error('Failed to fetch services:', error);
  }

  const categorizedServices = services.reduce((acc, service) => {
    const category = service.attributes.category;
    if (!acc[category]) acc[category] = [];
    acc[category].push(service);
    return acc;
  }, {} as Record<string, Service[]>);

  const categoryTitles: Record<string, string> = {
    haircut: 'Haircuts',
    shave: 'Shaves',
    styling: 'Styling',
    specialty: 'Specialty Services',
    package: 'Packages',
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-brand-black text-white py-20">
        <div className="container-custom text-center">
          <h1 className="mb-6">Our Services</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Premium grooming services designed for the modern man. Every service includes
            a consultation to ensure you get exactly what you want.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-brand-warm">
        <div className="container-custom">
          {Object.entries(categorizedServices).map(([category, categoryServices]) => (
            <div key={category} className="mb-16 last:mb-0">
              <h2 className="text-3xl font-bold mb-8 text-center">
                {categoryTitles[category] || category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryServices.map((service) => (
                  <div
                    key={service.id}
                    className="card p-6 hover:shadow-2xl transition-all"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-semibold">
                        {service.attributes.name}
                      </h3>
                      <span className="text-2xl font-bold text-brand-gold">
                        ${service.attributes.price}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-4">
                      {service.attributes.description}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{service.attributes.durationMinutes} min</span>
                      </div>
                    </div>

                    <Link
                      href={`/book?serviceId=${service.id}`}
                      className="btn btn-primary w-full text-center"
                    >
                      Book This Service
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {services.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">
                Services information is being updated. Please check back soon or call to book.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Policies */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl">
          <h2 className="text-center mb-12">Service Policies</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Appointment Policy</h3>
              <p className="text-gray-600">
                We recommend booking appointments in advance. Walk-ins are welcome based on availability.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Cancellation Policy</h3>
              <p className="text-gray-600">
                Please provide at least 24 hours notice for cancellations. Last-minute cancellations
                may result in a fee for future bookings.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Late Arrival</h3>
              <p className="text-gray-600">
                Please arrive 5 minutes early. If you're running late, please call us. Arrivals more
                than 15 minutes late may need to be rescheduled.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Payment</h3>
              <p className="text-gray-600">
                We accept cash, all major credit cards, and digital payments. Payment is due at the
                time of service.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
