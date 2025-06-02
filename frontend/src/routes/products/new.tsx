import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { SignedIn, useUser } from '@clerk/clerk-react'
import { toast } from 'react-toastify'
import type { FormEvent } from 'react'
import { useCreateProduct } from '@/hooks/product/useCreateProduct'

export const Route = createFileRoute('/products/new')({
  component: AddProductFormPage,
})

function AddProductFormPage() {
  const { isSignedIn, isLoaded } = useUser()
  const [name, setName] = useState('')
  const [brand, setBrand] = useState('')
  const [type, setType] = useState('')
  const [expirationDate, setExpirationDate] = useState('') // store as string YYYY-MM-DD
  const { mutate, isSuccess, error } = useCreateProduct()

  if (!isLoaded) {
    return <div className="p-4">Loading...</div>
  }

  if (!isSignedIn) {
    return <div className="p-4">Sign in to view this page</div>
  }
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  const { mutate, isSuccess, error, isPending } = useCreateProduct()
  const [validationError, setValidationError] = useState('')

  useEffect(() => {
    if (isSuccess) {
      toast.success('New product created successfully!')
      setName('')
      setBrand('')
      setType('')
      setExpirationDate('')
    }
  }, [isSuccess])

  if (!isLoaded)
    return <div className="p-4 text-[#141414]">Loading user...</div>
  if (!isSignedIn)
    return <div className="p-4 text-[#141414]">Sign in to view this page</div>

    if (error) {
      console.log(error.message)
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setValidationError('')

    if (!name) {
      setValidationError('Please fill in name!')
      return
    }

    mutate({ name, brand, type, expirationDate })
  }

  return (
    <SignedIn>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Write name"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Brand:
          <input
            type="text"
            name="brand"
            value={brand}
            placeholder="Write your brand"
            onChange={(e) => setBrand(e.target.value)}
          />
        </label>
        <label>
          Type:
          <input
            type="text"
            name="type"
            value={type}
            placeholder="Write your type"
            onChange={(e) => setType(e.target.value)}
          />
        </label>
        <label>
          Expiration date:
          <input
            type="date"
            name="date"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
          />
        </label>
        <input type="submit" value="Send" />
      </form>
    </SignedIn>
  )
}
