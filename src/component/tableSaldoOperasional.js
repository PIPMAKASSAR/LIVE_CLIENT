import Button from "./button"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { setItemSaldoOperasional } from "../redux/feature/saldoOperasionalSlice"
import ButtonDetail from "./buttonDetail"
import LoadingSpinner from "./loadingSpinner"
import ModalEdit from "./modalEdit"
import ModalDelete from "./modalDelete"
import ModalDetail from "./modalDetail"
import ButtonDelete from "./buttonDelete"
import saldoOperasionalApi from "../api/saldoOperasionalApi"
import ButtonEdit from "./buttonEdit"
import FormEditSaldoOperasional from "./formEditSaldoOperasional"
import rupiah from "../helpers/rupiah"
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function TableSaldoOperasional ({data,  isLoading , category, setReload, reload}) {
    const MySwal = withReactContent(Swal)
    const dispatch = useDispatch()
    const [showModalEdit, setShowModalEdit] = useState(false)
    const [showModalDel, setShowModalDel] = useState(false)
    const [showModalDetail, setShowModalDetail] = useState(false)
    const [uuId, setUuid] = useState("")
    const [detailData, setDetailData] = useState({})

    const titleDefault = [
        "No", "Tanggal Transaksi", "Bank", "Rekening", "Unit", "Saldo Akhir", "Update"
    ]

    const title = [
        "uuid", "tgl_transaksi","kdbank", "no_rekening", "unit", "saldo_akhir","status_update"
    ]
    
    const handleModalDelete = (payload) => {
        setUuid(payload)
        setShowModalDel(true)
    }

    const handleShowModalEdit = (value) => {
        setShowModalEdit(!showModalEdit)
        setDetailData({...value})
    }

    const handleShowModalDetail = (value) => {
        setShowModalDetail(true)
        setDetailData({...value})
    }

    const handleDelete = () => {
        const payload = {
            uuid: uuId
        }
        dispatch(saldoOperasionalApi.deleteSaldoOperasional(payload))
        .then(() => {
            setReload(!reload)
            MySwal.fire({
                icon: "success",
                title: "Data Saldo Operasional Berhasil Di Hapus",
            })
        })
        .catch((err) => {
            MySwal.fire({
                icon: "error",
                title: "Gagal Menghapus Data Operasional",
              });
        })
    }
   
    return(
        <div className={`relative overflow-x-auto shadow-md sm:rounded-lg ${isLoading ? "h-96" : "h-auto"} overflow-y-auto mb-4`}>
            <ModalDetail data={detailData}  showModal={showModalDetail} setShowModal={setShowModalDetail} title={title} />
            <ModalEdit data={detailData} category={category} showModal={showModalEdit} setShowModal={setShowModalEdit} setReload={setReload} reload={reload} />
            {   isLoading && 
                <div className="w-full h-full">
                    <LoadingSpinner />
                </div>  
            }
            <table className={` ${isLoading ? "hidden" : null} w-full h-auto text-sm text-left text-gray-500 dark:text-gray-400 mb-5`}>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="bg-sky-700 text-sky-50">
                        {
                            titleDefault &&  
                            titleDefault.map((title, index) => {
                                return(
                                    <th key={index} scope="col" className="px-6 py-3">
                                        {title}
                                    </th> 
                                )
                            }) 
                        }
                        
                        <th scope="col" className="px-6 py-3">
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
                                        <td  scope="row" 
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
                                        </td>
                                        <td scope="row" 
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
                                        </td>
                                        <td  
                                            className={`
                                                        px-3 
                                                        py-2 
                                                        font-medium 
                                                        text-gray-900 
                                                        whitespace-nowrap 
                                                        dark:text-white  
                                                        `}
                                        >
                                            <p className="truncate w-40 line-clamp">{item["kdbank"]}: {item["nama_bank"]}</p>
                                        </td>
                                        <td  
                                            className={`
                                                        px-3 
                                                        py-2 
                                                        font-medium 
                                                        text-gray-900 
                                                        whitespace-nowrap 
                                                        dark:text-white  
                                                        `}
                                        >
                                            <p className="truncate w-48 line-clamp">{item["no_rekening"]}: {item["nama_rekening"]}</p>
                                        </td>
                                        <td scope="row" 
                                            className={`
                                                        px-3 
                                                        py-2 
                                                        font-medium 
                                                        text-gray-900 
                                                        whitespace-nowrap 
                                                        dark:text-white
                                                        `}
                                        >
                                            {item["unit"]}
                                        </td>
                                        <td scope="row" 
                                            className={`
                                                        px-3 
                                                        py-2 
                                                        font-medium 
                                                        text-gray-900 
                                                        whitespace-nowrap 
                                                        dark:text-white
                                                        `}
                                        >
                                            {rupiah(item["saldo_akhir"], "Rp.")}
                                        </td>
                                        <td scope="row" 
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
                                        </td>
                                        <td className="px-3 py-2">
                                            {
                                                item["status_update"] === 'Posting' ?
                                                <ButtonDetail key={index} handleFunction={() => handleShowModalDetail(item)} />
                                                :
                                                <div className="flex">
                                                    <ButtonEdit handleFunction={() => handleShowModalEdit(item)} title="Edit" color="yellow" data={item} />  
                                                    <ButtonDelete handleFunction={() => handleModalDelete(item["uuid"])} uuid={item["uuid"]} title="Hapus" color="red" />
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