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

export const FETCH_SINGLE_ITEM_QUERY = gql`
  query($itemId: ID!) {
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
export const FETCH_USER_CART_CHECKOUT_QUERY = gql`
  query($userId: ID!) {
    getUserCartItemsCheckout {
      id
      item {
        id
        weight
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
          address {
            cityName
            cityId
            district
            postalCode
            detail
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
    getUser(userId: $userId) {
      id
      email
      phone
      address {
        cityName
        cityId
        district
        postalCode
        detail
      }
      balance
      buyer {
        name
      }
    }
  }
`;

export const ADD_TO_CART_MUTATION = gql`
  mutation addCartItem(
    $itemId: ID!
    $amountItem: Int!
    $isChecked: Boolean!
    $note: String!
  ) {
    addCartItem(
      itemId: $itemId
      note: $note
      amountItem: $amountItem
      isChecked: $isChecked
    ) {
      note
      amountItem
      createdAt
      isChecked
    }
  }
`;
export const EDIT_CART_MUTATION = gql`
  mutation editCartItem(
    $itemId: ID!
    $amountItem: Int!
    $isChecked: Boolean!
    $note: String!
  ) {
    editCartItem(
      itemId: $itemId
      note: $note
      amountItem: $amountItem
      isChecked: $isChecked
    ) {
      note
      amountItem
      createdAt
      isChecked
    }
  }
`;
export const EDIT_CHECKED_MUTATION = gql`
  mutation updateCheckCart($itemIds: [ID]!, $isChecked: Boolean!) {
    updateCheckCart(checkedCart: { itemIds: $itemIds, isChecked: $isChecked })
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
export const FETCH_COST_COURIER_QUERY = gql`
  query(
    $origin: String!
    $destination: String!
    $weight: Int!
    $courier: String!
  ) {
    getCosts(
      costInput: {
        origin: $origin
        destination: $destination
        weight: $weight
        courier: $courier
      }
    ) {
      code
      name
      costs {
        service
        description
        cost {
          value
          etd
          note
        }
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder(
    $items: [OrderItemInput]!
    $state: String!
    $sellerUsername: String!
    $shipping: OrderShippingInput!
    $cartItemIds: [ID]!
  ) {
    addOrder(
      addOrderInput: {
        items: $items
        state: { stateType: $state }
        shipping: $shipping
        sellerUsername: $sellerUsername
      }
      cartItemIds: $cartItemIds
    ) {
      id
      state {
        stateType
        createdAt
        deadline
      }
      shipping {
        courierName
      }
    }
  }
`;

export const FETCH_USER_QUERY = gql`
  query($userId: ID!) {
    getUser(userId: $userId) {
      id
      email
      phone
      address {
        cityName
        cityId
        district
        postalCode
        detail
      }
      balance
      buyer {
        name
        birthDate
        avatar
      }
    }
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
export const UPDATE_PROFILE_MUTATION = gql`
  mutation updateUserProfile(
    $avatar: String!
    $name: String!
    $email: String!
    $phone: String!
    $birthDate: String!
    $cityName: String!
    $cityId: String!
    $district: String!
    $postalCode: String!
    $detail: String!
  ) {
    updateUserProfile(
      userProfileInput: {
        avatar: $avatar
        name: $name
        email: $email
        phone: $phone
        birthDate: $birthDate
        address: {
          cityName: $cityName
          cityId: $cityId
          district: $district
          postalCode: $postalCode
          detail: $detail
        }
      }
    ) {
      id
      email
      phone
      address {
        cityName
        cityId
        district
        postalCode
        detail
      }
      balance
      token
      buyer {
        name
        birthDate
        avatar
      }
    }
  }
`;

export const DELETE_CART_ITEM_MUTATION = gql`
  mutation deleteCartItem($cartId: ID!) {
    deleteCartItem(cartId: $cartId)
  }
`;

export const UPDATE_ITEM_MUTATION = gql`
  mutation updateItem(
    $name: String!
    $price: Int!
    $stock: Int!
    $category: String!
    $condition: String!
    $weight: Int!
    $description: String!
    $length: Int!
    $width: Int!
    $height: Int!
    $itemId: ID!
  ) {
    updateItem(
      itemId: $itemId
      addItemInput: {
        name: $name
        price: $price
        stock: $stock
        category: $category
        condition: $condition
        weight: $weight
        description: $description
        dimension: { length: $length, width: $width, height: $height }
        images: [{ downloadUrl: "" }]
      }
    ) {
      id
      name
      price
      stock
      category
      condition
      weight
      description
      dimension {
        length
        width
        height
      }
      images {
        downloadUrl
      }
      createdAt
      bookmarkedBy {
        id
        userId
        createdAt
      }
      user {
        id
        seller {
          username
          avatar
          description
          createdAt
          id
        }
      }
    }
  }
`;
