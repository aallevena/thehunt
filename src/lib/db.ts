import { sql } from '@vercel/postgres';

export { sql };

// Helper function to run migrations
export async function runMigrations() {
  // This is a simple migration runner for development
  // In production, you'd typically run migrations via Vercel CLI or deployment pipeline
  console.log('Migrations should be run manually via Vercel CLI or SQL editor');
}
