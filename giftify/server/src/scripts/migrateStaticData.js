import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import Gallery from '../models/Gallery.js';
import Review from '../models/Review.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths to static data files in src/data/
const galleryFilePath = path.resolve(__dirname, '../../../src/data/gallery.js');
const testimonialsFilePath = path.resolve(__dirname, '../../../src/data/testimonials.js');

/**
 * Parses galleryWorks from src/data/gallery.js by transforming module imports
 * into local asset paths and executing within an isolated vm context.
 */
function loadStaticGallery() {
  if (!fs.existsSync(galleryFilePath)) {
    throw new Error(`Static gallery data file not found at: ${galleryFilePath}`);
  }

  const rawContent = fs.readFileSync(galleryFilePath, 'utf8');

  // Convert static asset imports into local web paths
  const transformed =
    rawContent
      .replace(/import\s+(\w+)\s+from\s+['"]\.\.\/assets\/([^'"]+)['"];?/g, "const $1 = '/src/assets/$2';")
      .replace(/export\s+const\s+(\w+)\s*=/g, 'const $1 =') +
    '\n; __result = galleryWorks;';

  const context = { __result: [] };
  vm.createContext(context);
  vm.runInContext(transformed, context);

  return context.__result || [];
}

/**
 * Parses allReviews from src/data/testimonials.js by transforming module imports
 * into local asset paths and executing within an isolated vm context.
 */
function loadStaticReviews() {
  if (!fs.existsSync(testimonialsFilePath)) {
    throw new Error(`Static testimonials data file not found at: ${testimonialsFilePath}`);
  }

  const rawContent = fs.readFileSync(testimonialsFilePath, 'utf8');

  // Convert avatar asset imports into local web paths
  const transformed =
    rawContent
      .replace(/import\s+(\w+)\s+from\s+['"]\.\.\/assets\/reviews\/([^'"]+)['"];?/g, "const $1 = '/src/assets/reviews/$2';")
      .replace(/import\s+(\w+)\s+from\s+['"]\.\.\/assets\/([^'"]+)['"];?/g, "const $1 = '/src/assets/$2';")
      .replace(/export\s+const\s+(\w+)\s*=/g, 'const $1 =') +
    '\n; __result = allReviews;';

  const context = { __result: [] };
  vm.createContext(context);
  vm.runInContext(transformed, context);

  return context.__result || [];
}

/**
 * Main migration function
 */
async function migrateStaticData() {
  console.log('====================================================');
  console.log('🚀 MS FRAMES — STATIC DATA TO MONGODB MIGRATION');
  console.log('====================================================\n');

  let connection;
  try {
    connection = await connectDB();
    if (!connection) {
      console.error('❌ Failed to establish MongoDB connection. Migration aborted.');
      process.exit(1);
    }

    // 1. Migrate Gallery
    console.log('\n--- Migrating Gallery Portfolio Records ---');
    const staticGalleryWorks = loadStaticGallery();
    console.log(`🔍 Detected ${staticGalleryWorks.length} static gallery items.`);

    let galleryInserted = 0;
    let gallerySkipped = 0;
    const galleryManualImages = [];

    for (const item of staticGalleryWorks) {
      const imageUrl = item.image || item.imageUrl || '';
      const title = item.title?.trim() || '';
      const category = item.category?.trim() || '';
      const description = item.description?.trim() || item.alt?.trim() || '';

      // Check for duplicate by title and category
      const existingRecord = await Gallery.findOne({
        title,
        category,
      });

      if (existingRecord) {
        console.log(`⏩ [Skipped Duplicate]: "${title}" (${category})`);
        gallerySkipped++;
      } else {
        const newRecord = new Gallery({
          imageUrl,
          title,
          category,
          description,
          published: true,
        });

        await newRecord.save();
        console.log(`✅ [Inserted]: "${title}" (${category})`);
        galleryInserted++;

        if (imageUrl.startsWith('/src/assets/')) {
          galleryManualImages.push({ title, imageUrl });
        }
      }
    }

    // 2. Migrate Reviews
    console.log('\n--- Migrating Customer Review Records ---');
    const staticReviews = loadStaticReviews();
    console.log(`🔍 Detected ${staticReviews.length} static customer reviews.`);

    let reviewsInserted = 0;
    let reviewsSkipped = 0;
    const reviewManualImages = [];

    for (const item of staticReviews) {
      const customerName = item.name?.trim() || item.customerName?.trim() || '';
      const profileImageUrl = item.photo || item.profileImageUrl || '';
      const location = item.location?.trim() || '';
      const rating = Number(item.rating) || 5;
      const reviewText = item.review?.trim() || item.reviewText?.trim() || '';

      // Check for duplicate by customerName and reviewText
      const existingRecord = await Review.findOne({
        customerName,
        reviewText,
      });

      if (existingRecord) {
        console.log(`⏩ [Skipped Duplicate]: Review from "${customerName}"`);
        reviewsSkipped++;
      } else {
        const newRecord = new Review({
          customerName,
          profileImageUrl,
          location,
          rating,
          reviewText,
          published: true,
        });

        await newRecord.save();
        console.log(`✅ [Inserted]: Review from "${customerName}" (${rating}★)`);
        reviewsInserted++;

        if (profileImageUrl.startsWith('/src/assets/')) {
          reviewManualImages.push({ customerName, profileImageUrl });
        }
      }
    }

    // 3. Summary Report
    console.log('\n====================================================');
    console.log('📊 MIGRATION SUMMARY REPORT');
    console.log('====================================================');
    console.log(`Gallery records detected:           ${staticGalleryWorks.length}`);
    console.log(`Gallery records inserted:           ${galleryInserted}`);
    console.log(`Gallery records skipped duplicates: ${gallerySkipped}`);
    console.log('----------------------------------------------------');
    console.log(`Review records detected:            ${staticReviews.length}`);
    console.log(`Review records inserted:            ${reviewsInserted}`);
    console.log(`Review records skipped duplicates:  ${reviewsSkipped}`);
    console.log('====================================================\n');

    if (galleryManualImages.length > 0 || reviewManualImages.length > 0) {
      console.log('📌 NOTE: The migrated records use valid local asset paths served by the app.');
      console.log('Per the Manual Cloudinary Workflow (Method 1), you can manually upload each');
      console.log('to your Cloudinary Dashboard and update their URL in the Admin Panel whenever desired.');
    }

    await mongoose.disconnect();
    console.log('🔒 Database connection closed cleanly.');
    process.exit(0);
  } catch (error) {
    console.error(`\n❌ Migration failed with error: ${error.message}`);
    try {
      await mongoose.disconnect();
    } catch (_) {}
    process.exit(1);
  }
}

migrateStaticData();
