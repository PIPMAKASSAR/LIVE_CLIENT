import { useEffect, useRef, useState } from "react";
import React from "react";
import {AiOutlinePlusCircle} from "react-icons/ai"
import {AiOutlineMinusCircle} from "react-icons/ai"
import ReactPaginate from "react-paginate";
import SubTableDetailPendapatan from "./subTableDetailPendapatan";
import rupiah from "../helpers/rupiah";
import ButtonEdit from "./buttonEdit";
import ButtonDelete from "./buttonDelete";
import LoadingSpinner from "./loadingSpinner";


export default function ParentTableDetailPendapat({data, isLoading, itemsPerPage, tittles, reload, setReload, handleDelete, handleEdit}) {
    const uuidRef = useRef(null)
    const title = [
        "No", "Jenis", "Kode Akun", "Uraian", "Harga"
    ]
    const handleToggleSubTable = (index) => {
        if (index === selectedRow) {
            setSelectedRow(null);
          } else {
            setSelectedRow(index);
          }
    };
    console.log(data)

    const [selectedRow, setSelectedRow] = useState(null);
    const [itemOffset, setItemOffset] = useState(0)
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
                <table className={`invicible ${data && "visible"} w-full text-sm text-left text-gray-500 dark:text-gray-400`}>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 w-full" >
                        <tr className="bg-sky-700 text-sky-50 w-full">
                            {
                                title.map((title, index) => {
                                    if(title == "Harga") {
                                        return(
                                            <th key={index} scope="col" className="px-6 py-3 text-right">
                                                {title}
                                            </th> 
                                        )    
                                    }
                                    return(
                                        <th key={index} scope="col" className="px-6 py-3">
                                            {title}
                                        </th> 
                                    )
                                }) 
                            }
                            <th  className="px-6 py-3 text-right" ></th> 
                            <th  className="px-6 py-3 text-right" >aksi</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentItems &&
                            currentItems.map((row, index) => (  
                                <React.Fragment key={row.id}>
                                    <tr key={index} className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 `} >
                                        <td className="px-6 py-3">{index+1}</td>
                                        <td className="px-6 py-3">{row["jenis"]}</td>
                                        <td className="px-6 py-3">{row["kode_akun"]}</td>
                                        <td className="px-6 py-3">{row["uraian"]}</td>
                                        <td className="px-6 py-3 text-right">{rupiah(row["tarif"], 'Rp.') || ""}</td>
                                        <td className="pl-6 py-3 grid justify-items-end">
                                            <div className="flex">
                                                <ButtonEdit title="Edit" color="yellow" handleFunction={() => handleEdit(row)} />
                                                {
                                                    row["subPendapatan"] && row["subPendapatan"].length !== 0  ?
                                                    null
                                                    :
                                                    <ButtonDelete handleFunction={() => handleDelete(row)} title={"delete"} color={"red"} />
                                                }
                                            </div>
                                        </td>
                                        <td className="pr-6 py-3">
                                            <div className="flex flex-row-reverse">     
                                                {
                                                    row["subPendapatan"] && row["subPendapatan"].length !== 0  ?
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
                                            </div>
                                        </td>      
                                        
                                    </tr>
                                    {
                                    
                                        selectedRow === index && 
                                        <SubTableDetailPendapatan handleDelete={handleDelete} handleEdit={handleEdit} data={row["subPendapatan"]}/>
                                    
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