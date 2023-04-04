import { useEffect, useState } from "react";
import React from "react";
import ReactPaginate from "react-paginate";
import ButtonEdit from "./buttonEdit";
import ButtonDelete from "./buttonDelete";
import rupiah from "../helpers/rupiah";
import LoadingSpinner from "./loadingSpinner";
import dateFormat from "dateformat";

// import "./tableWithpagination.css"

export default function TableBelanja({category, isLoading, data, itemsPerPage, title, offSet, setOffset, totalRow,  handleEdit, handleDelete}) {
    const [pageCount, setPageCount] = useState(0)
    
    useEffect(() => {
        // const endOffset = offSet + itemsPerPage
        // console.log(`loading items from ${offSet} to ${endOffset}`)
        console.log(totalRow,itemsPerPage,Math.ceil(totalRow / itemsPerPage))
        setPageCount(Math.ceil(totalRow / itemsPerPage))
    },[offSet, itemsPerPage, data])

    const handlePageClick = async (event) => {
        const newOffset = event.selected * itemsPerPage % totalRow
        setOffset(String(newOffset))
    }

    return (
        <div className="overflow-x-auto overflow-y-auto">  
        {
            isLoading ?
            <LoadingSpinner /> :
            <table className={` w-full text-sm text-left text-gray-500 dark:text-gray-400 `}>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400" >
                    <tr className="bg-sky-700 text-sky-50">
                        {
                            title.map((title, index) => {
                                if(title === "Pajak" || title === "Nilai") {
                                    return(
                                        <th key={index} scope="col" className="px-6 py-3 text-right w-64">
                                            {title}
                                        </th> 
                                    )  
                                } else if(title === "Pajak") {
                                    return(
                                        <th key={index} scope="col" className="px-6 py-3 w-64">
                                            {title}
                                        </th> 
                                    )
                                }
                                
                                return(
                                    <th key={index} scope="col" className="px-6 py-3 text-right">
                                        {title}
                                    </th> 
                                )
                            }) 
                        }
                        <th  scope="col" className="px-6 py-3 text-right">Jumlah Bersih</th>
                        <th  className="px-6 py-3  w-40 text-right" >aksi</th> 
                    </tr>
                </thead>
                <tbody>
                    {
                        data &&
                        data.map((row, index) => (  
                            <React.Fragment key={row.id}>
                                <tr key={index} className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700`} >
                                    <td className="px-6 py-3" >{index + 1}</td>
                                    <td className="px-6 py-3" >{dateFormat(row["tanggal"], "yyyy-mm-dd")}</td>
                                    <td className="px-6 py-3" >{row["kode_transaksi"]}</td>
                                    <td className="px-6 py-3" >{row["mak"]}</td>
                                    <td className="px-6 py-3" >{row["nama"]}</td>
                                    <td className="px-6 py-3" >{row["uraian"]}</td>
                                    <td className="px-6 py-3 text-right w-64" >{rupiah(row["jumlah"], "Rp.")}</td>
                                    <td className="px-6 py-3 flex flex-col text-right w-64" >
                                        <span>PPN : {rupiah(row["ppn"], "Rp.")}</span>
                                        <span>PPH 21 : {rupiah(row["pajak_pph21"], "Rp.")}</span>
                                        <span>PPH 22 : {rupiah(row["pajak_pph22"], "Rp.")}</span>
                                        <span>PPH 23: {rupiah(row["pajak_pph23"], "Rp.")}</span>
                                        <span>PPH Final: {rupiah(row["pajak_pphfinal"], "Rp.")}</span>
                                    </td>
                                    <td className="px-6 py-3 text-right w-64" >{rupiah(row["jumlah_bersih"], "Rp.")}</td>
                                    <td>
                                        <div className="px-6 py-3 flex w-full content-end"  >
                                            <ButtonEdit title="Edit" color="yellow" handleFunction={() => handleEdit(row)} />
                                            <ButtonDelete handleFunction={() => handleDelete(row)} title={"delete"} color={"red"} />
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