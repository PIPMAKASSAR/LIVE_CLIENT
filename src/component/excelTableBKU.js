import { ExcelRenderer } from 'react-excel-renderer';
import React, { useState, useRef } from 'react';

function ExcelTableBKU({dataBku, tableRef}) {
  const [data, setData] = useState(null);
  

  const handleFile = (event) => {
    let fileObj = event.target.files[0];

    // Render the Excel file as an HTML table
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        setData(resp.rows);
      }
    });
  };

  return (
    <div className="overflow-x-auto overflow-y-auto">
      <input type="file" onChange={handleFile} />
      {data && (
        <table className={` w-full text-sm text-left text-gray-500 dark:text-gray-400 `} ref={tableRef} >
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {row.map((cell, i) => (
                  <td key={i}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ExcelTableBKU;


