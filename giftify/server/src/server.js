import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dns from 'dns';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import galleryRoutes from './routes/gallery.routes.js';
import reviewRoutes from './routes/review.routes.js';

// Load environment variables
dotenv.config();

// Configure DNS servers for resolving SRV records reliably
dns.setServers(['8.8.8.8', '8.8.4.4']);

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Initialize MongoDB connection
connectDB();

// Middleware
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'MS Frames API is running',
    timestamp: new Date().toISOString(),
  });
});

// Authentication Routes
app.use('/api/auth', authRoutes);

// Gallery Routes
app.use('/api/gallery', galleryRoutes);

// Review Routes
app.use('/api/reviews', reviewRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;
