import React from "react";
import { Grid, Segment, Image, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

function ItemAttachedOnChat({ item, position }) {
  console.log(`item: ${item}`);
  const messageItemLeft = {
    marginTop: 4,
    border: 0,
    marginBottom: 4,
    marginLeft: 14,
    marginRight: 14,
    padding: 10,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    width: 250,
    boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
  };

  const messageItemRight = {
    marginTop: 4,
    border: 0,
    marginBottom: 4,
    marginLeft: 14,
    padding: 10,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    width: 250,
    boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
  };

  const imageItemLeft = {
    paddingRight: 0,
    paddingBottom: 0,
  };

  // const getItemMessage = () =>
  let image =
    item && item.image === ""
      ? item.image
      : "https://react.semantic-ui.com/images/avatar/large/molly.png";

  let messageItemMarkUp = (
    <>
      <Grid container>
        <Grid.Column style={{ padding: 0 }}>
          <Segment compact floated="left" style={messageItemLeft}>
            <Grid>
              <Grid.Column width={5} style={imageItemLeft}>
                <Image fluid centered rounded src={image} />
              </Grid.Column>
              <Grid.Column width={11} style={{ paddingBottom: 0 }}>
                <Grid.Row>
                  <h4>{item.name}</h4>
                </Grid.Row>
                <Grid.Row style={{ marginBottom: 5 }}>
                  <span style={{ color: "teal", fontWeight: "bold" }}>
                    Rp{item.price}
                  </span>
                </Grid.Row>
                <Grid.Row>
                  <Button
                    compact
                    fluid
                    size="mini"
                    color="teal"
                    as={Link}
                    to={`/items/${item.id}`}
                  >
                    See Item
                  </Button>
                </Grid.Row>
              </Grid.Column>
            </Grid>
          </Segment>
        </Grid.Column>
      </Grid>
    </>
  );

  if (position === "right") {
    messageItemMarkUp = (
      <Grid container>
        <Grid.Column style={{ padding: 0 }}>
          <Segment compact floated="right" style={messageItemRight}>
            <Grid>
              <Grid.Column width={5} style={imageItemLeft}>
                <Image fluid centered rounded src={image} />
              </Grid.Column>
              <Grid.Column width={11} style={{ paddingBottom: 0 }}>
                <Grid.Row>
                  <h4>{item.name}</h4>
                </Grid.Row>
                <Grid.Row style={{ marginBottom: 5 }}>
                  <span style={{ color: "teal", fontWeight: "bold" }}>
                    Rp{item.price}
                  </span>
                </Grid.Row>
                <Grid.Row>
                  <Button
                    compact
                    fluid
                    size="mini"
                    color="teal"
                    as={Link}
                    to={`/items/${item.id}`}
                  >
                    See Item
                  </Button>
                </Grid.Row>
              </Grid.Column>
            </Grid>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }

  return messageItemMarkUp;
}
export default ItemAttachedOnChat;
