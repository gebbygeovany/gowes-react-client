import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Transition } from "semantic-ui-react";
import gql from "graphql-tag";

import ShopCard from "../components/ShopCard";
import FilterBar from "../components/FilterBar";
import { FETCH_ITEMS_QUERY } from "../util/graphql";

function Home() {
  const { loading, data } = useQuery(FETCH_ITEMS_QUERY);
  const { getItems: items } = data ? data : [];

  return (
    <Grid stackable columns={6}>
      <Grid.Row className="page-title">
        <FilterBar></FilterBar>
      </Grid.Row>
      <Grid.Row>
        {!loading ? (
          <>
            <Transition.Group duration={1000}>
              {items &&
                items.map((item) => (
                  <Grid.Column key={item.id} style={{ marginBottom: 20 }}>
                    <ShopCard item={item} />
                  </Grid.Column>
                ))}
            </Transition.Group>
          </>
        ) : (
          <h1>Loading posts..</h1>
        )}
      </Grid.Row>
    </Grid>
  );
}

const FETCH_CITIES_QUERY = gql`
  {
    getCities {
      city_id
      province_id
      province
      type
      city_name
      postal_code
    }
  }
`;

export default Home;
