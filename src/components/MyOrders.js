import React, { useState } from 'react'
import { Button, Grid } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom'
import CardMyOrders from './CardMyOrders'

function MyOrders(props) {

    const [activeItem, setActiveItem] = useState("all")

    const handleItemClick = (e, { name }) => {
        setActiveItem(name)
    }

    var contentToShow

    contentToShow = <CardMyOrders filter={activeItem}></CardMyOrders>

    return (
        <>
            <Grid stackable>
                <Grid.Row>
                    <Grid columns={6} stackable centered>
                        <Grid.Column>
                            <Button
                                name='all'
                                onClick={handleItemClick}
                                color={activeItem === "all" ? "teal" : ""}
                                size="tiny"
                                fluid
                                style={{ boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)' }}
                            >
                                All
                            </Button>
                        </Grid.Column>
                        <Grid.Column>
                            <Button
                                name='Waiting for payment'
                                onClick={handleItemClick}
                                color={activeItem === "Waiting for payment" ? "teal" : ""}
                                size="tiny"
                                fluid
                                style={{ boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)' }}
                            >
                                Waiting For Payment
                            </Button>
                        </Grid.Column>
                        <Grid.Column>
                            <Button
                                name='Waiting for confirmation'
                                onClick={handleItemClick}
                                color={activeItem === "Waiting for confirmation" ? "teal" : ""}
                                size="tiny"
                                fluid
                                style={{ boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)' }}
                            >
                                Waiting For Confirmation
                            </Button>
                        </Grid.Column>
                        <Grid.Column>
                            <Button
                                name='Order processed'
                                onClick={handleItemClick}
                                color={activeItem === "Order processed" ? "teal" : ""}
                                size="tiny"
                                fluid
                                style={{ boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)' }}
                            >
                                Order Processed
                            </Button>
                        </Grid.Column>
                        <Grid.Column>
                            <Button
                                name='Order shipped'
                                onClick={handleItemClick}
                                color={activeItem === "Order shipped" ? "teal" : ""}
                                size="tiny"
                                fluid
                                style={{ boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)' }}
                            >
                                Order Shipped
                            </Button>
                        </Grid.Column>
                        <Grid.Column>
                            <Button
                                name='Order arrived'
                                onClick={handleItemClick}
                                color={activeItem === "Order arrived" ? "teal" : ""}
                                size="tiny"
                                fluid style={{ boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)' }}
                            >
                                Order Arrived
                            </Button>
                        </Grid.Column>
                        {/* <Grid.Column>
                            <Button
                                name='order completed'
                                onClick={handleItemClick}
                                color={activeItem === "Order completed" ? "teal" : ""}
                                size="tiny"
                                fluid
                                style={{ boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)' }}
                            >Order Completed
                            </Button>
                        </Grid.Column> */}
                    </Grid>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column size={16}>
                        {contentToShow}
                        {contentToShow}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    )
}

export default MyOrders