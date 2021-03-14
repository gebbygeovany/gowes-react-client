import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Transition, Ref, Message } from "semantic-ui-react";

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

  Object.size = function (obj) {
    var size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };

  var size = Object.size(items)

  console.log(size)



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
            {!loading && size > 0 ? (
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
            ) : (loading ? (
              <h1>Loading Products..</h1>

            ) : (
              <Grid.Column width={16}>
                <Message
                  error
                  icon='search'
                  header='Item not found'
                  content='Try with another keywords or filters'
                  style={{ marginBottom: 109 }}
                />
              </Grid.Column>

            )
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
