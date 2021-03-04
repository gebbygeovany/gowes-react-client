import React, { useContext, useState } from 'react'
import { Button, Form, Grid, Header, Segment, Message } from 'semantic-ui-react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { AuthContext } from '../../context/auth'
import { useForm } from '../../util/hooks'

function Register(props) {
    const context = useContext(AuthContext)
    const [errors, setErrors] = useState({})

    const { onChange, onSubmit, values } = useForm(registerUser, {
        name: '',
        password: '',
        confirmPassword: '',
        email: '',
    })

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, { data: { register: userData } }) {
            context.login(userData)
            props.history.push('/')
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    })

    function registerUser() {
        addUser()
    }

    return (
        <Grid textAlign='center' style={{ height: '100vh', marginTop: 100 }}>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header color='standard' textAlign='center'>
                    <span className="logoLogin">Register account</span>
                </Header>
                <Form size='large' onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
                    <Segment style={{ boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)' }}>
                        <Form.Input
                            fluid
                            icon='mail'
                            iconPosition='left'
                            placeholder='Email'
                            name="email"
                            value={values.email}
                            error={errors.email ? true : false}
                            onChange={onChange}
                        />
                        <Form.Input
                            fluid
                            icon='user'
                            iconPosition='left'
                            placeholder='Name'
                            name="name"
                            value={values.name}
                            error={errors.name ? true : false}
                            onChange={onChange}
                        />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            name="password"
                            value={values.password}
                            error={errors.password ? true : false}
                            onChange={onChange}
                        />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Confirm Password'
                            type='password'
                            name="confirmPassword"
                            value={values.confirmPassword}
                            error={errors.confirmPassword ? true : false}
                            onChange={onChange}
                        />

                        <Button color='secondary' fluid size='large'>
                            Register
                        </Button>
                    </Segment>
                </Form>
                {Object.keys(errors).length > 0 && (
                    <div className='ui error message'>
                        <ul className="list">
                            {Object.values(errors).map(value => (
                                <li key={value}>{value}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </Grid.Column>
        </Grid>
    )
}

const REGISTER_USER = gql`
  mutation register(
    $name: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        name: $name
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
        id
        email
        token
    }
  }
`

export default Register;