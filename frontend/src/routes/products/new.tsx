import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/products/new')({
  component: AddProductFormPage,
})

function AddProductFormPage() {
}
