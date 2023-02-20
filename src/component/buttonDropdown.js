import { useEffect, useState } from "react"
import ModalDelete from "./modalDelete"

import ModalEdit from "./modalEdit"

export default function ButtonDropdown({title = "Button", width, color = "blue", type = "button", uuid, jnsTransaksi, category, data, handleDelete, showModalDel, setShowModalDel}) {
    const [isShow, setIsShow] = useState(false)
    const [showModalEdit, setShowModalEdit] = useState(false)

    return(
        <div className="relative">
            {
                showModalEdit ?
                <ModalEdit category={category} data={data} showModal={showModalEdit} setShowModal={setShowModalEdit} />
                :null
            }
            {
                showModalDel ?
                <ModalDelete category={category} showModal={showModalDel} setShowModal={setShowModalDel} uuid={uuid} jnsTransaksi={jnsTransaksi}  />
                : null
            }
            <button 
                    id="dropdownDefaultButton" 
                    data-dropdown-toggle="dropdown" 
                    className={`
                                text-white
                                ${width ? `${width}` : `w-auto`} 
                                ${`bg-yellow-300 hover:bg-yellow-400`} 
                                focus:ring-4 
                                focus:outline-none 
                                focus:ring-blue-300 
                                font-medium 
                                rounded-lg 
                                text-sm 
                                px-4 
                                py-2.5 
                                text-center 
                                inline-flex 
                                items-center 
                                `} 
                    type="button"
                    onClick={() => setIsShow(!isShow) }
            >
                {title} 
                <svg 
                    className="w-4 h-4 ml-2" 
                    aria-hidden="true" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            {/* <!-- Dropdown menu --> */}
            <div 
                id="dropdown" 
                className={`
                            absolute
                            z-10 
                            ${ isShow ? `block` : `hidden`} 
                            bg-white 
                            divide-y 
                            divide-gray-100 
                            rounded-lg 
                            shadow 
                            w-44 
                            dark:bg-gray-700`
                            }
                >
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                    <li onClick={() => setShowModalEdit(true)} >
                        <span 
                            className="
                                        block 
                                        px-4 
                                        py-2 
                                        hover:bg-gray-100 
                                        dark:hover:bg-gray-600 
                                        dark:hover:text-white"
                        >
                            Edit
                        </span>
                    </li>
                    <li onClick={() => setShowModalDel(true)} >
                        <span 
                            className="
                                        block 
                                        px-4 
                                        py-2 
                                        hover:bg-gray-100 
                                        dark:hover:bg-gray-600 
                                        dark:hover:text-white"
                        >
                            Hapus
                        </span>
                    </li>
                </ul>
            </div>
        </div>

    )
}