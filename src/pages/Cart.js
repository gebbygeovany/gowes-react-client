import React from 'react';
import { Grid, Ref, Message, Transition } from 'semantic-ui-react';
import { useQuery } from '@apollo/react-hooks';

import CartCard from '../components/CartCard';
import ItemSummaryCard from '../components/ItemSummaryCard';
import { FETCH_USER_CART_QUERY } from '../util/graphql';


function Cart() {
  const contextRef = React.createRef();

  const { loading, data, refetch } = useQuery(FETCH_USER_CART_QUERY)
  let { getUserCartItems: cartItems } = data ? data : []


  Object.size = function (obj) {
    var size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };

  var size = Object.size(cartItems)

  console.log(cartItems)


  let cartMarkup = (
    <>
      <br></br>
      <Grid.Column width={16}><h1>My Cart</h1></Grid.Column>
      <>
        <Message
          error
          icon='cart'
          header='You dont have items in cart'
          content='add items to cart'
          style={{ marginBottom: 202 }}
        />
      </>
    </>
  )
  if (!loading) {
    if (size > 0) {
      let group = cartItems.reduce((r, a) => {
        r[a.item.user.id] = [...r[a.item.user.id] || [], a];
        return r;
      }, {});
      console.log(group)

      Object.keys(group).map(function (key, index) {
        console.log(group[key])
      })
      cartMarkup = (
        <Ref innerRef={contextRef}>
          <Grid stackable>
            <Grid.Column width={16}><h1>Cart</h1></Grid.Column>
            <Grid.Column width={12} >
              {group &&
                Object.keys(group).map((key, index) =>
                (
                  <CartCard cartItem={group[key]}></CartCard>
                )
                )
              }
            </Grid.Column>
            <Grid.Column width={4}>
              <ItemSummaryCard contextRef={contextRef}  ></ItemSummaryCard>
            </Grid.Column>
          </Grid>
        </Ref>
      )
    }


  }
  return cartMarkup
}

export default Cart;