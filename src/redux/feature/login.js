import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name:"login",
    initialState: {
        value: ""
    },
    reducers: {
        login: (state) => {
            state.value = loginSlice()
        }
    }
})

export const {login} = loginSlice.actions

export default loginSlice.reducer