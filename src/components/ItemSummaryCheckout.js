import React, { useState } from 'react';
import { Card, Sticky, Dropdown, Divider, Button, List, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import PaymentButton from "../components/PaymentButton";
import { useQuery } from "@apollo/react-hooks";
import { CREATE_PAYMENT_QUERY } from "../util/graphql";

function ItemSummaryCheckout({ contextRef }) {
    const { loading, data } = useQuery(CREATE_PAYMENT_QUERY);
    const { createPayment: payment } = data ? data : [];
    console.log(payment)

    return (
        <>
            {loading ? (
                <h1>Loading checkout..</h1>
            ) : (
                <Sticky context={contextRef} offset={130}>
                    <Card fluid style={{ boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)' }}>
                        <Card.Content header="Shopping Summary" />
                        <Card.Content>
                            <List divided verticalAlign='middle'>
                                <List.Item>
                                    <List.Content floated='right'>Rp100.000</List.Content>
                                    <List.Content style={{ marginBottom: 5 }}>Item (x2)</List.Content>
                                    <List.Content floated='right'>10.000</List.Content>
                                    <List.Content style={{ marginBottom: 5 }}>Shipping Cost</List.Content>
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
                            <PaymentButton />
                        </Card.Content>
                    </Card>
                </Sticky>

            )}
        </>

    )
}
export default ItemSummaryCheckout