import { VISIBILITY_FILTERS } from '../constants/filterButton.js';

export const selectTodos = (store) => store.todosReducer.todos;

export const getTodosByFilter = (store) => {
  const todos = store.todosReducer.todos;

  switch (store.visibilityFilter) {
    case VISIBILITY_FILTERS.COMPLETED:
      return todos.filter((todo) => todo.isDone);

    case VISIBILITY_FILTERS.INCOMPLETED:
      return todos.filter((todo) => !todo.isDone);

    case VISIBILITY_FILTERS.ALL:
    default:
      return todos;
  }
};
