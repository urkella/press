import React from "react";
import { string } from "prop-types";
import classNames from "classnames";

import css from "./IconArrowLong.module.scss";

const DIRECTION_LEFT = "left";

const IconArrowLong = (props) => {
  const { rootClassName, className, direction } = props;

  const isLeft = direction === DIRECTION_LEFT;
  const classes = classNames(rootClassName || css.root, className, {
    [css.leftArrow]: isLeft,
  });
  return (
    <svg
      className={classes}
      xmlns="http://www.w3.org/2000/svg"
      width="11"
      height="9"
    >
      <path
        d="m1443.824 4567.08-3.973-3.907a.612.612 0 0 0-.851 0l-.361.355a.582.582 0 0 0-.176.419.594.594 0 0 0 .176.423l2.318 2.284h-7.363a.583.583 0 0 0-.594.583v.5a.6.6 0 0 0 .594.608h7.389l-2.344 2.3a.58.58 0 0 0 0 .832l.361.354a.612.612 0 0 0 .852 0l3.973-3.907a.59.59 0 0 0 0-.84Z"
        transform="translate(-1433 -4563)"
      />
    </svg>
  );
};

IconArrowLong.defaultProps = {
  rootClassName: null,
  className: null,
  direction: null,
};

IconArrowLong.propTypes = {
  rootClassName: string,
  className: string,
  direction: string,
};

export default IconArrowLong;
