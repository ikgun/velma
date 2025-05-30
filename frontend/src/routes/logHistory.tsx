import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/logHistory')({
  component: LogHistoryPage,
})

function LogHistoryPage() {
  return (
    <>
      <div>this is where the log history is</div>
      <div className="px-2 font-bold">
        <Link to="/addLogForm">Add new log</Link>
      </div>
    </>
  )
}
