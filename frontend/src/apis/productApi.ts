// const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/products`

const API_URL = 'http://localhost:8080/api/products'

// GET request to /api/products
export async function getAllProducts(token: string) {
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText)
  }
  return await response.json()
}

// GET request to /api/products/{id}
export async function getProduct(id: string, token: string) {
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

// POST request to /api/products
export async function createProduct(
  requestBody: {
    name: string
    brand: string
    type: string
    expirationDate: string
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

// PUT request to /api/products/id
export async function updateProduct(
  id: string,
  requestBody: {
    name: string
    brand: string
    type: string
    expirationDate: string
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

// DELETE request to /api/products/{id}
export async function deleteProduct(id: number, token: string) {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
}
