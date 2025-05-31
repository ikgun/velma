/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { Link } from '@tanstack/react-router'
import type { Log, Product } from '@/types'
import type { FormEvent } from 'react'
import { useDeleteLog } from '@/hooks/log/useDeleteLog'

export default function LogCard({
  id,
  dateTime,
  notes,
  productsUsed,
  routineType,
}: Log) {
  const mutation = useDeleteLog()
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    mutation.mutate(id)
  }
}