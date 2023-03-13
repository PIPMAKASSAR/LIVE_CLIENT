import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/navbar";
import logo from "../LOGO-PIP.png"
import { clearErrorMessage } from "../redux/feature/errorHandlingSlice";
import routeName from "../helpers/routeName";

export default function Layout() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')
    const [isSideOpen, setIsSideOpen] = useState(true)
    const errMessage = useSelector(state => state.errorHandling.getError)


    useEffect(() => {
        if(!token) {
            localStorage.clear('token')
            localStorage.clear('user')   
            navigate(routeName.login)
        } 

        if(token) {
            const expirationTime = JSON.parse(atob(token.split('.')[1])).exp;
            const currentTime = new Date().getTime() / 1000;
        
            if (currentTime > expirationTime) {
                localStorage.removeItem('token');
                navigate(routeName.login)
            }
        }
    },[token])

    const handleSideBar = ()  => {
        setIsSideOpen(!isSideOpen)
    }
    return(
        <div className="flex w-full h-screen bg-gray-300">
            <Navbar handleSideBar={handleSideBar} isSideOpen={isSideOpen}  logo={logo} />
            <div className={`ml-0 ${isSideOpen ? `lg:ml-64` : `null` } w-full overflow-y-auto`}>
                <Outlet />
            </div>
        </div>
    )
}