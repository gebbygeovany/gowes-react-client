import React from "react";
import { Item, Card, Rating, List, Image, Modal } from "semantic-ui-react";
import "swiper/swiper.scss";

function ItemReviewsCard({ reviews }) {
  const [open, setOpen] = React.useState(false);


  const body = "Pertama beli semoga cocok dan bagus catnya bakal langganan dehh karna harga dan kualitas barang passs"

  return (
    <Card fluid style={{ boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)" }}>
      <Item.Group divided>
        {/* {reviews.map((review) => ( */}
        <Item>

          <Item.Image circular size="small" src="https://react.semantic-ui.com/images/avatar/large/molly.png" />
          <Item.Content>
            <Item.Header as="a">
              <Rating
                disabled
                maxRating={5}
                defaultRating="3"
                icon="star"
                size="mini"
              />
            </Item.Header>
            <Item.Meta>
              <span className="cinema">{body}</span>
            </Item.Meta>
            <List horizontal>
              {/* {review.images.map((image, index) => ( */}
              <Modal
                closeIcon
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                size='small'
                trigger={
                  <Image
                    src="https://firebasestorage.googleapis.com/v0/b/gowes-marketplace-react.appspot.com/o/images%2FFork%20Sepeda%20MTB.jpg?alt=media&token=5d23bf80-fc22-436f-a885-8712dc02f478"
                    style={{ width: 60, height: 60, marginRight: 10 }}
                    rounded
                  />
                }
              >

                <Modal.Content>
                  <Image 
                    src="https://firebasestorage.googleapis.com/v0/b/gowes-marketplace-react.appspot.com/o/images%2FFork%20Sepeda%20MTB.jpg?alt=media&token=5d23bf80-fc22-436f-a885-8712dc02f478"
                    rounded
                    centered
                  />
                </Modal.Content>

              </Modal>
              <Modal
                closeIcon
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                size='small'
                trigger={
                  <Image
                    src="https://firebasestorage.googleapis.com/v0/b/gowes-marketplace-react.appspot.com/o/images%2FFork%20Sepeda%20MTB.jpg?alt=media&token=5d23bf80-fc22-436f-a885-8712dc02f478"
                    style={{ width: 60, height: 60, marginRight: 10 }}
                    rounded
                  />
                }
              >

                <Modal.Content>
                  <Image 
                    src="https://react.semantic-ui.com/images/avatar/large/molly.png"
                    rounded
                    centered
                  />
                </Modal.Content>

              </Modal>
              <Modal
                closeIcon
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                size='small'
                trigger={
                  <Image
                    src="https://firebasestorage.googleapis.com/v0/b/gowes-marketplace-react.appspot.com/o/images%2FFork%20Sepeda%20MTB.jpg?alt=media&token=5d23bf80-fc22-436f-a885-8712dc02f478"
                    style={{ width: 60, height: 60, marginRight: 10 }}
                    rounded
                  />
                }
              >

                <Modal.Content>
                  <Image 
                    src="https://firebasestorage.googleapis.com/v0/b/gowes-marketplace-react.appspot.com/o/images%2FFork%20Sepeda%20MTB.jpg?alt=media&token=5d23bf80-fc22-436f-a885-8712dc02f478"
                    rounded
                    centered
                  />
                </Modal.Content>

              </Modal>
              {/* ))} */}
            </List>
          </Item.Content>
        </Item>
        {/* // ))} */}
      </Item.Group>
    </Card>
  );
}
export default ItemReviewsCard;
