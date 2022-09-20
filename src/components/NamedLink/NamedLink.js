import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import routeConfiguration from "../../routeConfiguration";
import { pathByRouteName } from "../../util/routes";

const NamedLink = (props) => {
  const { name, params, title } = props;
  const routes = routeConfiguration();

  // Link props
  const { to, children } = props;
  const pathname = pathByRouteName(name, routes, params);

  // <a> element props
  const { className, style } = props;
  const aElemProps = {
    className,
    style,
    title,
  };

  return (
    <Link to={{ pathname, ...to }} {...aElemProps}>
      {children}
    </Link>
  );
};

const { object, string, shape, any } = PropTypes;

NamedLink.defaultProps = {
  params: {},
  to: {},
  children: null,
  className: "",
  style: {},
  title: null,
};

NamedLink.propTypes = {
  name: string.isRequired,
  params: object,
  to: shape({ search: string, hash: string, state: object }),
  children: any,
  className: string,
  style: object,
  title: string,
};

export default NamedLink;
