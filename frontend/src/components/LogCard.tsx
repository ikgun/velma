export default function LogCard(){
    return(
        <>
        <div className="bg-red-300">
            <p>log card</p>
        </div>
        </>
    )
import type { Log, Product } from '@/types'
export default function LogCard({
  id,
  dateTime,
  notes,
  productsUsed,
  routineType,
}: Log) {
}