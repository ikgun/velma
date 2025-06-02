/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { Link } from '@tanstack/react-router'
import LogCard from './LogCard'
import type { Log } from '@/types'

type LogsSectionProps = {
  logs: Array<Log>
}

export default function LogsSection({ logs }: LogsSectionProps) {
  const hasLogs = logs && logs.length > 0
  // Take the last 3 logs and reverse to show newest first
  const lastThreeLogs = hasLogs ? logs.slice(-3).reverse() : []

  return (
    <div className="py-5">
      <h1 className="text-xl sm:text-2xl font-semibold mb-4">
        Here are your latest skincare logs
      </h1>

      <div className="flex gap-2 w-90 h-10 mb-6">
        <Link
          to="/logs/new"
          className="bg-[#141414] text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors duration-200 w-full text-center"
        >
          + Add New Log
        </Link>

        
          <Link
            to="/logs"
            className="flex items-center justify-left px-4 py-2 rounded text-sm font-medium text-[#141414] hover:bg-gray-200 transition-colors duration-200 block w-full"
          >
            See all of your logs
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        
      </div>

      {hasLogs ? (
        <div className="space-y-4 mb-4">
          {lastThreeLogs.map((log) => (
            <LogCard key={log.id} {...log} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600 mb-4">
          You haven’t added any logs yet. Start tracking your skincare journey!
        </p>
      )}
    </div>
  )
}
