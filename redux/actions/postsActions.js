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

// Mock data to avoid network issues
const MOCK_POSTS = [
  {
    id: 1,
    title: 'Sample Post 1',
    body: 'This is a sample post body that demonstrates Redux Thunk with mock data instead of real API calls.',
    userId: 1
  },
  {
    id: 2,
    title: 'Sample Post 2',
    body: 'Using mock data ensures the app works even when network connectivity is limited or unavailable.',
    userId: 1
  },
  {
    id: 3,
    title: 'Sample Post 3',
    body: 'Redux Thunk allows us to handle asynchronous logic in our Redux actions, like simulating API delays.',
    userId: 2
  },
  {
    id: 4,
    title: 'Sample Post 4',
    body: 'With thunks, we can dispatch multiple actions from a single action creator function.',
    userId: 2
  },
  {
    id: 5,
    title: 'Sample Post 5',
    body: 'This approach helps keep our components clean by moving async logic to action creators.',
    userId: 3
  }
];

// Thunk Action Creator with mock data
export const fetchPosts = () => {
  return async (dispatch) => {
    dispatch(fetchPostsRequest());
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Use mock data instead of real API call
      dispatch(fetchPostsSuccess(MOCK_POSTS));
      return MOCK_POSTS;
    } catch (error) {
      dispatch(fetchPostsFailure(error.message));
      throw error;
    }
  };
};

// Thunk with parameters using mock data
export const fetchPostById = (id) => {
  return async (dispatch) => {
    dispatch(fetchPostsRequest());
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Find post in mock data
      const post = MOCK_POSTS.find(p => p.id === parseInt(id)) || {
        id: parseInt(id),
        title: `Post ${id}`,
        body: 'This is a generated post since the requested ID was not found in mock data.',
        userId: 1
      };
      
      dispatch(fetchPostsSuccess([post]));
      return post;
    } catch (error) {
      dispatch(fetchPostsFailure(error.message));
      throw error;
    }
  };
};
