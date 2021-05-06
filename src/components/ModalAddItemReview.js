import React, { useState } from "react";
import { Button, Modal, Header, Icon, Grid, Rating, Form, Image } from "semantic-ui-react";
import { useMutation } from '@apollo/react-hooks'

import { ADD_REVIEW_MUTATION } from '../util/graphql'


function ModalAddItemReview({ item }) {
    const [errors, setErrors] = useState({})
    const [open, setOpen] = useState(false)
    const [rating, setRating] = useState({})
    const [body, setBody] = useState("")

    const handleRate = (e, { rating, maxRating }) => setRating({ rating, maxRating })

    const handleChange = (e, { name, value }) => setBody(value)

    console.log(typeof (item))

    const [addReview, { loading }] = useMutation(ADD_REVIEW_MUTATION, {
        update(_, { data: { addReview: reviewData } }) {
            setOpen(false)
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: {
            score: rating.rating,
            body: body,
            itemId: item.id
        }
    })

    console.log(item.id)
    return (
        <Modal
            closeIcon
            open={open}
            trigger={<Button floated="right" size="tiny">Review Item</Button>}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            style={{ marginTop: 100 }}
        >
            <Header icon='star outline' content='Review Item' />
            <Modal.Content>
                <Grid stackable>
                    <Grid.Row centered>
                        <Rating maxRating={5} onRate={handleRate} icon='star' size='massive' />
                        {/* <pre>{JSON.stringify(rating, null, 2)}</pre> */}
                    </Grid.Row>
                    <Grid.Column width={16}>
                        <Form fluid>
                            <Form.TextArea
                                placeholder='Tell us more about you...'
                                onChange={handleChange}
                                value={body}
                                name={body}
                            />
                        </Form>
                        <Image.Group size='tiny' style={{ marginTop: 20 }}>
                            <Image src='https://firebasestorage.googleapis.com/v0/b/gowes-marketplace-react.appspot.com/o/images%2Fgembok%20mtb.jpg?alt=media&token=8785f099-e180-4b28-b5fa-de9665e50fcf' size='tiny' />
                            <Image src='https://firebasestorage.googleapis.com/v0/b/gowes-marketplace-react.appspot.com/o/images%2FFrame%20Sepeda%20BMX.jpg?alt=media&token=50a39121-741a-42cb-b554-7d7ac230507e' size='tiny' />
                        </Image.Group>
                    </Grid.Column>
                    <Grid.Column width={16}>
                        <Button
                            style={{ marginTop: 0 }}
                            fluid
                            color="teal"
                            icon="plus"
                            content="Add Image"
                        >
                        </Button>
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
                    onClick={addReview}
                    positive
                    disabled={!rating.rating || body === "" ? true : false}
                />
            </Modal.Actions>
        </Modal>
    );
}

export default ModalAddItemReview