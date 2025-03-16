import {configureStore , combineReducers} from '@reduxjs/toolkit'
import API from './features/API'
import authSlice from './features/auth/authSlice'
import cartSlice from './features/Cart/Cart'
import productsSlice from './features/Products/productsSlice'

const reducers = combineReducers ({
    [API.reducerPath] : API.reducer,
    authSlice : authSlice,
    cartSlice : cartSlice,
    productsSlice : productsSlice,
})

const store = configureStore({
    reducer : reducers,
    middleware : (middleware => middleware({serializableCheck : false}).concat(API.middleware))
})

export default store