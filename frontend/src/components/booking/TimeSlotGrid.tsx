'use client';

import { useState, useEffect } from 'react';
import { Clock, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import type { AvailabilitySlot } from '@/types';

interface TimeSlotGridProps {
  barberId: number;
  serviceDuration: number;
  date: string;
  selectedTime: string;
  onSelect: (time: string) => void;
}

export default function TimeSlotGrid({
  barberId,
  serviceDuration,
  date,
  selectedTime,
  onSelect,
}: TimeSlotGridProps) {
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (barberId && serviceDuration && date) {
      fetchAvailability();
    }
  }, [barberId, serviceDuration, date]);

  const fetchAvailability = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `/api/availability?barberId=${barberId}&date=${date}&serviceDuration=${serviceDuration}`
      );

      if (!response.ok) throw new Error('Failed to fetch availability');

      const data = await response.json();
      setSlots(data.slots || []);
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
        <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
        <p className="text-red-600">Error loading availability: {error}</p>
        <button
          onClick={fetchAvailability}
          className="btn btn-primary mt-4"
        >
          Try Again
        </button>
      </div>
    );
  }

  const availableSlots = slots.filter(slot => slot.available);
  const unavailableSlots = slots.filter(slot => !slot.available);

  // Group slots by morning, afternoon, evening
  const groupedSlots = availableSlots.reduce((acc, slot) => {
    const hour = parseInt(slot.time.split(':')[0]);
    let period: 'morning' | 'afternoon' | 'evening';

    if (hour < 12) period = 'morning';
    else if (hour < 17) period = 'afternoon';
    else period = 'evening';

    if (!acc[period]) acc[period] = [];
    acc[period].push(slot);
    return acc;
  }, {} as Record<string, AvailabilitySlot[]>);

  const periodTitles = {
    morning: 'Morning',
    afternoon: 'Afternoon',
    evening: 'Evening',
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Select a Time</h2>
      <p className="text-gray-600 mb-6">
        Available slots for {format(new Date(date), 'EEEE, MMMM d, yyyy')}
      </p>

      {availableSlots.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg mb-2">No available times on this date</p>
          <p className="text-gray-500 text-sm">Please try a different date</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedSlots).map(([period, periodSlots]) => (
            <div key={period}>
              <h3 className="text-lg font-semibold mb-3 text-brand-charcoal flex items-center gap-2">
                <Clock className="w-5 h-5 text-brand-gold" />
                {periodTitles[period as keyof typeof periodTitles]}
              </h3>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                {periodSlots.map((slot) => {
                  const isSelected = selectedTime === slot.time;

                  return (
                    <button
                      key={slot.time}
                      onClick={() => onSelect(slot.time)}
                      className={`
                        p-3 rounded-lg text-center transition-all font-medium
                        ${
                          isSelected
                            ? 'bg-brand-gold text-brand-black border-2 border-brand-gold'
                            : 'border-2 border-gray-200 hover:border-brand-gold/50 hover:bg-brand-gold/5'
                        }
                        focus-visible-ring
                      `}
                    >
                      {slot.time}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {availableSlots.length > 0 && (
        <p className="text-sm text-gray-500 mt-6">
          Showing {availableSlots.length} available time slot{availableSlots.length !== 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
}
