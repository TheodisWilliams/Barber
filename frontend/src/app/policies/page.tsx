export const metadata = {
  title: 'Policies - A Cut Above the Rest',
  description: 'Our shop policies including cancellation, late arrival, and payment information.',
};

export default function PoliciesPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-brand-black text-white py-20">
        <div className="container-custom text-center">
          <h1 className="mb-6">Shop Policies</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Please review our policies before booking your appointment.
          </p>
        </div>
      </section>

      <section className="section-padding bg-brand-warm">
        <div className="container-custom max-w-4xl">
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Appointment & Booking</h2>
              <ul className="space-y-3 text-gray-600">
                <li className="flex gap-3">
                  <span className="text-brand-gold font-bold">•</span>
                  <span>Appointments can be booked online 24/7 or by calling the shop during business hours.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-gold font-bold">•</span>
                  <span>We recommend booking at least 2-3 days in advance to secure your preferred time.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-gold font-bold">•</span>
                  <span>Walk-ins are welcome but may experience longer wait times.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-gold font-bold">•</span>
                  <span>You will receive a confirmation email with your appointment details and confirmation code.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Cancellation Policy</h2>
              <ul className="space-y-3 text-gray-600">
                <li className="flex gap-3">
                  <span className="text-brand-gold font-bold">•</span>
                  <span>We require at least 24 hours notice for cancellations or rescheduling.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-gold font-bold">•</span>
                  <span>Late cancellations (less than 24 hours) or no-shows may incur a $25 fee.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-gold font-bold">•</span>
                  <span>Repeated no-shows may result in a requirement for prepayment for future bookings.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-gold font-bold">•</span>
                  <span>To cancel, please call us directly at (312) 555-1234.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Late Arrivals</h2>
              <ul className="space-y-3 text-gray-600">
                <li className="flex gap-3">
                  <span className="text-brand-gold font-bold">•</span>
                  <span>Please arrive 5 minutes before your scheduled appointment.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-gold font-bold">•</span>
                  <span>If running late, please call us to let us know.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-gold font-bold">•</span>
                  <span>Arrivals more than 15 minutes late may need to be rescheduled to accommodate other clients.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-gold font-bold">•</span>
                  <span>Late arrivals may result in a shortened service time to stay on schedule.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Payment</h2>
              <ul className="space-y-3 text-gray-600">
                <li className="flex gap-3">
                  <span className="text-brand-gold font-bold">•</span>
                  <span>Payment is due at the time of service.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-gold font-bold">•</span>
                  <span>We accept cash, all major credit cards (Visa, Mastercard, Amex, Discover), and digital payments.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-gold font-bold">•</span>
                  <span>Gratuity is appreciated but never required. Standard tipping is 15-20%.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-gold font-bold">•</span>
                  <span>Prices are subject to change. Current prices are listed on our Services page.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Shop Etiquette</h2>
              <ul className="space-y-3 text-gray-600">
                <li className="flex gap-3">
                  <span className="text-brand-gold font-bold">•</span>
                  <span>We strive to maintain a professional, welcoming environment for all clients.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-gold font-bold">•</span>
                  <span>Please be respectful to our barbers and other clients.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-gold font-bold">•</span>
                  <span>Children under 12 must be accompanied by an adult.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-gold font-bold">•</span>
                  <span>We reserve the right to refuse service to anyone who is disruptive or disrespectful.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Satisfaction Guarantee</h2>
              <ul className="space-y-3 text-gray-600">
                <li className="flex gap-3">
                  <span className="text-brand-gold font-bold">•</span>
                  <span>Your satisfaction is our priority. If you're not happy with your service, please let us know immediately.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-gold font-bold">•</span>
                  <span>We'll do our best to make it right, including offering touch-ups or adjustments.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-gold font-bold">•</span>
                  <span>Concerns must be addressed within 48 hours of your appointment.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
