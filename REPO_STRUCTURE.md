# Repository Structure

Complete file structure for "A Cut Above the Rest" barbershop website.

```
Barber/
│
├── .env.example                    # Environment variables template
├── .env.local                      # Local environment variables (gitignored)
├── .gitignore                      # Git ignore rules
├── CLAUDE.md                       # Claude Code guidance
├── DEPLOYMENT.md                   # Deployment instructions
├── HANDOFF.md                      # Project handoff checklist
├── README.md                       # Main documentation
├── REPO_STRUCTURE.md               # This file
├── next.config.js                  # Next.js configuration
├── package.json                    # Dependencies and scripts
├── postcss.config.js               # PostCSS configuration
├── tailwind.config.ts              # Tailwind CSS configuration
├── tsconfig.json                   # TypeScript configuration
│
├── public/                         # Static assets (empty - use CDN)
│
├── src/                            # Source code
│   │
│   ├── app/                        # Next.js App Router
│   │   ├── api/                    # API routes
│   │   │   ├── appointments/
│   │   │   │   └── route.ts        # POST /api/appointments, GET /api/appointments
│   │   │   ├── availability/
│   │   │   │   └── route.ts        # GET /api/availability
│   │   │   ├── barbers/
│   │   │   │   └── route.ts        # GET /api/barbers
│   │   │   └── services/
│   │   │       └── route.ts        # GET /api/services
│   │   │
│   │   ├── barbers/                # Barbers pages
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx        # Individual barber profile
│   │   │   └── page.tsx            # Barbers listing
│   │   │
│   │   ├── book/
│   │   │   └── page.tsx            # Booking wizard page
│   │   │
│   │   ├── contact/
│   │   │   └── page.tsx            # Contact page
│   │   │
│   │   ├── policies/
│   │   │   └── page.tsx            # Policies page
│   │   │
│   │   ├── services/
│   │   │   └── page.tsx            # Services listing
│   │   │
│   │   ├── globals.css             # Global CSS styles
│   │   ├── layout.tsx              # Root layout (nav + footer)
│   │   └── page.tsx                # Home page
│   │
│   ├── components/                 # React components
│   │   ├── booking/                # Booking flow components
│   │   │   ├── BarberSelect.tsx    # Step 1: Choose barber
│   │   │   ├── ServiceSelect.tsx   # Step 2: Choose service
│   │   │   ├── DatePicker.tsx      # Step 3: Pick date
│   │   │   ├── TimeSlotGrid.tsx    # Step 4: Choose time
│   │   │   ├── ClientDetailsForm.tsx # Step 5: Enter details
│   │   │   ├── BookingSummary.tsx  # Sidebar summary
│   │   │   └── ConfirmationScreen.tsx # Success screen
│   │   │
│   │   ├── Footer.tsx              # Site footer
│   │   └── Navbar.tsx              # Site navigation
│   │
│   ├── lib/                        # Utility functions
│   │   ├── availability.ts         # Slot generation algorithm
│   │   ├── email.ts                # Email service (Resend)
│   │   └── strapi.ts               # Strapi API client
│   │
│   └── types/                      # TypeScript types
│       └── index.ts                # All type definitions
│
└── strapi/                         # Strapi configuration (for reference)
    │
    ├── config/                     # Strapi config files
    │   ├── database.js             # PostgreSQL configuration
    │   └── server.js               # Server configuration
    │
    ├── schemas/                    # Content type schemas
    │   ├── appointment/
    │   │   └── schema.json
    │   ├── barber/
    │   │   └── schema.json
    │   ├── schedule-exception/
    │   │   └── schema.json
    │   ├── service/
    │   │   └── schema.json
    │   ├── shop-info/
    │   │   └── schema.json
    │   └── testimonial/
    │       └── schema.json
    │
    ├── seed-data/                  # Initial data (JSON)
    │   ├── barbers.json            # 4 barbers with schedules
    │   ├── services.json           # 8 services with pricing
    │   ├── shop-info.json          # Shop details
    │   └── testimonials.json       # 6 testimonials
    │
    └── README.md                   # Strapi setup instructions
```

## File Descriptions

### Configuration Files

| File | Purpose |
|------|---------|
| `.env.example` | Template for environment variables |
| `.env.local` | Local environment variables (not committed) |
| `.gitignore` | Files to exclude from Git |
| `next.config.js` | Next.js configuration (image domains, etc.) |
| `package.json` | Dependencies, scripts, project metadata |
| `postcss.config.js` | PostCSS plugins (Tailwind) |
| `tailwind.config.ts` | Tailwind CSS configuration (colors, fonts) |
| `tsconfig.json` | TypeScript compiler options |

### Documentation

