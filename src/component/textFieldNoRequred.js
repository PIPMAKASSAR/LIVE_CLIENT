import handleKeyPress from "../helpers/handleKeyPress"

export default function TextFieldNoRequired({title, value, setValue, keterangan, isError}) {
    return(
        <div className="mb-6 w-auto">
                <label htmlFor="KodeAkun" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{title}</label>
                <input 
                        type="text" 
                        id="KodeAkun" 
                        className="
                                    block 
                                    w-full 
                                    p-2 
                                    text-gray-900 
                                    border 
                                    border-gray-300 
                                    rounded-lg 
                                    bg-gray-50 
                                    sm:text-xs 
                                    focus:ring-blue-500 
                                    focus:border-blue-500 
                                    "
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                />
                {
                    isError ?
                    <p className={` ${isError ? "text-red-600" : null} mt-2 text-sm`}>{ isError ? isError : keterangan}</p>
                    :
                    <p className={`mt-2 text-sm`}>Jika memilih jenis "detail" mohon untuk mengimput "-"</p>
                }
            </div>
    )
}