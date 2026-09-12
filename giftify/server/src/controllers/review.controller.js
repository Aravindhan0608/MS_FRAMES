import mongoose from 'mongoose';
import Review from '../models/Review.js';

/**
 * Public: Get all published reviews (newest first)
 * GET /api/reviews
 */
export const getPublishedReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ published: true }).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    console.error('getPublishedReviews error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch reviews',
    });
  }
};

/**
 * Admin: Get all reviews including published and unpublished (newest first)
 * GET /api/reviews/admin
 */
export const getAllReviewsAdmin = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    console.error('getAllReviewsAdmin error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch reviews',
    });
  }
};

/**
 * Admin: Create a review
 * POST /api/reviews
 */
export const createReview = async (req, res) => {
  try {
    const { customerName, profileImageUrl, location, rating, reviewText, published } = req.body;

    const review = new Review({
      customerName,
      profileImageUrl,
      location,
      rating,
      reviewText,
      published: published !== undefined ? published : true,
    });

    const savedReview = await review.save();

    return res.status(201).json({
      success: true,
      message: 'Review created successfully',
      data: savedReview,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }
    console.error('createReview error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to create review',
    });
  }
};

/**
 * Admin: Update an existing review
 * PUT /api/reviews/:id
 */
export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid review ID format',
      });
    }

    const { customerName, profileImageUrl, location, rating, reviewText, published } = req.body;

    const updateFields = {};
    if (customerName !== undefined) updateFields.customerName = customerName;
    if (profileImageUrl !== undefined) updateFields.profileImageUrl = profileImageUrl;
    if (location !== undefined) updateFields.location = location;
    if (rating !== undefined) updateFields.rating = rating;
    if (reviewText !== undefined) updateFields.reviewText = reviewText;
    if (published !== undefined) updateFields.published = published;

    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedReview) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Review updated successfully',
      data: updatedReview,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }
    console.error('updateReview error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to update review',
    });
  }
};

/**
 * Admin: Delete a review
 * DELETE /api/reviews/:id
 */
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid review ID format',
      });
    }

    const deletedReview = await Review.findByIdAndDelete(id);

    if (!deletedReview) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Review deleted successfully',
    });
  } catch (error) {
    console.error('deleteReview error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete review',
    });
  }
};
