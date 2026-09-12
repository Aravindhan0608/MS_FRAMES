import mongoose from 'mongoose';
import Gallery from '../models/Gallery.js';

/**
 * Public: Get all published gallery items (newest first)
 * GET /api/gallery
 */
export const getPublishedGallery = async (req, res) => {
  try {
    const items = await Gallery.find({ published: true }).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      data: items,
    });
  } catch (error) {
    console.error('getPublishedGallery error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch gallery items',
    });
  }
};

/**
 * Admin: Get all gallery items including published and unpublished (newest first)
 * GET /api/gallery/admin
 */
export const getAllGalleryAdmin = async (req, res) => {
  try {
    const items = await Gallery.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      data: items,
    });
  } catch (error) {
    console.error('getAllGalleryAdmin error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch gallery items',
    });
  }
};

/**
 * Admin: Create a gallery record
 * POST /api/gallery
 */
export const createGalleryItem = async (req, res) => {
  try {
    const { imageUrl, title, category, description, published } = req.body;

    const item = new Gallery({
      imageUrl,
      title,
      category,
      description,
      published: published !== undefined ? published : true,
    });

    const savedItem = await item.save();

    return res.status(201).json({
      success: true,
      message: 'Gallery item created successfully',
      data: savedItem,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }
    console.error('createGalleryItem error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to create gallery item',
    });
  }
};

/**
 * Admin: Update an existing gallery record
 * PUT /api/gallery/:id
 */
export const updateGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid gallery item ID format',
      });
    }

    const { imageUrl, title, category, description, published } = req.body;

    const updateFields = {};
    if (imageUrl !== undefined) updateFields.imageUrl = imageUrl;
    if (title !== undefined) updateFields.title = title;
    if (category !== undefined) updateFields.category = category;
    if (description !== undefined) updateFields.description = description;
    if (published !== undefined) updateFields.published = published;

    const updatedItem = await Gallery.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Gallery item updated successfully',
      data: updatedItem,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }
    console.error('updateGalleryItem error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to update gallery item',
    });
  }
};

/**
 * Admin: Delete a gallery record
 * DELETE /api/gallery/:id
 */
export const deleteGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid gallery item ID format',
      });
    }

    const deletedItem = await Gallery.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Gallery item deleted successfully',
    });
  } catch (error) {
    console.error('deleteGalleryItem error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete gallery item',
    });
  }
};
