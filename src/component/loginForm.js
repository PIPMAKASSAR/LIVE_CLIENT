import React, {useState} from "react";
import ButtonLogin from "./buttonLogin";
import ErrorMsg from "./errorMsg";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri"
import login from "../api/loginApi";
import { useNavigate } from "react-router-dom";
import logo from "../LOGO-PIP.png"
import routeName from "../helpers/routeName";
import validator from "validator";

export default function LoginForm() {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [erroMsg, setErrorMsg] = useState('')

    const handleLogin = async (event) => {
        setIsLoading(true)
        setIsError(false)
        event.preventDefault()
       
        if (!validator.isAlpha(username, "en-US")) {
            setErrorMsg("Username harus berupa abjad");
            setIsLoading(true)
        } else if (/select|insert|update|delete|drop table|create table|alter table/i.test(username)) {
            setErrorMsg("Username tidak bisa berupa SQL");
            setIsLoading(true)
        } else if (/[<>{}()[\]%&@!$#^|\\/*?"=]/i.test(username)) {
            setErrorMsg("Username tidak boleh memakai simbol");
            setIsLoading(true)
        } else if(!validator.isLength(password, { min: 8 })) {
            setIsLoading(true)
            setIsError(true)
            setErrorMsg("Password harus lebih atau minimal 8 karakter")
        } else {
            try {
                 const payload = {
                        username : validator.blacklist(username, "\b(ALTER|CREATE|DELETE|DROP|EXEC|INSERT|MERGE|SELECT|UPDATE)\b"),
                        password : validator.blacklist(password, "\b(ALTER|CREATE|DELETE|DROP|EXEC|INSERT|MERGE|SELECT|UPDATE)\b")
                }
                setErrorMsg('')
                const result = await login(payload)
                if(result.token) {
                    setIsLoading(false)
                    navigate(routeName.dashboard)
                } else if(!result.status) {
                    setIsLoading(false)
                    setIsError(true)
                    setErrorMsg(result.message)
                }
            }  
            catch(err) {
                setIsLoading(false)
                setIsError(true)
                setErrorMsg(err.message)
            }
        }
    }

    return(
        <div className="">
            <div className="flex flex-col gap-2 mb-5">
                <div className="flex items-center mb-3 visible sm:invisible ">
                    <img src={logo} className="h-8 mr-3" alt="FlowBite Logo" />
                    <span className="visible sm:hidden font-extrabold leading-none tracking-tigh" >NAVICAMPUS</span>
                </div>
                <span className="text-xl font-bold">Login</span>
                <span className="text-xs">Silahkan masuk menggunakan akun anda terlebih dahulu</span>
            </div>
            <form onSubmit={handleLogin}>
                {
                    isError ? <ErrorMsg message={erroMsg} /> : null
                }
                <div className="mb-6">
                    <label 
                            htmlFor="username" 
                            className="
                                        block 
                                        mb-2 
                                        text-sm 
                                        font-medium 
                                        text-gray-900 
                                        "
                    >
                        Username
                    </label>
                    <input 
                            type="text" 
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="
                                        block 
                                        w-full 
                                        p-2 
                                        text-gray-900 
                                        border 
                                        border-gray-300 
                                        rounded-lg 
                                        bg-gray-50 
                                        sm:text-xs 
                                        focus:ring-blue-500 
                                        focus:border-blue-500
                                        "
                    />
                </div>
                <div className="mb-6">
                    <label 
                            htmlFor="password" 
                            className="
                                        block 
                                        mb-2 
                                        text-sm 
                                        font-medium 
                                        text-gray-900 
                                        "
                    >
                        Password
                    </label>
                    <div className="relative">
                        <input 
                                type={ showPassword ? "text" : "password" }
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="
                                block 
                                w-full 
                                p-2 
                                text-gray-900 
                                border 
                                border-gray-300 
                                rounded-lg 
                                bg-gray-50 
                                sm:text-xs 
                                focus:ring-blue-500 
                                focus:border-blue-500
                                "
                        />
                        <div 
                                className="
                                            absolute 
                                            right-2.5
                                             bottom-2.5
                                            flex 
                                            items-center 
                                            pl-3
                                            cursor-pointer
                                             "
                                onClick={() => setShowPassword(!showPassword)}
                        >
                            {
                                showPassword ? <RiEyeLine /> : <RiEyeCloseLine />
                            }
                        </div>
                    </div>
                </div>
                <div>
                    <ButtonLogin title="Login" width={"w-full"} isLoading={isLoading} />
                </div>
            </form>
        </div>
    )
}