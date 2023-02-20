import Loading from "./loadingButton"

export default function Button({handleFunction, title = "Button", width, isLoading, color = "blue", type = "button"}) {
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
                            ${`bg-${color}-600 hover:bg-${color}-700`}
                            ${width ? `${width}` : `w-fit`}
                            `}
                onClick={handleFunction}
        >
            {
                isLoading ? 
                <Loading />
                :
                <span>{title}</span>
            }
        </button>
    )
}