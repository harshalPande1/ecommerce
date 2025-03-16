import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    carts: {...JSON.parse(localStorage.getItem('carts'))},
    showModal : false
}
const addToCart = (payload,state) =>{
    if(!state.carts[payload?.uid]){
        let obj = {[payload?.id] : {...payload , qty :payload?.qty}} 
            state.carts[payload?.uid] = obj
        }else{      
            let obj = {...state.carts[payload?.uid] ,[payload?.id] : {...payload , qty :state.carts[payload?.uid][payload?.id] ? state.carts[payload?.uid][payload?.id]?.qty +1 :  payload?.qty}} 
                state.carts[payload?.uid] = obj
    }
}

const updateQty = (payload,state) =>{
            state.carts[payload?.uid][payload?.id] =  {...state.carts[payload?.uid][payload?.id] , qty : payload?.qty}
    }

const deleteItemFromCart = (payload,state) =>{
           if(state.carts[payload?.uid]) delete state.carts[payload?.uid][payload?.id] 
}


const cartFUn = (flag,payload,state) =>{
        switch (flag) {
            case 'add': addToCart(payload,state)
                break;
            case 'update': updateQty(payload,state)
                break;
            case 'delete': deleteItemFromCart(payload,state)
                break;
        
            default:
                break;
        }
}

const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        cartSystem: (state, { payload }) => {
            let flag = payload?.flag
            delete payload?.flag
            cartFUn(flag,payload,state)
            localStorage.setItem('carts',JSON.stringify(state.carts))
        },

        setShowModal : (state,{payload})=>{
            state.showModal = !state?.showModal
        }
    
    }
})



export const { cartSystem , setShowModal } = cartSlice.actions
export default cartSlice.reducer