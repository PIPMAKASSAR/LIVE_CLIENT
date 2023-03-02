import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { Await, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import TableNormal from "../../component/tableNormal";
import BreadCump from "../../component/breadCump";
import Button from "../../component/button";
import SelectInput from "../../component/SelectInput";
import LoadingSpinner from "../../component/loadingSpinner";
import routeName from "../../helpers/routeName";
import fakeData from "../../helpers/fakeData";
import TableBelanja from "../../component/tableBelanja";
import TextFieldNoRequired from "../../component/textFieldNoRequred";
import belanjaApi from "../../api/belanjaApi";
import ModalEditBelanja from "../../component/modalEditBelanja";


export default function Belanja() {
    const titlesBreadCump = [ "Master","Belanja"]
    const MySwal = withReactContent(Swal)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const jumlahRow = [
        "10", "25", "50", "100"
    ]

    const title = [
        "No", 'Mak', 'Penerima', 'Uraian', 'Nilai', 'Pajak',
    ]

    const [limit, setLimit] = useState("10")
    const [isLoading, setIsLoading] = useState(false)
    const [cari, setCari] = useState("")
    const [periode, setPeriode] = useState("")
    const [reload, setReload] = useState(false)
    const [data, setData] = useState([])
    const [showModalEdit, setShowModalEdit] = useState(false)
    const [dataBelanja, setDataBelanja] = useState({})

    const handleTambah = () => {
        navigate(routeName.tambahBelanja)
    }

    const handleDelete = (payload) => {
        MySwal.fire({
            title: `Apakah anda yakin ingin menghapus data ini ${payload}?`,
            text: "Anda tidak dapat mengembalikannya!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                belanjaApi.deleteBelanja(payload)
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
                        title: "Gagal Menghapus belanja",
                        });
                })
                
            }
          })
       
    }
    const handleShowEdit = (data) => {
        setShowModalEdit(true)
        setDataBelanja({...data})
    }

    const handleCari = async (event) => {
        event.preventDefault()
        setIsLoading(true)
        const result = await belanjaApi.getListBelanja(cari)
        if (result) {
            setIsLoading(false)
            setData(result)
        } else {
            setIsLoading(false)
            MySwal.fire({
                icon: "error",
                title: "Gagal Mengambil Data Penerima",
              });
        }
    }

    const getAllBelanja = async () => {
        setIsLoading(true)
        const result = await belanjaApi.getListBelanja()
        if (result) {
            setIsLoading(false)
            setData(result)
        } else {
            setIsLoading(false)
            MySwal.fire({
                icon: "error",
                title: "Gagal Mengambil Data Penerima",
              });
        }
    } 

    useEffect(() => {
        getAllBelanja()
    }, [limit,reload])


    return (
        <div className="p-4 w-full h-full overflow-y-auto" >

            {
                dataBelanja &&
                <ModalEditBelanja showModal={showModalEdit} data={dataBelanja} setShowModal={setShowModalEdit} reload={reload} setReload={setReload} />
            }
            <div className="p-4 rounded-lg mt-14 " >
                <div className="flex flex-row justify-between items-center border-b dark:border-gray-700 p-4 mb-4 rounded bg-gray-50">
                    <h1 className="text-lg font-extrabold dark:text-white">List Belanja</h1>
                    <BreadCump titles={titlesBreadCump} />
                </div>
                <div className="flex flex-col h-auto  p-9 mb-4 rounded bg-gray-50 dark:bg-gray-800">
                    <div className="mb-5">
                        <Button title={"Tambah Belanja"} handleFunction={handleTambah} />
                    </div>
                    <div className="flex flex-row w-full justify-between items-center mb-4">
                        <SelectInput width={"w-24"} titles={jumlahRow} isValue={limit} setValue={setLimit} />
                        <form className="flex gap-4 w-full justify-end" onSubmit={handleCari} >   
                            <div className="relative basis-1/2">
                                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                <div className="" >
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
                            </div>
                        </form>
                    </div>
                    {
                        isLoading ?
                        <LoadingSpinner />
                        :
                        <TableBelanja title={title} data={data} itemsPerPage={limit} handleDelete={handleDelete} handleEdit={handleShowEdit} />
                    }
                </div>   
            </div>
        </div>
    )
}