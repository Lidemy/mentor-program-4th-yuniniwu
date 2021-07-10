import {
  ADD_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  CLEAR_COMPLETED,
  EDIT_TODO,
  FILTER_TODO,
} from './actionTypes';

export const addTodo = (content) => ({
  type: ADD_TODO,
  payload: {
    content,
  },
});

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: {
    id,
  },
});

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: {
    id,
  },
});

export const clearCompleted = () => ({
  type: CLEAR_COMPLETED,
});

export const editTodo = (id, content) => ({
  type: EDIT_TODO,
  payload: {
    id,
    content,
  },
});

export const filterTodo = (filter) => ({
  type: FILTER_TODO,
  payload: {
    filter,
  },
});
