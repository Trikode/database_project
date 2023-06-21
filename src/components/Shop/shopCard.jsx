import React from "react";
import { useState,useEffect } from "react";
import "../../pages/Shop/shop.css";
// import tShirt from "../../assets/t-shirt.jpg"
// import { useNavigate } from "react-router";
import { useLiveItems } from "../../App";

// import { MdLocalShipping } from "react-icons/md";

/* <MdLocalShipping size={30}/> */


const ShopCard = () => {
    const{currentProduct,currentColour,setCurrentColour}=useLiveItems();
    const [products,setProducts] = useState([]);
    const [pName,setPName] = useState("");
    const [pImg,setPImg] = useState("");
    // const [pColour,setPColour] = useState("");
    const [pPrice,setPPrice] = useState("");
    
    useEffect(() => {
        fetch('http://localhost:3308/api/products')
          .then((response) =>response.json())
          .then((data) => setProducts(data))
          .catch((error) => console.error('Error:', error));
      }, []);  
      useEffect(()=>{
          const product = products.find((prd) => prd.name === currentProduct &&  prd.color === currentColour);
          setPName(product?.name);
          setPImg(product?.image);
        //   setPColour(product?.color);
          setPPrice(product?.price);

      },[products,currentProduct,currentColour])

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
                    {products.filter((prd) => prd.name === currentProduct).map((prod)=>{
                        return <div className="shopColor" style={{ backgroundColor: prod.color }} onClick={()=>{setCurrentColour(prod.color)}}></div>
                    })}
                    </div>
                   
                    
                    <div className="shopContainerMisure">
                        <div className="shopTaglia">XS</div>
                        <div className="shopTaglia">S</div>
                        <div className="shopTaglia">M</div>
                        <div className="shopTaglia">L</div>
                        <div className="shopTaglia">XL</div>
                    </div>
                    <div className="shopAggiungi">AGGIUNGI AL CARRELLO</div>
                    <div className="shopContainerSpedizione">
                       s
                    </div>
                </div>
            </section>
        </>
    )
}

export default ShopCard;