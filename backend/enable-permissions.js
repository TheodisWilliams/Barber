/**
 * Script to enable permissions for Public and Authenticated roles
 * Run this with: node enable-permissions.js
 */

const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '.tmp', 'data.db');

if (!fs.existsSync(dbPath)) {
  console.error('Database not found at:', dbPath);
  console.error('Make sure Strapi has been started at least once');
  process.exit(1);
}

const db = new Database(dbPath);

console.log('Connected to database');
console.log('');

// Get roles
const roles = db.prepare('SELECT * FROM up_roles').all();
console.log('Roles found:', roles.map(r => `${r.name} (id: ${r.id})`).join(', '));
console.log('');

const publicRole = roles.find(r => r.name === 'Public');
const authenticatedRole = roles.find(r => r.name === 'Authenticated');

if (!publicRole || !authenticatedRole) {
  console.error('Could not find Public or Authenticated role');
  process.exit(1);
}

// Content types and their permissions
const contentTypes = {
  'api::appointment.appointment': {
    public: ['create'],
    authenticated: ['create', 'find', 'findOne', 'update']
  },
  'api::barber.barber': {
    public: ['find', 'findOne'],
    authenticated: ['find', 'findOne']
  },
  'api::service.service': {
    public: ['find', 'findOne'],
    authenticated: ['find', 'findOne']
  },
  'api::shop-info.shop-info': {
    public: ['find'],
    authenticated: ['find']
  },
  'api::testimonial.testimonial': {
    public: ['find'],
    authenticated: ['find']
  }
};

console.log('Setting up permissions...');
console.log('');

// Clear existing permissions for these content types
// First get the permission IDs we want to delete
const permissionsToDelete = db.prepare(`
  SELECT id FROM up_permissions
  WHERE action LIKE 'api::appointment%'
     OR action LIKE 'api::barber%'
     OR action LIKE 'api::service%'
     OR action LIKE 'api::shop-info%'
     OR action LIKE 'api::testimonial%'
`).all();

// Delete from linking table first
for (const perm of permissionsToDelete) {
  db.prepare('DELETE FROM up_permissions_role_lnk WHERE permission_id = ?').run(perm.id);
}

// Then delete the permissions
db.prepare(`
  DELETE FROM up_permissions
  WHERE action LIKE 'api::appointment%'
     OR action LIKE 'api::barber%'
     OR action LIKE 'api::service%'
     OR action LIKE 'api::shop-info%'
     OR action LIKE 'api::testimonial%'
`).run();

let permissionCount = 0;

// Insert new permissions
for (const [contentType, perms] of Object.entries(contentTypes)) {
  // Public permissions
  for (const action of perms.public) {
    const actionName = `${contentType}.${action}`;

    // Insert permission
    const result = db.prepare(`
      INSERT INTO up_permissions (action, created_at, updated_at)
      VALUES (?, datetime('now'), datetime('now'))
    `).run(actionName);

    const permissionId = result.lastInsertRowid;

    // Link to Public role
    db.prepare(`
      INSERT INTO up_permissions_role_lnk (permission_id, role_id)
      VALUES (?, ?)
    `).run(permissionId, publicRole.id);

    console.log(`✓ Public: ${actionName}`);
    permissionCount++;
  }

  // Authenticated permissions
  for (const action of perms.authenticated) {
    const actionName = `${contentType}.${action}`;

    // Insert permission
    const result = db.prepare(`
      INSERT INTO up_permissions (action, created_at, updated_at)
      VALUES (?, datetime('now'), datetime('now'))
    `).run(actionName);

    const permissionId = result.lastInsertRowid;

    // Link to Authenticated role
    db.prepare(`
      INSERT INTO up_permissions_role_lnk (permission_id, role_id)
      VALUES (?, ?)
    `).run(permissionId, authenticatedRole.id);

    console.log(`✓ Authenticated: ${actionName}`);
    permissionCount++;
  }
}

db.close();

console.log('');
console.log(`✅ Successfully created ${permissionCount} permissions!`);
console.log('');
console.log('Next steps:');
console.log('1. Restart Strapi (stop and run: npm run develop)');
console.log('2. Go to Settings → Advanced settings');
console.log('3. Toggle ON: "Enable sign-ups"');
console.log('4. Click Save');
console.log('5. Test registration at http://localhost:3000/register');
console.log('');
