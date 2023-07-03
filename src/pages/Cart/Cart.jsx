import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./cart.css";
// import { FaTrash } from "react-icons/fa";
// import PaymentLogos from "../../components/Cart/PaymentComponent";
import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { useLiveItems } from "../../App";
import TopReminder from "../../components/TopReminder/TopReminder";
import CartAdress from "../../components/Cart/CartAdress";
import CartItem from "../../components/Cart/CartItem";

const Cart = () => {
  const { currentUser } = useLiveItems();
  const [deliveries, setDeliveries] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3308/api/deliveries")
      .then((response) => response.json())
      .then((data) => setDeliveries(data))
      .catch((error) => console.error("Error:", error));
  }, []);
  // const user = deliveries.find((user) => user.id_user === currentUser.id_user);
  return (
    <>
      <TopReminder />
      <Navbar />
      <div class="CartContainer">
        <div class="CartWindow">
          <div class="CartOrder-info">
            <div class="CartOrder-info-content">
              <h2>Riepilogo Ordine</h2>
              <div className="CartItemsContainer">
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
                </div>

              <div class="CartLine"></div>
              <div class="CartTotal">
                <span class="CartFloatLeft">
                  <div class="CartThin dense">VAT 19%</div>
                  <div class="CartThin dense">Delivery</div>
                  TOTAL
                </span>
                <span class="CartFloatRight">
                  <div class="CartThin dense">$68.75</div>
                  <div class="CartThin dense">$4.95</div>
                  $435.55
                </span>
              </div>
            </div>
          </div>
          <div class="CartCredit-info">
            <div class="CartCredit-info-content">
              <form>
                {deliveries
                  .filter((del) => del.id_user === currentUser.id_user)
                  .map((delivery) => {
                    return (
                      <CartAdress
                        nome={delivery.first_name}
                        cognome={delivery.last_name}
                        indirizzo={delivery.adress}
                        città={delivery.city}
                        cap={delivery.cap}
                      />
                    );
                  })}
              </form>

              <button class="CartPay-btn">Checkout</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
