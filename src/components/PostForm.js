import React, { useState } from 'react'
import { Button, Form } from "semantic-ui-react";
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { FETCH_POSTS_QUERY } from '../util/graphql'


import { useForm } from "../util/hooks";

export default function PostForm() {

    const [errors, setErrors] = useState({})

    const { values, onChange, onSubmit } = useForm(createPostCallback, {
        body: '',
    })

    const [createPost] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(proxy, result) {
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            })
            proxy.writeQuery({
                query: FETCH_POSTS_QUERY,
                data: {
                    getPosts: [result.data.createPost, ...data.getPosts]
                }
            })
            values.body = ''
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
    })

    function createPostCallback() {
        createPost();
    }

    return (
        <div>
            <Form onSubmit={onSubmit}>
                <h2>Create a post:</h2>
                <Form.Field>
                    <Form.Input
                        placeholder="Hi World!"
                        name="body"
                        onChange={onChange}
                        value={values.body}
                        error={errors.body ? true : false}
                    />
                    <Button type="submit" color="teal">
                        Submit
            </Button>
                </Form.Field>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className='ui error message'style={{marginBottom: "20px"}}>
                    <ul className="list" >
                        {Object.values(errors).map(value => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

const CREATE_POST_MUTATION = gql`
mutation createPost(
  $body: String!
) {
  createPost(
      body: $body
  ) {
    id
    body
    createdAt
    username
    likes{
        id username createdAt
    }
    likeCount 
    commentCount
    comments{
        id 
        username 
        createdAt 
        body
    }
  }
}
`