import getPageDataLoadingAPI from "./pages/pageDataLoadingAPI";
import { PostsPage, PostPage, NotFoundPage } from "./pages";

const pageDataLoadingAPI = getPageDataLoadingAPI();

const routeConfiguration = () => {
  return [
    {
      path: "/",
      name: "PostsPage",
      component: <PostsPage />,
      loadData: pageDataLoadingAPI.PostsPage.loadData,
    },
    {
      path: "/post/:id",
      name: "PostPage",
      component: <PostPage />,
      loadData: pageDataLoadingAPI.PostPage.loadData,
    },
    {
      path: "/notfound",
      name: "NotFoundPage",
      component: <NotFoundPage />,
    },
    // NotFoundPage fallback route that is used
    // when user goes to unhandled route
    {
      path: "*",
      name: "NotFoundRedirectPage",
      component: <NotFoundPage />,
    },
  ];
};

export default routeConfiguration;
