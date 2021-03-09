import React, { useState } from "react";
import { Input, Button, Icon } from "semantic-ui-react";
import _ from "lodash";
import { Link } from "react-router-dom";

function SearchBarHome(props) {
  function search() {
    window.location.href = "/search";
  }
  const [keyword, setKeyword] = useState(props.keyword);

  const onChange = (event) => {
    setKeyword(event.target.value)
  }

  return (
    <Input
      fluid
      onChange={onChange}
    //   action={<Button type='submit' onClick={() => {setSearch(true)}}>Search</Button>}
      action={<Button type='submit' as={Link} to={`/search/${keyword ? keyword : " "}`} >Search</Button>}
      placeholder="Search..."
      style={{ boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)" }}
      size="big"
      value={keyword}
      type="text"
    />
  );
}

export default SearchBarHome;
