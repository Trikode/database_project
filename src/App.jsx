import React, { createContext, useState, useContext } from "react";
import "./index.css";
import { Route, Routes } from "react-router-dom";

//pages
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import Cart from "./pages/Cart/Cart";
import Admin from "./pages/Admin/Admin";
import Account from "./pages/Account/Account"

const itemsContext = createContext();
const defaultLiveItems = JSON.parse(localStorage.getItem("cartItems")) || [];

const Provider = ({ children }) => {
  const [liveItems, setLiveItems] = useState(defaultLiveItems.length);
  const [aBurger, setABurger] = useState(false);
  const [cartModal, setCartModal] = useState(false);
 
  const exposed = {
    liveItems,
    setLiveItems,
    aBurger,
    setABurger,
    cartModal,
    setCartModal,
  };
  return (
    <itemsContext.Provider value={exposed}>{children}</itemsContext.Provider>
  );
};
export const useLiveItems = () => useContext(itemsContext);

const App = () => {
  return (
    <Provider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        {/* <Route path="/favourites" element={<Favourites />} /> */}
        <Route path="/account" element={<Account />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Provider>
  );
};

export default App;