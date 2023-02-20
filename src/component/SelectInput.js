import { useState } from "react"

export default function SelectInput({handleFunction, title = "Button", width, isLoading, color = "blue", type = "button", titles, isValue, setValue}) {
    const [isShow, setIsShow] = useState(false)
    return(
        <div className="">
            <select id="countries" 
                    className={`
                            bg-gray-50 
                            border 
                            border-gray-300 
                            text-gray-900 
                            text-sm 
                            rounded-lg 
                            focus:ring-blue-500 
                            focus:border-blue-500 
                            block 
                            ${width ? `${width}` : `w-auto`}  
                            p-2.5 
                            `}
                    value={isValue}
                    onChange={(e) => setValue(e.target.value)}
            >
                {
                    titles ?
                    titles.map((item, index) => {
                        return item === "10" ?
                        <option defaultValue={item} key={index} value={item}>{item}</option>
                        :
                        <option key={index} value={item}>{item}</option>                                                
                    })
                    :
                    <option defaultValue={10}>nda ada</option>
                }
            </select>
        </div>
    )
}