import { enUS } from 'date-fns/locale'
import { format } from 'date-fns'
import { Link } from '@tanstack/react-router'
import { toast } from 'react-toastify'
import type { FormEvent } from 'react'
import type { Log } from '../types'
import { useDeleteLog } from '@/hooks/log/useDeleteLog'

function formatCustomDate(dateStr: string) {
  const date = new Date(dateStr)
  return format(date, "EEEE, do 'of' MMMM 'at' HH:mm", { locale: enUS })
}

export default function LogCard(data: Log) {
  const mutation = useDeleteLog()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    mutation.mutate(data.id, {
      onSuccess: () => {
        toast.success('Log removed successfully!')
      },
    })
  }

  return (
    <div className="bg-[#F5F5F5] text-black shadow-md rounded-xl p-4 sm:p-6 w-full mx-auto transition duration-300 hover:shadow-lg">
      {/* Header */}
      <div className="mb-2">
        <h2 className="text-lg sm:text-xl font-semibold">Log Entry</h2>
        <p className="text-xs sm:text-sm text-gray-500">
          Created at {formatCustomDate(data.dateTime)}
        </p>
      </div>

      {/* Routine Info */}
      <div className="mt-3">
        <p className="text-sm sm:text-base font-medium">Routine Type:</p>
        <p className="text-sm sm:text-base text-gray-700">{data.routineType}</p>
      </div>

      {/* Actions */}
      <form
        onSubmit={handleSubmit}
        className="mt-5 flex gap-3"
      >
        <Link
          to={'/logs/$logId'}
          params={{ logId: String(data.id) }}
          className="w-28
                    flex items-center justify-center
                    text-white
                    
                    bg-[#B2A095]
                    hover:bg-[#C3B5AC]
                    py-2 px-4
                    rounded-md
                    transition
                    duration-200
                    ease-in-out"
        >
          See more
        </Link>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="cursor-pointer flex items-center justify-center bg-[#141414] hover:bg-[#5c5c5c] text-white font-semibold py-2 px-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </form>
    </div>
  )
}
