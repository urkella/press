import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { parse } from "../../util/urlHelpers";
import { AppContext } from "../../App";
import { Page, Posts, Search } from "../../components";

import css from "./PostsPage.module.scss";

const DEFAULT_PAGE = 1;

const PostsPage = () => {
  const context = useContext(AppContext);
  const state = context.state;

  const {
    posts,
    queryPostsInProgress,
    queryPostsError,
    users,
    queryUsersInProgress,
    queryUsersError,
    pagination,
  } = state.PostsPage;

  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = parse(location.search);
  const page = searchParams.page || DEFAULT_PAGE;

  return (
    <Page className={css.pageRoot}>
      <div className={css.postsCount}>
        <div className={css.postsCountContent}>
          <h1 className={css.postsCountHeading}>{`Posts found: ${
            pagination.totalItems || 0
          }`}</h1>
        </div>
      </div>
      <div className={css.content}>
        <Search
          navigate={navigate}
          searchParams={searchParams}
          users={users}
          queryUsersInProgress={queryUsersInProgress}
          queryUsersError={queryUsersError}
          queryPostsError={queryPostsError}
        />
        <Posts
          posts={posts}
          queryPostsInProgress={queryPostsInProgress}
          queryPostsError={queryPostsError}
          searchParams={searchParams}
          pagination={{ ...pagination, page }}
        />
      </div>
    </Page>
  );
};

export default PostsPage;
