import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import BreadCump from "../component/breadCump";
import Button from "../component/button";
import SelectInput from "../component/SelectInput";
import dataFake from "../helpers/fakeDataNested";
import routeName from "../helpers/routeName";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import pendapatanApi from "../api/pendapatanApi";
import LoadingSpinner from "../component/loadingSpinner";
import fakeData from "../helpers/fakeData";
import ParentTableDetailPendapat from "../component/parentTableDetailPendapatan";
import ModalEditMasterDetailPendapatan from "../component/modalEditMasterDetailPendapatan";


export default function DetailPendapatan() {
    const {uuid} = useParams()
    const MySwal = withReactContent(Swal)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const titlesBreadCump = [ "Master","Pendapatan/Tarif"]
    const jumlahRow = [
        "10", "25", "50", "100"
    ]

    const [limit, setLimit] = useState("10")
    const [isLoading, setIsLoading] = useState(false)
    const [cari, setCari] = useState("")
    const [reload, setReload] = useState(false)
    const [data, setData] = useState([])
    const [offSet, setOffset] = useState("0")
    const [totalRow, setTotalRow] = useState("")
    const [totalPages, setTotalPages] = useState("")
    const [showModalEdit, setShowModalEdit] = useState(false)
    const [dataDetail, setDataDetail] = useState({})
    const [dataParent, setDataParent] = useState({})
    console.log(uuid)
    const handleKembali = () => {
        navigate(routeName.pendapatan)
    }

    const handleTambahDetail = () => {
        navigate(`/detail-pendapatan/tarif/tambah/${dataParent["uuid"]}/${dataParent["kode_akun"]}`)
    }

    const handleDelete = async (payload) => {
        MySwal.fire({
            title: `Apakah anda yakin ingin menghapus data ini "${payload.uraian}"?`,
            text: "Anda tidak dapat mengembalikannya!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                pendapatanApi.deleteDetailPendapatan(payload.uuid)
                .then(() => {
                    setReload(!reload)
                    MySwal.fire(
                        'Terhapus!',
                        'Data anda sudah terhapus.',
                        'success'
                    )
                })
                .cacth((err) => {
                    setReload(!reload)
                    MySwal.fire({
                        icon: "error",
                        title: err.message,
                        });
                })
                
            }
          })
       
    }
    const HandleShowEdit = (data) => {
        setShowModalEdit(true)
        setDataDetail({...data})
    }

    const handleCari = async (event) => {
        event.preventDefault()
        try {
            setIsLoading(true)
            const payload = {
                uuid:uuid,
                search: cari,
                limit,
                offset: offSet
            }
            const result = await pendapatanApi.getListDetailPendapatan(payload)
            if(result) {
                setIsLoading(false)
                setReload(!reload)
                console.log(result)
                setTotalPages(result["total_pages"])
                setTotalRow(result["totalRow"])
                setDataParent(result["parent"])
                
                setData(result.data)
            }
            
        }
        catch(error) {
            const message = (
                error.response && 
                error.response.data && 
                error.response.data.message ||
                error.message ||
                error.toString())
            const payload = {
                message: message,
                status: false
            }
            setIsLoading(false)
           console.log(message)
        }
    }

    const listDetailPendapatanBelanja = async () => {
        setIsLoading(true)
        try {
            const payload = {
                uuid:uuid,
                search: cari,
                limit,
                offset: offSet
            }
            const result = await pendapatanApi.getListDetailPendapatan(payload)
            if(result) {
                setIsLoading(false)
                console.log(result)
                setTotalPages(result["total_pages"])
                setTotalRow(result["totalRow"])
                setDataParent(result["parent"])
                
                setData(result.data)
            }
            
        }
        catch(error) {
            const message = (
                error.response && 
                error.response.data && 
                error.response.data.message ||
                error.message ||
                error.toString())
            const payload = {
                message: message,
                status: false
            }
            setIsLoading(false)
           console.log(message)
        }
    }
    // const paginationData = async () => {
    //     setIsLoading(true)
    //     try {
    //         const payload = {
    //             search: cari,
    //             limit,
    //             offset: offSet
    //         }
    //         const result = await pendapatanApi.getListDetailPendapatan(payload)
    //         if(result) {
    //             setIsLoading(false)
    //             setData(result.data)
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

    // useEffect(() => {
    //     paginationData()
    // },[offSet])

    useEffect(() => {
        listDetailPendapatanBelanja()
    }, [limit,reload,offSet])

    return(
        <div className="p-4 w-full h-full overflow-y-auto" >

            {
                dataDetail &&
                <ModalEditMasterDetailPendapatan showModal={showModalEdit} uuidParent={uuid} data={dataDetail} setShowModal={setShowModalEdit} reload={reload} setReload={setReload} />
            }
            <div className="p-4 rounded-lg mt-14 " >
                <div className="flex flex-row justify-between items-center border-b dark:border-gray-700 p-4 mb-4 rounded bg-gray-50">
                    <h1 className="text-lg font-extrabold dark:text-white">List Pendapatan/Tarif</h1>
                    <BreadCump titles={titlesBreadCump} />
                </div>
                <div className="flex flex-col h-auto  p-9 mb-4 rounded bg-gray-50 dark:bg-gray-800">
                    <Button title={"Kembali"} handleFunction={handleKembali} color={"red"} />
                    <div className="flex justify-between items-center p-4 my-4 rounded bg-gray-100" >
                        {
                            dataParent &&
                            <div>
                                <div>
                                    <span className="font-bold">Kode Akun Pendapatan: </span>
                                    <span>{dataParent["kode_akun"]}</span>
                                </div>
                                <div>
                                    <span className="font-bold">Uraian: </span>
                                    <span>{dataParent["uraian"]}</span>
                                </div>
                            </div>
                        }
                            
                        <Button mb={false} title={"Tambah Detail"} handleFunction={handleTambahDetail} />
                        
                    </div>
                    <div className="flex flex-row w-full justify-between items-center mb-4">
                        <SelectInput width={"w-24"} titles={jumlahRow} isValue={limit} setValue={setLimit} />
                        <form className="" onSubmit={handleCari}>   
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
                        <ParentTableDetailPendapat data={data} itemsPerPage={limit} handleDelete={handleDelete} handleEdit={HandleShowEdit} reload={reload} setReload={setReload} isLoading={isLoading} />
                    }
                </div>   
            </div>
        </div>
    )
}