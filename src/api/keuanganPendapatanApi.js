import authHeaderWithToken from "./authHeaderWithToken";
import instance from "./config";

const getListKeuanganPendapatan = async (data) => {
    try {
        const result = await instance({
            method: "post",
            url: `/keuangan/pendapatan/list`,
            headers: authHeaderWithToken(),
            data: {
                search : data.search,
                limit: data.limit,
                offset: data.offset
            }
        })
        return result.data
        // dispatch(listmak(result.data.data))
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

const postListKeuanganPendapatan = async (data) => {
    try {
        const result = await instance({
            method: "post",
            url: `/keuangan/pendapatan/tambah`,
            headers: authHeaderWithToken(),
            data: {
                "tanggal" :data.tanggal, 
                "kodeTransaksi": data.kodeTransaksi,
                "kodeAkun" : data.kodeAkun, 
                "uraian" :data.uraian, 
                "tarif":data.harga, 
                "satuan":data.satuan, 
                "total" : data.total
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

const getListDetailPendapatanBelanja = async (data) => {
    try {
        const result = await instance({
            method: "post",
            url: `/keuangan/pendapatan/listKodeAkun`,
            headers: authHeaderWithToken(),
        })
        return result.data.data
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

const getLastKodeTransaksi = async (data) => {
    try {
        const result = await instance({
            method: "post",
            url: `/keuangan/pendapatan/lastKodeTransaksi`,
            headers: authHeaderWithToken(),
        })
        return result.data.data
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

const deleteKeuanganPendapatan = async (data) => {
    try {
        const result = await instance({
            method: "post",
            url: `/keuangan/pendapatan/hapus`,
            headers: authHeaderWithToken(),
            data:{
                uuid: data
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

const updateListKeuanganPendapatan = async (data) => {
    try {
        const result = await instance({
            method: "post",
            url: `/keuangan/pendapatan/update`,
            headers: authHeaderWithToken(),
            data: {
                "uuid" : data.uuid,
                "tanggal" :data.tanggal, 
                "kodeTransaksi": data.kodeTransaksi,
                "kodeAkun" : data.kodeAkun, 
                "uraian" :data.uraian, 
                "tarif":data.harga, 
                "satuan":data.satuan, 
                "total" : data.total
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

export default {
    getListKeuanganPendapatan,
    postListKeuanganPendapatan,
    getListDetailPendapatanBelanja,
    getLastKodeTransaksi,
    deleteKeuanganPendapatan,
    updateListKeuanganPendapatan,
}