import Button from "../../component/button";
import { useNavigate } from "react-router-dom";
import SelectInput from "../../component/SelectInput";
import BreadCump from "../../component/breadCump";
import TableWithPagination from "../../component/tableWithPagination";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import saldoPengelolaanKasApi from "../../api/saldoPengelolaanKasApi";
import { failMessage } from "../../redux/feature/errorHandlingSlice";
import routeName from "../../helpers/routeName";

export default function SaldoPengelolaanKas() {
    const titlesBreadCump = ["Keuangan", "Saldo Pengelolaan Kas"]
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const dataSaldoPengelolaanKas = useSelector(state => state.saldoPengelolaanKas.data)
    const [limit, setLimit] = useState("10")
    const [isLoading, setIsLoading] = useState(false)
    const [cari, setCari] = useState("")
    const [reload, setReload] = useState(false)

    const jumlahRow = [
        "10", "25", "50", "100"
    ]

    const tambahSaldoPengelolaanKas = () => {
        navigate(routeName.tambahSaldoPeneglolaanKas)
    }

    const handleCari = (event) => {
        event.preventDefault()
        setIsLoading(true)
        const payload = {
            limit: limit,
            cari: cari
        }
        if(cari) {
            dispatch(saldoPengelolaanKasApi.getCariData(payload))
            .then(() => {
                setIsLoading(false)
            })
            .catch((err) => {
                setIsLoading(false)
            })
        } else {
            dispatch(saldoPengelolaanKasApi.getListSaldoPengelolaanKas(payload))
            .then(() => {
                setIsLoading(false)
            })
            .catch((err) => {
                const payload = {
                    message: "koneksi terputus, silahkan login ulang",
                    status: false,
                }
                dispatch(failMessage(payload))
                setIsLoading(false)
            })
        }
    }

    useEffect(() => {
        setIsLoading(true)
        const payload = {
            limit: limit
        }
        dispatch(saldoPengelolaanKasApi.getListSaldoPengelolaanKas(payload))
        .then(() => {
            setIsLoading(false)
        })
        .catch((err) => {
            const payload = {
                message: "koneksi terputus, silahkan login ulang",
                status: false,
            }
            dispatch(failMessage(payload))
            setIsLoading(false)
        })
    },[limit, reload])

    return(
        <div className="p-4 w-full h-full overflow-y-auto">
            <div className="p-4 mt-14 ">    
                <div className="flex flex-row justify-between items-center border-b border-gray-200 dark:border-gray-700 p-4 mb-4 rounded bg-gray-50">
                    <h1 className="text-lg font-extrabold dark:text-white">Saldo Pengelolaan Kas</h1>
                    <BreadCump titles={titlesBreadCump} />
                </div>

                <div className="flex flex-col h-auto  p-9 mb-4 rounded bg-gray-50 dark:bg-gray-800">
                    <div className="mb-5">
                        <Button handleFunction={tambahSaldoPengelolaanKas} title={"Tambah Saldo Pengelolaan Kas"} />
                    </div>
                    {/* Search */}
                    <div className="flex flex-row w-full justify-between items-center mb-4">
                        <SelectInput width={"w-24"} titles={jumlahRow} />
                        <form className="" onSubmit={handleCari} >   
                            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                            <div className="relative w-96">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                </div>
                                <input 
                                        type="search" 
                                        id="default-search" 
                                        className="
                                                    block 
                                                    w-full 
                                                    p-4 
                                                    pl-10 
                                                    text-sm 
                                                    text-gray-900 
                                                    border 
                                                    border-gray-300 
                                                    rounded-lg 
                                                    bg-gray-50 
                                                    focus:ring-blue-500 
                                                    focus:border-blue-500 
                                                    " 
                                        placeholder="Silahkan Masukkan data yg ingin dicari"
                                        value={cari} 
                                        onChange={(e) => setCari(e.target.value) }
                                />
                                <button 
                                        type="submit" 
                                        className="
                                                text-white 
                                                absolute 
                                                right-2.5 
                                                bottom-2.5 
                                                bg-blue-700 
                                                hover:bg-blue-800 
                                                focus:ring-4 
                                                focus:outline-none 
                                                focus:ring-blue-300 
                                                font-medium 
                                                rounded-lg 
                                                text-sm 
                                                px-4 
                                                py-2 
                                                dark:bg-blue-600 
                                                dark:hover:bg-blue-700 
                                                dark:focus:ring-blue-800"
                                >
                                    Cari
                                </button>
                            </div>
                        </form>
                    </div>
                    {/* Table Penerimaan */}
                    <TableWithPagination 
                        data={dataSaldoPengelolaanKas} 
                        category={"saldoPengelolaanKas"} 
                        isLoading={isLoading}  
                        itemsPerPage={limit}
                        reload={reload}
                        setReload={setReload}
                    />
                </div>              
            </div>
        </div>
    )
}