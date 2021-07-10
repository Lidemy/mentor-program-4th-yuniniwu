import styled from 'styled-components';
import PropTypes from 'prop-types';
import { VISIBILITY_FILTERS } from '../constants/filterButton';

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

export default function FilterButton({ handleFilter }) {
  return (
    <ButtonGroup>
      {Object.keys(VISIBILITY_FILTERS).map((filterType) => {
        const currentFilter = VISIBILITY_FILTERS[filterType];
        return (
          <ButtonFilter key={currentFilter} onClick={handleFilter}>
            {currentFilter}
          </ButtonFilter>
        );
      })}
    </ButtonGroup>
  );
}

FilterButton.propTypes = {
  handleFilter: PropTypes.func.isRequired,
};
