import {IoIosArrowForward} from "react-icons/io"

export default function BreadCump({titles}) {
    return(
        
        <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                    <a className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                        Home
                    </a>
                </li>
                {
                    titles ? 
                    titles.map((item, index) => {
                        return(
                            <li key={index}>
                                <div className="flex items-center">
                                    <IoIosArrowForward className="w-6 h-6 text-gray-400" />
                                    <a 
                                        className="
                                                    ml-1 
                                                    text-sm 
                                                    font-medium 
                                                    text-gray-700 
                                                    hover:text-blue-600 
                                                    md:ml-2 
                                                    dark:text-gray-400 
                                                    dark:hover:text-white
                                                    "
                                    >
                                        {item}
                                    </a>
                                </div>
                            </li>
                        )
                    })
                    :
                    <li></li>
                }
            </ol>
        </nav>

    )
}