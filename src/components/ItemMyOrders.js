import React, { useState } from 'react'
import { Card, Grid, Image } from 'semantic-ui-react';

function ItemMyOrders() {

    return (
        <Card.Content>
            <Grid stackable>
                <Grid.Column width={2}>
                    <Image
                        fluid
                        centered
                        rounded
                        src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                        size='tiny'
                        style={{ margin: 10 }}
                    />
                </Grid.Column>
                <Grid.Column width={5} verticalAlign='middle'>
                    <Grid.Row><div>Item Name</div></Grid.Row>
                    <Grid.Row><h4 style={{ color: 'teal' }}>Shimano Tourney 7 Speed</h4></Grid.Row>
                </Grid.Column>
                <Grid.Column width={6} verticalAlign='middle'>
                    <Grid.Row><div>Price</div></Grid.Row>
                    <Grid.Row><h4 style={{ color: 'teal' }}>Rp50.000</h4></Grid.Row>
                </Grid.Column>
                <Grid.Column width={3} verticalAlign='middle'>
                    <Grid.Row><div>Amount Item</div></Grid.Row>
                    <Grid.Row><h4 style={{ color: 'teal' }}>3</h4></Grid.Row>
                </Grid.Column>
            </Grid>
        </Card.Content>
    )
}

export default ItemMyOrders