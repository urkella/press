import React from "react";
import { string, node } from "prop-types";
import { Helmet } from "react-helmet-async";
import config from "../../config";
import classNames from "classnames";

import css from "./Page.module.scss";

const Page = (props) => {
  const { rootClassName, className, children, title } = props;
  const classes = classNames(rootClassName || css.root, className);

  const siteTitle = title || config.siteTitle;
  return (
    <div className={classes}>
      <Helmet>
        <title>{siteTitle}</title>
      </Helmet>
      {children}
    </div>
  );
};

Page.defaultProps = {
  rootClassName: null,
  className: null,
  title: null,
};

Page.propTypes = {
  rootClassName: string,
  className: string,
  title: string,
  children: node.isRequired,
};

export default Page;
