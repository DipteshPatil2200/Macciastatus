import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User';

dotenv.config();

async function seed(): Promise<void> {
  const { MONGODB_URI, SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD, SEED_ADMIN_NAME } = process.env;
  if (!MONGODB_URI || !SEED_ADMIN_EMAIL || !SEED_ADMIN_PASSWORD) {
    throw new Error('MONGODB_URI, SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD are required');
  }
  if (SEED_ADMIN_PASSWORD.length < 12) throw new Error('SEED_ADMIN_PASSWORD must be at least 12 characters');

  await mongoose.connect(MONGODB_URI);
  const existing = await User.findOne({ email: SEED_ADMIN_EMAIL.toLowerCase() });
  if (existing) {
    console.log('Administrator already exists; no changes made.');
  } else {
    await User.create({
      email: SEED_ADMIN_EMAIL.toLowerCase(),
      password: SEED_ADMIN_PASSWORD,
      name: SEED_ADMIN_NAME || 'MACCIA Administrator',
      role: 'superadmin',
      isActive: true,
    });
    console.log('Administrator created.');
  }
  await mongoose.disconnect();
}

seed().catch(async (error) => {
  console.error(error instanceof Error ? error.message : error);
  await mongoose.disconnect();
  process.exit(1);
});
