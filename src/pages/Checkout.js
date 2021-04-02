import React, { useContext, useEffect } from "react";
import { Grid, Ref, Message, Card } from "semantic-ui-react";
import { useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../context/auth";
import CheckoutCard from "../components/CheckoutCard";
import ItemSummaryCheckout from "../components/ItemSummaryCheckout";
import { FETCH_USER_CART_CHECKOUT_QUERY } from "../util/graphql";
import { objectSize } from "../util/extensions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { checkoutItems } from "../actions/orderAction";

function Checkout(props) {
  const contextRef = React.createRef();
  const context = useContext(AuthContext);

  const { loading, data: cartCheckoutData, data: userData } = useQuery(
    FETCH_USER_CART_CHECKOUT_QUERY,
    {
      variables: {
        userId: context.user.id,
      },
    }
  );
  let { getUserCartItemsCheckout: cartItemsCheckout } = cartCheckoutData
    ? cartCheckoutData
    : [];
  let { getUser: user } = userData ? userData : [];

  var size = objectSize(cartItemsCheckout);
  useEffect(() => {
    if (size > 0) {
      let group = cartItemsCheckout.reduce((r, a) => {
        r[a.item.user.id] = [...(r[a.item.user.id] || []), a];
        return r;
      }, {});
      let carts = props.carts;
      Object.keys(group).forEach(function (key) {
        if (group[key][0].isChecked && objectSize(carts) <= 1) {
          const cart = {
            user: group[key][0].item.user, // data yang dibutuhkan : username, cityId
            cartItems: group[key],
          };
          carts = [cart, ...carts];
        }
      });
      props.checkoutItems(carts, !props.isChange);
    }
  }, [size]); // <-- empty dependency array

  let cartMarkup = (
    <>
      <br></br>
      <Grid.Column width={16}>
        <h1>Checkout</h1>
      </Grid.Column>
      <>
        <Message
          error
          icon="cart"
          header="You dont have items in cart"
          content="add items to cart"
          style={{ marginBottom: 202 }}
        />
      </>
    </>
  );
  if (!loading && cartItemsCheckout) {
    if (size > 0) {
      let group = cartItemsCheckout.reduce((r, a) => {
        r[a.item.user.id] = [...(r[a.item.user.id] || []), a];
        return r;
      }, {});
      cartMarkup = (
        <Ref innerRef={contextRef}>
          <Grid stackable>
            <Grid.Column width={16}>
              <h2>Checkout</h2>
            </Grid.Column>
            <Grid.Column width={12}>
              <h3>Shipping Address</h3>
              <Card fluid color="teal">
                <Card.Content>
                  <h4>{user.buyer.name}</h4>
                  <div>{user.phone}</div>
                  <p>
                    {`${user.address.detail}, ${user.address.district}, ${user.address.cityName}, ${user.address.postalCode}`}
                  </p>
                </Card.Content>
              </Card>
              <h3>Items</h3>
              {group &&
                Object.keys(group).map((key) => (
                  <CheckoutCard key={key} cartItem={group[key]} user={user} />
                ))}
            </Grid.Column>
            <Grid.Column width={4}>
              <ItemSummaryCheckout
                contextRef={contextRef}
                items={group}
              ></ItemSummaryCheckout>
            </Grid.Column>
          </Grid>
        </Ref>
      );
    }
  }
  return cartMarkup;
}

Checkout.propTypes = {
  checkoutItems: PropTypes.func.isRequired,
  carts: PropTypes.array,
};
const mapStateToProps = (state) => ({
  carts: state.orders.checkoutOrders,
  isChange: state.orders.isChange,
});

export default connect(mapStateToProps, { checkoutItems })(Checkout);
