import React, { useState } from 'react';
import { Card, Grid, Form, Checkbox, Image, Button, Icon, List, Input } from 'semantic-ui-react';
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { Link } from 'react-router-dom';



function ItemCheckoutCard({ item }) {


    return (
        <>
            <Card.Content>
                <Grid doubling>
                    <Grid.Column width={2} verticalAlign="middle" style={{ padding: 5, marginLeft: 10 }} >
                        <Image
                            fluid
                            centered
                            rounded
                            src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                            size='small'
                            as={Link} to={`/items/${item.item.id}`}
                        />
                    </Grid.Column>
                    <Grid.Column width={13} style={{ marginTop: 5 }}>
                        <Grid.Row><h4 >{item.item.name}</h4></Grid.Row>
                        <Grid.Row style={{ marginTop: 5 }}>
                            <h4 style={{ color: 'teal' }}>Rp{item.item.price}</h4>
                        </Grid.Row>
                        <Grid.Row style={{ marginTop: 5 }}>
                           <div>2 item (10gr) </div>
                        </Grid.Row>
                    </Grid.Column>
                </Grid>
            </Card.Content>
        </>
    );
}
export default ItemCheckoutCard;