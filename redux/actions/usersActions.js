import axios from 'axios';

// Action Types
export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

// Action Creators
const fetchUsersRequest = () => ({
  type: FETCH_USERS_REQUEST
});

const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users
});

const fetchUsersFailure = (error) => ({
  type: FETCH_USERS_FAILURE,
  payload: error
});

// Thunk Action Creator with dispatch and getState
export const fetchUsers = () => {
  return async (dispatch, getState) => {
    // Check if we already have users and don't need to fetch again
    const { users } = getState();
    
    if (users.items.length > 0) {
      console.log('Users already loaded, skipping fetch');
      return;
    }
    
    dispatch(fetchUsersRequest());
    
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      dispatch(fetchUsersSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(fetchUsersFailure(error.message));
      throw error;
    }
  };
};

// Thunk that dispatches multiple actions
export const fetchUserWithPosts = (userId) => {
  return async (dispatch) => {
    dispatch(fetchUsersRequest());
    
    try {
      // Fetch user details
      const userResponse = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
      
      // Fetch user's posts
      const postsResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
      
      // Combine the data
      const userData = {
        ...userResponse.data,
        posts: postsResponse.data
      };
      
      dispatch(fetchUsersSuccess([userData]));
      return userData;
    } catch (error) {
      dispatch(fetchUsersFailure(error.message));
      throw error;
    }
  };
};
