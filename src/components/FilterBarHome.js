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
  const [values, setValues] = useState(props.filter);

  useEffect(() => {
    props.setFilter(values);
  }, [values]);

  const handleChange = (_, { name, value }) => {
    setValues({ ...values, [name]: value == "all" ? "" : value });
  };

  const categoryChange = (_, { value }) => {
    setValues({ ...values, ["category"]: value == "all" ? "" : value });
  };

  const cityChange = (_, {  value }) => {
    setValues({ ...values, ["city"]: value == "all" ? "" : value });
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
  filter: PropTypes.object,
};

const mapStateToProps = (state) => ({
  filter: state.searchFilter.filter,
});

export default connect(mapStateToProps, { setFilter })(FilterBarHome);
