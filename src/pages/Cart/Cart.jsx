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
  const [carts, setCarts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartOverlay, setCartOverlay] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3308/api/carts?userId=${currentUser.id_user}`)
      .then((response) => response.json())
      .then((data) => {
        setCarts(data);
        // Calculate the total price
        const totalPrice = data.reduce((acc, item) => acc + item.price, 0);
        setTotalPrice(totalPrice);
      })
      .catch((error) => console.error("Error:", error));
  }, [currentUser.id_user]);

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
      {cartOverlay ? (
        <div className="addressForm">
          <input
            type="county"
            class="Cart-form-control"
            id="cartInputCounty"
            placeholder="Nome"
          />

          <input
            type="country"
            class="Cart-form-control"
            id="cartInputCountry"
            placeholder="Cognome"
          />

          <input
            type="street"
            class="Cart-form-control"
            id="autocomplete"
            placeholder="Indirizzo"
          />

          <input
            type="city"
            class="Cart-form-control"
            id="cartInputCity"
            placeholder="Città"
          />

          <input
            type="state"
            class="Cart-form-control"
            id="cartInputState"
            placeholder="Provincia"
          />

          <input
            type="zip"
            class="Cart-form-control"
            id="cartInputZip"
            placeholder="CAP"
          />
        </div>
      ) : (
        <div class="CartContainer">
          <div class="CartWindow">
            <div class="CartOrder-info">
              <div class="CartOrder-info-content">
                <h2>Riepilogo Ordine</h2>
                <div className="CartItemsContainer">
                  {carts.map((item) => {
                    return (
                      <CartItem
                        img={item.image_url}
                        name={item.name}
                        size={item.size}
                        color={item.color}
                        price={item.price}
                      />
                    );
                  })}
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
                    <div class="CartThin dense">$4.95</div>${totalPrice}
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
                <button
                  class="add-adress CartPay-btn"
                  onClick={() => setCartOverlay(true)}
                >
                  Add Adress
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Cart;
