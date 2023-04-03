import instance from "./config";
import authHeader from "./authHeaders";
import tokenApi from "./tokenApi"
import dateFormat from "dateformat";
import { successMessage,failMessage, lossConectionMessage } from "../redux/feature/errorHandlingSlice";
import { 
        tambahPenerimaan, 
        listPenerimaan, 
        hapusPenerimaan, 
        editPenerimaan 
    } from "../redux/feature/penerimaSlice";

const postTambahPenerimaan = (data) => async (dispatch) => {
    try{
        const result = await instance({
            method: "post",
            url: "/simpan_tbl_inout/",
            headers: authHeader(),
            data : {
                "tgl_transaksi": data.tangalTransaksi,
                "kode_akun": data.kodeAkun,
                "nama_akun": data.namaAkun,
                "bayar" : data.bayar,
                "jns_transaksi": data.jnsTransaksi,
                "token": tokenApi()
            }
        })
       
        dispatch(tambahPenerimaan(result.data))
        
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
        throw payload
    }
}

const getListPenerima = async (data) => {
    try{
        console.log('ini di penerimaan api',data)
        const result = await instance({
            method: "post",
            url: "/list_tbl_inout/",
            headers: authHeader(),
            data : {
                "limit": data.limit,
                "offset": data.offset,
                "jns_transaksi": "Penerimaan",
                "search": data.cari,
                "token": tokenApi()
            }
        })
        return result.data
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
        throw payload
    }
} 

const getCariData = (data) => async (dispatch) => {
    try {
        const result = await instance({
            method: "post",
            url: "/list_tbl_inout/",
            headers: authHeader(),
            data: {
                "limit" :data.limit,
                "offset": "0",
                "jns_transaksi": "Penerimaan",
                "search": data.cari,
                "token": tokenApi()
            }
        })
        dispatch(listPenerimaan(result.data.data))
     
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
        dispatch(failMessage(payload))
    }   
}

const putPenerimaan = (data) => async (dispatch) => {
    try{
        const result = await instance({
            method: "post",
            url: "/edit_tbl_inout/",
            headers: authHeader(),
            data : {
                "uuid": data.uuid,
                "tgl_transaksi": data.tangalTransaksi,
                "kode_akun": data.kodeAkun,
                "nama_akun": data.namaAkun,
                "bayar" : data.bayar,
                "jns_transaksi": data.jnsTransaksi,
                "token": tokenApi()
            }
        })
       
        dispatch(editPenerimaan(result.data))
        
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
        throw payload
        dispatch(failMessage(payload))
    }
}

const deletePenerimaan = (data) => async (dispatch) => { 
    try{
        const result = await instance({
            method: "post",
            url: "/hapus_tbl_inout_penerimaan/",
            headers: authHeader(),
            data : {
                "uuid": data.uuid,
                "token": tokenApi()
            }
        })
      
        dispatch(hapusPenerimaan(result.data))
        
    }
    catch(error) {
        const message = error.response.data.message
        const payload = {
            message: message,
            status: false
        }
        throw payload
        dispatch(failMessage(payload))
    }
}

export default {
    postTambahPenerimaan,
    getListPenerima,
    getCariData,
    putPenerimaan,
    deletePenerimaan,
}