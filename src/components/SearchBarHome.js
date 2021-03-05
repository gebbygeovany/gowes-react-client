import React from 'react'
import { Input, Button, Icon } from 'semantic-ui-react'
import _ from 'lodash'
import { Link } from "react-router-dom";


function SearchBarHome(params) {
    function search() {
        window.location.href = '/search'
    }
    return (
        <Input
            fluid
            action={<Button onClick={search}>Search</Button>}
            placeholder='Search...'
            style={{ boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)' }}
            size="big"
        />
    )
}

export default SearchBarHome