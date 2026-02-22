# Deployment Guide - A Cut Above the Rest

Complete step-by-step deployment instructions for production.

## 📋 Prerequisites

- GitHub account
- Railway account (for Strapi + PostgreSQL)
- Vercel account (for Next.js frontend)
- Resend account (for emails)
- Domain name (optional but recommended)

---

## 🎯 Part 1: Deploy Strapi Backend to Railway

### Step 1: Prepare Strapi Project

```bash
# Create Strapi project
npx create-strapi-app@latest strapi-backend --quickstart --no-run

cd strapi-backend

# Install PostgreSQL driver
npm install pg

# Copy configuration files
# Copy from project /strapi/config/database.js to strapi-backend/config/
# Copy from project /strapi/config/server.js to strapi-backend/config/
```

### Step 2: Add Content Types

1. Start Strapi locally: `npm run develop`
2. Create admin account
3. Go to Content-Type Builder
4. For each content type, use the JSON schemas from `/strapi/schemas/`:
   - Barber
   - Service
   - Appointment
   - Shop Info
   - Testimonial
   - Schedule Exception

**OR** manually copy the schema files:
```bash
# Copy each schema folder to strapi-backend/src/api/
cp -r ../strapi/schemas/* strapi-backend/src/api/
```

### Step 3: Set Up Railway

1. **Create Railway Account**: https://railway.app

2. **Create New Project**
   ```bash
   railway login
   railway init
   ```

3. **Add PostgreSQL Database**
   - In Railway dashboard, click "New" → "Database" → "PostgreSQL"
   - Railway will provision a PostgreSQL instance

4. **Configure Environment Variables**

   In Railway dashboard → Variables, add:

   ```
   NODE_ENV=production

   # Database (auto-filled by Railway PostgreSQL plugin)
   DATABASE_HOST=${{POSTGRES.HOST}}
   DATABASE_PORT=${{POSTGRES.PORT}}
   DATABASE_NAME=${{POSTGRES.DATABASE}}
   DATABASE_USERNAME=${{POSTGRES.USER}}
   DATABASE_PASSWORD=${{POSTGRES.PASSWORD}}
   DATABASE_SSL=true

   # Strapi keys (generate random strings)
   APP_KEYS=<generate-4-random-keys-comma-separated>
   API_TOKEN_SALT=<generate-random-string>
   ADMIN_JWT_SECRET=<generate-random-string>
   JWT_SECRET=<generate-random-string>

   # Public URL (will be provided by Railway)
   PUBLIC_URL=https://<your-app>.railway.app

   # Server
   HOST=0.0.0.0
   PORT=1337
   ```

   **Generate random keys:**
   ```bash
   # In terminal:
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```

5. **Deploy to Railway**
   ```bash
   cd strapi-backend
   railway up
   ```

6. **Get Deployment URL**
   - Railway dashboard → Settings → Domains
   - Note your Railway URL (e.g., `https://your-app.railway.app`)

### Step 4: Configure Strapi

