import React from "react";
import { string, bool, object } from "prop-types";
import { capitalizeFirstLetter } from "../../util/data";
import { NamedLink, IconArrowLong } from "..";
import classNames from "classnames";

import Heading from "./Heading";
import css from "./PostCard.module.scss";

const PostCard = (props) => {
  const { rootClassName, className, post, isFirstPost } = props;
  const classes = classNames(rootClassName || css.root, className);

  const { title, body } = post;
  return (
    <NamedLink name="PostPage" params={{ id: post.id }} className={classes}>
      <Heading className={css.heading} isFirstPost={isFirstPost}>
        {capitalizeFirstLetter(title)}
      </Heading>
      <p className={css.description}>{capitalizeFirstLetter(body)}</p>
      <span className={css.link}>
        Read more
        <IconArrowLong className={css.linkIcon} />
      </span>
    </NamedLink>
  );
};

PostCard.defaultProps = {
  rootClassName: null,
  className: null,
  isFirstPost: false,
};

PostCard.propTypes = {
  rootClassName: string,
  className: string,
  post: object.isRequired,
  isFirstPost: bool,
};

export default PostCard;
