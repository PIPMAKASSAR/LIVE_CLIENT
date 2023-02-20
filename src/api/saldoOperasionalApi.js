import instance from "./config";
import authHeader from "./authHeaders";
import tokenApi from "./tokenApi";
import { tambahSaldoOperasional, listSaldoOperasional, hapusSaldoOperasional, detailSaldoOperasional, editSaldoOperasional } from "../redux/feature/saldoOperasionalSlice";
import { failMessage } from "../redux/feature/errorHandlingSlice";

const postSaldoOperasional = (data) => async (dispatch) => {
    try {
        const result = await instance({
            method: "post",
            url: '/simpan_tbl_saldooperasional/',
            headers: authHeader(),
            data: {
                "tgl_transaksi": data.tglTransaksi,
                "kdbank": data.kodeBank,
                "no_rekening": data.noRekening,
                "unit": data.unit,
                "saldo_akhir": data.saldoAkhir,
                "token": tokenApi()
            }
        })
        dispatch(tambahSaldoOperasional(result.data))
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

const getListSaldoOperasional = (data) => async (dispatch) => {
    try {
        const result = await instance({
            method: "post",
            url: "/list_tbl_saldooperasional/",
            headers: authHeader(),
            data: {
                "limit" :data.limit,
                "offset": "0",
                "search": data.search,
                "token": tokenApi()
            }
        })
        dispatch(listSaldoOperasional(result.data.data))
     
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
            url: "/list_tbl_saldooperasional/",
            headers: authHeader(),
            data: {
                "limit" :data.limit,
                "offset": "0",
                "search": data.cari,
                "token": tokenApi()
            }
        })
        dispatch(listSaldoOperasional(result.data.data))
     
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

const getDetailSaldoOperasional = (data) => async (dispatch) => {
    try{
        const result = await instance({
            method: 'post',
            url: '/detail_tbl_saldooperasional/',
            headers: authHeader(),
            data: {
                "uuid": data.uuid,
                "jns_transaksi": data.jnsTransaksi,
                "token": tokenApi()
            }
        })
        dispatch(detailSaldoOperasional(result.data))
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

const putSaldoOperasional = (data) => async (dispatch) => {
    try{
        const result = await instance({
            method: 'post',
            url: '/edit_tbl_saldooperasional/',
            headers: authHeader(),
            data: {
                "uuid" : data.uuid,
                "tgl_transaksi": data.tglTransaksi ,
                "kdbank": data.kodeBank,
                "no_rekening": data.noRekening,
                "unit": data.unit,
                "saldo_akhir": data.saldoAkhir,
                "token": tokenApi()
            }
        })
        dispatch(editSaldoOperasional(result.data))
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

const deleteSaldoOperasional = (data) => async (dispatch) => {
    try{
        const result = await instance({
            method: 'post',
            url: '/hapus_tbl_saldooperasional/',
            headers: authHeader(),
            data: {
                "uuid": data.uuid,
                "token": tokenApi()
            }
        })
        dispatch(hapusSaldoOperasional(result.data))
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
    postSaldoOperasional,
    getListSaldoOperasional,
    getCariData,
    getDetailSaldoOperasional,
    putSaldoOperasional,
    deleteSaldoOperasional,
}