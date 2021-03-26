import React, { useState, useEffect } from "react";
import { Card, Sticky, Button, List } from "semantic-ui-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { checkoutItems } from "../actions/orderAction";
import { currencyIdrConverter } from "../util/extensions";

function ItemSummaryCard(props) {
  const [subTotal, setSubTotal] = useState(0);
  const [amount, setAmount] = useState(0);

  let total = 0;
  let amountCounter = 0;

  useEffect(() => {
    props.carts.forEach((cart) => {
      cart.cartItems.forEach((cartItem) => {
        amountCounter += cartItem.amountItem;
        const price = parseInt(cartItem.item.price);
        total += price * cartItem.amountItem;
      });
    });
    setAmount(amountCounter);
    setSubTotal(total);
  }, [props.carts, props.isChange]);

  return (
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
                <h4>Sub Total ({amount} items)</h4>
              </List.Content>
            </List.Item>
          </List>
        </Card.Content>
        <Card.Content extra>
          <Button
            disabled={amount === 0}
            fluid
            color="teal"
            as={Link}
            to="/checkout"
            // onClick={checkout}
          >
            Checkout
          </Button>
        </Card.Content>
      </Card>
    </Sticky>
  );
}

ItemSummaryCard.propTypes = {
  checkoutItems: PropTypes.func.isRequired,
  carts: PropTypes.array,
};
const mapStateToProps = (state) => ({
  carts: state.orders.checkoutOrders,
  isChange: state.orders.isChange,
});

export default connect(mapStateToProps, { checkoutItems })(ItemSummaryCard);
