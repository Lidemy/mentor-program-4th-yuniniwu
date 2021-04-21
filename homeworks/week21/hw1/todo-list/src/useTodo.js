import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

const saveTodosToLocalStorage = (todos) => {
  window.localStorage.setItem('todos', JSON.stringify(todos));
};

const handleTodoCounter = (todos) => {
  return todos.filter((todo) => !todo.isDone).length;
};

export default function useTodo() {
  const localData = window.localStorage.getItem('todos');
  const id = useRef(1);

  const [todos, setTodos] = useState(() => {
    let todoData = localData || '';
    if (todoData) {
      todoData = JSON.parse(todoData);
    } else {
      todoData = [];
    }
    return todoData;
  });
  const [inputValue, setInputValue] = useState('');
  const [filterValue, setFilterValue] = useState(todos);
  const filterType = ['All', 'Done', 'to Do'];

  // 計算未完成 todo item數量
  const todoCounter = useMemo(() => handleTodoCounter(todos), [todos]);

  useEffect(() => {
    saveTodosToLocalStorage(todos);
    setFilterValue(todos);
  }, [todos]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddItem = useCallback(() => {
    if (!inputValue) return;

    setTodos([
      {
        id: id.current,
        content: inputValue,
        isDone: false,
      },
      ...todos,
    ]);

    setInputValue('');
    id.current++;
  }, [todos, inputValue]);

  const handleDeleteItem = useCallback(
    (id) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    },
    [todos]
  );

  const handleClearCompletedItem = useCallback(() => {
    setTodos(todos.filter((todo) => !todo.isDone));
  }, [todos]);

  const toggleIsDone = useCallback(
    (id) => {
      setTodos(
        todos.map((todo) => {
          if (todo.id !== id) return todo;
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        })
      );
    },
    [todos]
  );

  const editTodo = (input, id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          content: input,
        };
      })
    );
  };

  const handleFilter = useCallback(
    (e) => {
      const selectedItem = e.target.innerText;
      if (selectedItem === 'All') {
        setFilterValue(todos);
      }
      if (selectedItem === 'Done') {
        setFilterValue(todos.filter((todo) => todo.isDone));
      }
      if (selectedItem === 'to Do') {
        setFilterValue(todos.filter((todo) => !todo.isDone));
      }
    },
    [todos]
  );

  return {
    inputValue,
    filterValue,
    filterType,
    todoCounter,
    editTodo,
    handleFilter,
    handleAddItem,
    handleInputChange,
    handleDeleteItem,
    toggleIsDone,
    handleClearCompletedItem,
  };
}
