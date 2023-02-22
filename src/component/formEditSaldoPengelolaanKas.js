import saldoPengelolaanKasApi from "../api/saldoPengelolaanKasApi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "./button";
import dateFormat from "dateformat";
import SuccessMsg from "./successMsg";
import ErrorMsg from "./errorMsg";
import { clearSaldoPengelolaanKasStatus } from "../redux/feature/saldoPengelolaanKasSlice";
import { clearErrorMessage } from "../redux/feature/errorHandlingSlice";
import handleChangeRupiah from "../helpers/handleChangRupiah";
import normalizeBayar from "../helpers/normalizeBayar";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import handleKeyPress from "../helpers/handleKeyPress";

export default function FormEditSaldoPengelolaanKas () {
    const MySwal = withReactContent(Swal)
    const data = useSelector(state => state.saldoPengelolaanKas.item)
    const dispatch = useDispatch()
    const statusSaldoPengelolaanKas = useSelector(state => state.saldoPengelolaanKas.edit)
    const statusError = useSelector(state => state.errorHandling.getError)
  
    const [uuid, setUuid] = useState(data["uuid"])
    const [tglTransaksi, setTglTransaksi] = useState(data["tgl_transaksi"])
    const [kodeBank, setKodeBank] = useState(data["kdbank"])
    const [noBilyet, setNoBilyet] = useState("")
    const [nilaiDeposito, setNilaiDeposito] = useState("")
    const [nilaiBunga, setNilaiBunga] = useState("") 
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setUuid(data["uuid"])
        setTglTransaksi(dateFormat(data["tgl_transaksi"], "yyyy-mm-dd"))
        setKodeBank(data["kdbank"])
        setNoBilyet(data["no_bilyet"])
        setNilaiDeposito(handleChangeRupiah(data["nilai_deposito"]))
        setNilaiBunga(handleChangeRupiah(data["nilai_bunga"]))
     
    },[data])

    const handleEdit = (event) => {
        event.preventDefault()
        dispatch(clearSaldoPengelolaanKasStatus())
        dispatch(clearErrorMessage())
        setIsLoading(true)
        const payload = {
            "uuid" : uuid,
            "tglTransaksi": dateFormat(tglTransaksi, "isoDate") ,
            "kodeBank": kodeBank,
            "noBilyet": noBilyet,
            "nilaiDeposito": normalizeBayar(nilaiDeposito),
            "nilaiBunga": normalizeBayar(nilaiBunga)
        }
        dispatch(saldoPengelolaanKasApi.putSaldoPengelolaanKas(payload))
        .then(() => {
            setIsLoading(false)
            MySwal.fire({
                icon: "success",
                title: "Data Saldo Pengelolaan Kas Berhasil Di Edit",
            })
        })
        .catch((err) => {
            setIsLoading(false)
            MySwal.fire({
                icon: "error",
                title: "Gagal Mengedit Data Saldo Pengelolaan Kas",
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
                    <input 
                            type="text" 
                            id="kodeBank" 
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
                            value={kodeBank}
                            onKeyDown={handleKeyPress}
                            onChange={(e) => {setKodeBank(e.target.value)}}
                    />
                    <p className="mt-2 text-sm"><span className="font-medium">Exp: 424111</span> Input harus berupa angka</p>
                </div>

                <div className="mb-6 w-full">
                    <label htmlFor="noBilyet" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nomor Bilyet</label>
                    <input 
                            type="text" 
                            id="noBilyet" 
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
                            value={noBilyet}
                            onKeyDown={handleKeyPress}
                            onChange={(e) => {setNoBilyet(e.target.value)}}
                            required
                    />
                    <p className="mt-2 text-sm"><span className="font-medium">Exp: 1328282393398</span> Input harus berupa angka</p>
                </div>

                <div className="mb-6 w-full">
                    <label htmlFor="nilaiDeposito" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nilai Deposito</label>
                    <input 
                            type="text" 
                            id="nilaiDeposito" 
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
                            value={nilaiDeposito}
                            onChange={(e) => {setNilaiDeposito(handleChangeRupiah(e.target.value))}}
                            required
                            
                    />
                    <p className="mt-2 text-sm"><span className="font-medium">Exp:Rp. 570.000</span> Input harus berupa angka</p>
                </div>
                <div className="mb-6 w-full">
                    <label htmlFor="nilaiBunga" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nilai Bunga</label>
                    <input 
                            type="text" 
                            id="nilaiBunga" 
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
                            value={nilaiBunga}
                            onChange={(e) => {setNilaiBunga(handleChangeRupiah(e.target.value))}}
                            required
                            
                    />
                    <p className="mt-2 text-sm"><span className="font-medium">Exp:Rp. 570.000</span> Input harus berupa angka</p>
                </div>

                <Button type="submit" title="Edit" width={"w-full"} isLoading={isLoading} />
            </form>
        </div>
    )
}