# Quick Start Guide

## 🚨 Important Path Information

The project structure is:
```
Barber/
├── frontend/          # Next.js app
└── backend/           # ← Strapi is HERE (directly in /backend)
```

## ✅ Correct Commands

### Start Backend (Strapi)

**✅ CORRECT:**
```bash
cd backend
npm run develop
```

Or from project root:
```bash
cd "C:\Users\theod\Documents\Projects\New folder\Barber\backend"
npm run develop
```

### Start Frontend (Next.js)

**✅ CORRECT:**
```bash
cd frontend
npm run dev
```

Or from project root:
```bash
cd "C:\Users\theod\Documents\Projects\New folder\Barber\frontend"
npm run dev
```

## 🎯 Step-by-Step Startup

### 1. Open TWO Terminal Windows

#### Terminal 1 (Backend):
```bash
# Navigate to backend
cd "C:\Users\theod\Documents\Projects\New folder\Barber\backend"

# Start Strapi
npm run develop
```

**Wait for:**
```
┌──────────────────────────────────────────────────┐
│ Strapi is running at http://localhost:1337/admin │
└──────────────────────────────────────────────────┘
```

#### Terminal 2 (Frontend):
```bash
# Navigate to frontend
cd "C:\Users\theod\Documents\Projects\New folder\Barber\frontend"

# Start Next.js
npm run dev
```

**Wait for:**
```
✓ Ready in 2.5s
○ Local: http://localhost:3000
```

### 2. First Time Setup (Strapi)

1. Visit http://localhost:1337/admin
2. Create admin account:
   - Email: your@email.com
   - Password: (choose strong password)
   - Name: Your Name

3. You're now in Strapi admin panel!

### 3. Configure Frontend

Edit `frontend/.env.local`:
```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=placeholder_token
```

(You'll get real token after setting up Strapi content types)

## 🎨 What to Do Next

### In Strapi Admin (http://localhost:1337/admin):

1. **Add Content Types**
   - Go to Content-Type Builder
   - Create 6 content types (see [backend/README.md](backend/README.md))
   - Use schemas from `backend/strapi-reference/schemas/`

2. **Set Permissions**
   - Settings → Roles → Public
   - Enable permissions (see [INSTALLATION.md](INSTALLATION.md))

3. **Generate API Token**
   - Settings → API Tokens → Create
   - Copy token to `frontend/.env.local`

4. **Add Sample Data**
   - Content Manager → Create entries
   - Use data from `backend/strapi-reference/seed-data/`

### In Browser (http://localhost:3000):

1. Test the website loads
2. Navigate through pages
3. Try the booking flow (after adding Strapi data)

## 🐛 Common Issues

### "ENOENT: no such file or directory, open 'package.json'"

**Cause:** You're in wrong directory

**Solution:**
```bash
# Make sure you're in the RIGHT place
cd backend/strapi-backend    # For Strapi
# OR
cd frontend                  # For Next.js
```

### Port Already in Use

**Strapi (1337):**
```bash
# Kill process on port 1337
netstat -ano | findstr :1337
taskkill /PID <pid_number> /F
```

**Next.js (3000):**
```bash
# Use different port
cd frontend
set PORT=3001 && npm run dev
```

### "Cannot connect to Strapi"

1. Check Strapi is running (Terminal 1)
2. Visit http://localhost:1337/admin
3. Verify `NEXT_PUBLIC_STRAPI_URL` in `frontend/.env.local`

## 📁 Quick Directory Reference

| What | Where | Command |
|------|-------|---------|
| Strapi Backend | `backend/` | `cd backend` |
| Next.js Frontend | `frontend/` | `cd frontend` |
| Strapi Schemas | `backend/strapi-reference/schemas/` | (reference only) |
| Seed Data | `backend/strapi-reference/seed-data/` | (import to Strapi) |
| Frontend Code | `frontend/src/` | (edit here) |

## 🎯 Current Status

✅ **Frontend installed** - Ready to run
✅ **Backend installed** - Ready to run
⏳ **Strapi configured** - Need to add content types
⏳ **Sample data** - Need to import seed data
⏳ **API token** - Need to generate and add to frontend

## 📚 Full Documentation

- **[INSTALLATION.md](INSTALLATION.md)** - Complete setup guide
- **[backend/README.md](backend/README.md)** - Strapi details
- **[frontend/README.md](frontend/README.md)** - Next.js details

## 💡 Pro Tips

1. **Always start backend first**, then frontend
2. **Keep both terminals open** while developing
3. **Restart Strapi** after adding content types
4. **Restart Next.js** if .env.local changes
5. **Use Ctrl+C** to stop servers

## ✨ When Everything Works

You should see:
- ✅ Strapi admin at http://localhost:1337/admin
- ✅ Website at http://localhost:3000
- ✅ Services page shows data from Strapi
- ✅ Barbers page shows barbers from Strapi
- ✅ Booking flow works end-to-end

---

**Need help?** Check [INSTALLATION.md](INSTALLATION.md) for detailed troubleshooting!