1. Visit your Railway Strapi URL
2. Complete admin registration
3. Go to **Settings → API Tokens**
4. Create new API token:
   - Name: "Next.js Frontend"
   - Token type: "Full access"
   - Save the token (you'll need it for Next.js)

5. **Set Permissions**
   - Settings → Roles → Public
   - Enable find & findOne for:
     - Barbers
     - Services
     - Testimonials
     - Shop-info
   - Enable find for:
     - Appointments (filtered by barber/date)
   - Enable create for:
     - Appointments

### Step 5: Seed Data

1. Log into Strapi admin
2. Add content using JSON from `/strapi/seed-data/`:
   - Add 4 barbers from `barbers.json`
   - Add 8 services from `services.json`
   - Add 6 testimonials from `testimonials.json`
   - Add shop info from `shop-info.json`

3. Upload barber photos (or use Unsplash URLs temporarily)

---

## 🚀 Part 2: Deploy Next.js Frontend to Vercel

### Step 1: Prepare Repository

```bash
# Initialize git (if not already)
git init
git add .
git commit -m "Initial commit"

# Create GitHub repo and push
git remote add origin https://github.com/yourusername/barber-website.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

1. **Sign in to Vercel**: https://vercel.com

2. **Import Project**
   - Click "Add New" → "Project"
   - Import your GitHub repository

3. **Configure Build Settings**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

4. **Environment Variables**

   Add the following in Vercel → Settings → Environment Variables:

   ```
   # Strapi Backend
   NEXT_PUBLIC_STRAPI_URL=https://your-strapi-app.railway.app
   STRAPI_API_TOKEN=<your-strapi-api-token>

   # Email Service
   RESEND_API_KEY=<your-resend-api-key>
   NOTIFICATIONS_EMAIL_FROM=bookings@acutabovetherest.com
   NOTIFICATIONS_EMAIL_TO=shop@acutabovetherest.com

   # App Configuration
   NEXT_PUBLIC_APP_URL=https://your-domain.com
   TIMEZONE=America/Chicago

   # Booking Configuration
   BOOKING_SLOT_INTERVAL_MINUTES=15
   BOOKING_LEAD_TIME_HOURS=2
   BOOKING_MAX_DAYS_AHEAD=30
   BOOKING_BUFFER_MINUTES=0
   ```

5. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy automatically
   - You'll get a URL like `https://your-app.vercel.app`

### Step 3: Test Production Build

1. Visit your Vercel URL
2. Test critical flows:
   - [ ] Home page loads
   - [ ] Barbers page displays all barbers
   - [ ] Services page shows services
   - [ ] Booking flow works end-to-end
   - [ ] Confirmation email sends

---

## 📧 Part 3: Set Up Email Service (Resend)

### Step 1: Create Resend Account

1. Sign up at https://resend.com
2. Verify your email

### Step 2: Configure Domain (Recommended)

1. Go to Resend Dashboard → Domains
2. Add your domain (e.g., `acutabovetherest.com`)
3. Add DNS records to your domain provider:
   - TXT record for verification
   - MX/SPF/DKIM records for sending

### Step 3: Get API Key

1. Resend Dashboard → API Keys
2. Create new API key
3. Copy the key and add to Vercel environment variables:
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   ```

### Step 4: Configure Sender Email

Update in Vercel environment variables:
```
NOTIFICATIONS_EMAIL_FROM=bookings@yourdomain.com
NOTIFICATIONS_EMAIL_TO=shop@yourdomain.com
```

### Step 5: Test Email

1. Make a test booking
2. Check that confirmation email arrives
3. Check spam folder if not in inbox

---

## 🌐 Part 4: Custom Domain (Optional)

### Vercel Domain Setup

1. **Vercel Dashboard → Settings → Domains**
2. Add your custom domain
3. Configure DNS with your domain provider:

   **For apex domain (acutabovetherest.com):**
   ```
   A Record: 76.76.21.21
   ```

   **For www subdomain:**
   ```
   CNAME: cname.vercel-dns.com
   ```

4. Wait for DNS propagation (can take 24-48 hours)

### Railway Domain (Strapi)

1. **Railway Dashboard → Settings → Domains**
2. Add custom subdomain (e.g., `api.acutabovetherest.com`)
3. Add DNS record:
   ```
   CNAME: <your-app>.railway.app
   ```
4. Update `NEXT_PUBLIC_STRAPI_URL` in Vercel to use custom domain

---

## 🔒 Part 5: Security & Performance

### Enable SSL (Automatic)

Both Vercel and Railway provide automatic SSL certificates.

### Set Up Rate Limiting

The booking API already has basic rate limiting. For production:

1. Consider using Vercel Edge Config
2. Or implement Redis-based rate limiting
3. Configure in `src/app/api/appointments/route.ts`

### Performance Monitoring

1. **Vercel Analytics**
   - Enable in Vercel dashboard
   - Monitor Core Web Vitals

2. **Strapi Monitoring**
   - Railway provides basic metrics
   - Consider adding Sentry for error tracking

### Backups

1. **Database Backups (Railway)**
   - Railway Pro plan includes automatic backups
   - Or set up manual pg_dump cronjob

2. **Content Backups**
   - Regularly export Strapi data
   - Store in secure location

---

## ✅ Post-Deployment Checklist

### Functionality
- [ ] All pages load without errors
- [ ] Barber profiles display correctly
- [ ] Services list is accurate
- [ ] Booking flow works end-to-end
- [ ] Appointments save to database
- [ ] Confirmation emails send
- [ ] Admin can manage content in Strapi

### Performance
- [ ] Lighthouse score > 90
- [ ] Images optimized
- [ ] No console errors
- [ ] API responses < 500ms

### SEO
- [ ] Meta tags present
- [ ] Open Graph tags set
- [ ] Sitemap generated
- [ ] robots.txt configured

### Mobile
- [ ] Responsive on all breakpoints
- [ ] Touch targets adequate size
- [ ] Forms work on mobile
- [ ] Navigation menu functions

### Accessibility
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] Alt text on images
- [ ] ARIA labels present
- [ ] Color contrast sufficient

### Security
- [ ] Environment variables secure
- [ ] No secrets in code
- [ ] CORS configured properly
- [ ] Rate limiting active
- [ ] Input validation working

---

## 🐛 Troubleshooting

### Strapi Connection Issues

**Problem:** Next.js can't connect to Strapi

**Solutions:**
1. Check `NEXT_PUBLIC_STRAPI_URL` is correct
2. Verify Strapi API token is valid
3. Check Strapi public permissions
4. Verify Railway deployment is running

### Email Not Sending

**Problem:** Confirmation emails not received

**Solutions:**
1. Check Resend API key is valid
2. Verify domain DNS records
3. Check spam folder
4. Review Resend dashboard logs
5. Ensure `NOTIFICATIONS_EMAIL_FROM` domain is verified

### Booking Slots Not Showing

**Problem:** No available time slots

**Solutions:**
1. Check barber working hours are set
2. Verify date is within allowed range (30 days)
3. Check timezone configuration
4. Ensure no schedule exceptions for that date
5. Review browser console for errors

### Build Failures

**Problem:** Vercel build fails

**Solutions:**
1. Check all environment variables are set
2. Verify no TypeScript errors locally
3. Run `npm run build` locally first
4. Check Vercel build logs for specific errors
5. Ensure all dependencies are in package.json

---

## 📊 Monitoring & Maintenance

### Daily
- Check for new appointments
- Review error logs
- Monitor uptime

### Weekly
- Review analytics
- Check email delivery rates
- Verify backups completed

### Monthly
- Update dependencies
- Review and optimize performance
- Check for security updates
- Audit content accuracy

---

## 🆘 Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://docs.railway.app
- **Strapi Docs**: https://docs.strapi.io
- **Next.js Docs**: https://nextjs.org/docs
- **Resend Docs**: https://resend.com/docs

---

## 🎉 You're Live!

Congratulations! Your barbershop website is now live and ready to accept bookings.

**Next steps:**
1. Share the URL with your team
2. Test with real bookings
3. Train staff on Strapi admin
4. Promote on social media
5. Monitor and iterate

Need help? Create an issue or contact support.
