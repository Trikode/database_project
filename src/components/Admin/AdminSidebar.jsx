import React from "react";
import "../../pages/Admin/admin.css"
import {MdLogout} from "react-icons/md";
import {BsArrowBarRight} from "react-icons/bs";
import {AiOutlinePlus} from "react-icons/ai";
import {IoAnalyticsSharp} from "react-icons/io5";
import {MdWarehouse}from "react-icons/md";
import { Link } from "react-router-dom";
import { useLiveItems } from "../../App";




const AdminSidebar = (props) => {
    const {aBurger,setABurger}=useLiveItems()
    const handleClick = (event) => {
        setABurger((current) => !current);
      };
    const linkStyle = {
        color: "var(--text-200)"
    };
    const btnstyle ={
        background:'none',
        color: "var(--text-200)",
        border: 'none',
        cursor:'pointer'
    };
    return(
       <div className={`sidebar ${aBurger ? "active" : ""}`} onClick={handleClick}>
            logo
            <div className="top">
                <button onClick={props.addReport} style={btnstyle}><h4>Report <IoAnalyticsSharp className ="iconReport" /></h4></button>
                <button onClick={props.addNew}style={btnstyle}><h4>New product <AiOutlinePlus className="iconAdd"/></h4></button>
                <button onClick={props.addWare}  style={btnstyle}><h4>Warehouse <MdWarehouse className="iconwarehouse" /></h4></button>
            </div>
            <div className="bottom">
            <Link to={"/"} style={linkStyle}>
                <h4>Go to site <BsArrowBarRight className="iconToSite"/></h4>
            </Link>
            <Link to={"/logout"} style={linkStyle}>
                <h4>Log out <MdLogout className="iconLogout"/></h4>
            </Link>
                
            </div>  
        </div>
    );
};


export default AdminSidebar