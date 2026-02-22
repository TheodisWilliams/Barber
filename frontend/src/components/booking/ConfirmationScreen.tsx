'use client';

import Link from 'next/link';
import { CheckCircle, Calendar, Printer, Home } from 'lucide-react';
import { format } from 'date-fns';

interface ConfirmationScreenProps {
  confirmationCode: string;
  barberName: string;
  serviceName: string;
  date: string;
  time: string;
}

export default function ConfirmationScreen({
  confirmationCode,
  barberName,
  serviceName,
  date,
  time,
}: ConfirmationScreenProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-brand-warm flex items-center justify-center py-12">
      <div className="container-custom max-w-2xl">
        <div className="bg-white rounded-lg shadow-2xl p-8 md:p-12 text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <CheckCircle className="w-24 h-24 text-green-500 mx-auto" />
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Appointment Confirmed!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            We're looking forward to seeing you
          </p>

          {/* Confirmation Code */}
          <div className="bg-brand-warm p-6 rounded-lg mb-8">
            <p className="text-sm text-gray-600 mb-2">Your Confirmation Code</p>
            <p className="text-4xl font-bold text-brand-gold tracking-wider">
              {confirmationCode}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Save this code or take a screenshot
            </p>
          </div>

          {/* Appointment Details */}
          <div className="border-t border-b py-6 mb-8">
            <h2 className="font-semibold text-lg mb-4">Appointment Details</h2>
            <div className="space-y-3 text-left max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-gray-600">Barber:</span>
                <span className="font-semibold">{barberName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Service:</span>
                <span className="font-semibold">{serviceName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-semibold">
                  {format(new Date(date), 'EEEE, MMM d, yyyy')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time:</span>
                <span className="font-semibold">{time}</span>
              </div>
            </div>
          </div>

          {/* Important Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 text-left">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Important Information
            </h3>
            <ul className="text-sm space-y-1 text-gray-700">
              <li>• A confirmation email has been sent to your inbox</li>
              <li>• Please arrive 5 minutes before your appointment</li>
              <li>• Bring your confirmation code</li>
              <li>• To cancel or reschedule, call us at (312) 555-1234</li>
              <li>• 24 hours notice required for cancellations</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handlePrint}
              className="btn btn-outline flex items-center justify-center gap-2"
            >
              <Printer className="w-5 h-5" />
              Print Confirmation
            </button>
            <Link href="/" className="btn btn-primary flex items-center justify-center gap-2">
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
          </div>

          {/* Contact Info */}
          <div className="mt-8 pt-8 border-t text-sm text-gray-600">
            <p className="font-semibold mb-2">A Cut Above the Rest</p>
            <p>123 Main Street, Chicago, IL 60601</p>
            <p>(312) 555-1234</p>
          </div>
        </div>
      </div>
    </div>
  );
}
