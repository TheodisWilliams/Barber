import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const metadata = {
  title: 'Contact Us - A Cut Above the Rest',
  description: 'Get in touch with us. Visit our barbershop or contact us for appointments and inquiries.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-brand-black text-white py-20">
        <div className="container-custom text-center">
          <h1 className="mb-6">Get In Touch</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have questions? Want to book an appointment? We're here to help.
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="section-padding bg-brand-warm">
        <div className="container-custom max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Details */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-8">Visit Us</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-brand-gold" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Address</h3>
                      <p className="text-gray-600">
                        123 Main Street<br />
                        Chicago, IL 60601
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-brand-gold" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Phone</h3>
                      <a
                        href="tel:+13125551234"
                        className="text-gray-600 hover:text-brand-gold transition-colors"
                      >
                        (312) 555-1234
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-brand-gold" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Email</h3>
                      <a
                        href="mailto:info@acutabovetherest.com"
                        className="text-gray-600 hover:text-brand-gold transition-colors"
                      >
                        info@acutabovetherest.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-brand-gold" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Hours</h3>
                      <div className="text-gray-600 space-y-1">
                        <p>Monday - Thursday: 9:00 AM - 6:00 PM</p>
                        <p>Friday: 9:00 AM - 7:00 PM</p>
                        <p>Saturday: 8:00 AM - 5:00 PM</p>
                        <p>Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden h-96 md:h-auto">
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <div className="text-center p-8">
                  <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">
                    {/* TODO: Add Google Maps embed */}
                    Map placeholder - Add Google Maps embed here
                  </p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary mt-4 inline-block"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-brand-warm p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Do I need an appointment?</h3>
              <p className="text-gray-600">
                We recommend booking an appointment to guarantee your preferred time and barber.
                Walk-ins are welcome based on availability.
              </p>
            </div>

            <div className="bg-brand-warm p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">What forms of payment do you accept?</h3>
              <p className="text-gray-600">
                We accept cash, all major credit cards, and digital payment methods.
              </p>
            </div>

            <div className="bg-brand-warm p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">How do I cancel or reschedule?</h3>
              <p className="text-gray-600">
                Please call us at least 24 hours in advance to cancel or reschedule your appointment.
              </p>
            </div>

            <div className="bg-brand-warm p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Do you offer group bookings?</h3>
              <p className="text-gray-600">
                Yes! Contact us directly for special event bookings, wedding parties, or group appointments.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
