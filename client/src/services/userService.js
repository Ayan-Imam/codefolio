import { apiRequest } from './api.js'

// POST /api/users: creates a new user from the dashboard form data
export const createUser = (payload) =>
  apiRequest('/users', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

// GET /api/users/:username: fetches one public portfolio
// encodeURIComponent keeps odd characters in the username from breaking the URL
export const getUserByUsername = (username) =>
  apiRequest(`/users/${encodeURIComponent(username)}`)