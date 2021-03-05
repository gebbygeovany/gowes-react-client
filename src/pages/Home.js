import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Transition, Ref } from "semantic-ui-react";
import gql from "graphql-tag";

import ShopCard from "../components/ShopCard";
import SearchBarHome from "../components/SearchBarHome";
import FilterBarHome from "../components/FilterBarHome";
import { FETCH_ITEMS_QUERY } from "../util/graphql";

function Home() {
  const { loading, data } = useQuery(FETCH_ITEMS_QUERY);
  const { getItems: items } = data ? data : [];

  const contextRef = React.createRef();

  return (
    <Ref innerRef={contextRef}>
      <Grid stackable>
        <Grid.Column width={16}>
          <SearchBarHome ></SearchBarHome>
        </Grid.Column>
        <Grid.Column width={3}>
          <FilterBarHome contextRef={contextRef}></FilterBarHome>
        </Grid.Column>
        <Grid.Column width={13}>
          <h4>Products</h4>
          <Grid stackable columns={5}>
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
                <h1>Loading Products..</h1>
              )}

          </Grid>
        </Grid.Column>

      </Grid>
    </Ref>
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
