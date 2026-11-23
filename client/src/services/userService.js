import { apiRequest } from './api.js'

// POST /api/users: creates a new user from the dashboard form data
export const createUser = (payload, token) =>
  apiRequest('/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  })

// GET /api/users/:username: fetches one public portfolio
// encodeURIComponent keeps odd characters in the username from breaking the URL
export const getUserByUsername = (username) =>
  apiRequest(`/users/${encodeURIComponent(username)}`)

const myPortfoliosPath = '/users/me/portfolios'

const authHeaders = (token) => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
})

export const listMyPortfolios = (token, signal) =>
  apiRequest(myPortfoliosPath, {
    headers: authHeaders(token),
    signal,
  })

export const getMyPortfolio = (username, token) =>
  apiRequest(`${myPortfoliosPath}/${encodeURIComponent(username)}`, {
    headers: authHeaders(token),
  })

export const updateMyPortfolio = (username, payload, token) =>
  apiRequest(`${myPortfoliosPath}/${encodeURIComponent(username)}`, {
    method: 'PATCH',
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  })