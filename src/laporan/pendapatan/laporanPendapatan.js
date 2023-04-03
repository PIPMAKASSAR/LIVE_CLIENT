import { useNavigate } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
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
import ExcelTableBKU from "../../component/excelTableBKU"
import ReactToPrint, { useReactToPrint }  from 'react-to-print';
import TableLaporanPendapatan from "../../component/tableLaporanPendapatan"
import LoadingSpinner from "../../component/loadingSpinner"
import bkuApi from "../../api/bkuApi"

import DatePicker from "react-datepicker"


export default function LaporanPendapatan() {
    const MySwal = withReactContent(Swal)
    const titlesBreadCump = [ "Laporan","Pendapatan"]
    const [periodeAwal, setPeriodeAwal] = useState("")
    const [periodeAkhir, setPeriodeAkhir] = useState("")
    const tableRef = useRef(null);
    const promiseResolveRef = useRef(null);
    const [isPrinting, setIsPrinting] = useState(false);
    const [data, setData] = useState([])
    const [loadingExcel, setLoadingExcel] = useState(false)
    const [loadingPdf, setLoadingPdf] = useState(false)
    const [loadingCetakPreview, setLoadingCetakPreview] = useState(false)
    const [headers, setHeaders] = useState([])
    const [rows, setRows] = useState([])
   
   
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
                periodeAwal :dateFormat(periodeAwal, "yyyy-mm") ,
                periodeAkhir :dateFormat(periodeAkhir, "yyyy-mm")
            }
           
            const result = await bkuApi.getLaporanPendapatan(payload)
            console.log(result)
            if(result) {
                setLoadingCetakPreview(false)
                setHeaders(result["header"])
                setRows(result["row"])
            } else {
                throw ({message: "Periode yang anda pilih belum ada data tersimpan"})
             }
        }
        catch(err) {
            setLoadingCetakPreview(false)
            // setData([])
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
                    <h1 className="text-lg font-extrabold dark:text-white">Laporan Pendapatan</h1>
                    <BreadCump titles={titlesBreadCump} />
                </div>
                <div className="grid w-full p-9 mb-4 rounded bg-gray-50 dark:bg-gray-800">
                    <div className="mb-6 flex gap-3 w-full items-center">
                        <label htmlFor="small-input" className="w-32 mb-2 text-sm font-medium text-gray-900 dark:text-white">Periode Awal :</label>
                        <DatePicker
                            selected={periodeAwal}
                            onChange={(date) => setPeriodeAwal(date)}
                            dateFormat="MM/yyyy"
                            showMonthYearPicker
                            showFullMonthYearPicker
                            className="
                            w-24
                            px-4
                            py-2 
                            text-sm 
                            text-gray-900 
                            border 
                            border-gray-300 
                            rounded-md 
                            bg-gray-50"
                        />
                    </div>
                    <div className="mb-6 flex gap-3 w-full items-center">
                        <label htmlFor="small-input" className="w-32 mb-2 text-sm font-medium text-gray-900 dark:text-white">Periode Akhir :</label>
                        <DatePicker
                            selected={periodeAkhir}
                            onChange={(date) => setPeriodeAkhir(date)}
                            dateFormat="MM/yyyy"
                            showMonthYearPicker
                            showFullMonthYearPicker
                            className="
                            w-24
                            px-4
                            py-2 
                            text-sm 
                            text-gray-900 
                            border 
                            border-gray-300 
                            rounded-md 
                            bg-gray-50"
                        />
                    </div>
                    <div className="w-full">           
                        <Button title="Preview" width={"w-fit"}  handleFunction={handleCetakPreview} />
                    </div>
                    {
                        loadingCetakPreview ?
                        <LoadingSpinner />
                        :
                        rows.length > 0 &&
                        <TableLaporanPendapatan 
                            row={rows}
                            header={headers} 
                            isLoading={loadingCetakPreview} 
                            periodeAwal={dateFormat(periodeAwal, "mm-yyyy")} 
                            periodeAkhir={dateFormat(periodeAkhir, "mm-yyyy")} 
                        />
                    }
                </div>
            </div>
        </div>
    )
}