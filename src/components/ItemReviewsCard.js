import React from "react";
import { Item, Card, Rating, List, Image, Modal, Button } from "semantic-ui-react";
import "swiper/swiper.scss";

function ItemReviewsCard({ reviews }) {

  const [open, setOpen] = React.useState(false);
  const [img, setImg] = React.useState("");

  function handleClick(src) {
    setImg(src)
    setOpen(true)
  }


  const body = "Pertama beli semoga cocok dan bagus catnya bakal langganan dehh karna harga dan kualitas barang pass"

  return (
    <Card fluid style={{ boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)" }}>
      <Item.Group divided>
        <Item>

          {/* <Item.Image style={{marginBottom}} circular size="tiny"  src={reviews.user.buyer.avatar} /> */}
          <Image rounded style={{ width: 100, height: 60, marginTop: 10, marginLeft: 10 }} src={reviews.user.buyer.avatar}></Image>
          <Item.Content>
            <Item.Header as='a' style={{ marginTop: 8 }}>{reviews.user.buyer.name}</Item.Header>
            <br></br>
            <Item.Header as="a">
              <Rating
                disabled
                maxRating={5}
                defaultRating={reviews.score}
                icon="star"
                size="mini"
              />
            </Item.Header>
            <Item.Meta>
              <span className="cinema">{reviews.body}</span>
            </Item.Meta>
            <List horizontal>
              {reviews.images.map((image, index) => (
                <Button
                  style={{ padding: 0, marginRight: 15, marginBottom: 20 }}
                  onClick={() => handleClick(`${image.downloadUrl}`)}
                  className
                >
                  <Image
                    src={image.downloadUrl}
                    style={{ width: 60, height: 60 }}
                    rounded
                  />
                </Button>
              ))}

              <Modal
                closeIcon
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                size='small'
              >
                <Modal.Content>
                  <Image
                    src={img}
                    rounded
                    centered
                    size="medium"
                  />
                </Modal.Content>
              </Modal>

            </List>
          </Item.Content>
        </Item>
      </Item.Group>
    </Card>
  );
}
export default ItemReviewsCard;
