# Frontend - A Cut Above the Rest

Next.js 14 frontend application for the barbershop booking system.

## 🚀 Getting Started

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

Required variables:
```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_strapi_api_token
RESEND_API_KEY=your_resend_api_key
NOTIFICATIONS_EMAIL_FROM=bookings@yourdomain.com
NOTIFICATIONS_EMAIL_TO=shop@yourdomain.com
NEXT_PUBLIC_APP_URL=http://localhost:3000
TIMEZONE=America/Chicago
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/               # API routes
│   │   ├── barbers/           # Barber pages
│   │   ├── book/              # Booking wizard
│   │   ├── contact/           # Contact page
│   │   ├── policies/          # Policies page
│   │   ├── services/          # Services page
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── booking/           # Booking flow components
│   │   ├── Footer.tsx
│   │   └── Navbar.tsx
│   ├── lib/                   # Utilities
│   │   ├── availability.ts    # Slot generation algorithm
│   │   ├── email.ts           # Email service
│   │   └── strapi.ts          # Strapi API client
│   └── types/                 # TypeScript types
│       └── index.ts
├── .env.example
├── .env.local
├── next.config.js
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## 🛠 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript type checking |

## 🎨 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Forms:** React Hook Form + Zod
- **Animations:** Framer Motion
- **Date/Time:** date-fns + date-fns-tz
- **Icons:** Lucide React
- **Email:** Resend

## 📄 Pages

| Route | Description |
|-------|-------------|
| `/` | Home page with hero, services preview, testimonials |
| `/services` | All services with pricing and descriptions |
| `/barbers` | Team listing with photos and specialties |
| `/barbers/[slug]` | Individual barber profile with schedule |
| `/book` | 5-step booking wizard |
| `/contact` | Contact information and location |
| `/policies` | Cancellation and shop policies |

## 🔌 API Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/barbers` | GET | Fetch all active barbers |
| `/api/services` | GET | Fetch all active services |
| `/api/availability` | GET | Generate available time slots |
| `/api/appointments` | GET | Fetch appointments (filtered) |
| `/api/appointments` | POST | Create new appointment |

## 🎯 Key Features

### Booking System

The booking flow is a multi-step wizard with:

1. **Barber Selection** - Visual cards with photos and specialties
2. **Service Selection** - Categorized services with pricing
3. **Date Picker** - Calendar with 30-day booking window
4. **Time Slot Grid** - Real-time availability by time of day
5. **Client Details** - Form with validation
6. **Confirmation** - Success screen with confirmation code

### Availability Algorithm

Located in `src/lib/availability.ts`:

**Inputs:**
- Barber ID
- Date (YYYY-MM-DD)
- Service duration (minutes)
- Working hours
- Existing appointments

**Logic:**
- Generates 15-minute time slots
- Filters by working hours and breaks
- Checks for appointment conflicts
- Enforces 2-hour lead time
- Respects timezone (America/Chicago)

**Output:**
- Array of `{ time: "HH:mm", available: boolean }` objects

### Email Notifications

Using Resend, sends:
- Confirmation email to client with appointment details
- Notification email to shop
- Professional HTML template with branding

## 🎨 Design System

### Colors

```typescript
brand: {
  black: '#0A0A0A',
  charcoal: '#1A1A1A',
  'charcoal-light': '#2A2A2A',
  warm: '#F5F1ED',
  'warm-dark': '#E8E2DB',
  gold: '#D4AF37',
  'gold-muted': '#C9A961',
}
```

### Typography

- **Font:** Inter (Google Fonts)
- Configured via CSS variable: `--font-inter`

### Reusable Classes

```css
.btn                  /* Base button */
.btn-primary          /* Black background */
.btn-secondary        /* Gold background */
.btn-outline          /* Outlined button */
.card                 /* White card with shadow */
.card-hover           /* Hover lift effect */
```

## 🔧 Configuration

### Booking Settings

Adjust in `.env.local`:

```env
BOOKING_SLOT_INTERVAL_MINUTES=15    # Time between slots
BOOKING_LEAD_TIME_HOURS=2           # Minimum advance booking
BOOKING_MAX_DAYS_AHEAD=30           # Booking window
BOOKING_BUFFER_MINUTES=0            # Buffer between appointments
TIMEZONE=America/Chicago            # Your timezone
```

### Image Domains

Configured in `next.config.js`:

```javascript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'source.unsplash.com' },
    { protocol: 'https', hostname: 'images.unsplash.com' },
    { protocol: 'http', hostname: 'localhost', port: '1337' },
    { protocol: 'https', hostname: '*.railway.app' },
  ],
}
```

## 🐛 Troubleshooting

### "Failed to fetch" errors

**Cause:** Strapi backend not running or wrong URL

**Solution:**
1. Ensure Strapi is running: `cd ../backend/strapi-backend && npm run develop`
2. Check `NEXT_PUBLIC_STRAPI_URL` in `.env.local`
3. Verify Strapi API permissions are set

### No available time slots

**Cause:** Barber working hours not set or date out of range

**Solution:**
1. Check barber has working hours in Strapi
2. Verify date is within 30-day window
3. Check timezone setting matches data

### TypeScript errors

**Solution:**
```bash
npm run type-check
```

### Build fails

**Solution:**
```bash
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)

## 🚀 Deployment

Deploy to Vercel:

1. Push code to GitHub
2. Import repository to Vercel
3. Add environment variables
4. Deploy

See [../DEPLOYMENT.md](../DEPLOYMENT.md) for detailed instructions.

## 📝 Notes

- Currently uses Unsplash placeholder images - replace with real photos in production
- Email service requires domain verification in Resend
- Backend must be running for full functionality
- Timezone configuration is critical for accurate availability

---

For issues or questions, refer to the main project documentation in the root directory.
