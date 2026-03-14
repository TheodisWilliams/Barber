'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { format, isPast, parseISO } from 'date-fns';
import { Calendar, Clock, User, Scissors, LogOut, AlertCircle, CheckCircle } from 'lucide-react';
import type { User as UserType } from '@/lib/auth';

interface Appointment {
  id: number;
  attributes: {
    startAt: string;
    endAt: string;
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    status: string;
    barber: {
      data: {
        id: number;
        attributes: {
          name: string;
        };
      };
    };
    service: {
      data: {
        id: number;
        attributes: {
          name: string;
          price: number;
        };
      };
    };
  };
}

export default function DashboardContent({ user }: { user: UserType }) {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancellingId, setCancellingId] = useState<number | null>(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch('/api/appointments/user');

      if (!response.ok) {
        throw new Error('Failed to fetch appointments');
      }

      const data = await response.json();
      setAppointments(data.data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/');
      router.refresh();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const handleCancelAppointment = async (appointmentId: number) => {
    if (!confirm('Are you sure you want to cancel this appointment?')) {
      return;
    }

    setCancellingId(appointmentId);

    try {
      const response = await fetch(`/api/appointments/${appointmentId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to cancel appointment');
      }

      // Refresh appointments list
      await fetchAppointments();
    } catch (err: any) {
      alert(err.message || 'Failed to cancel appointment');
    } finally {
      setCancellingId(null);
    }
  };

  const upcomingAppointments = appointments.filter(
    (apt) => !isPast(parseISO(apt.attributes.startAt)) && apt.attributes.status !== 'cancelled'
  );

  const pastAppointments = appointments.filter(
    (apt) => isPast(parseISO(apt.attributes.startAt)) || apt.attributes.status === 'cancelled'
  );

  return (
    <div className="min-h-screen bg-brand-warm">
      {/* Header */}
      <div className="bg-brand-black text-white py-8">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome, {user.username}!</h1>
              <p className="text-gray-300">{user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="btn btn-outline bg-white/10 backdrop-blur-sm text-white border-white hover:bg-white hover:text-brand-black"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Quick Actions */}
          <Link
            href="/book"
            className="card card-hover p-6 text-center bg-brand-gold text-brand-black"
          >
            <Calendar className="w-12 h-12 mx-auto mb-3" />
            <h3 className="text-xl font-bold">Book Appointment</h3>
            <p className="text-sm mt-2">Schedule your next cut</p>
          </Link>

          <div className="card p-6 text-center">
            <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-600" />
            <h3 className="text-xl font-bold">{upcomingAppointments.length}</h3>
            <p className="text-sm text-gray-600 mt-2">Upcoming Appointments</p>
          </div>

          <div className="card p-6 text-center">
            <Clock className="w-12 h-12 mx-auto mb-3 text-blue-600" />
            <h3 className="text-xl font-bold">{appointments.length}</h3>
            <p className="text-sm text-gray-600 mt-2">Total Appointments</p>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Upcoming Appointments</h2>

          {loading ? (
            <div className="card p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading appointments...</p>
            </div>
          ) : error ? (
            <div className="card p-6 bg-red-50 border-red-200">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-800 font-medium">Error loading appointments</p>
                  <p className="text-red-600 text-sm mt-1">{error}</p>
                </div>
              </div>
            </div>
          ) : upcomingAppointments.length === 0 ? (
            <div className="card p-8 text-center">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No upcoming appointments</p>
              <Link href="/book" className="btn btn-primary inline-block">
                Book Your First Appointment
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="card p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Scissors className="w-6 h-6 text-brand-gold" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2">
                            {appointment.attributes.service.data.attributes.name}
                          </h3>
                          <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4" />
                              <span>{appointment.attributes.barber.data.attributes.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>
                                {format(parseISO(appointment.attributes.startAt), 'EEEE, MMMM d, yyyy')}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>
                                {format(parseISO(appointment.attributes.startAt), 'h:mm a')}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="text-2xl font-bold text-brand-gold">
                        ${appointment.attributes.service.data.attributes.price}
                      </div>
                      <button
                        onClick={() => handleCancelAppointment(appointment.id)}
                        disabled={cancellingId === appointment.id}
                        className="btn btn-outline border-red-600 text-red-600 hover:bg-red-600 hover:text-white text-sm"
                      >
                        {cancellingId === appointment.id ? 'Cancelling...' : 'Cancel Appointment'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Past Appointments */}
        {pastAppointments.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Past Appointments</h2>
            <div className="space-y-4">
              {pastAppointments.map((appointment) => (
                <div key={appointment.id} className="card p-6 opacity-60">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold mb-1">
                        {appointment.attributes.service.data.attributes.name}
                      </h3>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>with {appointment.attributes.barber.data.attributes.name}</div>
                        <div>
                          {format(parseISO(appointment.attributes.startAt), 'MMM d, yyyy · h:mm a')}
                        </div>
                        <div className="mt-2">
                          <span
                            className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                              appointment.attributes.status === 'cancelled'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {appointment.attributes.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-lg font-bold text-gray-400">
                      ${appointment.attributes.service.data.attributes.price}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
