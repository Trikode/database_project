import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./cart.css";
import { FaTrash } from "react-icons/fa";
import PaymentLogos from "../../components/Cart/PaymentComponent";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLiveItems } from "../../App";
import TopReminder from "../../components/TopReminder/TopReminder";

const Cart = () => {
  //Get Items from localStorages.
  let itemsInCart = JSON.parse(localStorage.getItem("cartItems"));
  const [cart, setCart] = useState(itemsInCart ? itemsInCart : null);
  const [grandTotal, setGrandTotal] = useState(0);
  const { setLiveItems, setCartModal } = useLiveItems();
  const [promoValue, setPromoValue] = useState(0);
  let [count, setCount] = useState(5);
  const [overlayThx, setOverlayThx] = useState(false);
  

  useEffect(() => {
    let grandTotalUpdated = 0;
    const itemsTotalArray = cart?.map((item) => {
      return Number(item.itemTotal);
    });
    for (let index = 0; index < itemsTotalArray?.length; index++) {
      grandTotalUpdated = grandTotalUpdated + itemsTotalArray[index];
    }
    setGrandTotal(grandTotalUpdated);
  }, [cart, promoValue]);

  useEffect(() => {
    setCartModal(false);
  });

  //This thing will get the quantity from the input of the cart an change it.
  function changeHandler(event, id) {
    const value = Number(event.target.value);
    let cartUpdated = cart?.map((item, index) => {
      if (index === id) {
        return {
          ...item,
          quantity: value,
          itemTotal: Number((value * Number(item.price)).toFixed(2)),
        };
      } else {
        return item;
      }
    });
    setCart(cartUpdated);
    localStorage.setItem("cartItems", JSON.stringify(cartUpdated));
  }

  //Overlay functions
  function closeOverlay() {
    document.getElementById("overlayProcede").style.display = "none";
  }
  function openOverlay() {
    if (
      localStorage.getItem("cartItems") === null ||
      itemsInCart.length === 0
    ) {
      //this is if part is only for the conditions, it's meant to do nothing but checking the lS
    } else {
      document.getElementById("overlayProcede").style.display = "block";
    }
  }

  const redirectDelay = () => {
    let delay = setTimeout(() => {
      redirectToHome("/");
    }, 5000);
    return () => clearTimeout(delay);
  };
  const counter = () => {
    const interval = setInterval(() => {
      setCount(count--);
      if (count < 0) {
        clearInterval(interval);
      }
    }, 850);
  };

  //Program where when the Prodece button is clicked the datas from the two localStorages will merge and create a new localStorage for the Admin page
  let redirectToHome = useNavigate();
  function procedeHandler() {
    //build the delivery information that will be placed in the LS
    let deliveryInformation = {
      phone: document.querySelector("#telInput").value,
      name: document.querySelector("#nameInput").value,
      surname: document.querySelector("#surnameInput").value,
      street: document.querySelector("#streetInput").value,
      city: document.querySelector("#cityInput").value,
    };
    //LS is build
    let subdividedCart = [[itemsInCart, [deliveryInformation]]];
    if (
      localStorage.getItem("cartItems") === null ||
      itemsInCart.length === 0
    ) {
      //this is if part is only for the conditions, it's meant to do nothing but checking the lS
    } else if (localStorage.getItem("ItemsPurchased") !== null) {
      let oldPurchased = JSON.parse(localStorage.getItem("ItemsPurchased"));
      let purchasedUpdated = oldPurchased.concat(subdividedCart);
      localStorage.setItem("ItemsPurchased", JSON.stringify(purchasedUpdated));
      localStorage.removeItem("cartItems");
    } else {
      localStorage.setItem("ItemsPurchased", JSON.stringify(subdividedCart));
      localStorage.removeItem("cartItems");
    }
    closeOverlay();
    redirectDelay();
    setOverlayThx(true);
  }
  //getting and checking the delivery informations
  function deliveryCheck() {
    const phone = document.querySelector("#telInput").value;
    const name = document.querySelector("#nameInput").value;
    const surname = document.querySelector("#surnameInput").value;
    const street = document.querySelector("#streetInput").value;
    const city = document.querySelector("#cityInput").value;
    if (
      phone === "" ||
      name === "" ||
      surname === "" ||
      street === "" ||
      city === ""
    ) {
      openOverlay();
    }
  }
  //deletes and update items in the cart
  function deleteHandler(array, id) {
    const arrayUpdated = array.filter((_item, index) => index !== id);
    setCart(arrayUpdated);
    localStorage.setItem("cartItems", JSON.stringify(arrayUpdated));
    setLiveItems(arrayUpdated.length);
  }
  //here we set the various codes for the promo
  function promoCodeHandler() {
    const promoCode = document.querySelector("#promoInput").value;
    if (promoCode === "forzanapoli") {
      setPromoValue(100);
    } else if (promoCode === "gulpèimportante") {
      setPromoValue(25);
    } else if (promoCode === "piscuozzo") {
      setPromoValue(50);
    } else {
      setPromoValue(0);
    }
  }



  //Extremely important part because this if thing will decide wath localStorage to print.
  let redirectToProducts = useNavigate();
  let contentOfCart;
  if (localStorage.getItem("cartItems") === null || itemsInCart.length === 0) {
    let path = "/products";
    contentOfCart = (
      <div className="productsButton">
        <p>You have nothing in your cart yet.</p>
        <button
          className="toOurProductsButton"
          onClick={() => redirectToProducts(path)}
        >
          Go to our products
        </button>
      </div>
    );
  } else {
    contentOfCart = (
      <div>
        {cart.map((item, index) => {
          return (
            <div className="singlearticle" key={item.id}>
              {/* <CartCards
                title={item.title}
                color={item.color}
                size={item.size}
                price={item.price}
                image={item.image || item.finalImage}
                material={item.material}
                side={item.side}
                customImage={item.customImage}
              /> */}
              <div className="intTrashQuantity">
                <select onChange={(e) => changeHandler(e, index)}>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                  <option value={9}>9</option>
                  <option value={10}>10</option>
                </select>
                <FaTrash onClick={() => deleteHandler(cart, index)} />
                <div>Cost: {item.itemTotal} $</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="containerCart">
        <TopReminder />
        <div id="overlayProcede">
          <div id="overlayBox">
            <p>Do you really want to pay?</p>
            <div id="overlayButtons">
              <button
                className="overlaybutton"
                onClick={() => {
                  procedeHandler();
                  counter();
                }}
              >
                Yes
              </button>
              <button className="overlaybutton" onClick={closeOverlay}>
                No
              </button>
            </div>
          </div>
        </div>
        <div
          id="overlayThanks"
          className={overlayThx ? "overlayThanksOpen" : "overlayThanks"}
        >
          <div id="overlayBoxThanks">
            <p>
              Thanks for your purchase
              <br />
              You will be redirected to the home page in {count} seconds.
            </p>
          </div>
        </div>
        <div className="colorbigdiv">
          <div className="leftpart">
            {/*
            
            Left Part

            */}
            <div>
              <section className="articles bubble">
                <h2>Articles</h2>
                {contentOfCart}
              </section>

              <section className="formattingDeliPay bubble" id="form">
                <h2>Delivery informations</h2>
                <div className="shipping-info">
                  <p>Workdays between 9:00 AM to 9:00 PM</p>
                  <p>The shipping is provided by FedEx</p>
                  <div className="border-bottom-shipping-info"></div>
                </div>
                {/* la parte sotto cambia se mette o div o p o label o h4 */}
                <div className="cart-form">
                  <div className="cart-form-row">
                    <h4>Phone:</h4>
                    <input
                      type="tel"
                      id="telInput"
                      placeholder="xxx-xxxxxxx"
                      pattern="[0-9]{3}-[0-9]{7}"
                    />
                  </div>
                  <div className="cart-form-row">
                    <h4>Name:</h4>
                    <input type="text" placeholder="John" id="nameInput" />
                  </div>
                  <div className="cart-form-row">
                    <h4>Surname:</h4>
                    <input type="text" placeholder="Doe" id="surnameInput" />
                  </div>
                  <div className="cart-form-row">
                    <h4>Address:</h4>
                    <input
                      type="text"
                      placeholder="159 E 65th St"
                      id="streetInput"
                    />
                  </div>
                  <div className="cart-form-row">
                    <h4>City:</h4>
                    <input type="text" placeholder="New York" id="cityInput" />
                  </div>
                </div>
              </section>

              <PaymentLogos />
            </div>
            {/*
            
            Left Part

            */}
          </div>
          <div className="rightpart">
            {/*
            
            Right Part

            */}
            <div className="sticky" id="parent">
              <section className="cost bubble">
                <h2>TOTAL</h2>
                <div className="spacecost">
                  <div>Sub Total:</div> <div>{grandTotal.toFixed(2)} $</div>
                </div>
                <div className="spacecost">
                  <div>Shipping:</div> <div>0.00 $</div>
                </div>
                <div className="spacecost">
                  <div>Promo code:</div> <div>{promoValue} %</div>
                </div>
                <hr />
                <div className="spacecost">
                  <div>Total:</div>{" "}
                  <div>
                    {(grandTotal - grandTotal * (promoValue / 100)).toFixed(2)}{" "}
                    $
                  </div>
                </div>
                <button className="costbutton" onClick={() => deliveryCheck()}>
                  Proceede
                </button>
              </section>
              <section className="promo bubble">
                <div className="promo-code">
                  <input
                    type="text"
                    placeholder="Insert promo code here"
                    id="promoInput"
                  />
                  <button className="promoButton" onClick={promoCodeHandler}>
                    Insert
                  </button>
                </div>
              </section>
            </div>
            {/*
            
            Right Part

            */}
          </div>
        </div>
        <div className="border-bottom-cart"></div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
