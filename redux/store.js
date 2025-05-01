import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

// Import reducers
import counterReducer from './reducers/counterReducer';
import todosReducer from './reducers/todosReducer';
import postsReducer from './reducers/postsReducer';
import usersReducer from './reducers/usersReducer';
import weatherReducer from './reducers/weatherReducer';

// Combine all reducers
const rootReducer = combineReducers({
  counter: counterReducer,
  todos: todosReducer,
  posts: postsReducer,
  users: usersReducer,
  weather: weatherReducer,
});

// Create store with thunk middleware
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
