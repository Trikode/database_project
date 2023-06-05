import React, { useState } from "react";
import "../../pages/Admin/admin.css"

const AdminWarehouseRows  = (props)=>{
    const[show,setShow]=useState(false)
    const[show1,setShow1]=useState(false)
    const[show2,setShow2]=useState(false)
    const[show3,setShow3]=useState(false)
    const[show4,setShow4]=useState(false)
    // const {setShow}= useLiveItems();
    return(
        <>
        <tr>
            <td>
                <span className= "toolTip" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>{props.name}</span>
                <span className={show ? "toolTipImgActive" :"toolTipImg"}>{props.img}</span>
            </td>
            <td>{props.modello}</td>
            <td>black</td>
            <td>{props.size}</td>
            <td>{props.quantity}</td>
        </tr>
        <tr>
            <td>
                <span className= "toolTip" onMouseEnter={() => setShow1(true)} onMouseLeave={() => setShow1(false)}>{props.name}</span>
                <span className={show1 ? "toolTipImgActive" :"toolTipImg"}>{props.img}</span>
            </td>
            <td>{props.modello}</td>
            <td>white</td>
            <td>{props.size}</td>
            <td>{props.quantity}</td>
        </tr> 
        <tr>

            <td>
                <span className= "toolTip" onMouseEnter={() => setShow2(true)} onMouseLeave={() => setShow2(false)}>{props.name}</span>
                <span className={show2 ? "toolTipImgActive" :"toolTipImg"}>{props.img}</span>
            </td>
            <td>{props.modello}</td>
            <td>gray</td>
            <td>{props.size}</td>
            <td>{props.quantity}</td>
        </tr> 
        <tr>
            <td>
                <span className= "toolTip" onMouseEnter={() => setShow3(true)} onMouseLeave={() => setShow3(false)}>{props.name}</span>
                <span className={show3 ? "toolTipImgActive" :"toolTipImg"}>{props.img}</span>
            </td>
            <td>{props.modello}</td>
            <td>red</td>
            <td>{props.size}</td>
            <td>{props.quantity}</td>
        </tr>     
        <tr>

            <td>
                <span className= "toolTip" onMouseEnter={() => setShow4(true)} onMouseLeave={() => setShow4(false)}>{props.name}</span>
                <span className={show4 ? "toolTipImgActive" :"toolTipImg"}>{props.img}</span>
            </td>
            <td>{props.modello}</td>
            <td>blue</td>
            <td>{props.size}</td>
            <td>{props.quantity}</td>

        </tr>
    </>
    );
};

export default AdminWarehouseRows