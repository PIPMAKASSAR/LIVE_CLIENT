import { useState } from "react"
import React from "react";
import {AiOutlinePlusCircle} from "react-icons/ai"
import {AiOutlineMinusCircle} from "react-icons/ai"
import rupiah from "../helpers/rupiah";
import SubTableSatker2 from "./subTableSatker2";

export default function SubTableSatker({data}) {
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
                            {/* {
                                Object.keys(row).map((name, index2) => {
                                    if(name !== "subMak") {
                                        if(name === "id" ) {
                                            return(
                                                <td className="px-6 py-3" key={index2} ></td>
                                            )
                                        } 
                                        else {
                                            if(name === "nilai"  && row["nilai"] || name === "total" && row["total"]) {
                                                return(
                                                    <td className="px-6 py-3 text-right" key={index2}>{rupiah(row[name], 'Rp.')}</td>
                                                )
                                            } else {
                                                return(
                                                    <td className="px-6 py-3" key={index2} >{row[name]}</td>
                                                )                                        
                                            }
                                        }
                                    } 
                                })
                            } */}
                            <td className="px-6 py-3"></td>
                            <td className="px-6 py-3">{row["mak"]}</td>
                            <td className="px-6 py-3">{row["uraian"]}</td>
                            <td className="px-6 py-3">{row["satuan"]|| ""}</td>
                            <td className="px-6 py-3">{rupiah(row["nilai"], 'Rp.') || ""}</td>
                            <td className="px-6 py-3">{rupiah(row["total"], 'Rp.') || ""}</td>
                            <td className="px-6 py-3" >
                                {
                                    row["subMak"] && row["subMak"].length !== 0  ?
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
                            </td>      
                            
                        </tr>
                        {
                            
                            selectedRow === index && 
                            <SubTableSatker2 data={row["subMak"]}/>
                            
                        }
                    </React.Fragment>
                ))
            }
                    
        </>
    )
}