import React, { useState } from 'react';
import { Card, Sticky, Dropdown, Form, Radio } from 'semantic-ui-react';

function FilterBarHome({ contextRef }) {

    const  [checked, setChecked]  = useState("new")

    const handleChange = (e, { value }) => {
        setChecked(value)
    }

    console.log(checked)

    const friendOptions = [
        {
            key: 'Jenny Hess',
            text: 'Jenny Hess',
            value: 'Jenny Hess',
            // image: { avatar: true, src: '/images/avatar/small/jenny.jpg' },
        },
        {
            key: 'Elliot Fu',
            text: 'Elliot Fu',
            value: 'Elliot Fu',
            // image: { avatar: true, src: '/images/avatar/small/elliot.jpg' },
        },
        {
            key: 'Stevie Feliciano',
            text: 'Stevie Feliciano',
            value: 'Stevie Feliciano',
            // image: { avatar: true, src: '/images/avatar/small/stevie.jpg' },
        },
    ]



    return (
        <>
            <Sticky context={contextRef} offset={120}>
                <h4>Filter</h4>
                <Card style={{ boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)' }}>
                    <Card.Content>
                        <h5>Category</h5>
                        <Dropdown
                            placeholder='Select Category'
                            fluid
                            selection
                            options={friendOptions}
                        />
                    </Card.Content>
                    <Card.Content>
                        <h5>Origin</h5>
                        <Dropdown
                            placeholder='Select City'
                            fluid
                            selection
                            options={friendOptions}
                        />
                    </Card.Content>
                    <Card.Content>
                        <h5>Condition</h5>
                        <Form>
                            <Form.Field>
                                <Radio
                                    label='New'
                                    name='new'
                                    value='new'
                                    checked={checked === 'new' ? true : false}
                                    onChange={handleChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Radio
                                    label='Used'
                                    name='used'
                                    value='used'
                                    checked={checked === 'used' ? true : false}
                                    onChange={handleChange}
                                />
                            </Form.Field>
                        </Form>
                    </Card.Content>
                    <Card.Content>
                        <h5>Price</h5>
                        <Dropdown
                            placeholder='Sort Price'
                            fluid
                            selection
                            options={friendOptions}
                        />
                    </Card.Content>
                </Card>
            </Sticky>
        </>
    )


}

export default FilterBarHome