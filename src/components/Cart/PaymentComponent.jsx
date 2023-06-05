import React from "react";
import { ReactComponent as Mastercard } from "../../assets/paymentLogos/mastercard.svg";
import { ReactComponent as Maestro } from "../../assets/paymentLogos/maestro.svg";
import { ReactComponent as Visa } from "../../assets/paymentLogos/visa.svg";
import { ReactComponent as Paypal } from "../../assets/paymentLogos/paypal.svg";
import { ReactComponent as Postepay } from "../../assets/paymentLogos/postepay.svg";
import { ReactComponent as Revolut } from "../../assets/paymentLogos/revolut.svg";

const PaymentLogos = () => {
  return (
    <section className="formattingDeliPay bubble">
      <h2>Payment methods available</h2>
      <div className="payment">
        <div className="logo">
          <Mastercard className="logos" />
        </div>
        <div className="logo">
          <Maestro className="logos" />
        </div>
        <div className="logo">
          <Visa className="logos" />
        </div>
        <div className="logo">
          <Paypal className="logos" />
        </div>
        <div className="logo">
          <Postepay className="logos pp" />
        </div>
        <div className="logo">
          <Revolut className="logos" />
        </div>
      </div>
    </section>
  );
};

export default PaymentLogos;
