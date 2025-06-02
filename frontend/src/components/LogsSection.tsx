import LogCard from "./LogCard";
import type { Log } from '@/types'

type LogsSectionProps = {
  logs: Array<Log>
}

export default function LogsSection(){
    return(
        <>
        <div className="py-5">
            <h1>Here are your latest skincare logs</h1>
            <button>click to add new log</button>
            <p>see your log history...</p>
            <LogCard/>
        </div>
        </>
    )
export default function LogsSection({ logs }: LogsSectionProps) {
export default function LogsSection({ logs }: LogsSectionProps) {
}