import {
  ADD_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  CLEAR_COMPLETED,
  EDIT_TODO,
} from '../actionTypes';

const localData = window.localStorage.getItem('todos');

let todos = JSON.parse(localData) || [];

let todoId;
if (todos.length === 0) {
  todoId = 0;
} else {
  todoId = todos[todos.length - 1].id + 1;
}

const initialState = { todos };

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: todoId++,
            content: action.payload.content,
            isDone: false,
          },
        ],
      };
    }
    case DELETE_TODO: {
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    }
    case TOGGLE_TODO: {
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id !== action.payload.id) return todo;
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        }),
      };
    }
    case EDIT_TODO: {
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id !== action.payload.id) return todo;
          return {
            ...todo,
            content: action.payload.content,
          };
        }),
      };
    }
    case CLEAR_COMPLETED: {
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.isDone),
      };
    }
    default:
      return state;
  }
}
