import React, { useState } from "react";
import { List, Image, Segment } from "semantic-ui-react";

function ChatListCard({ chats, user, setChat, selectedChat }) {
  if (selectedChat.users && selectedChat.id == "new") {
    chats = [...chats, selectedChat]
  }
  console.log(selectedChat)
  const [isItemHovered, setItemHovered] = useState({
    state: false,
    id: -1,
  });
  const onMouseEnterItem = {
    backgroundColor: "#F3F4F5",
    padding: 8,
    cursor: "pointer",
  };
  const onMouseLeaveItem = {
    backgroundColor: "#FFFFFF",
    padding: 8,
  };
  const leftContent = {
    padding: 0,
    margin: 0,
    overflow: "auto",
    maxHeight: 342,
    height: 342,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 0,
  };

  const receiver = (users) => {
    let userReceiver;
    if (users[0].id != user.id) {
      userReceiver = users[0];
    } else {
      userReceiver = users[1];
    }
    return userReceiver;
  };

  const handleItemHovered = (id, state) => {
    setItemHovered({
      state: state,
      id: id,
    });
  };
  return (
    <Segment style={leftContent}>
      <List>
        {chats.map((chat, index) => (
          <List.Item
            key={index}
            onClick={() => {
              console.log(`chat: ${chat.id} index:${index}`)
              setChat(chat)}}
            onMouseEnter={() => handleItemHovered(index, true)}
            onMouseLeave={() => handleItemHovered(index, false)}
            style={
              isItemHovered.state && isItemHovered.id == index
                ? onMouseEnterItem
                : onMouseLeaveItem
            }
          >
            <Image
              avatar
              src="https://react.semantic-ui.com/images/avatar/small/tom.jpg"
            />
            <List.Content>
              <List.Header>{receiver(chat.users).seller.username}</List.Header>
              <span
                style={{
                  color: "#20B52B",
                  backgroundColor: "#C6ECCD",
                  paddingTop: 1,
                  paddingBottom: 1,
                  paddingLeft: 3,
                  paddingRight: 3,
                  borderRadius: 6,
                }}
              >
                Seller
              </span>
            </List.Content>
          </List.Item>
        ))}
      </List>
    </Segment>
  );
}
export default ChatListCard;
