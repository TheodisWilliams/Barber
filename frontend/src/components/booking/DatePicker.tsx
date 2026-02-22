'use client';

import { useState } from 'react';
import { format, addDays, startOfToday, isSameDay } from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

interface DatePickerProps {
  selectedDate: string;
  onSelect: (date: string) => void;
}

export default function DatePicker({ selectedDate, onSelect }: DatePickerProps) {
  const today = startOfToday();
  const [currentWeekStart, setCurrentWeekStart] = useState(today);

  const maxDaysAhead = parseInt(process.env.NEXT_PUBLIC_BOOKING_MAX_DAYS_AHEAD || '30');

  // Generate 7 days starting from currentWeekStart
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i));

  const handlePrevWeek = () => {
    const newStart = addDays(currentWeekStart, -7);
    if (newStart >= today) {
      setCurrentWeekStart(newStart);
    }
  };

  const handleNextWeek = () => {
    const newStart = addDays(currentWeekStart, 7);
    const maxDate = addDays(today, maxDaysAhead);
    if (newStart <= maxDate) {
      setCurrentWeekStart(newStart);
    }
  };

  const canGoPrev = currentWeekStart > today;
  const canGoNext = addDays(currentWeekStart, 7) <= addDays(today, maxDaysAhead);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Select a Date</h2>

      {/* Week Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handlePrevWeek}
          disabled={!canGoPrev}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors focus-visible-ring"
          aria-label="Previous week"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-2 text-lg font-semibold">
          <Calendar className="w-5 h-5 text-brand-gold" />
          <span>
            {format(currentWeekStart, 'MMM d')} - {format(addDays(currentWeekStart, 6), 'MMM d, yyyy')}
          </span>
        </div>

        <button
          onClick={handleNextWeek}
          disabled={!canGoNext}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors focus-visible-ring"
          aria-label="Next week"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Date Grid */}
      <div className="grid grid-cols-7 gap-3">
        {weekDays.map((day) => {
          const dateStr = format(day, 'yyyy-MM-dd');
          const isSelected = selectedDate === dateStr;
          const isToday = isSameDay(day, today);
          const isPast = day < today;

          return (
            <button
              key={dateStr}
              onClick={() => !isPast && onSelect(dateStr)}
              disabled={isPast}
              className={`
                p-4 rounded-lg text-center transition-all
                ${isPast ? 'opacity-30 cursor-not-allowed bg-gray-100' : ''}
                ${isSelected ? 'bg-brand-gold text-brand-black border-2 border-brand-gold' : 'border-2 border-gray-200 hover:border-brand-gold/50'}
                ${isToday && !isSelected ? 'border-brand-charcoal' : ''}
                focus-visible-ring
              `}
            >
              <div className="text-xs font-semibold mb-1">
                {format(day, 'EEE')}
              </div>
              <div className={`text-2xl font-bold ${isSelected ? 'text-brand-black' : ''}`}>
                {format(day, 'd')}
              </div>
              <div className="text-xs mt-1">
                {format(day, 'MMM')}
              </div>
              {isToday && (
                <div className="text-xs font-semibold mt-1 text-brand-gold">
                  Today
                </div>
              )}
            </button>
          );
        })}
      </div>

      <p className="text-sm text-gray-600 mt-4 text-center">
        You can book up to {maxDaysAhead} days in advance
      </p>
    </div>
  );
}
