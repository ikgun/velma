export type Product = {
  id: number
  name: string
  brand: string
  type: string
  expirationDate: string
}

export type Log = {
  id: number
  dateTime: string
  routineType: string
  productsUsed: Array<Product>
  notes: string
}
