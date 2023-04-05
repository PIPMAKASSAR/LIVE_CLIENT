import { useState } from "react"
import React from "react";
import {AiOutlinePlusCircle} from "react-icons/ai"
import {AiOutlineMinusCircle} from "react-icons/ai"
import SubTableDetailPendapatan from "./subTableDetailPendapatan";
import rupiah from "../helpers/rupiah";
import ButtonEdit from "./buttonEdit";
import ButtonDelete from "./buttonDelete";

export default function SubTableDetailPendapatan2({data, handleDelete, handleEdit}) {
    const [selectedRow, setSelectedRow] = useState(null);

    const handleToggleSubTable = (index) => {
        if (index === selectedRow) {
            setSelectedRow(null);
          } else {
            setSelectedRow(index);
          }
      };
  
    return(
        <>
            {
                data &&
                data.map((row, index) => (  
                    <React.Fragment key={row.id}>
                        <tr key={index} className={`
                                                    border-b 
                                                    dark:bg-gray-800 
                                                    dark:border-gray-700
                                                    ${row["subMak"] && row["subMak"].length !== 0  ? "bg-gray-200" : "bg-slate-50"}
                                                    `
                                                    } 
                        >
                            <td className="px-6 py-3"></td>
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
                            <td className="pr-6 py-3" >
                                <div className="flex flex-row-reverse">
                                    {
                                        row["subPendapatan"] && row["subPendapatan"].length !== 0  ?
                                        <button onClick={() => handleToggleSubTable(index)}>
                                            {
                                                selectedRow === index ? 
                                                <AiOutlineMinusCircle className="text-xl"  />
                                                : 
                                                <AiOutlinePlusCircle  className="text-xl" />
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
                            <SubTableDetailPendapatan handleDelete={handleDelete} handleEdit={handleEdit} data={row["subPendapatan"]} />
                            
                        }
                    </React.Fragment>
                ))
            }
                    
        </>
    )
}