const API_URL = import.meta.env.VITE_API_URL;

// Base helper for every API call in the app.
// Usage: apiRequest('/health')  or  apiRequest('/users', { method: 'POST', body: JSON.stringify(data) })
export const apiRequest = async (path, options = {}) => {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  const data = await response.json();

  // fetch does NOT throw on 4xx/5xx responses, so we do it ourselves.
  // The HTTP status is attached so callers can tell a 404 from a server error.
  if (!response.ok) {
    const error = new Error(data.message || 'Something went wrong');
    error.status = response.status;
    throw error;
  }

  return data;
};