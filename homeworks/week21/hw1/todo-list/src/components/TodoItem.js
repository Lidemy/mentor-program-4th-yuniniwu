import styled from 'styled-components';
import { useState } from 'react';
import PropTypes from 'prop-types';

const ListItem = styled.li`
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & + & {
    border-top: 1px solid ${(props) => props.theme.colors.font_main};
  }
`;

const TodoContent = styled.p`
  ${(props) =>
    props.$isDone &&
    `
    text-decoration: line-through black solid 0.15rem;
  `}
`;

const EditContent = styled.input`
  border: none;
  font-size: 1rem;
  line-height: 1.5;
  padding: 0.2rem 0.4rem;
  color: ${(props) => props.theme.colors.font_main};

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

const ButtonGroup = styled.div`
  margin: 0.2rem 0;
  display: inline-flex;
`;

const ButtonDelete = styled(Button)`
  background-color: ${(props) => props.theme.colors.bg_danger};
  color: ${(props) => props.theme.colors.btn_danger};
  font-weight: 900;
  width: 3rem;
  height: 2rem;
  padding: 0.2rem 0.4rem;
  font-size: 0.7rem;
`;

const ButtonDone = styled(Button)`
  background-color: ${(props) => props.theme.colors.bg_safe};
  width: 3rem;
  height: 2rem;
  padding: 0.1rem 0.2rem;
  font-size: 0.7rem;
`;

const ButtonTodo = styled(ButtonDelete)`
  background-color: ${(props) => props.theme.colors.bg_notice};
  padding: 0.1rem 0.2rem;
`;

export default function TodoItem({
  todo,
  handleDeleteItem,
  toggleIsDone,
  editTodo,
}) {
  const { id, content, isDone } = todo;
  const [toggle, setToggle] = useState(true);
  const [text, setText] = useState(content);

  const handleDeleteClick = () => {
    handleDeleteItem(id);
  };

  const handleTogglerClick = () => {
    toggleIsDone(id);
  };

  const handleTodoEdit = (e) => {
    const newContent = e.target.value;
    editTodo(newContent, id);
    setText(newContent);
  };

  return (
    <ListItem data-id={id}>
      {toggle ? (
        <TodoContent
          $isDone={isDone}
          onDoubleClick={() => {
            setToggle(false);
          }}
        >
          {content}
        </TodoContent>
      ) : (
        <EditContent
          type='text'
          value={text}
          onChange={handleTodoEdit}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === 'Escape') {
              setToggle(true);
              e.preventDefault();
              e.stopPropagation();
            }
          }}
        />
      )}

      <ButtonGroup>
        {isDone ? (
          <ButtonTodo onClick={handleTogglerClick}>未完成</ButtonTodo>
        ) : (
          <ButtonDone onClick={handleTogglerClick}>已完成</ButtonDone>
        )}
        <ButtonDelete onClick={handleDeleteClick}>刪除</ButtonDelete>
      </ButtonGroup>
    </ListItem>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.object,
  handleDeleteItem: PropTypes.func,
  toggleIsDone: PropTypes.func,
  editTodo: PropTypes.func,
};
