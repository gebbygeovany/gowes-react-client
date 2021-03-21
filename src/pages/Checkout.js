import React, { useContext } from "react";
import { Grid, Ref, Message, Card } from "semantic-ui-react";
import { useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../context/auth";
import CheckoutCard from "../components/CheckoutCard";
import ItemSummaryCheckout from "../components/ItemSummaryCheckout";
import { FETCH_USER_CART_CHECKOUT_QUERY } from "../util/graphql";

function Checkout() {
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

  Object.size = function (obj) {
    var size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };

  var size = Object.size(cartItemsCheckout);

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
  if (!loading) {
    if (size > 0) {
      let group = cartItemsCheckout.reduce((r, a) => {
        r[a.item.user.id] = [...(r[a.item.user.id] || []), a];
        return r;
      }, {});
      console.log(group);

      Object.keys(group).map(function (key, index) {
        console.log(group[key]);
      });
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
                Object.keys(group).map((key, index) => (
                  <CheckoutCard cartItem={group[key]} user={user} />
                ))}
            </Grid.Column>
            <Grid.Column width={4}>
              <ItemSummaryCheckout
                contextRef={contextRef}
              ></ItemSummaryCheckout>
            </Grid.Column>
          </Grid>
        </Ref>
      );
    }
  }
  return cartMarkup;
}

export default Checkout;
