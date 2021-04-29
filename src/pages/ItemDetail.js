import React, { useContext, useState } from "react";
import { FETCH_ITEM_QUERY } from "../util/graphql";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Ref, Message, Button, Icon } from "semantic-ui-react";
import ItemTransactionCard from "../components/ItemTransactionCard";
import ManageItemSticky from "../components/ManageItemSticky";
import ItemDetailCard from "../components/ItemDetailCard";
import ItemImagesCard from "../components/ItemImagesCard";
import ItemReviewsCard from "../components/ItemReviewsCard";
import ReviewSummaryCard from "../components/ReviewSummaryCard";
import { AuthContext } from "../context/auth";
import { objectSize } from "../util/extensions";


function ItemDetail(props) {
  const itemId = props.props.match.params.itemId;
  const itemUserId = props.props.match.params.itemUserId;
  const context = useContext(AuthContext);
  const contextRef = React.createRef();
  const imageContextRef = React.createRef();
  const {
    loading,
    data: itemData,
    data: reviewData,
    data: chatData,
  } = useQuery(FETCH_ITEM_QUERY, {
    variables: {
      itemId: itemId,
      itemUserId: itemUserId,
      currentUserId: context.user
        ? context.user.id
        : "000000000000000000000000",
    },
  });
  const { getItem: item } = itemData ? itemData : [];
  const { getItemReviews: reviews } = reviewData ? reviewData : [];
  const { isChatExists } = chatData ? chatData : [];

  var [activeItem, setActiveItem] = useState("all");
    const handleItemClick = (e, { name }) => {
        setActiveItem(name);
    };


  if (activeItem !== "all"){
    activeItem = parseInt(activeItem, 10)
  }

  var reviewList = []

  if (reviews && activeItem === "all") {
    reviewList.push(reviews)
  }
  else if (reviews && reviews.find((reviews) => reviews.score === activeItem)) {
    reviewList.push(reviews.filter((reviews) => reviews.score === activeItem))
  }
  const reviewSize = objectSize(reviewList)

  console.log(reviewList)


  let postMarkup = <p>Loading item..</p>;

  if (!loading && item) {
    postMarkup = (
      <Ref innerRef={contextRef}>
        <Grid>
          <Grid.Column width={12}>
            <Grid.Row style={{ marginBottom: 30 }}>
              <Ref innerRef={imageContextRef}>
                <Grid>
                  <Grid.Column width={6}>
                    <ItemImagesCard
                      contextRef={imageContextRef}
                      images={item.images}
                    />
                  </Grid.Column>
                  <Grid.Column width={10} style={{ paddingTop: 50 }}>
                    <ItemDetailCard item={item} />
                  </Grid.Column>
                </Grid>
              </Ref>
            </Grid.Row>
            <Grid.Row style={{ marginBottom: 30 }}>
              <ReviewSummaryCard />
            </Grid.Row>
            <Grid.Row style={{ marginBottom: 30 }}>
              {/* <ReviewFilter /> */}
              <span style={{ marginRight: 20 }}>Filter</span>

              <Button
                name="all"
                onClick={handleItemClick}
                color={activeItem === "all" ? "teal" : ""}
              >
                All
            </Button>
              <Button
                name="1"
                onClick={handleItemClick}
                color={activeItem === 1 ? "teal" : ""}
              >
                <Icon name="star" ></Icon>
                1
            </Button>
              <Button
                name="2"
                onClick={handleItemClick}
                color={activeItem === 2 ? "teal" : ""}
              >
                <Icon name="star" ></Icon>
                2
            </Button>
              <Button
                name="3"
                onClick={handleItemClick}
                color={activeItem === 3 ? "teal" : ""}
              >
                <Icon name="star" ></Icon>
                3
            </Button>
              <Button
                name="4"
                onClick={handleItemClick}
                color={activeItem === 4 ? "teal" : ""}
              >
                <Icon name="star" ></Icon>
                4
            </Button>
              <Button
                name="5"
                onClick={handleItemClick}
                color={activeItem === 5 ? "teal" : ""}
              >
                <Icon name="star" ></Icon>
                5
            </Button>


            </Grid.Row>
            {reviewSize > 0 ? (
              <Grid.Row>
                {reviewList[0] &&
                  reviewList[0].map((reviewList) => (
                    <ItemReviewsCard reviews={reviewList} />
                  ))}
              </Grid.Row>
            ) : (
              <Grid.Row>
                <Message
                  error
                  icon="lightbulb"
                  header="Reviews not found"
                  content="There is no review on this item, try another filter"
                  style={{ marginBottom: 109 }}
                />
              </Grid.Row>
            )}

          </Grid.Column>
          <Grid.Column width={4}>
            {context.user ? (
              context.user.id !== item.user.id ? (
                <ItemTransactionCard
                  contextRef={contextRef}
                  item={item}
                  onChatVisible={props.onChatVisible}
                  isChatExists={isChatExists}
                />
              ) : (
                <ManageItemSticky contextRef={contextRef} item={item} />
              )
            ) : (
              <div></div>
            )}
          </Grid.Column>
        </Grid>
      </Ref>
    );
  }
  return postMarkup;
}

export default ItemDetail;
