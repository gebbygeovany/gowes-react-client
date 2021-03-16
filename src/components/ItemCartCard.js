import React, { useState, useEffect } from 'react';
import { Card, Grid, Form, Checkbox, Image, Button, Icon, List, Input } from 'semantic-ui-react';
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { Link } from 'react-router-dom';


import { FETCH_USER_CART_QUERY } from '../util/graphql';
import DeleteFromCartButton from './DeleteFromCartButton';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { checkoutItems } from "../actions/orderAction";

function ItemCartCard(props) {

    const [amountItem, setAmountItem] = useState(props.item.amountItem)
    const [errors, setErrors] = useState({})

    useEffect(() => {
        let carts = props.carts
        let cartObj
        let cartItemObj
        let indexCartObj
        let indexCartItemObj
        carts.map((cart, indexCart) => {
            console.log(cart.user.seller.username, props.item.item.user.seller.username)
            if (cart.user.seller.username === props.item.item.user.seller.username) {
                indexCartObj = indexCart
                cart.cartItems.map((cartItem, indexCartItem) => {
                    if (cartItem.item.id === props.item.item.id) {
                        indexCartItemObj = indexCartItem
                        cartItemObj = cartItem
                        cartItemObj = { ...cartItemObj,'amountItem': parseInt(amountItem) }
                        console.log(cartItemObj)
                        return
                    }
                })
                cartObj = cart
                cartObj.cartItems[indexCartItemObj] = cartItemObj
                return
            }
        })
        carts[indexCartObj] = cartObj
        // console.log(carts)
        props.checkoutItems(carts)
    }, [amountItem])

    // console.log(props.item.item.stock)

    // console.log(props.item.name)

    const [deleteItemCart] = useMutation(DELETE_CART_ITEM_MUTATION, {
        update(proxy, result) {
            // TODO: remove post cache
            const data = proxy.readQuery({
                query: FETCH_USER_CART_QUERY
            })
            proxy.writeQuery({
                query: FETCH_USER_CART_QUERY,
                data: {
                    getUserCartItems: data.getUserCartItems.filter(cart => cart.id !== props.item.id)
                }
            })
        },
        variables: { cartId: props.item.id }
    })


    return (
        <>
            <Card.Content>
                <Grid doubling>
                    <Grid.Column width={1} verticalAlign='middle'></Grid.Column>

                    <Grid.Column width={2} verticalAlign="middle" style={{ padding: 5 }} >
                        <Image
                            fluid
                            centered
                            rounded
                            src={
                                props.item.item.images.length > 0
                                    ? props.item.item.images[0].downloadUrl
                                    : "https://react.semantic-ui.com/images/avatar/large/molly.png"
                            }
                            size='small'
                            as={Link} to={`/items/${props.item.item.id}`}
                        />
                    </Grid.Column>
                    <Grid.Column width={13} style={{ marginTop: 5 }}>
                        <Grid.Row><h4 >{props.item.item.name}</h4></Grid.Row>
                        <Grid.Row style={{ marginTop: 5 }}>
                            <h4 style={{ color: 'teal' }}>Rp{props.item.item.price}</h4>
                        </Grid.Row>
                        <Grid.Row style={{ marginTop: 5 }}>
                            <Grid>
                                <Grid.Column width={10}>
                                    <Form size="small">
                                        <Form.Group>
                                            <Form.Input
                                                placeholder='Add Notes'
                                                name='notes'
                                            // value={notes}
                                            // onChange={this.handleChange}
                                            />
                                            {/* <Form.Button size="mini" content='Submit' /> */}
                                        </Form.Group>
                                    </Form>
                                </Grid.Column>
                                <Grid.Column width={6}>
                                    {/* <Icon onClick={deleteItemCart} size="large" color="grey" name="trash" style={{ marginRight: 40 }}></Icon> */}
                                    <DeleteFromCartButton item={props.item}></DeleteFromCartButton>
                                    <List horizontal>
                                        <List.Item>
                                            <Button
                                                onClick={() => { setAmountItem(amountItem - 1) }}
                                                disabled={amountItem === 1}
                                                disabled={amountItem <= 1}
                                                size="mini"
                                                secondary icon="minus"
                                            />
                                        </List.Item>
                                        <List.Item>
                                            <Input
                                                transparent
                                                placeholder='1'
                                                value={amountItem}
                                                style={{ width: 18 }} />
                                        </List.Item>
                                        <List.Item>
                                            <Button
                                                onClick={() => { setAmountItem(amountItem + 1) }}
                                                size="mini"
                                                secondary icon="plus"
                                                disabled={amountItem >= props.item.item.stock}
                                            />
                                        </List.Item>
                                        {/* <List.Item>{`Stok  ${item.stock}`}</List.Item> */}
                                    </List>
                                </Grid.Column>
                            </Grid>
                        </Grid.Row>
                    </Grid.Column>
                </Grid>
            </Card.Content>
        </>
    );
}
const DELETE_CART_ITEM_MUTATION = gql`
    mutation deleteCartItem($cartId:ID!){
        deleteCartItem(cartId: $cartId)
    }
`

ItemCartCard.propTypes = {
    checkoutItems: PropTypes.func.isRequired,
    carts: PropTypes.array,
};


const mapStateToProps = (state) => ({
    carts: state.orders.checkoutOrders,
});

export default connect(mapStateToProps, { checkoutItems })(ItemCartCard);