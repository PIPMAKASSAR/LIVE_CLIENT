import SubTable from "./subTable";
import { useEffect, useState } from "react";
import React from "react";
import ButtonDropdownSub from "./buttonDropDownSub";
import {AiOutlinePlusCircle} from "react-icons/ai"
import {AiOutlineMinusCircle} from "react-icons/ai"
import ReactPaginate from "react-paginate";

export default function ParentTable({data, isLoading, itemsPerPage, tittles, reload, setReload}) {
    const [selectedRow, setSelectedRow] = useState(null);
    const [currentItems, setCurrentItems] = useState(null)
    const [pageCount, setPageCount] = useState(0)
    const [itemOffset, setItemOffset] = useState(0)

    const handleToggleSubTable = (index) => {
        if (index === selectedRow) {
            setSelectedRow(null);
          } else {
            setSelectedRow(index);
          }
    };

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage
        // console.log(`loading items from ${itemOffset} to ${endOffset}`)
        setCurrentItems(data.slice(itemOffset, endOffset))
        setPageCount(Math.ceil(data.length / itemsPerPage))
    },[itemOffset, itemsPerPage, data])

    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage % data.length
        // console.log(
        //     `user request page number ${event.selected}, which is offset ${newOffset}`
        // )
        setItemOffset(newOffset)
    }

    return(
        <div>
            <table className={`invicible ${data && "visible"} w-full text-sm text-left text-gray-500 dark:text-gray-400`}>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400" >
                    <tr className="bg-sky-700 text-sky-50">
                        {
                            data &&
                            Object.keys(data[0]).map((name, index) => {
                               if(name !== "subMak") {
                                if(name === "nilai" || name === "total" ) {
                                    return(
                                        <th className="px-6 py-3 text-right" key={index} >{name}</th>
                                    )
                                } else {

                                    return (
                                        <th className="px-6 py-3" key={index} >{name}</th>
                                    )
                                }
                               } 
                            })
                        }
                           <th className="px-6 py-3" ></th> 
                    </tr>
                </thead>
                <tbody>
                    {
                        data &&
                        data.map((row, index) => (  
                            <React.Fragment key={row.id}>
                                <tr key={index} className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700`} >
                                    {
                                        Object.keys(row).map((name, index2) => {
                                            if(name !== "subMak") {
                                                return(
                                                    <td className="px-6 py-3" key={index2} >{row[name]}</td>
                                                )                                        
                                            }
                                        })
                                    }
                                    <td className="px-6 py-3">
                                        {
                                            row["subMak"] && row["subMak"].length !== 0  ?
                                            <button onClick={() => handleToggleSubTable(index)}>
                                                {
                                                    selectedRow === index ? 
                                                    <AiOutlineMinusCircle className="text-xl" />
                                                    : 
                                                    <AiOutlinePlusCircle className="text-xl" />
                                                }
                                            </button>
                                            :
                                            ""
                                        }
                                    </td>      
                                    
                                </tr>
                                {
                                  
                                    selectedRow === index && 
                                    <SubTable data={row["subMak"]}/>
                                   
                                }
                            </React.Fragment>
                        ))
                    }
                                    
                </tbody>
            </table>
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