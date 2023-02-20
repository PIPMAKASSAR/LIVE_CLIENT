import instance from "./config";
import {listSaldoDanaKelolaan, tambahSaldoDanaKelolaan, detailSaldoDanaKelolaan, hapusSaldoDanaKelolaan, editSaldoDanaKelolaan} from '../redux/feature/saldoDanaKelolaanSlice'
import {failMessage} from "../redux/feature/errorHandlingSlice"
import tokenApi from "./tokenApi";
import authHeader from "./authHeaders";

const postSaldoDanaKelolaan = (data) => async (dispatch) => {
    try {
        const result = await instance({
            method: "post",
            url: '/simpan_tbl_saldodanakelolaan/',
            headers: authHeader(),
            data: {
                "tgl_transaksi": data.tglTransaksi,
                "kdbank": data.kodeBank,
                "no_rekening": data.noRekening,
                "saldo_akhir": data.saldoAkhir,
                "token": tokenApi()
            }
        })
        dispatch(tambahSaldoDanaKelolaan(result.data))
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

const getListSaldoDanaKelolaan = (data) => async (dispatch) => {
    try {
        const result = await instance({
            method: "post",
            url: "/list_tbl_saldodanakelolaan/",
            headers: authHeader(),
            data: {
                "limit" :data.limit,
                "offset": "0",
                "search": "",
                "token": tokenApi()
            }
        })
        dispatch(listSaldoDanaKelolaan(result.data.data))
     
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
            url: "/list_tbl_saldodanakelolaan/",
            headers: authHeader(),
            data: {
                "limit" :data.limit,
                "offset": "0",
                "search": data.cari,
                "token": tokenApi()
            }
        })
        dispatch(listSaldoDanaKelolaan(result.data.data))
     
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

const getDetailSaldoDanaKelolaan = (data) => async (dispatch) => {
    try{
        const result = await instance({
            method: 'post',
            url: '/detail_tbl_saldodanakelolaan/',
            headers: authHeader(),
            data: {
                "uuid": data.uuid,
                "jns_transaksi": data.jnsTransaksi,
                "token": tokenApi()
            }
        })
        dispatch(detailSaldoDanaKelolaan(result.data))
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

const putSaldoDanaKelolaan = (data) => async (dispatch) => {
    try{
        const result = await instance({
            method: 'post',
            url: '/edit_tbl_saldodanakelolaan/',
            headers: authHeader(),
            data: {
                "uuid": data.uuid,
                "tgl_transaksi": data.tglTransaksi,
                "kdbank": data.kodeBank,
                "no_rekening": data.noRekening,
                "saldo_akhir": data.saldoAkhir,
                "token": tokenApi()
            }
        })
        dispatch(editSaldoDanaKelolaan(result.data))
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

const deleteSaldoDanaKelolaan = (data) => async (dispatch) => {
    try{
        const result = await instance({
            method: 'post',
            url: '/hapus_tbl_saldodanakelolaan/',
            headers: authHeader(),
            data: {
                "uuid": data.uuid,
                "token": tokenApi()
            }
        })
        dispatch(hapusSaldoDanaKelolaan(result.data))
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
    postSaldoDanaKelolaan,
    getListSaldoDanaKelolaan,
    getCariData,
    getDetailSaldoDanaKelolaan,
    putSaldoDanaKelolaan,
    deleteSaldoDanaKelolaan,
}
