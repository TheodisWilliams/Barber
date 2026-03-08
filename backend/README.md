# Backend - A Cut Above the Rest

Strapi CMS backend for managing barbershop content and appointments.

## 📁 Structure

```
backend/
├── src/                # Strapi API routes and content types
├── config/             # Configuration files
├── database/           # SQLite database (local dev)
├── public/             # Public assets
├── node_modules/       # Dependencies
├── strapi-reference/   # Content type schemas and seed data
│   ├── config/         # Config templates for production
│   ├── schemas/        # Content type JSON schemas
│   └── seed-data/      # Initial data (barbers, services, etc.)
├── package.json
└── README.md           # This file
```

## 🚀 Quick Start

### Start Strapi

```bash
cd backend
npm run develop
```

This will:
- Start Strapi on http://localhost:1337
- Open admin panel at http://localhost:1337/admin
- Use SQLite database for local development

### First Time Setup

On first launch, you'll be prompted to create an admin account:
- Email: your@email.com
- Password: (choose a strong password)

## 📊 Content Types to Create

You have two options:

### Option A: Use Content-Type Builder (Recommended)

1. Go to **Content-Type Builder** in admin panel
2. Create a new Collection Type for each schema
3. Copy field definitions from `strapi-reference/schemas/`:
   - **barber** (Collection Type)
   - **service** (Collection Type)
   - **appointment** (Collection Type)
   - **shop-info** (Single Type)
   - **testimonial** (Collection Type)
   - **schedule-exception** (Collection Type)

### Option B: Manual File Copy

```bash
# Copy schemas to Strapi API folder
cp -r strapi-reference/schemas/* src/api/
```

Then restart Strapi.

## 🔧 Configuration

### API Permissions

Go to **Settings → Roles → Public** and enable:

| Content Type | Permissions |
|--------------|-------------|
| Barber | find, findOne |
| Service | find, findOne |
| Shop-info | find |
| Testimonial | find |
| Appointment | find, create |

### Generate API Token

1. Go to **Settings → API Tokens**
2. Click **Create new API Token**
3. Name: "Next.js Frontend"
4. Token type: **Full access**
5. Copy the token
6. Add to `frontend/.env.local`:
   ```env
   STRAPI_API_TOKEN=your_token_here
   ```

## 📝 Add Seed Data

Use the JSON files in `strapi-reference/seed-data/`:

Go to **Content Manager** → Select content type → **Create new entry**

Import data from:
- `barbers.json` - 4 barbers with schedules
- `services.json` - 8 services with pricing
- `testimonials.json` - 6 customer reviews
- `shop-info.json` - Shop details

## 🚀 Available Commands

| Command | Description |
|---------|-------------|
| `npm run develop` | Start Strapi in development mode with auto-reload |
| `npm run start` | Start Strapi in production mode |
| `npm run build` | Build Strapi admin panel |
| `npm run strapi` | Run Strapi CLI commands |

## 🌐 API Endpoints

Once running, your API is available at: `http://localhost:1337/api/`

### Public Endpoints

- `GET /api/barbers` - List barbers
- `GET /api/barbers/:id` - Get barber by ID
- `GET /api/services` - List services
- `GET /api/shop-info` - Get shop information
- `GET /api/testimonials` - List testimonials
- `POST /api/appointments` - Create appointment
- `GET /api/appointments` - List appointments (filtered)

### Query Parameters

```
/api/barbers?populate=photo,services
/api/barbers?filters[isActive][$eq]=true
/api/barbers?sort=order:asc
```

## 📦 Production Setup (PostgreSQL)

For production with PostgreSQL, create `config/database.js`:

```javascript
module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', '127.0.0.1'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'strapi'),
      user: env('DATABASE_USERNAME', 'strapi'),
      password: env('DATABASE_PASSWORD', 'strapi'),
      ssl: env.bool('DATABASE_SSL', false) && {
        rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false),
      },
    },
  },
});
```

Environment variables:
```env
DATABASE_HOST=your_host
DATABASE_PORT=5432
DATABASE_NAME=your_db
DATABASE_USERNAME=your_user
DATABASE_PASSWORD=your_password
DATABASE_SSL=true
```

## 🐛 Troubleshooting

### Admin panel won't load

```bash
npm run build
npm run develop
```

### Port already in use (1337)

```bash
# Windows
netstat -ano | findstr :1337
taskkill /PID <pid> /F

# Or change port in .env
PORT=1338
```

### Database connection error

1. Check database is running
2. Verify credentials
3. Ensure database exists

## 📚 Resources

- [Strapi Documentation](https://docs.strapi.io/)
- [REST API](https://docs.strapi.io/dev-docs/api/rest)
- [Content-Type Builder](https://docs.strapi.io/user-docs/content-type-builder)

---

**Note:** This backend works with the Next.js frontend in `/frontend`. Ensure both are running for full functionality.
