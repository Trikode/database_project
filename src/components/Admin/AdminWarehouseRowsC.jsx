import React, { useState } from "react";
import "../../pages/Admin/admin.css"

const AdminWarehouseRows  = (props)=>{
    const[show,setShow]=useState(false)
    // const {setShow}= useLiveItems();
    return(
        <>
        <tr>
            <td>
                <span className= "toolTip" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>{props.name}</span>
                <span className={show ? "toolTipImgActive" :"toolTipImg"}>{props.img}</span>
            </td>
            <td>{props.modello}</td>
            <td>{props.color}</td>
            <td>XS</td>
            <td>{props.quantity}</td>
        </tr>
        <tr>
            <td>
                <span className= "toolTip" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>{props.name}</span>
                <span className={show ? "toolTipImgActive" :"toolTipImg"}>{props.img}</span>
            </td>
            <td>{props.modello}</td>
            <td>{props.color}</td>
            <td>S</td>
            <td>{props.quantity}</td>
        </tr> 
        <tr>

            <td>
                <span className= "toolTip" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>{props.name}</span>
                <span className={show ? "toolTipImgActive" :"toolTipImg"}>{props.img}</span>
            </td>
            <td>{props.modello}</td>
            <td>{props.color}</td>
            <td>M</td>
            <td>{props.quantity}</td>
        </tr> 
        <tr>
            <td>
                <span className= "toolTip" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>{props.name}</span>
                <span className={show ? "toolTipImgActive" :"toolTipImg"}>{props.img}</span>
            </td>
            <td>{props.modello}</td>
            <td>{props.color}</td>
            <td>L</td>
            <td>{props.quantity}</td>
        </tr>     
        <tr>

            <td>
                <span className= "toolTip" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>{props.name}</span>
                <span className={show ? "toolTipImgActive" :"toolTipImg"}>{props.img}</span>
            </td>
            <td>{props.modello}</td>
            <td>{props.color}</td>
            <td>XL</td>
            <td>{props.quantity}</td>

        </tr>
    </>
    );
};

export default AdminWarehouseRows