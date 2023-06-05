import React from "react";
import "./navbar.css";
import { BsSearch } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import {RiAccountCircleLine} from "react-icons/ri"
import { Link } from "react-router-dom";
import BurgerModal from "./BurgerModal";
import Logo from "../../assets/logo2.svg";
import { useLiveItems } from "../../App";

const Navbar = () => {
  const { liveItems, cartModal, setCartModal} = useLiveItems();

  const linkStyle = {
    textDecoration: "none",
    color: "aliceblue",
  };
  const cartStyle = {
    textDecoration: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <nav className="navbar">
      <div className="burger">
        <BurgerModal className="burger-icon" />
      </div>
      <div className="nav-left">
        <Link to={"/"}>
          <img src={Logo} alt="" className="nav-logo" />
        </Link>
      </div>
      <div className="center">
        <ul>
          <li>
            <Link to={"/products"} style={linkStyle}>
              Our Products
            </Link>
          </li>
        </ul>
      </div>
      <div className="nav-right">
        <div className="searchbar">
          <input type="text" placeholder="Search" />
          <div className="searchicon">
            <BsSearch />
          </div>
        </div>
        <div >
          <Link to={"/account"}>
            <RiAccountCircleLine className="accountIcon"/>
          </Link>
        </div>
        <div className="cart-container">
          {liveItems > 0 ? (
            <div className="cart-notification">
              <p>{liveItems}</p>
            </div>
          ) : (
            ""
          )}
          <Link to={"/cart"} style={cartStyle}>
            <AiOutlineShoppingCart
              className="cart"
              onMouseEnter={() => setCartModal(true)}
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
