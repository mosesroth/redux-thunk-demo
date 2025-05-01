import { 
  ADD_TODO, 
  TOGGLE_TODO, 
  DELETE_TODO,
  ADD_TODO_ASYNC_START,
  ADD_TODO_ASYNC_SUCCESS,
  ADD_TODO_ASYNC_FAILURE
} from '../actions/todosActions';

const initialState = {
  items: [],
  loading: false,
  error: null
};

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    case TOGGLE_TODO:
      return {
        ...state,
        items: state.items.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    case DELETE_TODO:
      return {
        ...state,
        items: state.items.filter(todo => todo.id !== action.payload)
      };
    case ADD_TODO_ASYNC_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case ADD_TODO_ASYNC_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.payload],
        loading: false
      };
    case ADD_TODO_ASYNC_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default todosReducer;
