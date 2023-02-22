import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import pengeluaranApi from "../api/pengeluaranApi";
import dateFormat from "dateformat";

export default function DetailPenerimaanPengeluaran({itemData, category}) {
   
    const dispatch = useDispatch()
    // const [dataDuplicate, setDataDuplicate] = useState({})
    const dataDuplicate = useSelector(state => state.pengeluaran.detail)
    const [uuid, setUuid] = useState("")
    // const convertDate = dateFormat(dataDuplicate.data["tgl_transaksi"], "dd/mm/yyyy") 
    const [tglTransaksi, setTglTransaksi] = useState("")
    const [kodeAkun,setKodeAkun] = useState("")
    const [bayar,setBayar] = useState("")
    const [jnsTransaksi, setJnsTransaksi] = useState("")
    const [status, setStatus] = useState("")
    const [isLoading, setIsLoading] = useState(false)


    // useEffect(() => {
    //     const payload = {
    //         uuid : itemData,
    //         jnsTransaksi: category
    //     }
    //     dispatch(pengeluaranApi.getDetailPengeluaran(payload))
    //     .then(() => {
    //         // setTglTransaksi(dataDuplicate.data["tgl_transaksi"])
    //         // setUuid(dataDuplicate.data.uuid)
    //     })
    // },[itemData])

    const nominal = (bilangan) => {
        if(bilangan) {
            var	reverse = bilangan.toString().split('').reverse().join(''),
            ribuan 	= reverse.match(/\d{1,3}/g);
            ribuan	= ribuan.join('.').split('').reverse().join('');
            return ribuan
        }
    }

    return(
        <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
             {
                dataDuplicate && 
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                <div className="py-3 sm:py-4">
                    <div className="flex items-center space-x-4">
                        <label htmlFor="small-input" className="text-sm font-medium text-gray-900 truncate dark:text-white">Id:</label>            
                        <span className="text-sm text-gray-500 truncate dark:text-gray-400">{uuid}</span>
                    </div>
                </div>
                <div className="py-3 sm:py-4">
                    <div className="flex items-center space-x-4">
                        <label htmlFor="small-input" className="text-sm font-medium text-gray-900 truncate dark:text-white">Tanggal Transaksi:</label>            
                        <span className="text-sm text-gray-500 truncate dark:text-gray-400">{tglTransaksi}</span>
                    </div>
                </div>
                <div className="py-3 sm:py-4">
                    <div className="flex items-center space-x-4">
                        <label htmlFor="small-input" className="text-sm font-medium text-gray-900 truncate dark:text-white">Kode Akun:</label>            
                        <span className="text-sm text-gray-500 truncate dark:text-gray-400">{kodeAkun}</span>
                    </div>
                </div>
                <div className="py-3 sm:py-4">
                    <div className="flex items-center space-x-4">
                        <label htmlFor="small-input" className="text-sm font-medium text-gray-900 truncate dark:text-white">Nominal :</label>            
                        {
                            dataDuplicate.data &&
                            <span className="text-sm text-gray-500 truncate dark:text-gray-400">
                                Rp. {nominal(bayar)}
                            </span>
                        }
                    </div>
                </div>
                <div className="py-3 sm:py-4">
                    <div className="flex items-center space-x-4">
                        <label htmlFor="small-input" className="text-sm font-medium text-gray-900 truncate dark:text-white">Jenis Transaksi :</label>            
                        <span className="text-sm text-gray-500 truncate dark:text-gray-400">{jnsTransaksi}</span>
                    </div>
                </div>
                <div className="py-3 sm:py-4">
                    <div className="flex items-center space-x-4">
                        <label htmlFor="small-input" className="text-sm font-medium text-gray-900 truncate dark:text-white">Status Transaksi :</label>            
                        <span className="text-sm text-gray-500 truncate dark:text-gray-400">{status}</span>
                    </div>
                </div>
            </div>
             }
        </div>
    )
}