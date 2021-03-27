import React, { useState, useEffect } from "react";
import { Card, Header, Dropdown, Label, List } from "semantic-ui-react";
import ItemCheckoutCard from "./ItemCheckoutCard";
import { FETCH_COST_COURIER_QUERY, ADD_ORDER } from "../util/graphql";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { objectSize } from "../util/extensions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { checkoutItems, setAddOrder } from "../actions/orderAction";

function CheckoutCard(props) {
  const [courier, setCourier] = useState({
    code: "",
    service: "",
    amount: 0,
  });
  let weightTotal = 0;
  let itemIds = props.cartItem.map((item) => {
    weightTotal += item.item.weight * item.amountItem;
    return item.item.id
  });

  let costVariables = {
    origin: props.cartItem[0].item.user.address.cityId,
    destination: props.user.address.cityId,
    weight: weightTotal,
    courier: "tiki",
  };

  const courierChange = (_, { value }) => {
    const courierSplit = value.split(" ");
    setCourier({
      code: courierSplit[0],
      service: courierSplit[1],
      amount: parseInt(courierSplit[2]),
    });
  };

  const [addOrder] = useMutation(ADD_ORDER, {
    variables: {
      itemIds: itemIds,
      state: "CONFIRMATION",
      shipping: courier.code,
    },
  });


  useEffect(() => {
    console.log(`useeffect itemOrderIds called`, itemIds);
    if (props.isAddOrder) {
      addOrder();
      props.setAddOrder(false)
    }
  }, [props.isAddOrder]);

  useEffect(() => {
    let carts = props.carts;
    let cartObj;
    let cartItemObj;
    let indexCartObj;
    let indexCartItemObj;
    carts.forEach((cart, indexCart) => {
      if (
        cart.user.seller.username ===
        props.cartItem[0].item.user.seller.username
      ) {
        indexCartObj = indexCart;
        cartObj = cart;
        cart.cartItems.forEach((cartItem, indexCartItem) => {
          indexCartItemObj = indexCartItem;
          cartItemObj = cartItem;
          cartItemObj = { ...cartItemObj, courier: courier };
          cartObj.cartItems[indexCartItemObj] = cartItemObj;
        });
        return;
      }
    });
    carts[indexCartObj] = cartObj;
    // console.log(carts)
    props.checkoutItems(carts, !props.isChange);
    // addToCart()
  }, [courier]);

  const { loading, data } = useQuery(FETCH_COST_COURIER_QUERY, {
    variables: costVariables,
  });

  costVariables.courier = "jne";
  const { loading: jneLoading, data: jneData } = useQuery(
    FETCH_COST_COURIER_QUERY,
    {
      variables: costVariables,
    }
  );

  costVariables.courier = "pos";
  const { loading: posLoading, data: posData } = useQuery(
    FETCH_COST_COURIER_QUERY,
    {
      variables: costVariables,
    }
  );
  let { getCosts: tikiCosts } = data ? data : [];
  let { getCosts: jneCosts } = jneData ? jneData : [];
  let { getCosts: posCosts } = posData ? posData : [];

  let checkoutCartMarkup = <></>;
  if (!loading && !jneLoading && !posLoading) {
    const tikiSize = objectSize(tikiCosts);
    const jneSize = objectSize(jneCosts);
    const posSize = objectSize(posCosts);
    let options = [];
    if (tikiSize > 0 && tikiCosts[0].costs) {
      tikiCosts[0].costs.forEach((cost) => {
        options = [
          ...options,
          {
            key: cost.cost[0].etd,
            text: `${tikiCosts[0].code} (${cost.service}) Rp${cost.cost[0].value}`,
            value: `${tikiCosts[0].code} ${cost.service} ${cost.cost[0].value}`,
            content: (
              <>
                <List>
                  <List.Item>
                    <List.Content floated="right">
                      Rp{cost.cost[0].value}
                    </List.Content>
                    <List.Content style={{ marginBottom: 5 }}>
                      <Header as="h5">
                        {tikiCosts[0].code} ({cost.service})
                      </Header>
                    </List.Content>
                  </List.Item>
                </List>
              </>
            ),
          },
        ];
      });
    }
    if (jneSize > 0 && jneCosts[0].costs) {
      jneCosts[0].costs.forEach((cost) => {
        options = [
          ...options,
          {
            key: cost.cost[0].etd,
            text: `${jneCosts[0].code} (${cost.service}) Rp${cost.cost[0].value}`,
            value: `${jneCosts[0].code} ${cost.service} ${cost.cost[0].value}`,
            content: (
              <>
                <List>
                  <List.Item>
                    <List.Content floated="right">
                      Rp{cost.cost[0].value}
                    </List.Content>
                    <List.Content style={{ marginBottom: 5 }}>
                      <Header as="h5">
                        {jneCosts[0].code} ({cost.service})
                      </Header>
                    </List.Content>
                  </List.Item>
                </List>
              </>
            ),
          },
        ];
      });
    }
    if (posSize > 0 && posCosts[0].costs) {
      posCosts[0].costs.forEach((cost) => {
        options = [
          ...options,
          {
            key: cost.cost[0].etd,
            text: `${posCosts[0].code} (${cost.service}) Rp${cost.cost[0].value}`,
            value: `${posCosts[0].code} ${cost.service} ${cost.cost[0].value}`,
            content: (
              <>
                <List>
                  <List.Item>
                    <List.Content floated="right">
                      Rp{cost.cost[0].value}
                    </List.Content>
                    <List.Content style={{ marginBottom: 5 }}>
                      <Header as="h5">
                        {posCosts[0].code} ({cost.service})
                      </Header>
                    </List.Content>
                  </List.Item>
                </List>
              </>
            ),
          },
        ];
      });
    }
    checkoutCartMarkup = (
      <Card fluid style={{ boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)" }}>
        <Card.Content>
          <h4>{props.cartItem[0].item.user.seller.username}</h4>
        </Card.Content>
        {props.cartItem &&
          props.cartItem.map((item) => (
            <ItemCheckoutCard item={item}></ItemCheckoutCard>
          ))}
        <Card.Content>
          <Label
            as="a"
            color="primary"
            ribbon="left"
            style={{ marginBottom: 10 }}
          >
            Shipping
          </Label>
          <Dropdown
            onChange={courierChange}
            selection
            fluid
            options={options}
            placeholder="Shipment"
          />
        </Card.Content>
      </Card>
    );
  }

  return checkoutCartMarkup;
}
CheckoutCard.propTypes = {
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
  CheckoutCard
);
