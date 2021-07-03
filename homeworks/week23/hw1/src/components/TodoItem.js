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
  handleToggleIsDone,
  handleEditTodo,
}) {
  const { id, content, isDone } = todo;
  const [toggleEdit, setToggleEdit] = useState(true);
  const [newText, setNewText] = useState(content);

  const handleDeleteClick = () => {
    handleDeleteItem(id);
  };

  const handleTogglerClick = () => {
    handleToggleIsDone(id);
  };

  const handleEditChange = (e) => {
    const newContent = e.target.value;
    handleEditTodo(id, newContent);
    setNewText(newContent);
  };

  return (
    <ListItem>
      {toggleEdit ? (
        <TodoContent
          $isDone={isDone}
          onDoubleClick={() => {
            setToggleEdit(false);
          }}
        >
          {content}
        </TodoContent>
      ) : (
        <EditContent
          type='text'
          value={newText}
          onChange={handleEditChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setToggleEdit(true);
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
  todo: PropTypes.object.isRequired,
  handleDeleteItem: PropTypes.func.isRequired,
  handleToggleIsDone: PropTypes.func.isRequired,
  handleEditTodo: PropTypes.func.isRequired,
};
