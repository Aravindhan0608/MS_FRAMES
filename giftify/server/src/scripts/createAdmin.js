import dotenv from 'dotenv';
import mongoose from 'mongoose';
import dns from 'dns';
import { connectDB } from '../config/db.js';
import Admin from '../models/Admin.js';

dotenv.config();

// Configure DNS servers for resolving SRV records reliably
dns.setServers(['8.8.8.8', '8.8.4.4']);

const createAdmin = async () => {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error('❌ Error: ADMIN_EMAIL and ADMIN_PASSWORD must be defined in environment variables.');
    process.exit(1);
  }

  try {
    await connectDB();

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log(`ℹ️ Admin user with email "${email}" already exists. Duplicate creation prevented.`);
      await mongoose.disconnect();
      process.exit(0);
    }

    const admin = new Admin({
      email,
      password,
    });

    await admin.save();

    console.log(`✅ Admin account created successfully for: ${email}`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error(`❌ Failed to create admin: ${error.message}`);
    try {
      await mongoose.disconnect();
    } catch (_) {}
    process.exit(1);
  }
};

createAdmin();
