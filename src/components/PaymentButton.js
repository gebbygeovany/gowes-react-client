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
      token={"65f7eff7-955d-475d-9c7b-39a20d74e2d5"}
    >
      <Button fluid color="teal">
        Pay
      </Button>
    </ReactMidtrans>
  );
}
export default PaymentButton;
