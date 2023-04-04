import handleChangeRupiah from "../helpers/handleChangRupiah"
import React from "react";
import rupiah from "../helpers/rupiah";
import { useRef } from "react";
import Button from "./button";
import { useDownloadExcel } from 'react-export-table-to-excel';
import {useReactToPrint} from 'react-to-print';
import LoadingSpinner from "./loadingSpinner";
import "./tableLaporanBelanja.css"

export default function TableLaporanBelanja({data, periodeAwal, periodeAkhir, isLoading}) {
    const tableRef = useRef(null);
  
    const handleDownloadPDF = useReactToPrint({
        content: () => tableRef.current
    })

    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: `Belanja ${periodeAwal} - ${periodeAkhir}` ,
        sheet: `Belanja ${periodeAwal} - ${periodeAkhir}`
    })

    return(
    
    <div className={`${isLoading ? "invisible " : null} overflow-x-auto overflow-y-auto mt-4`}> 
        <div className="flex">
            <Button title="Cetak Excel" width={"w-fit"} handleFunction={onDownload} />
            <Button title="cetak Pdf" width={"w-fit"} handleFunction={handleDownloadPDF} />
        </div>
        <div ref={tableRef}>
            <table>
                <thead>
                    <tr>
                        <th colSpan="2" className="px-6 py-3 w-full headerBold">DAFTAR BELANJA</th>
                    </tr>
                    <tr>
                        <th colSpan="3" className="px-6 py-3 w-full headerBold">PERIODE {periodeAwal} s/d {periodeAkhir}</th>
                    </tr>
                </thead>
            </table> 
            <table className={`w-full text-sm text-left text-gray-500 dark:text-sky-400`}>
                <thead className="text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                    <tr className="bg-sky-700 text-sky-50">
                        <th rowSpan="2" scope="col" className="px-6 py-3 bold border-2 border-Neutral-900">No</th>
                        <th rowSpan="2" scope="col" className="px-6 py-3 bold border-2 border-Neutral-900">Mak</th>
                        <th rowSpan="2" scope="col" className="px-6 py-3 bold border-2 border-Neutral-900">Penerima</th>
                        <th rowSpan="2" scope="col" className="px-6 py-3 bold border-2 border-Neutral-900">Uraian</th>
                        <th rowSpan="2" scope="col" className="px-6 py-3 text-right bold border-2 border-Neutral-900">Jumlah</th>
                        <th colSpan="5" scope="colgroup" className="px-6 py-3 text-center bold border-2 border-Neutral-900">Pajak yang dipungut Bendahara Pengeluaran</th>
                        <th rowSpan="2" scope="col" className="px-6 py-3 bold border-2 border-Neutral-900">Jumlah Bersih</th>
                        <th rowSpan="2" scope="col" className="px-6 py-3 bold border-2 border-Neutral-900">Keterangan</th>
                    </tr> 
                    <tr className="bg-sky-700 text-sky-50">
                        <th scope="col" className="px-6 py-3 text-right bold border-2 border-Neutral-900">Ppn</th>
                        <th scope="col" className="px-6 py-3 text-right bold border-2 border-Neutral-900">Pph21</th>
                        <th scope="col" className="px-6 py-3 text-right bold border-2 border-Neutral-900">Pph22</th>
                        <th scope="col" className="px-6 py-3 text-right bold border-2 border-Neutral-900">Pph23</th>
                        <th scope="col" className="px-6 py-3 text-right bold border-2 border-Neutral-900">Pph Final</th>
                    </tr>

                </thead>
                <tbody>
                { 
                        data &&
                        data.map((row, index) => {
                            return(
                                <React.Fragment key={row["No Bukti"]}>
                                    <tr key={index} className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700`}>
                                        <td scope="col" className="px-6 py-3 border-2 border-Neutral-900">{row["no"]}</td>
                                        <td scope="col" className="px-6 py-3 border-2 border-Neutral-900">{row["mak"]}</td>
                                        <td scope="col" className="px-6 py-3 border-2 border-Neutral-900">{row["penerima"]}</td>
                                        <td scope="col" className="px-6 py-3border-2 border-Neutral-900">{row["uraian"]}</td>
                                        <td scope="col" className="px-2 py-3 text-right border-2 border-Neutral-900">{row["jumlah"]}</td>
                                        <td scope="col" className="px-2 py-3 text-right border-2 border-Neutral-900">{row["ppn"]}</td>
                                        <td scope="col" className="px-2 py-3 text-right border-2 border-Neutral-900">{row["pajak_pph21"]}</td>
                                        <td scope="col" className="px-2 py-3 text-right border-2 border-Neutral-900">{row["pajak_pph22"]}</td>
                                        <td scope="col" className="px-2 py-3 text-right border-2 border-Neutral-900">{row["pajak_pph23"]}</td>
                                        <td scope="col" className="px-2 py-3 text-right border-2 border-Neutral-900">{row["pajak_pphfinal"]}</td>
                                        <td scope="col" className="px-2 py-3 text-right border-2 border-Neutral-900">{row["jumlah_bersih"]}</td>
                                        <td scope="col" className="px-6 py-3 border-2 border-Neutral-900">{row["keterangan"]}</td>
                                    </tr>
                                </React.Fragment>
                            )
                        })
                }
                    
                </tbody>
            </table>
        </div>
    </div>
    )
}