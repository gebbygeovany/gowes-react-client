import React, { useState } from 'react';
import { Card, Sticky, Grid, Divider, Button, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom'


function ItemSummaryCard({ contextRef }) {
    return (
        <Sticky context={contextRef} offset={130}>
            <Card fluid style={{ boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)' }}>
                <Card.Content header="Shopping Summary" />
                <Card.Content>
                    <List divided verticalAlign='middle'>
                        <List.Item>
                            <List.Content floated='right'>Rp50.000</List.Content>
                            <List.Content style={{ marginBottom: 5 }}>Item</List.Content>
                            <List.Content floated='right'>Rp100.000</List.Content>
                            <List.Content style={{ marginBottom: 5 }}>Item (x2)</List.Content>
                            <List.Content floated='right'>Rp50.000</List.Content>
                            <List.Content style={{ marginBottom: 5 }}>Item</List.Content>
                        </List.Item>
                    </List>
                    <Divider />
                    <List divided verticalAlign='middle'>
                        <List.Item>
                            <List.Content floated='right'>Rp200.000</List.Content>
                            <List.Content style={{ marginBottom: 5 }}><h4>Sub Total</h4></List.Content>
                        </List.Item>
                    </List>
                </Card.Content>
                <Card.Content extra>
                    <Button fluid color="teal" as={Link} to="/checkout">Checkout</Button>
                </Card.Content>
            </Card>
        </Sticky>
    )
}
export default ItemSummaryCard