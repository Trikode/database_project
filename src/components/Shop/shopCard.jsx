import React from "react";
import { useState, useEffect } from "react";
import "../../pages/Shop/shop.css";
// import tShirt from "../../assets/t-shirt.jpg"
// import { useNavigate } from "react-router";
import { useLiveItems } from "../../App";

import { MdLocalShipping } from "react-icons/md";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { func } from "prop-types";




const ShopCard = () => {
  const { currentProduct, currentColour, setCurrentColour } = useLiveItems();
  const [products, setProducts] = useState([]);
  const [pName, setPName] = useState("");
  const [pImg, setPImg] = useState("");
  // const [pColour,setPColour] = useState("");
  const [pPrice, setPPrice] = useState("");
  const [selectedSize, setSelectedSize] = useState(null);
  const uniqueColors = Array.from(new Set(products.filter((prd) => prd.name === currentProduct).map((prod) => prod.color)));


  useEffect(() => {
    fetch('http://localhost:3308/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error:', error));
  }, []);
  useEffect(() => {
    const product = products.find((prd) => prd.name === currentProduct && prd.color === currentColour);
    setPName(product?.name);
    setPImg(product?.image);
    //   setPColour(product?.color);
    setPPrice(product?.price);

  }, [products, currentProduct, currentColour])




  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  return (
    <>
      <section className="shopSection">
        <div className="shopContainerImg">
          <img src={pImg} alt="" />
        </div>
        <div className="shopRight">
          <p>{pName}</p>
          <p className="shopPrezzo">${pPrice}</p>
          <hr />
          <p className="shopColorTxt">Colore:</p>
          <div className="shopContainerColor">
            {uniqueColors.map((color, idx) => (
              <div
                key={idx}
                className="btnColorProduct"
                style={{ backgroundColor: color }}
                onClick={() => {
                  setCurrentColour(color);
                }} />
            ))}
          </div>



          <div className="shopContainerMisure">
            <div
              className={`shopTaglia ${selectedSize === 'XS' ? 'selected' : ''}`}
              onClick={() => handleSizeClick('XS')}
            >
              XS
            </div>
            <div
              className={`shopTaglia ${selectedSize === 'S' ? 'selected' : ''}`}
              onClick={() => handleSizeClick('S')}
            >
              S
            </div>
            <div
              className={`shopTaglia ${selectedSize === 'M' ? 'selected' : ''}`}
              onClick={() => handleSizeClick('M')}
            >
              M
            </div>
            <div
              className={`shopTaglia ${selectedSize === 'L' ? 'selected' : ''}`}
              onClick={() => handleSizeClick('L')}
            >
              L
            </div>
            <div
              className={`shopTaglia ${selectedSize === 'XL' ? 'selected' : ''}`}
              onClick={() => handleSizeClick('XL')}
            >
              XL
            </div>
          </div>



          <div className="shopAggiungi">AGGIUNGI AL CARRELLO</div>
          <div className="shopContainerSpedizione">
            <div className="shopCardInfo">
              <MdLocalShipping size={30} />
              <p>Spedizione gratuita</p>
            </div>
            <p className="shopParSpedizione">Spedizione standard gratuita sugli ordini superiori a 9.00€ 8-12 Giorni Lavorativi</p>

            <div className="shopCardInfo">
              <AiFillSafetyCertificate size={30} />
              <p>Politica di Ritorno</p>
            </div>
            <p className="shopParSpedizione">Resi grautiti in caso di difetto o altri problemi.</p>

          </div>
        </div>
      </section>
    </>
  )
}

export default ShopCard;