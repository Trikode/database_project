import React from "react";
import "../../pages/Admin/admin.css";

const AdminWarehouse = ()=>{
   return(
    <>
      {/* <span className={show ? "toolTipImgActive" :"toolTipImg"}> <img src={miniImg} alt="no" /> </span> */}
        <div className="warehouse">
          <table>
          <thead className="wTableHead">
          <tr>
            <th>Nome </th>
            <th> 
              <select name="Modello" id="Modello">
                <option value="">Modello..</option>
                <option value="men">Uomo</option>
                <option value="woman">Donna</option>
                <option value="kids">Bambino</option>
              </select>
            </th>
            <th>
              <select name="Colore" id="Colore" >
                <option value="">Colore..</option>
                <option value="white">Bianco</option>
                <option value="black">Nero</option>
                <option value="gray">Grigio</option>
                <option value="blue">Blu</option>
                <option value="red">Rosso</option>
              </select>
            </th>
            <th>
              <select name="Taglia" id="Taglia" >
                <option value="">Taglia..</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </th>
            <th>Quantità</th>
          </tr>
          </thead>
          <tbody>
          </tbody>
          </table>
        </div>
    </>
    );
};

export default AdminWarehouse