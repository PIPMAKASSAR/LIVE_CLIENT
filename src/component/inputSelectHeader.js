import { useEffect } from "react"
import Select from "react-select"

export default function InputSelectHeader({data, value, setValue, title, defaultValue, category, position = false}) {
    const options = []
    options.push({
        value: "-",
        label: "silahkan pilih",
    })
    data.map((data, index) => {
        const payload = {
            value: data["mak"],
            label: data["mak"] + " - " + data["uraian"],
        }
        options.push(payload)
    }) 
    
    const handleOption = (value) => {
        setValue(value)
    }
    return (
        <div className={`mb-6 ${position ? 'flex gap-2 items-center' : null}`}>
            <label htmlFor={"header"} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{title}</label>
            <Select 
                options={options}
                value={value}
                className="basic-single w-full"
                onChange={handleOption}
            />
        </div>
    )
}