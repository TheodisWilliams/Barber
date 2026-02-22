# Installation Guide

Complete step-by-step guide to get "A Cut Above the Rest" running locally.

## ✅ Prerequisites

- Node.js 18+ ([Download](https://nodejs.org/))
- npm (comes with Node.js)
- Git (optional, for version control)
- Code editor (VS Code recommended)

## 📦 Project Structure

```
Barber/
├── frontend/           # Next.js application (already installed ✓)
├── backend/
│   ├── strapi-backend/ # Strapi CMS (already installed ✓)
│   └── strapi-reference/ # Schemas and seed data
└── [Documentation files]
```

## 🎯 Installation Status

**✅ COMPLETE** - Both frontend and backend are installed!

### What Was Installed:

1. ✅ **Frontend** (`/frontend`)
   - Next.js 14 with App Router
   - All dependencies installed (435 packages)
   - TypeScript, Tailwind CSS, Framer Motion
   - React Hook Form, Zod validation
   - Ready to run

2. ✅ **Backend** (`/backend/strapi-backend`)
   - Strapi v5.36.1
   - PostgreSQL driver (pg package)
   - All dependencies installed (1503 packages)
   - SQLite database configured for local dev
   - Ready to run

## 🚀 Quick Start

### Step 1: Start Backend (Strapi)

Open a terminal and run:

```bash
cd backend/strapi-backend
npm run develop
```

**What happens:**
- Strapi starts on http://localhost:1337
- Admin panel opens at http://localhost:1337/admin
- On first run, you'll create an admin account

**Create your admin account:**
- Email: your@email.com
- Password: (choose a strong password)
- Name: Your Name

### Step 2: Configure Strapi

#### A. Add Content Types

Follow instructions in [backend/README.md](backend/README.md) to:
1. Use Content-Type Builder to create 6 content types
2. Or copy schemas from `backend/strapi-reference/schemas/`

Required content types:
- Barber
- Service
- Appointment
- Shop Info (Single Type)
- Testimonial
- Schedule Exception

#### B. Set API Permissions

1. Go to **Settings → Roles → Public**
2. Enable these permissions:

| Content Type | Enable |
|--------------|--------|
| Barber | find, findOne |
| Service | find, findOne |
| Shop-info | find |
| Testimonial | find |
| Appointment | find, create |

#### C. Generate API Token

1. **Settings → API Tokens → Create new API Token**
2. Name: "Next.js Frontend"
3. Token type: **Full access**
4. **Copy the token** (you'll need it next)

#### D. Add Seed Data

Import data from `backend/strapi-reference/seed-data/`:
- 4 Barbers from `barbers.json`
- 8 Services from `services.json`
- 6 Testimonials from `testimonials.json`
- Shop Info from `shop-info.json`

Go to **Content Manager → Select type → Create new entry**

### Step 3: Configure Frontend

In a **second terminal**:

```bash
cd frontend
```

Edit `.env.local`:

```env
# Backend
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=paste_your_token_here

# Email (for testing, use placeholder)
RESEND_API_KEY=re_placeholder

# Email addresses
NOTIFICATIONS_EMAIL_FROM=bookings@acutabovetherest.com
NOTIFICATIONS_EMAIL_TO=shop@acutabovetherest.com

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
TIMEZONE=America/Chicago

# Booking settings
BOOKING_SLOT_INTERVAL_MINUTES=15
BOOKING_LEAD_TIME_HOURS=2
BOOKING_MAX_DAYS_AHEAD=30
BOOKING_BUFFER_MINUTES=0
```

**Important:** Replace `paste_your_token_here` with the API token from Step 2C!

### Step 4: Start Frontend

In the same terminal (still in `/frontend`):

```bash
npm run dev
```

**What happens:**
- Next.js starts on http://localhost:3000
- Frontend connects to Strapi backend
- Website is ready!

### Step 5: Test It Out

1. Open http://localhost:3000 in your browser
2. Click through the pages:
   - Home → Should show hero and preview
   - Services → Should list services from Strapi
   - Barbers → Should show barbers from Strapi
   - Book → Should load booking wizard

3. Try making a test booking:
   - Select a barber
   - Choose a service
   - Pick a date
   - Select a time slot
   - Fill in details
   - Confirm booking

4. Check Strapi admin → Appointments → See your booking!

## 🐛 Troubleshooting

### "Failed to fetch barbers"

**Problem:** Frontend can't connect to backend

**Solution:**
1. Verify Strapi is running (http://localhost:1337)
2. Check `NEXT_PUBLIC_STRAPI_URL` in `frontend/.env.local`
3. Verify API token is correct
4. Check Strapi API permissions are set

### "No available time slots"

**Problem:** Barbers don't have working hours

**Solution:**
1. Go to Strapi admin
2. Edit each barber
3. Ensure working hours are set in the JSON field
4. Use format from `backend/strapi-reference/seed-data/barbers.json`

### Port already in use

**Problem:** Port 3000 or 1337 is taken

**Solution for Frontend:**
```bash
cd frontend
PORT=3001 npm run dev
```

**Solution for Backend:**
```bash
cd backend/strapi-backend
PORT=1338 npm run develop
```

Don't forget to update `NEXT_PUBLIC_STRAPI_URL` if you change backend port!

### Email not working

**Problem:** Confirmation emails not sending

**This is expected!** Email requires:
1. Resend account with API key
2. Verified domain

For local testing:
- Emails will fail silently
- Bookings still save to database
- Setup real email later (see [DEPLOYMENT.md](DEPLOYMENT.md))

## 📁 File Structure Reference

### Frontend
```
frontend/
├── src/
│   ├── app/           # Pages and API routes
│   ├── components/    # React components
│   ├── lib/           # Utilities (availability, email, strapi)
│   └── types/         # TypeScript types
├── .env.local         # ← Configure this!
└── package.json
```

### Backend
```
backend/
├── strapi-backend/    # Strapi application
│   ├── config/        # Configuration
│   ├── src/api/       # API content types
│   └── .env           # Strapi environment
└── strapi-reference/  # Schemas and seed data
    ├── schemas/       # Content type definitions
    └── seed-data/     # Initial data to import
```

## 🎯 Next Steps

After local setup works:

1. **Customize Content**
   - Replace placeholder images
   - Update shop information
   - Adjust working hours
   - Add real barber photos

2. **Test Features**
   - Make test bookings
   - Check availability algorithm
   - Verify data persists
   - Test on mobile

3. **Production Deployment**
   - Follow [DEPLOYMENT.md](DEPLOYMENT.md)
   - Deploy backend to Railway
   - Deploy frontend to Vercel
   - Set up email service

4. **Customization**
   - See [HANDOFF.md](HANDOFF.md)
   - Adjust colors/branding
   - Modify booking settings
   - Add more services/barbers

## 📚 Documentation

- **[README.md](README.md)** - Project overview
- **[frontend/README.md](frontend/README.md)** - Frontend documentation
- **[backend/README.md](backend/README.md)** - Backend documentation
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Production deployment
- **[HANDOFF.md](HANDOFF.md)** - Customization guide

## 💡 Tips

### Development Workflow

1. Start Strapi first (terminal 1)
2. Start Next.js second (terminal 2)
3. Make changes to frontend → see updates instantly
4. Make changes in Strapi → restart Strapi
5. Add new content types → restart both

### Recommended Order

1. ✅ Get both running locally (you're here!)
2. Add one barber with photo and schedule
3. Add 2-3 services
4. Test booking flow end-to-end
5. Add remaining content
6. Customize styling/branding
7. Deploy to production

### Common Commands

```bash
# Frontend (from /frontend)
npm run dev          # Development server
npm run build        # Production build
npm run type-check   # Check TypeScript

# Backend (from /backend/strapi-backend)
npm run develop      # Development with admin UI
npm run start        # Production mode
npm run build        # Build admin panel
```

## ✅ Installation Complete!

You now have:
- ✅ Frontend running on http://localhost:3000
- ✅ Backend running on http://localhost:1337
- ✅ All dependencies installed
- ✅ Ready for development

**Happy coding! 🚀**

---

Need help? Check the documentation files or review the code comments.
