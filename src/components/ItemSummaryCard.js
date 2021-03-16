import React, { useState, useEffect } from 'react';
import { Card, Sticky, Grid, Divider, Button, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { checkoutItems } from "../actions/orderAction";

function ItemSummaryCard(props) {

    const [subTotal, setSubTotal] = useState(0)

    let total = 0

    useEffect(() => {
        props.carts.map((cart) => {
            cart.cartItems.map((cartItem) => {
                const price = parseInt(cartItem.item.price)
                total += price * cartItem.amountItem
                // const amount = item
                console.log(cartItem.amountItem)

            })
        })
        setSubTotal(total)
        console.log(typeof (subTotal))
        console.log(total)
    }, [props.carts])


    return (
        <Sticky context={props.contextRef} offset={130}>
            <Card fluid style={{ boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)' }}>
                <Card.Content header="Shopping Summary" />
                <Card.Content>
                    {/* <List divided verticalAlign='middle'>
                        <List.Item>
                            
                            <List.Content floated='right'>Rp100.000</List.Content>
                            <List.Content style={{ marginBottom: 5 }}>Item (x2)</List.Content>
                            
                        </List.Item>
                    </List>
                    <Divider /> */}
                    <List divided verticalAlign='middle'>
                        <List.Item>
                            <List.Content floated='right'>Rp {subTotal}</List.Content>
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

ItemSummaryCard.propTypes = {
    checkoutItems: PropTypes.func.isRequired,
    carts: PropTypes.array,
};
const mapStateToProps = (state) => ({
    carts: state.orders.checkoutOrders,
});

export default connect(mapStateToProps, { checkoutItems })(ItemSummaryCard);
