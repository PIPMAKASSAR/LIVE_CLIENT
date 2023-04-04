import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Button from "./button";
import pendapatanApi from "../api/pendapatanApi";
import InputFieldAngka from "./inputFieldAngka";
import InputFieldText from "./inputFieldText";
import validator from "validator";


export default function ModalEditMasterPendapatan ({showModal, setShowModal, data, reload, setReload}) {
    const MySwal = withReactContent(Swal)
    const [validUraian, setValidUraian] = useState("")
    const [uuid,setUuid] = useState("")
    const [uraian, setUraian] = useState("")
    const [kodePendapatan, setKodePendapatan] = useState("")
    
    const [loading, setLoading] = useState(false)

    const handleEdit = (event) => {
        event.preventDefault()
        setLoading(true)
        if (!validator.isLength(uraian, { min: 2 })) {
            setValidUraian("uraian minimal panjang 2 huruf");
            setLoading(false)
        } else if (/select|insert|update|delete|drop table|create table|alter table/i.test(uraian)) {
            setValidUraian("uraian tidak bisa berupa SQL");
            setLoading(false)
        } else if (/[<>{}[\]%&@!$#^|\\/*?"=]/i.test(uraian)) {
            setValidUraian("uraian tidak boleh memakai simbol");
            setLoading(false)
        } 
        else {
            const payload = {
                uuid,
                uraian : uraian,
                kodeAkun: kodePendapatan
            }
            pendapatanApi.updatePendapatan(payload)
            .then(() => {
                setLoading(false)
                setReload(!reload)
                setValidUraian(null)
                MySwal.fire({
                    icon: "success",
                    title: "Data Master Pendapatan Berhasil Di Edit",
                })
            })
            .catch((err) => {
                setLoading(false)
                setReload(!reload)
                MySwal.fire({
                    icon: "error",
                    title: err.message,
                });
            })
        }
    }
    
    useEffect(() => {
        setUuid(data['uuid'])
        setUraian(data["uraian"])
        setKodePendapatan(data["kode_akun"])

    },[data])
    
    return data ? (
        <div 
            id="popup-modal" 
            tabIndex="-1" 
            className={`
                        overflow-x-hidden 
                        overflow-y-auto
                        bg-slate-400/40 
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
                        w-full  
                        flex
                        ${!showModal ? "hidden" : null}
                        `} 
            aria-modal="true" 
            role="dialog"
        >
            <div className="relative p-4 w-1/2 h-auto ">
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
                        <div className={` p-6 `}>
                            <form className="w-full flex flex-col flex-nowrap" onSubmit={handleEdit}>
                            <InputFieldAngka title={"Kode Pendapatan"} value={kodePendapatan} setValue={setKodePendapatan} />
                            <InputFieldText title={"Uraian"} value={uraian} setValue={setUraian} isError={validUraian} keterangan={`tidak boleh menggunakan symbol '<>{}[\]%&@!$#^|\\/*?"='`} />
                            <Button type="submit" title="Edit" width={"w-full"} isLoading={loading} />
                            </form>
                        </div>
                </div>
            </div>
        </div>
    )
    : <span>Loading</span>
}