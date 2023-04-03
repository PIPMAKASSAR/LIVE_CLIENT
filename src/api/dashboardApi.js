import instance from "./config";
import authHeader from "./authHeaders";
import dateFormat from "dateformat";
import { 
        totalPenerimaan,
        totalPengeluaran, 
        totalSaldoOperasional,
        totalSaldoDanaKelolaan, 
        totalSaldoKas, 
        grafikPenerimaan  
    } from "../redux/feature/dashboardSlice";
import { failMessage } from "../redux/feature/errorHandlingSlice";

const getTotalPenerimaan =(data) => async (dispatch) => {
    console.log(data[0])
    console.log(dateFormat(data[0], "isoDate"))
    try{
        const token = localStorage.getItem('token')
        const result = await instance({
            method: "post",
            url:"/get_total_penerimaan",
            headers :authHeader(),
            data : {
                "tgl_awal":data[0] ? dateFormat(data[0], "isoDate") : "",
                "tgl_akhir":data[1] ? dateFormat(data[1], "isoDate") : "",
                // "tgl_awal":"",
                // "tgl_akhir":"",
                token: token,
            }
        })
        dispatch(totalPenerimaan(result.data))
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

const getTotalPengeluaran = (data) => async (dispatch) => {
    try{
        const token = localStorage.getItem('token')
        const result = await instance({
            method: "post",
            url:"/get_total_pengeluaran",
            headers :authHeader(),
            data : {
                "tgl_awal":data[0] ? dateFormat(data[0], "isoDate") : "",
                "tgl_akhir":data[1] ? dateFormat(data[1], "isoDate") : "",
                token: token,
            }
        })
        dispatch(totalPengeluaran(result.data))
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

const getTotalSaldoOperasional = (data) => async (dispatch) => {
    try{
        const token = localStorage.getItem('token')
        const result = await instance({
            method: "post",
            url:"/get_total_saldooperasional",
            headers :authHeader(),
            data : {
                "tgl_awal":data[0] ? dateFormat(data[0], "isoDate") : "",
                "tgl_akhir":data[1] ? dateFormat(data[1], "isoDate") : "",
                token: token,
            }
        })
        dispatch(totalSaldoOperasional(result.data))

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

const getTotalSaldoDanaKelolaan = (data) => async (dispatch) => {
    try{
        const token = localStorage.getItem('token')
        const result = await instance({
            method: "post",
            url:"/get_total_saldodanakelolaan",
            headers :authHeader(),
            data : {
                "tgl_awal":data[0] ? dateFormat(data[0], "isoDate") : "",
                "tgl_akhir":data[1] ? dateFormat(data[1], "isoDate") : "",
                token: token,
            }
        })
        dispatch(totalSaldoDanaKelolaan(result.data))
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

const getTotalSaldoKas = (data) => async (dispatch) => {
    try{
        const token = localStorage.getItem('token')
        const result = await instance({
            method: "post",
            url:"/get_total_saldokas",
            // headers :authHeader(),
            data : {
                "tgl_awal":data[0] ? dateFormat(data[0], "isoDate") : "",
                "tgl_akhir":data[1] ? dateFormat(data[1], "isoDate") : "",
                token: token,
            }
        })
        dispatch(totalSaldoKas(result.data))
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

const getGrafikPenerimaan = (data) => async (dispatch) => {
    try{
        const token = localStorage.getItem('token')
        const result = await instance({
            method: "post",
            url:"/grafik_penerimaan",
            // headers :authHeader(),
            data : {
                "tgl_awal":data[0] ? dateFormat(data[0], "isoDate") : "",
                "tgl_akhir":data[1] ? dateFormat(data[1], "isoDate") : "",
                token: token,
            }
        })
        dispatch(grafikPenerimaan(result.data))
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
    getTotalPenerimaan,
    getTotalPengeluaran,
    getTotalSaldoOperasional,
    getTotalSaldoDanaKelolaan,
    getTotalSaldoKas,
    getGrafikPenerimaan,
}