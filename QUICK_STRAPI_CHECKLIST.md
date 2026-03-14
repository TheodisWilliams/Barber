# Quick Strapi Setup Checklist

Complete these steps in Strapi admin panel (`http://localhost:1338/admin`)

## ☑️ Step 1: Enable User Registration (2 minutes)

1. Go to: **Settings → Advanced Settings**
2. Enable these:
   - ✅ **Enable sign-ups** (toggle ON)
   - ✅ **One account per email** (keep ON)
   - ❌ **Email confirmation** (keep OFF for local dev)
3. Click **Save**

---

## ☑️ Step 2: Set Public Role Permissions (3 minutes)

1. Go to: **Settings → Roles**
2. Click **Public** role
3. Set permissions:

**Appointment:**
- ✅ create
- ❌ find, findOne, update, delete

**Barber:**
- ✅ find, findOne

**Service:**
- ✅ find, findOne

**Shop-info:**
- ✅ find

**Testimonial:**
- ✅ find

4. Click **Save**

---

## ☑️ Step 3: Set Authenticated Role Permissions (3 minutes)

1. Still in **Settings → Roles**
2. Click **Authenticated** role
3. Set permissions:

**Appointment:**
- ✅ create, find, findOne, update
- ❌ delete

**Barber:**
- ✅ find, findOne

**Service:**
- ✅ find, findOne

**Shop-info:**
- ✅ find

**Testimonial:**
- ✅ find

4. Click **Save**

---

## ☑️ Step 4: Test It Works (5 minutes)

### Test 1: Register New User
1. Go to `http://localhost:3000/register`
2. Create account
3. Should redirect to dashboard ✅

### Test 2: Book Appointment
1. Click "Book Now"
2. Complete booking
3. Should see appointment in dashboard ✅

### Test 3: Cancel Appointment
1. Click "Cancel Appointment"
2. Confirm
3. Should move to "Past Appointments" ✅

---

## ✅ Done!

You can now:
- ✅ Users can register accounts
- ✅ Users can login
- ✅ Users can view their appointments
- ✅ Users can cancel appointments
- ✅ Users cannot see other users' appointments

---

## Optional: Email Verification (Skip for now)

Only do this when deploying to production:
1. Settings → Email Plugin → Configure provider
2. Settings → Advanced Settings → Enable email confirmation
3. Test with real email

See full guide in `STRAPI_SETUP_GUIDE.md`
