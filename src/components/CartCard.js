import React, {useState} from 'react';
import { Card, Checkbox } from 'semantic-ui-react';
import gql from 'graphql-tag'
import ItemCartCard from '../components/ItemCartCard';

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { checkoutItems } from "../actions/orderAction";

function CartCard(props) {

    console.log(props.cartItem)

    const [checked, setChecked] = useState(false)

    const onChecked = (event, data) => {
        console.log("event", event)
        console.log("data", data)
        let carts = props.carts
        if (carts.length > 0) {
            if (carts.find(cart => cart.user.seller.username === data.label)) {
                carts = carts.filter(cart => cart.user.seller.username !== data.label)
            } else {
                const cart = {
                    user: props.cartItem[0].item.user, // data yang dibutuhkan : username, cityId
                    cartItems: props.cartItem
                }
                carts = [cart, ...carts]
            }
        } else {
            const cart = {
                user: props.cartItem[0].item.user, // data yang dibutuhkan : username, cityId
                cartItems: props.cartItem
            }
            carts = [cart, ...carts]
        }
        props.checkoutItems(carts)
        console.log(props.carts)
        setChecked(checked? false : true)


    }

    console.log(props.carts)


    // console.log(id)

    return (
        <Card fluid style={{ boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)' }}>
            <Card.Content>
                <Checkbox
                    label={props.cartItem[0].item.user.seller.username}
                    style={{ fontWeight: 1000 }}
                    onChange={onChecked}
                />
            </Card.Content>
            {props.cartItem &&
                props.cartItem.map((item) => (
                    <ItemCartCard item={item} checked={checked}></ItemCartCard>
                ))}
        </Card>
    );
}

const DELETE_CART_ITEM_MUTATION = gql`
    mutation deleteCartItem($cartId:ID!){
        deleteCartItem(cartId: $cartId)
    }
`

CartCard.propTypes = {
    checkoutItems: PropTypes.func.isRequired,
    carts: PropTypes.array,
};


const mapStateToProps = (state) => ({
    carts: state.orders.checkoutOrders,
});

export default connect(mapStateToProps, { checkoutItems })(CartCard);