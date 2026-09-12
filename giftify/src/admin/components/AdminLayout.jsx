import { useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import {
  FiGrid,
  FiImage,
  FiMessageSquare,
  FiLogOut,
  FiMenu,
  FiX,
  FiExternalLink,
  FiUser,
} from 'react-icons/fi';
import { clearAuth, getAdminUser } from '../services/api';

export default function AdminLayout({ children, title }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const admin = getAdminUser();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out from MS Frames Admin?')) {
      clearAuth();
      navigate('/admin/login');
    }
  };

  const navItems = [
    { label: 'Dashboard', to: '/admin', end: true, icon: FiGrid },
    { label: 'Gallery Management', to: '/admin/gallery', icon: FiImage },
    { label: 'Review Management', to: '/admin/reviews', icon: FiMessageSquare },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-body flex flex-col md:flex-row">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <Link to="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-heading font-bold text-sm">
              MS
            </div>
            <div>
              <span className="font-heading font-bold text-base text-amber-400 tracking-wide block">
                MS FRAMES
              </span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono block">
                Admin Panel
              </span>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
            className="md:hidden text-slate-400 hover:text-white p-1"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-amber-400'
                  }`
                }
              >
                <Icon className="text-base shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Sidebar Footer: User Info & Actions */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-xs text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <span className="flex items-center gap-2">
              <FiExternalLink className="text-sm text-amber-400" />
              View Public Website
            </span>
          </Link>

          {admin?.email && (
            <div className="px-3 py-2 bg-slate-950/60 rounded-lg border border-slate-800 flex items-center gap-2 text-[11px] text-slate-400 truncate">
              <FiUser className="text-amber-400 shrink-0" />
              <span className="truncate">{admin.email}</span>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 transition-all"
          >
            <FiLogOut className="text-sm" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 md:pl-64 flex flex-col min-h-screen">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
              className="md:hidden text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800"
            >
              <FiMenu className="text-xl" />
            </button>
            <h1 className="font-heading font-semibold text-lg text-white tracking-wide">
              {title || 'Overview'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold px-3 py-1.5 rounded-full border border-amber-500/30 hover:bg-amber-500/10 transition-all"
            >
              <FiExternalLink className="text-xs" /> Live Store
            </Link>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
