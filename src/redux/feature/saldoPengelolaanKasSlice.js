import { createSlice } from "@reduxjs/toolkit";

export const saldoPengelolaanKasSlice = createSlice({
    name:"saldoPengelolaanKas",
    initialState: {
        data: [],
        tambah: null,
        edit: null,
        detail: null,
        hapus: null,
        item: {},
        itemDel: {},
        itemSearch: ""

    },
    reducers: {
        listSaldoPengelolaanKas: (state, action) => {
            state.data = action.payload
        },
        tambahSaldoPengelolaanKas: (state, action) => {
            state.tambah= action.payload
        },
        editSaldoPengelolaanKas: (state, action) => {
            state.edit = action.payload
        },
        detailSaldoPengelolaanKas: (state, action) => {
            state.detail = action.payload
        },
        hapusSaldoPengelolaanKas: (state, action) =>{
            state.hapus = action.payload
        },
        setItemEdit: (state, action) => {
            state.item = {...action.payload}
        },
        setItemDel: (state, action) => {
            state.itemDel = {...action.payload}
        },
        setItemsearch:(state, action) => {
            state.itemSearch = action.payload
        },
        clearSaldoPengelolaanKasStatus: (state) => {
            state.tambah = null
            state.edit= null
            state.detail = null
            state.hapus = null
        }
    }
})

export const {
    listSaldoPengelolaanKas,
    tambahSaldoPengelolaanKas,
    editSaldoPengelolaanKas,
    hapusSaldoPengelolaanKas,
    detailSaldoPengelolaanKas,
    setItemEdit,
    setItemDel,
    setItemsearch,
    clearSaldoPengelolaanKasStatus
} = saldoPengelolaanKasSlice.actions

export default saldoPengelolaanKasSlice.reducer