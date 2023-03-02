import pengeluaranApi from "../api/pengeluaranApi";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "./button";
import dateFormat from "dateformat";
import { clearPengeluaranStatus } from "../redux/feature/pengeluaranSlice";
import { clearErrorMessage } from "../redux/feature/errorHandlingSlice";
import handleChangeRupiah from "../helpers/handleChangRupiah";
import normalizeBayar from "../helpers/normalizeBayar";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import handleKeyPress from "../helpers/handleKeyPress";
import Select2AkunEdit from "./select2AkunEdit";

export default function FormEditPengeluaran ({data, reload, setReload}) {
    const akun = {
        kode: data["kode_akun"],
        uraian: data["nama_akun"]
    }
    const MySwal = withReactContent(Swal)
    const dispatch = useDispatch()
    const [uuid, setUuid] = useState(data["uuid"])
    const [tglTransaksi, setTglTransaksi] = useState("")
    const [kodeAkun,setKodeAkun] = useState("")
    const [bayar,setBayar] = useState("")
    const [jnsTransaksi, setJnsTransaksi] = useState("Pengeluaran")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setUuid(data["uuid"])
        setTglTransaksi(dateFormat(data["tgl_transaksi"], "yyyy-mm-dd"))
        setKodeAkun(akun)
        setBayar(handleChangeRupiah(data["bayar"]))
    },[data])

    const handleEdit = (event) => {
        event.preventDefault()
        dispatch(clearPengeluaranStatus())
        dispatch(clearErrorMessage())
        setIsLoading(true)
        const payload = {
            uuid: uuid,
            tangalTransaksi: dateFormat(tglTransaksi, "isoDate") ,
            kodeAkun:kodeAkun.kode,
            namaAkun:kodeAkun.uraian,
            bayar:normalizeBayar(bayar),
            jnsTransaksi:jnsTransaksi,
        }
        dispatch(pengeluaranApi.putPengeluaran(payload))
        .then(() => {
            setIsLoading(false)
            setReload(!reload)
            MySwal.fire({
                icon: "success",
                title: "Data Pengeluaran Berhasil Di Edit",
            })
        })
        .catch((err) => {
            setIsLoading(false)
            MySwal.fire({
                icon: "error",
                title: "Gagal Mengedit Data Pengeluaran",
              });
        })
    }
    
    return(
        <div className="p-6">
           
            <form className="w-full" onSubmit={handleEdit}>
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
                                            w-full 
                                            pl-10 
                                            p-2.5 
                                            dark:bg-gray-700 
                                            dark:border-gray-600 
                                            dark:placeholder-gray-400 
                                            dark:text-white 
                                            dark:focus:ring-blue-500 
                                            dark:focus:border-blue-500
                                            " 
                                placeholder={tglTransaksi}
                                value={tglTransaksi}
                                onChange={(e) => setTglTransaksi(e.target.value)} 
                                required
                        />
                    </div>
                </div>        

                <div className="mb-6 w-full">
                    <label htmlFor="KodeAkun" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kode Akun</label>
                    <Select2AkunEdit value={kodeAkun} setValue={setKodeAkun} category={"pengeluaran"} />
                </div>

                <div className="mb-6 w-full">
                    <label htmlFor="nilai" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nilai</label>
                    <input 
                            type="text" 
                            id="nilai" 
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
                            value={bayar}
                            onChange={(e) => setBayar(handleChangeRupiah(e.target.value))}
                            required
                    />
                    <p className="mt-2 text-sm"><span className="font-medium">Exp:Rp. 570.000</span> Input harus berupa angka</p>
                </div>

                <Button type="submit" title="Edit" width={"w-full"} isLoading={isLoading} />
            </form>
        </div>
    )
}