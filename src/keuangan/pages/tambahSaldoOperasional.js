import { useState } from "react";
import Button from "../../component/button";
import { useNavigate } from "react-router-dom";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import BreadCump from "../../component/breadCump"; 
import saldoOperasionalApi from "../../api/saldoOperasionalApi";
import dateFormat from "dateformat";
import { useDispatch, useSelector } from "react-redux";
import { clearErrorMessage } from "../../redux/feature/errorHandlingSlice";
import { clearSaldoOperasionalStatus } from "../../redux/feature/saldoOperasionalSlice";
import ErrorMsg from "../../component/errorMsg";
import SuccessMsg from "../../component/successMsg";
import handleChangeRupiah from "../../helpers/handleChangRupiah";
import normalizeBayar from "../../helpers/normalizeBayar";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import handleKeyPress from "../../helpers/handleKeyPress";
import routeName from "../../helpers/routeName";

export default function TambahSaldoOperasional() {
    const MySwal = withReactContent(Swal)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const statusSaldoOperasional = useSelector(state => state.saldoOperasional.tambah)
    const errorMessage = useSelector(state => state.errorHandling.getError)
    const titlesBreadCump = ["Keuangan", "Saldo Operasional"]
  
    const [tglTransaksi, setTglTransaksi] = useState("")
    const [kodeBank, setKodeBank] = useState("")
    const [noRekening, setNoRekening] = useState("")
    const [unit, setUnit] = useState("")
    const [saldoAkhir, setSaldoAkhir] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    
    const kembali = () => {
        navigate(routeName.saldoOperasional)
    }

    const handleTambahSaldoOperasional = async (event) => {
        event.preventDefault()
        dispatch(clearErrorMessage())
        dispatch(clearSaldoOperasionalStatus())
        setIsLoading(true)
        const payload = {
            "tglTransaksi": dateFormat(tglTransaksi, "isoDate") ,
            "kodeBank": kodeBank,
            "noRekening": noRekening,
            "unit": unit,
            "saldoAkhir": normalizeBayar(saldoAkhir),
        }
        dispatch(saldoOperasionalApi.postSaldoOperasional(payload))
        .then(() => {
            setIsLoading(false)
            setTglTransaksi("")
            setKodeBank("")
            setNoRekening("")
            setUnit("")
            setSaldoAkhir("")
            MySwal.fire({
                icon: "success",
                title: "Data Saldo Operasional Berhasil Ditambahkan",
            })
        })
        .catch((err) => {
            setIsLoading(false)
            MySwal.fire({
                icon: "error",
                title: "Gagal Menambahkan Data Operasional",
              });
        })
    }
 
    return(
        <div className="p-9 rounded-lg h-full w-full">
            <div className="
                            flex 
                            flex-row 
                            justify-between 
                            items-center 
                            border-b 
                            border-gray-200 
                            dark:border-gray-700 
                            p-4
                            mt-14 
                            mb-4 
                            rounded 
                            bg-gray-50
                            "
            >
                <h1 className="text-lg font-extrabold dark:text-white">Tambah Saldo Operasional</h1>
                <BreadCump titles={titlesBreadCump} />
            </div>
            <div className="p-9 bg-gray-50 rounded w-full h-fit">
                <div className="">
                    <Button title="Kembali" color="red"  handleFunction={kembali} />
                </div>             
                <p className="mb-5">Lengkapi data dibawah ini, perhatikan setiap input yang dilakukan</p>
                <div className="outline outline-1 outline-gray-300 w-full">

                </div> 
                <div className="md:grid md:grid-cols-2 gap-4 w-full h-auto flex flex-col">
                    <div className="w-full h-64 md:h-full p-4 rounded">
                        <FullCalendar
                            plugins={[ dayGridPlugin ]}
                            initialView="dayGridMonth"
                            height={"100%"}
                            events={[
                                { title: 'Posting', date: '2023-02-01' },
                                { title: 'Pending', date: '2023-02-02' }
                            ]}
                        />
                    </div>


                    <div className="flex h-auto  justify-between items-center p-4 mb-4 rounded bg-gray-50">
                        <form className="w-full" onSubmit={handleTambahSaldoOperasional}>
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
                                <label htmlFor="noRekening" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nomor Rekening</label>
                                <input 
                                        type="text" 
                                        id="noRekening" 
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
                                        value={noRekening}
                                        onKeyDown={handleKeyPress}
                                        onChange={(e) => {setNoRekening(e.target.value)}}
                                        required
                                />
                                <p className="mt-2 text-sm"><span className="font-medium">Exp: 1328282393398</span> Input harus berupa angka</p>
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

                            <Button type="submit" title="Tambahkan" width={"w-full"} isLoading={isLoading} />
                        </form>
                    </div>
                </div>              
            </div>
        </div>
    )
}