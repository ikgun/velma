import LogCard from "./LogCard";

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
}