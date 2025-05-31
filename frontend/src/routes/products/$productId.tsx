import { createFileRoute } from '@tanstack/react-router'
import { SignedIn, useUser } from '@clerk/clerk-react'

export const Route = createFileRoute('/products/$productId')({
  component: ProductPage,
})

function RouteComponent() {
  return <div>Hello "/products/$productId"!</div>
function ProductPage() {
}
