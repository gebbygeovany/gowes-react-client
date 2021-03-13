import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Transition, Ref } from "semantic-ui-react";

import ShopCard from "../components/ShopCard";
import SearchBarHome from "../components/SearchBarHome";
import FilterBarHome from "../components/FilterBarHome";
import { SEARCH_ITEMS_QUERY } from "../util/graphql";

function Search(props) {
  const contextRef = React.createRef();
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [keyword, setKeyword] = useState(props.match.params.keyword.trim());

  const { loading, data, refetch } = useQuery(SEARCH_ITEMS_QUERY, {
    variables: {
      keyword: props.match.params.keyword.trim(),
      category: category,
      condition: condition,
      city: city,
    },
  });
  const { searchItems: items } = data ? data : [];
  const onCategoryChange = (newCategory) => {
    setCategory(newCategory);
    refetch();
  };
  const onCityChange = (newCity) => {
    setCity(newCity);
    refetch();
  };
  const onConditionChange = (newCondition) => {
    setCondition(newCondition);
    refetch();
  };
  console.log(`category: ${category}, city: ${city}, condition: ${condition}`)
  return (
    <Ref innerRef={contextRef}>
      <Grid stackable>
        <Grid.Column width={16}>
          <SearchBarHome keyword={keyword} />
        </Grid.Column>
        <Grid.Column width={4}>
          <FilterBarHome
            contextRef={contextRef}
            onCategoryChange={onCategoryChange}
            onCityChange={onCityChange}
            onConditionChange={onConditionChange}
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

export default Search;
