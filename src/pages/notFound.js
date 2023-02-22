import React from "react";
import notFoundPic from "../404.png"
import Button from "../component/button";
import { useNavigate } from "react-router-dom";
export default function NotFound() {
    const navigate = useNavigate()
    const handleBackToDashboard = () => {
        navigate('/testing')
    }

    return(
        <div className="">
            <div className="flex flex-col items-center">
                <img src={notFoundPic} />
                <div className="font-bold text-md xl:text-xl 2xl:text-2xl mb-3">
                    <span>Maaf, halaman yang anda tuju tidak ditemukan</span>
                </div>
                <Button handleFunction={handleBackToDashboard} title={"Kembali Ke Dashboard"} />
            </div>
        </div>
    )
}