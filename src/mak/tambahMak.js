import BreadCump from "../component/breadCump"
import Button from "../component/button"
import { useNavigate } from "react-router-dom"
import routeName from "../helpers/routeName"
import InputFieldAngka from "../component/inputFieldAngka"
import InputFieldUraian from "../component/inputFieldUraian"
import InputSelect from "../component/inputSelect"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import makApi from "../api/makApi"
import InputSelectHeader from "../component/inputSelectHeader"
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import TextFieldNoRequired from "../component/textFieldNoRequred"


export default function TambahMak() {
    const MySwal = withReactContent(Swal)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const headersMak = useSelector(state => state.mak.listHeader)
    const titlesBreadCump = ["Master","Mak"]
    const [jenis, setJenis] = useState("header")
    const [header, setHeader] = useState("-")
    const [kodeMak, setKodeMak] = useState("")
    const [uraian, setUraian] = useState("")
    const [loading, setLoading] = useState(false)
    const jenisData = ["header", "detail"]

    const handleKembali = () => {
        navigate(routeName.mak)
    }

    const handleTambahMak = (event) => {
        event.preventDefault()
        setLoading(true)
        const payload = {
            jenis: jenis,
            kodeMak: kodeMak,
            kodeUp: header.value || "-",
            uraian: uraian,
        }
        dispatch(makApi.postMak(payload))
        .then(() => {
            setLoading(false)
            setHeader("-")
            setJenis("header")
            setKodeMak("")
            setUraian("")
            MySwal.fire({
                icon: "success",
                title: "Berhasil Menambahkan Mak", 
            })
        })
        .catch((err) => {
            setLoading(false)
            MySwal.fire({
                icon: "error",
                title: "Gagal Menambahkan Mak",
              });
            
        })

    }

    useEffect(() => {
        dispatch(makApi.getMakHeader())
    },[])
    return(
        <div className="p-4 w-full h-full overflow-y-auto" >
            <div className="p-4 rounded-lg mt-14 " >
                <div className="flex flex-row justify-between items-center border-b dark:border-gray-700 p-4 mb-4 rounded bg-gray-50">
                    <h1 className="text-lg font-extrabold dark:text-white">Tambah Mak</h1>
                    <BreadCump titles={titlesBreadCump} />
                </div>
                <div className="flex flex-col h-auto  p-9 mb-4 rounded bg-gray-50 dark:bg-gray-800">
                    <div className="mb-5">
                        <Button title={"Kembali"} color={"red"} handleFunction={handleKembali} />
                    </div>
                    <div className="lg:mx-72">
                        <form onSubmit={handleTambahMak} >
                            <div className="flex md:justify-between w-full">
                                <InputSelect title={"Jenis"} data={jenisData} value={jenis} setValue={setJenis} />
                                <div className="w-80">
                                    <InputSelectHeader title={"Header"} defaultValue={"Pilih Header"} value={header} setValue={setHeader} category={"header"} data={headersMak} />
                                </div>
                            </div>
                            {/* <InputFieldAngka title={"Kode MAK"} value={kodeMak} setValue={setKodeMak} /> */}
                            <TextFieldNoRequired title={"Kode MAK"} value={kodeMak} setValue={setKodeMak} />
                            <InputFieldUraian title={"Uraian"} value={uraian} setValue={setUraian} />
                            <Button type="submit" title="Tambah MAK" width={"w-full"} isLoading={loading} />
                        </form>
                    </div>   
                </div>
            </div>
        </div>
    )
}