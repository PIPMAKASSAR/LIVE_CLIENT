import { createSlice } from "@reduxjs/toolkit";

export const saldoDanaKelolaanSlice = createSlice({
    name:"saldoDanaKelolaan",
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
        listSaldoDanaKelolaan: (state, action) => {
            state.data = action.payload
        },
        tambahSaldoDanaKelolaan: (state, action) => {
            state.tambah= action.payload
        },
        editSaldoDanaKelolaan: (state, action) => {
            state.edit = action.payload
        },
        detailSaldoDanaKelolaan: (state, action) => {
            state.detail = action.payload
        },
        hapusSaldoDanaKelolaan: (state, action) =>{
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
        clearSaldoDanaKelolaanStatus: (state) => {
            state.tambah = null
            state.edit= null
            state.detail = null
            state.hapus = null
        }
    }
})

export const {
    listSaldoDanaKelolaan,
    tambahSaldoDanaKelolaan,
    editSaldoDanaKelolaan,
    hapusSaldoDanaKelolaan,
    detailSaldoDanaKelolaan,
    setItemEdit,
    setItemDel,
    setItemsearch,
    clearSaldoDanaKelolaanStatus
} = saldoDanaKelolaanSlice.actions

export default saldoDanaKelolaanSlice.reducer