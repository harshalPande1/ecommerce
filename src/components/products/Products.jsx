import React from "react";
import { useSelector } from "react-redux";
import Card from "./Card";

const Products = ({productHandler}) => {
    const { products } = useSelector(state => state.productsSlice)

    return <>
        <div className="row ">
            {
                products.length && products?.map((product) => {
                    return <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 ">
                        <Card key={product?.id} product={product} productHandler={productHandler} />
                    </div>
                })
            }
        </div>
    </>
};

export default Products;
