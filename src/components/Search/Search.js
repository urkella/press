import React, { useState, useMemo } from "react";
import { string, object, bool, array } from "prop-types";
import { SearchForm } from "../../forms";
import { createNavigateSearchParams } from "../../util/urlHelpers";
import { debounce } from "throttle-debounce";
import { pathByRouteName } from "../../util/routes";
import routeConfiguration from "../../routeConfiguration";
import classNames from "classnames";

import css from "./Search.module.scss";

const DEBOUNCE_TIMEOUT_DELAY = 500;

/**
 * Removes page property from search params if:
 * 1. We're not on the 1st page
 * 2. Previous value isn't the same as the current one
 *
 * @param {object} searchParams
 * @param {string} prevValue
 * @param {string} value
 */
const updatePrevSearchParams = (searchParams, prevValue, value) => {
  const { page = 1, ...restParams } = searchParams;

  const pageMaybe = page && page !== 1 ? { page: page } : {};
  const prevSearchParams =
    page > 1 && prevValue !== value
      ? restParams
      : { ...restParams, ...pageMaybe };

  return prevSearchParams;
};

const Search = (props) => {
  const {
    rootClassName,
    className,
    navigate,
    searchParams,
    users,
    queryUsersInProgress,
    queryUsersError,
    queryPostsError,
  } = props;
  const classes = classNames(rootClassName || css.root, className);

  const [keywords, setKeywords] = useState(searchParams.keywords || "");

  /**
   * Global form onChange handler which takes input event and
   * then redirects to PostsPage with the updated previous and new
   * search parameters
   */
  const handleChange = (e, searchParams) => {
    const formValue = e.target.value;

    // Destruct other search parameters without the current
    // parameter
    const { [searchParams[e.target.name]]: paramValue, ...restParams } =
      searchParams;

    // Generate prev search params from the previous and new
    // form values
    const prevSearchParams = updatePrevSearchParams(
      restParams,
      paramValue,
      formValue
    );

    const hasValue = formValue !== "";
    const params = hasValue
      ? { ...prevSearchParams, [e.target.name]: formValue }
      : prevSearchParams;

    // Redirect with the new search params
    const search = createNavigateSearchParams(params);
    const routePath = pathByRouteName("PostsPage", routeConfiguration());
    navigate({
      pathname: routePath,
      search,
    });
  };

  /**
   * Keywords search helpers that delays making API requests
   * to filter posts by title
   */
  const debouncedKeywordSearch = useMemo(
    () =>
      debounce(DEBOUNCE_TIMEOUT_DELAY, (e) => handleChange(e, searchParams)),

    // eslint-disable-next-line
    []
  );

  const handleKeywordsChange = (e) => {
    setKeywords(e.target.value);
    debouncedKeywordSearch(e);
  };

  return !queryPostsError ? (
    <div className={classes}>
      <SearchForm
        searchParams={searchParams}
        keywords={keywords}
        handleKeywordsChange={handleKeywordsChange}
        handleChange={(e) => handleChange(e, searchParams)}
        users={users}
        queryUsersInProgress={queryUsersInProgress}
        queryUsersError={queryUsersError}
      />
    </div>
  ) : null;
};

Search.defaultProps = {
  rootClassName: null,
  className: null,
  searchParams: {},
  users: [],
  queryUsersInProgress: false,
  queryUsersError: null,
  queryPostsError: null,
};

Search.propTypes = {
  rootClassName: string,
  className: string,
  searchParams: object.isRequired,
  users: array.isRequired,
  queryUsersInProgress: bool.isRequired,
  queryUsersError: object,
  queryPostsError: object,
};

export default Search;
