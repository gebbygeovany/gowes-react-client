import React, { useContext, useState } from "react";
import { Card, Image, Grid, Button, Form, TextArea } from "semantic-ui-react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { storage } from "../firebase";
import { useForm } from "../util/hooks";
import { withRouter } from "react-router-dom";
import { AuthContext } from "../context/auth";
import { FETCH_USER_QUERY, UPDATE_PROFILE_MUTATION } from "../util/graphql";

function EditProfileCard(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  // const [kota, setKota] = useState({});
  const [kotaName, setKotaName] = useState("");
  const [kotaId, setKotaId] = useState("");
  const [isKotaSet, setIsKota] = useState(false);

  const [isSaved, setSave] = useState(false);

  const { loading, data: userData, data: cityData } = useQuery(
    FETCH_USER_QUERY,
    {
      variables: {
        userId: context.user.id,
      },
    }
  );
  const { getUser: currentUser } = userData ? userData : [];
  const { getCities: cities } = cityData ? cityData : [];

  if (!loading && !isKotaSet) {
    setKotaName(currentUser.address.cityName);
    setKotaId(currentUser.address.cityId);
    setIsKota(true);
  }
  const handleChange = (event) => {
    setKotaName(event.target.value.split("-")[0]);
    setKotaId(event.target.value.split("-")[1]);
  };

  let userObj = {
    avatar: "",
    name: "",
    email: "",
    phone: "",
    birthDate: "",
    // city: "",
  };

  if (currentUser) {
    userObj = {
      // avatar: "",
      name: currentUser.buyer.name,
      email: currentUser.email,
      phone: currentUser.phone,
      birthDate: currentUser.buyer.birthDate,
      // cityName: currentUser.address.cityName,
      district: currentUser.address.district,
      postalCode: currentUser.address.postalCode,
      detail: currentUser.address.detail,
      // city: kota,
    };
  }

  let { onChange, onSubmit, values } = useForm(updateUserProfile, userObj);

  console.log(values.cityId);

  const fileInputRef = React.createRef();
  const [avatar, setAvatar] = useState(
    "https://react.semantic-ui.com/images/avatar/large/molly.png"
  );

  const fileChange = (e) => {
    const image = e.target.files[0];
    if (image) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // // Observe state change events such as progress, pause, and resume
          // // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          // var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log('Upload is ' + progress + '% done');
          // switch (snapshot.state) {
          //   case firebase.storage.TaskState.PAUSED: // or 'paused'
          //     console.log('Upload is paused');
          //     break;
          //   case firebase.storage.TaskState.RUNNING: // or 'running'
          //     console.log('Upload is running');
          //     break;
          },
          (error) => {
            console.log(error);
          },
            () => {
              storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then((url) => {
                  setAvatar(url);
                  // setAvatar([url, ...avatar]);
                  console.log(url);
                });
            }
      );
    }
  };

  const [updateProfile] = useMutation(UPDATE_PROFILE_MUTATION, {
    update(_, { data: { updateUserProfile: userData } }) {
      userData.name = userData.buyer.name;
      context.login(userData);
      setSave(true);
      setErrors({});
      props.history.push("/profile/profileCard");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
      setSave(true);
    },
    variables: {
      ...values,
      cityName: kotaName,
      cityId: kotaId,
      avatar: avatar,
    },
  });

  console.log(values);

  function updateUserProfile() {
    // values.avatar = avatar;
    // let cityValue = kotaName.split("-")
    // setKotaName(cityValue[0])
    // setKotaId(cityValue[1])
    updateProfile();
  }

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
                  <Card.Content extra>
                    <Form>
                      <Button
                        fluid
                        onClick={() => fileInputRef.current.click()}
                      >
                        Change Avatar
                      </Button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        hidden
                        onChange={fileChange}
                      />
                    </Form>
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column width={11}>
                <Form
                  size="small"
                  onSubmit={onSubmit}
                  noValidate
                  className={loading ? "loading" : ""}
                >
                  <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="Name"
                    label="Name"
                    value={values.name}
                    name="name"
                    onChange={onChange}
                  />
                  <Form.Input
                    fluid
                    icon="mail"
                    iconPosition="left"
                    placeholder="Email"
                    label="Email"
                    value={values.email}
                    name="email"
                    onChange={onChange}
                    error={errors.email ? true : false}
                  />
                  <Form.Input
                    fluid
                    icon="phone"
                    iconPosition="left"
                    placeholder="Phone Number"
                    label="Phone Number"
                    value={values.phone}
                    name="phone"
                    onChange={onChange}
                    error={errors.phone ? true : false}
                  />
                  <Form.Input
                    fluid
                    icon="calendar"
                    iconPosition="left"
                    placeholder="Birth Date"
                    label="Birth Date"
                    name="birthDate"
                    value={values.date}
                    type="date"
                    onChange={onChange}
                  />
                  {/* <Form.Select
                    fluid
                    placeholder="City"
                    label="Address"
                    name="city"
                    // value={values.city}
                    onChange={handleChange}
                    options={options}
                    search
                    selection
                  /> */}
                  <Form.Select
                    fluid
                    placeholder="City"
                    label="City"
                    onChange={handleChange}
                    name="city"
                    control="select"
                    value={`${kotaName}-${kotaId}`}
                    search
                    selection
                  >
                    <option>-</option>
                    {cities &&
                      cities.map((city) => (
                        <>
                          <option
                            value={
                              city.type +
                              " " +
                              city.city_name +
                              "-" +
                              city.city_id
                            }
                          >
                            {city.city_name + " " + city.type}
                          </option>
                        </>
                      ))}
                  </Form.Select>
                  <Form.Input
                    fluid
                    placeholder="Districts"
                    name="district"
                    value={values.district}
                    onChange={onChange}
                  />
                  <Form.Input
                    fluid
                    placeholder="Postal Code"
                    name="postalCode"
                    value={values.postalCode}
                    onChange={onChange}
                  />
                  <Form.Input
                    fluid
                    placeholder="Address Details"
                    name="detail"
                    value={values.detail}
                    onChange={onChange}
                    control={TextArea}
                  />
                  <Button color="teal" size="small" floated="right">
                    Save
                  </Button>
                  {showMessage()}
                </Form>
              </Grid.Column>
            </Grid>
          </Card.Content>
        </Card>
      )}
    </>
  );
}

export default withRouter(EditProfileCard);
