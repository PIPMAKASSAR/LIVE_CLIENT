import authHeaderWithToken from "./authHeaderWithToken";
import instance from "./config";

const getListBkuUmum = async (data) => {
    try {
        const result = await instance({
            method: "post",
            url: `/laporan/bku/umum`,
            headers: authHeaderWithToken(),
            data: {
                "periodeAwal": data.periodeAwal,
                "periodeAkhir": data.periodeAkhir
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

const getLaporanBelanja = async (data) => {
    try {
        const result = await instance({
            method: "post",
            url: `/laporan/belanja`,
            headers: authHeaderWithToken(),
            data: {
                "periodeAwal": data.periodeAwal,
                "periodeAkhir": data.periodeAkhir
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

const getLaporanPendapatan = async (data) => {
    try {
        const result = await instance({
            method: "post",
            url: `/laporan/pendapatan`,
            headers: authHeaderWithToken(),
            data: {
                "periodeAwal": data.periodeAwal,
                "periodeAkhir": data.periodeAkhir
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
    getListBkuUmum,
    getLaporanBelanja,
    getLaporanPendapatan
}