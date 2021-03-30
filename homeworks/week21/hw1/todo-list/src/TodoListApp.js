import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.bg_main};
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding-right: 15px;
  padding-left: 15px;
  margin: 0 auto;
`;

const Heading = styled.h1``;

const Card = styled.div`
  background-color: ${(props) => props.theme.colors.bg_card};
  display: flex;
  flex-direction: column;
  box-shadow: 2px 5px 7px #b9b7bd;
  border-radius: 0.4rem;
  word-wrap: break-word;
  text-align: center;
  padding: 1rem 3rem;
`;

const InputArea = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const TextInput = styled.input`
  display: block;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: ${(props) => props.theme.colors.font_main};
  background-color: ${(props) => props.theme.colors.bg_main};
  background-clip: padding-box;
  border: 1px solid ${(props) => props.theme.colors.shadow};
  border-radius: 0.4rem;
`;

const Button = styled.button`
  display: inline-block;
  width: 100%;
  text-align: center;
  padding: 0.375rem 0.75rem;
  margin: 0.2rem;
  font-size: 1rem;
  border: none;
  border-radius: 0.4rem;
  background-color: ${(props) => props.theme.colors.btn_main};
  color: ${(props) => props.theme.colors.font_white};
  cursor: pointer;
  transition: all 0.5s;

  &:hover {
    transform: scale(1.1);
  }
`;

const ButtonFilter = styled(Button)`
  font-size: 0.8rem;
  padding: 0.18rem 0.4rem;
`;

const ButtonSave = styled(Button)`
  background-color: ${(props) => props.theme.colors.btn_save};
  width: 100%;
  height: 2rem;
  padding: 0.1rem 0.2rem;
  font-size: 0.7rem;
`;

const ButtonClear = styled(Button)`
  background-color: ${(props) => props.theme.colors.bg_danger};
  color: ${(props) => props.theme.colors.btn_danger};
  width: 4rem;
  height: 2rem;
  padding: 0.1rem 0.2rem;
  font-size: 0.7rem;
`;

const ButtonGroup = styled.div`
  margin: 0.2rem 0;
  display: inline-flex;
`;

const ListGroup = styled.ul`
  margin: 0 5px;
  padding-inline-start: 0px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0.3rem;
`;

function saveTodosToLocalStorage(todos) {
  window.localStorage.setItem('todos', JSON.stringify(todos));
}

function handleTodoCounter(todos) {
  return todos.filter((todo) => !todo.isDone).length;
}

let todoItemCounter;

function TodoListApp() {
  const id = useRef(1);
  const [todos, setTodos] = useState(() => {
    let todoData = window.localStorage.getItem('todos') || '';
    if (todoData) {
      todoData = JSON.parse(todoData);
    } else {
      todoData = [];
    }
    return todoData;
  });
  const [inputValue, setInputValue] = useState('');
  const [filterValue, setFilterValue] = useState(todos);

  useEffect(() => {
    saveTodosToLocalStorage(todos);
    setFilterValue(todos);
    todoItemCounter = handleTodoCounter(todos);
  }, [todos]);

  const handleAddItem = () => {
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
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleDeleteItem = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleClearCompletedItem = () => {
    setTodos(todos.filter((todo) => !todo.isDone));
  };

  const toggleIsDone = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          isDone: !todo.isDone,
        };
      })
    );
  };

  const inputChange = (input, id) => {
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

  const handleFilter = (e) => {
    const selectedButton = e.target.innerText;
    if (selectedButton === 'All') {
      setFilterValue(todos);
    }
    if (selectedButton === 'Done') {
      setFilterValue(todos.filter((todo) => todo.isDone));
    }
    if (selectedButton === 'to Do') {
      setFilterValue(todos.filter((todo) => !todo.isDone));
    }
  };

  return (
    <Container>
      <Heading>Todo List</Heading>
      <Card>
        <InputArea>
          <TextInput
            placeholder='enter your todo item'
            onChange={handleInputChange}
            value={inputValue}
          ></TextInput>
          <Button onClick={handleAddItem}>新增</Button>
        </InputArea>
        <ListGroup>
          {filterValue.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              handleDeleteItem={handleDeleteItem}
              toggleIsDone={toggleIsDone}
              inputChange={inputChange}
            />
          ))}
        </ListGroup>
        <Footer>
          {todoItemCounter} items left
          <ButtonClear onClick={handleClearCompletedItem}>Clear</ButtonClear>
        </Footer>

        <ButtonGroup>
          <ButtonFilter onClick={handleFilter}>All</ButtonFilter>
          <ButtonFilter onClick={handleFilter}>Done</ButtonFilter>
          <ButtonFilter onClick={handleFilter}>to Do</ButtonFilter>
        </ButtonGroup>
        <ButtonSave>儲存目前清單</ButtonSave>
      </Card>
    </Container>
  );
}

export default TodoListApp;
