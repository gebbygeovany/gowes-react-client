import React, { useState } from 'react'
import { Sticky, Menu, Card, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom'



function SidebarStore({ contextRef }) {


    const [activeItem, setActiveItem] = useState("My Store")

    const handleItemClick = (e, { name }) => setActiveItem(name)

    return (
        <Sticky context={contextRef} offset={130}>
            <Menu pointing vertical fluid style={{ boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)' }}>
                <Menu.Item
                    name='My Store'
                    active={activeItem === 'My Store'}
                    onClick={handleItemClick}
                    as={Link}
                    to="/mystore/myStoreDetailsCard"
                />
                <Menu.Item
                    name='Items'
                    active={activeItem === 'Items'}
                    onClick={handleItemClick}
                    as={Link}
                    to="/mystore/myItemsList"
                />
                <Menu.Item
                    name='Sales'
                    active={activeItem === 'Sales'}
                    onClick={handleItemClick}
                    as={Link}
                    to="/mystore/salesList"
                />
            </Menu>
            <Card style={{ boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)' }}>
                <Card.Content>
                    <List divided verticalAlign="middle">
                        <List.Item>
                            <List.Content style={{ marginBottom: 5 }}>
                                <div >Balance</div>
                            </List.Content>
                            <List.Content>
                                <h3>Rp0</h3>
                            </List.Content>

                        </List.Item>
                    </List>
                </Card.Content>
            </Card>
        </Sticky>
    )
}

export default SidebarStore