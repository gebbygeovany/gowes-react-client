import React, { useState } from "react";
import { Card, Checkbox } from "semantic-ui-react";
import ItemCartCard from "../components/ItemCartCard";
import { useMutation } from "@apollo/react-hooks";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { checkoutItems } from "../actions/orderAction";
import { EDIT_CHECKED_MUTATION, FETCH_USER_CART_QUERY } from "../util/graphql";

function CartCard(props) {
  const [checked, setChecked] = useState(props.cartItem[0].isChecked);
  const [error, setErrors] = useState({});

  let itemIds = [];
  props.cartItem.forEach((cartItem) => {
    itemIds = [...itemIds, cartItem.item.id];
  });

  const [editCartItem] = useMutation(EDIT_CHECKED_MUTATION, {
    variables: { itemIds: itemIds, isChecked: checked ? false : true },
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_USER_CART_QUERY,
      });

      proxy.writeQuery({
        query: FETCH_USER_CART_QUERY,
        data: {
          getUserCartItems: [result.data.addCartItem, ...data.getUserCartItems],
        },
      });
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
      console.log(error);
    },
  });

  const onChecked = (_, data) => {
    console.log("onChecked called");
    let carts = props.carts;
    if (carts.length > 0) {
      console.log(carts[0].cartItem);
      if (
        carts.find(
          (cart) => cart.cartItems[0].item.user.seller.username === data.label
        )
      ) {
        carts = carts.filter(
          (cart) => cart.user.seller.username !== data.label
        );
      } else {
        const cart = {
          user: props.cartItem[0].item.user, // data yang dibutuhkan : username, cityId
          cartItems: props.cartItem,
        };
        carts = [cart, ...carts];
      }
    } else {
      const cart = {
        user: props.cartItem[0].item.user, // data yang dibutuhkan : username, cityId
        cartItems: props.cartItem,
      };
      carts = [cart, ...carts];
    }
    props.checkoutItems(carts, checked);
    setChecked(checked ? false : true);
    editCartItem();
  };

  return (
    <Card fluid style={{ boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)" }}>
      <Card.Content>
        <Checkbox
          label={props.cartItem[0].item.user.seller.username}
          style={{ fontWeight: 1000 }}
          onChange={onChecked}
          checked={checked}
        />
      </Card.Content>
      {props.cartItem &&
        props.cartItem.map((item) => {
          return <ItemCartCard key={item.id} item={item} checked={checked} />;
        })}
    </Card>
  );
}

CartCard.propTypes = {
  checkoutItems: PropTypes.func.isRequired,
  carts: PropTypes.array,
};

const mapStateToProps = (state) => ({
  carts: state.orders.checkoutOrders,
});

export default connect(mapStateToProps, { checkoutItems })(CartCard);
