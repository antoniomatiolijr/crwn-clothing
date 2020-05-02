import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_IJxSVxVUa5LuLohOtAJPq3Oj00HyhWgLDB";

  const onToken = (token) => {
    let url;

    if (process.env.NODE_ENV === "development") {
      url = "http://localhost:5000";
    } else {
      url = "https://matioli-crwn-clothing-api.herokuapp.com";
    }

    axios({
      url: `${url}/payment`,
      method: "post",
      data: {
        amount: priceForStripe,
        token,
      },
    })
      .then((response) => {
        alert("Payment successful");
      })
      .catch((error) => {
        debugger;
        console.log("Payment error: ", error);
        alert(
          "there is an issue with your payment. Please sure you use the provided credit cart."
        );
      });
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
