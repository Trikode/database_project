import React from "react";
import "../../pages/Products/products.css";
// import tShirt from "../../assets/t-shirt.jpg"
import { useNavigate } from "react-router";


const ProductCard = (props) => {
    let redirectToPage =  useNavigate();
    const handleClick =()=> {
      redirectToPage("/shop");
    }
    return (
        <section className="productCard" onClick={handleClick}>
            <img src={props.img} alt="" />
            <p className="nameProduct">{props.name}</p>
            <p className="typeProduct">{props.type}</p>
            <p className="priceProduct">${props.price}</p>
            <div className="containerColor">
                <div className="btnColorProduct"></div>
            </div>
        </section>
    )
}

export default ProductCard;