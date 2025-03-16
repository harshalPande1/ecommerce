import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user : {}
}

const authSlice = createSlice({
    name : 'authSlice',
    initialState, 
    reducers : {
        addAuthUser : (state,payload  ) =>{
            console.log(payload);
            state.user = payload
        }
    }
})



export const {addAuthUser} = authSlice.actions
export default authSlice.reducer