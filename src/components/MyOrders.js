import React, { useState, useEffect } from "react";
import { Button, Grid, Label, Loader, Message } from "semantic-ui-react";
import CardMyOrders from "./CardMyOrders";
import { useQuery } from "@apollo/react-hooks";

import { FETCH_USER_ORDER_QUERY } from "../util/graphql";
import { objectSize } from "../util/extensions";


function MyOrders() {
  const [activeItem, setActiveItem] = useState("Waiting for confirmation");
  const [status, setStatus] = useState("onGoing");

  const { loading, data } = useQuery(FETCH_USER_ORDER_QUERY);
  const { getUserOrders: orders } = data ? data : [];

  console.log(orders)


  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };
  const handleStatusChange = (e, { name }) => {
    setStatus(name);
  };
  var orderList = []

  if (orders && status === "onGoing" && activeItem === "Waiting for confirmation" && orders.find((order) => order.state.stateType === "CONFIRMATION")) {
    orderList.push(orders.filter((orders) => orders.state.stateType === "CONFIRMATION"))
  }
  else if (orders && status === "onGoing" && activeItem === "Order processed" && orders.find((order) => order.state.stateType === "PROCESSED")) {
    orderList.push(orders.filter((orders) => orders.state.stateType === "PROCESSED"))
  }
  else if (orders && status === "onGoing" && activeItem === "Order shipped" && orders.find((order) => order.state.stateType === "DELIVERY")) {
    orderList.push(orders.filter((orders) => orders.state.stateType === "DELIVERY"))
  }
  else if (orders && status === "onGoing" && activeItem === "Order arrived" && orders.find((order) => order.state.stateType === "ARRIVED")) {
    orderList.push(orders.filter((orders) => orders.state.stateType === "ARRIVED"))
  }
  else if (orders && status === "completed" && orders.find((order) => order.state.stateType === "COMPLETED")) {
    orderList.push(orders.filter((orders) => orders.state.stateType === "COMPLETED"))
  }
  else if (orders && status === "failed" && orders.find((order) => order.state.stateType === "FAILED")) {
    orderList.push(orders.filter((orders) => orders.state.stateType === "FAILED"))
  }

  var sizeConfirmation = 0
  var sizeProcessed = 0
  var sizeDelivery = 0
  var sizeArrived = 0
  var sizeCompleted = 0
  var sizeFailed = 0
  var sizeOnGoing = 0

  if (orders) {
    sizeConfirmation = objectSize(orders.filter((order) => order.state.stateType === "CONFIRMATION"))
    sizeProcessed = objectSize(orders.filter((order) => order.state.stateType === "PROCESSED"))
    sizeDelivery = objectSize(orders.filter((order) => order.state.stateType === "DELIVERY"))
    sizeArrived = objectSize(orders.filter((order) => order.state.stateType === "ARRIVED"))
    sizeCompleted = objectSize(orders.filter((order) => order.state.stateType === "COMPLETED"))
    sizeFailed = objectSize(orders.filter((order) => order.state.stateType === "FAILED"))
    sizeOnGoing = sizeConfirmation + sizeProcessed + sizeDelivery + sizeArrived
    
  }
  console.log(typeof(orderList))

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
                {sizeOnGoing > 0 && status !== "onGoing" ? (
                  <Label color='red' circular floating style={{ left: 295, top: 0, bottom: 50 }}>
                    {sizeOnGoing}
                  </Label>
                ) : (<></>)}
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
                {sizeCompleted > 0 ? (
                  <Label color='red' circular floating style={{ left: 295, top: 0, bottom: 50 }}>
                    {sizeCompleted}
                  </Label>
                ) : (<></>)}
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
                {sizeFailed > 0 ? (
                  <Label color='red' circular floating style={{ left: 295, top: 0, bottom: 50 }}>
                    {sizeFailed}
                  </Label>
                ) : (<></>)}
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
                  {sizeConfirmation > 0 ? (
                    <Label color='red' circular floating style={{ left: 170, top: 0, bottom: 50 }}>
                      {sizeConfirmation}
                    </Label>
                  ) : (<></>)}
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
                  {sizeProcessed > 0 ? (
                    <Label color='red' circular floating style={{ left: 170, top: 0, bottom: 50 }}>
                      {sizeProcessed}
                    </Label>
                  ) : (<></>)}
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
                  {sizeDelivery > 0 ? (
                    <Label color='red' circular floating style={{ left: 170, top: 0, bottom: 50 }}>
                      {sizeDelivery}
                    </Label>
                  ) : (<></>)}
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
                  {sizeArrived > 0 ? (
                    <Label color='red' circular floating style={{ left: 170, top: 0, bottom: 50 }}>
                      {sizeArrived}
                    </Label>
                  ) : (<></>)}
                </Button>
              </Grid.Column>
            </Grid>
          </Grid.Row>
        ) : (
          <></>
        )}


        {!loading ? (
          orderList.length > 0 ? (
            <Grid.Row>
              <Grid.Column size={16}>
                {orderList[0] &&
                  orderList[0].map((orders) => (
                    <CardMyOrders order={orders} />
                  ))}
              </Grid.Column>
            </Grid.Row>
          ) : (
            <Grid.Row>
              <Grid.Column size={16}>
                <Message
                  error
                  icon="inbox"
                  header="You dont have any order in this filter"
                  content="Choose another filter to check your order"
                  style={{ marginBottom: 109 }}
                />
              </Grid.Column>
            </Grid.Row>

          )
        ) : (
          <Grid.Row>
            <Grid.Column size={16}>
              <Loader active inline='centered' />
            </Grid.Column>
          </Grid.Row>
        )}
      </Grid>
    </>
  );
}

export default MyOrders;
