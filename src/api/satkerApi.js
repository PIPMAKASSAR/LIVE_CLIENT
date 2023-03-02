import instance from "./config";
import authHeader from "./authHeaders";
import tokenApi from "./tokenApi";

const uploadFileSatker = async (data) => {
    console.log(data)
    // try {
    //     const result = await instance({
    //         method: 'post',
    //         url: '/simpan_tbl_op_satker/',
    //         headers: authHeader(),
    //         data: {
    //             "file_excel":data,
    //             token: tokenApi()
    //         }
    //     })
    //     return result
    // }
    // catch(error) {
    //     const message = (
    //         error.response && 
    //         error.response.data && 
    //         error.response.data.message ||
    //         error.message ||
    //         error.toString())
    //     const payload = {
    //         message: message,
    //         status: false
    //     }
    //    throw payload
    // }
} 

const getListSatker = async (data) => {
    console.log("masuk sini")
    try {
        const result = await instance({
            method: 'post',
            url: '/list_tbl_op_satker/',
            header: authHeader(),
            data: {
                "limit" :data.limit,
                "offset": "0",
                "search": "",
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
    uploadFileSatker,
    getListSatker,
}