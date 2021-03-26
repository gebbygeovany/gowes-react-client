import React, { useContext } from "react";
import { Button, Card, Icon, Grid, Message, Divider } from "semantic-ui-react";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import MyItemsCard from "../components/MyItemsCard";
import { AuthContext } from "../context/auth";
import { objectSize } from "../util/extensions";

function MyItemList() {
  const context = useContext(AuthContext);

  const { loading, data } = useQuery(FETCH_ITEM_SELLER_QUERY, {
    variables: {
      userId: context.user.id,
    },
  });
  const { getSellerItems: sellerItems } = data ? data : [];

  var size = objectSize(sellerItems);

  return (
    <>
      <Card fluid style={{ boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)" }}>
        <Card.Content header="My Items"></Card.Content>
        <Button color="teal" as={Link} to="/addItem">
          <Icon name="plus"></Icon>
          Add Atem
        </Button>
      </Card>
      {!loading ? (
        size > 0 ? (
          <>
            <Divider />
            <Grid container verticalAlign="middle">
              <Grid.Column width={2} centered></Grid.Column>
              <Grid.Column width={2} verticalAlign="middle">
                <h4>Item Name</h4>
              </Grid.Column>
              <Grid.Column width={3} verticalAlign="middle" c>
                <h4>Remaining Stock</h4>
              </Grid.Column>
              <Grid.Column width={3} verticalAlign="middle" textAlign="center">
                <h4>Selled</h4>
              </Grid.Column>
              <Grid.Column width={3} verticalAlign="middle" textAlign="center">
                <h4>Price</h4>
              </Grid.Column>
              <Grid.Column width={2} verticalAlign="middle" textAlign="center">
                <h4>Rating</h4>
              </Grid.Column>
            </Grid>
            <Divider />
            {sellerItems &&
              sellerItems.map((sellerItem) => (
                <Grid.Column key={sellerItem.id} style={{ marginBottom: 20 }}>
                  <MyItemsCard item={sellerItem}></MyItemsCard>
                </Grid.Column>
              ))}
          </>
        ) : (
          <>
            <Message
              error
              icon="inbox"
              header="You dont have any items"
              content="add items to sell your things"
            />
            <br></br>
            <br></br>
            <br></br>
          </>
        )
      ) : (
        <h4>Loading...</h4>
      )}
    </>
  );
}

export const FETCH_ITEM_SELLER_QUERY = gql`
  query($userId: ID!) {
    getSellerItems(userId: $userId) {
      id
      name
      price
      createdAt
      description
      weight
      images {
        id
        downloadUrl
      }
      bookmarkedBy {
        id
        userId
        createdAt
      }
      user {
        seller {
          username
        }
      }
    }
  }
`;

export default MyItemList;
