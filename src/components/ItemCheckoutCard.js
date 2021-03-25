import React from "react";
import { Card, Grid, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

function ItemCheckoutCard({ item }) {
  return (
    <>
      <Card.Content>
        <Grid doubling>
          <Grid.Column
            width={2}
            verticalAlign="middle"
            style={{ padding: 5, marginLeft: 10 }}
          >
            <Image
              fluid
              centered
              rounded
              src={item.item.images[0].downloadUrl}
              size="small"
              as={Link}
              to={`/items/${item.item.id}`}
            />
          </Grid.Column>
          <Grid.Column width={13} style={{ marginTop: 5 }}>
            <Grid.Row>
              <h4>{item.item.name}</h4>
            </Grid.Row>
            <Grid.Row style={{ marginTop: 5 }}>
              <h4 style={{ color: "teal" }}>Rp{item.item.price}</h4>
            </Grid.Row>
            <Grid.Row style={{ marginTop: 5 }}>
              <div>
                {item.amountItem} item ({item.item.weight * item.amountItem}gr){" "}
              </div>
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </Card.Content>
    </>
  );
}
export default ItemCheckoutCard;
