import BreadCump from "../component/breadCump"
import Button from "../component/button"
import { useNavigate } from "react-router-dom"
import routeName from "../helpers/routeName"
import InputFieldAngka from "../component/inputFieldAngka"
import InputFieldUraian from "../component/inputFieldUraian"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import penerimaanPihakTigaApi from "../api/penerimaanPihakTigaApi"
import validator from "validator"


import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import InputFieldText from "../component/inputFieldText"


export default function TambahPenerimaPihakTiga() {
    const MySwal = withReactContent(Swal)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const titlesBreadCump = [ "Master","Penerima / Pihak Ketiga"]
    const [nama, setNama] = useState("")
    const [rekening, setRekening] = useState("")
    const [npwp, setNpwp] = useState("")
    const [loading, setLoading] = useState(false)
    const jenisData = ["header", "detail"]
    const [validNama, setValidNama] = useState("")

    const handleKembali = () => {
        navigate(routeName.listPenerimaPihakTiga)
    }

    const handleTambah = (event) => {
        event.preventDefault()
        setLoading(true)
        setValidNama("")
        if (!validator.isLength(nama, { min: 2 })) {
            setValidNama("Nama minimal panjang 2 huruf");
            setLoading(false)
        } else if (!validator.isAlpha(nama, "en-US")) {
            setValidNama("Nama harus berupa abjad");
            setLoading(false)
        } else if (/select|insert|update|delete|drop table|create table|alter table/i.test(nama)) {
            setValidNama("Nama tidak bisa berupa SQL");
            setLoading(false)
        } else if (/[<>{}()[\]%&@!$#^|\\/*?"=]/i.test(nama)) {
            setValidNama("Nama tidak boleh memakai simbol");
            setLoading(false)
        } else {
            const payload = {
                nama : validator.blacklist(nama, "\b(ALTER|CREATE|DELETE|DROP|EXEC|INSERT|MERGE|SELECT|UPDATE)\b"),
                rekening,
                npwp
            }
            dispatch(penerimaanPihakTigaApi.postPihakKetiga(payload))
            .then(() => {
                setLoading(false)
                setNama("")
                setNpwp("")
                setRekening("")
                setValidNama(null)
                MySwal.fire({
                    icon: "success",
                    title: "Berhasil Menambahkan Penerima/Pihak Ketiga", 
                })
            })
            .catch((error) => {
                setLoading(false)
                MySwal.fire({
                    icon: "error",
                    title: "Gagal Menambahkan Penerima/Pihak Ketiga",
                  });
            })
        }
        

    }

    return(
        <div className="p-4 w-full h-full overflow-y-auto" >
            <div className="p-4 rounded-lg mt-14 " >
                <div className="flex flex-row justify-between items-center border-b dark:border-gray-700 p-4 mb-4 rounded bg-gray-50">
                    <h1 className="text-lg font-extrabold dark:text-white">Tambah Penerima/Pihak Ketiga</h1>
                    <BreadCump titles={titlesBreadCump} />
                </div>
                <div className="flex flex-col h-auto  p-9 mb-4 rounded bg-gray-50 dark:bg-gray-800">
                    <div className="mb-5">
                        <Button title={"Kembali"} color={"red"} handleFunction={handleKembali} />
                    </div>
                    <div className="lg:mx-72">
                        <form onSubmit={handleTambah} >
                            <InputFieldText title={"Nama"} value={nama} setValue={setNama} isError={validNama} />
                            <InputFieldAngka title={"Nomor Rekening"} value={rekening} setValue={setRekening} />
                            <InputFieldAngka title={"NPWP"} value={npwp} setValue={setNpwp} />
                            <Button type="submit" title="Tambah Penerimaan/Pihak Ketiga" width={"w-full"} isLoading={loading} />
                        </form>
                    </div>   
                </div>
            </div>
        </div>
    )
}