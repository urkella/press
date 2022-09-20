import React from "react";
import { Page, NamedLink, IconArrowLong } from "../../components";
import config from "../../config";

import css from "./NotFoundPage.module.scss";

const NotFoundPage = () => {
  const siteTitle = `${config.siteTitle} | Not found`;
  return (
    <Page className={css.pageRoot} title={siteTitle}>
      <div className={css.sectionContent}>
        <h1 className={css.title}>Not found</h1>
        <div className={css.divider} />
        <NamedLink className={css.link} name="PostsPage">
          Go to home
          <IconArrowLong className={css.linkIcon} />
        </NamedLink>
      </div>
    </Page>
  );
};

export default NotFoundPage;
