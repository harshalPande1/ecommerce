import React, { lazy, Suspense, useEffect, useState } from "react";
import Cart from "./Modal/Cart.jsx";
import withAuth from "../../features/Protected.jsx";
import { useSelector, useDispatch } from "react-redux";
import { cartSystem, setShowModal } from "../../features/Cart/Cart.js";
import { useLazyGetProductsQuery } from "../../features/Products/productsApi.js";
import { ToastContainer, toast } from 'react-toastify';
import Loader from "./Loader.jsx";
// import Products from "./products/Products.jsx";
const Products = lazy(() => import("./products/Products.jsx"));

const Layout = () => {
    const { user } = useSelector(state => state.authSlice)
    const { showModal } = useSelector(state => state.cartSlice)
    const dispatch = useDispatch()
    const [getProducts] = useLazyGetProductsQuery()

    useEffect(() => {
        try {
            getProducts()
        } catch (error) {
            console.log(error);

        }
    }, [])

    const productHandler = (productItem) => {
        try {
            let product = {
                ...productItem,
                uid: user?.payload?.uid,
                qty: 1,
                flag: 'add',
            }
            dispatch(cartSystem(product))
            toast.success('product add to your cart')
        } catch (error) {
            console.log(error);

        }
    }
    return <div className="">
        <div>
        <Suspense fallback={ <Loader /> }>
            <Products productHandler={productHandler} />
        </Suspense>
        </div>

        <div>
            {showModal && <Cart setModal={setShowModal} productHandler={productHandler} />}
        </div>
        <ToastContainer />
    </div>;
};

export default withAuth(Layout);
