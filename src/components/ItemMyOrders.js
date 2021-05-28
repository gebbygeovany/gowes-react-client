import React from "react";
import { Card, Grid, Image } from "semantic-ui-react";

import ModalAddItemReview from "./ModalAddItemReview";


function ItemMyOrders(props) {
  console.log(props.item)
  console.log(props.order)

  // console.log(order)

  var itemOrder = (<></>)
  if (props.item) {
    itemOrder = (
      <Card.Content>
        <Grid stackable>
          <Grid.Column width={2}>
            <Image
              fluid
              centered
              rounded
              src={props.item.images[0].downloadUrl}
              size="tiny"
              style={{ margin: 10 }}
            />
          </Grid.Column>
          <Grid.Column width={5} verticalAlign="middle">
            <Grid.Row>
              <div>Item Name</div>
            </Grid.Row>
            <Grid.Row>
              <h4 style={{ color: "teal" }}>{props.item.name}</h4>
            </Grid.Row>
          </Grid.Column>
          <Grid.Column width={3} verticalAlign="middle">
            <Grid.Row>
              <div>Price</div>
            </Grid.Row>
            <Grid.Row>
              <h4 style={{ color: "teal" }}>Rp{props.item.price}</h4>
            </Grid.Row>
          </Grid.Column>
          <Grid.Column width={3} verticalAlign="middle">
            <Grid.Row>
              <div>Amount Item</div>
            </Grid.Row>
            <Grid.Row>
              <h4 style={{ color: "teal" }}>{props.item.amountItem}</h4>
            </Grid.Row>
          </Grid.Column>
          <Grid.Column width={3} verticalAlign="middle">
            {props.order && props.order.state.stateType === "ARRIVED" ? (
              <ModalAddItemReview item={props.item}></ModalAddItemReview>
            ) : (<></>)}
          </Grid.Column>
        </Grid>
      </Card.Content>
    )
  }
  return itemOrder
}

export default ItemMyOrders;
