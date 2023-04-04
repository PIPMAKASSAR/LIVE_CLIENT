import handleChangeRupiah from "../helpers/handleChangRupiah"
import React from "react";
import rupiah from "../helpers/rupiah";
import { useRef } from "react";
import Button from "./button";
import { useDownloadExcel } from 'react-export-table-to-excel';
import {useReactToPrint} from 'react-to-print';
import LoadingSpinner from "./loadingSpinner";
import "./tableLaporanBelanja.css"
import * as cheerio from 'cheerio';

export default function TableLaporanPendapatan({row, header, periodeAwal, periodeAkhir, isLoading}) {
    const tableRef = useRef(null);
    let nomorUrut = 0
    const month = ["januari", "februari", "maret", "april", "mei", "juni", "juli", "agustus", "september", "oktober", "november", "desember"]

    const handleDownloadPDF = useReactToPrint({
        content: () => tableRef.current
    })

    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: `Pendapatan ${periodeAwal} - ${periodeAkhir}` ,
        sheet: `Pendapatan ${periodeAwal} - ${periodeAkhir}`
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
                        <th colSpan="2" className="px-6 py-3 w-full headerBold">DAFTAR PENDAPATAN</th>
                    </tr>
                    <tr>
                        <th colSpan="3" className="px-6 py-3 w-full headerBold">PERIODE {periodeAwal} s/d {periodeAkhir}</th>
                    </tr>
                </thead>
            </table> 
            <table className={`w-full text-sm text-left text-gray-500 dark:text-sky-400`}>
                <thead className="text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                    <tr className="bg-sky-700 text-sky-50">
                        <th rowSpan="3" scope="col" className=" text-center px-6 py-3 bold border-2 border-Neutral-900">No</th>
                        <th rowSpan="3" scope="col" className=" text-center px-6 py-3 bold border-2 border-Neutral-900">Kode Akun</th>
                        <th rowSpan="3" scope="col" className="px-6 py-3 bold border-2 border-Neutral-900">Uraian</th>
                        <th rowSpan="3" scope="col" className="px-6 py-3 bold border-2 border-Neutral-900">Tarif</th>
                        {
                            header &&
                            header.map((item, index) => {
                                const html= item["htmlHeader"]
                                return (
                                    <th colSpan="2" scope="colgroup" className="px-6 py-3 text-center bold border-2 border-Neutral-900" dangerouslySetInnerHTML={{ __html: html }} />
                                );
                            })
                        }
                        {/* <th colSpan="2" scope="colgroup" className="px-6 py-3 text-center bold border-2 border-Neutral-900">DAFTAR PENDAPATAN BLU</th> */}
                        <th colSpan="2" scope="colgroup" className="px-6 py-3 text-center bold border-2 border-Neutral-900">TOTAL</th>
                        
                    </tr> 
                    <tr className="bg-sky-700 text-sky-50">
                        {
                            header &&
                            header.map((item, index) => {
                                const html= item["headerMonth"]
                                return (
                                    <th colSpan="2" scope="colgroup" className="px-6 py-3 text-center bold border-2 border-Neutral-900" dangerouslySetInnerHTML={{ __html: html }} />
                                );
                            })
                        }
                        <th colSpan="2" scope="colgroup" className="px-6 py-3 text-center bold border-2 border-Neutral-900">DAFTAR PENDAPATAN BLU</th>
                    </tr>

                    <tr className="bg-sky-700 text-sky-50">
                    {
                            header &&
                            header.map((item, index) => {
                                const html= item["headerMonth"]
                                return (
                                    <>
                                        <th scope="col" className="px-6 py-3 text-right bold border-2 border-Neutral-900">satuan</th>
                                        <th scope="col" className="px-6 py-3 text-right bold border-2 border-Neutral-900">total</th>
                                    </>
                                );
                            })
                        }
                        <th scope="col" className="px-6 py-3 text-right bold border-2 border-Neutral-900">satuan</th>
                        <th scope="col" className="px-6 py-3 text-right bold border-2 border-Neutral-900">total</th>
                       
                    </tr>

                </thead>
                {/* <tbody className="w-full">
                { 
                        row &&
                        row.map((row, index) => {
                            if(row["jenis"] === "headerParent") {
                                nomorUrut ++
                            }
                            return(
                                <React.Fragment key={row["No Bukti"]}>
                                    <tr key={index} className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700`}>
                                        <td scope="col" className="px-6 py-3 border-2 border-Neutral-900">{`${row["jenis"] === "headerParent" ?  nomorUrut: ""}`}</td>
                                        <td scope="col" className="px-6 py-3 border-2 border-Neutral-900 text-left">{row["kode_akun"]}</td>
                                        <td scope="col" className={`px-6 py-3 border-2 border-Neutral-900 w-1/2 ${row["jenis"] === "headerParent" && "font-bold"}`}> {`${row["jenis"] === "headerParent" ?  row["uraian"] +` (${row["kode_akun"]})` : row["uraian"]}`}</td>
                                        <td scope="col" className="text-right px-2 py-3 border-2 border-Neutral-900">{row["tarif"] !== "0" ? rupiah(row["tarif"]) : ""}</td>
                                        {
                                            row["jenis"] === "headerParent" || row["jenis"] === "header"  ?
                                            header &&
                                            header.map((item, index) => {
                                                return (
                                                    <>
                                                        <td scope="col" className="text-right px-2 py-3 text-right border-2 border-Neutral-900"></td>
                                                        <td scope="col" className="text-right px-2 py-3 text-right border-2 border-Neutral-900"></td>
                                                    </>
                                                );
                                            })
                                            : row["data"] && 
                                            row["data"].map((item, index) => {
                                                return (
                                                    <>
                                                        <td scope="col" className="text-right px-2 py-3 text-right border-2 border-Neutral-900">{item["satuan"]}</td>
                                                        <td scope="col" className="text-right px-2 py-3 text-right border-2 border-Neutral-900">{rupiah(item["total"])}</td>
                                                    </>
                                                );
                                            })
                                        }
                                        <td scope="col" className="text-right px-2 py-3 text-right border-2 border-Neutral-900">{row["satuan"] !== "0" ? row["satuan"] : ""}</td>
                                        <td scope="col" className="text-right px-2 py-3 text-right border-2 border-Neutral-900">{row["total"] !== "0" ? rupiah(row["total"]) : ""}</td>
                                    </tr>
                                </React.Fragment>
                            )
                        })
                }
                    
                </tbody> */}
            </table>
            
        </div>
    </div>
    )
}