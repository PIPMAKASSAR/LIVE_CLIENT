import { createSlice } from "@reduxjs/toolkit";

export const pengeluaranSlice = createSlice({
    name:"pengeluaran",
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
        listPengeluaran: (state, action) => {
            state.data = action.payload
        },
        tambahPengeluaran: (state, action) => {
            state.tambah= action.payload
        },
        editPengeluaran: (state, action) => {
            state.edit = action.payload
        },
        detailPengeluaran: (state, action) => {
            state.detail = action.payload
        },
        hapusPengeluaran: (state, action) =>{
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
        clearPengeluaranStatus: (state) => {
            state.tambah = null
            state.edit= null
            state.detail = null
            state.hapus = null
        }
    }
})

export const {
    listPengeluaran,
    tambahPengeluaran,
    editPengeluaran,
    hapusPengeluaran,
    detailPengeluaran,
    setItemEdit,
    setItemDel,
    setItemsearch,
    clearPengeluaranStatus
} = pengeluaranSlice.actions

export default pengeluaranSlice.reducer