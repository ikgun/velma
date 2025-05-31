import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/logs/new')({
  component: AddLogFormPage,
})

function AddLogFormPage() {
}
