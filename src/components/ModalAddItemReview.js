import React, { useState } from "react";
import { Button, Modal, Header, Icon, Grid, Rating, Form, Image } from "semantic-ui-react";
import ItemMyOrders from "./ItemMyOrders";


function ModalAddItemReview(order) {
    const [open, setOpen] = React.useState(false)
    return (
        <Modal
            closeIcon
            open={open}
            trigger={<Button floated="right" size="small">Give Review</Button>}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            style={{marginTop:100}}
        >
            <Header icon='star outline' content='Review Item' />
            <Modal.Content>
                <Grid stackable>
                    <Grid.Row centered>
                        <Rating maxRating={5} defaultRating={3} icon='star' size='massive' />
                    </Grid.Row>
                    <Grid.Column width={16}>
                        <Form fluid>
                            <Form.TextArea
                                placeholder='Tell us more about you...'
                            />
                        </Form>
                        <Button
                            style={{ marginTop: 10 }}
                            fluid
                            color="teal"
                            icon="plus"
                            content="Add Image"
                        >
                        </Button>
                    </Grid.Column>
                    <Grid.Column width={16}>
                        <Image.Group size='tiny'>
                            <Image src='https://react.semantic-ui.com/images/avatar/large/molly.png' size='tiny' />
                            <Image src='https://react.semantic-ui.com/images/avatar/large/molly.png' size='tiny' />
                            <Image src='https://react.semantic-ui.com/images/avatar/large/molly.png' size='tiny' />
                        </Image.Group>
                    </Grid.Column>
                </Grid>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => setOpen(false)}>
                    Cancel
                </Button>
                <Button
                    content="Submit"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={() => setOpen(false)}
                    positive
                />
            </Modal.Actions>
        </Modal>
    );
}

export default ModalAddItemReview