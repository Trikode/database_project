import React from "react";

const CartItem = (props) => {
  return (
    <>
      <div class="CartLine"></div>
      <table class="CartOrder-table">
        <tbody>
          <tr>
            <td>
              <img
                src={props.img}
                alt=""
                class="CartFull-width"
              ></img>
            </td>
            <td>
              <br /> <span class="CartThin">Fjällräven</span>
              <br />
              Vintage Backpack
              <br />{" "}
              <span class="CartThin small"> Color: {props.clor}, Size: {props.size}</span>
            </td>
          </tr>
          <tr>
            <td>
              <div class="CartPrice">${props.price}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default CartItem;
