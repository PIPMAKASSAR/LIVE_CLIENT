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
import rupiah from "../helpers/rupiah";

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
                "bulan": data,
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
                "bulan": data,
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
                "bulan": data,
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
                "bulan": data,
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
                "bulan": data,
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

const getGrafikPenerimaan = async () => {
    try{
        const token = localStorage.getItem('token')
        const result = await instance({
            method: "post",
            url:"/grafik_penerimaan",
            // headers :authHeader(),
            data : {
                token: token,
            }
        })
        // const arr = []
        // // console.log(result.data.data)
        // for(let i = 0; i < result.data.data.length; i++) {
        //     const totalConvert = await rupiah(result.data.data[i]["total"])
        //     const obj = {
        //         "bulan": result.data.data[i]["bulan"],
        //         "total": totalConvert,
        //     }
        //     arr.push(obj)
        // }

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
    getTotalPenerimaan,
    getTotalPengeluaran,
    getTotalSaldoOperasional,
    getTotalSaldoDanaKelolaan,
    getTotalSaldoKas,
    getGrafikPenerimaan,
}