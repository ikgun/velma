/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { Link } from '@tanstack/react-router'
import type { Log, Product } from '@/types'
import { useDeleteLog } from '@/hooks/log/useDeleteLog'

export default function LogCard({
  id,
  dateTime,
  notes,
  productsUsed,
  routineType,
}: Log) {
  const mutation = useDeleteLog()
}