| File | Purpose |
|------|---------|
| `README.md` | Main project documentation |
| `CLAUDE.md` | Guidance for Claude Code |
| `DEPLOYMENT.md` | Step-by-step deployment guide |
| `HANDOFF.md` | Project handoff checklist |
| `REPO_STRUCTURE.md` | This file - repository structure |

### Core Application

| Directory | Contents |
|-----------|----------|
| `src/app/` | Next.js pages (App Router) |
| `src/app/api/` | API route handlers |
| `src/components/` | Reusable React components |
| `src/lib/` | Utility functions and services |
| `src/types/` | TypeScript type definitions |

### Pages

| Route | File | Description |
|-------|------|-------------|
| `/` | `src/app/page.tsx` | Home page with hero, services preview, testimonials |
| `/services` | `src/app/services/page.tsx` | All services with pricing |
| `/barbers` | `src/app/barbers/page.tsx` | Team listing |
| `/barbers/[slug]` | `src/app/barbers/[slug]/page.tsx` | Individual barber profile |
| `/book` | `src/app/book/page.tsx` | Booking wizard |
| `/contact` | `src/app/contact/page.tsx` | Contact info and map |
| `/policies` | `src/app/policies/page.tsx` | Cancellation policies |

### API Routes

| Endpoint | File | Method | Purpose |
|----------|------|--------|---------|
| `/api/barbers` | `src/app/api/barbers/route.ts` | GET | Fetch all barbers |
| `/api/services` | `src/app/api/services/route.ts` | GET | Fetch all services |
| `/api/availability` | `src/app/api/availability/route.ts` | GET | Generate time slots |
| `/api/appointments` | `src/app/api/appointments/route.ts` | GET, POST | Fetch or create appointments |

### Components

| Component | File | Purpose |
|-----------|------|---------|
| `Navbar` | `src/components/Navbar.tsx` | Site navigation with mobile menu |
| `Footer` | `src/components/Footer.tsx` | Site footer with contact info |
| `BarberSelect` | `src/components/booking/BarberSelect.tsx` | Booking step 1 |
| `ServiceSelect` | `src/components/booking/ServiceSelect.tsx` | Booking step 2 |
| `DatePicker` | `src/components/booking/DatePicker.tsx` | Booking step 3 |
| `TimeSlotGrid` | `src/components/booking/TimeSlotGrid.tsx` | Booking step 4 |
| `ClientDetailsForm` | `src/components/booking/ClientDetailsForm.tsx` | Booking step 5 |
| `BookingSummary` | `src/components/booking/BookingSummary.tsx` | Sidebar summary |
| `ConfirmationScreen` | `src/components/booking/ConfirmationScreen.tsx` | Success screen |

### Utilities

| File | Purpose |
|------|---------|
| `src/lib/availability.ts` | Slot generation algorithm with conflict detection |
| `src/lib/email.ts` | Email service using Resend |
| `src/lib/strapi.ts` | Strapi API client functions |
| `src/types/index.ts` | TypeScript interfaces for all data types |

### Strapi Reference

| Directory | Contents |
|-----------|----------|
| `strapi/config/` | Database and server config templates |
| `strapi/schemas/` | Content type JSON schemas for Strapi |
| `strapi/seed-data/` | Initial data to populate Strapi |

## Key Patterns

### Naming Conventions

- **Files**: camelCase for components (`BarberSelect.tsx`), kebab-case for pages (`contact/page.tsx`)
- **Components**: PascalCase (`BarberSelect`)
- **Functions**: camelCase (`generateAvailableSlots`)
- **Types**: PascalCase (`Barber`, `Service`)
- **Constants**: UPPER_SNAKE_CASE (`DEFAULT_BARBER_IMAGE`)

### Import Aliases

Using `@/` for absolute imports:

```typescript
import { Barber } from '@/types'
import { getBarbers } from '@/lib/strapi'
import Navbar from '@/components/Navbar'
```

Configured in `tsconfig.json`:
```json
"paths": {
  "@/*": ["./src/*"]
}
```

### Component Structure

```typescript
// Server Component (default)
export default async function Page() {
  const data = await fetchData()
  return <div>{data}</div>
}

// Client Component (when needed)
'use client'
export default function InteractiveComponent() {
  const [state, setState] = useState()
  return <div>{state}</div>
}
```

## File Count Summary

- **Pages**: 7 (home, services, barbers, barber detail, book, contact, policies)
- **API Routes**: 4 (barbers, services, availability, appointments)
- **Components**: 9 (nav, footer, 7 booking components)
- **Utilities**: 3 (strapi, availability, email)
- **Config Files**: 7 (next, tailwind, typescript, etc.)
- **Documentation**: 5 (README, CLAUDE, DEPLOYMENT, HANDOFF, REPO_STRUCTURE)
- **Strapi Schemas**: 6 (barber, service, appointment, shop-info, testimonial, schedule-exception)
- **Seed Data**: 4 (barbers, services, testimonials, shop-info)

**Total**: ~45 key files
