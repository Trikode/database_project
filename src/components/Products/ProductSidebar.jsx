import React from "react";
import "../../pages/Products/products.css";
import {IoIosArrowDown} from "react-icons/io"

const ProductSidebar = () => {
    return (
        <section className="productSidebar">
                <div className="containerCardProductMenu">
                    <p>Gender</p>
                    <IoIosArrowDown/>
                </div>
                <div>
                    
                </div>
                <p>Man</p>
                <p>Woman</p>
                <p>Kids</p>
                <div className="divisiorio"></div>
                <p>T-shirt</p>
                <p>Polo</p>
                <p>Shirt</p>
                <p>Hoodies</p>
                <p>Tank-top</p>
                <div className="divisiorio"></div>
        </section>
    )
}

export default ProductSidebar;