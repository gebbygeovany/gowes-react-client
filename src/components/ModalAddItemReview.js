import React, { useState } from "react";
import { Button, Modal, Header, Icon, Grid, Rating, Form, Image } from "semantic-ui-react";
import { useMutation } from '@apollo/react-hooks'

import { ADD_REVIEW_MUTATION } from '../util/graphql'
import { storage } from "../firebase";




function ModalAddItemReview({ item }) {
    const [errors, setErrors] = useState({})
    const [open, setOpen] = useState(false)
    const [rating, setRating] = useState({})
    const [body, setBody] = useState("")
    const [image, setImage] = useState([]);

    const handleRate = (e, { rating, maxRating }) => setRating({ rating, maxRating })

    const handleChange = (e, { name, value }) => setBody(value)

    console.log(typeof (image))

    const images = [
    ];

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
            itemId: item.id,
            images: images
        }
    })

    const fileInputRef = React.createRef();
    const fileChange = (e) => {
        const image = e.target.files[0];
        if (image) {
            const uploadTask = storage.ref(`images/${image.name}`).put(image);
            uploadTask.on(
                "state_changed",
                (snapshot) => { },
                (error) => {
                    console.log(error);
                },
                () => {
                    storage
                        .ref("images")
                        .child(image.name)
                        .getDownloadURL()
                        .then((url) => {
                            // setImage(url);
                            // setImage([image, ...url]);
                            setImage(img => [...img, url]);
                            console.log(url);
                        });
                }
            );
        }
    };

    image.forEach((image) => {
        images.push({
            downloadUrl: image,
        });
    });

    console.log(images)
    return (
        <Modal
            closeIcon
            open={open}
            trigger={<Button floated="right" size="tiny">Review Item</Button>}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            style={{ marginTop: 100 }}
        >
            <Header content='Review Item' />
            <Modal.Content>
                <Grid stackable>
                    <Grid.Row centered>
                        <Rating maxRating={5} onRate={handleRate} icon='star' size='massive' />
                    </Grid.Row>
                    <Grid.Column width={16} style={{paddingBottom:0}}>
                        <Form fluid>
                            <Form.TextArea
                                placeholder='Tell us about the product...'
                                onChange={handleChange}
                                value={body}
                                name={body}
                            />
                        </Form>
                        {image === "" ? (<></>) : (
                            <Image.Group size='tiny' style={{ marginTop: 20 }}>
                                {image &&
                                    image.map((image) => (
                                        <Image src={image} size='tiny' />
                                    ))}
                            </Image.Group>
                        )}

                    </Grid.Column>
                    <Grid.Column width={16} style={{paddingTop:0}}>
                        <Form>
                            <Button
                                fluid
                                onClick={() => fileInputRef.current.click()}
                                icon="plus"
                                content="Add Image"
                                disabled={image.length >= 5 ? true : false}
                            />
                            <input
                                ref={fileInputRef}
                                type="file"
                                hidden
                                onChange={fileChange}
                            />
                        </Form>
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