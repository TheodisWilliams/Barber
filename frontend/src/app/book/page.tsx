'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import BarberSelect from '@/components/booking/BarberSelect';
import ServiceSelect from '@/components/booking/ServiceSelect';
import DatePicker from '@/components/booking/DatePicker';
import TimeSlotGrid from '@/components/booking/TimeSlotGrid';
import ClientDetailsForm from '@/components/booking/ClientDetailsForm';
import BookingSummary from '@/components/booking/BookingSummary';
import ConfirmationScreen from '@/components/booking/ConfirmationScreen';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Barber, Service } from '@/types';

export default function BookingPage() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [confirmationCode, setConfirmationCode] = useState<string>('');

  // Pre-fill from URL params
  useEffect(() => {
    const barberId = searchParams.get('barberId');
    const serviceId = searchParams.get('serviceId');

    // These would be set by the respective components when they load
    // This is just a placeholder for the logic
  }, [searchParams]);

  const totalSteps = 5;

  const canProceed = () => {
    switch (step) {
      case 1:
        return selectedBarber !== null;
      case 2:
        return selectedService !== null;
      case 3:
        return selectedDate !== '';
      case 4:
        return selectedTime !== '';
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (canProceed() && step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleBookingComplete = (code: string) => {
    setConfirmationCode(code);
    setStep(6); // Confirmation screen
  };

  if (step === 6 && confirmationCode) {
    return (
      <ConfirmationScreen
        confirmationCode={confirmationCode}
        barberName={selectedBarber?.attributes.name || ''}
        serviceName={selectedService?.attributes.name || ''}
        date={selectedDate}
        time={selectedTime}
      />
    );
  }

  return (
    <div className="min-h-screen bg-brand-warm">
      {/* Header */}
      <section className="bg-brand-black text-white py-12">
        <div className="container-custom">
          <h1 className="text-4xl font-bold text-center mb-8">Book Your Appointment</h1>

          {/* Progress Indicator */}
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3, 4, 5].map((s) => (
                <div key={s} className="flex-1 relative">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto ${
                      s <= step
                        ? 'bg-brand-gold text-brand-black'
                        : 'bg-brand-charcoal text-gray-400'
                    } transition-all duration-200`}
                  >
                    {s}
                  </div>
                  {s < 5 && (
                    <div
                      className={`absolute top-5 left-1/2 w-full h-0.5 ${
                        s < step ? 'bg-brand-gold' : 'bg-brand-charcoal'
                      } transition-all duration-200`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className={step === 1 ? 'text-brand-gold font-semibold' : 'text-gray-400'}>
                Barber
              </span>
              <span className={step === 2 ? 'text-brand-gold font-semibold' : 'text-gray-400'}>
                Service
              </span>
              <span className={step === 3 ? 'text-brand-gold font-semibold' : 'text-gray-400'}>
                Date
              </span>
              <span className={step === 4 ? 'text-brand-gold font-semibold' : 'text-gray-400'}>
                Time
              </span>
              <span className={step === 5 ? 'text-brand-gold font-semibold' : 'text-gray-400'}>
                Details
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-custom max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Booking Steps */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-8">
                {step === 1 && (
                  <BarberSelect
                    selectedBarber={selectedBarber}
                    onSelect={setSelectedBarber}
                  />
                )}

                {step === 2 && (
                  <ServiceSelect
                    selectedService={selectedService}
                    onSelect={setSelectedService}
                    barberId={selectedBarber?.id}
                  />
                )}

                {step === 3 && (
                  <DatePicker
                    selectedDate={selectedDate}
                    onSelect={setSelectedDate}
                  />
                )}

                {step === 4 && (
                  <TimeSlotGrid
                    barberId={selectedBarber!.id}
                    serviceDuration={selectedService!.attributes.durationMinutes}
                    date={selectedDate}
                    selectedTime={selectedTime}
                    onSelect={setSelectedTime}
                  />
                )}

                {step === 5 && (
                  <ClientDetailsForm
                    barberId={selectedBarber!.id}
                    serviceId={selectedService!.id}
                    date={selectedDate}
                    time={selectedTime}
                    onSuccess={handleBookingComplete}
                  />
                )}

                {/* Navigation Buttons */}
                {step < 5 && (
                  <div className="flex gap-4 mt-8 pt-8 border-t">
                    {step > 1 && (
                      <button
                        onClick={handleBack}
                        className="btn btn-outline flex items-center gap-2"
                      >
                        <ChevronLeft className="w-5 h-5" />
                        Back
                      </button>
                    )}
                    <button
                      onClick={handleNext}
                      disabled={!canProceed()}
                      className="btn btn-primary flex items-center gap-2 ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Booking Summary Sidebar */}
            <div className="lg:col-span-1">
              <BookingSummary
                barber={selectedBarber}
                service={selectedService}
                date={selectedDate}
                time={selectedTime}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
