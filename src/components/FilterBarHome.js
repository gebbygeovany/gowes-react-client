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

import { FETCH_CITIES_QUERY } from "../util/graphql";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setFilter } from "../actions/searchFilterAction";

function FilterBarHome(props) {
  const [values, setValues] = useState({
    category: "",
    condition: "",
    city: "",
  });

  const handleChange = (e, { name, value }) => {
    setValues({ ...values, [name]: value == "all" ? "" : value });
  };

  const handleDropdownChange = (e, { key, value }) => {
    setValues({ ["category"]: value == "all" ? "" : value });
  };

  useEffect(() => {
    console.log(`values.category: ${values.category}`);
    props.setFilter(values);
  }, [values]);

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

  const categoryOptions = [
    {
      key: "all",
      text: "All Categories",
      value: "all",
    },
    {
      key: "accessories",
      text: "Accessories",
      value: "accessories",
    },
    {
      key: "sparepart",
      text: "Sparepart",
      value: "sparepart",
    },
    {
      key: "apparel",
      text: "Apparel",
      value: "apparel",
    },
  ];
  const priceOptions = [
    {
      key: 0,
      text: "Min to Max",
      value: "ascending",
    },
    {
      key: 1,
      text: "Max to Min",
      value: "descending",
    },
  ];

  const categoryChange = (e, { value }) => {
    setValues({ ...values, ["category"]: value == "all" ? "" : value });
  };
  const cityChange = (e, {  value }) => {
    setValues({ ...values, ["city"]: value == "all" ? "" : value });
  };
  const conditionChange = (e, { name, value }) => {
    props.onConditionChange(value);
  };

  return (
    <>
      <Sticky context={props.contextRef} offset={120}>
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
              defaultValue={categoryOptions[0].value}
            />
          </Card.Content>
          <Card.Content>
            <h5>Origin</h5>
            <Dropdown
              placeholder="Select City"
              fluid
              selection
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
            </Form>
          </Card.Content>
          <Card.Content>
            <h5>Price</h5>
            <Input
              fluid
              labelPosition="right"
              type="text"
              placeholder="Min Price"
              style={{ marginBottom: 10 }}
            >
              <Label basic>Rp</Label>
              <input />
              <Label>.00</Label>
            </Input>
            <Input
              fluid
              labelPosition="right"
              type="text"
              placeholder="Max Price"
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
};

export default connect(null, { setFilter })(FilterBarHome);
