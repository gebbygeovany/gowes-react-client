import React from 'react';
import { Card, Grid, Image, Icon, Container, Button, Sticky } from 'semantic-ui-react';

function SideBarSellerProfile({ contextRef, user }) {

    return (
        <>
            <Sticky context={contextRef} offset={120}>
                <Card style={{ boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)' }}>
                    <Card.Content>
                        <Grid stackable>
                            <Grid.Column width={7}>
                                <Image
                                    fluid
                                    centered
                                    rounded
                                    src={user.seller.avatar}
                                />
                            </Grid.Column>
                            <Grid.Column width={9} style={{ paddingLeft: 0, marginTop: 5 }}>
                                <h5 style={{ marginBottom: 5 }}>{user.seller.username}</h5>
                                <Icon style={{ marginBottom: 10 }} name="map marker alternate" color="grey"></Icon> Bandung
                                <div>Joined in 2019</div>
                            </Grid.Column>
                        </Grid>
                    </Card.Content>
                    <Card.Content>
                        <h5>Description:</h5>
                        <Container textAlign='justified'>
                            <p>
                                Khusus Sepeda, Pembelian lebih dari satu diwajibkan untuk melakukan transaksi per-masing2 satu sepeda. contoh: 1 sepeda, 1 transaksi. 2 sepeda dipisah per-1 transaksi berbeda
                        </p>
                        </Container>
                    </Card.Content>
                    <Card.Content extra>
                        <Button animated fluid>
                            <Button.Content visible>
                                <Icon name="chat" />{" Chat"}
                            </Button.Content>
                            <Button.Content hidden style={{ borderRadius: 8 }}>
                                Chat the seller?
                            </Button.Content>
                        </Button>
                    </Card.Content>
                </Card>
            </Sticky>
        </>
    )


}

export default SideBarSellerProfile