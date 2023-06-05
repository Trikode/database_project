import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./cart.css";
import TopReminder from "../../components/TopReminder/TopReminder";

const Cart = () => {
  return (
    <>
      <Navbar />
      <div className="cartContainer">
        <div className="leftPartCart"></div>
        <div className="rightPartCart"></div>
      </div>
      <TopReminder />
      <Footer />
    </>
  );
};

export default Cart;
