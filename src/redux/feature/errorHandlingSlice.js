import { createSlice } from "@reduxjs/toolkit";

export const errorHandlingSlice = createSlice({
    name:"erroHandling",
    initialState: {
        getError: {
            message: "",
            status: true
        },
        getSuccess: {
            message: "",
            status: false 
        }
    },
    reducers : {
        failMessage: (state, action) => {
            state.getError.message = action.payload.message
            state.getError.status = action.payload.status
        },
        successMessage: (state, action) => {
            state.getSuccess.message = action.payload.message
            state.getSuccess.status = action.payload.status
        },
        clearErrorMessage: (state, action) => {
            state.getError.message = ""
            state.getError.status = true
            state.getSuccess.message =""
            state.getSuccess.status = false
        },
    }
})

export const {
                failMessage,
                successMessage,
                clearErrorMessage
            } 
            = errorHandlingSlice.actions
export default errorHandlingSlice.reducer
