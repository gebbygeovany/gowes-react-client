import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Icon, Confirm } from "semantic-ui-react";

import { FETCH_USER_CART_QUERY } from "../util/graphql";
import { AuthContext } from "../context/auth";
import MyPopup from "./MyPopup";

function DeleteFromCartButton({ item }) {
  const context = useContext(AuthContext);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [deleteItemCart] = useMutation(DELETE_CART_ITEM_MUTATION, {
    update(proxy, result) {
      // TODO: remove post cache
      const data = proxy.readQuery({
        query: FETCH_USER_CART_QUERY,
      });
      proxy.writeQuery({
        query: FETCH_USER_CART_QUERY,
        data: {
          getUserCartItems: data.getUserCartItems.filter(
            (cart) => cart.id !== item.id
          ),
        },
      });
    },
    variables: { cartId: item.id },
  });

  function cartDelete() {
    deleteItemCart();
    window.location.reload(false);
  }

  return (
    <>
      <MyPopup content="Delete from cart">
        <Icon
          onClick={() => setConfirmOpen(true)}
          size="large"
          color="black"
          name="trash"
          style={{ marginRight: 40 }}
        ></Icon>
      </MyPopup>

      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={cartDelete}
      />
    </>
  );
}

const DELETE_CART_ITEM_MUTATION = gql`
  mutation deleteCartItem($cartId: ID!) {
    deleteCartItem(cartId: $cartId)
  }
`;

export default DeleteFromCartButton;
