import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/products/new')({
  component: AddProductForm,
})

function AddProductForm() {
  return <div>this is where the add product form will be</div>
}
