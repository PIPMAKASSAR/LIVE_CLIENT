import handleChangeRupiah from "../helpers/handleChangRupiah"
import React from "react";
import rupiah from "../helpers/rupiah";
import { useRef } from "react";
import Button from "./button";
import { useDownloadExcel } from 'react-export-table-to-excel';
import {useReactToPrint} from 'react-to-print';

export default function TableBkuUmum({data, periodeAwal, periodeAkhir, isLoading}) {
    const tableRef = useRef(null);

    const handleDownloadPDF = useReactToPrint({
        content: () => tableRef.current
    })

    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: `BKU umum ${periodeAwal} - ${periodeAkhir}` ,
        sheet: `BKU umum ${periodeAwal} - ${periodeAkhir}`
    })

    return(
    <div className={`${isLoading ? "invisible " : null} overflow-x-auto overflow-y-auto mt-4`}>
        <Button title="Cetak Excel" width={"w-fit"} handleFunction={onDownload} />
        <Button title="cetak Pdf" width={"w-fit"} handleFunction={handleDownloadPDF} />

        <div ref={tableRef}>
            <table>
                <thead>
                    <tr>
                        <th colSpan="2" className="px-6 py-3 w-full headerBold">DAFTAR BKU UMUM</th>
                    </tr>
                    <tr>
                        <th colSpan="3" className="px-6 py-3 w-full headerBold">PERIODE {periodeAwal} s/d {periodeAkhir}</th>
                    </tr>
                </thead>
            </table> 
            <table className={` w-full text-sm text-left text-gray-500 dark:text-gray-400 `} >
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="bg-sky-700 text-sky-50">
                        <th scope="col" className="px-6 py-3">Tanggal</th>
                        <th scope="col" className="px-6 py-3 w-48">No Bukti</th>
                        <th scope="col" className="px-6 py-3">uraian</th>
                        <th scope="col" className="px-6 py-3 text-right">Debit</th>
                        <th scope="col" className="px-6 py-3 text-right">Kredit</th>
                        <th scope="col" className="px-6 py-3 text-right">Saldo</th>
                    </tr>
                </thead>
                <tbody>
                { 
                        data &&
                        data.map((row, index) => {
                            return(
                                <React.Fragment key={row["No Bukti"]}>
                                    <tr key={index} className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700`}>
                                        <td scope="col" className="px-6 py-3">{row["tanggal"]}</td>
                                        <td scope="col" className="px-6 py-3 w-48">{row["No Bukti"]}</td>
                                        <td scope="col" className="px-6 py-3">{row["uraian"]}</td>
                                        <td scope="col" className="px-2 py-3 text-right">{row["debit"]}</td>
                                        <td scope="col" className="px-2 py-3 text-right">{row["kredit"]}</td>
                                        <td scope="col" className="px-2 py-3 text-right">{row["saldo"]}</td>
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