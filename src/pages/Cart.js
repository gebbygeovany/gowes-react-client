import React, { useEffect } from "react";
import { Grid, Ref, Message, Transition } from "semantic-ui-react";
import { useQuery } from "@apollo/react-hooks";
import CartCard from "../components/CartCard";
import ItemSummaryCard from "../components/ItemSummaryCard";
import { FETCH_USER_CART_QUERY } from "../util/graphql";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { checkoutItems } from "../actions/orderAction";

function Cart(props) {
  const contextRef = React.createRef();

  const { loading, data, refetch } = useQuery(FETCH_USER_CART_QUERY);
  let { getUserCartItems: cartItems } = data ? data : [];

  Object.size = function (obj) {
    var size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };

  var size = Object.size(cartItems);

  useEffect(() => {
    console.log(`useeffect run, loading: ${loading}`);
    if (size > 0) {
      let group = cartItems.reduce((r, a) => {
        r[a.item.user.id] = [...(r[a.item.user.id] || []), a];
        return r;
      }, {});
      let carts = props.carts;
      Object.keys(group).map(function (key) {
        console.log(Object.size(carts));
        // carts.find((cart) => cart.cartItems[0].item.user.seller.username == group[key][0].item.user.seller.username
        if (group[key][0].isChecked && Object.size(carts) <= 1) {
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
        <h1>My Cart</h1>
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
  if (!loading) {
    if (size > 0) {
      let group = cartItems.reduce((r, a) => {
        r[a.item.user.id] = [...(r[a.item.user.id] || []), a];
        return r;
      }, {});

      cartMarkup = (
        <Ref innerRef={contextRef}>
          <Grid stackable>
            <Grid.Column width={16}>
              <h1>Cart</h1>
            </Grid.Column>
            <Grid.Column width={12}>
              {group &&
                Object.keys(group).map((key, index) => (
                  <CartCard cartItem={group[key]}></CartCard>
                ))}
            </Grid.Column>
            <Grid.Column width={4}>
              <ItemSummaryCard contextRef={contextRef}></ItemSummaryCard>
            </Grid.Column>
          </Grid>
        </Ref>
      );
    }
  }
  return cartMarkup;
}

Cart.propTypes = {
  checkoutItems: PropTypes.func.isRequired,
  carts: PropTypes.array,
  isChange: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  carts: state.orders.checkoutOrders,
  isChange: state.orders.isChange,
});

export default connect(mapStateToProps, { checkoutItems })(Cart);
