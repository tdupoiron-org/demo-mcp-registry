const fs = require('fs');
const path = require('path');
const { pool, query } = require('../db');

async function seed() {
  try {
    console.log('Starting database seeding...');

    // Read the v0/servers JSON file
    const serversPath = path.join(__dirname, '../../v0/servers');
    
    if (!fs.existsSync(serversPath)) {
      console.error(`✗ Servers file not found at: ${serversPath}`);
      process.exit(1);
    }

    const serversData = JSON.parse(fs.readFileSync(serversPath, 'utf8'));
    
    if (!serversData.servers || !Array.isArray(serversData.servers)) {
      console.error('✗ Invalid servers data format');
      process.exit(1);
    }

    console.log(`Found ${serversData.servers.length} servers to seed`);

    // Clear existing data (optional - comment out if you want to preserve data)
    await query('TRUNCATE TABLE servers RESTART IDENTITY CASCADE');
    console.log('✓ Cleared existing data');

    // Insert servers
    let successCount = 0;
    let errorCount = 0;

    for (const server of serversData.servers) {
      try {
        await query(
          `INSERT INTO servers (name, description, status, repository, version, schema_url, remotes, packages, meta)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
          [
            server.name,
            server.description || null,
            server.status || 'active',
            server.repository ? JSON.stringify(server.repository) : null,
            server.version || null,
            server['$schema'] || server.schema_url || null,
            server.remotes ? JSON.stringify(server.remotes) : null,
            server.packages ? JSON.stringify(server.packages) : null,
            server._meta ? JSON.stringify(server._meta) : null,
          ]
        );
        successCount++;
        console.log(`✓ Inserted: ${server.name}`);
      } catch (error) {
        errorCount++;
        console.error(`✗ Failed to insert ${server.name}:`, error.message);
      }
    }

    console.log(`\n📊 Seeding Summary:`);
    console.log(`   Success: ${successCount}`);
    console.log(`   Errors: ${errorCount}`);
    console.log(`   Total: ${serversData.servers.length}`);

    // Verify the count
    const countResult = await query('SELECT COUNT(*) FROM servers');
    console.log(`\n✓ Database now contains ${countResult.rows[0].count} servers`);

    process.exit(0);
  } catch (error) {
    console.error('✗ Seeding failed:', error);
    process.exit(1);
  }
}

seed();
