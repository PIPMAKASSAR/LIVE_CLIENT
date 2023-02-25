import rupiah from "../helpers/rupiah"

export default function ModalDetail( {showModal, setShowModal, data, title} ) {
    console.log("ini d modal guys", data)
    return (
        <div 
            id="popup-modal" 
            tabIndex="-1" 
            className={`
                        overflow-y-auto 
                        overflow-x-hidden
                        bg-gray-200/40
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
                        ${!showModal ? "hidden" : null}
                        `} 
            aria-modal="true" 
            role="dialog"
            >
                <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button type="button" 
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
                            onClick={() => setShowModal(false)}
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
                    </button>
                    <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"> 
                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                {/* ini template colom detail */}
                                {
                                    data &&
                                    title.map((item, index) => {
                                        if(item === "status_update") {
                                            return(
                                                <div className="py-3 sm:py-4">
                                                    <div key={index} className="flex items-center space-x-4">
                                                        <label htmlFor="small-input" className="text-sm font-medium text-gray-900 truncate dark:text-white">status:</label>            
                                                        <span className="text-sm font-bold text-green-500 truncate dark:text-gray-400">{data[item]}</span>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        if(item === "bayar") {
                                            return(
                                                <div className="py-3 sm:py-4">
                                                    <div key={index} className="flex items-center space-x-4">
                                                        <label htmlFor="small-input" className="text-sm font-medium text-gray-900 truncate dark:text-white">Nilai:</label>            
                                                        <span className="text-sm  text-gray-500 truncate dark:text-gray-400">{rupiah(data[item], "Rp.")}</span>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        return(
                                            <div className="py-3 sm:py-4">
                                                <div key={index} className="flex items-center space-x-4">
                                                    <label htmlFor="small-input" className="text-sm font-medium text-gray-900 truncate dark:text-white">{item}:</label>            
                                                    <span className="text-sm text-gray-500 truncate dark:text-gray-400">{data[item]}</span>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                        </div>
                    </div>
                    </div>
                </div>
            </div>
    )
} 