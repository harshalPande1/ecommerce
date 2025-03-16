import React from "react";

const Card = ({ product , productHandler }) => {

    return <div className="card ">
        <img src={product?.images[0]} className="card-img-top ratio ratio-4x3" alt="..." />
        <div className="card-body">
            <h6 className="card-text">{product?.title}</h6>
            <p className="card-text">$ {product?.price}</p>
            <div className="row">
                <button className="btn btn-primary" onClick={()=>productHandler(product)}>Add to Cart</button>
            </div>
        </div>
    </div>
};

export default Card;
