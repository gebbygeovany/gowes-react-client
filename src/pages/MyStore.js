import React from 'react'
import { Grid, Ref } from 'semantic-ui-react';

import SidebarStore from '../components/SidebarStore'
import MyStoreDetailsCard from '../components/MyStoreDetailsCard'
import MyItemList from '../components/MyItemList'
import MySales from '../components/MySales'



function MyStore(props) {

    const contextRef = React.createRef();

    const sidebarPosition = props.match.params.position;

    var contentToShow

    if (sidebarPosition === 'myStoreDetailsCard') {
        contentToShow = <MyStoreDetailsCard props={props}></MyStoreDetailsCard>
    } else if (sidebarPosition === 'myItemsList') {
        contentToShow = <MyItemList props={props}></MyItemList>
    } else if (sidebarPosition === 'salesList') {
        contentToShow = <MySales props={props}></MySales>
    }

    return (
        <Ref innerRef={contextRef}>
            <Grid stackable>
                <Grid.Column width={3}>
                    <br></br>
                    <SidebarStore contextRef={contextRef}></SidebarStore>
                </Grid.Column>
                <Grid.Column width={13}>
                    <br></br>
                    {contentToShow}
                </Grid.Column>
            </Grid>
        </Ref>
    )
}

export default MyStore