import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/logs/new')({
  component: AddLogForm,
})

function AddLogForm() {
  return <div>this is where add log form will go</div>
}
