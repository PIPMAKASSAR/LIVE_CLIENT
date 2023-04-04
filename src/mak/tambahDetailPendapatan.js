import BreadCump from "../component/breadCump"
import Button from "../component/button"
import { useNavigate, useParams } from "react-router-dom";
import routeName from "../helpers/routeName"
import InputFieldAngka from "../component/inputFieldAngka"
import InputFieldText from "../component/inputFieldText"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import pendapatanApi from "../api/pendapatanApi"
import validator from "validator"
import Select2HeaderDetailBelanja from "../component/select2HeaderDetailBelanja";
import InputSelect from "../component/inputSelect";


import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import handleChangeRupiah from "../helpers/handleChangRupiah";
import normalizeBayar from "../helpers/normalizeBayar";


export default function TambahDetailPendapatan() {
    const {uuid, akunPendapatan} = useParams()
    const MySwal = withReactContent(Swal)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const titlesBreadCump = [ "Master","Pendaptan/Tarif", "Detail Pendapatan"]
    const [jenis, setJenis] = useState({value:"header",label:"header"})
    const [header, setHeader] = useState({value:"-", label:"silahkan pilih header"})
    const [uraian, setUraian] = useState("")
    const [kodeAkun, setKodeAkun] = useState("")
    const [harga, setHarga] = useState("0")
    const [loading, setLoading] = useState(false)
    const [reload, setReload] = useState(true)
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
    const [validUraian, setValidUraian] = useState("")

    const handleKembali = () => {
        navigate(`/detail-pendapatan/tarif/${uuid}`)
    }

    const handleTambah = async (event) => {
        event.preventDefault()
        setLoading(true)
        setValidUraian("")
        try {
            if(jenis.value === 'detail' && header.value === '-'){
                setLoading(false)
                MySwal.fire({
                    icon: "error",
                    title: "Maaf, Detail harus mempunyai kode header",
                });
            } else if (!validator.isLength(uraian, { min: 2 })) {
                setValidUraian("Uraian minimal panjang 2 huruf");
                setLoading(false)
            } else if (/select|insert|update|delete|drop table|create table|alter table/i.test(uraian)) {
                setValidUraian("Uraian tidak bisa berupa SQL");
                setLoading(false)
            } else if (/[<>{}%@!$#^|*?"'=]/i.test(uraian)) {
                setValidUraian("Uraian tidak boleh memakai simbol");
                setLoading(false)
            } else {
                if(header.value === '-') {
                    const payload = {
                        akunPendapatan : akunPendapatan,
                        jenis: jenis.value,
                        kodeUp: header.value,
                        kodeAkun: `${akunPendapatan}.${kodeAkun}`,
                        uraian: uraian,
                        harga: normalizeBayar(harga),
                    }
                    const result = await pendapatanApi.postDetailPendapatan(payload)
                    if(result.status) {
                        setLoading(false)
                        setReload(!reload)
                        setJenis({value:"header",label:"header"})
                        setHeader({value:"-", label:"silahkan pilih header"})
                        setUraian("")
                        setKodeAkun("")
                        setHarga("0")
                        setValidUraian(null)
                        MySwal.fire({
                            icon: "success",
                            title: "Berhasil Menambahkan detail pendpatan belanja", 
                        })
                    }
                    else {
                        setLoading(false)
                        MySwal.fire({
                            icon: "error",
                            title: "Gagal Menambahkan detail pendpatan belanja",
                        });
                    }
                } else {
                    const payload = {
                        akunPendapatan : akunPendapatan,
                        jenis: jenis.value,
                        kodeUp: header.value,
                        kodeAkun: `${header.value}.${kodeAkun}`,
                        uraian: uraian,
                        harga: normalizeBayar(harga),
                    }
                    const result = await pendapatanApi.postDetailPendapatan(payload)
                    if(result.status) {
                        setLoading(false)
                        setReload(!reload)
                        setJenis({value:"header",label:"header"})
                        setHeader({value:"-", label:"silahkan pilih header"})
                        setUraian("")
                        setKodeAkun("")
                        setHarga("0")
                        setValidUraian(null)
                        MySwal.fire({
                            icon: "success",
                            title: "Berhasil Menambahkan detail pendapatan", 
                        })
                    }
                    else {
                        setLoading(false)
                        MySwal.fire({
                            icon: "error",
                            title: "Gagal Menambahkan detail pendpatan",
                        });
                    }
                }
            }
        }
        catch(error) {
            console.log(error)
            setLoading(false)
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
                    <h1 className="text-lg font-extrabold dark:text-white">Tambah Detail Pendapatan/Tarif</h1>
                    <BreadCump titles={titlesBreadCump} />
                </div>
                <div className="flex flex-col h-auto  p-9 mb-4 rounded bg-gray-50 dark:bg-gray-800">
                    <div className="mb-5">
                        <Button title={"Kembali"} color={"red"} handleFunction={handleKembali} />
                    </div>
                    <div className="lg:mx-72">
                        <form onSubmit={handleTambah} >
                            <InputSelect title={"jenis"} data={jenisData} value={jenis} setValue={setJenis} />
                            <div className={`mb-6 w-full`}>
                                <label htmlFor="KodeAkun" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kode Header</label>  
                                <Select2HeaderDetailBelanja value={header} setValue={setHeader} uuid={uuid} reload={reload} />
                            </div>
                            <InputFieldText title={"Kode Akun"} value={kodeAkun} setValue={setKodeAkun} />
                            <InputFieldText title={"Uraian"} value={uraian} setValue={setUraian} isError={validUraian} />
                            {
                                jenis.value === "detail" ?
                                <div className="mb-6 w-full">
                                    <label htmlFor="harga" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Harga</label>
                                    <input 
                                            type="text" 
                                            id="harga" 
                                            className="
                                                        block 
                                                        w-full 
                                                        p-2 
                                                        text-gray-900 border 
                                                        border-gray-300 
                                                        rounded-lg 
                                                        bg-gray-50 
                                                        sm:text-xs 
                                                        focus:ring-blue-500 
                                                        focus:border-blue-500 
                                                    "
                                            value={harga}
                                            onChange={(e) => setHarga(handleChangeRupiah(e.target.value))}
                                    />
                                    <p className="mt-2 text-sm"><span className="font-medium">Exp:Rp. 570.000</span> Input harus berupa angka</p>
                                </div>
                                :
                                null
                            }
                            <Button type="Simpan" title="Tambah Pendapatan/Tarif" width={"w-full"} isLoading={loading} />
                        </form>
                    </div>   
                </div>
            </div>
        </div>
    )
}