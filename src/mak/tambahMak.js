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
import InputFieldText from "../component/inputFieldText"
import validator from "validator"


export default function TambahMak() {
    const MySwal = withReactContent(Swal)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const headersMak = useSelector(state => state.mak.listHeader)
    const titlesBreadCump = ["Master","Mak"]
    const [jenis, setJenis] = useState({value:"header",label:"header"})
    const [header, setHeader] = useState({value:"-", label:"silahkan pilih"})
    const [kodeMak, setKodeMak] = useState("")
    const [uraian, setUraian] = useState("")
    const [loading, setLoading] = useState(false)
    const [validKodeMak, setValidKodeMak] = useState(null)
    const [validUraian, setValidUraian] = useState(null)
    const jenisData = [
        {
            value:"header",
            label:"header"
        }, 
        {
            value:"detail",
            label:"detail"
        }
    ]
 
    const [reload, setReload] = useState(false)

    const handleKembali = () => {
        navigate(routeName.mak)
    }

    const handleTambahMak = (event) => {
        event.preventDefault()
        setLoading(true)
        if(jenis === "detail" && header.value === "-") {
            setLoading(false)
            MySwal.fire({
                icon: "error",
                title: "Gagal Menambahkan Mak, mohon mengisi semua inputan",
            });
        }
        else if (/select|insert|update|delete|drop table|create table|alter table/i.test(kodeMak)) {
            setValidKodeMak("Mak tidak bisa berupa SQL");
            setLoading(false)
        } else if (/[<>{}\%&@!$#^|\\*?"=]/i.test(kodeMak)) {
            setValidKodeMak("Mak tidak boleh memakai simbol <>,{},\,%,&,@,!,$,#,^,|,\,*,?,= ");
            setLoading(false)
        } else if (!validator.isLength(uraian, { min: 2 })) {
            setValidUraian("uraian minimal panjang 2 huruf");
            setLoading(false)
        } else if (/select|insert|update|delete|drop table|create table|alter table/i.test(uraian)) {
            setValidUraian("uraian tidak bisa berupa SQL");
            setLoading(false)
        } else if (/[<>{}\%&@!$#^|\\*?"=]/i.test(uraian)) {
            setValidUraian("uraian tidak boleh memakai simbol <>,{},\,%,&,@,!,$,#,^,|,\,*,?,= ");
            setLoading(false)
        } else {
            let makKode = null
            if(header.value === "-") {
                makKode = kodeMak
            } else if( header.value !== "-") {
                makKode =  header.value+"."+kodeMak 
            }
            const payload = {
                jenis: jenis.value,
                kodeMak:makKode,
                kodeUp: header.value,
                uraian: uraian,
            }
            dispatch(makApi.postMak(payload))
            .then(() => {
                setLoading(false)
                setHeader({value:"-", label:"silahkan pilih"})
                setJenis({value:"header",label:"header"})
                setKodeMak("")
                setUraian("")
                setValidKodeMak(null)
                setValidUraian(null)
                setReload(!reload)
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

    }

    useEffect(() => {
        dispatch(makApi.getMakHeader())
    },[reload])
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
                            <div className="flex md:justify-center gap-5 w-full">
                                <div className="w-1/2">
                                    <InputSelect title={"Jenis"} data={jenisData} value={jenis} setValue={setJenis} position={true} />
                                </div>
                                <div className="w-1/2">
                                    <InputSelectHeader title={"Header"} defaultValue={"Pilih Header"} value={header} setValue={setHeader} category={"header"} data={headersMak} position={true} />
                                </div>
                            </div>
                                {
                                    jenis.value !== "detail" ?
                                    header.value !== "-" ?
                                    <div className="flex items-end gap-2">
                                        <div className="mb-6 max-w-sm">
                                            <label htmlFor="KodeMak" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kode MAK</label>
                                            <input 
                                                    type="text" 
                                                    id="KodeMak" 
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
                                                    value={header.value+"."}
                                                    disabled
                                                    required 
                                            />
                                            <div className="mt-2" ></div>
                                        </div>
                                        <InputFieldText title={""} value={kodeMak} setValue={setKodeMak} isError={validKodeMak} width={"max-w-sm"} />
                                    </div>
                                    :
                                    <InputFieldText title={"Kode MAK"} value={kodeMak} setValue={setKodeMak} isError={validKodeMak} />
                                    :
                                    null
                                }
                                
                            <InputFieldUraian title={"Uraian"} value={uraian} setValue={setUraian} isError={validUraian} />
                            <Button type="submit" title="Tambah MAK" width={"w-full"} isLoading={loading} />
                        </form>
                    </div>   
                </div>
            </div>
        </div>
    )
}