import gql from "graphql-tag";

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export const FETCH_ITEMS_QUERY = gql`
  {
    getItems {
      id
      name
      price
      condition
      createdAt
      description
      images {
        id
        downloadUrl
      }
      bookmarkedBy {
        id
        userId
        createdAt
      }
      user {
        id
        address {
          cityName
        }
        seller {
          username
        }
      }
    }
  }
`;

export const SEARCH_ITEMS_QUERY = gql`
  query(
    $keyword: String!
    $category: String!
    $condition: String!
    $city: String!
    $minPrice: Int!
    $maxPrice: Int!
  ) {
    searchItems(
      searchItemInput: {
        keyword: $keyword
        category: $category
        city: $city
        condition: $condition
        minPrice: $minPrice
        maxPrice: $maxPrice
      }
    ) {
      id
      name
      price
      createdAt
      description
      condition
      images {
        downloadUrl
      }
      bookmarkedBy {
        userId
        createdAt
      }
      user {
        id
        address {
          cityName
        }
        seller {
          username
        }
      }
    }
  }
`;

export const FETCH_ITEM_QUERY = gql`
  query($itemId: ID!, $itemUserId: ID!, $currentUserId: ID!) {
    getItem(itemId: $itemId) {
      id
      name
      price
      stock
      weight
      createdAt
      description
      condition
      category
      dimension {
        length
        width
        height
      }
      images {
        id
        downloadUrl
      }
      bookmarkedBy {
        id
        userId
        createdAt
      }
      user {
        id
        seller {
          id
          username
        }
      }
    }

    getItemReviews(itemId: $itemId) {
      id
      score
      body
      user {
        id
        email
        buyer {
          avatar
        }
      }
      item {
        id
        name
      }
      images {
        downloadUrl
      }
      createdAt
    }

    isChatExists(itemUserId: $itemUserId, currentUserId: $currentUserId) {
      _id
      lastText
    }
  }
`;

export const FETCH_CART_QUERY = gql`
  query($itemId: ID!) {
    getUserCartItem(itemId: $itemId) {
      id
      createdAt
      amountItem
      item {
        user {
          seller {
            username
          }
        }
      }
      isChecked
    }
  }
`;

export const FETCH_BOOKMARKS_QUERY = gql`
  {
    getBookmarks {
      id
      name
      price
      createdAt
      description

      images {
        id
        downloadUrl
      }
      bookmarkedBy {
        id
        userId
        createdAt
      }
      user {
        id
        address {
          cityName
        }
        seller {
          username
        }
      }
    }
  }
`;

export const FETCH_USER_CART_QUERY = gql`
  {
    getUserCartItems {
      id
      item {
        id
        name
        price
        stock
        images {
          downloadUrl
        }
        user {
          id
          seller {
            username
          }
        }
      }
      user {
        id
        buyer {
          name
        }
        seller {
          username
        }
      }
      note
      isChecked
      amountItem
      createdAt
    }
  }
`;

export const ADD_TO_CART_MUTATION = gql`
  mutation addCartItem($itemId: ID!, $amountItem: Int! , $isChecked: Boolean!, $note: String!) {
    addCartItem(itemId: $itemId, note: $note, amountItem: $amountItem, isChecked: $isChecked) {
      note
      amountItem
      createdAt
    }
  }
`;
export const EDIT_CART_MUTATION = gql`
  mutation editCartItem($itemId: ID!, $amountItem: Int! , $isChecked: Boolean!, $note: String!) {
    editCartItem(itemId: $itemId, note: $note, amountItem: $amountItem, isChecked: $isChecked) {
      note
      amountItem
      createdAt
    }
  }
`;

export const FETCH_CHATS_QUERY = gql`
  {
    getChats {
      id
      users {
        id
        seller {
          username
        }
      }
      lastText
    }
  }
`;

export const FETCH_CHAT_MESSAGES_QUERY = gql`
  query($chatId: ID!) {
    getMessages(chatId: $chatId) {
      id
      content
      sentAt
      user
      item {
        id
        name
        price
        image
      }
    }
  }
`;

export const MESSAGES_SUBSCRIPTION = gql`
  subscription($chatId: ID!) {
    newMessage(chatId: $chatId) {
      id
      content
      sentAt
      user
      item {
        id
        name
        price
        image
      }
    }
  }
`;

export const ADD_MESSAGE = gql`
  mutation addMessage($chatId: ID!, $receiverUserId: ID!, $content: String!) {
    addMessage(
      messageInput: {
        chatId: $chatId
        receiverUserId: $receiverUserId
        content: $content
      }
    ) {
      id
      user
      content
      images {
        id
        downloadUrl
      }
      sentAt
    }
  }
`;
export const FETCH_CITIES_QUERY = gql`
  {
    getCities {
      city_id
      province_id
      province
      type
      city_name
      postal_code
    }
  }
`;
export const CREATE_PAYMENT_QUERY = gql`
  {
    createPayment {
      token
      redirect_url
    }
  }
`;
