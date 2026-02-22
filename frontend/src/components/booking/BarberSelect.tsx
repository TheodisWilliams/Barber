'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Scissors, Star } from 'lucide-react';
import type { Barber } from '@/types';

interface BarberSelectProps {
  selectedBarber: Barber | null;
  onSelect: (barber: Barber) => void;
}

const DEFAULT_BARBER_IMAGE = 'https://source.unsplash.com/400x400/?barber,portrait,professional';

export default function BarberSelect({ selectedBarber, onSelect }: BarberSelectProps) {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBarbers();
  }, []);

  const fetchBarbers = async () => {
    try {
      const response = await fetch('/api/barbers');
      if (!response.ok) throw new Error('Failed to fetch barbers');
      const data = await response.json();
      setBarbers(data.data || []);
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
        <p className="text-red-600">Error loading barbers: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Choose Your Barber</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {barbers.map((barber) => {
          const isSelected = selectedBarber?.id === barber.id;
          const photoUrl = barber.attributes.photo?.data?.attributes.url
            ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${barber.attributes.photo.data.attributes.url}`
            : DEFAULT_BARBER_IMAGE;

          return (
            <button
              key={barber.id}
              onClick={() => onSelect(barber)}
              className={`text-left p-4 rounded-lg border-2 transition-all ${
                isSelected
                  ? 'border-brand-gold bg-brand-gold/5'
                  : 'border-gray-200 hover:border-brand-gold/50'
              }`}
            >
              <div className="flex gap-4">
                <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={photoUrl}
                    alt={barber.attributes.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                    {barber.attributes.name}
                    {isSelected && (
                      <Scissors className="w-4 h-4 text-brand-gold" />
                    )}
                  </h3>
                  {barber.attributes.specialties && barber.attributes.specialties.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {barber.attributes.specialties.slice(0, 2).map((specialty, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-brand-gold/10 text-brand-charcoal px-2 py-0.5 rounded"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {barbers.length === 0 && (
        <p className="text-center text-gray-600 py-12">
          No barbers available at this time.
        </p>
      )}
    </div>
  );
}
