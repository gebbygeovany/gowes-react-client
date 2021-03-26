import React from "react";
import { Item, Container, Rating, List, Image } from "semantic-ui-react";
import "swiper/swiper.scss";

function ItemReviewsCard({ reviews }) {
  return (
    <Container>
      <Item.Group divided>
        {reviews.map((review) => (
          <Item>
            <Item.Image size="small" src={review.user.buyer.avatar} />
            <Item.Content>
              <Item.Header as="a">
                <Rating
                  disabled
                  maxRating={5}
                  defaultRating={review.score}
                  icon="star"
                  size="mini"
                />
              </Item.Header>
              <Item.Meta>
                <span className="cinema">{review.body}</span>
              </Item.Meta>
              <List horizontal>
                {review.images.map((image, index) => (
                  <Image
                    src={image.downloadUrl}
                    style={{ width: 60, height: 60 }}
                  />
                ))}
              </List>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Container>
  );
}
export default ItemReviewsCard;
