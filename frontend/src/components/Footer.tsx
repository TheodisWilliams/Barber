import Link from 'next/link';
import { Instagram, Facebook, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-black text-brand-warm">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-brand-gold">A Cut Above the Rest</h3>
            <p className="text-sm text-gray-300 mb-4">
              Proudly Black-owned. Premium grooming services for the modern man.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/services" className="hover:text-brand-gold transition-colors">Services</Link></li>
              <li><Link href="/barbers" className="hover:text-brand-gold transition-colors">Our Team</Link></li>
              <li><Link href="/book" className="hover:text-brand-gold transition-colors">Book Appointment</Link></li>
              <li><Link href="/policies" className="hover:text-brand-gold transition-colors">Policies</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-1 text-brand-gold flex-shrink-0" />
                <span>123 Main Street<br />Chicago, IL 60601</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <a href="tel:+13125551234" className="hover:text-brand-gold transition-colors">
                  (312) 555-1234
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <a href="mailto:info@acutabovetherest.com" className="hover:text-brand-gold transition-colors">
                  info@acutabovetherest.com
                </a>
              </li>
            </ul>
          </div>

          {/* Hours & Social */}
          <div>
            <h4 className="font-semibold mb-4">Hours</h4>
            <ul className="space-y-1 text-sm mb-4">
              <li>Mon-Thu: 9:00 AM - 6:00 PM</li>
              <li>Fri: 9:00 AM - 7:00 PM</li>
              <li>Sat: 8:00 AM - 5:00 PM</li>
              <li>Sun: Closed</li>
            </ul>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-gold transition-colors focus-visible-ring rounded"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-gold transition-colors focus-visible-ring rounded"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-brand-charcoal mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} A Cut Above the Rest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
