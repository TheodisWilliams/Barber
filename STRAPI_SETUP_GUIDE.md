# Strapi Setup Guide for User Authentication

This guide walks you through configuring Strapi to enable user registration, set API permissions, and optionally enable email verification.

## Prerequisites

- Strapi backend running on `http://localhost:1338`
- Strapi admin account created (you created this on first run)

---

## Step 1: Enable User Registration in Strapi Admin

### 1.1 Access Strapi Admin Panel

1. Open your browser and go to: **http://localhost:1338/admin**
2. Login with your admin credentials

### 1.2 Enable User Registration

1. In the left sidebar, click **Settings** (gear icon at bottom)
2. Under "USERS & PERMISSIONS PLUGIN", click **Advanced Settings**
3. You'll see several options:

   **Enable sign-ups:**
   - ✅ Toggle this ON (blue)
   - This allows users to register via `/api/auth/local/register`

   **Default role for authenticated users:**
   - Should be set to `Authenticated` (default)
   - This is the role new users get when they register

   **Enable email confirmation:**
   - ⚠️ Leave this OFF for local development
   - 💡 Enable this in production if you want email verification
   - When enabled, users must click a link in their email to activate their account

   **One account per email address:**
   - ✅ Keep this ON (prevents duplicate email registrations)

4. Click **Save** button at the top right

**✅ Result:** Users can now register accounts via your frontend registration page!

---

## Step 2: Set API Permissions for Appointments

This ensures users can only see and manage their own appointments.

### 2.1 Configure Public Role (Guest Users)

1. In Settings, click **Roles** (under USERS & PERMISSIONS PLUGIN)
2. Click on **Public** role
3. Scroll down to find content type permissions

**Set these permissions for PUBLIC users:**

| Content Type | Permissions to Enable |
|--------------|----------------------|
| **Appointment** | ✅ `create` only |
| **Barber** | ✅ `find`, ✅ `findOne` |
| **Service** | ✅ `find`, ✅ `findOne` |
| **Shop-info** | ✅ `find` |
| **Testimonial** | ✅ `find` |
| **Schedule-exception** | ❌ None |

**For Appointment specifically:**
- ✅ `create` - Allows guests to book appointments
- ❌ `find` - Prevents guests from seeing all appointments
- ❌ `findOne` - Prevents guests from viewing appointment details
- ❌ `update` - Prevents guests from modifying appointments
- ❌ `delete` - Prevents guests from deleting appointments

4. Click **Save** at the top right

### 2.2 Configure Authenticated Role (Logged-in Users)

1. Still in Settings → Roles, click on **Authenticated** role
2. Scroll down to content type permissions

**Set these permissions for AUTHENTICATED users:**

| Content Type | Permissions to Enable |
|--------------|----------------------|
| **Appointment** | ✅ `create`, ✅ `find`, ✅ `findOne`, ✅ `update` |
| **Barber** | ✅ `find`, ✅ `findOne` |
| **Service** | ✅ `find`, ✅ `findOne` |
| **Shop-info** | ✅ `find` |
| **Testimonial** | ✅ `find` |
| **Schedule-exception** | ❌ None |

**For Appointment specifically:**
- ✅ `create` - Can book new appointments
- ✅ `find` - Can view appointments (filtered by email in API)
- ✅ `findOne` - Can view specific appointment details
- ✅ `update` - Can update/cancel appointments
- ❌ `delete` - We use update to change status, not delete

3. Click **Save** at the top right

**⚠️ Important Note:**
The permissions allow authenticated users to call these endpoints, but our API routes (`/api/appointments/user` and `/api/appointments/[id]`) include additional filtering to ensure users only see/modify their own appointments based on their email address.

---

## Step 3: Add Email Verification (Optional)

### Option A: Skip Email Verification (Recommended for Development)

**Current setup:** Email verification is DISABLED

**Benefits:**
- ✅ Faster testing during development
- ✅ No email service setup required
- ✅ Users are immediately active after registration

**How it works:**
- Users register → immediately logged in → can use dashboard
- No email confirmation needed

**Keep this for local development!**

---

### Option B: Enable Email Verification (Production Only)

**⚠️ Only enable this when you're ready to deploy to production**

#### 3.1 Choose an Email Provider

Strapi supports these email providers:
- **Sendgrid** (recommended, has free tier)
- **Mailgun** (has free tier)
- **Amazon SES** (requires AWS account)
- **Nodemailer** (for custom SMTP)

#### 3.2 Install Email Plugin (if not already installed)

Most email providers require a plugin. For Sendgrid:

```bash
cd backend
npm install @strapi/provider-email-sendgrid
```

#### 3.3 Configure Email Provider

1. In Strapi admin, go to **Settings → Email Plugin**
2. Click on the provider dropdown
3. Select your provider (e.g., "Sendgrid")
4. Enter your API credentials:
   - **API Key:** Your Sendgrid API key
   - **Default From Email:** bookings@yourdomain.com
   - **Default From Name:** A Cut Above the Rest

5. Click **Save**

#### 3.4 Enable Email Confirmation

