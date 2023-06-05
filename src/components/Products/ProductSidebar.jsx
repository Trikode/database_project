import React from "react";
import "../../pages/Products/products.css";
import { IoIosArrowDown } from "react-icons/io"

const ProductSidebar = () => {
    return (
        <section className="productSidebar">
            <div className="containerCardProductMenu">
                <p>Gender</p>
                <IoIosArrowDown />
            </div>
            <div className="sidebarCard1">
                <p>Man</p>
                <p>Woman</p>
                <p>Kids</p>
            </div>
            <div className="divisiorio"></div>
            <div className="containerCardProductMenu">
                <p>Types</p>
                <IoIosArrowDown />
            </div>
            <div className="sidebarCard2">
                <p>T-shirt</p>
                <p>Polo</p>
                <p>Shirt</p>
                <p>Hoodies</p>
                <p>Tank-top</p>
            </div>
            <div className="divisiorio"></div>
            <div className="containerCardProductMenu">
                <p>Shop by Price</p>
                <IoIosArrowDown />
            </div>
            <div className="sidebarCard3">
                <div class="checkbox-container">
                    <input type="checkbox" id="checkbox1" className="checkedboxSidebar"/>
                    <label for="checkbox1" class="checkbox-label">$5 - $10</label>
                </div>

                <div class="checkbox-container">
                    <input type="checkbox" id="checkbox2" className="checkedboxSidebar"/>
                    <label for="checkbox2" class="checkbox-label">$10 - $20</label>
                </div>

                <div class="checkbox-container">
                    <input type="checkbox" id="checkbox3" className="checkedboxSidebar"/>
                    <label for="checkbox3" class="checkbox-label">$20 - $35</label>
                </div>

                <div class="checkbox-container">
                    <input type="checkbox" id="checkbox4" className="checkedboxSidebar"/>
                    <label for="checkbox4" class="checkbox-label">$35 - $100</label>
                </div>

            </div>
            <div className="divisiorio"></div>
        </section>
    )
}

export default ProductSidebar;