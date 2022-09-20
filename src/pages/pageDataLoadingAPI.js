import { loadData as PostsPageLoader } from "./PostsPage/postsPageReducer";
import { loadData as PostPageLoader } from "./PostPage/postPageReducer";

const getPageDataLoadingAPI = () => {
  return {
    PostsPage: {
      loadData: PostsPageLoader,
    },
    PostPage: {
      loadData: PostPageLoader,
    },
  };
};

export default getPageDataLoadingAPI;
