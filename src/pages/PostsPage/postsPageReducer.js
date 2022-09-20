import { parse } from "../../util/urlHelpers";
import { denormaliseResponseEntities } from "../../util/data";
import { handleError } from "../../util/errors";
import api from "../../util/api";

const RESULTS_PER_PAGE = 14;

// ================ Action types ================ //

export const QUERY_POSTS_REQUEST = "app/posts/QUERY_POSTS_REQUEST";
export const QUERY_POSTS_SUCCESS = "app/posts/QUERY_POSTS_SUCCESS";
export const QUERY_POSTS_ERROR = "app/posts/QUERY_POSTS_ERROR";

export const QUERY_USERS_REQUEST = "app/posts/QUERY_USERS_REQUEST";
export const QUERY_USERS_SUCCESS = "app/posts/QUERY_USERS_SUCCESS";
export const QUERY_USERS_ERROR = "app/posts/QUERY_USERS_ERROR";

export const initialState = {
  posts: [],
  queryPostsInProgress: false,
  queryPostsError: null,
  pagination: {},
  users: [],
  queryUsersInProgress: false,
  queryUsersError: null,
};

export default function postsPageReducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case QUERY_POSTS_REQUEST:
      return {
        ...state,
        queryPostsInProgress: true,
        queryPostsError: null,
      };
    case QUERY_POSTS_SUCCESS:
      return {
        ...state,
        queryPostsInProgress: false,
        queryPostsError: null,
        posts: payload.data,
        pagination: payload.meta,
      };
    case QUERY_POSTS_ERROR:
      return {
        ...state,
        queryPostsInProgress: false,
        queryPostsError: payload,
      };

    case QUERY_USERS_REQUEST:
      return {
        ...state,
        queryUsersInProgress: true,
        queryUsersError: null,
      };
    case QUERY_USERS_SUCCESS:
      return {
        ...state,
        queryUsersInProgress: false,
        queryUsersError: null,
        users: payload.data,
      };
    case QUERY_USERS_ERROR:
      return {
        ...state,
        queryUsersInProgress: false,
        queryUsersError: payload,
      };

    default:
      return state;
  }
}

// ================ Action creators ================ //

const queryPostsRequest = () => ({ type: QUERY_POSTS_REQUEST });
const queryPostsSuccess = (response) => ({
  type: QUERY_POSTS_SUCCESS,
  payload: response,
});
const queryPostsError = (error) => ({
  type: QUERY_POSTS_ERROR,
  payload: error,
  error: true,
});

const queryUsersRequest = () => ({ type: QUERY_USERS_REQUEST });
const queryUsersSuccess = (response) => ({
  type: QUERY_USERS_SUCCESS,
  payload: response,
});
const queryUsersError = (error) => ({
  type: QUERY_USERS_ERROR,
  payload: error,
  error: true,
});

// ================ Thunks ================ //

export const queryPosts = async (searchParams = {}, dispatch) => {
  dispatch(queryPostsRequest());

  try {
    const keywordsMaybe = searchParams.keywords
      ? { title_like: searchParams.keywords }
      : {};
    const pageMaybe = searchParams.page ? { _page: searchParams.page } : {};
    const params = {
      ...searchParams,
      ...keywordsMaybe,
      ...pageMaybe,
      _limit: RESULTS_PER_PAGE,
    };
    const response = await api.posts.query(params);
    const denormalisedResponse = denormaliseResponseEntities(
      response,
      RESULTS_PER_PAGE
    );

    dispatch(queryPostsSuccess(denormalisedResponse));
    return denormalisedResponse;
  } catch (e) {
    const errorMessage =
      e?.response?.data?.message || "There was an error fetching posts.";

    dispatch(queryPostsError(errorMessage));
    handleError(errorMessage);
    return errorMessage;
  }
};

export const queryUsers = async (searchParams = {}, dispatch) => {
  dispatch(queryUsersRequest());

  try {
    const response = await api.users.query(searchParams);
    dispatch(queryUsersSuccess(response));
    return response;
  } catch (e) {
    const errorMessage =
      e?.response?.data?.message || "There was an error fetching users.";

    dispatch(queryUsersError(errorMessage));
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
  const queryParams = parse(search);

  return Promise.all([
    dispatch(queryPosts(queryParams, dispatch)),
    dispatch(queryUsers(null, dispatch)),
  ]);
};
