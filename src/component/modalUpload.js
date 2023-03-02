import { useState } from "react";
import Button from "./button";
import FileInput from "./fileInput";
import InputFieldUraian from "./inputFieldUraian";
import satkerApi from "../api/satkerApi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function ModalUpload({title, show, setShow, titleForm, handleFunction, reload, setReload}) {
    const MySwal = withReactContent(Swal)
    const [selectedFile, setSelectedFile] = useState("")
    const [isLoading, setIsLoading ] = useState (false)

    const handleSend = (event) => {
        event.preventDefault()
        setIsLoading(true)
        const fileReader = new FileReader()
        
        fileReader.readAsDataURL(selectedFile)
        fileReader.onload = () => {
            const base64String =fileReader.result.split(",")[1]
            satkerApi.uploadFileSatker(base64String)
            .then((result) => {
                setIsLoading(false)
                setSelectedFile(null)
                setReload(!reload)
                MySwal.fire({
                    icon: "success",
                    title: "Data berhasil di upload",
                })
            })
            .catch((err) => {
                setIsLoading(false)
                MySwal.fire({
                    icon: "error",
                    title: "Gagal mengupload data",
                });
                
            })
        }
    }

    return(
        <div 
            id="popup-modal" 
            tabIndex="-1" 
            className={`
                fixed 
                top-0 
                left-0 
                right-0 
                z-50
                ${!show ? "hidden": ""} 
                w-full 
                p-4 
                overflow-x-hidden 
                overflow-y-auto 
                md:inset-0 
                h-modal 
                md:h-full
                justify-center 
                flex
                pt-32
                bg-slate-400/40 
                `}
            aria-modal="true" 
        >
            <div className="relative w-full h-full max-w-md md:h-auto">
                {/* <!-- Modal content --> */}
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button 
                        type="button" 
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
                            dark:hover:text-white" 
                        data-modal-hide="authentication-modal"
                        onClick={handleFunction}>
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="px-6 py-6 lg:px-8">
                        <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">{titleForm}</h3>
                        <form className="space-y-6" onSubmit={handleSend}>
                            <InputFieldUraian title={"Keterangan Periode Upload"} />
                            <FileInput title={"Upload File"} setValue={setSelectedFile} />
                            <Button type="submit" title="Upload" width={"w-full"} isLoading={isLoading} />
                        </form>
                    </div>
                </div>
            </div>
        </div> 
    )
}