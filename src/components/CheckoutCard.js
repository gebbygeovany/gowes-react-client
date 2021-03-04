import React from 'react';
import { Card, Checkbox } from 'semantic-ui-react';
import gql from 'graphql-tag'
import ItemCheckoutCard from './ItemCheckoutCard';


function CheckoutCard({ cartItem }) {

    console.log(cartItem)


    // console.log(id)

    return (
        <Card fluid style={{ boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)' }}>
            <Card.Content>
                <h4>{cartItem[0].item.user.seller.username}</h4>
            </Card.Content>
            {cartItem &&
                cartItem.map((item) => (
                    <ItemCheckoutCard item={item}></ItemCheckoutCard>
                ))}
        </Card>
    );
}

const DELETE_CART_ITEM_MUTATION = gql`
    mutation deleteCartItem($cartId:ID!){
        deleteCartItem(cartId: $cartId)
    }
`

export default CheckoutCard;