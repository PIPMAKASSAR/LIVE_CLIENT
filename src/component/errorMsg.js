export default function ErrorMsg({message}) {
    return(
        <div className="p-2 mb-2 text-xs text-red-800 rounded-md bg-red-50 " role="alert">
            <span className="font-medium">{message}</span>
        </div>
    )
}