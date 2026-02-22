'use client';

import { Calendar, Clock, DollarSign, User, Scissors } from 'lucide-react';
import { format } from 'date-fns';
import type { Barber, Service } from '@/types';

interface BookingSummaryProps {
  barber: Barber | null;
  service: Service | null;
  date: string;
  time: string;
}

export default function BookingSummary({ barber, service, date, time }: BookingSummaryProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
      <h3 className="text-xl font-bold mb-6">Booking Summary</h3>

      <div className="space-y-4">
        {/* Barber */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-brand-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 text-brand-gold" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-600">Barber</p>
            <p className="font-semibold">
              {barber ? barber.attributes.name : 'Not selected'}
            </p>
          </div>
        </div>

        {/* Service */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-brand-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Scissors className="w-5 h-5 text-brand-gold" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-600">Service</p>
            <p className="font-semibold">
              {service ? service.attributes.name : 'Not selected'}
            </p>
            {service && (
              <p className="text-sm text-gray-500">
                {service.attributes.durationMinutes} minutes
              </p>
            )}
          </div>
        </div>

        {/* Date */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-brand-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Calendar className="w-5 h-5 text-brand-gold" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-600">Date</p>
            <p className="font-semibold">
              {date ? format(new Date(date), 'EEEE, MMMM d, yyyy') : 'Not selected'}
            </p>
          </div>
        </div>

        {/* Time */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-brand-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Clock className="w-5 h-5 text-brand-gold" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-600">Time</p>
            <p className="font-semibold">{time || 'Not selected'}</p>
          </div>
        </div>

        {/* Price */}
        {service && (
          <>
            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-brand-gold" />
                  <span className="font-semibold">Total</span>
                </div>
                <span className="text-2xl font-bold text-brand-gold">
                  ${service.attributes.price}
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-2">
              Payment will be collected at the time of service
            </p>
          </>
        )}
      </div>

      {!barber && (
        <div className="mt-6 p-4 bg-brand-warm rounded-lg">
          <p className="text-sm text-gray-600 text-center">
            Complete all steps to confirm your appointment
          </p>
        </div>
      )}
    </div>
  );
}
