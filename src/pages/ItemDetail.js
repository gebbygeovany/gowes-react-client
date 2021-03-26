import React, { useContext } from "react";
import { FETCH_ITEM_QUERY } from "../util/graphql";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Ref } from "semantic-ui-react";
import ItemTransactionCard from "../components/ItemTransactionCard";
import ManageItemSticky from "../components/ManageItemSticky";
import ItemDetailCard from "../components/ItemDetailCard";
import ItemImagesCard from "../components/ItemImagesCard";
import ItemReviewsCard from "../components/ItemReviewsCard";
import ReviewSummaryCard from "../components/ReviewSummaryCard";
import { AuthContext } from "../context/auth";

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
            <Grid.Row>
              <ItemReviewsCard reviews={reviews} />
            </Grid.Row>
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
