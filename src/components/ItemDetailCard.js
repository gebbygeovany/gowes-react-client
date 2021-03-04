import React from 'react';
import { Container, Header, Icon, List, Image, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


function ItemDetailCard({ item }) {
    let itemDetailMarkup = (<p>Loading item..</p>)
    if (item) {
        itemDetailMarkup = (
            <Container>
                <Header as='h2'>{item.name}</Header>
                <List horizontal>
                    <List.Item>Terjual 10</List.Item>
                    <List.Item>
                    <Icon name='star' style={{ color: 'gold' }}/>
                    {" 5 (44 Ulasan)"}
                    </List.Item>
                </List>
                <Header as='h1'>Rp{item.price}</Header>
                <Container>
                    <List>
                    <List.Item>Condition: {item.condition}</List.Item>
                    <List.Item>Category: {item.category}</List.Item>
                    <List.Item>Weight: {item.weight} Gram</List.Item>
                    </List>
                </Container>
                <br></br>
                <Container>
                    <h4>Description</h4>
                    <p>{item.description}</p>
                </Container>
                <Divider />
                <Container>
                    <List horizontal>
                    <List.Item>
                        <Image
                        src='https://react.semantic-ui.com/images/wireframe/image-text.png'
                        as='a'
                        size='mini'
                        as={Link} to={`/sellerProfile/${item.user.id}`}
                        // target='_blank'
                        />
                    </List.Item>
                    <List.Item>
                        <Header as='h3' style={{color:'black'}}  >{item.user.seller.username}</Header>
                    </List.Item>
                    <List.Item>
                        <Icon name='star' style={{ color: 'gold' }}/>
                        {" 4.8 rating toko"}
                    </List.Item>
                    </List>
                </Container>
                <Divider />
            </Container>
        )
    }
    return itemDetailMarkup
}
export default ItemDetailCard