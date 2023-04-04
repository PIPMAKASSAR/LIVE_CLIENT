import { createSlice } from "@reduxjs/toolkit";

export const makSlice = createSlice({
    name:"mak",
    initialState: {
        data: [],
        tambah: null,
        edit: null,
        detail: null,
        hapus: null,
        item: {},
        itemDel: {},
        itemSearch: "",
        listHeader: []
    },
    reducers : {
        listmak: (state, action) => {
            state.data = action.payload
        },
        tambahmak: (state, action) => {
            state.tambah = action.payload
        },
        editmak: (state, action) => {
            state.edit = action.payload
        },
        detailmak: (state, action) => {
            state.detail = action.payload
        },
        hapusmak: (state, action) => {
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
        clearMakStatus: (state) => {
            state.tambah = null
            state.edit= null
            state.detail = null
            state.hapus = null
        },
        getListHeader: (state, action) => {
            state.listHeader = action.payload
        }

    }
})

export const {
                listmak, 
                tambahmak, 
                editmak, 
                hapusmak,
                setItemEdit,
                setItemDel,
                setItemsearch,
                clearmakStatus,
                getListHeader,
            } 
            = makSlice.actions
export default makSlice.reducer