1. Go to **Settings → Advanced Settings** (under USERS & PERMISSIONS)
2. Toggle ON: **Enable email confirmation**
3. Configure these settings:

   **Redirection URL:**
   - `http://localhost:3000/email-confirmed` (local)
   - `https://yourdomain.com/email-confirmed` (production)

4. Click **Save**

#### 3.5 Customize Email Templates

1. Go to **Settings → Email templates**
2. You'll see templates for:
   - Email address confirmation
   - Reset password

3. Click on "Email address confirmation"
4. Customize the email:
   - Subject: "Confirm your email - A Cut Above the Rest"
   - Body: Edit the HTML template to match your branding

5. Click **Save**

#### 3.6 Test Email Verification

1. Register a new user on your frontend
2. User should see: "Check your email to confirm your account"
3. Check the email inbox
4. Click the confirmation link
5. User should be redirected and can now login

---

## Verification Checklist

After completing all steps, verify everything works:

### ✅ User Registration Test
- [ ] Go to `http://localhost:3000/register`
- [ ] Fill in username, email, password
- [ ] Click "Create Account"
- [ ] Redirected to `/dashboard`
- [ ] See "Welcome, [username]!" message

### ✅ Login Test
- [ ] Logout from dashboard
- [ ] Go to `http://localhost:3000/login`
- [ ] Enter email and password
- [ ] Click "Sign In"
- [ ] Redirected to `/dashboard`

### ✅ Appointment Booking Test (Logged In)
- [ ] Click "Book Now" from dashboard
- [ ] Complete booking flow
- [ ] Return to dashboard
- [ ] See appointment in "Upcoming Appointments"

### ✅ Appointment Visibility Test (User Isolation)
- [ ] Create two user accounts (User A and User B)
- [ ] Login as User A, book appointment
- [ ] Logout, login as User B
- [ ] User B should NOT see User A's appointments
- [ ] User B can only see their own appointments

### ✅ Cancel Appointment Test
- [ ] From dashboard, click "Cancel Appointment"
- [ ] Confirm cancellation
- [ ] Appointment moves to "Past Appointments"
- [ ] Status shows "cancelled"

### ✅ Guest Booking Test
- [ ] Logout completely
- [ ] Go to `/book`
- [ ] Complete booking as guest
- [ ] Appointment created but not visible in any user dashboard
- [ ] Only visible to shop owner in Strapi admin

---

## Troubleshooting

### Issue: "Registration failed - Email is already taken"
**Solution:** Email already exists in database. Use a different email or delete the user in Strapi admin (Content Manager → User).

### Issue: "Cannot create appointment - Unauthorized"
**Solution:** Check API permissions in Settings → Roles → Public → Appointment → `create` should be enabled.

### Issue: "Cannot view appointments in dashboard"
**Solution:** Check API permissions in Settings → Roles → Authenticated → Appointment → `find` should be enabled.

### Issue: "Can see other users' appointments"
**Solution:** This shouldn't happen if using our API routes. Check that you're using `/api/appointments/user` route (filters by user email) and not calling Strapi directly.

### Issue: Email confirmation not working
**Solution:**
- Check email provider credentials in Settings → Email Plugin
- Check spam folder for confirmation email
- Verify "Redirection URL" is set correctly
- For local dev, disable email confirmation

---

## Security Notes

### How User Isolation Works

**API Route Protection:**
```typescript
// In /api/appointments/user/route.ts
const authData = await getServerUser(); // Gets logged-in user
const response = await fetch(
  `${STRAPI_URL}/api/appointments?filters[clientEmail][$eq]=${authData.user.email}`
  // ☝️ Only fetches appointments matching user's email
);
```

**Cancel Protection:**
```typescript
// In /api/appointments/[id]/route.ts
// First, verify appointment belongs to user
if (appointment.data.attributes.clientEmail !== authData.user.email) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
}
```

### Production Security Checklist

Before deploying to production:

- [ ] Change all default passwords
- [ ] Enable HTTPS on both frontend and backend
- [ ] Set strong JWT secret in Strapi
- [ ] Enable rate limiting for registration endpoint
- [ ] Configure CORS to only allow your frontend domain
- [ ] Enable email confirmation
- [ ] Set up proper logging and monitoring
- [ ] Regular database backups

---

## Next Steps

After completing this setup:

1. ✅ Test all functionality locally
2. 📝 Review password reset guide (if needed)
3. 🚀 Deploy backend to Railway (see RAILWAY_BACKEND_SETUP.md)
4. 🚀 Deploy frontend to Vercel
5. 🔒 Enable email verification in production
6. 📧 Configure production email service

---

## Quick Reference: Strapi Admin URLs

- **Admin Panel:** http://localhost:1338/admin
- **Advanced Settings:** Settings → Advanced Settings
- **Roles & Permissions:** Settings → Roles
- **Email Plugin:** Settings → Email Plugin
- **Email Templates:** Settings → Email Templates
- **Users List:** Content Manager → User (collection type)
- **Appointments List:** Content Manager → Appointment

---

**Need help?** Check the main project documentation or Strapi docs at https://docs.strapi.io
