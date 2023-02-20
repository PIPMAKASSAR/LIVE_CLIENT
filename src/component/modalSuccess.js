import {FaCheck} from "react-icons/fa"
import { useState, useEffect } from "react"

export default function ModalSuccess({status, message}) {
    const [show, setShow] = useState(status)
    useEffect(() => {
        setTimeout(() => {setShow(false)}, 2000)
    },[])
    return(
        <div 
            id="popup-modal" 
            tabIndex="-1" 
            className={`
                        overflow-y-auto 
                        overflow-x-hidden
                        fixed 
                        top-0 
                        right-0 
                        left-0 
                        z-50 
                        md:inset-0
                        h-modal 
                        md:h-full 
                        justify-center 
                        items-center 
                        flex
                        ${!show ? "hidden" : null}
                        `} 
            aria-modal="true" 
            role="dialog"
        >
            <div className="relative p-8 w-1/2 max-w-md h-full md:h-auto ">
                <div className="relative bg-slate-100 rounded-lg shadow dark:bg-gray-700 ">
                    <div className="p-6 text-center flex flex-col justify-center">
                        <div className="w-full h-auto flex items-center justify-center mb-5">
                            <FaCheck className="text-5xl text-green-600" />
                        </div>
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{message}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}