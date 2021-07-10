import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTodos, getTodosByFilter } from './redux/selectors';
import {
  addTodo,
  deleteTodo,
  toggleTodo,
  clearCompleted,
  editTodo,
  filterTodo,
} from './redux/actions';

const saveTodosToLocalStorage = (todos) => {
  window.localStorage.setItem('todos', JSON.stringify(todos));
};

const handleTodoCounter = (todos) => {
  return todos.filter((todo) => !todo.isDone).length;
};

export default function useTodo() {
  const [inputValue, setInputValue] = useState('');
  const todos = useSelector(selectTodos);
  const filterValue = useSelector(getTodosByFilter);
  const dispatch = useDispatch();

  // 計算未完成 todo item 數量
  const todoCounter = useMemo(() => handleTodoCounter(todos), [todos]);

  useEffect(() => {
    saveTodosToLocalStorage(todos);
  }, [todos]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddItem = useCallback(() => {
    if (!inputValue) return;
    dispatch(addTodo(inputValue));
    setInputValue('');
  }, [inputValue, dispatch]);

  const handleDeleteItem = useCallback(
    (id) => {
      dispatch(deleteTodo(id));
    },
    [dispatch]
  );

  const handleClearCompletedItem = useCallback(() => {
    dispatch(clearCompleted());
  }, [dispatch]);

  const handleToggleIsDone = useCallback(
    (id) => {
      dispatch(toggleTodo(id));
    },
    [dispatch]
  );

  const handleEditTodo = useCallback(
    (id, content) => {
      dispatch(editTodo(id, content));
    },
    [dispatch]
  );

  const handleFilter = useCallback(
    (e) => {
      const selectedFilter = e.target.innerText;
      dispatch(filterTodo(selectedFilter));
    },
    [dispatch]
  );

  return {
    inputValue,
    filterValue,
    todoCounter,
    handleEditTodo,
    handleFilter,
    handleAddItem,
    handleInputChange,
    handleDeleteItem,
    handleToggleIsDone,
    handleClearCompletedItem,
  };
}
