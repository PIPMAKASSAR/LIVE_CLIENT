import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Table from "./tablePenerimaan";
import TableSaldoOperasional from "./tableSaldoOperasional";
import TableSaldoPengelolaanKas from "./tableSaldoPengelolaanKas";
import TableSaldoDanaKelolaan from "./tableSaldoDanaKelolaan";
import TablePenerimaan from "./tablePenerimaan";
import TablePengeluaran from "./tablePengeluaran";
import LoadingSpinner from "./loadingSpinner";
// import "./tableWithpagination.css"

export default function TableWithPagination({category, isLoading, data, itemsPerPage, tittles, reload, setReload, offSet, totalRow, setOffset }) {
    const [pageCount, setPageCount] = useState(0)

    useEffect(() => {
        // const endOffset = offSet + itemsPerPage
        // console.log(`loading items from ${offSet} to ${endOffset}`)
        setPageCount(Math.ceil(totalRow / itemsPerPage))
    },[offSet, itemsPerPage, data])

    const handlePageClick = async (event) => {
        const newOffset = event.selected * itemsPerPage % totalRow
        setOffset(String(newOffset))
    }

    return (
        <>  
            {   
                isLoading ?
                <LoadingSpinner />
                :
                category ==="penerimaan" ?
                <TablePenerimaan 
                    category={category} 
                    isLoading={isLoading} 
                    data={data} 
                    tittles={tittles} 
                    reload={reload} 
                    setReload={setReload}  
                /> :
                category ==="pengeluaran" ?
                <TablePengeluaran  
                    category={category} 
                    isLoading={isLoading} 
                    data={data} 
                    tittles={tittles} 
                    reload={reload} 
                    setReload={setReload}
                /> :
                category === "saldoOperasional" ?
                <TableSaldoOperasional 
                    category={category} 
                    isLoading={isLoading} 
                    data={data} 
                    tittles={tittles} 
                    reload={reload} 
                    setReload={setReload} 
                /> : 
                category ==="saldoDanaKelolaan" ?
                <TableSaldoDanaKelolaan
                    category={category} 
                    isLoading={isLoading} 
                    data={data} 
                    tittles={tittles} 
                    reload={reload} 
                    setReload={setReload} 
                /> :
                category === "saldoPengelolaanKas"  ?
                <TableSaldoPengelolaanKas
                    category={category} 
                    isLoading={isLoading} 
                    data={data} 
                    tittles={tittles} 
                    reload={reload} 
                    setReload={setReload} 
                /> : null
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
        </>
    )
}