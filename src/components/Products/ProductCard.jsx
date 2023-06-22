import React from "react";
import { useEffect,useState } from "react";
import "../../pages/Products/products.css";
// import tShirt from "../../assets/t-shirt.jpg"
import { useNavigate } from "react-router";
import { useLiveItems } from "../../App";


const ProductCard = (props) => {
    const {setCurrentProduct,setCurrentColour}=useLiveItems();
    let redirectToPage =  useNavigate();
    const [products,setProducts] = useState([]);

    useEffect(() => {
      fetch('http://localhost:3308/api/products')
        .then((response) =>response.json())
        .then((data) => setProducts(data))
        .catch((error) => console.error('Error:', error));
    }, []);  
    // let idx = props.idx;
    const handleClick =()=> {
        setCurrentProduct(props.name);
        // setCurrentColour(props.colour);
        redirectToPage("/shop");
    }

    
    return (
        <section className="productCard" onClick={handleClick}>
            <img src={props.img} alt="" onClick={()=>setCurrentColour(props.colour)}/>
            <p className="nameProduct">{props.name}</p>
            <p className="typeProduct">{props.type}</p>
            <p className="priceProduct">${props.price}</p>
            <div className="containerColor">
            {products.filter((prd) => prd.name === props.name).map((prod)=>{
                        return <div className="btnColorProduct" style={{ backgroundColor: prod.color }} onClick={()=>{setCurrentColour(prod.color)}}/>
                    })}
                
            </div>
        </section>
    )
}

export default ProductCard;