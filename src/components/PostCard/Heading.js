import React from "react";
import { string, node } from "prop-types";

const Heading = (props) => {
  const { className, children, isFirstPost } = props;

  return isFirstPost ? (
    <h2 className={className}>{children}</h2>
  ) : (
    <h4 className={className}>{children}</h4>
  );
};

Heading.defaultProps = {
  className: null,
};

Heading.defaultProps = {
  className: string,
  children: node.isRequired,
};

export default Heading;
