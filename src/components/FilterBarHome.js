import React, { useState, useEffect } from "react";
import {
  Card,
  Sticky,
  Dropdown,
  Form,
  Radio,
  Input,
  Label,
} from "semantic-ui-react";
import { useQuery } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";

import { FETCH_CITIES_QUERY } from "../util/graphql";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setFilter } from "../actions/searchFilterAction";
import { categoryOptions } from "../util/const";

function FilterBarHome(props) {
  const history = useHistory();
  const initFilter = props.filter;
  initFilter.category = props.category;
  initFilter.city = props.city;
  initFilter.condition = props.condition;
  const [values, setValues] = useState(initFilter);
  const [isSubmit, setSubmit] = useState(false);
  const [prices, setPrices] = useState({
    minPrice: props.minPrice,
    maxPrice: props.maxPrice,
  });

  useEffect(() => {
    if (isSubmit) {
      const category = values.category !== "" ? `&cat=${values.category}` : "";
      const city = values.city !== "" ? `&city=${values.city}` : "";
      const condition =
        values.condition !== "" ? `&cond=${values.condition}` : "";
      const minPrice = values.minPrice > -1 ? `&min=${values.minPrice}` : "";
      const maxPrice = values.maxPrice > -1 ? `&max=${values.maxPrice}` : "";
      history.push(
        `/search/${props.navsource}${props.keyword}${category}${city}${condition}${minPrice}${maxPrice}`
      );
    }
    setSubmit(false);
  }, [
    isSubmit,
    history,
    props.keyword,
    props.navsource,
    values.category,
    values.city,
    values.condition,
    values.maxPrice,
    values.minPrice,
  ]);

  const handleChange = (_, { name, value }) => {
    setValues({ ...values, [name]: value === "all" ? "" : value });
    setSubmit(true);
  };

  const categoryChange = (_, { value }) => {
    setValues({ ...values, category: value === "all" ? "" : value });
    setSubmit(true);
  };

  const cityChange = (_, { value }) => {
    setValues({ ...values, city: value === "all" ? "" : value });
    setSubmit(true);
  };

  const priceChange = (e) => {
    const priceValue = e.target.value.trim();
    if (priceValue.match(/^\d+$/) || priceValue === "") {
      setPrices({
        ...prices,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      switch (e.target.name) {
        case "minPrice":
          if (prices.minPrice.match(/^\d+$/) || prices.minPrice === "") {
            setValues({
              ...values,
              minPrice: prices.minPrice === "" ? -1 : parseInt(prices.minPrice),
            });
          }
          break;
        case "maxPrice":
          if (prices.maxPrice.match(/^\d+$/) || prices.maxPrice === "") {
            setValues({
              ...values,
              maxPrice: prices.maxPrice === "" ? -1 : parseInt(prices.maxPrice),
            });
          }
          break;
        default:
          break;
      }

      setSubmit(true);
    }
  };

  const { data } = useQuery(FETCH_CITIES_QUERY);
  const { getCities: cities } = data ? data : [];
  const cityOptions = [
    {
      key: "all",
      text: "Indonesia",
      value: "all",
    },
  ];

  if (cities) {
    cities.forEach((city) => {
      cityOptions.push({
        key: city.city_id,
        text: `${city.type} ${city.city_name}`,
        value: `${city.type} ${city.city_name}`,
      });
    });
  }

  return (
    <>
      <Sticky context={props.contextRef} offset={100}>
        <h4>Filter</h4>
        <Card style={{ boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)" }}>
          <Card.Content>
            <h5>Category</h5>
            <Dropdown
              placeholder="Select Category"
              fluid
              selection
              options={categoryOptions}
              onChange={categoryChange}
              defaultValue={
                values.category !== ""
                  ? values.category
                  : categoryOptions[0].value
              }
            />
          </Card.Content>
          <Card.Content>
            <h5>Origin</h5>
            <Dropdown
              placeholder="Select City"
              fluid
              options={cityOptions}
              search
              selection
              onChange={cityChange}
              defaultValue={cityOptions[0].value}
            />
          </Card.Content>
          <Card.Content>
            <h5>Condition</h5>
            <Form>
              <Form.Group widths="equal">
                <Form.Field>
                  <Radio
                    label="All"
                    name="condition"
                    value="all"
                    checked={values.condition === "" ? true : false}
                    onChange={handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    label="New"
                    name="condition"
                    value="new"
                    checked={values.condition === "new" ? true : false}
                    onChange={handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    label="Used"
                    name="condition"
                    value="used"
                    checked={values.condition === "used" ? true : false}
                    onChange={handleChange}
                  />
                </Form.Field>
              </Form.Group>
            </Form>
          </Card.Content>
          <Card.Content>
            <h5>Price</h5>
            <Input
              fluid
              labelPosition="right"
              placeholder="Min Price"
              style={{ marginBottom: 10 }}
              value={prices.minPrice}
              name="minPrice"
              onChange={priceChange}
              onKeyDown={handleKeyDown}
            >
              <Label basic>Rp</Label>
              <input />
              <Label>.00</Label>
            </Input>
            <Input
              fluid
              labelPosition="right"
              placeholder="Max Price"
              value={prices.maxPrice}
              name="maxPrice"
              onChange={priceChange}
              onKeyDown={handleKeyDown}
            >
              <Label basic>Rp</Label>
              <input />
              <Label>.00</Label>
            </Input>
          </Card.Content>
        </Card>
      </Sticky>
    </>
  );
}

FilterBarHome.propTypes = {
  setFilter: PropTypes.func.isRequired,
  filter: PropTypes.object,
};

const mapStateToProps = (state) => ({
  filter: state.searchFilter.filter,
});

export default connect(mapStateToProps, { setFilter })(FilterBarHome);
