import React, { useContext } from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "../App.css";

import { AuthContext } from "../context/auth";
import BookmarkButton from "./BookmarkButton";

function PostCard({ item: { id, name, price, user, bookmarkedBy, images } }) {
  const userCache = useContext(AuthContext);
  const currencyIdrConverter = (price, decPlaces, thouSeparator, decSeparator) => {
    var n = price,
      decPlaces = isNaN((decPlaces = Math.abs(decPlaces))) ? 2 : decPlaces,
      decSeparator = decSeparator == undefined ? "." : decSeparator,
      thouSeparator = thouSeparator == undefined ? "," : thouSeparator,
      sign = n < 0 ? "-" : "",
      i = parseInt((n = Math.abs(+n || 0).toFixed(decPlaces))) + "",
      j = (j = i.length) > 3 ? j % 3 : 0;
    return (
      sign +
      (j ? i.substr(0, j) + thouSeparator : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) +
      (decPlaces
        ? decSeparator +
          Math.abs(n - i)
            .toFixed(decPlaces)
            .slice(2)
        : "")
    );
  };

  return (
    <Card style={{ boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)" }}>
      <Card.Content
        style={{ padding: 0 }}
        as={Link}
        to={`/items/${id}/${user.id}`}
      >
        <Image
          size="large"
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
        <Card.Description>Rp {currencyIdrConverter(price, 0, '.', ',')}</Card.Description>
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
