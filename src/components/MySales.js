import React, { useState } from 'react'
import { Button, Grid } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom'
import CardMySales from './CardMySales';

function MySales(props) {

    const [activeItem, setActiveItem] = useState("all")

    const handleItemClick = (e, { name }) => {
        setActiveItem(name)
    }

    var contentToShow

    contentToShow = <CardMySales filter={activeItem}></CardMySales>

    return (
        <>
            <Grid stackable>
                <Grid.Row>
                    <Grid columns={6} stackable centered>
                        <Grid.Column>
                            <Button
                                name='all'
                                onClick={handleItemClick}
                                color={activeItem === "all" ? "black" : ""}
                                size="tiny"
                                fluid
                                style={{ boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)' }}
                            >
                                All
                            </Button>
                        </Grid.Column>
                        <Grid.Column>
                            <Button
                                name='New Orders'
                                onClick={handleItemClick}
                                color={activeItem === "New Orders" ? "teal" : ""}
                                size="tiny"
                                fluid
                                style={{ boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)' }}
                            >
                                New Orders
                            </Button>
                        </Grid.Column>
                        <Grid.Column>
                            <Button
                                name='Ready to ship'
                                onClick={handleItemClick}
                                color={activeItem === "Ready to ship" ? "teal" : ""}
                                size="tiny"
                                fluid
                                style={{ boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)' }}
                            >
                                Ready to ship
                            </Button>
                        </Grid.Column>
                        <Grid.Column>
                            <Button
                                name='On delivery'
                                onClick={handleItemClick}
                                color={activeItem === "On delivery" ? "teal" : ""}
                                size="tiny"
                                fluid
                                style={{ boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)' }}
                            >
                                On delivery
                            </Button>
                        </Grid.Column>
                        <Grid.Column>
                            <Button
                                name='Order Arrived'
                                onClick={handleItemClick}
                                color={activeItem === "Order Arrived" ? "teal" : ""}
                                size="tiny"
                                fluid
                                style={{ boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)' }}
                            >
                                Order Arrived
                            </Button>
                        </Grid.Column>
                        <Grid.Column>
                            <Button
                                name='Canceled'
                                onClick={handleItemClick}
                                color={activeItem === "Canceled" ? "red" : ""}
                                size="tiny"
                                fluid
                                style={{ boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)' }}
                            >
                                Canceled
                            </Button>
                        </Grid.Column>
                        {/* <Grid.Column>
                            <Button
                                name='Order arrived'
                                onClick={handleItemClick}
                                color={activeItem === "Order arrived" ? "teal" : ""}
                                size="tiny"
                                fluid style={{ boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)' }}
                            >
                                Order Arrived
                            </Button>
                        </Grid.Column> */}
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

export default MySales