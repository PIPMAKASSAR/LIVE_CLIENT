import React, { useEffect, useRef } from 'react';
import Select from "react-select"
import fakeData from '../helpers/fakeData';

export default function Select2AkunEdit ({data, value, setValue, title, category}) {
    let options = []
    if(category === "penerimaan") {
        fakeData.fakeAkun.map((data, index) => {
            if(data.kode.charAt(0) == "4") {
                const payload = {
                    value: 
                    {
                        kode: data["kode"],
                        uraian: data["uraian"]
                    },
                    label: data["kode"] + " - " + data["uraian"],
                }
                options.push(payload)
            }
        })
        // options = fakeData.fakeAkun(item => item.kode == "4")
    } else if(category === "pengeluaran") {
        fakeData.fakeAkun.map((data, index) => {
            if(data.kode.charAt(0) == "5") {
                const payload = {
                    value: 
                    {
                        kode: data["kode"],
                        uraian: data["uraian"]
                    },
                    label: data["kode"] + " - " + data["uraian"],
                }
                options.push(payload)
            }
        })
    }
    const findValue = options.filter(element => element.value["kode"] == value.kode)
    const handleOption = (value) => {
        setValue(value.value)
    }
    return (
        <div className="mb-6">
            <label htmlFor={"header"} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{title}</label>
            <Select 
                options={options}
                value={findValue}
                className="basic-single"
                onChange={handleOption}
                required
            />
        </div>
    )
}