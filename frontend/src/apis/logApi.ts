import type { Product } from '@/types'

// const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/logs`

const API_URL = 'http://localhost:8080/api/logs'

// GET request to /api/logs
export async function getAllLogs(token: string) {
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  return await response.json()
}

// GET request to /api/logs/{id}
export async function getLog(id: string, token: string) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  return await response.json()
}

// //GET request to /api/recipes/search?query={query}
// export async function getQuery(query: string) {
//   const response = await fetch(`${API_URL}/search?query=${query}`)
//   const data = await response.json()
//   return data
// }

// POST request to /api/logs
export async function createLog(
  requestBody: {
    dateTime: string
    routineType: string
    productsUsed: Array<Product>
    notes: string
  },
  token: string,
) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(requestBody),
  })
  return await response.json()
}

// PUT request to /api/logs/{id}
export async function updateLog(
  id: string,
  requestBody: {
    dateTime: string
    routineType: string
    productsUsed: Array<Product>
    notes: string
  },
  token: string,
) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(requestBody),
  })
  return await response.json()
}

// DELETE request to /api/logs/{id}
export async function deleteLog(id: number, token: string) {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
