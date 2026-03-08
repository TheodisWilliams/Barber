# Images Directory

This directory stores static images for the frontend application.

## Directory Structure

```
public/images/
├── backgrounds/       # Background images for hero sections, page headers
├── barbers/          # Barber profile photos (local development only)
├── logo/             # Shop logo, favicon, brand assets
└── README.md         # This file
```

## Usage

### Background Images

Store background images in `public/images/backgrounds/`:
- `hero-bg.jpg` - Homepage hero section background
- `services-bg.jpg` - Services page header
- `contact-bg.jpg` - Contact page header
- `booking-bg.jpg` - Booking page background

**Recommended specs:**
- Format: JPG or WebP
- Dimensions: 1920x1080 minimum
- File size: < 500KB (optimized)
- Quality: 80-85%

### Logo and Brand Assets

Store logos in `public/images/logo/`:
- `logo.svg` - Main logo (vector, preferred)
- `logo.png` - Fallback logo (PNG, transparent background)
- `logo-white.svg` - White version for dark backgrounds
- `favicon.ico` - Browser favicon

### Barber Photos (Development Only)

For **local development**, you can place barber photos in `public/images/barbers/`:
- `marcus-johnson.jpg`
- `deandre-williams.jpg`
- `jamal-davis.jpg`
- `terrell-brown.jpg`

**Important:** In production, barber photos should be uploaded through the **Strapi admin panel**. Strapi stores media in its own uploads directory and serves them through its API.

**Recommended specs:**
- Format: JPG or WebP
- Dimensions: 400x400 pixels (square)
- File size: < 200KB
- Professional headshot style

## How to Reference Images in Code

### From React Components

```tsx
// Background images
<div style={{ backgroundImage: 'url(/images/backgrounds/hero-bg.jpg)' }}>

// Logo
<Image src="/images/logo/logo.svg" alt="A Cut Above the Rest" />

// Using next/image (optimized)
import Image from 'next/image';

<Image
  src="/images/logo/logo.png"
  alt="Logo"
  width={200}
  height={60}
  priority
/>
```

### From CSS/Tailwind

```css
.hero {
  background-image: url('/images/backgrounds/hero-bg.jpg');
}
```

```tsx
<div className="bg-[url('/images/backgrounds/hero-bg.jpg')]">
```

## Production vs Development

### Development (Local)
- Static images stored in `public/images/`
- Served directly by Next.js at `/images/*`
- Fast, simple, no backend needed

### Production (Deployed)
- **User-uploaded content** (barber photos, service images) → **Strapi Media Library**
- **Static assets** (backgrounds, logos) → **Can stay in `public/images/`** OR move to CDN
- Strapi uploads stored separately and accessed via API

## Adding New Images

1. **Optimize images first** (use tools like TinyPNG, ImageOptim)
2. **Use descriptive names** (e.g., `hero-barbershop-interior.jpg`)
3. **Place in correct subdirectory** based on type
4. **Update this README** if adding new categories

## Image Optimization Tools

- [TinyPNG](https://tinypng.com/) - Compress JPG/PNG
- [Squoosh](https://squoosh.app/) - Convert to WebP
- [ImageOptim](https://imageoptim.com/) - Mac compression tool
- [SVGOMG](https://jakearchibald.github.io/svgomg/) - Optimize SVGs

## Current Images

### Backgrounds
- [ ] `hero-bg.jpg` - Homepage hero
- [ ] `services-bg.jpg` - Services page
- [ ] `contact-bg.jpg` - Contact page

### Logo
- [ ] `logo.svg` - Main vector logo
- [ ] `logo-white.svg` - White version
- [ ] `favicon.ico` - Browser favicon

### Barbers (Development)
- [ ] `marcus-johnson.jpg`
- [ ] `deandre-williams.jpg`
- [ ] `jamal-davis.jpg`
- [ ] `terrell-brown.jpg`

Check boxes when images are added!

## Need Help?

- Images not showing? Check the browser console for 404 errors
- Images too large? Use optimization tools above
- Need to replace? Just drop new file with same name
- Strapi media not working? Check API permissions in Strapi admin
