const API_URL = 'http://localhost:8080/api/products'

// GET request to /api/products
export async function getAllProducts() {
  const response = await fetch(API_URL)
  const data = await response.json()
  return data
}

// GET request to /api/products/{id}
export async function getProduct(id: string) {
  const response = await fetch(`${API_URL}/${id}`)
  const data = await response.json()
  return data
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
  const data = await response.json()
  return data
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
  const data = await response.json()
  return data
}

// DELETE request to /api/products/{id}
export async function deleteProduct(id: string) {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  })
}
