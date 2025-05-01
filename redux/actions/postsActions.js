import axios from 'axios';

// Action Types
export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';

// Action Creators
const fetchPostsRequest = () => ({
  type: FETCH_POSTS_REQUEST
});

const fetchPostsSuccess = (posts) => ({
  type: FETCH_POSTS_SUCCESS,
  payload: posts
});

const fetchPostsFailure = (error) => ({
  type: FETCH_POSTS_FAILURE,
  payload: error
});

// Thunk Action Creator
export const fetchPosts = () => {
  return async (dispatch) => {
    dispatch(fetchPostsRequest());
    
    try {
      // Make API call using axios
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5');
      dispatch(fetchPostsSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(fetchPostsFailure(error.message));
      throw error;
    }
  };
};

// Thunk with parameters
export const fetchPostById = (id) => {
  return async (dispatch) => {
    dispatch(fetchPostsRequest());
    
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
      dispatch(fetchPostsSuccess([response.data]));
      return response.data;
    } catch (error) {
      dispatch(fetchPostsFailure(error.message));
      throw error;
    }
  };
};
