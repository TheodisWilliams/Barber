# A Cut Above the Rest - Barbershop Website

A production-ready, modern barbershop website for "A Cut Above the Rest" - a Black-owned premium barbershop.

## 📁 Project Structure

```
Barber/
├── frontend/          # Next.js 14 frontend application
├── backend/           # Strapi CMS backend
├── DEPLOYMENT.md      # Deployment instructions
├── HANDOFF.md         # Project handoff checklist
└── README.md          # This file
```

## 🚀 Quick Start

### 1. Install Frontend

```bash
cd frontend
npm install
npm run dev           # Runs on http://localhost:3000
```

### 2. Install Backend

Backend is already installed! Just run:

```bash
cd backend
npm run develop       # Runs on http://localhost:1337
```

### 3. Configure Environment Variables

In `frontend/.env.local`:
```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_token_here
RESEND_API_KEY=your_key_here
# ... see frontend/.env.example for full list
```

## 📚 Documentation

- **[Frontend README](frontend/README.md)** - Next.js application details
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Complete deployment guide
- **[HANDOFF.md](HANDOFF.md)** - Customization checklist

## 🛠 Tech Stack

**Frontend:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- React Hook Form + Zod

**Backend:**
- Strapi v4+ CMS
- PostgreSQL
- Railway hosting

## 🎯 Features

✅ Marketing website (Home, Services, Barbers, Contact)
✅ Advanced booking system with real-time availability
✅ Smart slot generation algorithm
✅ Email notifications (Resend/Postmark)
✅ Mobile-first responsive design
✅ Accessibility compliant
✅ SEO optimized

## 📦 What's Included

### Frontend (`/frontend`)
- 7 pages (Home, Services, Barbers, Barber Profile, Book, Contact, Policies)
- 4 API routes (barbers, services, availability, appointments)
- 11 components (Navbar, Footer, booking wizard components)
- Availability algorithm with conflict detection
- Email service integration
- Full TypeScript coverage

### Backend (`/backend`)
- Strapi v5 CMS (fully installed ✓)
- 6 content type schemas (in strapi-reference/)
- Seed data (4 barbers, 8 services, 6 testimonials)
- SQLite for local dev, PostgreSQL for production

## 🚀 Deployment

**Frontend:** Deploy to Vercel
**Backend:** Deploy to Railway with PostgreSQL

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed step-by-step instructions.

## 📞 Support

For questions about the codebase:
1. Check documentation in respective folders
2. See HANDOFF.md for customization guide

---

Built with ❤️ for the community
