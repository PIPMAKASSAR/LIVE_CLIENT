import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import routeName from "../helpers/routeName";
import React from "react";
import ReactPaginate from "react-paginate";
import ButtonEdit from "./buttonEdit";
import ButtonDelete from "./buttonDelete";
import Button from "./button";
import ButtonDetail from "./buttonDetail";
import pendapatanApi from "../api/pendapatanApi";
import LoadingSpinner from "./loadingSpinner";
import rupiah from "../helpers/rupiah";
import dateFormat from "dateformat";

export default function ParentTableKeuanganPendapatan({handleFunction ,setIsLoading, isLoading, setReload, reload, setOffset, offSet, data, itemsPerPage, handleDelete, handleEdit, totalRow}) {
    const navigate = useNavigate()
    const [selectedRow, setSelectedRow] = useState(null);
    const [currentItems, setCurrentItems] = useState(null)
    const [pageCount, setPageCount] = useState(0)
    const [itemOffset, setItemOffset] = useState(0)
    const uuidRef = useRef(null)
    const title = [
        "No", "Kode Transaksi", "Tanggal", "Kode","Uraian","Harga","Satuan","Total"
    ]

    useEffect(() => {
        const endOffset = offSet + itemsPerPage
        // console.log(`loading items from ${offSet} to ${endOffset}`)
        setCurrentItems(data.slice(offSet, endOffset))
        setPageCount(Math.ceil(totalRow / itemsPerPage))
    },[offSet, itemsPerPage, data])

    const handlePageClick = async (event) => {
        const newOffset = event.selected * itemsPerPage % totalRow
        setOffset(String(newOffset))
    }

    return(
        <div className="overflow-x-auto overflow-y-auto">
            {
                isLoading ?
                <LoadingSpinner />
                :
                <table className={`invicible ${!isLoading ? "visible" : "invicible"} w-full text-sm text-left text-gray-500 dark:text-gray-400 `}>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400" >
                        <tr className="bg-sky-700 text-sky-50">
                            {
                                title.map((title, index) => {
                                    if(title == 'Harga' || title == 'Total') {
                                        return(
                                            <th key={index} scope="col" className="px-6 py-3 text-right w-80">
                                                {title}
                                            </th> 
                                        )
                                    } else if(title == 'Tanggal') {
                                        <th key={index} scope="col" className="px-6 py-3 w-80">
                                                {title}
                                            </th>
                                    }
                                    return(
                                        <th key={index} scope="col" className="px-6 py-3 ">
                                            {title}
                                        </th> 
                                    )
                                }) 
                            }
                            <th  className="px-6 py-3 w-auto text-right" >aksi</th> 
                        </tr>
                    </thead>
                    <tbody className="w-full">
                        {
                            data &&
                            data.map((row, index) => (  
                                <React.Fragment key={row.id}>
                                    <tr key={index} className={`w-full bg-white border-b dark:bg-gray-800 dark:border-gray-700`} >
                                        <td className="px-6 py-3">{index+1}</td>
                                        <td className="px-6 py-3">{row["kode_transaksi"]}</td>
                                        <td className="px-6 py-3 w-80">{dateFormat(row["tanggal"], "isoDate")}</td>
                                        <td className="px-6 py-3">{row["kode_akun"]}</td>
                                        <td className="px-6 py-3">{row["uraian"]}</td>
                                        <td className="px-6 py-3 text-right w-80">{rupiah(row["tarif"], 'Rp.')}</td>
                                        <td className="px-6 py-3">{row["satuan"]}</td>
                                        <td className="px-6 py-3 text-right w-80">{rupiah(row["total"], 'Rp.')}</td>
                                        <td>
                                            <div className="grid justify-items-end w-full">
                                                <div className="flex px-6 py-3 items-right"  >
                                                    <ButtonEdit title="Edit" color="yellow" handleFunction={() => handleEdit(row)} />
                                                    <ButtonDelete handleFunction={() => handleDelete(row)} title={"delete"} color={"red"} />
                                                </div>
                                            </div>
                                        </td>
                                        
                                    </tr>
                                </React.Fragment>
                            
                            ))
                        }
                                        
                    </tbody>
                </table>
            }
            <div className="flex justify-center mt-5">
                <ReactPaginate 
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="<"
                    activeClassName="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    previousClassName="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    nextClassName="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    breakLabel="..."
                    containerClassName="flex"
                    pageClassName="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    renderOnZeroPageCount={null} 
                />
            </div>
        </div>
    )
}