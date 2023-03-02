import { useState } from "react"
import { json, Link, useNavigate } from "react-router-dom"
import { dataSidebar } from "../helpers/dataSidebar"
import {CgProfile} from "react-icons/cg"
import routeName from "../helpers/routeName"

export default function Navbar({handleSideBar, logo, isSideOpen}) {
    const userData = JSON.stringify(localStorage.getItem("user"))
    const navigate = useNavigate()
    const [showDrop, setShowDrop] = useState(false)
    const [showNavbarKeuangan, setShowNavbarKeuangan] = useState(false)
    const [showNavbar, setShowNavbar] =useState(false)
    const [selectedRow, setSelectedRow] = useState(null);

    const handleToggleSubTable = (index) => {
        if (index === selectedRow) {
            setSelectedRow(null);
          } else {
            setSelectedRow(index);
          }
      };

    const handleDropdown = () => {
        setShowDrop(!showDrop)
    }

    const handleShowNavbar = () => {
        setShowNavbar(!showNavbar)
        setShowNavbarKeuangan(!setShowNavbarKeuangan)
    }
    const handleNavbarKeuangan = () => {
        setShowNavbarKeuangan(!showNavbarKeuangan)
    }

    const handleLogout = () => {
        localStorage.clear()
        navigate(routeName.login)
    }
    return(
        <div>
            <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start">
                            <button 
                                    data-drawer-target="logo-sidebar" 
                                    data-drawer-toggle="logo-sidebar" 
                                    aria-controls="logo-sidebar" 
                                    type="button" 
                                    className="
                                                invisible
                                                inline-flex 
                                                items-center
                                                p-2 
                                                text-sm 
                                                text-slate-500 
                                                rounded-lg  
                                                hover:bg-blue-700
                                                hover:text-slate-50 
                                                focus:outline-none 
                                                focus:ring-2 
                                                focus:ring-gray-200
                                                xl:visible 
                                                "
                                    onClick={handleSideBar}
                            >
                                <span className="sr-only">Open sidebar</span>
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                            <div className="flex ml-2 md:mr-24">
                                <img src={logo} className="h-8 mr-3" alt="FlowBite Logo" />
                                <span className="self-center text-xl font-extrabold sm:text-2xl whitespace-nowrap dark:text-white">NAVICAMPUS</span>
                            </div>
                        </div>
                        <div className="flex items-center">
                        <div className="flex items-center ml-3">
                            <div>
                                <button 
                                    type="button" 
                                    className="
                                        flex 
                                        text-sm 
                                        rounded-full 
                                        focus:ring-4 
                                        focus:ring-gray-300 
                                        dark:focus:ring-gray-600" 
                                        aria-expanded="false" 
                                        data-dropdown-toggle="dropdown-user"
                                        onClick={handleShowNavbar}
                            >
                                    <span className="sr-only">Open user menu</span>
                                    <CgProfile className="w-8 h-8 rounded-full" />
                                </button>
                            </div>
                            <div 
                                className={`
                                    ${!showNavbar ? "hidden" : ""}
                                    absolute
                                    top-12 
                                    right-0
                                    xl:hidden 
                                    my-4 
                                    text-base 
                                    list-none 
                                    bg-white 
                                    divide-y 
                                    divide-gray-100 
                                    rounded 
                                    shadow 
                                    `} 
                                    id="dropdown-user"
                            >
                                <ul className="py-1" role="none">
                                    {
                                        dataSidebar ? 
                                        dataSidebar.map((menu, index) => {
                                            if(menu.subMenu) {
                                                return(
                                                    <li key={index}>
                                                        <button 
                                                            onClick={handleNavbarKeuangan} 
                                                            type="button" 
                                                            className="
                                                                flex 
                                                                items-center 
                                                                w-full 
                                                                p-2 
                                                                text-base 
                                                                font-normal 
                                                                text-gray-900 
                                                                transition duration-75 
                                                                rounded-lg group 
                                                                hover:bg-gray-100 
                                                                " 
                                                                aria-controls="dropdown-example" 
                                                                data-collapse-toggle="dropdown-example"
                                                        >
                                                            <span className="flex-1 ml-3 text-left whitespace-nowrap" >{menu.name}</span>
                                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                                        </button>
                                                        <ul id="dropdown-example" className={`${!showNavbarKeuangan ? "hidden" : ""} py-2 space-y-2`}>
                                                            {
                                                                menu.subMenu.map((sub, index) => {
                                                                    return(
                                                                        <Link key={index} to={sub.link} >
                                                                            <span className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">{sub.name}</span>
                                                                        </Link>
                                                                    )
                                                                })
                                                            }
                                                            
                                                            
                                                        </ul>
                                                    </li>
                                                )
                                            } else {
                                                <Link key={index} to={menu.link} >
                                                    <span 
                                                        className="
                                                                    block 
                                                                    px-4 
                                                                    py-2 
                                                                    text-sm 
                                                                    text-gray-700 
                                                                    hover:bg-gray-100 
                                                                    dark:text-gray-300 
                                                                    dark:hover:bg-gray-600 
                                                                    dark:hover:text-white" 
                                                        role="menuitem"
                                                >
                                                    {menu.name}
                                                    </span>
                                                </Link>
                                            }
                                        })
                                        :null
                                    }
                                    
                                    <li>
                                        <a 
                                            href="#" 
                                            className="
                                                        block 
                                                        px-4 
                                                        py-2 
                                                        text-sm
                                                        cursor-pointer 
                                                        text-gray-700 
                                                        hover:bg-gray-100 
                                                        "
                                            role="menuitem"
                                            onClick={handleLogout}
                                        >
                                            Sign Out
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Sidebar */}
            <aside id="logo-sidebar" 
                    className={`
                                fixed
                                invisible
                                xl:visible 
                                top-0 
                                left-0 
                                z-40 
                                w-64 
                                h-screen 
                                pt-20
                                ${isSideOpen ? `translate-x-0  ` : `-translate-x-full `} 
                                transition-transform  
                                bg-white 
                                border-r 
                                border-gray-200 
                                dark:bg-gray-800 
                                dark:border-gray-700
                                `} 
                    aria-label="Sidebar"
                >
                    <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                        <ul className="space-y-2">
                            {
                                dataSidebar ? 
                                dataSidebar.map((menu, index) => {
                                    if(menu.subMenu) {
                                        return(
                                            <li key={index}>
                                                <button onClick={() => handleToggleSubTable(index)} type="button" className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                                                    <span className="flex-1 ml-3 text-left whitespace-nowrap">{menu.name}</span>
                                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                                </button>
                                                {
                                                    selectedRow === index && 
                                                    <ul id="dropdown-example" className={`py-2 space-y-2`}>
                                                        {
                                                            menu.subMenu.map((sub, index) => {
                                                                return(
                                                                    <Link key={index} to={sub.link} >
                                                                        <span className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">{sub.name}</span>
                                                                    </Link>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                }
                                            </li>
                                        )
                                    } else {
                                        return (
                                            <Link key={index} to={menu.link} >
                                                <span 
                                                    className="
                                                                block 
                                                                px-4 
                                                                py-2 
                                                                text-sm 
                                                                text-gray-700 
                                                                hover:bg-gray-100 
                                                                dark:text-gray-300 
                                                                dark:hover:bg-gray-600 
                                                                dark:hover:text-white" 
                                                    role="menuitem"
                                            >
                                                {menu.name}
                                                </span>
                                            </Link>
                                        )
                                    }
                                })
                                :null
                            }
                            
                            <li onClick={handleLogout} >
                                <a className="flex cursor-pointer items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <span className="flex-1 ml-3 whitespace-nowrap">Keluar</span>
                                </a>
                            </li>
                        </ul>
                    </div>
            </aside>
        </div>
        
    )
}