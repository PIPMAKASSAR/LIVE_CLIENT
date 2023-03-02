import { useEffect } from "react"
import Select from "react-select"

export default function InputSelectHeaderEdit({data, value, setValue, title, defaultValue, category}) {
    const options = []
    options.push({
        value: "-",
        label: "silahkan pilih",
    })
    data.map((data, index) => {
        const payload = {
            value: data["mak"],
            label: data["mak"] + " " + data["uraian"],
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
            />
        </div>
    )
}