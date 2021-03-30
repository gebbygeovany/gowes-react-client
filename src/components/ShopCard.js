import React, { useContext } from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "../App.css";
import { AuthContext } from "../context/auth";
import BookmarkButton from "./BookmarkButton";
import { currencyIdrConverter } from "../util/extensions";

function PostCard({
  item: { id, name, condition, price, user, bookmarkedBy, images },
}) {
  const userCache = useContext(AuthContext);

  let ribbon = {
    color: "green",
    content: "New",
    ribbon: true,
  };

  if (condition === "used") {
    ribbon = {
      color: "grey",
      content: "Used",
      ribbon: true,
    };
  }

  return (
    <Card style={{ boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)" }}>
      <Card.Content
        style={{ padding: 0 }}
        as={Link}
        to={`/items/${id}/${user.id}`}
      >
        <Image
          label={ribbon}
          // size="large"
          // style={{ height: 180 }}
          src={
            images.length > 0
              ? images[0].downloadUrl
              : "https://react.semantic-ui.com/images/avatar/large/molly.png"
          }
        />
      </Card.Content>

      <Card.Content extra>
        <Card.Header style={{ fontSize: 14 }}>{name}</Card.Header>
        <Card.Meta>
          <span className="penjual">{user.address.cityName}</span>
        </Card.Meta>
        <Card.Meta style={{ marginTop: 5 }}>
          <Icon name="star" style={{ color: "gold" }}></Icon>
          4/5
        </Card.Meta>
        <Card.Description>
          Rp {currencyIdrConverter(price, 0, ".", ",")}
        </Card.Description>
      </Card.Content>

      <Card.Content extra>
        <BookmarkButton
          user={userCache}
          item={{ id, bookmarkedBy }}
        ></BookmarkButton>
      </Card.Content>
    </Card>
  );
}

export default PostCard;
