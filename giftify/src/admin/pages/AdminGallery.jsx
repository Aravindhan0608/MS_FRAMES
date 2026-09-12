import { useState, useEffect } from 'react';
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiEyeOff,
  FiRefreshCw,
  FiSearch,
  FiX,
  FiCheck,
  FiAlertCircle,
  FiImage,
} from 'react-icons/fi';
import {
  getGalleryAdmin,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from '../services/api';

const DEFAULT_CATEGORIES = [
  'Wedding Frames',
  'Baby Frames',
  'Anniversary Gifts',
  'God & Devotional Frames',
  'Photo Frames',
  'Mirror Frames',
  'Canvas Frames',
  'Customized Gifts',
];

export default function AdminGallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteConfirmItem, setDeleteConfirmItem] = useState(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(DEFAULT_CATEGORIES[0]);
  const [customCategory, setCustomCategory] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [published, setPublished] = useState(true);

  // Form Submission Status
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const fetchItems = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getGalleryAdmin();
      setItems(data);
    } catch (err) {
      setError(err.message || 'Failed to load gallery items.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const openAddModal = () => {
    setEditingItem(null);
    setTitle('');
    setCategory(DEFAULT_CATEGORIES[0]);
    setCustomCategory('');
    setDescription('');
    setImageUrl('');
    setImagePreview('');
    setPublished(true);
    setFormError('');
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setTitle(item.title || '');
    if (DEFAULT_CATEGORIES.includes(item.category)) {
      setCategory(item.category);
      setCustomCategory('');
    } else {
      setCategory('Other');
      setCustomCategory(item.category || '');
    }
    setDescription(item.description || '');
    setImageUrl(item.imageUrl || '');
    setImagePreview(item.imageUrl || '');
    setPublished(item.published !== undefined ? item.published : true);
    setFormError('');
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!title.trim()) {
      setFormError('Please enter a title for the gallery artwork.');
      return;
    }

    const finalCategory = category === 'Other' ? customCategory.trim() : category;
    if (!finalCategory) {
      setFormError('Please select or specify a category.');
      return;
    }

    if (!imageUrl.trim()) {
      setFormError('Please enter an image URL.');
      return;
    }

    setFormSubmitting(true);
    try {
      const payload = {
        title: title.trim(),
        category: finalCategory,
        description: description.trim(),
        imageUrl: imageUrl.trim(),
        published,
      };

      if (editingItem) {
        await updateGalleryItem(editingItem._id, payload);
      } else {
        await createGalleryItem(payload);
      }

      setModalOpen(false);
      await fetchItems();
    } catch (err) {
      setFormError(err.message || 'Failed to save gallery item.');
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleTogglePublish = async (item) => {
    try {
      await updateGalleryItem(item._id, { published: !item.published });
      setItems((prev) =>
        prev.map((i) => (i._id === item._id ? { ...i, published: !item.published } : i))
      );
    } catch (err) {
      alert(`Failed to update status: ${err.message}`);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirmItem) return;
    try {
      await deleteGalleryItem(deleteConfirmItem._id);
      setItems((prev) => prev.filter((i) => i._id !== deleteConfirmItem._id));
      setDeleteConfirmItem(null);
    } catch (err) {
      alert(`Failed to delete item: ${err.message}`);
    }
  };

  // Filter items based on search and category
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title?.toLowerCase().includes(search.toLowerCase()) ||
      item.category?.toLowerCase().includes(search.toLowerCase()) ||
      item.description?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Page Header with Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-bold text-xl text-white">Gallery Management</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Add, edit, publish, or remove framed artwork portfolio items.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchItems}
            disabled={loading}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs transition-all disabled:opacity-50"
            title="Refresh gallery"
          >
            <FiRefreshCw className={`text-sm ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-[0.99] text-slate-950 font-semibold text-xs shadow-lg shadow-amber-500/20 transition-all"
          >
            <FiPlus className="text-base" />
            <span>Add Gallery Item</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center justify-between">
          <span>{error}</span>
          <button onClick={fetchItems} className="underline font-semibold ml-4">
            Retry
          </button>
        </div>
      )}

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-3 bg-slate-900 p-3 rounded-2xl border border-slate-800">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by artwork title, category, or description..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-amber-500"
        >
          <option value="All">All Categories</option>
          {DEFAULT_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Gallery Cards Grid */}
      {loading ? (
        <div className="py-20 text-center text-xs text-slate-400">
          <div className="inline-block animate-spin w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full mb-3" />
          <p>Loading master gallery items...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="py-16 text-center bg-slate-900/60 rounded-2xl border border-dashed border-slate-800 p-8">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-3">
            <FiImage className="text-xl" />
          </div>
          <h3 className="font-heading font-semibold text-base text-white">No gallery items found</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            {search || categoryFilter !== 'All'
              ? 'No items match your search filter.'
              : 'Your gallery database is currently empty. Click "Add Gallery Item" to create your first portfolio entry.'}
          </p>
          {(search || categoryFilter !== 'All') && (
            <button
              onClick={() => {
                setSearch('');
                setCategoryFilter('All');
              }}
              className="mt-4 px-3 py-1.5 rounded-lg bg-slate-800 text-xs text-amber-400 font-semibold"
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => (
            <div
              key={item._id}
              className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between group hover:border-slate-700 transition-all shadow-lg"
            >
              {/* Image Preview & Status Badge */}
              <div className="relative h-48 bg-slate-950 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/600x400/0b0b0b/c89b3c?text=Frame+Image';
                  }}
                />
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <span
                    className={`text-[10px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-md ${
                      item.published
                        ? 'bg-emerald-500/80 text-white'
                        : 'bg-slate-800/90 text-slate-300'
                    }`}
                  >
                    {item.published ? 'Published' : 'Hidden'}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-black/70 text-amber-300 backdrop-blur-md">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Item Info */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-semibold text-sm text-white line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {item.description || 'No description provided.'}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500">
                    {new Date(item.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>

                  <div className="flex items-center gap-1.5">
                    {/* Toggle Published */}
                    <button
                      onClick={() => handleTogglePublish(item)}
                      title={item.published ? 'Hide from website' : 'Publish to website'}
                      className={`p-1.5 rounded-lg border text-xs transition-colors ${
                        item.published
                          ? 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10'
                          : 'border-slate-700 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      {item.published ? <FiEye className="text-sm" /> : <FiEyeOff className="text-sm" />}
                    </button>

                    {/* Edit */}
                    <button
                      onClick={() => openEditModal(item)}
                      title="Edit artwork"
                      className="p-1.5 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-amber-400 transition-colors"
                    >
                      <FiEdit2 className="text-sm" />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => setDeleteConfirmItem(item)}
                      title="Delete artwork"
                      className="p-1.5 rounded-lg border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 transition-colors"
                    >
                      <FiTrash2 className="text-sm" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- ADD / EDIT MODAL --- */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl my-8">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <h3 className="font-heading font-bold text-base text-white">
                {editingItem ? 'Edit Gallery Artwork' : 'Add New Gallery Artwork'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                disabled={formSubmitting}
                className="text-slate-400 hover:text-white p-1"
              >
                <FiX className="text-lg" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              {formError && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-start gap-2">
                  <FiAlertCircle className="text-base shrink-0 mt-0.5" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Artwork Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Traditional Teak Deity Frame"
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                >
                  {DEFAULT_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                  <option value="Other">Other (Custom Category)</option>
                </select>

                {category === 'Other' && (
                  <input
                    type="text"
                    required
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    placeholder="Enter custom category name..."
                    className="mt-2 w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                  />
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Details regarding materials, wood finish, border beading, etc."
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Image URL Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Image URL *
                </label>
                <input
                  type="url"
                  required
                  value={imageUrl}
                  onChange={(e) => {
                    setImageUrl(e.target.value);
                    setImagePreview(e.target.value);
                  }}
                  placeholder="https://res.cloudinary.com/..."
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                />

                {/* Preview */}
                {imagePreview && (
                  <div className="mt-3 flex items-center gap-3 p-2 bg-slate-950 rounded-xl border border-slate-800">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-14 h-14 rounded-lg object-cover bg-slate-800 shrink-0"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                      onLoad={(e) => {
                        e.target.style.display = 'block';
                      }}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold text-slate-300 truncate">
                        Image URL specified
                      </p>
                      <p className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5">
                        <FiCheck /> Ready for submission
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Published Switch */}
              <div className="pt-2 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-white block">Published</span>
                  <span className="text-[10px] text-slate-400">
                    Visible to clients on the public website
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setPublished(!published)}
                  className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                    published ? 'bg-amber-500' : 'bg-slate-800'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-slate-950 transition-transform ${
                      published ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  disabled={formSubmitting}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50"
                >
                  {formSubmitting ? 'Saving Artwork...' : editingItem ? 'Update Artwork' : 'Save Artwork'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- DELETE CONFIRMATION MODAL --- */}
      {deleteConfirmItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-sm p-5 shadow-2xl">
            <h3 className="font-heading font-bold text-base text-white">Delete Gallery Item</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Are you sure you want to delete{' '}
              <strong className="text-white">"{deleteConfirmItem.title}"</strong>? This item will be
              permanently removed from the database.
            </p>
            <div className="mt-5 flex items-center justify-end gap-2.5">
              <button
                onClick={() => setDeleteConfirmItem(null)}
                className="px-3.5 py-1.5 rounded-xl border border-slate-700 text-xs font-semibold text-slate-300 hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-1.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white text-xs font-semibold shadow-lg shadow-rose-500/20"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
