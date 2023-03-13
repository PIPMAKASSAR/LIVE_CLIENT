import Button from "../../component/button";
import ButtonDropdown from "../../component/buttonDropdown";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import BreadCump from "../../component/breadCump";
import penerimaanApi from "../../api/penerimaanApi";
import SuccessMsg from "../../component/successMsg";
import ErrorMsg from "../../component/errorMsg";
import { successMessage, clearErrorMessage } from "../../redux/feature/errorHandlingSlice";
import { clearPenerimaanStatus } from "../../redux/feature/penerimaSlice";
import dateFormat from "dateformat";
import "./tambahForm.css"
import rupiah from "../../helpers/rupiah";
import handleChangeRupiah from "../../helpers/handleChangRupiah";
import normalizeBayar from "../../helpers/normalizeBayar";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import routeName from "../../helpers/routeName";
import handleKeyPress from "../../helpers/handleKeyPress";
import Select2Akun from "../../component/select2Akun";


export default function TambahPenerimaan() {
    const MySwal = withReactContent(Swal)
    const titlesBreadCump = ["Keuangan", "Penerimaan"]
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const errorMessage = useSelector(state => state.errorHandling.getError)
    const statusPenerimaan = useSelector(state => state.penerimaan.tambah)
    const [tglTransaksi, setTglTransaksi] = useState("")
    const [kodeAkun, setKodeAkun] = useState("")
    const [bayar, setBayar] = useState("")
    const [jnsTransaksi, setJnsTransaksi] = useState("Penerimaan")
    const [nilaiRupiah, setNilaiRupian] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const kembali = () => {
        navigate(routeName.penerima)
    }

    const handlePostPenerimaan = async (event) => {
        event.preventDefault()
        dispatch(clearPenerimaanStatus())
        dispatch(clearErrorMessage())
        setIsLoading(true)
        if(!kodeAkun) {
            MySwal.fire({
                icon: "error",
                title: "Isi kode akun terlebih dahulu",
            });
            setIsLoading(false)
        } else {
            const payload = {
                tangalTransaksi: dateFormat(tglTransaksi, "isoDate") ,
                kodeAkun:kodeAkun.value.kode,
                namaAkun: kodeAkun.value.uraian,
                bayar:normalizeBayar(bayar),
                jnsTransaksi:jnsTransaksi,
            }
            dispatch(penerimaanApi.postTambahPenerimaan(payload))
            .then(() => {
                setIsLoading(false)
                setTglTransaksi("")
                setKodeAkun("")
                setBayar("")
                MySwal.fire({
                    icon: "success",
                    title: "Data Penerimaan Berhasil Ditambahkan",
                })
            })
            .catch((err) => {
                setIsLoading(false)
                MySwal.fire({
                    icon: "error",
                    title: "Gagal Menambahkan Data Penerimaan",
                  });
                
            })
        }
    }

    useEffect(() => {
        handleChangeRupiah(bayar)
    },[bayar])

  
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
                <h1 className="text-lg font-extrabold dark:text-white">Penerimaan</h1>
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
                    <div className="w-full h-full p-4 rounded">
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
                        <form className="w-full" onSubmit={handlePostPenerimaan}>
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
                                            onChange={(e) => setTglTransaksi(e.target.value)} 
                                            required
                                    />
                                </div>
                            </div>        
                            
                            <div className="mb-6 w-full">
                                <label htmlFor="KodeAkun" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kode Akun</label>
                                <Select2Akun value={kodeAkun} setValue={setKodeAkun} />
                                {/* <input 
                                        type="text" 
                                        id="KodeAkun" 
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
                                        value={kodeAkun}
                                        onKeyDown = {handleKeyPress}
                                        onChange={(e) => setKodeAkun(e.target.value)}
                                        required 
                                /> */}
                                {/* <p className="mt-2 text-sm"><span className="font-medium">Exp: 544467</span> Input harus berupa angka</p> */}
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
                            <Button type="submit" title="Tambahkan" width={"w-full"} isLoading={isLoading} />
                        </form>

                    </div>
                </div>              
            </div>
        </div>
        
    )
}