import React, { useState } from 'react';
import { Card, Sticky, Dropdown, Divider, Button, List, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import PaymentButton from "../components/PaymentButton";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { CREATE_PAYMENT_QUERY, ADD_ORDER } from "../util/graphql";

function ItemSummaryCheckout({ contextRef, items }) {
    const [errors, setErrors] = useState({})

    const { loading, data } = useQuery(CREATE_PAYMENT_QUERY);
    const { createPayment: payment } = data ? data : [];

    let itemIds = [];
    items.map((item) => {
        itemIds = [...itemIds, item.item.id];
    });

    const [addOrder] = useMutation(ADD_ORDER, {
        update(_, { data: { addOrder: orderData } }) {
            // userData.name = userData.buyer.name;
            // context.login(userData)
            // // props.history.push('/')
            // window.location.href = '/'

        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: { itemIds: itemIds, state: "CONFIRMATION", shipping: "tiki" }
    })






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
                            {/* <PaymentButton /> */}
                            <Button fluid color="teal" onClick={addOrder}>
                                Pay
                            </Button>
                        </Card.Content>
                    </Card>
                </Sticky>

            )}
        </>

    )
}
export default ItemSummaryCheckout