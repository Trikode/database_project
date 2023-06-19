import React from "react";
import { useState } from "react";
import "../../pages/Products/products.css";
import { IoIosArrowDown } from "react-icons/io"
import { IoIosArrowUp } from "react-icons/io"

const ProductSidebar = () => {
    const [toggle1,setToggle1] = useState(false);
    const [toggle2,setToggle2] = useState(false);
    const [toggle3,setToggle3] = useState(false);
    const [toggle4,setToggle4] = useState(false);
    function handleClick1(){
        setToggle1(!toggle1)
    }
    function handleClick2(){
        setToggle2(!toggle2)
    }
    function handleClick3(){
        setToggle3(!toggle3)
    }
    function handleClick4(){
        setToggle4(!toggle4)
    }
    return (
        <section className="productSidebar">
            <div className="containerCardProductMenu"onClick={handleClick1}>
                <p>Gender</p>
                {toggle1?<IoIosArrowDown />:<IoIosArrowUp/>}
            </div>
            <div className={`sidebarCard1 ${toggle1?"active":""}`}>
                <p>Man</p>
                <p>Woman</p>
                <p>Kid</p>
            </div>
            <div className="divisiorio"></div>
            <div className="containerCardProductMenu"onClick={handleClick2}>
                <p>Types</p>
                {toggle2?<IoIosArrowDown />:<IoIosArrowUp/>}
            </div>
            <div className={`sidebarCard1 ${toggle2?"active":""}`}>
                <p>T-shirt</p>
                <p>Polo</p>
                <p>Shirt</p>
                <p>Hoodies</p>
                <p>Tank-top</p>
            </div>
            <div className="divisiorio"></div>
            <div className="containerCardProductMenu"onClick={handleClick3}>
                <p>Shop by Price</p>
                {toggle3?<IoIosArrowDown />:<IoIosArrowUp/>}
            </div>
            <div className={`sidebarCard1 ${toggle3?"active":""}`}>
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
            <div className="containerCardProductMenu"onClick={handleClick4}>
                <p>Color</p>
                {toggle4?<IoIosArrowDown />:<IoIosArrowUp/>}
            </div>
            <div className={`sidebarCard4 ${toggle4?"active":""}`}>
                <div className="sidebar33">
                <div className="sideColor sidebarPurple"></div>
                <p>Purple</p>
                </div>
                <div className="sidebar33">
                <div className="sideColor sidebarBlack"></div>
                <p>Black</p>
                </div>
                <div className="sidebar33">
                <div className="sideColor sidebarRed"></div>
                <p>Red</p>
                </div>
                <div className="sidebar33">
                <div className="sideColor sidebarOrange"></div>
                <p>Orange</p>
                </div>
                <div className="sidebar33">
                <div className="sideColor sidebarBlue"></div>
                <p>Blue</p>
                </div>
                <div className="sidebar33">
                <div className="sideColor sidebarWhite"></div>
                <p>White</p>
                </div>
                <div className="sidebar33">
                <div className="sideColor sidebarBrown"></div>
                <p>Brown</p>
                </div>
                <div className="sidebar33">
                <div className="sideColor sidebarGreen"></div>
                <p>Green</p>
                </div>
                <div className="sidebar33">
                <div className="sideColor sidebarYellow"></div>
                <p>Yellow</p>
                </div>
                <div className="sidebar33">
                <div className="sideColor sidebarGrey"></div>
                <p>Grey</p>
                </div>
                <div className="sidebar33">
                <div className="sideColor sidebarPink"></div>
                <p>Pink</p>
                </div>
                <div className="sidebar33">
                <div className="sideColor sidebarMultiColor"></div>
                <p>Multi-Color</p>
                </div>
            </div>
        </section>
    )
}

export default ProductSidebar;