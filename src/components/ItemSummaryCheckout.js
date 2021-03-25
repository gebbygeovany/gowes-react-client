import React, { useState, useEffect } from "react";
import { Card, Sticky, Divider, Button, List } from "semantic-ui-react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { CREATE_PAYMENT_QUERY, ADD_ORDER } from "../util/graphql";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { checkoutItems } from "../actions/orderAction";
import { currencyIdrConverter } from "../util/extensions";

function ItemSummaryCheckout(props) {
  const [errors, setErrors] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [amount, setAmount] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);

  const { loading, data } = useQuery(CREATE_PAYMENT_QUERY);
  const { createPayment: payment } = data ? data : [];

  let total = 0;
  let amountCounter = 0;
  let itemIds = [];

  props.items.map((item) => {
    itemIds = [...itemIds, item.item.id];
  });

  const [addOrder] = useMutation(ADD_ORDER, {
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: { itemIds: itemIds, state: "CONFIRMATION", shipping: "tiki" },
  });

  useEffect(() => {
    props.carts.map((cart) => {
      setShippingCost(cart.cartItems[0].courier.amount);
      cart.cartItems.map((cartItem) => {
        amountCounter += cartItem.amountItem;
        const price = parseInt(cartItem.item.price);
        total += price * cartItem.amountItem;
        // const amount = item
        console.log("amount", cartItem.amountItem);
      });
    });
    setAmount(amountCounter);
    setSubTotal(total);
  }, [props.carts, props.isChange]);

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
              {/* <PaymentButton /> */}
              <Button fluid color="teal" onClick={addOrder}>
                Pay
              </Button>
            </Card.Content>
          </Card>
        </Sticky>
      )}
    </>
  );
}

ItemSummaryCheckout.propTypes = {
  checkoutItems: PropTypes.func.isRequired,
  carts: PropTypes.array,
};
const mapStateToProps = (state) => ({
  carts: state.orders.checkoutOrders,
  isChange: state.orders.isChange,
});

export default connect(mapStateToProps, { checkoutItems })(ItemSummaryCheckout);
