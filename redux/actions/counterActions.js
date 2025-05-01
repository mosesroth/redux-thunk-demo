// Action Types
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const RESET = 'RESET';
export const INCREMENT_ASYNC_START = 'INCREMENT_ASYNC_START';
export const INCREMENT_ASYNC_SUCCESS = 'INCREMENT_ASYNC_SUCCESS';
export const INCREMENT_ASYNC_FAILURE = 'INCREMENT_ASYNC_FAILURE';

// Synchronous Action Creators
export const increment = () => ({
  type: INCREMENT
});

export const decrement = () => ({
  type: DECREMENT
});

export const reset = () => ({
  type: RESET
});

// Asynchronous Action Creators using Redux Thunk
export const incrementAsync = (delay = 1000) => {
  return (dispatch) => {
    // Dispatch action to indicate async operation started
    dispatch({ type: INCREMENT_ASYNC_START });
    
    // Simulate API call with setTimeout
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          // Dispatch success action after delay
          dispatch({ type: INCREMENT_ASYNC_SUCCESS });
          resolve();
        } catch (error) {
          // Dispatch failure action if something goes wrong
          dispatch({ 
            type: INCREMENT_ASYNC_FAILURE,
            payload: error.message
          });
          reject(error);
        }
      }, delay);
    });
  };
};

// Thunk with conditional logic
export const incrementIfOdd = () => {
  return (dispatch, getState) => {
    const { counter } = getState();
    if (counter.value % 2 !== 0) {
      dispatch(increment());
    }
  };
};
