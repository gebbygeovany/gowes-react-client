import React, { useState } from 'react'
import { Button, Card, Grid } from 'semantic-ui-react';

import ItemMyOrders from './ItemMyOrders'

function CardMyOrders({ filter }) {

    return (
        <Card fluid style={{ boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)' }}>
            <Card.Content><h5>27 Desember 2020</h5></Card.Content>
            <Card.Content>
                <Grid stackable>
                    <Grid.Column width={7}>
                        <Grid.Row><h4 style={{ color: 'teal' }}>Gebby's Store</h4></Grid.Row>
                        <Grid.Row>(INV/20201229/XX/XII/712589793)</Grid.Row>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Grid.Row><div>Status</div></Grid.Row>
                        <Grid.Row><h4 style={{ color: 'teal' }}>{filter}</h4></Grid.Row>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <Grid.Row><div>Sub Total</div></Grid.Row>
                        <Grid.Row><h4 style={{ color: 'teal' }}>Rp50.000</h4></Grid.Row>
                    </Grid.Column>
                </Grid>
            </Card.Content>
            <ItemMyOrders></ItemMyOrders>
            <ItemMyOrders></ItemMyOrders>
            <Card.Content>
                <Button floated='right' size='small' color='teal'>See Details</Button>
            </Card.Content>
        </Card>
    )
}

export default CardMyOrders