import React, { useState, useContext } from "react";
import { Button, Grid, Loader, Label, Message } from "semantic-ui-react";
import CardMySales from "./CardMySales";
import { useQuery, client } from "@apollo/react-hooks";

import { FETCH_SELLER_ORDER_QUERY, FETCH_USER_QUERY } from "../util/graphql";
import { AuthContext } from "../context/auth";
import { objectSize } from "../util/extensions";



function MySales() {
  const [activeItem, setActiveItem] = useState("New Orders");
  const [getOrder, setGetOrder] = useState(true);
  const context = useContext(AuthContext);

  const { loading: loadingUser, data: userData } = useQuery(FETCH_USER_QUERY, {
    variables: {
      userId: context.user.id
    }
  })
  const { getUser: currentUser } = userData ? userData : []

  let username = ""

  if (!loadingUser) {
    username = currentUser.seller.username
  }


  const { loading, data } = useQuery(FETCH_SELLER_ORDER_QUERY, {
    variables: {
      username: username
    },
  });
  const { getSellerOrders: orders } = data ? data : [];

  console.log(orders)


  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };


  var orderList = []

  if (!loading && orders && activeItem === "New Orders" && orders.find((order) => order.state.stateType === "CONFIRMATION")) {
    orderList.push(orders.filter((order) => order.state.stateType === "CONFIRMATION"))
  }
  else if (!loading &&orders && activeItem === "Ready to ship" && orders.find((order) => order.state.stateType === "PROCESSED")) {
    orderList.push(orders.filter((orders) => orders.state.stateType === "PROCESSED"))
  }
  else if (!loading &&orders && activeItem === "On delivery" && orders.find((order) => order.state.stateType === "DELIVERY")) {
    orderList.push(orders.filter((orders) => orders.state.stateType === "DELIVERY"))
  }
  else if (!loading &&orders && activeItem === "Order Arrived" && orders.find((order) => order.state.stateType === "ARRIVED")) {
    orderList.push(orders.filter((orders) => orders.state.stateType === "ARRIVED"))
  }
  else if (!loading &&orders && activeItem === "Completed" && orders.find((order) => order.state.stateType === "COMPLETED")) {
    orderList.push(orders.filter((orders) => orders.state.stateType === "COMPLETED"))
  }
  else if (!loading &&orders && activeItem === "Canceled" && orders.find((order) => order.state.stateType === "FAILED")) {
    orderList.push(orders.filter((orders) => orders.state.stateType === "FAILED"))
  }

  var sizeConfirmation = 0
  var sizeProcessed = 0
  var sizeDelivery = 0
  var sizeArrived = 0
  var sizeCompleted = 0
  var sizeFailed = 0

  if (orders) {
    sizeConfirmation = objectSize(orders.filter((order) => order.state.stateType === "CONFIRMATION"))
    sizeProcessed = objectSize(orders.filter((order) => order.state.stateType === "PROCESSED"))
    sizeDelivery = objectSize(orders.filter((order) => order.state.stateType === "DELIVERY"))
    sizeArrived = objectSize(orders.filter((order) => order.state.stateType === "ARRIVED"))
    sizeCompleted = objectSize(orders.filter((order) => order.state.stateType === "COMPLETED"))
    sizeFailed = objectSize(orders.filter((order) => order.state.stateType === "FAILED"))
    console.log(orderList.length)
  }



  return (
    <>
      <Grid stackable>
        <Grid.Row>
          <Grid columns={5} stackable centered>

            <Grid.Column>
              <Button
                name="New Orders"
                onClick={handleItemClick}
                color={activeItem === "New Orders" ? "teal" : ""}
                size="tiny"
                fluid
                style={{ boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)" }}
              >
                <span>New Orders</span>
                {sizeConfirmation > 0 ? (
                  <Label color='red' circular floating style={{ left: 175, top: 0, bottom: 40 }}>
                    {sizeConfirmation}
                  </Label>
                ) : (<></>)}
              </Button>

            </Grid.Column>
            <Grid.Column>
              <Button
                name="Ready to ship"
                onClick={handleItemClick}
                color={activeItem === "Ready to ship" ? "teal" : ""}
                size="tiny"
                fluid
                style={{ boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)" }}
              >
                Ready to ship
                {sizeProcessed > 0 ? (
                  <Label color='red' circular floating style={{ left: 175, top: 0, bottom: 40 }}>
                    {sizeProcessed}
                  </Label>
                ) : (<></>)}
              </Button>
            </Grid.Column>
            <Grid.Column>
              <Button
                name="On delivery"
                onClick={handleItemClick}
                color={activeItem === "On delivery" ? "teal" : ""}
                size="tiny"
                fluid
                style={{ boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)" }}
              >
                On delivery
                {sizeDelivery > 0 ? (
                  <Label color='red' circular floating style={{ left: 175, top: 0, bottom: 40 }}>
                    {sizeDelivery}
                  </Label>
                ) : (<></>)}
              </Button>
            </Grid.Column>
            <Grid.Column>
              <Button
                name="Order Arrived"
                onClick={handleItemClick}
                color={activeItem === "Order Arrived" ? "teal" : ""}
                size="tiny"
                fluid
                style={{ boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)" }}
              >
                Order Arrived
                {sizeArrived > 0 ? (
                  <Label color='red' circular floating style={{ left: 175, top: 0, bottom: 40 }}>
                    {sizeArrived}
                  </Label>
                ) : (<></>)}
              </Button>
            </Grid.Column>
            <Grid.Column>
              <Button
                name="Canceled"
                onClick={handleItemClick}
                color={activeItem === "Canceled" ? "red" : ""}
                size="tiny"
                fluid
                style={{ boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)" }}
              >
                Failed
                {sizeFailed > 0 ? (
                  <Label color='red' circular floating style={{ left: 175, top: 0, bottom: 40 }}>
                    {sizeFailed}
                  </Label>
                ) : (<></>)}
              </Button>
            </Grid.Column>
          </Grid>
        </Grid.Row>
        <Grid.Row>
          {!loadingUser ? (
            orderList.length > 0 ? (
              <Grid.Column size={16}>
                {orderList[0] &&
                  orderList[0].map((orders) => (
                    <CardMySales order={orders}></CardMySales>
                  ))}
              </Grid.Column>
            ) : (
              <Grid.Column size={16}>
                <Message
                  error
                  icon="inbox"
                  header="You dont have any order in this filter"
                  content="Choose another filter to check your order"
                  style={{ marginBottom: 109 }}
                />
              </Grid.Column>
            )
          ) : (
            <Grid.Column size={16}>
              <Loader active inline='centered' />
            </Grid.Column>
          )}
        </Grid.Row>
      </Grid>
    </>
  );
}

export default MySales;
