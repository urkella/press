import React from "react";
import { string, array, object, bool } from "prop-types";
import { PostCard, PaginationLinks } from "..";
import classNames from "classnames";

import css from "./Posts.module.scss";

const Posts = (props) => {
  const {
    rootClassName,
    className,
    posts,
    queryPostsInProgress,
    queryPostsError,
    searchParams,
    pagination,
  } = props;
  const classes = classNames(rootClassName || css.root, className);

  const showPosts = !queryPostsInProgress || !queryPostsError;
  const showPagination = pagination && pagination.totalPages > 1;

  if (queryPostsError) {
    return (
      <div className={classes}>
        <p className={css.error}>Error while querying posts.</p>
      </div>
    );
  }

  return showPosts ? (
    <div className={classes}>
      <div className={css.posts}>
        {posts.map((p, index) => {
          return <PostCard key={p.id} post={p} isFirstPost={index === 0} />;
        })}
      </div>
      {showPagination ? (
        <PaginationLinks
          className={css.pagination}
          pageName="PostsPage"
          pageSearchParams={searchParams}
          pagination={pagination}
        />
      ) : null}
    </div>
  ) : null;
};

Posts.defaultProps = {
  rootClassName: null,
  className: null,
  posts: [],
  queryPostsInProgress: false,
  queryPostsError: null,
  searchParams: {},
  meta: {},
};

Posts.propTypes = {
  rootClassName: string,
  className: string,
  posts: array.isRequired,
  queryPostsInProgress: bool.isRequired,
  queryPostsError: object,
  searchParams: object.isRequired,
  meta: object.isRequired,
};

export default Posts;
