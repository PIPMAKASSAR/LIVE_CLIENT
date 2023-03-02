import { useState } from "react"
import React from "react";
import {AiOutlinePlusCircle} from "react-icons/ai"
import {AiOutlineMinusCircle} from "react-icons/ai"
import ButtonEdit from "./buttonEdit";
import ButtonDelete from "./buttonDelete";
import SubTableEditDelete from "./subTableEditDelete";
import ModalDelete from "./modalDelete";
import Button from "./button";

export default function SubTableEditDelete2({data, handleDelete, handleEdit}) {
    const [selectedRow, setSelectedRow] = useState(null);
    const [showModalDelete, setShowModalDelete] = useState(false)

    const handleShowModalDelete = () => {
        setShowModalDelete(!showModalDelete)
    }

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
                                                    ${row["subMak"] && row["subMak"].length !== 0  ? "bg-gray-100" : "bg-slate-50"}
                                                    `
                                                    } 
                        >
                            {
                                Object.keys(row).map((name, index2) => {
                                    if(name !== "subMak" && name !== "jenis" && name !== "kode_up") {
                                        if(name === "id" ) {
                                            return(
                                                <td className="px-6 py-3" key={index2} ></td>
                                            )
                                        } else {
                                            return(
                                                <td className="px-6 py-3" key={index2} >{row[name]}</td>
                                            )                                        
                                        }
                                    } 
                                })
                            }
                            <td>
                                <ButtonEdit title="Edit" color="yellow" handleFunction={() => handleEdit(row)} />
                                <ButtonDelete handleFunction={() => handleDelete(row.uuid)} title={"delete"} color={"red"} />
                            </td>
                            <td className="px-6 py-3" >
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
                            <SubTableEditDelete handleDelete={handleDelete} handleEdit={handleEdit} data={row["subMak"]}/>
                            
                        }
                    </React.Fragment>
                ))
            }
                    
        </>
    )
}