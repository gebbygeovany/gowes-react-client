import React, { useState } from "react";
import { Card, Header, Dropdown, Label, List } from "semantic-ui-react";
import ItemCheckoutCard from "./ItemCheckoutCard";
import { FETCH_COST_COURIER_QUERY } from "../util/graphql";
import { useQuery } from "@apollo/react-hooks";

function CheckoutCard(props) {
  let costVariables = {
    origin: props.cartItem[0].item.user.address.cityId,
    destination: props.user.address.cityId,
    weight: props.cartItem[0].item.weight * 1000,
    courier: "tiki",
  };
  const { loading, data } = useQuery(FETCH_COST_COURIER_QUERY, {
    variables: costVariables,
  });

  costVariables.courier = "jne";
  const { loading: jneLoading, data: jneData } = useQuery(
    FETCH_COST_COURIER_QUERY,
    {
      variables: costVariables,
    }
  );

  costVariables.courier = "pos";
  const { loading: posLoading, data: posData } = useQuery(
    FETCH_COST_COURIER_QUERY,
    {
      variables: costVariables,
    }
  );
  let { getCosts: tikiCosts } = data ? data : [];
  let { getCosts: jneCosts } = jneData ? jneData : [];
  let { getCosts: posCosts } = posData ? posData : [];

  let checkoutCartMarkup = <></>;
  if (!loading && !jneLoading & !posLoading) {
    // {
    //   key: 1,
    //   text: "J&t REG",
    //   value: 1,
    //   content: (
    //     <>
    //       {/* <Header as='h4'>J&t REG</Header>
    //                       <span>Rp10.000</span> */}
    //       <List>
    //         <List.Item>
    //           <List.Content floated="right">Rp10.000</List.Content>
    //           <List.Content style={{ marginBottom: 5 }}>
    //             <Header as="h5">J&t REG</Header>
    //           </List.Content>
    //         </List.Item>
    //       </List>
    //     </>
    //   ),
    // },
    let options = [];
    if (tikiCosts[0].costs) {
      tikiCosts[0].costs.map((cost) => {
        options = [
          ...options,
          {
            key: cost.cost[0].etd,
            text: tikiCosts[0].code,
            value: cost.cost[0].etd,
            content: (
              <>
                <List>
                  <List.Item>
                    <List.Content floated="right">
                      Rp{cost.cost[0].value}
                    </List.Content>
                    <List.Content style={{ marginBottom: 5 }}>
                      <Header as="h5">
                        {tikiCosts[0].code} ({cost.service})
                      </Header>
                    </List.Content>
                  </List.Item>
                </List>
              </>
            ),
          },
        ];
      });
    }
    if (jneCosts[0].costs) {
      jneCosts[0].costs.map((cost) => {
        options = [
          ...options,
          {
            key: cost.cost[0].etd,
            text: jneCosts[0].code,
            value: cost.cost[0].etd,
            content: (
              <>
                <List>
                  <List.Item>
                    <List.Content floated="right">
                      Rp{cost.cost[0].value}
                    </List.Content>
                    <List.Content style={{ marginBottom: 5 }}>
                      <Header as="h5">
                        {jneCosts[0].code} ({cost.service})
                      </Header>
                    </List.Content>
                  </List.Item>
                </List>
              </>
            ),
          },
        ];
      });
    }
    if (posCosts[0].costs) {
      posCosts[0].costs.map((cost) => {
        options = [
          ...options,
          {
            key: cost.cost[0].etd,
            text: posCosts[0].code,
            value: cost.cost[0].etd,
            content: (
              <>
                <List>
                  <List.Item>
                    <List.Content floated="right">
                      Rp{cost.cost[0].value}
                    </List.Content>
                    <List.Content style={{ marginBottom: 5 }}>
                      <Header as="h5">
                        {posCosts[0].code} ({cost.service})
                      </Header>
                    </List.Content>
                  </List.Item>
                </List>
              </>
            ),
          },
        ];
      });
    }
    checkoutCartMarkup = (
      <Card fluid style={{ boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)" }}>
        <Card.Content>
          <h4>{props.cartItem[0].item.user.seller.username}</h4>
        </Card.Content>
        {props.cartItem &&
          props.cartItem.map((item) => (
            <ItemCheckoutCard item={item}></ItemCheckoutCard>
          ))}
        <Card.Content>
          <Label
            as="a"
            color="primary"
            ribbon="left"
            style={{ marginBottom: 10 }}
          >
            Shipping
          </Label>
          <Dropdown selection fluid options={options} placeholder="Shipment" />
        </Card.Content>
      </Card>
    );
  }

  return checkoutCartMarkup;
}

export default CheckoutCard;
