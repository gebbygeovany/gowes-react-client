import React, { useState, useEffect } from "react";
import { Card, Header, Dropdown, Label, List } from "semantic-ui-react";
import ItemCheckoutCard from "./ItemCheckoutCard";
import {
  FETCH_COST_COURIER_QUERY,
  ADD_ORDER,
  FETCH_USER_CART_QUERY,
} from "../util/graphql";
import { useQuery, useMutation, useLazyQuery } from "@apollo/react-hooks";
import { objectSize } from "../util/extensions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { checkoutItems, setAddOrder, setOrderIdsWillBePayed } from "../actions/orderAction";

function CheckoutCard(props) {
  const [updateUserCartCache, {}] = useLazyQuery(FETCH_USER_CART_QUERY);
  const [courier, setCourier] = useState({
    code: "",
    service: "",
    amount: 0,
  });
  let weightTotal = 0;
  let cartItemIds = [];
  let items = props.cartItem.map((item) => {
    cartItemIds = [...cartItemIds, item.id];
    weightTotal += item.item.weight * item.amountItem;
    return {
      id: item.item.id,
      name: item.item.name,
      price: item.item.price,
      weight: item.item.weight,
      images: [
        {
          downloadUrl: item.item.images[0].downloadUrl,
        },
      ],
      amountItem: item.amountItem,
      note: item.note,
    };
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
      items: items,
      state: "CONFIRMATION",
      shipping: {
        awbNumber: "",
        courierName: courier.code,
        buyerAddress: `${props.user.address.detail}, ${props.user.address.district}, ${props.user.address.cityName}, ${props.user.address.postalCode}`,
        shippingCost: courier.amount,
      },
      sellerUsername: props.cartItem[0].item.user.seller.username,
      cartItemIds: cartItemIds,
    },
    update(proxy, result) {
      updateUserCartCache();
      const updatedOrderIds = [...props.orderIds, result.data.addOrder.id]
      console.log(updatedOrderIds)
      props.setOrderIdsWillBePayed(updatedOrderIds)
    },
  });

  useEffect(() => {
    if (props.isAddOrder) {
      addOrder();
      props.setAddOrder(false);
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
   
    checkoutCartMarkup = (
      <Card fluid style={{ boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)" }}>
        <Card.Content>
          <h4>{props.cartItem[0].item.user.seller.username}</h4>
        </Card.Content>
        {props.cartItem &&
          props.cartItem.map((item, index) => (
            <ItemCheckoutCard key={index} item={item}></ItemCheckoutCard>
          ))}
        <Card.Content>
          <Label as="a" ribbon={true} style={{ marginBottom: 10 }}>
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
  orderIds: state.orders.orderIds,
});

export default connect(mapStateToProps, {
  checkoutItems,
  setAddOrder,
  setOrderIdsWillBePayed,
})(CheckoutCard);
