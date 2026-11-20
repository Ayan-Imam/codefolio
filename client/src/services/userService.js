import { apiRequest } from './api.js'

// POST /api/users: creates a new user from the dashboard form data
export const createUser = (payload) =>
  apiRequest('/users', {
    method: 'POST',
    body: JSON.stringify(payload),
  })