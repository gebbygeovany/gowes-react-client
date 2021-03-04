import React, { useContext, useState } from "react";
import {
  Card,
  Image,
  Grid,
  Button,
  Form,
  TextArea,
  Icon,
} from "semantic-ui-react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";

function ProfileCard(props) {
  const context = useContext(AuthContext);
  console.log("userid@profileCard: ", context.user.id);
  const { loading, data } = useQuery(FETCH_USER_QUERY, {
    variables: {
      userId: context.user.id,
    },
  });
  const { getUser: currentUser } = data ? data : [];

  const [avatar] = useState(
    "https://react.semantic-ui.com/images/avatar/large/molly.png"
  );

  return (
    <>
      {loading ? (
        <h1>Loading posts..</h1>
      ) : (
        <Card
          fluid
          style={{ boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)" }}
          className={loading ? "loading" : ""}
        >
          <Card.Content header="Profile Details" />
          <Card.Content>
            <Grid stackable>
              <Grid.Column width={5}>
                <Card centered>
                  <Image
                    src={loading ? avatar : currentUser.buyer.avatar}
                    wrapped
                    ui={false}
                  />
                </Card>
              </Grid.Column>
              <Grid.Column width={11}>
                <Form
                  size="small"
                  noValidate
                  className={loading ? "loading" : ""}
                >
                  <Form.Input
                    readOnly
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="Name"
                    label="Name"
                    value={currentUser.buyer.name}
                    name="name"
                  />
                  <Form.Input
                    readOnly
                    fluid
                    icon="mail"
                    iconPosition="left"
                    placeholder="Email"
                    label="Email"
                    value={currentUser.email}
                    name="email"
                  />
                  <Form.Input
                    readOnly
                    fluid
                    icon="phone"
                    iconPosition="left"
                    placeholder="Phone Number"
                    label="Phone Number"
                    value={currentUser.email}
                    name="phone"
                  />
                  <Form.Input
                    readOnly
                    fluid
                    icon="calendar"
                    iconPosition="left"
                    placeholder="Birth Date"
                    label="Birth Date"
                    name="birthDate"
                    value={currentUser.buyer.birthDate}
                  />
                  <Form.Input
                    readOnly
                    fluid
                    placeholder="City"
                    label="Address"
                    name="city"
                    value={currentUser.address.cityName}
                  />
                  <Form.Input
                    readOnly
                    fluid
                    placeholder="Districts"
                    name="districts"
                    value={currentUser.address.district}
                  />
                  <Form.Input
                    readOnly
                    fluid
                    placeholder="Postal Code"
                    name="postalCode"
                    value={currentUser.address.postalCode}
                  />
                  <Form.Input
                    readOnly
                    fluid
                    placeholder="Address Details"
                    name="addressDetails"
                    control={TextArea}
                    value={currentUser.address.detail}
                  />
                  <Button
                    floated="right"
                    color="teal"
                    size="small"
                    as={Link}
                    to="/editProfileCard"
                  >
                    <Icon name="edit outline"></Icon>
                    Edit
                  </Button>
                </Form>
              </Grid.Column>
            </Grid>
          </Card.Content>
        </Card>
      )}
    </>
  );
}
const FETCH_USER_QUERY = gql`
  query getUser($userId: ID!) {
    getUser(userId: $userId) {
      id
      email
      phone
      address {
        cityName
        cityId
        district
        postalCode
        detail
      }
      balance
      buyer {
        name
        birthDate
        avatar
      }
    }
  }
`;

export default ProfileCard;
