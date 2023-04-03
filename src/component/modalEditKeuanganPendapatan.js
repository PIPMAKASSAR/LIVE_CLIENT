import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Select2DetailBelanja from "./select2DetailBelanja";
import Button from "./button";
import keuanganPendapatanApi from "../api/keuanganPendapatanApi";
import InputFieldAngka from "./inputFieldAngka";
import handleChangeRupiah from "../helpers/handleChangRupiah";
import normalizeBayar from "../helpers/normalizeBayar";
import rupiah from "../helpers/rupiah";
import dateFormat from "dateformat";
import InputFieldNumberFloat from "./inputFieldNumberFloat";


export default function ModalEditKeuanganPendapatan ({showModal, setShowModal, data, reload, setReload}) {
    const MySwal = withReactContent(Swal)
  
    const [uuid,setUuid] = useState("")
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

    const handleEdit = async (event) => {
        event.preventDefault()
        setLoading(true)
        console.log('ini',uuid)
        try {
            const payload = {
                "uuid":uuid,
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
                const result = await keuanganPendapatanApi.updateListKeuanganPendapatan(payload)
                if(result) {
                    setLoading(false)
                    setReload(!reload)
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
            console.log(error)
            MySwal.fire({
                icon: "error",
                title: error.message,
            });
        }
    }

    async function getRomanNumeral(num) {
        const romanNumerals = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
        return romanNumerals[num];
    }
    
    async function dateWithRomanMonth(date) {
        const month = await getRomanNumeral(date.getMonth() + 1); // getMonth() returns 0-based index
        const day = date.getDate();
        const year = date.getFullYear();
        return {
            month,
            year
        }
    }

    const handleKodeTransaksi = async (data) => {    
        try {
            const date = new Date(data)
            const romawi = await dateWithRomanMonth(date)
            if(romawi && kodeTransaksi) {
                const arr = kodeTransaksi.split('/')
                arr[1] = romawi.month
                arr[2] = romawi.year
                setKodeTransaksi(arr.join('/'))
            }
            setTanggal(data)
        }
        catch(error) {
            console.log(error)
            MySwal.fire({
                icon: "error",
                title: error.message,
            });
        }
    }


    useEffect(() => {
        hitungTotal()
    },[satuan,harga])
    
    useEffect(() => {
        setUuid(data['uuid'])
        setTanggal(dateFormat(data["tanggal"], "yyyy-mm-dd"))
        setKodeTransaksi(data['kode_transaksi'])
        setKodeAkun({value:data['kode_akun']})
        setUraian(data["uraian"])
        setHarga(handleChangeRupiah(data['tarif']))
        setSatuan(data['satuan'])
        setTotal(handleChangeRupiah(data['total']))
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
                            <Button type="submit" title="Edit" width={"w-full"} isLoading={loading} />
                            </form>
                        </div>
                </div>
            </div>
        </div>
    )
    : <span>Loading</span>
}