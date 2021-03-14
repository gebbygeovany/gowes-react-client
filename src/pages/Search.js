import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Transition, Ref } from "semantic-ui-react";

import ShopCard from "../components/ShopCard";
import SearchBarHome from "../components/SearchBarHome";
import FilterBarHome from "../components/FilterBarHome";
import { SEARCH_ITEMS_QUERY } from "../util/graphql";
import PropTypes from "prop-types";
import { connect } from "react-redux";

function Search(props) {
  const contextRef = React.createRef();
  const [keyword, setKeyword] = useState(props.match.params.keyword.trim());

  const { loading, data, refetch } = useQuery(SEARCH_ITEMS_QUERY, {
    variables: {
      keyword: props.match.params.keyword.trim(),
      category: props.newFilter.category,
      condition: props.newFilter.condition,
      city: props.newFilter.city,
    },
  });
  const { searchItems: items } = data ? data : [];
  console.log(`props.newFilter: ${props.newFilter.category}`)
  useEffect(() => {
    if (props.newFilter) {
      refetch();
    }
  }, [props.newFilter]);

  return (
    <Ref innerRef={contextRef}>
      <Grid stackable>
        <Grid.Column width={16}>
          <SearchBarHome keyword={keyword} />
        </Grid.Column>
        <Grid.Column width={4}>
          <FilterBarHome
            contextRef={contextRef}
          />
        </Grid.Column>
        <Grid.Column width={12}>
          <h4>Products</h4>
          <Grid stackable columns={4}>
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

Search.propTypes = {
  newFilter: PropTypes.object,
};

const mapStateToProps = (state) => ({
  newFilter: state.searchFilter.filter,
});

export default connect(mapStateToProps, {})(Search);
