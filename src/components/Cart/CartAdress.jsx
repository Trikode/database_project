import React from "react";

const CartAdress = (props) => {
  return (
    <>
      <div className="CartCredit-info-content">
        <input type="radio" id="opzione1" name="opzione" value="opzione1" />
        <label for="opzione1">Indirizzo fai che è incrementale</label>
        <p>Nome: {props.nome}</p>
        <p>Cognome: {props.cognome}</p>
        <p>Indirizzo: {props.indirizzo}</p>
        <p>Città: {props.città}</p>
        <p>CAP: {props.cap}</p>
      </div>
    </>
  );
};

export default CartAdress;
