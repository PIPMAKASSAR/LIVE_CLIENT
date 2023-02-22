export default function ButtonWithIcon({handleFunction, title = "Button", width, isLoading, color = "blue", type = "button", IconButton}) {
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
                            ${`bg-${color}-500 hover:bg-${color}-600` }
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