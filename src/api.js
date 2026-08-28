const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

async function request(path, options = {}) {
  const token = localStorage.getItem('portfolio_token');
  const response = await fetch(`${API_URL}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(options.headers || {}) },
    ...options,
  });
  if (!response.ok) throw new Error(`API ${response.status}`);
  return response.status === 204 ? null : response.json();
}

export const getContents = () => request('/contents');
export const getModuleContents = (module) => request(`/contents/${module}`);
export const sendAnalytics = (event) => request('/analytics/events', {
  method: 'POST',
  body: JSON.stringify({ ...event, path: window.location.pathname }),
}).catch(() => undefined);
export const adminLogin = (credentials) => request('/admin/login', { method: 'POST', body: JSON.stringify(credentials) });
export const googleLogin = async (credential) => {
  const result = await request('/auth/google', { method: 'POST', body: JSON.stringify({ credential }) });
  localStorage.setItem('portfolio_token', result.token);
  return result;
};
export const getCurrentUser = () => request('/admin/me');
export const logout = async () => {
  try { await request('/auth/logout', { method: 'POST' }); } finally { localStorage.removeItem('portfolio_token'); }
};
export const getDashboard = () => request('/admin/dashboard');
export const createContent = (content) => request('/admin/contents', { method: 'POST', body: JSON.stringify(content) });
export const updateContent = (id, content) => request(`/admin/contents/${id}`, { method: 'PUT', body: JSON.stringify(content) });
export const deleteContent = (id) => request(`/admin/contents/${id}`, { method: 'DELETE' });
