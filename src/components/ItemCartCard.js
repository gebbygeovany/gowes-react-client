import React, { useState, useEffect } from "react";
import {
  Card,
  Grid,
  Form,
  Image,
  Button,
  Label,
  List,
  Input,
  Icon,
} from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import {
  EDIT_CART_MUTATION,
  FETCH_USER_CART_QUERY,
  DELETE_CART_ITEM_MUTATION,
} from "../util/graphql";
import DeleteFromCartButton from "./DeleteFromCartButton";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { checkoutItems } from "../actions/orderAction";
import MyPopup from "./MyPopup";

function ItemCartCard(props) {
  const [amountItem, setAmountItem] = useState(props.item.amountItem);
  const [errors, setErrors] = useState({});
  const [note, setNote] = useState(props.item.note);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    let carts = props.carts;
    let cartObj;
    let cartItemObj;
    let indexCartObj;
    let indexCartItemObj;
    carts.forEach((cart, indexCart) => {
      if (cart.user.seller.username === props.item.item.user.seller.username) {
        indexCartObj = indexCart;
        cart.cartItems.forEach((cartItem, indexCartItem) => {
          if (cartItem.item.id === props.item.item.id) {
            indexCartItemObj = indexCartItem;
            cartItemObj = cartItem;
            cartItemObj = { ...cartItemObj, amountItem: parseInt(amountItem) };
            cartItemObj = { ...cartItemObj, note: note };
            console.log(cartItemObj);
            return;
          }
        });
        cartObj = cart;
        cartObj.cartItems[indexCartItemObj] = cartItemObj;
        return;
      }
    });
    carts[indexCartObj] = cartObj;
    props.checkoutItems(carts, !props.isChange);
    // addToCart()
  }, [amountItem]);

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
            (cart) => cart.id !== props.item.id
          ),
        },
      });
    },
    variables: { cartId: props.item.id },
  });

  const [addToCart] = useMutation(EDIT_CART_MUTATION, {
    variables: {
      itemId: props.item.item.id,
      amountItem: amountItem,
      note: note,
      isChecked: props.item.isChecked,
    },
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
      console.log(errors);
    },
  });

  function editCart() {
    addToCart();
    setOpen(false);
  }

  return (
    <>
      <Card.Content>
        <Grid doubling>
          <Grid.Column width={1} verticalAlign="middle"></Grid.Column>

          <Grid.Column width={2} verticalAlign="middle" style={{ padding: 5 }}>
            <Image
              centered
              rounded
              src={
                props.item.item.images.length > 0
                  ? props.item.item.images[0].downloadUrl
                  : "https://react.semantic-ui.com/images/avatar/large/molly.png"
              }
              size="small"
              as={Link}
              to={`/items/${props.item.item.id}`}
            />
          </Grid.Column>
          <Grid.Column width={13} style={{ marginTop: 5 }}>
            <Grid.Row>
              <h4>{props.item.item.name}</h4>
            </Grid.Row>
            <Grid.Row style={{ marginTop: 5 }}>
              <h4 style={{ color: "teal" }}>Rp{props.item.item.price}</h4>
            </Grid.Row>
            <Grid.Row style={{ marginTop: 5 }}>
              <Grid>
                <Grid.Column width={10}>
                  {isOpen ? (
                    <Form size="small" onSubmit={editCart}>
                      <Form.Group>
                        <Form.Input
                          placeholder="Add Notes"
                          name="notes"
                          value={note}
                          onChange={(event) => {
                            setNote(event.target.value);
                          }}
                        />
                        <Form.Button color="teal" size="small" content="Save" />
                      </Form.Group>
                    </Form>
                  ) : note !== "" ? (
                    <>
                      <Label color="teal" horizontal>
                        note
                      </Label>
                      {note}
                      <MyPopup content="Edit Note">
                        <Icon
                          name="pencil"
                          color="grey"
                          onClick={() => setOpen(true)}
                          style={{ marginLeft: 5 }}
                        ></Icon>
                      </MyPopup>
                    </>
                  ) : (
                    <Button
                      compact
                      color="blue"
                      style={{ paddingTop: 7, paddingBottom: 7, marginTop: 3 }}
                      onClick={() => setOpen(true)}
                      icon="plus"
                      content="add notes"
                    ></Button>
                  )}
                </Grid.Column>
                <Grid.Column width={6}>
                  <DeleteFromCartButton
                    item={props.item}
                  ></DeleteFromCartButton>
                  <List horizontal>
                    <List.Item>
                      <Button
                        onClick={() => {
                          setAmountItem(amountItem - 1);
                        }}
                        disabled={amountItem <= 1 || props.checked === false}
                        size="mini"
                        secondary
                        icon="minus"
                      />
                    </List.Item>
                    <List.Item>
                      <Input
                        transparent
                        placeholder="1"
                        value={amountItem}
                        style={{ width: 18 }}
                      />
                    </List.Item>
                    <List.Item>
                      <Button
                        onClick={() => {
                          setAmountItem(amountItem + 1);
                        }}
                        size="mini"
                        secondary
                        icon="plus"
                        disabled={
                          amountItem >= props.item.item.stock ||
                          props.checked === false
                        }
                      />
                    </List.Item>
                  </List>
                </Grid.Column>
              </Grid>
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </Card.Content>
    </>
  );
}

ItemCartCard.propTypes = {
  checkoutItems: PropTypes.func.isRequired,
  carts: PropTypes.array,
};

const mapStateToProps = (state) => ({
  carts: state.orders.checkoutOrders,
  isChange: state.orders.isChange,
});

export default connect(mapStateToProps, { checkoutItems })(ItemCartCard);
