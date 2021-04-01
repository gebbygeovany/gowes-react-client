import React from "react";
import { Card, Grid, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

function ItemCheckoutCard({ item }) {

  console.log(item.amountItem)
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
              centered
              rounded
              src={item.item.images[0].downloadUrl}
              size="small"
              as={Link}
              to={`/items/${item.item.id}`}
            />
          </Grid.Column>
          <Grid.Column width={10} style={{ marginTop: 5 }}>
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
          <Grid.Column width={3} style={{ marginTop: 5 }}>
            <Grid.Row>
              <h5 style={{ color: "teal" }}>Notes:</h5>
            </Grid.Row>
            <Grid.Row style={{ marginTop: 0 }}>
              {item.note === "" ? "-" : item.note}
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </Card.Content>
    </>
  );
}
export default ItemCheckoutCard;
