import styled from 'styled-components';
import PropTypes from 'prop-types';

const ButtonGroup = styled.div`
  margin: 0.2rem 0;
  display: inline-flex;
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
  padding: 0.2rem 0.4rem;
`;

export default function FilterButton({ handleFilter, value }) {
  return (
    <ButtonGroup>
      {value.map((filterType) => (
        <ButtonFilter key={filterType} onClick={handleFilter}>
          {filterType}
        </ButtonFilter>
      ))}
    </ButtonGroup>
  );
}

FilterButton.propTypes = {
  value: PropTypes.array,
  handleFilter: PropTypes.func,
};
