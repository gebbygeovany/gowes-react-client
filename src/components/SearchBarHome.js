import React, { useState, useEffect } from "react";
import { Input, Button } from "semantic-ui-react";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setFilter } from "../actions/searchFilterAction";
import { initialFilter } from "../util/const";

function SearchBarHome(props) {
  const history = useHistory();
  const navSource = props.navSource ? `navsource=${props.navSource}&` : "";
  const keywordProp = props.keyword;
  const [keyword, setKeyword] = useState(keywordProp);
  const [isSubmit, setSubmit] = useState(false);

  useEffect(() => {
    if (isSubmit && keyword !== "") {
      props.setFilter(initialFilter.filter);
      const param = `${navSource}q=${keyword}`;
      history.push(`/search/${param}`);
    }
    setSubmit(false);
  }, [keyword, isSubmit]);

  const onChange = (_, { value }) => {
    setKeyword(value);
  };

  const onSubmit = () => setSubmit(true);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSubmit(true);
    }
  };

  return (
    <Input
      fluid
      onChange={onChange}
      action={
        <Button type="submit" onClick={onSubmit}>
          Search
        </Button>
      }
      placeholder="Search..."
      style={{ boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)" }}
      size="big"
      value={keyword}
      type="text"
      onKeyDown={handleKeyDown}
    />
  );
}

SearchBarHome.propTypes = {
  setFilter: PropTypes.func.isRequired,
  filter: PropTypes.object,
};

const mapStateToProps = (state) => ({
  filter: state.searchFilter.filter,
});

export default connect(mapStateToProps, { setFilter })(SearchBarHome);
