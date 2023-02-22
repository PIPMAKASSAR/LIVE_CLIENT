export default function ButtonEdit({handleFunction, setUuid, data ,title = "Button", width, color = "blue", type = "button", IconButton}) {
    
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
                            mr-2 mb-2  
                            focus:outline-none"
                            ${`bg-${color}-300 hover:bg-${color}-400` }
                            ${width ? `${width}` : `w-fit`}
                            `}
                onClick={() => handleFunction(data)}
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