import React, { useState } from "react";
import {
  Card,
  Button,
  Icon,
  List,
  Sticky,
  Header,
  Input,
} from "semantic-ui-react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_CART_QUERY } from "../util/graphql";
import { Link } from "react-router-dom";
import DeleteItemButton from "../components/DeleteItemButton";

function ManageItemSticky({ contextRef, item }) {
  const [amountItem, setAmountItem] = useState(1);

  const { data: userCartData } = useQuery(FETCH_CART_QUERY, {
    variables: {
      itemId: item.id,
    },
  });
  const { getUserCartItem: cartItem } = userCartData ? userCartData : [];
  let inCartAmount = 0;

  if (cartItem) {
    inCartAmount = cartItem.amountItem;
  }

  let itemMarkup = (
    <>
      <Sticky context={contextRef} offset={130}>
        <Card style={{ boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)" }}>
          <Card.Content>
            <List>
              <List.Item>
                <List.Content floated="right">
                  <Icon name="angle down" />
                </List.Content>
                <List.Content>
                  <Header as="h4">Set amount and note</Header>
                </List.Content>
              </List.Item>
              <List.Item>
                <List horizontal>
                  <List.Item>
                    <Button
                      onClick={() => {
                        setAmountItem(amountItem - 1);
                      }}
                      disabled={amountItem <= 1}
                      size="mini"
                      circular
                      icon="minus"
                    />
                  </List.Item>
                  <List.Item>
                    <Input
                      transparent
                      placeholder="1"
                      value={amountItem}
                      style={{ width: 18 }}
                    />
                  </List.Item>
                  <List.Item>
                    <Button
                      onClick={() => {
                        setAmountItem(amountItem + 1);
                      }}
                      disabled={inCartAmount + amountItem >= item.stock}
                      size="mini"
                      circular
                      icon="plus"
                    />
                  </List.Item>
                  <List.Item>{`Stok  ${item.stock}`}</List.Item>
                </List>
              </List.Item>
              <List.Item>
                <List.Content floated="left" verticalAlign="middle">
                  <Header as="h5">Sub Total</Header>
                </List.Content>
                <List.Content floated="right">
                  <Header as="h3">{`Rp${item.price * amountItem}`}</Header>
                </List.Content>
              </List.Item>
              <List.Item></List.Item>
            </List>
          </Card.Content>
          <Card.Content extra>
            <div className="ui two buttons">
              <Button
                animated="vertical"
                as={Link}
                // to={`/editItem/${item.id}`}
                to={{
                  pathname: `/editItem/${item.id}`,
                  item: {
                    name: item.name,
                    price: item.price,
                    stock: item.stock,
                    category: item.category,
                    condition: item.condition,
                    weight: item.weight,
                    description: item.description,
                    length: item.dimension.length,
                    width: item.dimension.width,
                    height: item.dimension.height,
                  },
                }}
              >
                <Button.Content visible>
                  <Icon name="edit" /> Edit
                </Button.Content>
                <Button.Content
                  hidden
                  icon
                  floated="right"
                  style={{ borderRadius: 8, marginLeft: 2 }}
                >
                  Modify Item Info
                </Button.Content>
              </Button>
              <DeleteItemButton itemId={item.id}></DeleteItemButton>
            </div>
          </Card.Content>
        </Card>
      </Sticky>
    </>
  );
  return itemMarkup;
}

export default ManageItemSticky;
