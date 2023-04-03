import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import InputFieldAngka from "../../component/inputFieldAngka"
import routeName from "../../helpers/routeName"
import Button from "../../component/button"

import Select2DetailBelanja from "../../component/select2DetailBelanja"
import keuanganPendapatanApi from "../../api/keuanganPendapatanApi"
import BreadCump from "../../component/breadCump"
import validator from "validator"
import normalizeBayar from "../../helpers/normalizeBayar"
import handleChangeRupiah from "../../helpers/handleChangRupiah"
import autoGenerateKodetransaksi from "../../helpers/autoGenerateKodetransaks"
import rupiah from "../../helpers/rupiah"
import dateFormat from "dateformat"

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import InputFieldNumberFloat from "../../component/inputFieldNumberFloat"


export default function TambahKeuanganPendapatan() {
    const MySwal = withReactContent(Swal)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const titlesBreadCump = [ "Master","Pendaptan/Tarif"]
    const [tanggal, setTanggal] = useState("")
    const [kodeTransaksi, setKodeTransaksi] = useState("")
    const [kodeAkun, setKodeAkun] = useState({value:'', label:"silahkan pilih kode akun"})
    const [harga, setHarga] = useState("")
    const [uraian, setUraian] = useState("")
    const [satuan, setSatuan] = useState("0")
    const [total,setTotal] = useState("")
    const [loading, setLoading] = useState(false)
    const [validUraian, setValidUraian] = useState("")
    const [newTransaksi, setNewTransaksi] = useState(true)
    const [lastKodeTransaksi, setLastKodeTransaksi] = useState("")

    const handleKembali = () => {
        navigate(routeName.keuanganPendapatan)
    }

    const hitungTotal = () => {
        if(satuan === "0") {
            setTotal("0")
        } else {
            const hargaTarif = normalizeBayar(harga)
            const result = parseInt(hargaTarif) * parseFloat(satuan) 
          
            setTotal(rupiah(result))
        }
    }

    const handleHarga = (data) => {
        const harga= handleChangeRupiah(data)
        setHarga(harga)
    }

    const handleTambah = async (event) => {
        event.preventDefault()
        setLoading(true)
        try {
            const payload = {
                "tanggal" :dateFormat(tanggal, "isoDate"), 
                "kodeTransaksi": kodeTransaksi,
                "kodeAkun" :kodeAkun.value, 
                "uraian" :uraian, 
                "harga": normalizeBayar(harga), 
                "satuan": satuan, 
                "total" : normalizeBayar(total)
            }
            if(kodeAkun.value == '' || !kodeAkun.value) {
                MySwal.fire({
                    icon: "error",
                    title: "Anda harus membuat/mengisi detail belanja terlebih dahulu",
                });
            } else if(satuan === "0" || satuan === 0) {
                MySwal.fire({
                    icon: "error",
                    title: "Anda harus mengisi satuan terlebih dahulu",
                });
            } else {
                const result = await keuanganPendapatanApi.postListKeuanganPendapatan(payload)
                if(result) {
                    setLoading(false)
                    setUraian("")
                    setTanggal("")
                    setKodeAkun({value:'', label:"silahkan pilih kode akun"})
                    setSatuan("0")
                    setTotal("")
                    setHarga("")
                    setNewTransaksi(!newTransaksi)
                    MySwal.fire({
                        icon: "success",
                        title: "Berhasil Menambahkan Data Keuangan Pendapatan", 
                    })
                }
                else {
                    setLoading(false)
                    MySwal.fire({
                        icon: "error",
                        title: "Gagal Menambahkan Data Keuangan Pendapatan",
                    });
                } 
            }
        }
        catch(error) {
            MySwal.fire({
                icon: "error",
                title: error.message,
            });
        }
    }

    const handleKodeTransaksi = async (data) => {
        try {
            let kodeCreate = null
            const result = await keuanganPendapatanApi.getLastKodeTransaksi()
            if(result.length > 0) {
                const splitKode = result[0]["kode_transaksi"].split('/')
                const num = splitKode[3]
                const type = "pendapatan"
                kodeCreate = autoGenerateKodetransaksi(num, data, type)
                setKodeTransaksi(kodeCreate)
            } else {
                kodeCreate = autoGenerateKodetransaksi("0000", data)
                setKodeTransaksi(kodeCreate)

            }
            setTanggal(data)
        }
        catch(error) {
            MySwal.fire({
                icon: "error",
                title: error.message,
            });
        }
    }

    useEffect(() => {
        hitungTotal()
    },[satuan,harga])

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
                            <div className="flex gap-5">
                                <div className="mb-6">
                                    <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tanggal Transaksi</label>
                                    <div className="relative max-w-sm">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
                                        </div>
                                        <input 
                                                type="date" 
                                                className="
                                                            bg-gray-50 
                                                            border 
                                                            border-gray-300 
                                                            text-gray-900 
                                                            text-sm 
                                                            rounded-lg 
                                                            focus:ring-blue-500 
                                                            focus:border-blue-500 
                                                            block 
                                                            mx:w-48  
                                                            pl-10 
                                                            p-2.5 
                                                            " 
                                                placeholder="Select date"
                                                value={tanggal}
                                                onChange={(e) => {handleKodeTransaksi(e.target.value)}} 
                                                required
                                        />
                                    </div>
                                </div> 
                                <div className="mb-6 mx-w-xl">
                                    <label htmlFor="kodeTransaksi" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kode Transaksi:</label>
                                    <input 
                                            type="text" 
                                            id="kodeTransaksi" 
                                            className="
                                                        block 
                                                        w-full 
                                                        p-3 
                                                        text-gray-900 border 
                                                        border-gray-300 
                                                        rounded-lg 
                                                        bg-gray-50 
                                                        sm:text-xs 
                                                        focus:ring-blue-500 
                                                        focus:border-blue-500 
                                                    "
                                            value={kodeTransaksi}
                                            disabled
                                            required
                                    />
                                </div>
                            </div>
                            <div className="mb-6 w-full">
                                <label htmlFor="total" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kode akun:</label>
                                <Select2DetailBelanja value={kodeAkun} setValue={setKodeAkun} setHarga={handleHarga} setUraian={setUraian} />
                            </div>
                            <div className="mb-6 w-full">
                                <label htmlFor="Harga" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Harga</label>
                                <input 
                                        type="text" 
                                        id="Harga" 
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
                                        disabled
                                        required
                                />
                                <p className="mt-2 text-sm"><span className="font-medium">Exp:Rp. 570.000</span> Input harus berupa angka</p>
                            </div>
                            <InputFieldNumberFloat title={"Satuan"} value={satuan} setValue={setSatuan} />
                            {/* <InputFieldAngka title={"Satuan"} value={satuan} setValue={setSatuan} /> */}
                            <div className="mb-6 w-full">
                                <label htmlFor="total" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total:</label>
                                <input 
                                        type="text" 
                                        id="Harga" 
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
                                        value={total}
                                        disabled
                                        required
                                />
                            </div>
                            <Button type="submit" title="Tambahkan" width={"w-full"} isLoading={loading} />
                        </form>
                    </div>   
                </div>
            </div>
        </div>
    )
}