import { Router } from 'express';
import {
  getPublishedGallery,
  getAllGalleryAdmin,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from '../controllers/gallery.controller.js';
import verifyToken from '../middleware/auth.middleware.js';

const router = Router();

// Public route: Get published gallery records
router.get('/', getPublishedGallery);

// Admin routes: Require JWT verification
router.get('/admin', verifyToken, getAllGalleryAdmin);
router.post('/', verifyToken, createGalleryItem);
router.put('/:id', verifyToken, updateGalleryItem);
router.delete('/:id', verifyToken, deleteGalleryItem);

export default router;
