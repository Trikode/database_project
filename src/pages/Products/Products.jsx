import React from "react";

//sections
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import TopReminder from "../../components/TopReminder/TopReminder";
import ProductCard from "../../components/Products/ProductCard";
import ProductSidebar from "../../components/Products/ProductSidebar";
const Products = () => {
  return (
    <>
      <TopReminder />
      <Navbar />
      <div className="containerProduct">
      <ProductSidebar/>
      {/* <ProductCard/> */}
      </div>
      <Footer />
    </>
  );
};

export default Products;
