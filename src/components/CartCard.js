import React from 'react';
import { Card, Checkbox } from 'semantic-ui-react';
import gql from 'graphql-tag'
import ItemCartCard from '../components/ItemCartCard';


function CartCard({ cartItem }) {

    console.log(cartItem)

    
    // console.log(id)

    return (
        <Card fluid style={{ boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)' }}>
            <Card.Content>
                <Checkbox
                    label={cartItem[0].item.user.seller.username}
                    style={{ fontWeight: 1000 }}
                />
            </Card.Content>
            {cartItem &&
                cartItem.map((item) => (
                    <ItemCartCard item={item}></ItemCartCard>
                ))}
        </Card>
    );
}

const DELETE_CART_ITEM_MUTATION = gql`
    mutation deleteCartItem($cartId:ID!){
        deleteCartItem(cartId: $cartId)
    }
`

export default CartCard;