import { apiRequest } from './api.js'

export function uploadImage(file, token) {
  const body = new FormData()
  body.append('image', file)

  return apiRequest('/uploads/image', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body,
  })
}