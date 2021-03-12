import React, { useState } from "react";
import { Card, Sticky, Dropdown, Form, Radio, Input, Label } from "semantic-ui-react";
import { useQuery } from "@apollo/react-hooks";

import { FETCH_CITIES_QUERY } from "../util/graphql";

function FilterBarHome({
  contextRef,
  onCategoryChange,
  onCityChange,
  onConditionChange,
}) {
  const [checked, setChecked] = useState("all");

  const handleChange = (e, { value }) => {
    setChecked(value);
    onConditionChange(value);
  };

  const { loading, data } = useQuery(FETCH_CITIES_QUERY);
  const { getCities: cities } = data ? data : [];
  const cityOptions = [
    {
      key: "all",
      text: "Indonesia",
      value: "all",
      // image: { avatar: true, src: '/images/avatar/small/jenny.jpg' },
    },
  ];

  if (cities) {
    cities.forEach((city) => {
      cityOptions.push({
        key: city.city_id,
        text: city.city_name + " " + city.type,
        value: city.city_id,
      });
    });
  }

  const categoryOptions = [
    {
      key: "all",
      text: "All Categories",
      value: "all",
      // image: { avatar: true, src: '/images/avatar/small/jenny.jpg' },
    },
    {
      key: "accessories",
      text: "Accessories",
      value: "accessories",
      // image: { avatar: true, src: '/images/avatar/small/jenny.jpg' },
    },
    {
      key: "sparepart",
      text: "Sparepart",
      value: "sparepart",
      // image: { avatar: true, src: '/images/avatar/small/elliot.jpg' },
    },
    {
      key: "apparel",
      text: "Apparel",
      value: "apparel",
      // image: { avatar: true, src: '/images/avatar/small/stevie.jpg' },
    },
  ];
  const priceOptions = [
    {
      key: 0,
      text: "Min to Max",
      value: "ascending",
      // image: { avatar: true, src: '/images/avatar/small/jenny.jpg' },
    },
    {
      key: 1,
      text: "Max to Min",
      value: "descending",
      // image: { avatar: true, src: '/images/avatar/small/elliot.jpg' },
    },
  ];

  const categoryChange = (e, { name, value }) => {
    onCategoryChange(value);
  };
  const cityChange = (e, { name, value }) => {
    onCityChange(value);
  };
  const conditionChange = (e, { name, value }) => {
    onConditionChange(value);
  };

  return (
    <>
      <Sticky context={contextRef} offset={120}>
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
                  name="all"
                  value="all"
                  checked={checked === "all" ? true : false}
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  label="New"
                  name="new"
                  value="new"
                  checked={checked === "new" ? true : false}
                  onChange={handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  label="Used"
                  name="used"
                  value="used"
                  checked={checked === "used" ? true : false}
                  onChange={handleChange}
                />
              </Form.Field>
            </Form>
          </Card.Content>
          <Card.Content>
            <h5>Price</h5>
            <Input fluid labelPosition='right' type='text' placeholder='Min Price' style={{marginBottom: 10}}>
              <Label basic>Rp</Label>
              <input />
              <Label>.00</Label>
            </Input>
            <Input fluid labelPosition='right' type='text' placeholder='Max Price'>
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

export default FilterBarHome;
