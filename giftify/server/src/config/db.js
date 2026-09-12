import mongoose from 'mongoose';

/**
 * Reusable MongoDB connection function using Mongoose.
 * Reads connection URI strictly from process.env.MONGODB_URI.
 */
export const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    console.warn('⚠️ [MongoDB Warning]: MONGODB_URI is not set in environment variables. Database connection skipped.');
    return null;
  }

  try {
    const conn = await mongoose.connect(mongoUri);
    console.log(`✅ [MongoDB Connected]: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ [MongoDB Connection Error]: ${error.message}`);
    return null;
  }
};
