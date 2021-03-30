import React, { useState, useEffect } from "react";
import { Button, Grid } from "semantic-ui-react";
import CardMyOrders from "./CardMyOrders";
import { useQuery } from "@apollo/react-hooks";

import { FETCH_USER_ORDER_QUERY } from "../util/graphql";

function MyOrders() {
  const [activeItem, setActiveItem] = useState("Waiting for confirmation");
  const [status, setStatus] = useState("onGoing");

  const { loading, data } = useQuery(FETCH_USER_ORDER_QUERY);
  const { getUserOrders: orders } = data ? data : [];


  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };
  const handleStatusChange = (e, { name }) => {
    setStatus(name);
  };
  var orderList = []

  if (orders && status === "onGoing" && activeItem === "Waiting for confirmation" && orders.find((order) => order.state.stateType === "CONFIRMATION")) {
    orderList.push(orders.find((orders) => orders.state.stateType === "CONFIRMATION"))
  }
  else if (orders && status === "onGoing" && activeItem === "Order processed" && orders.find((order) => order.state.stateType === "PROCESSED")) {
    orderList.push(orders.find((orders) => orders.state.stateType === "PROCESSED"))
  }
  else if (orders && status === "onGoing" && activeItem === "Order shipped" && orders.find((order) => order.state.stateType === "DELIVERY")) {
    orderList.push(orders.find((orders) => orders.state.stateType === "DELIVERY"))
  }
  else if (orders && status === "onGoing" && activeItem === "Order arrived" && orders.find((order) => order.state.stateType === "ARRIVED")) {
    orderList.push(orders.find((orders) => orders.state.stateType === "ARRIVED"))
  }
  else if (orders && status === "completed" && orders.find((order) => order.state.stateType === "COMPLETED")) {
    orderList.push(orders.find((orders) => orders.state.stateType === "COMPLETED"))
  }
  else if (orders && status === "failed" && orders.find((order) => order.state.stateType === "FAILED")) {
    orderList.push(orders.find((orders) => orders.state.stateType === "FAILED"))
  }
  return (
    <>
      <Grid stackable>
        <Grid.Row style={{ paddingBottom: 0 }}>
          <Grid columns={3} stackable centered>
            <Grid.Column>
              <Button
                name="onGoing"
                onClick={handleStatusChange}
                color={status === "onGoing" ? "black" : ""}
                size="tiny"
                fluid
                style={{ boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)" }}
              >
                On Going
              </Button>
            </Grid.Column>
            <Grid.Column>
              <Button
                name="completed"
                onClick={handleStatusChange}
                color={status === "completed" ? "black" : ""}
                size="tiny"
                fluid
                style={{ boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)" }}
              >
                Completed
              </Button>
            </Grid.Column>
            <Grid.Column>
              <Button
                name="failed"
                onClick={handleStatusChange}
                color={status === "failed" ? "red" : ""}
                size="tiny"
                fluid
                style={{ boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)" }}
              >
                Failed
              </Button>
            </Grid.Column>
          </Grid>
        </Grid.Row>
        {status === "onGoing" ? (
          <Grid.Row style={{ paddingTop: 0 }}>
            <Grid columns={5} stackable centered>
              <Grid.Column>
                <Button
                  name="Waiting for payment"
                  onClick={handleItemClick}
                  color={activeItem === "Waiting for payment" ? "teal" : ""}
                  size="tiny"
                  fluid
                  style={{ boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)" }}
                >
                  Waiting For Payment
                </Button>
              </Grid.Column>
              <Grid.Column>
                <Button
                  name="Waiting for confirmation"
                  onClick={handleItemClick}
                  color={
                    activeItem === "Waiting for confirmation" ? "teal" : ""
                  }
                  size="tiny"
                  fluid
                  style={{ boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)" }}
                >
                  Waiting For Confirmation
                </Button>
              </Grid.Column>
              <Grid.Column>
                <Button
                  name="Order processed"
                  onClick={handleItemClick}
                  color={activeItem === "Order processed" ? "teal" : ""}
                  size="tiny"
                  fluid
                  style={{ boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)" }}
                >
                  Order Processed
                </Button>
              </Grid.Column>
              <Grid.Column>
                <Button
                  name="Order shipped"
                  onClick={handleItemClick}
                  color={activeItem === "Order shipped" ? "teal" : ""}
                  size="tiny"
                  fluid
                  style={{ boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)" }}
                >
                  Order Shipped
                </Button>
              </Grid.Column>
              <Grid.Column>
                <Button
                  name="Order arrived"
                  onClick={handleItemClick}
                  color={activeItem === "Order arrived" ? "teal" : ""}
                  size="tiny"
                  fluid
                  style={{ boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)" }}
                >
                  Order Arrived
                </Button>
              </Grid.Column>
            </Grid>
          </Grid.Row>
        ) : (
          <></>
        )}

        <Grid.Row>
          <Grid.Column size={16}>
            {orderList &&
              orderList.map((orders) => (
                <CardMyOrders filter={activeItem} order={orders} />
              ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}

export default MyOrders;
