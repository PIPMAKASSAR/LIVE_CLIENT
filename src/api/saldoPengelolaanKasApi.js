import tokenApi from "./tokenApi";
import authHeader from "./authHeaders";
import { tambahSaldoPengelolaanKas, listSaldoPengelolaanKas, editSaldoPengelolaanKas, detailSaldoPengelolaanKas, hapusSaldoPengelolaanKas } from "../redux/feature/saldoPengelolaanKasSlice";
import instance from "./config";
import {failMessage} from "../redux/feature/errorHandlingSlice"

const postSaldoPengelolaanKas = (data) => async (dispatch) => {
    try {
        const result = await instance({
            method: "post",
            url: '/simpan_tbl_saldokas/',
            headers: authHeader(),
            data: {
                "tgl_transaksi": data.tglTransaksi,
                "kdbank": data.kodeBank,
                "nama_bank": data.namaBank,
                "no_bilyet": data.noBilyet,
                "nilai_deposito": data.nilaiDeposito,
                "nilai_bunga": data.nilaiBunga,
                "token": tokenApi()
            }
        })
        dispatch(tambahSaldoPengelolaanKas(result.data))
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

const getListSaldoPengelolaanKas = (data) => async (dispatch) => {
    try {
        const result = await instance({
            method: "post",
            url: "/list_tbl_saldokas/",
            headers: authHeader(),
            data: {
                "limit" :data.limit,
                "offset": "0",
                "search": "",
                "token": tokenApi()
            }
        })
        dispatch(listSaldoPengelolaanKas(result.data.data))
     
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

const getCariData = (data) => async (dispatch) => {
    try {
        const result = await instance({
            method: "post",
            url: "/list_tbl_saldokas/",
            headers: authHeader(),
            data: {
                "limit" :data.limit,
                "offset": "0",
                "search": data.cari,
                "token": tokenApi()
            }
        })
        dispatch(listSaldoPengelolaanKas(result.data.data))
     
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

const getDetailSaldoPengelolaanKas = (data) => async (dispatch) => {
    try{
        const result = await instance({
            method: 'post',
            url: '/detail_tbl_saldokas/',
            headers: authHeader(),
            data: {
                "uuid": data.uuid,
                "token": tokenApi()
            }
        })
        dispatch(detailSaldoPengelolaanKas(result.data))
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

const putSaldoPengelolaanKas = (data) => async (dispatch) => {
    try{
        const result = await instance({
            method: 'post',
            url: '/edit_tbl_saldokas/',
            headers: authHeader(),
            data: {
                "uuid": data.uuid,
                "tgl_transaksi": data.tglTransaksi,
                "kdbank": data.kodeBank,
                "nama_bank": data.namaBank,
                "no_bilyet": data.noBilyet,
                "nilai_deposito": data.nilaiDeposito,
                "nilai_bunga": data.nilaiBunga,
                "token": tokenApi()
            }
        })
        dispatch(editSaldoPengelolaanKas(result.data))
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

const deleteSaldoPengelolaanKas = (data) => async (dispatch) => {
    try{
        const result = await instance({
            method: 'post',
            url: '/hapus_tbl_saldokas/',
            headers: authHeader(),
            data: {
                "uuid": data.uuid,
                "token": tokenApi()
            }
        })
        dispatch(hapusSaldoPengelolaanKas(result.data))
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

export default {
    postSaldoPengelolaanKas,
    getListSaldoPengelolaanKas,
    getCariData,
    getDetailSaldoPengelolaanKas,
    putSaldoPengelolaanKas,
    deleteSaldoPengelolaanKas,
}
