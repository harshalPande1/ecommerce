import React from "react";
import useFormHook from "../../hooks/formHook";
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from "react-redux";
import { getTotal } from "../../../helper/getTotal";
import withAuth from "../../../features/Protected";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router";

const PlaceOrder = () => {
    const { user } = useSelector(state => state.authSlice)
    const { form, inputHandler } = useFormHook({})
    const { carts } = useSelector(state => state.cartSlice)
    let navigate = useNavigate();



    const placeOrderHandler = (e) => {
        try {
            
            if (form?.name && form?.address) {
                e.preventDefault();
                let id = uuidv4();
                let orders = localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')) : []
                const order = { ...form, carts: carts[user?.payload?.uid], orderId: id, total: getTotal(Object.keys(carts[user?.payload?.uid]), carts, user) }
                // console.log("form",orders);
                localStorage.setItem('orders', JSON.stringify([...orders ,order]))
                toast.success('Order Place')
                setTimeout(()=>{
                    navigate('/')
                },1000)
            }
        } catch (error) {
            console.log("error", error);

        }
    }
    return <div className="container">
        <div className="row justify-content-between align-self-center">
            <form onSubmit={placeOrderHandler}>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Name</label>
                    <input onChange={inputHandler} type="text" className="form-control" id="exampleInputEmail1" name="name" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Address</label>
                    <textarea onChange={inputHandler} type="text" name="address" className="form-control" id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
<ToastContainer />
    </div>;
};

export default withAuth(PlaceOrder);
