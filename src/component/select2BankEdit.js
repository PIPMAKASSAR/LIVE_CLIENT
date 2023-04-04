import React, { useEffect, useRef } from 'react';
import Select from "react-select"
import fakeData from '../helpers/fakeData';

export default function Select2BankEdit ({data, value, setValue, title}) {
    const options = []
    fakeData.fakeBank.map((data, index) => {
        const payload = {
            value: 
            {
                kode: data["kode"],
                uraian: data["uraian"]
            },
            label: data["kode"] + " - " + data["uraian"],
        }
        options.push(payload)
    })
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
                isRequired
            />
        </div>
    )
}