import React from "react";
import { string, number, oneOfType } from "prop-types";
import { NamedLink, IconArrowLong } from "../../components";
import classNames from "classnames";

import css from "./PostPage.module.scss";

// We can also pick this up dynamically by fetching posts API
// and getting the total number of results/posts
const MIN_POSTS = 1;
const MAX_POSTS = 100;

const PrevLink = (props) => {
  const { id } = props;

  const prevPage = id - 1;
  const linkDisabled = id <= MIN_POSTS;

  return linkDisabled ? (
    <span className={css.disabledLink}>
      <IconArrowLong className={css.linkIcon} direction="left" />
      Previous article
    </span>
  ) : (
    <NamedLink className={css.link} name="PostPage" params={{ id: prevPage }}>
      <IconArrowLong className={css.linkIcon} direction="left" />
      Previous article
    </NamedLink>
  );
};

const NextLink = (props) => {
  const { id } = props;

  const nextPage = id + 1;
  const linkDisabled = id >= MAX_POSTS;

  return linkDisabled ? (
    <span className={css.disabledLink}>
      Next article
      <IconArrowLong className={css.linkIcon} />
    </span>
  ) : (
    <NamedLink className={css.link} name="PostPage" params={{ id: nextPage }}>
      Next article
      <IconArrowLong className={css.linkIcon} />
    </NamedLink>
  );
};

const SectionNavigation = (props) => {
  const { id } = props;
  const dividerClasses = classNames(css.divider, css.navigationDivider);
  return (
    <div className={css.sectionNavigation}>
      <div className={dividerClasses} />
      <div className={css.navigation}>
        <PrevLink id={id} />
        <NextLink id={id} />
      </div>
    </div>
  );
};

SectionNavigation.propTypes = {
  id: oneOfType([string, number]).isRequired,
};

export default SectionNavigation;
