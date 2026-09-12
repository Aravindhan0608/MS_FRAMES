import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FiImage,
  FiMessageSquare,
  FiEye,
  FiEyeOff,
  FiPlus,
  FiRefreshCw,
  FiStar,
  FiExternalLink,
  FiCheckCircle,
} from 'react-icons/fi';
import { getGalleryAdmin, getReviewsAdmin } from '../services/api';

export default function AdminDashboard() {
  const [gallery, setGallery] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const [gData, rData] = await Promise.all([
        getGalleryAdmin(),
        getReviewsAdmin(),
      ]);
      setGallery(gData);
      setReviews(rData);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const totalGallery = gallery.length;
  const publishedGallery = gallery.filter((g) => g.published).length;
  const hiddenGallery = totalGallery - publishedGallery;

  const totalReviews = reviews.length;
  const publishedReviews = reviews.filter((r) => r.published).length;
  const hiddenReviews = totalReviews - publishedReviews;

  const avgRating = totalReviews > 0
    ? (reviews.reduce((acc, r) => acc + (r.rating || 5), 0) / totalReviews).toFixed(1)
    : '5.0';

  return (
    <div className="space-y-8">
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-850 p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div>
          <h2 className="font-heading font-bold text-xl text-white">
            Welcome to MS Frames Administration
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage your master framing portfolio and customer reviews in real-time.
          </p>
        </div>
        <button
          onClick={loadData}
          disabled={loading}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-all self-start sm:self-auto disabled:opacity-50"
        >
          <FiRefreshCw className={`text-sm ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center justify-between">
          <span>{error}</span>
          <button onClick={loadData} className="underline font-semibold ml-4">
            Try Again
          </button>
        </div>
      )}

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Gallery Items */}
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 relative overflow-hidden group hover:border-amber-500/40 transition-all shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Gallery Works
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <FiImage className="text-lg" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-heading font-bold text-white">
              {loading ? '...' : totalGallery}
            </span>
            <span className="text-xs text-slate-400">Total Items</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
            <span className="text-emerald-400 flex items-center gap-1 font-medium">
              <FiEye className="text-xs" /> {publishedGallery} Published
            </span>
            <span className="text-slate-400 flex items-center gap-1">
              <FiEyeOff className="text-xs" /> {hiddenGallery} Hidden
            </span>
          </div>
        </div>

        {/* Total Customer Reviews */}
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 relative overflow-hidden group hover:border-amber-500/40 transition-all shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Customer Reviews
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <FiMessageSquare className="text-lg" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-heading font-bold text-white">
              {loading ? '...' : totalReviews}
            </span>
            <span className="text-xs text-slate-400">Total Reviews</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
            <span className="text-emerald-400 flex items-center gap-1 font-medium">
              <FiEye className="text-xs" /> {publishedReviews} Published
            </span>
            <span className="text-slate-400 flex items-center gap-1">
              <FiEyeOff className="text-xs" /> {hiddenReviews} Hidden
            </span>
          </div>
        </div>

        {/* Average Rating */}
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 relative overflow-hidden group hover:border-amber-500/40 transition-all shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Average Rating
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <FiStar className="text-lg" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-heading font-bold text-white">
              {loading ? '...' : `${avgRating} ★`}
            </span>
            <span className="text-xs text-slate-400">Out of 5.0</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-1.5">
            <FiCheckCircle className="text-emerald-400" />
            <span>Based on verified client feedback</span>
          </div>
        </div>

        {/* Cloudinary Status Indicator */}
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Image Storage
            </span>
            <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300">
              <FiImage className="text-lg" />
            </div>
          </div>
          <div className="text-base font-semibold text-white">
            Cloudinary
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Manual Image URLs
          </p>
          <div className="mt-3 pt-3 border-t border-slate-800/80 text-[10px] text-amber-400/90 font-mono truncate">
            Direct Cloudinary dashboard URLs
          </div>
        </div>
      </div>

      {/* Quick Action Navigation Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <Link
          to="/admin/gallery"
          className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition-all flex items-center justify-between group shadow-md"
        >
          <div>
            <h3 className="font-heading font-semibold text-base text-white group-hover:text-amber-400 transition-colors">
              Manage Gallery Items
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Add new framed artworks, change categories, or toggle visibility.
            </p>
          </div>
          <span className="p-2.5 rounded-xl bg-slate-800 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all text-slate-300">
            <FiPlus className="text-base" />
          </span>
        </Link>

        <Link
          to="/admin/reviews"
          className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition-all flex items-center justify-between group shadow-md"
        >
          <div>
            <h3 className="font-heading font-semibold text-base text-white group-hover:text-amber-400 transition-colors">
              Manage Customer Reviews
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Create testimonials, edit ratings, or remove client reviews.
            </p>
          </div>
          <span className="p-2.5 rounded-xl bg-slate-800 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all text-slate-300">
            <FiPlus className="text-base" />
          </span>
        </Link>
      </div>

      {/* Recent Activity Previews */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Gallery Works */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-sm text-white">
              Recent Gallery Artworks
            </h3>
            <Link to="/admin/gallery" className="text-xs text-amber-400 hover:underline">
              View All ({totalGallery})
            </Link>
          </div>

          {loading ? (
            <div className="text-xs text-slate-500 py-6 text-center">Loading gallery...</div>
          ) : gallery.length === 0 ? (
            <div className="text-xs text-slate-500 py-6 text-center border border-dashed border-slate-800 rounded-xl">
              No gallery items in database yet. Click "Manage Gallery Items" to add your first piece.
            </div>
          ) : (
            <div className="space-y-2.5">
              {gallery.slice(0, 4).map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-10 h-10 rounded-lg object-cover bg-slate-800 shrink-0"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-white truncate">{item.title}</p>
                    <p className="text-[10px] text-slate-400">{item.category}</p>
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      item.published
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {item.published ? 'Published' : 'Hidden'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Reviews */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-sm text-white">
              Recent Customer Reviews
            </h3>
            <Link to="/admin/reviews" className="text-xs text-amber-400 hover:underline">
              View All ({totalReviews})
            </Link>
          </div>

          {loading ? (
            <div className="text-xs text-slate-500 py-6 text-center">Loading reviews...</div>
          ) : reviews.length === 0 ? (
            <div className="text-xs text-slate-500 py-6 text-center border border-dashed border-slate-800 rounded-xl">
              No reviews in database yet. Click "Manage Customer Reviews" to add your first review.
            </div>
          ) : (
            <div className="space-y-2.5">
              {reviews.slice(0, 4).map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80"
                >
                  {item.profileImageUrl ? (
                    <img
                      src={item.profileImageUrl}
                      alt={item.customerName}
                      className="w-10 h-10 rounded-full object-cover bg-slate-800 shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-400 font-bold flex items-center justify-center text-xs shrink-0">
                      {item.customerName.charAt(0)}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-white truncate">{item.customerName}</p>
                    <p className="text-[10px] text-amber-400 font-mono">
                      {'★'.repeat(item.rating || 5)}
                    </p>
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      item.published
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {item.published ? 'Published' : 'Hidden'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
