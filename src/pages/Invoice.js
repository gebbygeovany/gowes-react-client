import React, { useContext } from "react";
import { Card, Grid, Table, List, Divider } from "semantic-ui-react";
import { useQuery } from "@apollo/react-hooks";

import { FETCH_USER_ORDER_QUERY } from "../util/graphql";
function Invoice() {
    const { loading, data } = useQuery(FETCH_USER_ORDER_QUERY);
    const { getUserOrders: orders } = data ? data : [];
    console.log(orders)

    return (
        <Grid>
            <Grid.Row></Grid.Row>
            <Grid.Column width={2}></Grid.Column>
            <Grid.Column width={12}>
                <Grid>
                    <Grid.Column width={10}>
                        <div className="logoInvoice" >Gowes</div>
                        <h4 style={{ marginBottom: 5, color: "teal" }}>Invoice Number: INV/20210615/MPL/1320932736 </h4>
                        <div>Published By: </div>
                        <div>Seller: John's </div>
                        <div>Date: 12-12-12</div>

                    </Grid.Column>
                    <Grid.Column width={6}>
                        <h3 style={{ marginBottom: 0 }}>Shipping Address: </h3>
                        <h4 style={{ marginBottom: 5, marginTop: 10, color: "teal" }}>Muhammad Gebby Geovany</h4>
                        <div>komplek pasanggrahan indah blok 17 no.8 Ujungberung Kota Bandung 40617</div>
                        <div>Bandung</div>
                        <div>081809195559</div>
                    </Grid.Column>
                </Grid>
                <br></br>

                <Table fixed>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Item Name</Table.HeaderCell>
                            <Table.HeaderCell>Amount</Table.HeaderCell>
                            <Table.HeaderCell>Weight</Table.HeaderCell>
                            <Table.HeaderCell>Price</Table.HeaderCell>
                            <Table.HeaderCell>Total Price</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>Stang Sepeda Road Bike</Table.Cell>
                            <Table.Cell>2</Table.Cell>
                            <Table.Cell>2</Table.Cell>
                            <Table.Cell>200000</Table.Cell>
                            <Table.Cell>200000</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Stang Sepeda Road Bike</Table.Cell>
                            <Table.Cell>2</Table.Cell>
                            <Table.Cell>2</Table.Cell>
                            <Table.Cell>200000</Table.Cell>
                            <Table.Cell>200000</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Stang Sepeda Road Bike</Table.Cell>
                            <Table.Cell>2</Table.Cell>
                            <Table.Cell>2</Table.Cell>
                            <Table.Cell>200000</Table.Cell>
                            <Table.Cell>200000</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell></Table.Cell>
                            <Table.Cell></Table.Cell>
                            <Table.Cell></Table.Cell>
                            <Table.Cell><h4>Subtotal</h4></Table.Cell>
                            <Table.Cell><h4>200000</h4></Table.Cell>
                        </Table.Row>


                    </Table.Body>
                </Table>

                <Grid>
                    <Grid.Column width={8}></Grid.Column>
                    <Grid.Column width={8}>
                        <Card fluid>
                            <Card.Content>
                                <List divided verticalAlign="middle">
                                    <List.Item>
                                        <List.Content floated="right">
                                            Rp200000
                                        </List.Content>
                                        <List.Content style={{ marginBottom: 5 }}>
                                            Item (x3)
                                        </List.Content>
                                        <List.Content floated="right">
                                            Rp200000
                                        </List.Content>
                                        <List.Content style={{ marginBottom: 5 }}>
                                            Shipping Cost
                                        </List.Content>
                                        <Divider />
                                        <List.Content floated="right" >
                                            <h4 style={{ color: "teal" }}>Rp200000</h4>
                                        </List.Content>
                                        <List.Content style={{ marginBottom: 5 }}>
                                            <h4 style={{ color: "teal" }}>Total Payment</h4>
                                        </List.Content>
                                    </List.Item>
                                </List>
                            </Card.Content>
                        </Card>

                    </Grid.Column>
                </Grid>
            </Grid.Column>
            <Grid.Column width={2}></Grid.Column>
        </Grid>
    )
}

export default Invoice