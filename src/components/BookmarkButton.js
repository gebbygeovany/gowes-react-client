import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Icon, Button } from "semantic-ui-react";

import MyPopup from "./MyPopup";
import { FETCH_BOOKMARKS_QUERY } from "../util/graphql";

function BookmarkButton({ user, item: { id, bookmarkedBy } }) {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    if (
      user.user &&
      bookmarkedBy.find((bookmark) => bookmark.userId === user.user.id)
    ) {
      setBookmarked(true);
    } else {
      setBookmarked(false);
    }
  }, [user, bookmarkedBy]);

  const [errors, setErrors] = useState({});

  const [bookmarkPost] = useMutation(BOOKMARK_ITEM_MUTATION, {
    variables: { itemId: id },
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_BOOKMARKS_QUERY,
      });

      if (!bookmarked) {
        proxy.writeQuery({
          query: FETCH_BOOKMARKS_QUERY,
          data: {
            getBookmarks: [result.data.bookmarkItem, ...data.getBookmarks],
          },
        });
      } else {
        proxy.writeQuery({
          query: FETCH_BOOKMARKS_QUERY,
          data: {
            getBookmarks: data.getBookmarks.filter((item) => item.id !== id),
          },
        });
      }
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
      console.log(errors)
    },
  });

  const bookmarkButton = user.user ? (
    bookmarked ? (
      <Button fluid color="teal">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button fluid color="teal" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button fluid as={Link} to="/login" color="teal" basic>
      <Icon name="heart" />
    </Button>
  );
  return (
    <MyPopup content={bookmarked ? "Remove Wishlist" : "Add Wishlist"}>
      <div as="div" onClick={user ? bookmarkPost : ""}>
        {bookmarkButton}
      </div>
    </MyPopup>
  );
}

const BOOKMARK_ITEM_MUTATION = gql`
  mutation bookmarkItem($itemId: ID!) {
    bookmarkItem(itemId: $itemId) {
      id
      bookmarkedBy {
        id
        userId
        createdAt
      }
    }
  }
`;

export default BookmarkButton;
