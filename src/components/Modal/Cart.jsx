import React, { useMemo, useState } from "react";
import { createPortal } from 'react-dom'
import { useDispatch, useSelector } from "react-redux";
import { cartSystem } from "../../../features/Cart/Cart";
import { getTotal } from "../../../helper/getTotal";
import { useNavigate } from "react-router";
const Cart = ({ setModal }) => {
    const dispatch = useDispatch();
    const [qty, setQty] = useState(0)
    const { carts } = useSelector(state => state.cartSlice)
    const { user } = useSelector(state => state.authSlice)
    let navigate = useNavigate();

    const productHandler = (product, flag, e) => {
        // console.log("e.target.value",qty);
        if (flag === 'delete') {
            dispatch(cartSystem({ ...product, flag: flag }))
        } else if (flag === 'add') {
            dispatch(cartSystem({ ...product, flag: 'update', qty: product?.qty ? product?.qty + 1 : 1 }))
        } else {
            dispatch(cartSystem({ ...product, flag: 'update', qty: product?.qty ? product?.qty - 1 : 1 }))
        }
    }

    const cartPlaceHandler = () => {
        try {
            navigate('/placeOrder')
        } catch (error) {
            console.log(error);

        }
    }

    const modal = <div className="z-3 p-3 position-fixed bg-light rounded-3 col-12 col-md-4  end-0 bottom-0 h-100" >
        <div className="text-end">
            <button className="btn btn-primary" onClick={() => dispatch(setModal(false))}>X</button>
        </div>
        <div className="" style={{ height: '46rem', overflow: 'auto' }}>
            {/* productlist */}

            <div className="">
                {Object.keys(carts[user?.payload?.uid]).map((item, itemKey) => {
                    return <div className="row mx-2 p-2 shadow p-3 mb-3 bg-body-tertiary rounded" key={itemKey}>
                        <div className="col-xl-3 col-lg-3 col-mg-6 col-sm-12 align-items-center"><img src={carts[user?.payload?.uid][item]?.images[0]} height={70} width={70} /></div>
                        <div className="col-xl-3 col-lg-3 col-mg-6 col-sm-12 align-items-center"><strong>{carts[user?.payload?.uid][item]?.title.toLocaleString().slice(0, 15) + '...'}</strong></div>
                        {/* <div className="col-xl-3 col-lg-3 col-mg-6 col-sm-12">qty {carts[user?.payload?.uid][item]?.qty}</div> */}
                        <div className="col-xl-3 col-lg-3 col-mg-6 col-sm-12 align-items-center">
                            <div className="d-flex justify-content-center align-items-center ">
                                <img src={'./m.png'} height={10} width={10} className=" mx-2 " onClick={(e) => productHandler(carts[user?.payload?.uid][item], 'minus')} />
                                {/* <input className=" mx-2 col-4 text-center" type="number" name="qty" onChange={(e) => setQty(e.target.defaultValue)} value={carts[user?.payload?.uid][item]?.qty} /> */}
                                <p className="m-3 col-4 text-center" type="number" name="qty" onChange={(e) => setQty(e.target.defaultValue)}  >{carts[user?.payload?.uid][item]?.qty}</p>
                                <img src={'./p.png'} height={10} width={10} className=" mx-2" onClick={(e) => productHandler(carts[user?.payload?.uid][item], 'add')} />
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-mg-6 col-sm-12"><img src={'./d.png'} height={20} width={20} className='m-3' onClick={() => productHandler(carts[user?.payload?.uid][item], 'delete')} /></div>
                    </div>
                })
                }
                <div className="position-absolute bottom-0 " style={{ width: '95%' }}>
                    <div className="d-flex w-100 justify-content-between " >
                        <h5>Total :- {getTotal(Object.keys(carts[user?.payload?.uid]), carts, user)}</h5>
                        <button className="btn btn-primary" onClick={cartPlaceHandler}>Place Order</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    return createPortal(modal, document.getElementById('modal'))
};

export default Cart
