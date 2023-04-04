import instance from "./config";
import tokenApi from "./tokenApi";
import authHeader from "./authHeaders";

const postBelanja = (data) => async (dispatch) => {
    try{
        const result = instance({
            url: "/simpan_tbl_op_belanja/",
            method: "post",
            headers: authHeader(),
            data: {
                "tanggal" : data.tanggal,
                "kode_transaksi": data.kodeTransaksi,
                "mak": data.mak,
                "penerima": data.penerima,
                "uraian": data.uraian,
                "jumlah": data.jumlah,
                "ppn": data.ppn,
                "pajak_pph21": data.pph21,
                "pajak_pph22": data.pph22,
                "pajak_pph23": data.pph23,
                "pajak_pphfinal": data.pphfinal,
                "token" : tokenApi()
            }
        })

        return result
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

const getListBelanja = async (data) => {
    try {
        const result = await instance({
            url: "/list_tbl_op_belanja/",
            method:"post",
            headers:authHeader(),
            data :{
                "limit" :data.limit,
                "offset": data.offset,
                "search": data.search,
                "token": tokenApi()
            }
        })

        if(result.data.status) {
            return result.data
        } else {
            throw result
        }
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

const deleteBelanja = async (data) => {
    try {
            
        const result = await instance({
            url: "/hapus_tbl_op_belanja/",
            method: "post",
            headers: authHeader(),
            data: {
                "uuid":data,
                "token":tokenApi()
            }
        })

        if(result) {
            return result
        } else {
            throw result
        }
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

const editBelanja = async (data) => {
    try {
        const result = await instance({
            url: "/edit_tbl_op_belanja/",
            method: "post",
            headers: authHeader(),
            data: {
                "uuid":data.uuid,
                "tanggal" : data.tanggal,
                "kode_transaksi": data.kodeTransaksi,
                "mak":data.mak,
                "penerima": data.penerima,
                "uraian": data.uraian,
                "jumlah": data.jumlah,
                "ppn": data.ppn,
                "pajak_pph21": data.pph21,
                "pajak_pph22": data.pph22,
                "pajak_pph23": data.pph23,
                "pajak_pphfinal": data.pphfinal,
                "token": tokenApi()
            }
        })

        if(result.data.status) {
            return result
        } else {
            throw result
        }
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

const getSatketMak = async (data) => {
    try {
        const result = await instance({
            method: 'post',
            url: '/set_makpriode_satker/',
            header: authHeader(),
            data: {
                "periode":data.periode,
                "mak": data.mak,
                token: tokenApi()
            }
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
            method: 'post',
            url: '/last_kode_transaksi_tbl_op_belanja',
            header: authHeader(),
            data: {
                token: tokenApi()
            }
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

export default {
    postBelanja,
    getListBelanja,
    deleteBelanja,
    editBelanja,
    getSatketMak,
    getLastKodeTransaksi,
}
