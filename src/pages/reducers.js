import postsPageReducer, {
  initialState as postsPageInitialState,
} from "./PostsPage/postsPageReducer";
import postPageReducer, {
  initialState as postPageInitialState,
} from "./PostPage/postPageReducer";

const getReducers = () => {
  return {
    PostsPage: [postsPageReducer, postsPageInitialState], // PostsPage reducer
    PostPage: [postPageReducer, postPageInitialState], // PostPage reducer
  };
};

export default getReducers;
