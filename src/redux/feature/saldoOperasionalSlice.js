import { createSlice } from "@reduxjs/toolkit";

export const saldoOperasionalSlice = createSlice({
    name:"saldoOperasional",
    initialState: {
        data: [],
        tambah: null,
        edit: null,
        detail: null,
        hapus: null,
        item:{},
        itemDel: {},
        itemSearch: ""
        
    },
    reducers: {
        listSaldoOperasional: (state, action) => {
            state.data = action.payload
        },
        tambahSaldoOperasional: (state, action) => {
            state.tambah= action.payload
        },
        editSaldoOperasional: (state, action) => {
            state.edit = action.payload
        },
        detailSaldoOperasional: (state, action) => {
            state.detail = action.payload
        },
        hapusSaldoOperasional: (state, action) =>{
            state.hapus = action.payload
        },
        setItemSaldoOperasional: (state, action) => {
            state.item = {...action.payload}
        },
        clearSaldoOperasionalStatus: (state) => {
            state.tambah = null
            state.edit= null
            state.detail = null
            state.hapus = null
        }
    }
})

export const {
    listSaldoOperasional,
    tambahSaldoOperasional,
    editSaldoOperasional,
    hapusSaldoOperasional,
    detailSaldoOperasional,
    setItemSaldoOperasional,
    clearSaldoOperasionalStatus
} = saldoOperasionalSlice.actions

export default saldoOperasionalSlice.reducer