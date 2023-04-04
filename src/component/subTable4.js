import { useState } from "react";
import React from "react";

export default function SubTable4({data}) {
    return(
        <>
        {
            data &&
            data.map((row, index) => (         
                <tr key={index} className={`bg-slate-100 border-b dark:bg-gray-800 dark:border-gray-700`} >
                    {
                        Object.keys(row).map((name, index2) => {
                            return(
                                <td className="px-6 py-3" key={index2} >{row[name]}</td>
                            )                                        
                        })
                    } 
                    <td className="px-6 py-3" ></td>     
                </tr>
                ))
        }
        </>    
    )
}