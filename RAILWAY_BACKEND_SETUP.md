# Railway Backend Deployment Guide

This guide walks you through deploying the Strapi backend to Railway.

## Prerequisites

- Railway account ([railway.app](https://railway.app))
- GitHub repository with your code pushed

## Step 1: Create New Railway Project

1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your repository: `TheodisWilliams/Barber`

## Step 2: Add PostgreSQL Database

1. In your Railway project, click **"+ New"**
2. Select **"Database"** → **"Add PostgreSQL"**
3. Railway will automatically create a PostgreSQL database
4. The database will auto-connect with your service

## Step 3: Configure Backend Service

1. Click on your GitHub service (the one connected to your repo)
2. Go to **Settings** tab
3. Set **Root Directory** to: `backend`
4. Set **Build Command** to: `npm ci && npm run build`
5. Set **Start Command** to: `npm run start`

## Step 4: Add Environment Variables

Go to the **Variables** tab and add these environment variables:

### Required Variables

```bash
# Server
HOST=0.0.0.0
PORT=443
NODE_ENV=production

# Database (Railway auto-references)
DATABASE_CLIENT=postgres
DATABASE_HOST=${{Postgres.PGHOST}}
DATABASE_PORT=${{Postgres.PGPORT}}
DATABASE_NAME=${{Postgres.PGDATABASE}}
DATABASE_USERNAME=${{Postgres.PGUSER}}
DATABASE_PASSWORD=${{Postgres.PGPASSWORD}}
DATABASE_SSL=false

# Security Keys (COPY FROM BELOW - GENERATED FOR YOU)
APP_KEYS=ztIXdE9mkNpsQPOm1Eg8eV3nRm9vwU2naM5FrYDeGIA=
API_TOKEN_SALT=TlukhFfhH1Lm8joKHqy3XhCIodZiRXTwnEKrzJgZWTQ=
ADMIN_JWT_SECRET=GvvTEGcnB1DhXzyraC07IFIrMatrfPV56i2opnGwrd4=
TRANSFER_TOKEN_SALT=blUTLW2dwzrv/eSrJvZI0sAEB1zpTpPo7BeclSPEwdY=
JWT_SECRET=mgACizyl6AAnRKe2xKuuAPGPy6X+232qCSzRomkXHkc=
```

### How to Add Variables in Railway:

**Option 1: RAW Editor (Easiest)**
1. Click **"RAW Editor"** button in Variables tab
2. Paste all the variables above
3. Click **"Update Variables"**

**Option 2: One by One**
1. Click **"+ New Variable"**
2. Enter variable name and value
3. Repeat for each variable

## Step 5: Deploy

1. After adding all variables, Railway will automatically redeploy
2. Watch the deployment logs in the **Deployments** tab
3. Wait for "Build successful" message

## Step 6: Get Your Backend URL

1. Go to **Settings** tab
2. Scroll to **Networking** section
3. Click **"Generate Domain"**
4. Copy the generated URL (e.g., `https://your-app.up.railway.app`)
5. **Save this URL** - you'll need it for the frontend

## Step 7: Access Strapi Admin

1. Open your backend URL in a browser: `https://your-app.up.railway.app/admin`
2. Create your admin account (first-time setup)
3. Log in to the Strapi admin panel

## Step 8: Configure Strapi for Production

### A. Set API Permissions

1. Go to **Settings → Roles → Public**
2. Enable these permissions:

| Content Type | Permissions |
|--------------|-------------|
| Barber | find, findOne |
| Service | find, findOne |
| Shop-info | find |
| Testimonial | find |
| Appointment | create |

3. Click **Save**

### B. Generate API Token

1. Go to **Settings → API Tokens → Create new API Token**
2. Name: `Frontend Production`
3. Token type: **Full access**
4. Click **Save**
5. **COPY THE TOKEN** (you can only see it once!)

### C. Add Content

Import your seed data:
- 4 Barbers from `backend/strapi-reference/seed-data/barbers.json`
- 8 Services from `backend/strapi-reference/seed-data/services.json`
- 6 Testimonials from `backend/strapi-reference/seed-data/testimonials.json`
- Shop Info from `backend/strapi-reference/seed-data/shop-info.json`

## Step 9: Update Frontend Environment Variables

Now update your **frontend** service in Railway (or Vercel):

1. Go to your frontend service settings
2. Update environment variables:

```bash
NEXT_PUBLIC_STRAPI_URL=https://your-backend-url.up.railway.app
STRAPI_API_TOKEN=your_api_token_from_step_8b
```

3. Redeploy your frontend

## Verification Checklist

- [ ] Backend deployed successfully on Railway
- [ ] PostgreSQL database connected
- [ ] Strapi admin accessible at `/admin`
- [ ] Admin account created
- [ ] API permissions configured
- [ ] API token generated
- [ ] Seed data imported (barbers, services, testimonials, shop info)
- [ ] Frontend environment variables updated
- [ ] Frontend can fetch data from backend

## Troubleshooting

### Build Fails

**Error: `Cannot find module`**
- Ensure Root Directory is set to `backend`
- Check that `package.json` exists in backend folder

**Error: Database connection failed**
- Verify PostgreSQL service is running
- Check DATABASE_* variables are using Railway references
- Ensure both services are in the same project

### Deployment Succeeds but Admin Won't Load

**503 Error**
- Check deployment logs for errors
- Verify PORT is set to 443
- Ensure NODE_ENV=production

**Database Migration Errors**
- Check PostgreSQL logs
- Verify DATABASE_SSL=false
- Restart the backend service

### API Requests Failing

**CORS Errors**
- Ensure frontend URL is in allowed origins
- Check `config/middlewares.js` in backend

**401 Unauthorized**
- Verify API permissions are set correctly
- Check API token is valid and not expired
- Ensure STRAPI_API_TOKEN matches in frontend

## Next Steps

Once backend is deployed:

1. Deploy frontend to Vercel (see [DEPLOYMENT.md](DEPLOYMENT.md))
2. Update frontend environment variables with production backend URL
3. Test the entire booking flow end-to-end
4. Set up email service (Resend) for booking confirmations

## Cost Estimate

**Railway Pricing:**
- Hobby Plan: $5/month (includes $5 usage credit)
- PostgreSQL: Uses credit (typically $2-3/month for small apps)
- Backend service: Uses credit (minimal for low traffic)

**Free Trial:**
- Railway offers $5 free credit to start
- Perfect for testing before committing

---

**Backend Deployment Complete!** 🚀

Next: Deploy frontend → [DEPLOYMENT.md](DEPLOYMENT.md)
