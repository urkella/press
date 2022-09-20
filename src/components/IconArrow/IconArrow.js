import React from "react";
import { string } from "prop-types";
import classNames from "classnames";

import css from "./IconArrow.module.scss";

const DIRECTION_LEFT = "left";

const IconArrow = (props) => {
  const { rootClassName, className, direction } = props;

  const isLeft = direction === DIRECTION_LEFT;
  const classes = classNames(rootClassName || css.root, className, {
    [css.leftArrow]: isLeft,
  });
  return (
    <svg
      className={classes}
      xmlns="http://www.w3.org/2000/svg"
      width="5"
      height="8"
    >
      <path
        d="m875.588 37.456-.286-.3a.46.46 0 0 0-.675 0l-3.261 3.444-3.266-3.453a.46.46 0 0 0-.675 0l-.286.3a.526.526 0 0 0 0 .714l3.887 4.128a.477.477 0 0 0 .339.162.476.476 0 0 0 .338-.162l3.884-4.117a.534.534 0 0 0 0-.72Z"
        transform="rotate(-90 419.364 456.364)"
      />
    </svg>
  );
};

IconArrow.defaultProps = {
  rootClassName: null,
  className: null,
  direction: null,
};

IconArrow.propTypes = {
  rootClassName: string,
  className: string,
  direction: string,
};

export default IconArrow;
