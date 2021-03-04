import React from 'react'
import { Input, Menu, Dropdown } from 'semantic-ui-react'
import _ from 'lodash'

const getOptions = (number, prefix = 'Choice ') =>
  _.times(number, (index) => ({
    key: index,
    text: `${prefix}${index}`,
    value: index,
  }))

function FilterBar(params) {
    return (
        <Menu style={{ boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)' }}>
            <Menu.Item>
                <Dropdown
                    placeholder='Kategori'
                    scrolling
                    options={getOptions(15)}
                />
            </Menu.Item>
            <Menu.Item>
                <Dropdown
                    placeholder='Lokasi'
                    scrolling
                    options={getOptions(15)}
                />
            </Menu.Item>

            <Menu.Item position='right'>
                <Input
                    action={{ type: 'submit', content: 'Cari' }}
                    placeholder='Cari Barang...'
                />
            </Menu.Item>
        </Menu>
    )
}

export default FilterBar