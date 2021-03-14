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
      token={"782af07b-3040-4cc5-a535-e105acf08884"}
    >
      <Button fluid color="teal">
        Pay
      </Button>
    </ReactMidtrans>
  );
}
export default PaymentButton;
