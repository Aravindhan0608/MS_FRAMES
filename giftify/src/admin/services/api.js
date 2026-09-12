const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const TOKEN_KEY = 'msframes_admin_token';
const USER_KEY = 'msframes_admin_user';

// Session Storage Helpers
export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const setToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
};

export const getAdminUser = () => {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const setAdminUser = (user) => {
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(USER_KEY);
  }
};

export const clearAuth = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const isAuthenticated = () => {
  return Boolean(getToken());
};

// Authenticated Fetch Helper
const authFetch = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    ...(options.headers || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Set Content-Type to application/json only if body is not FormData
  if (options.body && !(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (res.status === 401) {
    clearAuth();
    if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
      window.location.href = '/admin/login';
    }
  }

  return res;
};

// --- AUTH API ---
export const login = async (email, password) => {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Login failed. Please check credentials.');
  }

  setToken(data.token);
  setAdminUser(data.admin);
  return data;
};

// --- GALLERY APIS ---
export const getGalleryAdmin = async () => {
  const res = await authFetch('/api/gallery/admin');
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch gallery items');
  return data.data || [];
};

export const createGalleryItem = async (payload) => {
  const res = await authFetch('/api/gallery', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to create gallery item');
  return data.data;
};

export const updateGalleryItem = async (id, payload) => {
  const res = await authFetch(`/api/gallery/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to update gallery item');
  return data.data;
};

export const deleteGalleryItem = async (id) => {
  const res = await authFetch(`/api/gallery/${id}`, {
    method: 'DELETE',
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to delete gallery item');
  return data;
};

// --- REVIEW APIS ---
export const getReviewsAdmin = async () => {
  const res = await authFetch('/api/reviews/admin');
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch reviews');
  return data.data || [];
};

export const createReview = async (payload) => {
  const res = await authFetch('/api/reviews', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to create review');
  return data.data;
};

export const updateReview = async (id, payload) => {
  const res = await authFetch(`/api/reviews/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to update review');
  return data.data;
};

export const deleteReview = async (id) => {
  const res = await authFetch(`/api/reviews/${id}`, {
    method: 'DELETE',
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to delete review');
  return data;
};

// --- PUBLIC APIS (NO JWT) ---
export const getPublicGallery = async () => {
  const res = await fetch(`${API_BASE}/api/gallery`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch gallery items');
  return data.data || [];
};

export const getPublicReviews = async () => {
  const res = await fetch(`${API_BASE}/api/reviews`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch customer reviews');
  return data.data || [];
};
