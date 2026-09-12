import { Router } from 'express';
import {
  getPublishedReviews,
  getAllReviewsAdmin,
  createReview,
  updateReview,
  deleteReview,
} from '../controllers/review.controller.js';
import verifyToken from '../middleware/auth.middleware.js';

const router = Router();

// Public route: Get published review records
router.get('/', getPublishedReviews);

// Admin routes: Require JWT verification
router.get('/admin', verifyToken, getAllReviewsAdmin);
router.post('/', verifyToken, createReview);
router.put('/:id', verifyToken, updateReview);
router.delete('/:id', verifyToken, deleteReview);

export default router;
