/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { enUS } from 'date-fns/locale'
import { format, isSameDay } from 'date-fns'
import { useState } from 'react'
import Calendar from 'react-calendar'
import ProductFilter from './ProductFilter'
import LogCard from './LogCard'
import type { Log, Product } from '@/types'
import { useGetAllLogs } from '@/hooks/log/useGetAllLogs'

type Props = {
  selectedProducts: Array<Product>
  setSelectedProducts: React.Dispatch<React.SetStateAction<Array<Product>>>
}

export default function CalendarComp({
  selectedProducts,
  setSelectedProducts,
}: Props) {
  const { data } = useGetAllLogs()
  const [selectedDate, setSelectedDate] = useState(new Date())

  const sortedLogs = [...(data || [])].sort(
    (a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime(),
  )

  const d = selectedDate?.toDateString()

  const logsForSelectedDay = sortedLogs?.filter((log: Log) =>
    selectedDate
      ? isSameDay(
          new Date(log.dateTime).setHours(0, 0, 0, 0),
          new Date(selectedDate).setHours(0, 0, 0, 0),
        )
      : false,
  )

  const filteredLogsByDate =
    selectedProducts.length === 0
      ? logsForSelectedDay
      : logsForSelectedDay.filter((log) =>
          selectedProducts.every((sp) =>
            log.productsUsed.some((p: Product) => p.id === sp.id),
          ),
        )

  function formatCustomDate(dateStr: string) {
    const date = new Date(dateStr)
    return format(date, "EEEE, do 'of' MMMM", { locale: enUS })
  }

  return (
    <>
      <div className='flex flex-col sm:flex-row gap-6'>
        <Calendar
          view="month"
          maxDetail="month"
          minDetail="month"
          prev2Label={null}
          next2Label={null}
          prevLabel={
            <span className="p-1 rounded-2xl hover:cursor-pointer hover:bg-gray-200 transition-colors duration-200 text-xl font-bold mr-3">
              {'←'}
            </span>
          }
          nextLabel={
            <span className="p-1 rounded-2xl hover:cursor-pointer hover:bg-gray-200 transition-colors duration-200 text-xl font-bold ml-3 ">
              {'→'}
            </span>
          }
          onChange={(date) => {
            setSelectedDate(date as Date)
          }}
          value={selectedDate}
          navigationLabel={({ date, locale }) => {
            return (
              <div className="text-lg sm:text-xl font-bold uppercase mb-6">
                {date.toLocaleDateString(locale, {
                  month: 'long',
                  year: 'numeric',
                })}
              </div>
            )
          }}
          tileClassName={({ date, view }) => {
            if (view !== 'month') return ''
            const hasLog = sortedLogs?.some((log: Log) =>
              isSameDay(
                new Date(log.dateTime).setHours(0, 0, 0, 0),
                new Date(date).setHours(0, 0, 0, 0),
              ),
            )
            return `rounded-xl hover:cursor-pointer hover:bg-gray-200 bg-[#F5F5F5] border border-[#5E5345] transition-colors duration-200 border-black h-16 w-16 sm:h-20 sm:w-20
           flex items-center justify-center ${hasLog ? 'relative' : ''}`
          }}
          tileContent={({ date, view }) => {
            if (view !== 'month') return null

            const logsOnDate = data?.filter((log: Log) =>
              isSameDay(new Date(log.dateTime), date),
            )

            if (!logsOnDate || logsOnDate.length === 0) return null

            return (
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                <span className="bg-[#832035] text-white text-xs text-center p-1 rounded-2xl">
                  {logsOnDate.length}
                </span>
              </div>
            )
          }}
          className=" my-4 text-center sm:w-150" 
        />

        {logsForSelectedDay && logsForSelectedDay.length > 0 ? (
          <div className="mt-6 sm:mt-20 space-y-4 sm:w-150">
            <h2 className="text-lg font-semibold">
              Logs on {formatCustomDate(d)}
            </h2>
            <div className="space-y-4">
              <ProductFilter
                selectedProducts={selectedProducts}
                setSelectedProducts={setSelectedProducts}
              />

              {filteredLogsByDate.length > 0 ? (
                filteredLogsByDate.map((log) => (
                  <LogCard key={log.id} {...log} />
                ))
              ) : (
                <p className="text-gray-100 font-bold mt-10 mb-5">
                  No logs found for selected products.
                </p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-gray-100 font-bold mt-6 sm:mt-20 mb-20 flex items-center justify-center text-center">
            No logs for this day.
          </p>
        )}
      </div>
    </>
  )
}
