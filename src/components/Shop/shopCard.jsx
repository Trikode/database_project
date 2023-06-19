import React from "react";
import "../../pages/Shop/shop.css";
import tShirt from "../../assets/t-shirt.jpg"
import { useNavigate } from "react-router";


const ShopCard = () => {
    return (
        <>
            <section className="shopSection">
                <div className="shopContainerImg">
                    <img src={tShirt} alt="" />
                </div>
                <div className="shopRight">
                    <p>T-shirt verde</p>
                    <p className="shopPrezzo">50.00$</p>
                    <hr />
                    <p className="shopColorTxt">Colore:</p>
                    <div className="shopColor"></div>
                    <p className="shopMisure">Misure:</p>
                    <div></div>
                </div>
            </section>
        </>
    )
}

export default ShopCard;