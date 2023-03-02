export default function InputFieldUraian({title, value, setValue, keterangan}) {
    return(
        <div className="mb-6">
            <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{title}</label>
            <input 
                type="text" 
                id="default-input" 
                className="
                    bg-gray-50 
                    border 
                    border-gray-300 
                    text-gray-900 
                    text-sm 
                    rounded-lg 
                    focus:ring-blue-500 
                    focus:border-blue-500 
                    block 
                    w-full
                    h-24 
                    p-2.5 
                    " 
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    )
}