import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../App";
import { capitalizeFirstLetter } from "../../util/data";
import { Page } from "../../components";
import { NotFoundPage } from "..";
import config from "../../config";

import SectionContent from "./SectionContent";
import SectionNavigation from "./SectionNavigation";
import SectionAuthor from "./SectionAuthor";
import SectionComments from "./SectionComments";
import css from "./PostPage.module.scss";

const PostPage = () => {
  const params = useParams();
  const context = useContext(AppContext);
  const state = context.state;

  const { post, queryPostError, queryUserError, queryCommentsError } =
    state.PostPage;
  const { title, body, author, comments } = post;

  const id = post.id || params.id;

  if (queryPostError) {
    // Post not found
    return <NotFoundPage />;
  } else if (!post.id) {
    // Still loading the post
    return (
      <Page className={css.pageRoot}>
        <div className={css.sectionLoading}>
          <h1 className={css.title}>Loading...</h1>
        </div>
      </Page>
    );
  }

  const formattedTitle = title && capitalizeFirstLetter(title);
  const formattedBody = body && capitalizeFirstLetter(body);

  const siteTitle = formattedTitle && `${config.siteTitle} | ${formattedTitle}`;
  return (
    <Page className={css.pageRoot} title={siteTitle}>
      <SectionContent title={formattedTitle} body={formattedBody} />
      <SectionNavigation id={id} />
      <SectionAuthor author={author} queryUserError={queryUserError} />
      <SectionComments
        comments={comments}
        queryCommentsError={queryCommentsError}
      />
    </Page>
  );
};

export default PostPage;
