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

// Mock data to avoid network issues
const MOCK_USERS = [
  {
    id: 1,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    phone: '555-1234',
    website: 'johndoe.com'
  },
  {
    id: 2,
    name: 'Jane Smith',
    username: 'janesmith',
    email: 'jane@example.com',
    phone: '555-5678',
    website: 'janesmith.com'
  },
  {
    id: 3,
    name: 'Bob Johnson',
    username: 'bobjohnson',
    email: 'bob@example.com',
    phone: '555-9012',
    website: 'bobjohnson.com'
  }
];

// Mock posts data
const MOCK_POSTS_BY_USER = {
  1: [
    { id: 1, title: 'First post by John', body: 'This is John\'s first post content', userId: 1 },
    { id: 2, title: 'Second post by John', body: 'This is John\'s second post content', userId: 1 }
  ],
  2: [
    { id: 3, title: 'First post by Jane', body: 'This is Jane\'s first post content', userId: 2 },
    { id: 4, title: 'Second post by Jane', body: 'This is Jane\'s second post content', userId: 2 }
  ],
  3: [
    { id: 5, title: 'First post by Bob', body: 'This is Bob\'s first post content', userId: 3 }
  ]
};

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
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Use mock data instead of real API call
      dispatch(fetchUsersSuccess(MOCK_USERS));
      return MOCK_USERS;
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
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Find user in mock data
      const parsedId = parseInt(userId);
      const user = MOCK_USERS.find(u => u.id === parsedId);
      
      if (!user) {
        throw new Error(`User with ID ${userId} not found`);
      }
      
      // Get user's posts from mock data
      const posts = MOCK_POSTS_BY_USER[parsedId] || [];
      
      // Combine the data
      const userData = {
        ...user,
        posts: posts
      };
      
      dispatch(fetchUsersSuccess([userData]));
      return userData;
    } catch (error) {
      dispatch(fetchUsersFailure(error.message));
      throw error;
    }
  };
};
