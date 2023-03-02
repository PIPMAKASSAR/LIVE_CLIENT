import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import logo from "../LOGO-PIP.png"
import LoginForm from "../component/loginForm"
import ResetPassForm from "../component/ResetPassForm"
import "./login.css"
import routeName from "../helpers/routeName"

export default function Login () {
    const navigate = useNavigate()
    const [isForget, setIsForget] = useState(false)

    useEffect(() => {
        if(localStorage.getItem('token')) {
            navigate(routeName.dashboard)
        }
    }, [])
    return(
        <div className="w-screen h-screen grid place-content-center">         
            <div className="
                            w-screen
                            flex 
                            flex-col
                            items-center
                            bg-white border 
                            border-gray-200 
                            rounded-lg 
                            shadow
                            md:flex-row 
                            md:max-w-xl
                            "
            >
                <div className="
                                 sm:w-1/2 
                                 h-login
                                 rounded-l-lg
                                 sm:grid
                                 place-content-center 
                                 bg-blue-800
                                 hidden
                                 lg:visible
                                 "
                >
                    <img 
                            className="
                                        object-cover 
                                        h-96 
                                        md:h-auto 
                                        md:w-48 
                                        md:rounded-none 
                                        md:rounded-l-lg
                                        " 
                            src={logo} alt="" 
                    />
                    <div className="text-center text-zinc-50">
                        <h1 className="text-xl font-extrabold leading-none tracking-tight md:text-xl lg:text-2xl">
                            NAVICAMPUS
                        </h1>
                        <span className="mb-6 text-sm font-normal lg:text-md">BIOS Intergration System </span>
                    </div>
                </div>
                <div 
                        className="
                                    flex 
                                    flex-col 
                                    px-9 
                                    leading-normal
                                    rounded-r-lg
                                    h-full 
                                    sm:w-1/2
                                    w-full
                                    "
                >                
                    { isForget ? <ResetPassForm /> : <LoginForm />}
                    <div className="text-blue-700 text-xs mt-2">
                        <span onClick={() => setIsForget(!isForget)} className="cursor-pointer">
                           {isForget ? "kembali ke halaman login" : "Lupa Password"} 
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

