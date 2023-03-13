import Select from "react-select"
export default function InputSelect({data, value, setValue, title, defaultValue, category, position = false}) {
    const options = data

    const handleOption = (value) => {
        setValue(value)
    }
    return (
        <div className={`mb-6 ${position ? 'flex gap-2 items-center' : null}`}>
            <label htmlFor={"area"} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{title}</label>
            <Select 
                options={options}
                value={value}
                className="basic-single w-full"
                onChange={handleOption}
            />
            {/* <select 
                    id="area"
                    name="area" 
                    className="
                        block 
                        w-full 
                        p-2 
                        text-gray-900 
                        border 
                        border-gray-300 
                        rounded-md 
                        bg-gray-50 
                        sm:text-xs 
                        focus:ring-blue-500 
                        focus:border-blue-500 
                    "
                    value={value}
                    onChange = {(e) => setValue(e.target.value)}
                    required
            > 
            {
                category === "header" &&
                <option defaultValue={""}>{defaultValue}</option>
            }
                {
                    data &&
                    data.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                    ))
                }
            </select> */}
        </div>
    )
}