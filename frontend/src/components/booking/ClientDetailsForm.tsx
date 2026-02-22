'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';

const clientSchema = z.object({
  clientName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  clientEmail: z.string().email('Invalid email address'),
  clientPhone: z.string().regex(/^[\d\s\-\+\(\)]+$/, 'Invalid phone number'),
  notes: z.string().max(500, 'Notes must be less than 500 characters').optional(),
});

type ClientFormData = z.infer<typeof clientSchema>;

interface ClientDetailsFormProps {
  barberId: number;
  serviceId: number;
  date: string;
  time: string;
  onSuccess: (confirmationCode: string) => void;
}

export default function ClientDetailsForm({
  barberId,
  serviceId,
  date,
  time,
  onSuccess,
}: ClientDetailsFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
  });

  const onSubmit = async (data: ClientFormData) => {
    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          barberId,
          serviceId,
          date,
          time,
          ...data,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create appointment');
      }

      onSuccess(result.confirmationCode);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Your Details</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="clientName" className="block text-sm font-medium mb-2">
            Full Name *
          </label>
          <input
            id="clientName"
            type="text"
            {...register('clientName')}
            className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-brand-gold ${
              errors.clientName ? 'border-red-500' : 'border-gray-200'
            }`}
            placeholder="John Doe"
          />
          {errors.clientName && (
            <p className="text-red-600 text-sm mt-1">{errors.clientName.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="clientEmail" className="block text-sm font-medium mb-2">
            Email Address *
          </label>
          <input
            id="clientEmail"
            type="email"
            {...register('clientEmail')}
            className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-brand-gold ${
              errors.clientEmail ? 'border-red-500' : 'border-gray-200'
            }`}
            placeholder="john@example.com"
          />
          {errors.clientEmail && (
            <p className="text-red-600 text-sm mt-1">{errors.clientEmail.message}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            We'll send your confirmation to this email
          </p>
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="clientPhone" className="block text-sm font-medium mb-2">
            Phone Number *
          </label>
          <input
            id="clientPhone"
            type="tel"
            {...register('clientPhone')}
            className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-brand-gold ${
              errors.clientPhone ? 'border-red-500' : 'border-gray-200'
            }`}
            placeholder="(312) 555-1234"
          />
          {errors.clientPhone && (
            <p className="text-red-600 text-sm mt-1">{errors.clientPhone.message}</p>
          )}
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="notes" className="block text-sm font-medium mb-2">
            Special Requests (Optional)
          </label>
          <textarea
            id="notes"
            {...register('notes')}
            rows={4}
            className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-brand-gold ${
              errors.notes ? 'border-red-500' : 'border-gray-200'
            }`}
            placeholder="Any specific style requests or preferences..."
          />
          {errors.notes && (
            <p className="text-red-600 text-sm mt-1">{errors.notes.message}</p>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full btn btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {submitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Confirming Appointment...
            </>
          ) : (
            'Confirm Appointment'
          )}
        </button>

        <p className="text-xs text-gray-500 text-center">
          By confirming, you agree to our cancellation policy
        </p>
      </form>
    </div>
  );
}
