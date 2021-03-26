import React, { useState } from "react";
import { Button, Grid } from "semantic-ui-react";
import CardMyOrders from "./CardMyOrders";

function MyOrders() {
  const [activeItem, setActiveItem] = useState("Waiting for payment");
  const [status, setStatus] = useState("onGoing");
  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };
  const handleStatusChange = (e, { name }) => {
    setStatus(name);
  };
  var contentToShow;
  contentToShow = <CardMyOrders filter={activeItem} />;

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
            {contentToShow}
            {contentToShow}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}

export default MyOrders;
