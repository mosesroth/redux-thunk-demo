// Action Types
export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const ADD_TODO_ASYNC_START = 'ADD_TODO_ASYNC_START';
export const ADD_TODO_ASYNC_SUCCESS = 'ADD_TODO_ASYNC_SUCCESS';
export const ADD_TODO_ASYNC_FAILURE = 'ADD_TODO_ASYNC_FAILURE';

// Synchronous Action Creators
export const addTodo = (text) => ({
  type: ADD_TODO,
  payload: {
    id: Date.now(),
    text,
    completed: false
  }
});

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: id
});

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: id
});

// Asynchronous Action Creator using Redux Thunk
export const addTodoAsync = (text, delay = 1000) => {
  return (dispatch) => {
    // Dispatch action to indicate async operation started
    dispatch({ type: ADD_TODO_ASYNC_START });
    
    // Simulate API call with setTimeout
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const newTodo = {
            id: Date.now(),
            text,
            completed: false
          };
          
          // Dispatch success action after delay
          dispatch({ 
            type: ADD_TODO_ASYNC_SUCCESS,
            payload: newTodo
          });
          resolve(newTodo);
        } catch (error) {
          // Dispatch failure action if something goes wrong
          dispatch({ 
            type: ADD_TODO_ASYNC_FAILURE,
            payload: error.message
          });
          reject(error);
        }
      }, delay);
    });
  };
};
