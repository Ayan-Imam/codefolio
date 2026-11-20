const API_URL = import.meta.env.VITE_API_URL;

// Base helper for every API call in the app.
// Usage: apiRequest('/health')  or  apiRequest('/auth/login', { method: 'POST', body: JSON.stringify(data) })
export const apiRequest = async (path, options = {}) => {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  const data = await response.json();

  // fetch does NOT throw on 4xx/5xx responses, so we do it ourselves
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};