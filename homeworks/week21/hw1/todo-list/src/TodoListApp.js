import styled from 'styled-components';
import { MEDIA_QUERY_S } from './constants/style.js';
import TodoItem from './components/TodoItem';
import FilterButton from './components/FilterButton';
import useTodo from './useTodo';
import PropTypes from 'prop-types';

const Container = styled.div`
  ${MEDIA_QUERY_S} {
    background-color: ${(props) => props.theme.colors.bg_card};
  }

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

const Heading = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin: 1rem;
`;

const Card = styled.div`
  background-color: ${(props) => props.theme.colors.bg_card};
  display: flex;
  flex-direction: column;
  box-shadow: 2px 5px 7px #b9b7bd;
  border-radius: 0.4rem;
  word-wrap: break-word;
  text-align: center;
  padding: 1rem 3rem;

  ${MEDIA_QUERY_S} {
    box-shadow: none;
  }
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

  &:focus {
    outline: none;
  }
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

const ButtonClear = styled(Button)`
  background-color: ${(props) => props.theme.colors.bg_danger};
  color: ${(props) => props.theme.colors.btn_danger};
  width: 4rem;
  height: 2rem;
  padding: 0.1rem 0.2rem;
  font-size: 0.7rem;
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

export default function TodoListApp() {
  const {
    inputValue,
    filterValue,
    filterType,
    todoCounter,
    handleFilter,
    handleAddItem,
    handleInputChange,
    handleDeleteItem,
    toggleIsDone,
    handleClearCompletedItem,
    editTodo,
  } = useTodo();

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
        <FilterButton handleFilter={handleFilter} value={filterType} />

        <ListGroup>
          {filterValue.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              handleDeleteItem={handleDeleteItem}
              toggleIsDone={toggleIsDone}
              editTodo={editTodo}
            />
          ))}
        </ListGroup>

        <Footer>
          {todoCounter} items left
          <ButtonClear onClick={handleClearCompletedItem}>Clear</ButtonClear>
        </Footer>
      </Card>
    </Container>
  );
}

TodoListApp.propTypes = {
  inputValue: PropTypes.array,
  filterValue: PropTypes.array,
  filterType: PropTypes.array,
  todoCounter: PropTypes.array,
  handleFilter: PropTypes.func,
  handleAddItem: PropTypes.func,
  handleInputChange: PropTypes.func,
  handleDeleteItem: PropTypes.func,
  toggleIsDone: PropTypes.func,
  handleClearCompletedItem: PropTypes.func,
  editTodo: PropTypes.func,
};
