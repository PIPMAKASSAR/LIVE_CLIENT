import instance from "./config";
import authHeader from "./authHeaders";
import tokenApi from "./tokenApi";

const postPihakKetiga = (data) => async (dispatch) => {
    try {
        const result = await instance({
            url:"/simpan_tbl_op_penerima/",
            method: "post",
            headers: authHeader(),
            data:{
                "nama": data.nama,
                "no_rekening": data.rekening,
                "npwp": data.npwp,
                "token": tokenApi()
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

const getListPihakTiga = () => async (dispatch) => {
    try {
        const result = await instance({
            url:"/list_tbl_op_penerima/",
            method: "post",
            headers: authHeader(),
            data:{
                "token": tokenApi()
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

const deletePihakTiga = (data) => async (dispatch) => {
    try {
        const result = await instance({
            url:"/hapus_tbl_op_penerima/",
            method: "post",
            headers: authHeader(),
            data:{
                uuid: data,
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

const editPihakTiga = (data) => async (dispatch) => {
    try {
        const result = await instance({
            url:"/edit_tbl_op_penerima/",
            method: "post",
            headers : authHeader(),
            data: {
                "uuid": data.uuid,
                "nama": data.nama,
                "no_rekening": data.no_rekening,
                "npwp": data.npwp,
                "token" : tokenApi()
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
    postPihakKetiga,
    getListPihakTiga,
    deletePihakTiga,
    editPihakTiga,
}