import React, { useState } from "react";
import {
  Card,
  Image,
  Grid,
  Button,
  Form,
  TextArea,
  Icon,
} from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useForm } from "../util/hooks";

function AddItem(props) {
  const [errors, setErrors] = useState({});
  const [isSaved, setSave] = useState(false);
  const { onChange, onSubmit, values } = useForm(addItem, {
    name: "",
    price: 0,
    stock: 0,
    category: "",
    condition: "",
    weight: 0,
    description: "",
    length: 0,
    width: 0,
    height: 0,
  });

  const [submitItem, { loading }] = useMutation(ADD_ITEM_MUTATION, {
    update(_, { data: { addItem: items } }) {
      setSave(true);
      setErrors({});
      props.history.push("/mystore/myItemsList");
      console.log("data", addItem);
      window.location.href = "/myStore/myItemsList";
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
      console.log(err.graphQLErrors[0]);
      setSave(true);
    },
    variables: values,
  });

  function addItem() {
    values.price = parseInt(values.price);
    values.stock = parseInt(values.stock);
    values.weight = parseInt(values.weight);
    values.length = parseInt(values.length);
    values.width = parseInt(values.width);
    values.height = parseInt(values.height);
    submitItem();
  }
  console.log(values);

  const showMessage = () => {
    if (isSaved) {
      console.log(errors);
      if (Object.keys(errors).length > 0) {
        return (
          <div className="ui error message">
            <ul className="list">
              {Object.values(errors).map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </div>
        );
      } else {
        return (
          <div className="ui positive message">
            <ul className="list">Updated</ul>
          </div>
        );
      }
    } else {
      return <div></div>;
    }
  };

  return (
    <Grid centered stackable>
      <Grid.Column width={12}>
        <Card fluid>
          <Card.Content header="Item Image" />
          <Card.Content>
            <Image
              rounded
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
              size="small"
              style={{ marginRight: 5 }}
            />
            <Image
              rounded
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
              size="small"
              style={{ marginRight: 5 }}
            />
            <Image
              rounded
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
              size="small"
              style={{ marginRight: 5 }}
            />
          </Card.Content>
          <Card.Content extra>
            <Button fluid color="standard" size="small">
              <Icon name="plus"></Icon>
              add Image
            </Button>
          </Card.Content>
        </Card>
        <Card fluid>
          <Card.Content header="Item Details" />
          <Card.Content extra>
            <Form
              size="small"
              onSubmit={onSubmit}
              className={loading ? "loading" : ""}
              noValidate
            >
              <Form.Input
                fluid
                placeholder="Item Name"
                label="Item Name"
                value={values.name}
                name="name"
                onChange={onChange}
              />
              <Form.Group inline>
                <Form.Field
                  fluid
                  placeholder="Category"
                  label="Category"
                  onChange={onChange}
                  name="category"
                  control="select"
                  value={values.category}
                >
                  <option value="-">-</option>
                  <option value="sparepart">Sparepart</option>
                  <option value="accessories">Accessories</option>
                  <option value="apparel">Apparel</option>
                </Form.Field>
                <Form.Field
                  fluid
                  placeholder="Condition"
                  label="Condition"
                  onChange={onChange}
                  name="condition"
                  control="select"
                  value={values.condition}
                >
                  <option value="-">-</option>
                  <option value="new">New</option>
                  <option value="used">Used</option>
                </Form.Field>
              </Form.Group>
              <Form.Input
                fluid
                iconPosition="left"
                placeholder="Item Description"
                label="Description"
                control={TextArea}
                value={values.description}
                name="description"
                onChange={onChange}
              />
              <Form.Group inline widths="equal">
                <Form.Input
                  fluid
                  placeholder="Rp"
                  label="Price"
                  value={values.price}
                  name="price"
                  type="number"
                  onChange={onChange}
                  min={1}
                />
                <Form.Input
                  fluid
                  placeholder="Amount Item"
                  label="Amount Item"
                  value={values.stock}
                  name="stock"
                  type="number"
                  onChange={onChange}
                  max={100}
                  min={1}
                />
              </Form.Group>
              <Form.Group inline widths="equal">
                <Form.Input
                  fluid
                  placeholder="kg"
                  label="Weight"
                  value={parseInt(values.weight)}
                  name="weight"
                  type="number"
                  onChange={onChange}
                  max={10}
                  min={1}
                />
                <Form.Input
                  fluid
                  placeholder="cm"
                  label="Length"
                  value={values.length}
                  name="length"
                  type="number"
                  onChange={onChange}
                  max={1000}
                  min={1}
                />
                <Form.Input
                  fluid
                  placeholder="cm"
                  label="Width"
                  value={values.width}
                  name="width"
                  type="number"
                  max={1000}
                  min={1}
                  onChange={onChange}
                />
                <Form.Input
                  fluid
                  placeholder="cm"
                  label="Height"
                  value={values.height}
                  name="height"
                  type="number"
                  onChange={onChange}
                  max={1000}
                  min={1}
                />
              </Form.Group>
              <Button fluid color="teal" size="small">
                Save Item
              </Button>
            </Form>
            {showMessage()}
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid>
  );
}

const ADD_ITEM_MUTATION = gql`
  mutation addItem(
    $name: String!
    $price: Int!
    $stock: Int!
    $category: String!
    $condition: String!
    $weight: Int!
    $description: String!
    $length: Int!
    $width: Int!
    $height: Int!
  ) {
    addItem(
      addItemInput: {
        name: $name
        price: $price
        stock: $stock
        category: $category
        condition: $condition
        weight: $weight
        description: $description
        dimension: { length: $length, width: $width, height: $height }
        images: [{ downloadUrl: "" }]
      }
    ) {
      id
      name
      price
      stock
      category
      condition
      weight
      description
      dimension {
        length
        width
        height
      }
      images {
        downloadUrl
      }
      createdAt
    }
  }
`;

export default AddItem;
