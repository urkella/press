import React from "react";
import { array, string } from "prop-types";
import { capitalizeFirstLetter } from "../../util/data";

import css from "./PostPage.module.scss";

const Comment = (props) => {
  const { comment } = props;
  return (
    <div className={css.comment}>
      <h3 className={css.commentTitle}>
        {capitalizeFirstLetter(comment.name)}
      </h3>
      <p className={css.commentText}>{capitalizeFirstLetter(comment.body)}</p>
    </div>
  );
};

const SectionComments = (props) => {
  const { comments, queryCommentsError } = props;
  const showComments = !queryCommentsError;
  return showComments ? (
    <div className={css.sectionComments}>
      <h2 className={css.sectionTitle}>Comments</h2>
      <div className={css.comments}>
        {comments?.map((c) => {
          return <Comment key={c.id} comment={c} />;
        })}
      </div>
    </div>
  ) : null;
};

SectionComments.propTypes = {
  comments: array,
  queryCommentsError: string,
};

export default SectionComments;
