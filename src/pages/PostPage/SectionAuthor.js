import React from "react";
import { object, string } from "prop-types";
import classNames from "classnames";

import css from "./PostPage.module.scss";

const SectionAuthor = (props) => {
  const { author, queryUserError } = props;

  const name = author?.name;
  const address = author?.address;
  const showAuthor = !queryUserError && (name || address);

  return showAuthor ? (
    <div className={css.sectionAuthor}>
      <div className={css.sectionAuthorWrapper}>
        <div className={classNames(css.authorField, css.nameField)}>
          <p className={css.authorFieldHeading}>Author name</p>
          {name ? <h3 className={css.authorFieldValue}>{name}</h3> : null}
        </div>
        <div className={classNames(css.authorField, css.addressField)}>
          <p className={css.authorFieldHeading}>Address</p>
          {address ? (
            <h3 className={css.authorFieldValue}>
              {`${address.city}, ${address.zipcode}, ${address.street}`}
            </h3>
          ) : null}
        </div>
      </div>
    </div>
  ) : null;
};

SectionAuthor.propTypes = {
  author: object,
  queryUserError: string,
};

export default SectionAuthor;
