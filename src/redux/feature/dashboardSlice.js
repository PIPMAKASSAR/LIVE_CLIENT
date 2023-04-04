import { createSlice } from "@reduxjs/toolkit";

export const dashboardSlice = createSlice({
    name:"dashboard",
    initialState: {
        totalPenerimaan: {
            "status": false,
            "message": "gagal",
            "penerimaan_bulan_ini": 1000,
            "penerimaan_bulan_lalu": 1000,
            "persentase": "0%",
            "keterangan": "Lebih Kecil Dari Bulan Lalu"
        },
        totalPengeluaran: {
            "status": false,
            "message": "gagal",
            "pengeluaran_bulan_ini": 1000,
            "pengeluaran_bulan_lalu": 1000,
            "persentase": "0%",
            "keterangan": "Lebih Kecil Dari Bulan Lalu"
        },
        totalSaldoOperasional: {
            "status": false,
            "message": "gagal",
            "saldooperasional_bulan_ini": 1000,
            "saldooperasional_bulan_lalu": 1000,
            "persentase": "0%",
            "keterangan": "Lebih Kecil Dari Bulan Lalu"
        },
        totalSaldoDanaKelolaan: {
            "status": false,
            "message": "gagal",
            "saldodanakelolaan_bulan_ini": 1000,
            "saldodanakelolaan_bulan_lalu": 1000,
            "persentase": "0%",
            "keterangan": "Lebih Kecil Dari Bulan Lalu"
        },
        totalSaldoKas: {
            "status": false,
            "message": "gagal",
            "saldokas_bulan_ini": 1000,
            "saldokas_bulan_lalu": 1000,
            "persentase": "0%",
            "keterangan": "Lebih Kecil Dari Bulan Lalu"
        },
        grafikPenerimaan: [],
    },
    reducers: {
        totalPenerimaan: (state, action) => {
            state.totalPenerimaan = action.payload
        },
        totalPengeluaran: (state, action) => {
            state.totalPengeluaran = action.payload
        },
        totalSaldoOperasional: (state, action) => {
            state.totalSaldoOperasional = action.payload
        },
        totalSaldoDanaKelolaan: (state, action) => {
            state.totalSaldoDanaKelolaan = action.payload
        },
        totalSaldoKas: (state, action) => {
            state.totalSaldoKas = action.payload
        },
        grafikPenerimaan: (state, action) => {
            state.grafikPenerimaan = action.payload
        },
    }
})

export const {
                totalPenerimaan, 
                totalPengeluaran, 
                totalSaldoOperasional, 
                totalSaldoDanaKelolaan, 
                totalSaldoKas, 
                grafikPenerimaan
            } 
            = dashboardSlice.actions

export default dashboardSlice.reducer