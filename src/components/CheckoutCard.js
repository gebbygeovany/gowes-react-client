import React from 'react';
import { Card, Header, Dropdown, Label, List } from 'semantic-ui-react';
import gql from 'graphql-tag'
import ItemCheckoutCard from './ItemCheckoutCard';


function CheckoutCard({ cartItem }) {

    console.log(cartItem)

    const options = [
        {
            key: 1,
            text: 'J&t REG',
            value: 1,
            content: (
                <>
                    {/* <Header as='h4'>J&t REG</Header>
                    <span>Rp10.000</span> */}
                    <List >
                        <List.Item>
                            <List.Content floated='right'>Rp10.000</List.Content>
                            <List.Content style={{ marginBottom: 5 }}><Header as='h5'>J&t REG</Header></List.Content>
                        </List.Item>
                    </List>
                </>
            ),
        },
        {
            key: 2,
            text: 'Si Cepat Halu',
            value: 2,
            content: (
                <>
                    <List >
                        <List.Item>
                            <List.Content floated='right'>Rp10.000</List.Content>
                            <List.Content style={{ marginBottom: 5 }}><Header as='h5'>Si Cepat Halu</Header></List.Content>
                        </List.Item>
                    </List>
                </>
            ),
        },
        {
            key: 3,
            text: 'Anter Aja',
            value: 3,
            content: (
                <>
                    <List >
                        <List.Item>
                            <List.Content floated='right'>Rp10.000</List.Content>
                            <List.Content style={{ marginBottom: 5 }}><Header as='h5'>Anter Aja</Header></List.Content>
                        </List.Item>
                    </List>
                </>
            ),
        },
    ]



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
            <Card.Content>
                <Label as='a' color='primary' ribbon='left' style={{ marginBottom: 10 }}>
                    Shipping
                </Label>
                <Dropdown selection fluid options={options} placeholder='Shipment' />
            </Card.Content>
        </Card>
    );
}


export default CheckoutCard;