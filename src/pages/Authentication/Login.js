import React, { useContext, useState } from 'react'
import { Button, Form, Grid, Header, Segment, Message } from 'semantic-ui-react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'


import { AuthContext } from '../../context/auth'
import { useForm } from '../../util/hooks'

function Login(props) {
    const context = useContext(AuthContext)
    const [errors, setErrors] = useState({})

    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        email: '',
        password: '',
    })

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, { data: { login: userData } }) {
            userData.name = userData.buyer.name;
            context.login(userData)
            // props.history.push('/')
            window.location.href = '/'

        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    })

    function loginUserCallback() {
        loginUser()
    }

    return (
        <Grid textAlign='center' style={{ height: '100vh', marginTop: 100 }}>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header textAlign='center'>
                    <span className="logoLogin">Login to your account</span>
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
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            name="password"
                            value={values.password}
                            error={errors.password ? true : false}
                            onChange={onChange}
                        />

                        <Button secondary fluid size='large'>
                            Login
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    New to us? <a href='/register'>Sign Up</a>
                </Message>
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

const LOGIN_USER = gql`
  mutation login(
    $email: String!
    $password: String!
  ) {
    login(
        email: $email
        password: $password
    ) {
      id
      email
      buyer {
          name
      }
      token
    }
  }
`

export default Login;