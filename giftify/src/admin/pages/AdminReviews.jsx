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
  FiStar,
  FiMapPin,
  FiMessageSquare,
} from 'react-icons/fi';
import {
  getReviewsAdmin,
  createReview,
  updateReview,
  deleteReview,
} from '../services/api';

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [ratingFilter, setRatingFilter] = useState('All');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [deleteConfirmItem, setDeleteConfirmItem] = useState(null);

  // Form Fields
  const [customerName, setCustomerName] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [published, setPublished] = useState(true);

  // Submission State
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const fetchReviews = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getReviewsAdmin();
      setReviews(data);
    } catch (err) {
      setError(err.message || 'Failed to load reviews.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const openAddModal = () => {
    setEditingReview(null);
    setCustomerName('');
    setLocation('');
    setRating(5);
    setReviewText('');
    setProfileImageUrl('');
    setImagePreview('');
    setPublished(true);
    setFormError('');
    setModalOpen(true);
  };

  const openEditModal = (review) => {
    setEditingReview(review);
    setCustomerName(review.customerName || '');
    setLocation(review.location || '');
    setRating(review.rating || 5);
    setReviewText(review.reviewText || '');
    setProfileImageUrl(review.profileImageUrl || '');
    setImagePreview(review.profileImageUrl || '');
    setPublished(review.published !== undefined ? review.published : true);
    setFormError('');
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!customerName.trim()) {
      setFormError('Please enter the customer name.');
      return;
    }

    if (!reviewText.trim()) {
      setFormError('Please enter the customer review text.');
      return;
    }

    setFormSubmitting(true);
    try {
      const payload = {
        customerName: customerName.trim(),
        location: location.trim(),
        rating: Number(rating),
        reviewText: reviewText.trim(),
        profileImageUrl: profileImageUrl.trim(),
        published,
      };

      if (editingReview) {
        await updateReview(editingReview._id, payload);
      } else {
        await createReview(payload);
      }

      setModalOpen(false);
      await fetchReviews();
    } catch (err) {
      setFormError(err.message || 'Failed to save review.');
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleTogglePublish = async (review) => {
    try {
      await updateReview(review._id, { published: !review.published });
      setReviews((prev) =>
        prev.map((r) => (r._id === review._id ? { ...r, published: !review.published } : r))
      );
    } catch (err) {
      alert(`Failed to update status: ${err.message}`);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirmItem) return;
    try {
      await deleteReview(deleteConfirmItem._id);
      setReviews((prev) => prev.filter((r) => r._id !== deleteConfirmItem._id));
      setDeleteConfirmItem(null);
    } catch (err) {
      alert(`Failed to delete review: ${err.message}`);
    }
  };

  const filteredReviews = reviews.filter((r) => {
    const matchesSearch =
      r.customerName?.toLowerCase().includes(search.toLowerCase()) ||
      r.location?.toLowerCase().includes(search.toLowerCase()) ||
      r.reviewText?.toLowerCase().includes(search.toLowerCase());
    const matchesRating = ratingFilter === 'All' || String(r.rating) === String(ratingFilter);
    return matchesSearch && matchesRating;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-bold text-xl text-white">Review Management</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Add, edit, publish, or delete authentic customer feedback and ratings.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchReviews}
            disabled={loading}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs transition-all disabled:opacity-50"
            title="Refresh reviews"
          >
            <FiRefreshCw className={`text-sm ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-[0.99] text-slate-950 font-semibold text-xs shadow-lg shadow-amber-500/20 transition-all"
          >
            <FiPlus className="text-base" />
            <span>Add Customer Review</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center justify-between">
          <span>{error}</span>
          <button onClick={fetchReviews} className="underline font-semibold ml-4">
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
            placeholder="Search reviews by customer name, city, or keywords..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>
        <select
          value={ratingFilter}
          onChange={(e) => setRatingFilter(e.target.value)}
          className="px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-amber-500"
        >
          <option value="All">All Star Ratings</option>
          <option value="5">5 Stars Only</option>
          <option value="4">4 Stars Only</option>
          <option value="3">3 Stars Only</option>
          <option value="2">2 Stars Only</option>
          <option value="1">1 Star Only</option>
        </select>
      </div>

      {/* Reviews Cards Grid */}
      {loading ? (
        <div className="py-20 text-center text-xs text-slate-400">
          <div className="inline-block animate-spin w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full mb-3" />
          <p>Loading customer reviews...</p>
        </div>
      ) : filteredReviews.length === 0 ? (
        <div className="py-16 text-center bg-slate-900/60 rounded-2xl border border-dashed border-slate-800 p-8">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-3">
            <FiMessageSquare className="text-xl" />
          </div>
          <h3 className="font-heading font-semibold text-base text-white">No reviews found</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            {search || ratingFilter !== 'All'
              ? 'No reviews match your search filter.'
              : 'No customer reviews in the database yet. Click "Add Customer Review" to add one.'}
          </p>
          {(search || ratingFilter !== 'All') && (
            <button
              onClick={() => {
                setSearch('');
                setRatingFilter('All');
              }}
              className="mt-4 px-3 py-1.5 rounded-lg bg-slate-800 text-xs text-amber-400 font-semibold"
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredReviews.map((item) => (
            <div
              key={item._id}
              className="bg-slate-900 rounded-2xl border border-slate-800 p-5 flex flex-col justify-between group hover:border-slate-700 transition-all shadow-lg"
            >
              <div>
                {/* Header: Customer info & Status */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    {item.profileImageUrl ? (
                      <img
                        src={item.profileImageUrl}
                        alt={item.customerName}
                        className="w-11 h-11 rounded-full object-cover ring-2 ring-amber-500/30 bg-slate-950 shrink-0"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-heading font-bold text-sm flex items-center justify-center shrink-0">
                        {item.customerName?.charAt(0) || 'C'}
                      </div>
                    )}
                    <div className="min-w-0">
                      <h3 className="font-heading font-semibold text-sm text-white truncate">
                        {item.customerName}
                      </h3>
                      {item.location && (
                        <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <FiMapPin className="text-amber-400 text-xs" /> {item.location}
                        </p>
                      )}
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                      item.published
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {item.published ? 'Published' : 'Hidden'}
                  </span>
                </div>

                {/* Rating Stars */}
                <div className="flex text-amber-400 text-xs gap-0.5 mb-2.5">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <FiStar
                      key={idx}
                      className={idx < (item.rating || 5) ? 'fill-current text-amber-400' : 'text-slate-700'}
                    />
                  ))}
                </div>

                {/* Review Content */}
                <p className="text-xs text-slate-300 leading-relaxed italic line-clamp-4">
                  "{item.reviewText}"
                </p>
              </div>

              {/* Bottom Actions */}
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
                    title="Edit review"
                    className="p-1.5 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-amber-400 transition-colors"
                  >
                    <FiEdit2 className="text-sm" />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => setDeleteConfirmItem(item)}
                    title="Delete review"
                    className="p-1.5 rounded-lg border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 transition-colors"
                  >
                    <FiTrash2 className="text-sm" />
                  </button>
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
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <h3 className="font-heading font-bold text-base text-white">
                {editingReview ? 'Edit Customer Review' : 'Add New Customer Review'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                disabled={formSubmitting}
                className="text-slate-400 hover:text-white p-1"
              >
                <FiX className="text-lg" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              {formError && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-start gap-2">
                  <FiAlertCircle className="text-base shrink-0 mt-0.5" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Customer Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Customer Name *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g., Bharath Sathishkumar"
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Location & Rating row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Location / City
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., Palani, Tamil Nadu"
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Rating (1 to 5 Stars) *
                  </label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-amber-500 font-semibold"
                  >
                    <option value={5}>★★★★★ (5 Stars - Excellent)</option>
                    <option value={4}>★★★★☆ (4 Stars - Very Good)</option>
                    <option value={3}>★★★☆☆ (3 Stars - Average)</option>
                    <option value={2}>★★☆☆☆ (2 Stars - Below Average)</option>
                    <option value={1}>★☆☆☆☆ (1 Star - Poor)</option>
                  </select>
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Customer Review Text *
                </label>
                <textarea
                  rows={3}
                  required
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share customer's words, compliments on wood frame finishing, packaging, etc."
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Profile Image URL Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Profile Image URL (Optional)
                </label>
                <input
                  type="url"
                  value={profileImageUrl}
                  onChange={(e) => {
                    setProfileImageUrl(e.target.value);
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
                      alt="Avatar Preview"
                      className="w-10 h-10 rounded-full object-cover bg-slate-800 shrink-0"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                      onLoad={(e) => {
                        e.target.style.display = 'block';
                      }}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold text-slate-300 truncate">
                        Profile image URL specified
                      </p>
                      <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                        <FiCheck /> Profile image ready
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
                    Visible on website reviews page and homepage carousel
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
                  {formSubmitting ? 'Saving Review...' : editingReview ? 'Update Review' : 'Save Review'}
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
            <h3 className="font-heading font-bold text-base text-white">Delete Customer Review</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Are you sure you want to delete the review by{' '}
              <strong className="text-white">"{deleteConfirmItem.customerName}"</strong>? This action
              cannot be undone.
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
