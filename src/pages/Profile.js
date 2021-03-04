import React from 'react'
import { Grid, Ref } from 'semantic-ui-react';

import SidebarProfile from '../components/SidebarProfile'
import ProfileCard from '../components/ProfileCard'
import MyOrders from '../components/MyOrders'



function Profile(props) {
    const contextRef = React.createRef();
    const sidebarPosition = props.match.params.position;

    var contentToShow

    if (sidebarPosition === 'profileCard') {
        contentToShow = <ProfileCard props={props}></ProfileCard>
    } else if (sidebarPosition === 'myOrders') {
        contentToShow = <MyOrders props={props}></MyOrders>
    }

    return (
        <Ref innerRef={contextRef}>
            <Grid stackable>
                <Grid.Column width={3}>
                    <br></br>
                    <SidebarProfile contextRef={contextRef}></SidebarProfile>
                </Grid.Column>
                <Grid.Column width={13}>
                    <br></br>
                    {contentToShow}
                </Grid.Column>
            </Grid>
        </Ref>
    )
}

export default Profile