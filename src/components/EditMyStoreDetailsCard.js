import React, { useContext, useState } from 'react';
import { Card, Image, Grid, Button, Form, TextArea, Icon } from 'semantic-ui-react';
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks';
import { storage } from '../firebase';
import { useForm } from '../util/hooks'
import { withRouter } from 'react-router-dom';


import { AuthContext } from '../context/auth';


function EditMyStoreDetailsCard(props) {

    const context = useContext(AuthContext);

    const [isSaved, setSave] = useState(false)

    const [errors, setErrors] = useState({})

    const { loading, data } = useQuery(FETCH_USER_QUERY, {
        variables: {
            userId: context.user.id
        }
    })
    const { getUser: currentUser } = data ? data : []


    const fileInputRef = React.createRef();
    const [avatar, setAvatar] = useState('https://react.semantic-ui.com/images/avatar/large/molly.png');

    const fileChange = e => {
        const image = e.target.files[0]
        if (image) {
            const uploadTask = storage.ref(`images/${image.name}`).put(image);
            uploadTask.on(
                "state_changed",
                snapshot => { },
                error => { console.log(error) },
                () => {
                    storage
                        .ref("images")
                        .child(image.name)
                        .getDownloadURL()
                        .then(url => {
                            setAvatar(url);
                            console.log(url);
                        });
                });
        }
    };
    console.log("File chosen --->", avatar);

    let userObj = {
        avatar: '',
        username: currentUser.seller.username,
        description: currentUser.seller.description
    }

    let { onChange, onSubmit, values } = useForm(updateSellerProfile, userObj)

    const [sellerProfileUpdate, { }] = useMutation(UPDATE_SELLER_PROFILE_MUTATION, {
        update(_, { data: { updateSellerProfile: sellerData } }) {
            sellerData.username = sellerData.seller.username;
            context.login(sellerData)
            setSave(true)
            setErrors({})
            props.history.push('/myStore/myStoreDetailsCard')
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
            setSave(true)
        },

        variables: values
    })

    const showMessage = () => {
        if (isSaved) {
            console.log(errors)
            if (Object.keys(errors).length > 0) {
                return (<div className='ui error message'>
                    <ul className="list">
                        {Object.values(errors).map(value => (<li key={value}>{value}</li>))}
                    </ul>
                </div>)
            } else {
                return (
                    <div className='ui positive message'>
                        <ul className="list">
                            Updated
                        </ul>
                    </div>
                )
            }

        } else {
            return <div></div>
        }
    }

    function updateSellerProfile() {
        values.avatar = avatar
        sellerProfileUpdate()
    }


    return (
        <>
            {loading ? (
                <h1>Loading posts..</h1>
            ) : (

                    <Card fluid style={{ boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)' }}>
                        <Card.Content header='My Store Detail Form' />
                        <Card.Content>
                            <Grid stackable >
                                <Grid.Column width={5}>
                                    <Card centered>
                                        <Image src={loading ? avatar : currentUser.seller.avatar} wrapped ui={false} />
                                        <Card.Content extra>
                                            <Form>
                                                <Button fluid onClick={() => fileInputRef.current.click()}>Change Avatar</Button>
                                                <input ref={fileInputRef} type="file" hidden onChange={fileChange} />
                                            </Form>
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>
                                <Grid.Column width={11}>
                                    <Form size='small' onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
                                        <Form.Input
                                            fluid
                                            placeholder='Store Name'
                                            label='Store Name'
                                            value={values.username}
                                            name="username"
                                            onChange={onChange}
                                            error={errors.username ? true : false}
                                        />
                                        <Form.Input
                                            fluid
                                            iconPosition='left'
                                            placeholder='Store Description'
                                            label='Description'
                                            control={TextArea}
                                            value={values.description}
                                            name="description"
                                            onChange={onChange}
                                        />
                                        <Button color='teal' size='small' floated="right">
                                            <Icon name="check circle outline"></Icon>
                                            Save
                                        </Button>
                                    </Form>
                                    {showMessage()}
                                </Grid.Column>
                            </Grid>
                        </Card.Content>
                    </Card>
                )}

        </>
    )
}

const FETCH_USER_QUERY = gql`
    query getUser($userId: ID!) {
        getUser(userId: $userId) {
            id
            email
            seller{
            id
            username
            avatar
            description
            description
            createdAt
            }
        }
    }
`

const UPDATE_SELLER_PROFILE_MUTATION = gql`
    mutation updateSellerProfile(
        $username: String!
        $avatar: String!
        $description: String!
    ){
        updateSellerProfile(
            sellerProfileInput:{
            username: $username
            avatar: $avatar
            description: $description
            }
        ) {
            id
            token
            seller{
                id
                username
                avatar
                description
                createdAt
            }
        }
    }
`

export default withRouter(EditMyStoreDetailsCard)