import BreadCump from "../component/breadCump"
import Button from "../component/button"
import { useNavigate } from "react-router-dom"
import routeName from "../helpers/routeName"
import InputFieldAngka from "../component/inputFieldAngka"
import InputFieldText from "../component/inputFieldText"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import pendapatanApi from "../api/pendapatanApi"
import validator from "validator"


import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";


export default function TambahPendapatan() {
    const MySwal = withReactContent(Swal)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const titlesBreadCump = [ "Master","Pendaptan/Tarif"]
    const [uraian, setUraian] = useState("")
    const [kodePendapatan, setKodePendapatan] = useState("")
    const [loading, setLoading] = useState(false)
    const jenisData = ["header", "detail"]
    const [validUraian, setValidUraian] = useState("")

    const handleKembali = () => {
        navigate(routeName.pendapatan)
    }

    const handleTambah = async (event) => {
        event.preventDefault()
        setLoading(true)
        setValidUraian("")
        try {

            if (!validator.isLength(uraian, { min: 2 })) {
                setValidUraian("Uraian minimal panjang 2 huruf");
                setLoading(false)
            } else if (/select|insert|update|delete|drop table|create table|alter table/i.test(uraian)) {
                setValidUraian("Uraian tidak bisa berupa SQL");
                setLoading(false)
            } else if (/[<>{}()[\]%&@!$#^|*?"=]/i.test(uraian)) {
                setValidUraian("Uraian tidak boleh memakai simbol");
                setLoading(false)
            } else {
                const payload = {
                    uraian : uraian,
                    kodeAkun: kodePendapatan
                }
                const result = await pendapatanApi.postPendapatan(payload)
                if(result) {
                    setLoading(false)
                    setUraian("")
                    setKodePendapatan("")
                    setValidUraian(null)
                    MySwal.fire({
                        icon: "success",
                        title: "Berhasil Menambahkan Master Pendapatan", 
                    })
                }
                else {
                    setLoading(false)
                    MySwal.fire({
                        icon: "error",
                        title: "Gagal Menambahkan Master Pendapatan",
                    });
                }
            }
        }
        catch(error) {
            console.log(error)
            MySwal.fire({
                icon: "error",
                title: error.message,
            });
        }
    }

    return(
        <div className="p-4 w-full h-full overflow-y-auto" >
            <div className="p-4 rounded-lg mt-14 " >
                <div className="flex flex-row justify-between items-center border-b dark:border-gray-700 p-4 mb-4 rounded bg-gray-50">
                    <h1 className="text-lg font-extrabold dark:text-white">Tambah Pendapatan/Tarif</h1>
                    <BreadCump titles={titlesBreadCump} />
                </div>
                <div className="flex flex-col h-auto  p-9 mb-4 rounded bg-gray-50 dark:bg-gray-800">
                    <div className="mb-5">
                        <Button title={"Kembali"} color={"red"} handleFunction={handleKembali} />
                    </div>
                    <div className="lg:mx-72">
                        <form onSubmit={handleTambah} >
                            <InputFieldAngka title={"Kode Pendapatan"} value={kodePendapatan} setValue={setKodePendapatan} />
                            <InputFieldText title={"Uraian"} value={uraian} setValue={setUraian} isError={validUraian} keterangan={`tidak boleh menggunakan symbol '<>{}[\]%&@!$#^|\\/*?"='`} />
                            <Button type="submit" title="Tambah Pendapatan/Tarif" width={"w-full"} isLoading={loading} />
                        </form>
                    </div>   
                </div>
            </div>
        </div>
    )
}