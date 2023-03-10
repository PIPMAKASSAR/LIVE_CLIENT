import { useEffect, useState } from "react"
import {ImCross} from "react-icons/im"

export default function ModalFaill({status}) {
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
            // onClick={() => setShowModal(!showModal)}
        >
            <div className="relative p-8 w-1/2 max-w-md h-full md:h-auto ">
                <div className="relative bg-slate-100 rounded-lg shadow dark:bg-gray-700 ">
                    {/* <button type="button" 
                            className="
                                        absolute 
                                        top-3 
                                        right-2.5 
                                        text-gray-400 
                                        bg-transparent 
                                        hover:bg-gray-200 
                                        hover:text-gray-900 
                                        rounded-lg 
                                        text-sm 
                                        p-1.5 
                                        ml-auto 
                                        inline-flex 
                                        items-center 
                                        dark:hover:bg-gray-800 
                                        dark:hover:text-white
                                        " 
                            data-modal-toggle="popup-modal"
                            onClick={() => setShowModal(!showModal)}
                    >
                        <svg 
                                aria-hidden="true" 
                                className="w-5 h-5" 
                                fill="currentColor" 
                                viewBox="0 0 20 20" 
                                xmlns="http://www.w3.org/2000/svg"
                        >
                            <path 
                                    fillRule="evenodd" 
                                    d="
                                        M4.293 4.293a1 
                                        1 
                                        0 
                                        011.414 
                                        0L10 
                                        8.586l4.293-4.293a1 
                                        1 
                                        0 
                                        111.414 
                                        1.414L11.414 
                                        10l4.293 
                                        4.293a1 
                                        1 
                                        0 
                                        01-1.414 
                                        1.414L10 
                                        11.414l-4.293 
                                        4.293a1 
                                        1 
                                        0 
                                        01-1.414-1.414L8.586 
                                        10 
                                        4.293 
                                        5.707a1 
                                        1 
                                        0 
                                        010-1.414z" 
                                    clipRule="evenodd">
                            </path>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button> */}
                    <div className="p-6 text-center flex flex-col justify-center">
                        <div className="w-full h-auto flex items-center justify-center mb-5">
                            <ImCross className="text-5xl text-red-600" />
                        </div>
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Maaf gagal</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}