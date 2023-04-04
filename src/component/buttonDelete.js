import { useEffect } from "react"

export default function ButtonDelete({handleFunction, setUuid, uuid ,title = "Button", width, color = "blue", type = "button", IconButton}) {
    
    return(
        <button 
                type={type} 
                className={`"
                            text-white 
                            focus:ring-4 
                            focus:ring-blue-300 
                            font-medium 
                            rounded-lg 
                            text-sm 
                            px-5 
                            py-2.5 
                            ml-2 
                            focus:outline-none"
                            ${`bg-${color}-600 hover:bg-${color}-700` }
                            ${width ? `${width}` : `w-fit`}
                            `}
                onClick={handleFunction}
        > 
            {
                IconButton &&
                <IconButton className="mr-2" />
            }
            {
                title &&
                <span>{title}</span>
            }
        </button>
    )
}