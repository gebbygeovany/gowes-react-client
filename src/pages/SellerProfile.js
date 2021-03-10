import React from 'react';
import { Grid, Ref } from 'semantic-ui-react';
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks';

import SideBarSellerProfile from '../components/SideBarSellerProfile';
import ShopCard from '../components/ShopCard';

function SellerProfile(props) {

    const contextRef = React.createRef();

    const userId = props.match.params.userId;

    const { loading, data: itemData, data: userData } = useQuery(FETCH_SELLER_PROFILE_QUERY, {
        variables: {
            userId: userId
        }
    })
    const { getUser: user } = userData ? userData : []
    const { getSellerItems: items } = itemData ? itemData : []

    Object.size = function (obj) {
        var size = 0,
            key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };

    var size = Object.size(user)
    let postMarkup = (<p>Loading item..</p>);
    if (size > 0) {
        postMarkup = (
            <Ref innerRef={contextRef}>
                <Grid stackable>
                    <Grid.Column width={4}>
                        <SideBarSellerProfile contextRef={contextRef} user={user}></SideBarSellerProfile>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <br></br>
                        <Grid stackable columns={5}>
                            {items &&
                                items.map((item) => (
                                    <Grid.Column key={item.id} style={{ marginBottom: 20 }}>
                                        <ShopCard item={item} />
                                    </Grid.Column>
                                ))}
                        </Grid>
                    </Grid.Column>
                </Grid>
            </Ref>
        )
    }
    return postMarkup
}

const FETCH_SELLER_PROFILE_QUERY = gql`
    query($userId: ID!) {
        getUser(userId: $userId) {
            id
            email
            seller{
            id
            username
            avatar
            description
            description
            createdAt
            }
        }
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
                id
                address{
                    cityName
                }
                seller{
                    username
                }
            }
        }
    }

    
`;

export default SellerProfile