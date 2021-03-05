import React from 'react'
import { Input, Menu, Dropdown, Card } from 'semantic-ui-react'
import _ from 'lodash'

function SearchBarHome(params) {
    return (
        <Input
            icon={{ name: 'search', circular: true, link: true }}
            placeholder='Search...'
            style={{ boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)' }}
            fluid
            size="big"
        />
    )
}

export default SearchBarHome