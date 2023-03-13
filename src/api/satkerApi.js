import instance from "./config";
import authHeader from "./authHeaders";
import tokenApi from "./tokenApi";

const uploadFileSatker = async (data) => {

    try {
        const result = await instance({
            method: 'post',
            url: '/simpan_tbl_op_satker/',
            headers: authHeader(),
            data: {
                "periode":data.periode ,
                "file_excel":data.base64String,
                token: tokenApi()
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

const getListSatker = async (data) => {
    try {
        const result = await instance({
            method: 'post',
            url: '/list_tbl_op_satker/',
            header: authHeader(),
            data: {
                "limit" :"",
                "offset": "0",
                "search": data.cari,
                "periode": data.periode,
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

const getPeriodeSatker = async () => {
    try {
        const result = await instance({
            method: 'post',
            url: '/periode_tbl_op_satker/',
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

const postDefaultPeriode = async (data) => {
    try {
        const result = await instance({
            method: 'post',
            url: '/set_priode_tbl_op_satker/',
            header: authHeader(),
            data: {
                "periode": data,
                "status_periode":"true",
                token: tokenApi()
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

export default {
    uploadFileSatker,
    getListSatker,
    getPeriodeSatker,
    postDefaultPeriode,
}