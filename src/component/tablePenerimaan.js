import Button from "./button"
import { useState } from "react"
import LoadingSpinner from "./loadingSpinner"
import { useDispatch } from "react-redux"
import { setItemEdit } from "../redux/feature/penerimaSlice"
import penerimaanApi from "../api/penerimaanApi"
import ButtonEdit from "./buttonEdit"
import ButtonDelete from "./buttonDelete"
import ModalDelete from "./modalDelete"
import ModalEdit from "./modalEdit"
import ButtonDetail from "./buttonDetail"
import rupiah from "../helpers/rupiah"
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function TablePenerimaan ({data,  isLoading , category, tittles, setReload, reload}) {
    const MySwal = withReactContent(Swal)
    const dispatch = useDispatch()
    const [showModalEdit, setShowModalEdit] = useState(false)
    const [showModalDel, setShowModalDel] = useState(false)
    const [showModalDetail, setShowModalDetail] = useState(false)
    const [uuId, setUuid] = useState("")

    const titleDefault = [
        "No", "Tanggal Transaksi", "Jenis Transaksi", "Kode Akun", "Nilai", "Update"
    ]
    
    const handleModalEdit = (payload) => {
        setShowModalEdit(true)
        const dataTes = {...payload} 
        dispatch(setItemEdit(dataTes))
    }

    const handleModalDelete = (payload) => {
        setUuid(payload)
        setShowModalDel(true)
    }

    const handleShowModalEdit = () => {
        setShowModalEdit(!showModalEdit)
        setReload(!reload)
    }

    const handleShowModalDetail = () => {
        setShowModalDetail(!showModalDetail)
    }

    const handleDelete = () => {
        const payload = {
            uuid: uuId,
            jns_transaksi: "Penerimaan" 
        }
        console.log(uuId)
        dispatch(penerimaanApi.deletePenerimaan(payload))
        .then(() => {
            setReload(!reload)
            MySwal.fire({
                icon: "success",
                title: "Data Penerimaan Berhasil Di Hapus",
            })
        })
        .catch((err) => {
            MySwal.fire({
                icon: "error",
                title: "Gagal Menghapus Data Penerimaan",
              });
        })
    }
   
    return(
        <div className={`relative overflow-x-auto shadow-md sm:rounded-lg ${isLoading ? "h-96" : "h-auto"} overflow-y-auto mb-4`}>
            
            {   isLoading && 
                <div className="w-full h-full">
                    <LoadingSpinner />
                </div>  
            }
            <table className={` ${isLoading ? "hidden" : null} w-full h-auto text-sm text-left text-gray-500 dark:text-gray-400 mb-5`}>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {
                            tittles &&  
                            tittles.map((title, index) => {
                                return(
                                    <th key={index} scope="col" className="px-3 py-3">
                                        {title}
                                    </th> 
                                )
                            }) 
                        }
                        
                        <th scope="col" className="px-3 py-3">
                            Aksi
                        </th>
                    </tr>
                </thead>
                <tbody>
                        {
                            data ? 
                            data.map((item, index) => {
                                return(
                                    <tr key={index} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 mx:h-1">
                                        <th  scope="row" 
                                            className={`
                                                        px-3 
                                                        py-2 
                                                        font-medium 
                                                        text-gray-900 
                                                        whitespace-nowrap 
                                                        dark:text-white
                                                        
                                                        `}
                                        >
                                            {index + 1}
                                        </th>
                                        <th scope="row" 
                                            className={`
                                                        px-3 
                                                        py-2 
                                                        font-medium 
                                                        text-gray-900 
                                                        whitespace-nowrap 
                                                        dark:text-white
                                                        `}
                                        >
                                            {item["tgl_transaksi"]}
                                        </th>
                                        <th scope="row" 
                                            className={`
                                                        px-3 
                                                        py-2 
                                                        font-medium 
                                                        text-gray-900 
                                                        whitespace-nowrap 
                                                        dark:text-white
                                                        `}
                                        >
                                            {item["jns_transaksi"] || item["kdbank"]}
                                        </th>
                                        <th scope="row" 
                                            className={`
                                                        px-3 
                                                        py-2 
                                                        font-medium 
                                                        text-gray-900 
                                                        whitespace-nowrap 
                                                        dark:text-white
                                                        `}
                                        >
                                            {item["kode_akun"] || item["no_rekening"]}
                                        </th>
                                        <th scope="row" 
                                            className={`
                                                        px-3 
                                                        py-2 
                                                        font-medium 
                                                        text-gray-900 
                                                        whitespace-nowrap 
                                                        dark:text-white
                                                        `}
                                        >
                                            {rupiah(item["bayar"], "Rp.") ||rupiah(item["saldo_akhir"], "Rp.")}
                                        </th>
                                        <th scope="row" 
                                            className={`
                                                        px-3 
                                                        py-2 
                                                        font-medium 
                                                        text-gray-900 
                                                        whitespace-nowrap
                                                        ${item["status_update"] == 'Pending' ? 'text-red-400 font-semibold' : 'text-green-400 font-semibold'} 
                                                        dark:text-white
                                                        `}
                                        >
                                            {item["status_update"]}  
                                        </th>
                                        <td className="px-3 py-2">
                                            {
                                                item["status_update"] === 'Posting' ?
                                                <ButtonDetail key={index} handleFunction={handleShowModalDetail} showModal={showModalDetail} itemData={item} category={category} />
                                                :
                                                <div>
                                                    <ButtonEdit handleFunction={handleModalEdit} title="Edit" color="yellow" data={item} />
                                                    <ModalEdit handleFunction={handleShowModalEdit} category={category} showModal={showModalEdit} setShowModal={setShowModalEdit} setReload={setReload} reload={reload} />
                                                    <ButtonDelete handleFunction={handleModalDelete} uuid={item["uuid"]} title="Hapus" color="red" />
                                                    <ModalDelete handleFunction={handleDelete} category={category} showModal={showModalDel} setShowModal={setShowModalDel} />
                                                </div>
                                            }
                                        </td>
                                    </tr>    
                                )
                            })
                            :
                            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"></tr>
                        }
                </tbody>
            </table> 
        </div>
    )
}