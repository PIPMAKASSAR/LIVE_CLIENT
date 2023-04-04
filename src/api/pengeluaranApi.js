import instance from "./config";
import authHeader from "./authHeaders";
import tokenApi from "./tokenApi";
import { 
            tambahPengeluaran, 
            detailPengeluaran, 
            hapusPengeluaran, 
            listPengeluaran, 
            editPengeluaran 
        } from "../redux/feature/pengeluaranSlice";
import { failMessage } from "../redux/feature/errorHandlingSlice";

const postPengeluaran = (data) => async (dispatch) => {
    try {
        const result = await instance({
            method: "post",
            url: '/simpan_tbl_inout/',
            headers: authHeader(),
            data: {
                "tgl_transaksi": data.tangalTransaksi,
                "kode_akun": data.kodeAkun,
                "nama_akun": data.namaAkun,
                "bayar" : data.bayar,
                "jns_transaksi": data.jnsTransaksi,
                "token": tokenApi()
            }
        })
        dispatch(tambahPengeluaran(result.data))
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

const getListPengeluaran = async (data) => {
    try {
        const result = await instance({
            method: "post",
            url: "/list_tbl_inout/",
            headers: authHeader(),
            data: {
                "limit" :data.limit,
                "offset": data.offset,
                "jns_transaksi": "Pengeluaran",
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
                "jns_transaksi": "Pengeluaran",
                "search": data.cari,
                "token": tokenApi()
            }
        })
        dispatch(listPengeluaran(result.data.data))
     
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

const getDetailPengeluaran = (data) => async (dispatch) => {
    try{
        const result = await instance({
            method: 'post',
            url: '/detail_tbl_inout/',
            headers: authHeader(),
            data: {
                "uuid": data.uuid,
                "jns_transaksi": data.jnsTransaksi,
                "token": tokenApi()
            }
        })
        dispatch(detailPengeluaran(result.data))
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

const putPengeluaran = (data) => async (dispatch) => {
    try{
        const result = await instance({
            method: 'post',
            url: '/edit_tbl_inout/',
            headers: authHeader(),
            data: {
                "uuid": data.uuid,
                "tgl_transaksi": data.tangalTransaksi,
                "kode_akun": data.kodeAkun,
                "nama_akun": data.namaAkun,
                "bayar" : data.bayar,
                "jns_transaksi": data.jnsTransaksi,
                "token": tokenApi()
            }
        })
        dispatch(editPengeluaran(result.data))
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

const deletePengeluaran = (data) => async (dispatch) => {
    try{
        const result = await instance({
            method: 'post',
            url: '/hapus_tbl_inout_pengeluaran/',
            headers: authHeader(),
            data: {
                "uuid": data.uuid,
                "token": tokenApi()
            }
        })
        dispatch(hapusPengeluaran(result.data))
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

export default {
    postPengeluaran,
    getListPengeluaran,
    getCariData,
    getDetailPengeluaran,
    putPengeluaran,
    deletePengeluaran,
}