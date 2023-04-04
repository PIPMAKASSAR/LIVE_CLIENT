import authHeaderWithToken from "./authHeaderWithToken";
import instance from "./config";

const getListPendapatan = async (data) => {
    try {
        const result = await instance({
            method: "post",
            url: `/master/list/pendapatan`,
            headers: authHeaderWithToken(),
            data: {
                search : data.search,
                limit: data.limit,
                offset: data.offset
            }
        })
        return result.data
        // dispatch(listmaster(result.data.data))
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
const postPendapatan = async (data) => {
    try {
        const result = await instance({
            method: "post",
            url: `/master/tambah/pendapatan`,
            headers: authHeaderWithToken(),
            data: {
                "kodeAkun": data.kodeAkun,
                "uraian": data.uraian
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

const deletePendapatan = async (data) => {
    try {
        const result = await instance({
            method: "post",
            url: `/master/delete/pendapatan/${data}`,
            headers: authHeaderWithToken(),
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

const updatePendapatan = async (data) => {
    try {
        const result = await instance({
            method: "post",
            url: `/master/update/pendapatan/${data.uuid}`,
            headers: authHeaderWithToken(),
            data: {
                "kodeAkun": data.kodeAkun,
                "uraian": data.uraian
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

const getListDetailPendapatan = async (data) => {
    try {
        const result = await instance({
            method: "post",
            url: `/master/list/detailPendapatan/${data.uuid}`,
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
        console.log(error)
        throw payload
    }
}

const getHeaderDetail = async (data) => {
    try {
        const result = await instance({
            method: "post",
            url: `/master/detailpendapatan/header`,
            headers: authHeaderWithToken(),
            data: {
                uuid: data
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

const postDetailPendapatan = async (data) => {
    console.log(data)
    try {
        const result = await instance({
            method: "post",
            url: `/master/tambah/detailPendapatan`,
            headers: authHeaderWithToken(),
            data: {
                akunPendapatan : data.akunPendapatan,
                jenis: data.jenis,
                kodeUp: data.kodeUp,
                kodeAkun: data.kodeAkun,
                uraian: data.uraian,
                harga: data.harga,
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
const updateDetailPendapatan = async (data) => {
    console.log("ini d api",data)
    try {
        const result = await instance({
            method: "post",
            url: `/master/update/detailPendapatan`,
            headers: authHeaderWithToken(),
            data: {
                uuid: data.uuid,
                jenis: data.jenis,
                kodeUp: data.kodeUp,
                kodeAkun: data.kodeAkun,
                uraian: data.uraian,
                harga: data.harga,
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
const deleteDetailPendapatan = async (data) => {
    console.log("ini d api",data)
    try {
        const result = await instance({
            method: "post",
            url: `/master/delete/detailPendapatan`,
            headers: authHeaderWithToken(),
            data: {
                uuid: data,
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

export default {
    getListPendapatan,
    postPendapatan,
    deletePendapatan,
    updatePendapatan,
    getListDetailPendapatan,
    getHeaderDetail,
    postDetailPendapatan,
    updateDetailPendapatan,
    deleteDetailPendapatan,
}