import React, { useState, useEffect } from "react";
import { Input, Button } from "semantic-ui-react";
import _ from "lodash";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setFilter } from "../actions/searchFilterAction";

function SearchBarHome(props) {
  const history = useHistory();
  const [values, setValues] = useState(props.filter);
  const [isSubmit, setSubmit] = useState(false);

  useEffect(() => {
    if (isSubmit && values.keyword !== "") {
      props.setFilter(values);
      history.push(`/search/${values.keyword == "" ? " " : values.keyword}`);
    }
    setSubmit(false);
  }, [values, isSubmit]);

  const onChange = (_, { value }) => {
    setValues({ ...values, ["keyword"]: value });
  };

  const onSubmit = () => setSubmit(true);

  const handleKeyDown = (e) => {
    console.log(e.key)
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
      value={values.keyword}
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
