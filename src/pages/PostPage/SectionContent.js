import React from "react";
import { string } from "prop-types";

import css from "./PostPage.module.scss";

const SectionContent = (props) => {
  const { title, body } = props;
  return (
    <div className={css.sectionContent}>
      <h1 className={css.title}>{title}</h1>
      <div className={css.divider} />
      <p className={css.description}>{body}</p>
    </div>
  );
};

SectionContent.defaultProps = {
  title: null,
  body: null,
};

SectionContent.propTypes = {
  title: string,
  body: string,
};

export default SectionContent;
