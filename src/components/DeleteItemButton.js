import React, { useState, useContext } from "react";
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag'
import { Icon, Button, Confirm, Popup } from 'semantic-ui-react'

import { FETCH_POSTS_QUERY } from '../util/graphql';
import { AuthContext } from '../context/auth';


function DeleteButton({ itemId }) {

    const context = useContext(AuthContext);
    const [confirmOpen, setConfirmOpen] = useState(false)

    console.log(itemId)

    const [deleteItem] = useMutation(DELETE_ITEM_MUTATION, {
        update(proxy, result) {
            setConfirmOpen(false)
            // TODO: remove post cache

            const data = proxy.readQuery({
                query: FETCH_ITEM_SELLER_QUERY,
                variables: { userId: context.user.id }
            })

            proxy.writeQuery({
                query: FETCH_ITEM_SELLER_QUERY,
                data: {
                    getSellerItems: data.getSellerItems.filter(p => p.id !== itemId)
                }
            })

        },
        variables: { itemId: itemId }
    })

    function itemDelete() {
        deleteItem()
        window.location.href = '/myStore/myItemsList'
    }

    return (
        <>
            <Button animated='fade' color="red" onClick={() => setConfirmOpen(true)}>
                <Button.Content visible>
                    <Icon name="trash" />
                </Button.Content>
                <Button.Content hidden style={{ borderRadius: 8 }}>
                    Delete Item
                </Button.Content>
            </Button>

            <Confirm
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={itemDelete}
            />
        </>
    )
}

const DELETE_ITEM_MUTATION = gql`
    mutation deleteItem($itemId:ID!){
        deleteItem(itemId:$itemId)
    }
`

const FETCH_ITEM_SELLER_QUERY = gql`
  query($userId: ID!) {
    getSellerItems(userId: $userId){
    id
    name
    price
    createdAt
    description
    weight
    images{
      id
      downloadUrl
    }
    bookmarkedBy{
      id
      userId
      createdAt
    }
    user{
      seller{
        username
      }
    }
  }
  }
`;


export default DeleteButton