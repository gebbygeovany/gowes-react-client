import React, { useState, useContext } from "react";
import { Button, Grid } from "semantic-ui-react";
import CardMySales from "./CardMySales";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";

import { FETCH_SELLER_ORDER_QUERY, FETCH_USER_QUERY } from "../util/graphql";
import { AuthContext } from "../context/auth";


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


  const { data } = useQuery(FETCH_SELLER_ORDER_QUERY, {
    variables: {
      username: username
    },
  });
  const { getSellerOrders: orders } = data ? data : [];


  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };


  var orderList = []

  if (orders && activeItem === "New Orders" && orders.find((order) => order.state.stateType === "CONFIRMATION")) {
    orderList.push(orders.find((orders) => orders.state.stateType === "CONFIRMATION"))
  }
  else if (orders && activeItem === "Ready to ship" && orders.find((order) => order.state.stateType === "PROCESSED")) {
    orderList.push(orders.find((orders) => orders.state.stateType === "PROCESSED"))
  }
  else if (orders && activeItem === "On delivery" && orders.find((order) => order.state.stateType === "DELIVERY")) {
    orderList.push(orders.find((orders) => orders.state.stateType === "DELIVERY"))
  }
  else if (orders && activeItem === "Order Arrived" && orders.find((order) => order.state.stateType === "ARRIVED")) {
    orderList.push(orders.find((orders) => orders.state.stateType === "ARRIVED"))
  }
  else if (orders && activeItem === "Completed" && orders.find((order) => order.state.stateType === "COMPLETED")) {
    orderList.push(orders.find((orders) => orders.state.stateType === "COMPLETED"))
  }
  else if (orders && activeItem === "Canceled" && orders.find((order) => order.state.stateType === "FAILED")) {
    orderList.push(orders.find((orders) => orders.state.stateType === "FAILED"))
  }

  console.log(orderList)



  var contentToShow;
  contentToShow = <CardMySales filter={activeItem}></CardMySales>;

  return (
    <>
      <Grid stackable>
        <Grid.Row>
          <Grid columns={6} stackable centered>
            
            <Grid.Column>
              <Button
                name="New Orders"
                onClick={handleItemClick}
                color={activeItem === "New Orders" ? "teal" : ""}
                size="tiny"
                fluid
                style={{ boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)" }}
              >
                New Orders
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
              </Button>
            </Grid.Column>
            <Grid.Column>
              <Button
                name="Completed"
                onClick={handleItemClick}
                color={activeItem === "Completed" ? "black" : ""}
                size="tiny"
                fluid
                style={{ boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)" }}
              >
                Completed
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
                Canceled
              </Button>
            </Grid.Column>
          </Grid>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column size={16}>
            {orderList &&
              orderList.map((orders) => (
                <CardMySales order={orders}></CardMySales>
              ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}

export default MySales;
