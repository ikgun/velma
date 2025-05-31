import { createFileRoute } from '@tanstack/react-router'
import { SignedIn, useUser } from '@clerk/clerk-react'
import { useState } from 'react'
import { useCreateLog } from '@/hooks/log/useCreateLog'
import { useGetAllProducts } from '@/hooks/product/useGetAllProducts'

export const Route = createFileRoute('/logs/new')({
  component: AddLogFormPage,
})

function AddLogFormPage() {
  const { isSignedIn, isLoaded } = useUser()
  const [dateTime, setDateTime] = useState('')
  const [routineType, setRoutineType] = useState('')
  const [productsUsed, setProductsUsed] = useState<Array<Product>>([])
  const [notes, setNotes] = useState('')
  const { mutate, isSuccess, error } = useCreateLog()
  const { data: products = [], isLoading } = useGetAllProducts()

  if (!isLoaded) {
    return <div className="p-4">Loading...</div>
  }

  if (!isSignedIn) {
    return <div className="p-4">Sign in to view this page</div>
  }
  return (
    <SignedIn>
      <div>this is where add log form will go</div>
    </SignedIn>
  )
}
