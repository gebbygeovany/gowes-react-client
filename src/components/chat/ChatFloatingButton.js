import React, { useContext } from "react";
import { Icon, Transition, Segment, Container } from "semantic-ui-react";
import { AuthContext } from "../../context/auth";
import ChatFloatingCard from "./ChatFloatingCard";

function ChatFloatingButton({
  isChatVisible,
  onChatVisible,
  selectedChat,
  selectedMessage,
}) {
  // const toggleVisibility = () => {setVisible(!visible)}
  const toggleVisibility = () => {
    onChatVisible();
  };
  const { user } = useContext(AuthContext);

  const style = {
    cursor: "pointer",
    borderRadius: 26,
    margin: 0,
    top: "auto",
    right: 80,
    bottom: 40,
    left: "auto",
    position: "fixed",
    zIndex: 1000,
    paddingRight: 30,
    paddingLeft: 30,
    paddingTop: 10,
    paddingBottom: 10,
  };

  const cardStyle = {
    width: 560,
    height: 390,
    borderRadius: 12,
    margin: 0,
    top: "auto",
    right: 80,
    bottom: 40,
    left: "auto",
    position: "fixed",
    zIndex: 1000,
  };

  const spanStyle = { fontSize: 14, fontWeight: "bold" };

  let chatFloatingMarkup = <br />;
  if (user !== null) {
    chatFloatingMarkup = (
      <Container>
        <Transition visible={!isChatVisible} animation="scale" duration={500}>
          <Segment
            onClick={toggleVisibility}
            floated="right"
            raised={true}
            style={style}
          >
            <Icon color="teal" size="large" name="discussions" />
            <span style={spanStyle}>Chat</span>
          </Segment>
        </Transition>
        <Transition visible={isChatVisible} animation="scale" duration={500}>
          <Segment style={cardStyle}>
            <ChatFloatingCard
              onClose={toggleVisibility}
              selectedChat={selectedChat}
              selectedMessage={selectedMessage}
            />
          </Segment>
        </Transition>
      </Container>
    );
  }
  return chatFloatingMarkup;
}
export default ChatFloatingButton;
