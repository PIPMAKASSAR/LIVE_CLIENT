import Button from "../../component/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BreadCump from "../../component/breadCump";
import SelectInput from "../../component/SelectInput";
import { useSelector, useDispatch } from "react-redux";
import penerimaanApi from "../../api/penerimaanApi";
import { failMessage, clearErrorMessage } from "../../redux/feature/errorHandlingSlice";
import { clearPenerimaanStatus } from "../../redux/feature/penerimaSlice";
import ErrorMsg from "../../component/errorMsg";
import SuccessMsg from "../../component/successMsg";
import TableWithPagination from "../../component/tableWithPagination";
import routeName from "../../helpers/routeName";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Penerimaan() {
    const MySwal = withReactContent(Swal)
    const titlesBreadCump = ["Keuangan", "Penerimaan"]
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const errorMessage = useSelector(state => state.errorHandling.getError)
    const statusDelete = useSelector(state => state.penerimaan.hapus)

    const [isLoading, setIsLoading] = useState(false)
    const [cari, setCari] = useState("")
    const [reload, setReload] = useState(false)

    const [limit, setLimit] = useState("10")
    const [offSet, setOffset] = useState("0")
    const [totalPages, setTotalPages] = useState("")
    const [totalRow, setTotalRow] = useState("")

    const jumlahRow = [
        "10", "25", "50", "100"
    ]

    const tambahPenerimaan = () => {
        navigate(routeName.tambahPenerima)
    }

    const handleCari = async (event) => {
        try {
            event.preventDefault()
            setIsLoading(true)
            const payload = {
                limit:limit,
                cari: cari,
                offSet: offSet,
            }
            const result = await penerimaanApi.getListPenerima(payload)
            if(result.status) {
                setIsLoading(false)
                // setReload(!reload)
                setTotalPages(result["total_pages"])
                setTotalRow(result["totalRow"])
                setData(result.data)
            }
        }
        catch(err) {
            setIsLoading(false)
            setData([])
            MySwal.fire({
                icon: "error",
                title: "Gagal mengambil data penerimaan",
            });
        }
    }

    const handleGetListDataPenerimaan = async () => {
        try {
            setIsLoading(true)
            const payload = {
                limit:limit,
                cari: cari,
                offset: offSet,
            }
            const result = await penerimaanApi.getListPenerima(payload)
            if(result.status) {
                setIsLoading(false)
                setTotalPages(result["total_pages"])
                setTotalRow(result["totalRow"])
                setData(result.data)
            }
        }
        catch(err) {
            setIsLoading(false)
            setData([])
            MySwal.fire({
                icon: "error",
                title: "Gagal mengambil data penerimaan",
            });
        }
    }

    useEffect(() => {
       handleGetListDataPenerimaan()
    },[limit, reload, offSet])

    return(
        <div className="p-4 w-full h-full overflow-y-auto">
            <div className="p-4 rounded-lg mt-14 ">    
                <div className="flex flex-row justify-between items-center border-b dark:border-gray-700 p-4 mb-4 rounded bg-gray-50">
                    <h1 className="text-lg font-extrabold dark:text-white">Penerimaan</h1>
                    <BreadCump titles={titlesBreadCump} />
                </div>

                <div className="flex flex-col h-auto  p-9 mb-4 rounded bg-gray-50 dark:bg-gray-800">
                    <div className="mb-5">
                        <Button handleFunction={tambahPenerimaan} title={"Tambah Penerimaan"} />
                    </div>
                    {/* Search */}
                    <div className="flex flex-row w-full justify-between items-center mb-4">
                        <SelectInput width={"w-24"} titles={jumlahRow} isValue={limit} setValue={setLimit} />
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
                    {
                        data && 
                        <TableWithPagination 
                            data={data}  
                            category={"penerimaan"}  
                            isLoading={isLoading}  
                            itemsPerPage={limit}
                            reload={reload}
                            setReload={setReload}
                            offSet={offSet}
                            setOffset={setOffset}
                            pageCount={totalPages} 
                            totalRow={totalRow}
                            />
                    }
                </div>              
            </div>
        </div>
    )
}