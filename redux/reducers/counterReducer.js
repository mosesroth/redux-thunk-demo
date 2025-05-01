import { 
  INCREMENT, 
  DECREMENT, 
  RESET,
  INCREMENT_ASYNC_START,
  INCREMENT_ASYNC_SUCCESS,
  INCREMENT_ASYNC_FAILURE
} from '../actions/counterActions';

const initialState = {
  value: 0,
  loading: false,
  error: null
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        value: state.value + 1
      };
    case DECREMENT:
      return {
        ...state,
        value: state.value - 1
      };
    case RESET:
      return {
        ...state,
        value: 0
      };
    case INCREMENT_ASYNC_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case INCREMENT_ASYNC_SUCCESS:
      return {
        ...state,
        value: state.value + 1,
        loading: false
      };
    case INCREMENT_ASYNC_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default counterReducer;
