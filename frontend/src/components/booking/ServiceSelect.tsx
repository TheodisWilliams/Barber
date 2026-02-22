'use client';

import { useState, useEffect } from 'react';
import { Clock, DollarSign, Check } from 'lucide-react';
import type { Service } from '@/types';

interface ServiceSelectProps {
  selectedService: Service | null;
  onSelect: (service: Service) => void;
  barberId?: number;
}

export default function ServiceSelect({ selectedService, onSelect, barberId }: ServiceSelectProps) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services');
      if (!response.ok) throw new Error('Failed to fetch services');
      const data = await response.json();
      setServices(data.data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading services: {error}</p>
      </div>
    );
  }

  // Group services by category
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
    <div>
      <h2 className="text-2xl font-bold mb-6">Choose Your Service</h2>

      <div className="space-y-8">
        {Object.entries(categorizedServices).map(([category, categoryServices]) => (
          <div key={category}>
            <h3 className="text-lg font-semibold mb-4 text-brand-charcoal">
              {categoryTitles[category] || category}
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {categoryServices.map((service) => {
                const isSelected = selectedService?.id === service.id;

                return (
                  <button
                    key={service.id}
                    onClick={() => onSelect(service)}
                    className={`text-left p-4 rounded-lg border-2 transition-all ${
                      isSelected
                        ? 'border-brand-gold bg-brand-gold/5'
                        : 'border-gray-200 hover:border-brand-gold/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg mb-1 flex items-center gap-2">
                          {service.attributes.name}
                          {isSelected && (
                            <Check className="w-5 h-5 text-brand-gold" />
                          )}
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                          {service.attributes.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{service.attributes.durationMinutes} min</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            <span className="font-semibold text-brand-gold">
                              {service.attributes.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {services.length === 0 && (
        <p className="text-center text-gray-600 py-12">
          No services available at this time.
        </p>
      )}
    </div>
  );
}
