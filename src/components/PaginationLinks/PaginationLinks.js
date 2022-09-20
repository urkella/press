import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import range from "lodash/range";
import { stringify } from "../../util/urlHelpers";
import { IconArrow, NamedLink } from "..";

import css from "./PaginationLinks.module.scss";

const { string, object } = PropTypes;

let pgKey = 0;
const paginationGapKey = () => {
  pgKey += 1;
  return pgKey;
};

/**
 * Returns an array containing page numbers and possible ellipsis '…' characters.
 *
 * @param {Number} page - current page
 * @param {Number} totalPages - total page count
 * @return {Array}
 */
const getPageNumbersArray = (page, totalPages) => {
  // Create array of numbers: [1, 2, 3, 4, ..., totalPages]
  const numbersFrom1ToTotalPages = range(1, totalPages + 1);
  return numbersFrom1ToTotalPages
    .filter((v) => {
      // Filter numbers that are next to current page and pick also first and last page
      // E.g. [1, 4, 5, 6, 9], where current page = 5 and totalPages = 9.
      return v === 1 || Math.abs(v - page) <= 1 || v === totalPages;
    })
    .reduce((newArray, p) => {
      // Create a new array where gaps between consecutive numbers is filled with ellipsis character
      // E.g. [1, '…', 4, 5, 6, '…', 9], where current page = 5 and totalPages = 9.
      const isFirstPageOrNextToCurrentPage =
        p === 1 || newArray[newArray.length - 1] + 1 === p;
      return isFirstPageOrNextToCurrentPage
        ? newArray.concat([p])
        : newArray.concat(["\u2026", p]);
    }, []);
};

export const PaginationLinks = (props) => {
  const {
    className,
    rootClassName,
    pageName,
    pagePathParams,
    pageSearchParams,
    pagination,
  } = props;
  const classes = classNames(rootClassName || css.root, className);

  const { page, totalPages } = pagination;
  const prevPage = page > 1 ? page - 1 : null;
  const nextPage = page < totalPages ? page + 1 : null;
  const prevSearchParams = { ...pageSearchParams, page: prevPage };
  const nextSearchParams = { ...pageSearchParams, page: nextPage };

  const prevLinkEnabled = (
    <NamedLink
      className={css.prev}
      name={pageName}
      params={pagePathParams}
      to={{ search: stringify(prevSearchParams) }}
      title="Previous"
    >
      <IconArrow direction="left" rootClassName={css.arrowIcon} />
    </NamedLink>
  );

  const prevLinkDisabled = (
    <div className={css.prev}>
      <IconArrow
        direction="left"
        rootClassName={classNames(css.arrowIcon, css.disabled)}
      />
    </div>
  );

  const nextLinkEnabled = (
    <NamedLink
      className={css.next}
      name={pageName}
      params={pagePathParams}
      to={{ search: stringify(nextSearchParams) }}
      title="Next"
    >
      <IconArrow rootClassName={css.arrowIcon} />
    </NamedLink>
  );

  const nextLinkDisabled = (
    <div className={css.next}>
      <IconArrow rootClassName={classNames(css.arrowIcon, css.disabled)} />
    </div>
  );

  const pageNumbersNavLinks = getPageNumbersArray(page, totalPages).map((v) => {
    const isCurrentPage = v === page;
    const pageClassNames = classNames(css.toPageLink, {
      [css.currentPage]: isCurrentPage,
    });
    return typeof v === "number" ? (
      <NamedLink
        key={v}
        className={pageClassNames}
        name={pageName}
        params={pagePathParams}
        to={{ search: stringify({ ...pageSearchParams, page: v }) }}
        title={"to page"}
      >
        {v}
      </NamedLink>
    ) : (
      <span
        key={`pagination_gap_${paginationGapKey()}`}
        className={css.paginationGap}
      >
        {v}
      </span>
    );
  });

  const pageNumberListClassNames = classNames(
    css.pageNumberList,
    css[`pageNumberList${pageNumbersNavLinks.length}Items`]
  );

  return (
    <nav className={classes}>
      {prevPage ? prevLinkEnabled : prevLinkDisabled}
      <div className={pageNumberListClassNames}>{pageNumbersNavLinks}</div>
      {nextPage ? nextLinkEnabled : nextLinkDisabled}
    </nav>
  );
};

PaginationLinks.defaultProps = {
  className: "",
  rootClassName: "",
  pagePathParams: {},
  pageSearchParams: {},
};

PaginationLinks.propTypes = {
  className: string,
  rootClassName: string,

  pageName: string.isRequired,
  pagePathParams: object,
  pageSearchParams: object,
  pagination: object.isRequired,
};

export default PaginationLinks;
