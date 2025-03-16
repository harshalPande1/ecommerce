import { createSlice } from "@reduxjs/toolkit"
import {productsAPI} from './productsApi'
import API from "../API";
const initialState = {
    products : []
}

const productsSlice = createSlice({
    name : 'productsSlice',
    initialState, 
    reducers : {
        addAuthUser : (state,payload  ) =>{
            console.log(payload);
            state.user = payload
        }
    },
    extraReducers : (builder) =>{
        builder.addMatcher(productsAPI.endpoints.getProducts.matchPending,(state)=>{
            state.products = {};
            state.loading = true;
            state.error = {};
        })
        .addMatcher(productsAPI.endpoints.getProducts.matchFulfilled,(state,{payload})=>{
            state.products = payload
            state.loading = true;
            state.error = {};
        })
        .addMatcher(productsAPI.endpoints.getProducts.matchRejected,(state,[payload])=>{
            state.products = {};
            state.loading = true;
            state.error = payload?.error
        })
    }
})



export const {addAuthUser} = productsSlice.actions
export default productsSlice.reducer