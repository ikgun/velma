import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/logs/$logId')({
  component: LogPage,
})

function RouteComponent() {
  return <div>Hello "/logs/$logId"!</div>
function LogPage() {
}
