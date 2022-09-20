import React from "react";
import { string, func, bool, object, array } from "prop-types";
import classNames from "classnames";

import css from "./SearchForm.module.scss";

const SearchForm = (props) => {
  const {
    rootClassName,
    className,
    searchParams,
    keywords,
    handleKeywordsChange,
    handleChange,
    users,
    queryUsersInProgress,
    queryUsersError,
  } = props;
  const classes = classNames(rootClassName || css.root, className);
  const selectDisabled = queryUsersInProgress || queryUsersError;
  return (
    <form className={classes}>
      <input
        id="keywords"
        name="keywords"
        type="text"
        placeholder="Search..."
        value={keywords}
        onChange={handleKeywordsChange}
      />
      <select
        id="userId"
        name="userId"
        onChange={handleChange}
        defaultValue={searchParams.userId || ""}
        disabled={selectDisabled}
        required
      >
        <option value="" disabled>
          Filter by author name
        </option>
        {users.map((u) => {
          return (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          );
        })}
      </select>
    </form>
  );
};

SearchForm.defaultProps = {
  rootClassName: null,
  className: null,
  searchParams: {},
  keywords: "",
  handleKeywordsChange: null,
  handleChange: null,
  users: [],
  queryUsersInProgress: false,
  queryUsersError: null,
};

SearchForm.propTypes = {
  rootClassName: string,
  className: string,
  searchParams: object.isRequired,
  keywords: string,
  handleKeywordsChange: func.isRequired,
  handleChange: func.isRequired,
  users: array.isRequired,
  queryUsersInProgress: bool.isRequired,
  queryUsersError: object,
};

export default SearchForm;
