import { useNavigate } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import InputFieldAngka from "../../component/inputFieldAngka"
import routeName from "../../helpers/routeName"
import Button from "../../component/button"
import LoadingSpinner from "../../component/loadingSpinner"

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


import bkuApi from "../../api/bkuApi"
import TableLaporanBelanja from "../../component/tableLaporanBelanja"



export default function LaporanBelanja() {
    const MySwal = withReactContent(Swal)
    const titlesBreadCump = [ "Laporan","Belanja"]
    const [periodeAwal, setPeriodeAwal] = useState("")
    const [periodeAkhir, setPeriodeAkhir] = useState("")
    const tableRef = useRef(null);
    const [data, setData] = useState([])
    const [loadingCetakPreview, setLoadingCetakPreview] = useState(false)

   
    const handleCetakPreview = async () => {
        try{
            setLoadingCetakPreview(true)
            if(!periodeAwal || !periodeAkhir){
                setLoadingCetakPreview(false)
                MySwal.fire({
                    icon: "error",
                    title: "Mohon untuk mengisi periode terlebih dahulu",
                });
                return Promise
            }
            const payload = {
                periodeAwal,
                periodeAkhir
            }
            const result = await bkuApi.getLaporanBelanja(payload)
            if(result.data.length > 0) {
                const resultData = result.data
                
                for(let i = 0; i < resultData.length; i++) {
                    const jumlahConvert = await rupiah(resultData[i]["jumlah"])
                    const ppnConvert = await rupiah(resultData[i]["ppn"])
                    const pajakPph21Convert = await rupiah(resultData[i]["pajak_pph21"])
                    const pajakPph22Convert =await rupiah(resultData[i]["pajak_pph22"])
                    const pajakPph23Convert =await rupiah(resultData[i]["pajak_pph23"])
                    const pajakPphFinalConvert = await rupiah(resultData[i]["pajak_pphfinal"])

                    resultData[i]["jumlah"] = jumlahConvert
                    resultData[i]["ppn"] = ppnConvert
                    resultData[i]["pajak_pph21"] = pajakPph21Convert
                    resultData[i]["pajak_pph22"] = pajakPph22Convert
                    resultData[i]["pajak_pph23"] = pajakPph23Convert
                    resultData[i]["pajak_pphfinal"] = pajakPphFinalConvert 


                    if(resultData[i]["jumlah_bersih"] < 0) {
                        let num = resultData[i]["jumlah_bersih"];
                        num = Math.abs(num);
                        resultData[i]["jumlah_bersih"] = `(${rupiah(num)})`
                    } else {
                        const jumlahBersih = await rupiah(resultData[i]["jumlah_bersih"])
                        resultData[i]["jumlah_bersih"] = jumlahBersih
                    }
                }    
                
                setLoadingCetakPreview(false)
                setData(resultData)
            } else {
                setLoadingCetakPreview(false)
                throw ({message: "Periode yang anda pilih belum ada data tersimpan"})
            }
        }
        catch(err) {
            setLoadingCetakPreview(false)
            setData([])
            console.log(err)
            MySwal.fire({
                icon: "error",
                title: err.message,
            });
        }
    }

    return(
        <div className="p-4 w-full h-full overflow-y-auto " >
            <div className="p-4 rounded-lg mt-14 h-full" >
                <div className="flex flex-row justify-between items-center border-b dark:border-gray-700 p-4 mb-4 rounded bg-gray-50">
                    <h1 className="text-lg font-extrabold dark:text-white">Laporan Belanja</h1>
                    <BreadCump titles={titlesBreadCump} />
                </div>
                <div className="grid w-full p-9 mb-4 rounded bg-gray-50 dark:bg-gray-800">
                    <div className="">
                        <div className="mb-6 flex gap-3 items-center">
                            <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Periode Awal :</label>
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
                                        value={periodeAwal}
                                        onChange={(e) => {setPeriodeAwal(e.target.value)}} 
                                        required
                                />
                            </div>
                        </div>
                        <div className="mb-6 flex gap-3 items-center">
                            <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Periode Akhir :</label>
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
                                        value={periodeAkhir}
                                        onChange={(e) => {setPeriodeAkhir(e.target.value)}} 
                                        required
                                />
                            </div>
                        </div>
                        <div className="w-full">
                            <Button title="Preview" width={"w-fit"} handleFunction={handleCetakPreview}/>         
                        </div> 
                    </div>
                    {
                        loadingCetakPreview ?
                        <LoadingSpinner />
                        : data.length > 0 &&
                        <TableLaporanBelanja 
                            data={data} 
                            tableRef={tableRef} 
                            periodeAwal={periodeAwal} 
                            periodeAkhir={periodeAkhir} 
                        />   
                    }
                </div>
            </div>
        </div>
    )
}