import React, { useContext, useState } from 'react';
import { Card, Image, Grid, Button, Form, TextArea, Icon } from 'semantic-ui-react';
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks';
import { Link, withRouter } from 'react-router-dom';


import { AuthContext } from '../context/auth';


function MyStoreDetailsCard(props) {

    const context = useContext(AuthContext);

    const { loading, data } = useQuery(FETCH_USER_QUERY, {
        variables: {
            userId: context.user.id
        }
    })
    const { getUser: currentUser } = data ? data : []

    const [avatar] = useState('https://react.semantic-ui.com/images/avatar/large/molly.png');

    return (
        <>
            {loading || currentUser.seller.username === "" ? (
                <>
                    <Card fluid>
                        <Card.Content header='My Store' />
                        <Card.Content extra>
                            <Button fluid color="teal" name='user' as={Link} to="/editMyStoreDetailsCard">Activate My Store</Button>
                        </Card.Content>
                    </Card>
                    <br></br><br></br><br></br><br></br><br></br>
                </>
            ) : (
                    <Card fluid style={{ boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)' }}>
                        <Card.Content header='My Store Detail' />
                        <Card.Content>
                            <Grid stackable >
                                <Grid.Column width={5}>
                                    <Card centered>
                                        <Image src={loading ? avatar : currentUser.seller.avatar} wrapped ui={false} />
                                    </Card>
                                </Grid.Column>
                                <Grid.Column width={11}>
                                    <Form size='small' noValidate className={loading ? "loading" : ""}>
                                        <Form.Input
                                            readOnly
                                            fluid
                                            placeholder='Store Name'
                                            label='Store Name'
                                            value={currentUser.seller.username}
                                            name="username"
                                        />
                                        <Form.Input
                                            readOnly
                                            fluid
                                            iconPosition='left'
                                            placeholder='Store Description'
                                            label='Description'
                                            control={TextArea}
                                            value={currentUser.seller.description}
                                            name="description"
                                        />
                                        <Button color='teal' size='small' as={Link} to="/editMyStoreDetailsCard" floated="right">
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

export default withRouter(MyStoreDetailsCard)