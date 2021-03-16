import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Transition, Ref, Message } from "semantic-ui-react";

import ShopCard from "../components/ShopCard";
import SearchBarHome from "../components/SearchBarHome";
import FilterBarHome from "../components/FilterBarHome";
import { SEARCH_ITEMS_QUERY } from "../util/graphql";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setFilter } from "../actions/searchFilterAction";

function Search(props) {
  const contextRef = React.createRef();
  const params = props.match.params.keyword.trim().split("&");

  const getQueryFieldValue = (fieldName) => {
    let result = "";
    params.map((param) => {
      const pair = param.split("=");
      if (pair[0] == fieldName) {
        result = pair[1];
        return;
      }
    });
    return result;
  };

  const navsourceParam = getQueryFieldValue("navsource");
  const keywordParam = getQueryFieldValue("q");
  const categoryParam = getQueryFieldValue("cat");
  const conditionParam = getQueryFieldValue("cond");
  const cityParam = getQueryFieldValue("city");
  const minPriceParam = getQueryFieldValue("min");
  const maxPriceParam = getQueryFieldValue("max");
  const navsource = navsourceParam != "" ? `navsource=${navsourceParam}` : "";
  const keyword =
    navsourceParam != "" ? `&q=${keywordParam}` : `q=${keywordParam}`;
  
  const { loading, data } = useQuery(SEARCH_ITEMS_QUERY, {
    variables: {
      keyword: keywordParam,
      category: categoryParam,
      condition: conditionParam,
      city: cityParam,
      minPrice: minPriceParam != "" ? parseInt(minPriceParam) : -1,
      maxPrice: maxPriceParam != "" ? parseInt(maxPriceParam) : -1,
    },
  });
  const { searchItems: items } = data ? data : [];

  return (
    <Ref innerRef={contextRef}>
      <Grid stackable>
        <Grid.Column width={16}>
          <SearchBarHome keyword={keywordParam} />
        </Grid.Column>
        <Grid.Column width={4}>
          <FilterBarHome
            contextRef={contextRef}
            navsource={navsource}
            keyword={keyword}
            category={categoryParam}
            condition={conditionParam}
            city={cityParam}
            minPrice={minPriceParam}
            maxPrice={maxPriceParam}
          />
        </Grid.Column>
        <Grid.Column width={12}>
          <h4>Products</h4>
          {props.newFilter.minPrice < 100 && props.newFilter.minPrice != -1 ? (
            <Message
              error
              header="The price range is between 100 - 100,000,000."
            />
          ) : (
            <></>
          )}

          <Grid stackable columns={4}>
            {!loading && items.length > 0 ? (
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
            ) : loading ? (
              <h1>Loading Products..</h1>
            ) : (
              <Grid.Column width={16}>
                <Message
                  error
                  icon="search"
                  header="Item not found"
                  content="Try with another keywords or filters"
                  style={{ marginBottom: 109 }}
                />
              </Grid.Column>
            )}
          </Grid>
        </Grid.Column>
      </Grid>
    </Ref>
  );
}

Search.propTypes = {
  newFilter: PropTypes.object,
  setFilter: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  newFilter: state.searchFilter.filter,
});

export default connect(mapStateToProps, { setFilter })(Search);
