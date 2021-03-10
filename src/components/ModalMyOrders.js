import React from 'react'
import { Button, Divider, Grid, Modal, List } from 'semantic-ui-react'

import ItemMyOrders from './ItemMyOrders'


function ModalMyOrders({ filter }) {
    const [open, setOpen] = React.useState(false)

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            trigger={<Button floated='right' size='small' color='teal'>See Orders</Button>}
            style={{ marginTop: 70 }}
            size="small"
            closeIcon
        >
            <Modal.Content scrolling>
                <Modal.Description>
                    <Grid stackable>
                        <Grid.Column width={16} textAlign="center"><h4>Order Details</h4></Grid.Column>
                        <Grid.Column width={16} textAlign="center"></Grid.Column>
                        <Grid.Column width={12} style={{ paddingTop: 10, paddingLeft: 20 }}>
                            <div>Invoice Number</div>
                            <h5 style={{ marginTop: 5, marginBottom: 10, color: "teal" }}>INV/20210302/XXI/III/767167447</h5>
                            <div>Status</div>
                            <h5 style={{ marginTop: 5, marginBottom: 10 }}>{filter}</h5>
                            <div>Store Name</div>
                            <h5 style={{ marginTop: 5, marginBottom: 10, color: "teal" }}>Jon's Store</h5>
                            <div>Order Date</div>
                            <h5 style={{ marginTop: 5, marginBottom: 10 }}>2 Mar 2021, 09:22 WIB</h5>
                        </Grid.Column>
                        <Grid.Column width={4} style={{ paddingTop: 10 }}>
                            <Button.Group vertical floated="right" style={{ paddingRight: 10 }}>
                                <Button fluid color="teal" compact>Give Review</Button>
                                <Button fluid compact>Chat Seller</Button>
                            </Button.Group>
                        </Grid.Column>
                    </Grid>
                </Modal.Description>

                <Divider />

                <Modal.Description>
                    <h5 width={8} style={{ paddingLeft: 10, margin: 0 }}>Item list</h5>
                    <ItemMyOrders></ItemMyOrders>
                    <ItemMyOrders></ItemMyOrders>
                </Modal.Description>

                <Divider />

                <Modal.Description>
                    <Grid stackable>
                        <Grid.Column width={10}>
                            <h5 width={8} style={{ paddingLeft: 10, marginBottom: 10 }}>Address</h5>
                            <h5 style={{ paddingLeft: 10, marginTop: 5, marginBottom: 3, color: "teal" }}>Muhammad Gebby Geovany</h5>
                            <div style={{ paddingLeft: 10, marginBottom: 0 }}>
                                komplek pasanggrahan indah blok 17 no.8
                                </div>
                            <div style={{ paddingLeft: 10, marginBottom: 0 }}>
                                Ujung Berung
                            </div>
                            <div style={{ paddingLeft: 10, marginBottom: 0 }}>
                                Kota Bandung
                            </div>
                            <div style={{ paddingLeft: 10, marginBottom: 0 }}>
                                40617
                            </div>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <h5 width={8} style={{ paddingLeft: 10, marginBottom: 10 }}>Shipping Info</h5>
                            <h5 style={{ paddingLeft: 10, marginTop: 5, marginBottom: 3, color: "teal" }}>SiCepat - Regular Package</h5>
                            <div style={{ paddingLeft: 10, marginBottom: 10 }}>AWB num : 000444958166</div>
                        </Grid.Column>
                    </Grid>
                </Modal.Description>

                <Divider />

                <Modal.Description>
                    <h5 width={8} style={{ paddingLeft: 10, margin: 0 }}>Payment</h5>
                    <List divided verticalAlign='middle' style={{ paddingLeft: 10, paddingRight: 10 }}>
                        <List.Item>
                            <List.Content floated='right'>Rp100.000</List.Content>
                            <List.Content style={{ marginBottom: 5 }}>Item (x2)</List.Content>
                            <List.Content floated='right'>Rp10.000</List.Content>
                            <List.Content style={{ marginBottom: 5 }}>Shipping Cost</List.Content>
                            <List.Content floated='right' style={{ color: "teal", fontWeight: 1000 }}>Rp110.000</List.Content>
                            <List.Content style={{ marginBottom: 5 }}>Total Payment</List.Content>
                            <List.Content floated='right'>BCA Virtual Account</List.Content>
                            <List.Content style={{ marginBottom: 5 }}>Total Payment</List.Content>
                        </List.Item>
                    </List>
                </Modal.Description>

                <br></br>


            </Modal.Content>

        </Modal>
    )
}

export default ModalMyOrders
