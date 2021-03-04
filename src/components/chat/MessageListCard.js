import React, { useEffect, useRef } from "react";
import { Grid, Segment } from "semantic-ui-react";
import {
  FETCH_CHAT_MESSAGES_QUERY,
  MESSAGES_SUBSCRIPTION,
} from "../../util/graphql";
import { useQuery } from "@apollo/react-hooks";
import ItemAttachedOnChat from "./ItemAttachedOnChat";

function MessageListCard({ user, chatId, selectedMessage, selectedChat }) {
  console.log(`chatId: ${chatId}`)
  const { loading, data, subscribeToMore } = useQuery(
    FETCH_CHAT_MESSAGES_QUERY,
    {
      variables: {
        chatId: chatId,
      },
    }
  );
  let { getMessages: messages } = data ? data : [];
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  let count = 0;
  if (!loading) {
    subscribeToMore({
      document: MESSAGES_SUBSCRIPTION,
      variables: { chatId: chatId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          console.log(
            `onMessagesSub@updateQuery: not update ${prev.getMessages[0].content}`
          );
          return prev;
        }
        count++;
        const newMessageItem = subscriptionData.data.newMessage;
        console.log(`newMessageItem: ${newMessageItem.content}`);
        const messages = prev.getMessages.concat(newMessageItem);
        console.log(`count: ${count}`);
        return {
          getMessages: messages,
        };
      },
      onError: (err) => console.error(err),
    });
  }
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getMessageItem = (message, position, style) => (
    <Grid container key={message.id}>
      <Grid.Column style={{ padding: 0 }}>
        <Segment
          compact
          floated={position}
          // inverted
          // color="green"
          style={style}
        >
          {message.content}
        </Segment>
      </Grid.Column>
    </Grid>
  );

  let lastMessageId = "";
  const getMessageComp = (message, index) => {
    let messageItemMarkUp;
    // fixing duplication message problem
    if (message.id !== lastMessageId) {
      lastMessageId = message.id;
      let position = "right";

      if (message.user != user.id) {
        // left message item comp
        position = "left";
      }

      if (message.item.id) {
        messageItemMarkUp = <ItemAttachedOnChat item={message.item} position={position}></ItemAttachedOnChat>;
      } else {
        if (position == "right") {
          messageItemMarkUp = getMessageItem(
            message,
            position,
            messageItemRight
          );
        } else {
          messageItemMarkUp = getMessageItem(
            message,
            position,
            messageItemLeft
          );
        }
      }
    }
    return messageItemMarkUp;
  };

  const messageItemLeft = {
    marginTop: 4,
    border: 0,
    marginBottom: 4,
    marginLeft: 14,
    marginRight: 14,
    padding: 10,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
  };
  const messageItemRight = {
    marginTop: 4,
    border: 0,
    marginBottom: 4,
    marginLeft: 14,
    padding: 10,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
  };
  const rightContent = {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 0,
    paddingRight: 0,
    margin: 0,
    overflow: "auto",
    maxHeight: 275,
    height: 275,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  };
  let messageListMarkup;
  if (!loading) {
    if (chatId != "new") {
      if (chatId == selectedMessage.chatId) {
        messages = [...messages, selectedMessage]
      }
      messageListMarkup = (
        <Segment style={rightContent}>
          {messages.map((message, index) => getMessageComp(message, index))}
          <div ref={messagesEndRef} />
        </Segment>
      );
    } else {
      messageListMarkup = (
        <Segment style={rightContent}>
          {getMessageComp(selectedMessage, 0)}
          <div ref={messagesEndRef} />
        </Segment>
      );
    }
  } else {
    messageListMarkup = <h4>Loading messages..</h4>;
  }

  return messageListMarkup;
}
export default MessageListCard;
