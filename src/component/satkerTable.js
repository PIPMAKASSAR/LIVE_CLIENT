import { useEffect, useState } from "react";
import React from "react";
import ButtonDropdownSub from "./buttonDropDownSub";
import {AiOutlinePlusCircle} from "react-icons/ai"
import {AiOutlineMinusCircle} from "react-icons/ai"
import ReactPaginate from "react-paginate";
import SubTableSatker from "./subTableSatker";
import rupiah from "../helpers/rupiah";
import LoadingSpinner from "./loadingSpinner";

export default function SatkerTable({data, isLoading, itemsPerPage, setOffset, offSet, totalRow}) {
    const [selectedRow, setSelectedRow] = useState(null);
    
    const [itemOffset, setItemOffset] = useState(0)
    const title = ["no", "kode akun", "uraian", "satuan", "nilai", "total"]
    const handleToggleSubTable = (index) => {
        if (index === selectedRow) {
            setSelectedRow(null);
          } else {
            setSelectedRow(index);
          }
    };

 // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
 

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

    return(
        <div>
        {
            currentItems &&
            <table className={`invicible ${currentItems && "visible"} w-full text-sm text-left text-gray-500 dark:text-gray-400`}>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400" >
                    <tr className="bg-sky-700 text-sky-50">
                        {
                            currentItems &&
                            title.map((name, index) => {
                                if(name === "total" || name === "nilai"){
                                    return(
                                        <th className="px-6 py-3 text-right" key={index} >{name}</th>
                                    )
                                } else {
                                    return(
                                        <th className="px-6 py-3" key={index} >{name}</th>
                                    ) 
                                }
                            })
                        }
                        <th className="px-6 py-3" ></th> 
                    </tr>
                </thead>
                <tbody>
                    {
                        currentItems &&
                        currentItems.map((row, index) => (  
                            <React.Fragment key={row.id}>
                                <tr key={index} className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700`} >
                                    {/* {
                                        Object.keys(row).map((name, index2) => {
                                            if(name !== "subMak") {
                                                return(
                                                    <td className="px-6 py-3" key={index2} >{row[name]}</td>
                                                )                                        
                                            }
                                        })
                                    } */}
                                    <td className="px-6 py-3">{index + 1}</td>
                                    <td className="px-6 py-3">{row["mak"]}</td>
                                    <td className="px-6 py-3">{row["uraian"]}</td>
                                    <td className="px-6 py-3">{row["satuan"]|| ""}</td>
                                    <td className="px-6 py-3 text-right">{rupiah(row["nilai"], 'Rp.') || ""}</td>
                                    <td className="px-6 py-3 text-right">{rupiah(row["total_nilai"], 'Rp.') || ""}</td>
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
                                    <SubTableSatker data={row["subMak"]}/>
                                
                                }
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