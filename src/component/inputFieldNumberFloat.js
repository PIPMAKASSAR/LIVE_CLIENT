
import handleKeyPressNumberFloat from "../helpers/handelKeyPressNumberFloat"
export default function InputFieldNumberFloat({title, value, setValue, keterangan}) {
    const handleInput = (e) => {
        const inputValue = e.target.value;
        // Allow digits and a single decimal point
        const newValue = inputValue.replace(/[^0-9.]/g, "");
        setValue(newValue);
      };
    return(
        <div className="mb-6 w-full">
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
                    pattern="[0-9.]*"
                    onChange={handleInput}
                    required 
            />
            <p className="mt-2 text-sm">{keterangan}</p>
        </div>
    )
}