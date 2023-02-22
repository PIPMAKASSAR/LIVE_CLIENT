import { createSlice } from "@reduxjs/toolkit";

export const penerimaanSlice = createSlice({
    name:"penerimaan",
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
    reducers : {
        listPenerimaan: (state, action) => {
            state.data = action.payload
        },
        tambahPenerimaan: (state, action) => {
            state.tambah = action.payload
        },
        editPenerimaan: (state, action) => {
            state.edit = action.payload
        },
        detailPenerimaan: (state, action) => {
            state.detail = action.payload
        },
        hapusPenerimaan: (state, action) => {
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
        clearPenerimaanStatus: (state) => {
            state.tambah = null
            state.edit= null
            state.detail = null
            state.hapus = null
        }

    }
})

export const {
                listPenerimaan, 
                tambahPenerimaan, 
                editPenerimaan, 
                hapusPenerimaan,
                setItemEdit,
                setItemDel,
                setItemsearch,
                clearPenerimaanStatus
            } 
            = penerimaanSlice.actions
export default penerimaanSlice.reducer
