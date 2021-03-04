import React from 'react';
import { Grid, Ref, Message, Card } from 'semantic-ui-react';
import { useQuery } from '@apollo/react-hooks';

import CheckoutCard from '../components/CheckoutCard';
import ItemSummaryCheckout from '../components/ItemSummaryCheckout';
import { FETCH_USER_CART_QUERY } from '../util/graphql';


function Checkout() {
    const contextRef = React.createRef();

    const { loading, data, refetch } = useQuery(FETCH_USER_CART_QUERY)
    let { getUserCartItems: cartItems } = data ? data : []

    console.log(cartItems)

    Object.size = function (obj) {
        var size = 0,
            key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };

    var size = Object.size(cartItems)

    let cartMarkup = (
        <>
            <br></br>
            <Grid.Column width={16}><h1>Checkout</h1></Grid.Column>
            <>
                <Message
                    error
                    icon='cart'
                    header='You dont have items in cart'
                    content='add items to cart'
                    style={{ marginBottom: 202 }}
                />
            </>
        </>
    )
    if (!loading) {
        if (size > 0) {
            let group = cartItems.reduce((r, a) => {
                r[a.item.user.id] = [...r[a.item.user.id] || [], a];
                return r;
            }, {});
            console.log(group)

            Object.keys(group).map(function (key, index) {
                console.log(group[key])
            })
            cartMarkup = (
                <Ref innerRef={contextRef}>
                    <Grid stackable>
                        <Grid.Column width={16}><h2>Checkout</h2></Grid.Column>
                        <Grid.Column width={12} >
                            <h3>Shipping Address</h3>
                            <Card fluid color="teal">
                                <Card.Content>
                                    <h4>Muhammad Gebby Geovany</h4>
                                    <div>081809195559</div>
                                    <p>komplek pasanggrahan indah blok 17 no.8 Ujungberung, Kota Bandung, 40617</p>
                                </Card.Content>
                            </Card>
                            <h3>Items</h3>
                            {group &&
                                Object.keys(group).map((key, index) =>
                                (
                                    <CheckoutCard cartItem={group[key]}></CheckoutCard>
                                )
                                )
                            }
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <ItemSummaryCheckout contextRef={contextRef}></ItemSummaryCheckout>
                        </Grid.Column>
                    </Grid>
                </Ref>
            )
        }


    }
    return cartMarkup
}

export default Checkout;