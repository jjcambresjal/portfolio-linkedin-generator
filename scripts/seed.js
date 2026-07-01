const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function seedDatabase() {
  const client = await pool.connect();
  try {
    console.log('🌱 Seeding database...');

    // Create test user
    const hashedPassword = bcrypt.hashSync('password123', 10);
    const userResult = await client.query(
      'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id',
      ['testuser', 'test@example.com', hashedPassword]
    );
    const userId = userResult.rows[0].id;
    console.log('✅ Created test user');

    // Create test portfolio
    const portfolioResult = await client.query(
      `INSERT INTO portfolios (user_id, title, description, github_username, github_token, is_public)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [userId, 'My Portfolio', 'Showcase of my projects', 'testuser', 'fake_token', true]
    );
    const portfolioId = portfolioResult.rows[0].id;
    console.log('✅ Created test portfolio');

    // Create test projects
    const projectResult = await client.query(
      `INSERT INTO projects (portfolio_id, name, description, url, language, stars, forks, open_issues, topics, is_featured)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`,
      [
        portfolioId,
        'Awesome Project',
        'This is an awesome project',
        'https://github.com/testuser/awesome-project',
        'TypeScript',
        42,
        5,
        2,
        ['awesome', 'typescript'],
        true
      ]
    );
    console.log('✅ Created test projects');

    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    client.release();
  }
}

seedDatabase();
