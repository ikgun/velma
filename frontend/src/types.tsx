export type Product = {
  name: string
  brand: string
  type: string
  expirationDate: string
}

export type Log = {
  dateTime: string
  routineType: string
  productsUsed: Array<Product>
  notes: string
}
