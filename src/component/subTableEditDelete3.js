import { useState } from "react"
import React from "react";
import {AiOutlinePlusCircle} from "react-icons/ai"
import {AiOutlineMinusCircle} from "react-icons/ai"
import SubTable2 from "./subTable2";

export default function SubTableEditDelete3({data}) {
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
                        <tr key={index} className={`bg-slate-100 border-b dark:bg-gray-800 dark:border-gray-700`} >
                            {
                                Object.keys(row).map((name, index2) => {
                                    if(name !== "subMak") {
                                        return(
                                            <td className="px-6 py-3" key={index2} >{row[name]}</td>
                                        )                                        
                                    }
                                })
                            }
                            <td>
                                <ButtonEdit title="Edit" color="yellow" />
                                <ButtonDelete title="Hapus" color="red" />
                            </td>
                            <td className="px-6 py-3" >
                                {
                                    row["subMak"] && row["subMak"].length !== 0  ?
                                    <button onClick={() => handleToggleSubTable(index)}>
                                        {
                                            selectedRow === index ? 
                                            <AiOutlineMinusCircle  />
                                            : 
                                            <AiOutlinePlusCircle  />
                                        }
                                    </button>
                                    :
                                    ""
                                }
                            </td>      
                            
                        </tr>
                        {
                            
                            selectedRow === index && 
                            <SubTable2 data={row["subMak"]}/>
                            
                        }
                    </React.Fragment>
                ))
            }
                    
        </>
    )
}