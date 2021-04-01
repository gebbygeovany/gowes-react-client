import React from "react";
import { Card, Grid } from "semantic-ui-react";
import ItemMyOrders from "./ItemMyOrders";
import ModalMyOrders from "./ModalMyOrders";

function CardMyOrders(order) {
  console.log(order.items)
  return (
    <Card fluid style={{ boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)" }}>
      <Card.Content>
        <h5>{order.order.state.createdAt}</h5>
      </Card.Content>
      <Card.Content>
        <Grid stackable>
          <Grid.Column width={7}>
            <Grid.Row>
              <h4 style={{ color: "teal" }}>{order.order.seller.username}</h4>
            </Grid.Row>
            <Grid.Row>(INV/{order.order.id})</Grid.Row>
          </Grid.Column>
          <Grid.Column width={6}>
            <Grid.Row>
              <div>Status</div>
            </Grid.Row>
            <Grid.Row>
              <h4 style={{ color: "teal" }}>{order.order.state.stateType}</h4>
            </Grid.Row>
          </Grid.Column>
          <Grid.Column width={3}>
            <Grid.Row>
              <div>Sub Total</div>
            </Grid.Row>
            <Grid.Row>
              <h4 style={{ color: "teal" }}>Rp50.000</h4>
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </Card.Content>
      {order.order.items &&
        order.order.items.map((item) => (
          <ItemMyOrders item={item} />
        ))}
      <Card.Content>
        {/* <Button floated='right' size='small' color='teal'>See Details</Button> */}
        <ModalMyOrders order={order.order}></ModalMyOrders>
      </Card.Content>
    </Card>
  );
}

export default CardMyOrders;
