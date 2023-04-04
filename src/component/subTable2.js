import { useState } from "react";
import React from "react";
import {AiOutlinePlusCircle} from "react-icons/ai"
import {AiOutlineMinusCircle} from "react-icons/ai"
import SubTable from "./subTable";
import rupiah from "../helpers/rupiah";

export default function SubTable2({data}) {
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
                            <tr key={index} className={`bg-slate-50
                                                        border-b 
                                                        dark:bg-gray-800 
                                                        dark:border-gray-700
                                                        ${row["subMak"] && row["subMak"].length !== 0  ? "bg-gray-100" : "bg-slate-50"}
                                                        `
                                                        } 
                            >
                                {
                                    Object.keys(row).map((name, index2) => {
                                        if(name !== "subMak") {
                                            if(name === "id" ) {
                                                return(
                                                    <td className="px-6 py-3" key={index2} ></td>
                                                )
                                            } else {
                                                if(name === "nilai" && row["nilai"] || name === "total" && row["total"]) {
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
                                }
                                <td className="px-6 py-3" >
                                    {
                                        row["subMak"] && row["subMak"].length !== 0  ?
                                        <button onClick={() => handleToggleSubTable(index)}>
                                            {
                                                selectedRow === index ? 
                                                <AiOutlineMinusCircle className="text-xl" />
                                                : 
                                                <AiOutlinePlusCircle className="text-xl"  />
                                            }
                                        </button>
                                        :
                                        ""
                                    }
                                </td>      
                                
                            </tr>
                            {
                                row["subMak"] &&
                                selectedRow === index && 
                                <SubTable data={row["subMak"]}/>
                                
                            }
                        </React.Fragment>
                    ))
                }
        </>
    )
}
