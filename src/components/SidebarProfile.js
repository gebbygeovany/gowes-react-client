import React, { useState } from 'react'
import { Sticky, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom'



function SidebarProfile({ contextRef }) {

    const [activeItem, setActiveItem] = useState('profile')

    const handleItemClick = (e, { name }) => setActiveItem(name)

    return (
        <Sticky context={contextRef} offset={130}>
            <Menu pointing vertical fluid style={{ boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)' }}>
                <Menu.Item
                    name='profile'
                    active={activeItem === 'profile'}
                    onClick={handleItemClick}
                    as={Link}
                    to="/profile/profileCard"
                />
                <Menu.Item
                    name='orders'
                    active={activeItem === 'orders'}
                    onClick={handleItemClick}
                    as={Link}
                    to="/profile/myOrders"
                />
                <Menu.Item
                    name='bookmarked'
                    active={activeItem === 'bookmarked'}
                    onClick={handleItemClick}
                    as={Link}
                    to="/wishList"
                />
            </Menu>
        </Sticky>
    )
}

export default SidebarProfile