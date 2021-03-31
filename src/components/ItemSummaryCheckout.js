import React, { useState, useEffect } from "react";
import {
  Card,
  Sticky,
  Divider,
  Button,
  List,
  Message,
} from "semantic-ui-react";
import { useQuery } from "@apollo/react-hooks";
import { CREATE_PAYMENT_QUERY } from "../util/graphql";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { checkoutItems, setAddOrder } from "../actions/orderAction";
import { currencyIdrConverter } from "../util/extensions";
import ReactMidtrans from "../util/react-midtrans";

function ItemSummaryCheckout(props) {
  const [subTotal, setSubTotal] = useState(0);
  const [amount, setAmount] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [messageVisibility, setMessageVisibility] = useState(false);

  const { loading } = useQuery(CREATE_PAYMENT_QUERY);
  // const { createPayment: payment } = data ? data : [];
  let total = 0;
  let amountCounter = 0;
  let shippingCostCounter = 0;
  function actionAddOrder() {
    props.setAddOrder(true);
    // let courierOrdersHasSet = false;
    // props.carts.every((cart) => {
    //   courierOrdersHasSet =
    //     cart.cartItems[0].courier && cart.cartItems[0].courier.code !== "";
    //   return courierOrdersHasSet;
    // });
    // if (courierOrdersHasSet) {
    //   setMessageVisibility(false);
    //   onModalOpen();
    // } else {
    //   setMessageVisibility(true);
    // }
  }
  const [isCorierExists, setCorierExists] = useState(false);
  let isExistsCourierList = [];
  useEffect(() => {
    props.carts.forEach((cart) => {
      if (cart.cartItems[0].courier) {
        shippingCostCounter += cart.cartItems[0].courier.amount;
        // compare between previous value and next value
        isExistsCourierList = [
          ...isExistsCourierList,
          cart.cartItems[0].courier.code !== "",
        ];
      } else {
        isExistsCourierList = [...isExistsCourierList, false];
      }
      cart.cartItems.forEach((cartItem) => {
        amountCounter += cartItem.amountItem;
        const price = parseInt(cartItem.item.price);
        total += price * cartItem.amountItem;
      });
    });
    let courierExists = false;
    isExistsCourierList.every((value) => {
      courierExists = value;
      return courierExists;
    });
    setShippingCost(shippingCostCounter);
    setAmount(amountCounter);
    setSubTotal(total);
    setCorierExists(courierExists);
  }, [props.carts, props.isChange]);
  let buttonMarkUp = (
    <ReactMidtrans
      clientKey={"SB-Mid-client-89j-MQayPU_GqgkR"}
      token={"65f7eff7-955d-475d-9c7b-39a20d74e2d5"}
    >
      <Button disabled={true} fluid color="teal" onClick={actionAddOrder}>
        Pay
      </Button>
    </ReactMidtrans>
  );
  const getButtonPayment = () => {
    let markup;
    if (isCorierExists) {
      markup = (
        <ReactMidtrans
          clientKey={"SB-Mid-client-89j-MQayPU_GqgkR"}
          token={"021360e5-9500-47c2-b7f6-5722814c9e19"}
        >
          <Button disabled={false} fluid color="teal" onClick={actionAddOrder}>
            Pay
          </Button>
        </ReactMidtrans>
      );
    } else {
      markup = (
        <Button disabled={true} fluid color="teal" onClick={actionAddOrder}>
          Pay
        </Button>
      );
    }
    return markup;
  };
  return (
    <>
      {loading ? (
        <h1>Loading checkout..</h1>
      ) : (
        <Sticky context={props.contextRef} offset={130}>
          <Card fluid style={{ boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)" }}>
            <Card.Content header="Shopping Summary" />
            <Card.Content>
              <List divided verticalAlign="middle">
                <List.Item>
                  <List.Content floated="right">
                    Rp {currencyIdrConverter(subTotal, 0, ".", ",")}
                  </List.Content>
                  <List.Content style={{ marginBottom: 5 }}>
                    Item (x{amount})
                  </List.Content>
                  <List.Content floated="right">
                    Rp {currencyIdrConverter(shippingCost, 0, ".", ",")}
                  </List.Content>
                  <List.Content style={{ marginBottom: 5 }}>
                    Shipping Cost
                  </List.Content>
                </List.Item>
              </List>
              <Divider />
              <List divided verticalAlign="middle">
                <List.Item>
                  <List.Content floated="right">
                    Rp{" "}
                    {currencyIdrConverter(subTotal + shippingCost, 0, ".", ",")}
                  </List.Content>
                  <List.Content style={{ marginBottom: 5 }}>
                    <h4>Sub Total</h4>
                  </List.Content>
                </List.Item>
              </List>
            </Card.Content>
            <Card.Content extra>
              {getButtonPayment()}
              {/* <PaymentButton /> */}
            </Card.Content>
          </Card>
          {messageVisibility ? (
            <Message negative onDismiss={() => setMessageVisibility(false)}>
              <Message.Header>Shipment service not chosen</Message.Header>
              <p>Select shipment service to complete your order</p>
            </Message>
          ) : (
            <></>
          )}
        </Sticky>
      )}
    </>
  );
}

ItemSummaryCheckout.propTypes = {
  checkoutItems: PropTypes.func.isRequired,
  setAddOrder: PropTypes.func.isRequired,
  carts: PropTypes.array,
};
const mapStateToProps = (state) => ({
  carts: state.orders.checkoutOrders,
  isChange: state.orders.isChange,
  isAddOrder: state.orders.isAddOrder,
});

export default connect(mapStateToProps, { checkoutItems, setAddOrder })(
  ItemSummaryCheckout
);
