import tokenApi from "./tokenApi";
import authHeader from "./authHeaders";
import instance from "./config";
import { tambahmak, hapusmak, editmak, listmak, getListHeader } from "../redux/feature/makSlice";
import { failMessage } from "../redux/feature/errorHandlingSlice";

const getListMak = async (data) => {
    console.log("masuk sini")
    try {
        const result = await instance({
            method: "post",
            url: '/list_tbl_op_mak/',
            headers: authHeader(),
            data: {
                "limit" :"",
                "offset": "0",
                "search": data,
                 "token": tokenApi()
            }
        })
        return result.data.data
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

const postMak = (data) => async (dispatch) => {
    try{
        const result = await instance({
            method: 'post',
            url: '/simpan_tbl_op_mak/',
            headers: authHeader(),
            data: {
                "mak": data.kodeMak,
                "uraian": data.uraian,
                "jenis": data.jenis,
                "kode_up": data.kodeUp,
                "token": tokenApi()
          }
        })
        dispatch(tambahmak(result.data))
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

const getMakHeader = () => async (dispatch) => {
    try{
        const result = await instance({
            method: 'post',
            url: '/header_tbl_op_mak/',
            headers: authHeader(),
            data: {
                "token": tokenApi()
          }
        })
        dispatch(getListHeader(result.data.data))
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

const deleteMak = (data) => async (dispatch) => {
    try {
        const result = await instance({
            method: 'post',
            url: '/hapus_tbl_op_mak/',
            headers: authHeader(),
            data: {
                "uuid" : data,
                "token": tokenApi()
          }
        })
        dispatch(hapusmak(result.data.data))
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

const putMak = (data) => async (dispatch) => {
    try {
        const result = await instance({
            method: 'post',
            url: '/edit_tbl_op_mak/',
            headers: authHeader(),
            data: {
                "uuid" : data.uuId,
                "mak": data.kodeMak,
                "uraian": data.uraian,
                "jenis": data.jenis,
                "kode_up": data.kodeUp,
                "token": tokenApi()
          }
        })
        dispatch(editmak(result.data))
        return Promise
    }
    catch(error) {
        console.log("masuk sini")
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
    getListMak,
    getMakHeader,
    postMak,
    putMak,
    deleteMak,
}
