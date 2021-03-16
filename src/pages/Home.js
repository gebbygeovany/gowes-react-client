import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Transition } from "semantic-ui-react";

import ShopCard from "../components/ShopCard";
import SearchBarHome from "../components/SearchBarHome";
import HomeCarousel from "../components/HomeCarousel";
import { FETCH_ITEMS_QUERY } from "../util/graphql";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setFilter } from "../actions/searchFilterAction";
import { initialFilter } from "../util/const";

function Home(props) {
  const { loading, data } = useQuery(FETCH_ITEMS_QUERY);
  const { getItems: items } = data ? data : [];
  props.setFilter(initialFilter.filter);

  return (
    <>
      <HomeCarousel></HomeCarousel>
      <Grid stackable>
        <Grid.Column width={16}>
          <SearchBarHome navSource={"home"}/>
        </Grid.Column>
        <Grid.Column width={16}>
          <h4>Products</h4>
          <Grid stackable columns={6}>
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
    </>
  );
}

Home.propTypes = {
  newFilter: PropTypes.object,
  setFilter: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  newFilter: state.searchFilter.filter,
});
export default connect(mapStateToProps, { setFilter })(Home);
