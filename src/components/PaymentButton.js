import React from "react";
import ReactDOM from "react-dom";
import ReactMidtrans from "../util/react-midtrans";
import { Button } from "semantic-ui-react";
// const midtransClient = require("midtrans-client");

function PaymentButton({ paymentToken }) {
  // Create Snap API instance

  return (
    <ReactMidtrans
      clientKey={"SB-Mid-client-89j-MQayPU_GqgkR"}
      token={"e4949f69-7b9e-487b-85bb-77a232529abd"}
    >
      <Button fluid color="teal">
        Pay
      </Button>
    </ReactMidtrans>
  );
}
export default PaymentButton;
