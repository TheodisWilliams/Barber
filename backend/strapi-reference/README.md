# Strapi Backend Setup

This directory contains Strapi content type schemas for Railway deployment.

## Quick Start

1. Create new Strapi project on Railway:
```bash
npx create-strapi-app@latest strapi-backend --quickstart --no-run
cd strapi-backend
```

2. Install PostgreSQL plugin:
```bash
npm install pg
```

3. Copy the content type schemas from `/strapi/schemas/` to `src/api/` in your Strapi project

4. Configure database in `config/database.js` (see database.js in this folder)

5. Configure server in `config/server.js` (see server.js in this folder)

6. Deploy to Railway with PostgreSQL addon

## Content Types to Create

Copy these JSON schemas into Strapi admin or use the files provided.
