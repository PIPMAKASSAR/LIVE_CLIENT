import React, { useEffect, useRef } from 'react';
import Select from "react-select"

export default function Select2PihakTigaEdit ({data, value, setValue, title}) {
    const options = []
    data.map((data, index) => {
        const payload = {
            value: data["uuid"],
            label: data["no_rekening"] + " " + data["nama"],
        }
        options.push(payload)
    }) 
    const findValue = options.filter(element => element.value === value)
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