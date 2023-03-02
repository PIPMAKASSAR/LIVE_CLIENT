import saldoOperasionalApi from "../api/saldoOperasionalApi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "./button";
import dateFormat from "dateformat";
import SuccessMsg from "./successMsg";
import ErrorMsg from "./errorMsg";
import { clearSaldoOperasionalStatus } from "../redux/feature/saldoOperasionalSlice";
import { clearErrorMessage } from "../redux/feature/errorHandlingSlice";
import handleChangeRupiah from "../helpers/handleChangRupiah";
import normalizeBayar from "../helpers/normalizeBayar";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import handleKeyPress from "../helpers/handleKeyPress";
import Select2BankEdit from "./select2BankEdit";
import Select2RekeningEdit from "./select2RekeningEdit";

export default function FormEditSaldoOperasional ({data, reload, setReload}) {
    const bank = {
        kode: data["kdbank"],
        uraian: data["nama_bank"]
    }
    const rekening = {
        kode: data["no_rekening"],
        uraian:data["nama_rekening"]
    }
    const MySwal = withReactContent(Swal)
    const dispatch = useDispatch()
    const [uuid, setUuid] = useState("")
    const [tglTransaksi, setTglTransaksi] = useState("")
    const [kodeBank, setKodeBank] = useState("")
    const [noRekening, setNoRekening] = useState("")
    const [unit, setUnit] = useState("")
    const [saldoAkhir, setSaldoAkhir] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setUuid(data["uuid"])
        setTglTransaksi(dateFormat(data["tgl_transaksi"], "yyyy-mm-dd"))
        setKodeBank(bank)
        setNoRekening(rekening)
        setUnit(data["unit"])
        setSaldoAkhir(handleChangeRupiah(data["saldo_akhir"]))
    },[data])

    const handleEdit = (event) => {
        event.preventDefault()
        dispatch(clearSaldoOperasionalStatus())
        dispatch(clearErrorMessage())
        setIsLoading(true)
        const payload = {
            "uuid" : uuid,
            "tglTransaksi": dateFormat(tglTransaksi, "isoDate") ,
            "kodeBank": kodeBank.kode,
            "namaBank": kodeBank.uraian,
            "noRekening": noRekening.kode,
            "namaRekening": noRekening.uraian,
            "unit": unit,
            "saldoAkhir": normalizeBayar(saldoAkhir),
        }
        dispatch(saldoOperasionalApi.putSaldoOperasional(payload))
        .then(() => {
            setReload(!reload)
            setIsLoading(false)
            MySwal.fire({
                icon: "success",
                title: "Data Saldo Operasional Berhasil Di Edit",
            })
        })
        .catch((err) => {
            setIsLoading(false)
            MySwal.fire({
                icon: "error",
                title: "Gagal Mengedit Data Saldo Operasional",
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
                                        mx:w-48 
                                        pl-10 
                                        p-2.5 
                                        " 
                                    placeholder="Select date" 
                                    value={tglTransaksi}
                                    onChange={(e) => {setTglTransaksi(e.target.value)}}
                                    required    
                                />
                                    
                            </div>
                        </div>        
                        
                        <div className="mb-6 w-full">
                            <label htmlFor="kodeBank" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kode Bank</label>
                            <Select2BankEdit value={kodeBank} setValue={setKodeBank} />
                        </div>

                        <div className="mb-6 w-full">
                            <label htmlFor="noRekening" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nomor Rekening</label>
                            <Select2RekeningEdit value={noRekening} setValue={setNoRekening} />
                        </div>

                        <div className="mb-6 w-full">
                            <label htmlFor="unit" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Unit</label>
                            <input 
                                    type="text" 
                                    id="unit" 
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
                                    value={unit}
                                    onChange={(e) => {setUnit(e.target.value)}}
                                    required 
                            />
                            <p className="mt-2 text-sm"><span className="font-medium">Exp: Fakultas</span> Input harus berupa huruf</p>
                        </div>

                        <div className="mb-6 w-full">
                            <label htmlFor="saldoAkhir" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Saldo Akhir</label>
                            <input 
                                    type="text" 
                                    id="saldoAkhir" 
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
                                    value={saldoAkhir}
                                    onChange={(e) => {setSaldoAkhir(handleChangeRupiah(e.target.value))}}
                                    required
                                    
                            />
                            <p className="mt-2 text-sm"><span className="font-medium">Exp:Rp. 570.000</span> Input harus berupa angka</p>
                        </div>

                        <Button type="submit" title="Edit" width={"w-full"} isLoading={isLoading} />
                </form>
        </div>
    )
}