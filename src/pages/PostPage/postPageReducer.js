import { handleError } from "../../util/errors";
import api from "../../util/api";

// ================ Action types ================ //

export const QUERY_POST_REQUEST = "app/post/QUERY_POST_REQUEST";
export const QUERY_POST_SUCCESS = "app/post/QUERY_POST_SUCCESS";
export const QUERY_POST_ERROR = "app/post/QUERY_POST_ERROR";

export const QUERY_USER_REQUEST = "app/posts/QUERY_USER_REQUEST";
export const QUERY_USER_SUCCESS = "app/posts/QUERY_USER_SUCCESS";
export const QUERY_USER_ERROR = "app/posts/QUERY_USER_ERROR";

export const QUERY_COMMENTS_REQUEST = "app/posts/QUERY_COMMENTS_REQUEST";
export const QUERY_COMMENTS_SUCCESS = "app/posts/QUERY_COMMENTS_SUCCESS";
export const QUERY_COMMENTS_ERROR = "app/posts/QUERY_COMMENTS_ERROR";

export const initialState = {
  post: {},
  queryPostInProgress: false,
  queryPostError: null,
  queryUserInProgress: false,
  queryUserError: null,
  queryCommentsInProgress: false,
  queryCommentsError: null,
};

const combinePostAuthor = (post, author) => {
  const { userId, ...currentPost } = post;

  return {
    ...currentPost,
    author,
  };
};

const combinePostComments = (post, comments) => {
  return {
    ...post,
    comments,
  };
};

export default function postPageReducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case QUERY_POST_REQUEST:
      return {
        ...state,
        queryPostInProgress: true,
        queryPostError: null,
      };
    case QUERY_POST_SUCCESS:
      return {
        ...state,
        queryPostInProgress: false,
        queryPostError: null,
        post: payload.data,
      };
    case QUERY_POST_ERROR:
      return {
        ...state,
        queryPostInProgress: false,
        queryPostError: payload,
      };

    case QUERY_USER_REQUEST:
      return {
        ...state,
        queryUserInProgress: true,
        queryUserError: null,
      };
    case QUERY_USER_SUCCESS:
      return {
        ...state,
        queryUserInProgress: false,
        queryUserError: null,
        post: combinePostAuthor(state.post, payload.data),
      };
    case QUERY_USER_ERROR:
      return {
        ...state,
        queryUserInProgress: false,
        queryUserError: payload,
      };

    case QUERY_COMMENTS_REQUEST:
      return {
        ...state,
        queryCommentsInProgress: true,
        queryCommentsError: null,
      };
    case QUERY_COMMENTS_SUCCESS:
      return {
        ...state,
        queryCommentsInProgress: false,
        queryCommentsError: null,
        post: combinePostComments(state.post, payload.data),
      };
    case QUERY_COMMENTS_ERROR:
      return {
        ...state,
        queryCommentsInProgress: false,
        queryCommentsError: payload,
      };

    default:
      return state;
  }
}

// ================ Action creators ================ //

const queryPostRequest = () => ({ type: QUERY_POST_REQUEST });
const queryPostSuccess = (response) => ({
  type: QUERY_POST_SUCCESS,
  payload: response,
});
const queryPostError = (error) => ({
  type: QUERY_POST_ERROR,
  payload: error,
  error: true,
});

const queryUserRequest = () => ({ type: QUERY_USER_REQUEST });
const queryUserSuccess = (response) => ({
  type: QUERY_USER_SUCCESS,
  payload: response,
});
const queryUserError = (error) => ({
  type: QUERY_USER_ERROR,
  payload: error,
  error: true,
});

const queryCommentsRequest = () => ({ type: QUERY_COMMENTS_REQUEST });
const queryCommentsSuccess = (response) => ({
  type: QUERY_COMMENTS_SUCCESS,
  payload: response,
});
const queryCommentsError = (error) => ({
  type: QUERY_COMMENTS_ERROR,
  payload: error,
  error: true,
});

// ================ Thunks ================ //

export const queryPost = async (id, dispatch) => {
  dispatch(queryPostRequest());

  try {
    const response = await api.posts.show(id);

    dispatch(queryPostSuccess(response));
    return response;
  } catch (e) {
    const errorMessage =
      e?.response?.data?.message || "There was an error fetching post.";

    dispatch(queryPostError(errorMessage));
    handleError(errorMessage);
    return errorMessage;
  }
};

export const queryUser = async (id, dispatch) => {
  dispatch(queryUserRequest());

  try {
    const response = await api.users.show(id);

    dispatch(queryUserSuccess(response));
    return response;
  } catch (e) {
    const errorMessage =
      e?.response?.data?.message || "There was an error fetching user.";

    dispatch(queryUserError(errorMessage));
    handleError(errorMessage);
    return errorMessage;
  }
};

export const queryComments = async (postId, dispatch) => {
  dispatch(queryCommentsRequest());

  try {
    const queryParams = { postId };
    const response = await api.comments.query(queryParams);

    dispatch(queryCommentsSuccess(response));
    return response;
  } catch (e) {
    const errorMessage =
      e?.response?.data?.message || "There was an error fetching comments.";

    dispatch(queryCommentsError(errorMessage));
    handleError(errorMessage);
    return errorMessage;
  }
};

/**
 * Function that will run when the page loads, avoiding calling functions
 * inside useEffect or componentDidMount.
 *
 * @param {object} params
 * @param {string} search
 * @param {function} dispatch
 */
export const loadData = (params, search, dispatch) => {
  const postId = params.id;

  return dispatch(
    queryPost(postId, dispatch).then((response) =>
      Promise.all([
        dispatch(queryUser(response.data.userId, dispatch)),
        dispatch(queryComments(postId, dispatch)),
      ])
    )
  );
};
