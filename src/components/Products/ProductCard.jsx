import React from "react";
import "../../pages/Products/products.css";
import tShirt from "../../assets/t-shirt.jpg"

const ProductCard = () => {
    return (
        <section className="productCard">
            <img src={tShirt} alt="" />
            <p className="nameProduct">T-shirt verde</p>
            <p className="typeProduct">Man-Polo</p>
            <p className="priceProduct">$24.99</p>
            <div className="containerColor">
                <div className="btnColorProduct"></div>
            </div>
        </section>
    )
}

export default ProductCard;