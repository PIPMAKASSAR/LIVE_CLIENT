import { useState, useRef } from "react"

import Button from "../../component/button"
import BreadCump from "../../component/breadCump"
import handleChangeRupiah from "../../helpers/handleChangRupiah"
import rupiah from "../../helpers/rupiah"
import dateFormat from "dateformat"

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import bkuApi from "../../api/bkuApi"
import TableBkuUmum from "../../component/tableBkuUmum"
import LoadingSpinner from "../../component/loadingSpinner"


export default function BkuUmum() {
    const MySwal = withReactContent(Swal)
    const titlesBreadCump = [ "Laporan","BKU Umum"]
    const [periodeAwal, setPeriodeAwal] = useState("")
    const [periodeAkhir, setPeriodeAkhir] = useState("")
    const tableRef = useRef(null);
    const promiseResolveRef = useRef(null);
    const [isPrinting, setIsPrinting] = useState(false);
    const [data, setData] = useState([])
    const [loadingExcel, setLoadingExcel] = useState(false)
    const [loadingPdf, setLoadingPdf] = useState(false)
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
            const result = await bkuApi.getListBkuUmum(payload)
            if(result.data.length > 0) {
                const resultData = result.data
                let totalKredit = 0
                let totalDebit = 0
                let totalUang = 0

                for(let i = 0; i < resultData.length; i++){
                    const tanggalFormat = dateFormat(resultData[i]["tanggal"], "isoDate")
                    resultData[i]["tanggal"] = tanggalFormat
                    if(resultData[i]["debit"] !== "-") {
                        totalDebit += resultData[i]["debit"]
                        totalUang += resultData[i]["debit"]
                        console.log(totalUang, resultData[i]["debit"])
                        if(totalUang < 0) {
                            const minesUang = Math.abs(totalUang) 
                            resultData[i]["debit"] = await rupiah(resultData[i]["debit"])
                            resultData[i]["saldo"] = `(${rupiah(minesUang)})`
                        } else if (totalUang === 0) {
                            resultData[i]["debit"] = await rupiah(resultData[i]["debit"])
                            resultData[i]["saldo"] = `-`
                        } else {
                            resultData[i]["debit"] = await rupiah(resultData[i]["debit"])
                            resultData[i]["saldo"] = await rupiah(totalUang)
                        }
                      
                    }
                    else if(resultData[i]["kredit"] !== "-") {
                        totalKredit += resultData[i]["kredit"]
                        totalUang -= resultData[i]["kredit"]
                        if(totalUang < 0) {
                            const minesUang = Math.abs(totalUang) 
                            resultData[i]["kredit"] = await rupiah(resultData[i]["kredit"])
                            resultData[i]["saldo"] = `(${rupiah(minesUang)})`
                        } else if (totalUang === 0) {
                            resultData[i]["kredit"] = await rupiah(resultData[i]["kredit"])
                            resultData[i]["saldo"] = `-`
                        } 
                        else {
                            resultData[i]["kredit"] = await rupiah(resultData[i]["kredit"])
                            resultData[i]["saldo"] = await rupiah(totalUang)
                        }
                    }  
                }
                const obj = {
                    "tanggal": "",
                    "No Bukti": "",
                    "uraian": "Total",
                    "debit":  await handleChangeRupiah(totalDebit),
                    "kredit": await handleChangeRupiah(totalKredit),
                    "saldo": "",
                }
                resultData.push(obj)
                setLoadingCetakPreview(false)
                setData(resultData)
                return resultData
            } else {
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

    // useEffect(() => {
    //     if (isPrinting && promiseResolveRef.current) {
    //       // Resolves the Promise, letting `react-to-print` know that the DOM updates are completed
    //       promiseResolveRef.current();
    //     }
    //   }, [isPrinting]);

    // const handlePrint = useReactToPrint({
    //     content: () => tableRef.current,
    //     onBeforeGetContent: () => {
    //       return new Promise((resolve) => {
    //         handleCetakPreview()
    //         .then((result) => {
    //             if(result.length > 0) {
    //                 console.log('ini d handlePrint',result)
    //                 promiseResolveRef.current = resolve;
    //                 setIsPrinting(true);
    //             }
    //         })
    //         .catch((err => {
    //             promiseResolveRef.current = resolve;
    //             setIsPrinting(true);
    //         }))
    //       });
    //     },
    //     onAfterPrint: () => {
    //       // Reset the Promise resolve so we can print again
    //       promiseResolveRef.current = null;
    //       setIsPrinting(false);
    //     }
    //   });

   

    return(
        <div className="p-4 w-full h-full overflow-y-auto " >
            <div className="p-4 rounded-lg mt-14 h-full" >
                <div className="flex flex-row justify-between items-center border-b dark:border-gray-700 p-4 mb-4 rounded bg-gray-50">
                    <h1 className="text-lg font-extrabold dark:text-white">Laporan BKU Umum</h1>
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
                            <Button title="Preview" width={"w-fit"} handleFunction={handleCetakPreview} />
                        </div> 
                    </div>
                    {
                        loadingCetakPreview ?
                        <LoadingSpinner /> :
                        data.length > 0 &&
                        <TableBkuUmum data={data} tableRef={tableRef} periodeAwal={periodeAwal} periodeAkhir={periodeAkhir} isLoading={loadingCetakPreview} />   
                    }
                </div>
            </div>
        </div>
    )
}