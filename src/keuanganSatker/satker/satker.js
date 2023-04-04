import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import dataFake from "../../helpers/fakeDataNested";
import ModalUpload from "../../component/modalUpload";
import satkerApi from "../../api/satkerApi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import SatkerTable from "../../component/satkerTable";
import BreadCump from "../../component/breadCump";
import Button from "../../component/button";
import SelectInput from "../../component/SelectInput";
import Select2Periode from "../../component/select2Periode";
import LoadingSpinner from "../../component/loadingSpinner";
import { set } from "date-fns";

export default function Satker() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const MySwal = withReactContent(Swal)
    const titlesBreadCump = [ "Master","Operasional","Satuan Kinerja"]
    const jumlahRow = [
        "10", "25", "50", "100"
    ]
    
    const [limit, setLimit] = useState("10")
    
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingDefault, setIsLoadingDefault] = useState(false)
    const [cari, setCari] = useState("")
    const [reload, setReload] = useState(false)
    const [show, setShow] = useState(false)
    const [data, setData] = useState("")
    const [periodeDef, setPeriodeDef] = useState({
        value: "",
        label: "",
    })
    const [dataPeriode, setDataPeriode] = useState([])
    const [offSet, setOffset] = useState("0")
    const [totalRow, setTotalRow] = useState("")
    const [totalPages, setTotalPages] = useState("")
    const [page, setPage] = useState(1)

    const handleShowModalUplad = () => {
        setShow(!show)
    }

    const getPeriode = async () => {
        try {
            const result = await satkerApi.getPeriodeSatker()
            if(result) {
                console.log("status true", )
                result.map((item)=> {
                    if(item["status_priode"] == "true") {
                        const payload = {
                            value: item["priode"],
                            label: item["priode"],
                        }
                        setPeriodeDef(payload)
                    }
                })
                setDataPeriode(result)
            }
            return result
        }
        catch (err) {
            MySwal.fire({
                icon: "error",
                title: err.message,
              });
        }
    }

    const getDataListSatker = async () =>{
        setIsLoading(true)
        try {
            const resultPeriode = await getPeriode()
            if(resultPeriode) {
                const payload = {
                    periode: periodeDef.value,
                    cari,
                    limit,
                    offSet:offSet
                }
                const result = await satkerApi.getListSatker(payload)
                if(result) {
                    setIsLoading(false)
                    setTotalPages(result["total_pages"])
                    setTotalRow(result["totalRow"])
                    return setData(result.data)
                }
                setIsLoading(false)
            }
            setIsLoading(false)
        }
        catch (err) {
            setIsLoading(false)
            MySwal.fire({
                icon: "error",
                title: "Gagal Mengambil Data Satuan Kerja",
              });
        }
    }

    // const paginationData = async () => {
    //     setIsLoading(true)
    //     try {
    //         const payload = {
    //             periode: periodeDef.value,
    //             cari,
    //             limit,
    //             offset: offSet
    //         }
    //         const result = await satkerApi.getListSatker(payload)
    //         if(result) {
    //             setIsLoading(false)
    //             setData(result.data)
    //             // setTotalRow(result["totalRow"])
    //         } else {
    //             setIsLoading(false)
    //             setData([])
    //             MySwal.fire({
    //                 icon: "error",
    //                 title: "Gagal mengambil data master pendapatan",
    //             });
    //         }
            
    //     }
    //     catch(error) {
    //         console.log(error)
    //         setIsLoading(false)
    //         MySwal.fire({
    //             icon: "error",
    //             title: error.message,
    //         });
    //     }
    // }
   

    const handdleDefaultPeriode = async () => {
        setIsLoadingDefault(true)
        try {
            const result = await satkerApi.postDefaultPeriode(periodeDef.value)
            if(result) {
                setIsLoadingDefault(false)
                setReload(!reload)
                MySwal.fire({
                    icon: "success",
                    title: "berhasil update default periode",
                })
                
            }
            setReload(!reload)
            setIsLoadingDefault(false)
        }
        catch (err) {
            setIsLoadingDefault(false)
            MySwal.fire({
                icon: "error",
                title: "Gagal setup Periode Satuan Kerja",
              });
        }
    }

    const handleCari = async (event) => {
        event.preventDefault()
        setIsLoading(true)
        const payload = {
            periode: periodeDef.value,
            cari,
            limit,
            offset: offSet
        }
        const result = await satkerApi.getListSatker(payload)
        if (result) {
            setIsLoading(false)
            setTotalPages(result["total_pages"])
            setTotalRow(result["totalRow"])
            setData(result.data)
        } else {
            setIsLoading(false)
            MySwal.fire({
                icon: "error",
                title: "Gagal Mengambil Data Satuan Kerja",
              });
        }
    }

    // useEffect(() => {
    //     paginationData()
    // },[offSet])

    useEffect(() => {
        getDataListSatker()
    },[limit,reload,offSet])
    return(
        <div className="relative p-4 w-full h-full overflow-y-auto" >
            <ModalUpload show={show} setShow={setShow} handleFunction={handleShowModalUplad} titleForm={"UPLOAD DATA DARI SAKTI"} reload={reload} setReload={setReload} />
            <div className="p-4 rounded-lg mt-14 " >
                <div className="flex flex-row justify-between items-center border-b dark:border-gray-700 p-4 mb-4 rounded bg-gray-50">
                    <h1 className="text-lg font-extrabold dark:text-white">List Rincian Satuan Kerja</h1>
                    <BreadCump titles={titlesBreadCump} />
                </div>
                <div className="flex flex-row justify-between items-center border-b dark:border-gray-700 p-4 mb-4 rounded bg-gray-50">
                    <div className="w-1/3">
                        <Select2Periode data={dataPeriode} value={periodeDef} setValue={setPeriodeDef} reload={reload} />
                    </div>
                    <div className="flex gap-4">
                        {/* <div className="">
                            <button 
                                className="
                                    block 
                                    text-white 
                                    bg-blue-700 
                                    hover:bg-blue-800 
                                    focus:ring-4 
                                    focus:outline-none 
                                    focus:ring-blue-300 
                                    font-medium 
                                    rounded-lg 
                                    text-sm 
                                    px-5 
                                    py-2.5 
                                    " 
                                    type="button"
                                    onClick={handdleDefaultPeriode}
                            >
                                Set Default
                            </button>
                        </div> */}
                        <Button handleFunction={handdleDefaultPeriode} isLoading={isLoadingDefault} title="Set Default" mb={false} />
                        <div className="">
                            <button 
                                className="
                                    block 
                                    text-white 
                                    bg-blue-700 
                                    hover:bg-blue-800 
                                    focus:ring-4 
                                    focus:outline-none 
                                    focus:ring-blue-300 
                                    font-medium 
                                    rounded-lg 
                                    text-sm 
                                    px-5 
                                    py-2.5 
                                    text-center 
                                    dark:bg-blue-600 
                                    dark:hover:bg-blue-700 
                                    dark:focus:ring-blue-800
                                    " 
                                    type="button"
                                    onClick={handleShowModalUplad}
                            >
                                Upload Data
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col h-auto  p-9 mb-4 rounded bg-gray-50 dark:bg-gray-800">
                    <div className="flex flex-row w-full justify-between items-center mb-4">
                        <SelectInput width={"w-24"} titles={jumlahRow} isValue={limit} setValue={setLimit} />
                        <form className="flex items-start gap-4 w-5/6 justify-end" onSubmit={handleCari} >  
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
                        <SatkerTable 
                            data={data} 
                            itemsPerPage={limit} 
                            offSet={offSet} 
                            setOffset={setOffset} 
                            setIsLoading={setIsLoading} 
                            isLoading={isLoading} 
                            setReload={setReload} 
                            reload={reload} 
                            page={page} 
                            pageCount={totalPages} 
                            setPage={setPage} 
                            totalRow={totalRow} 
                        />
                </div>   
            </div>
        </div>
    )
}