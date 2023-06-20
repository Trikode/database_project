import React from "react";
import { useState,useEffect } from "react";

//sections
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import TopReminder from "../../components/TopReminder/TopReminder";
import ProductCard from "../../components/Products/ProductCard";
import ProductSidebar from "../../components/Products/ProductSidebar";


const Products = () => {

  const [products,setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3308/api/products')
      .then((response) =>response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error:', error));
  }, []);  

  return (
    <>
      <TopReminder />
      <Navbar />
      <div className="containerProduct">
        <div>
        <ProductSidebar/>
        </div>
        <div className="container-productCard">
        {products.map((product,pidx) => {
          return (
            <div key={pidx}>
              <ProductCard name={product.name} type={product.type} price={product.price} img={product.image} colour={product.color} /*idx={product.id_product}*//>
            </div>
           )
         
        })};
        
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Products;
