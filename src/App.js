import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { Dimmer } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

import { AuthProvider } from "./context/auth";
import AuthRoute from "./util/AuthRoute";

import Home from "./pages/Home";
import Login from "./pages/Authentication/Login";
import Register from "./pages/Authentication/Register";
import Event from "./pages/Event";
import SinglePost from "./pages/SinglePost";
import Bookmark from "./pages/Bookmark";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import MyStore from "./pages/MyStore";
import ItemDetail from "./pages/ItemDetail";
import AddItem from "./pages/AddItem";
import SellerProfile from "./pages/SellerProfile";
import EditItem from "./pages/EditItem";
import Checkout from "./pages/Checkout";
import Search from "./pages/Search";

import EditMyStoreDetailsCard from "./components/EditMyStoreDetailsCard";
import EditProfileCard from "./components/EditProfileCard";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ChatFloatingButton from "./components/chat/ChatFloatingButton";
import { Provider } from "react-redux";
import store from "./store";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDimmed: false,
      isChatVisible: false,
      selectedChat: {},
      selectedMessage: {},
    };
    // this.handleDimmed = this.handleDimmed.bind(this);
  }

  handleChatVisibility(chat, message) {
    if (chat && message) {
      this.setState({ selectedChat: chat, selectedMessage: message });
    }
    this.setState({ isChatVisible: !this.state.isChatVisible });
  }

  handleDimmed() {
    console.log("handleDimmed on App was employed");
    this.setState({ isDimmed: !this.state.isDimmed });
  }

  render() {
    return (
      <Provider store={store}>
        <AuthProvider>
          <Router>
            <NavBar onDimmed={() => this.handleDimmed()} />
            <Container>
              <br></br>
              <br></br>
              <br></br>
              <Dimmer active={this.state.isDimmed} />
              <Route exact path="/" component={Home} />
              <Route exact path="/event" component={Event} />
              <Route exact path="/wishList" component={Bookmark} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/search/:keyword" component={Search} />
              <AuthRoute exact path="/login" component={Login} />
              <AuthRoute exact path="/register" component={Register} />
              <Route exact path="/posts/:postId" component={SinglePost} />
              <Route exact path="/profile/:position" component={Profile} />
              <Route exact path="/myStore/:position" component={MyStore} />
              <Route
                exact
                path="/editMyStoreDetailsCard"
                component={EditMyStoreDetailsCard}
              />
              <Route
                exact
                path="/editProfileCard"
                component={EditProfileCard}
              />
              <Route
                exact
                path="/items/:itemId/:itemUserId"
                component={(props) => (
                  <ItemDetail
                    onChatVisible={(chat, message) =>
                      this.handleChatVisibility(chat, message)
                    }
                    props={props}
                  />
                )}
              />
              <Route
                exact
                path="/sellerProfile/:userId"
                component={SellerProfile}
              />
              <Route exact path="/addItem" component={AddItem} />
              <Route exact path="/editItem/:itemId" component={EditItem} />
              <Route exact path="/checkout" component={Checkout} />
            </Container>
            <ChatFloatingButton
              selectedChat={this.state.selectedChat}
              selectedMessage={this.state.selectedMessage}
              isChatVisible={this.state.isChatVisible}
              onChatVisible={() => this.handleChatVisibility()}
            />
            <Footer />
          </Router>
        </AuthProvider>
      </Provider>
    );
  }
}

export default App;
